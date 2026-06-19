import type { Express, Request, RequestHandler, Response } from "express";

interface AdminSupportQueryPgResult {
  rows: Record<string, unknown>[];
}

interface AdminSupportQueryPgPool {
  query(queryText: string, values?: unknown[]): Promise<AdminSupportQueryPgResult>;
}

interface AdminSupportQueryInMemoryDb {
  global: Record<string, string | undefined>;
}

export interface AdminSupportQueryRouteDependencies {
  requireMasterAdmin: RequestHandler;
  getIsPostgresActive: () => boolean;
  getPgPool: () => AdminSupportQueryPgPool | null;
  dbInMemoryLocal: AdminSupportQueryInMemoryDb;
}

export function registerAdminSupportQueryRoutes(
  app: Pick<Express, "get">,
  dependencies: AdminSupportQueryRouteDependencies
): void {
  app.get("/api/admin/support", dependencies.requireMasterAdmin, async (req: Request, res: Response): Promise<void> => {
    try {
      let result: Record<string, unknown>[] = [];

      if (dependencies.getIsPostgresActive()) {
        const pgPool = dependencies.getPgPool();

        if (pgPool) {
          const tickets = await pgPool.query(`
            SELECT st.*, c.corporate_name as company_name 
            FROM support_tickets st
            LEFT JOIN companies c ON st.company_id = c.id
            ORDER BY 
              CASE WHEN st.status = 'Aberto' THEN 1 WHEN st.status = 'Em Atendimento' THEN 2 ELSE 3 END, 
              st.created_at DESC
          `);
          result = tickets.rows;
        } else {
          const tickets: Record<string, unknown>[] = JSON.parse(dependencies.dbInMemoryLocal.global["support_tickets"] || "[]");
          const companies: Record<string, unknown>[] = JSON.parse(dependencies.dbInMemoryLocal.global["companies"] || "[]");
          result = tickets.map((st) => {
            const comp = companies.find((c) => c.id === st.company_id);
            return {
              ...st,
              company_name: comp ? comp.corporate_name : "Não Autenticado"
            };
          });
        }
      } else {
        const tickets: Record<string, unknown>[] = JSON.parse(dependencies.dbInMemoryLocal.global["support_tickets"] || "[]");
        const companies: Record<string, unknown>[] = JSON.parse(dependencies.dbInMemoryLocal.global["companies"] || "[]");
        result = tickets.map((st) => {
          const comp = companies.find((c) => c.id === st.company_id);
          return {
            ...st,
            company_name: comp ? comp.corporate_name : "Não Autenticado"
          };
        });
      }
      res.json(result);
    } catch (err) {
      console.error("Erro de suporte Super Admin:", err);
      res.status(500).json({ error: "Erro ao listar chamados de suporte." });
    }
  });
}
