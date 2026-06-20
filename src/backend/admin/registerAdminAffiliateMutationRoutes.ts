import type { Express, Request, RequestHandler, Response } from "express";

interface AdminAffiliateMutationPgPool {
  query(queryText: string, values?: unknown[]): Promise<unknown>;
}

interface AdminAffiliateMutationInMemoryDb {
  global: Record<string, string | undefined>;
}

interface AdminAffiliateMutationRequestBody {
  name: string;
  email: string;
  code: string;
  commission_rate: string;
  discount_rate: string;
}

export interface AdminAffiliateMutationRouteDependencies {
  requireMasterAdmin: RequestHandler;
  getIsPostgresActive: () => boolean;
  getPgPool: () => AdminAffiliateMutationPgPool | null;
  dbInMemoryLocal: AdminAffiliateMutationInMemoryDb;
  scheduleSaveLocalFallback: () => void;
}

export function registerAdminAffiliateMutationRoutes(
  app: Pick<Express, "post">,
  dependencies: AdminAffiliateMutationRouteDependencies
): void {
  app.post("/api/admin/affiliates/create", dependencies.requireMasterAdmin, async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, code, commission_rate, discount_rate }: AdminAffiliateMutationRequestBody = req.body;
      if (!name || !email || !code) {
        res.status(400).json({ error: "Nome, e-mail e código exclusivo de afiliado são obrigatórios." });
        return;
      }

      const affId = 'aff_' + Date.now();
      const isPostgresActive = dependencies.getIsPostgresActive();
      const pgPool = isPostgresActive ? dependencies.getPgPool() : null;
      if (isPostgresActive && pgPool) {
        await pgPool.query(`
        INSERT INTO affiliates (id, name, email, code, commission_rate, discount_rate)
        VALUES ($1, $2, $3, $4, $5, $6)
      `, [affId, name, email, code.trim().toUpperCase(), commission_rate || 10.00, discount_rate || 0.00]);
      } else {
        const affs = JSON.parse(dependencies.dbInMemoryLocal.global['affiliates'] || '[]');
        const newAff = {
          id: affId,
          name,
          email,
          code: code.trim().toUpperCase(),
          commission_rate: parseFloat(commission_rate) || 10.00,
          discount_rate: parseFloat(discount_rate) || 0.00,
          clicks: 0,
          leads: 0,
          sales_count: 0,
          commission_paid: 0.00,
          commission_pending: 0.00,
          created_at: new Date().toISOString()
        };
        affs.push(newAff);
        dependencies.dbInMemoryLocal.global['affiliates'] = JSON.stringify(affs);
        dependencies.scheduleSaveLocalFallback();
      }

      res.json({ success: true, message: "Parceiro Afiliado registrado estrategicamente com sucesso!" });
    } catch (err) {
      console.error("Erro criar afiliado:", err);
      res.status(500).json({ error: "Erro ao criar parceiro. Verique se código já existe." });
    }
  });
}
