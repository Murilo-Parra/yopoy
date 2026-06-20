import type { Express, Request, RequestHandler, Response } from "express";

interface AdminCommissionQueryPgResult {
  rows: Record<string, unknown>[];
}

interface AdminCommissionQueryPgPool {
  query(queryText: string, values?: unknown[]): Promise<AdminCommissionQueryPgResult>;
}

interface AdminCommissionQueryInMemoryDb {
  global: Record<string, string | undefined>;
}

export interface AdminCommissionQueryRouteDependencies {
  requireMasterAdmin: RequestHandler;
  getIsPostgresActive: () => boolean;
  getPgPool: () => AdminCommissionQueryPgPool | null;
  dbInMemoryLocal: AdminCommissionQueryInMemoryDb;
}

export function registerAdminCommissionQueryRoutes(
  app: Pick<Express, "get">,
  dependencies: AdminCommissionQueryRouteDependencies
): void {
  app.get("/api/admin/commissions", dependencies.requireMasterAdmin, async (req: Request, res: Response): Promise<void> => {
    try {
      let result: Record<string, unknown>[] = [];

      if (dependencies.getIsPostgresActive()) {
        const pgPool = dependencies.getPgPool();

        if (pgPool) {
          const comms = await pgPool.query(`
        SELECT ac.*, a.name as affiliate_name, a.code as affiliate_code, c.corporate_name as company_name
        FROM affiliate_commissions ac
        JOIN affiliates a ON ac.affiliate_id = a.id
        LEFT JOIN companies c ON ac.company_id = c.id
        ORDER BY ac.created_at DESC
      `);
          result = comms.rows;
        } else {
          const commissions: Record<string, unknown>[] = JSON.parse(dependencies.dbInMemoryLocal.global["affiliate_commissions"] || "[]");
          const affiliates: Record<string, unknown>[] = JSON.parse(dependencies.dbInMemoryLocal.global["affiliates"] || "[]");
          const companies: Record<string, unknown>[] = JSON.parse(dependencies.dbInMemoryLocal.global["companies"] || "[]");

          result = commissions.map((ac) => {
            const aff = affiliates.find((a) => a.id === ac.affiliate_id);
            const comp = companies.find((c) => c.id === ac.company_id);
            return {
              ...ac,
              affiliate_name: aff ? aff.name : "Parceiro Avulso",
              affiliate_code: aff ? aff.code : "N/A",
              company_name: comp ? comp.corporate_name : "Nova Empresa Premium"
            };
          });
        }
      } else {
        const commissions: Record<string, unknown>[] = JSON.parse(dependencies.dbInMemoryLocal.global["affiliate_commissions"] || "[]");
        const affiliates: Record<string, unknown>[] = JSON.parse(dependencies.dbInMemoryLocal.global["affiliates"] || "[]");
        const companies: Record<string, unknown>[] = JSON.parse(dependencies.dbInMemoryLocal.global["companies"] || "[]");

        result = commissions.map((ac) => {
          const aff = affiliates.find((a) => a.id === ac.affiliate_id);
          const comp = companies.find((c) => c.id === ac.company_id);
          return {
            ...ac,
            affiliate_name: aff ? aff.name : "Parceiro Avulso",
            affiliate_code: aff ? aff.code : "N/A",
            company_name: comp ? comp.corporate_name : "Nova Empresa Premium"
          };
        });
      }
      res.json(result);
    } catch (err) {
      console.error("Erro listando comissões:", err);
      res.status(500).json({ error: "Erro ao consultar comissões." });
    }
  });
}
