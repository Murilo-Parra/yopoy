import type { Express, Request, RequestHandler, Response } from "express";

interface AdminAffiliateQueryPgResult {
  rows: Record<string, unknown>[];
}

interface AdminAffiliateQueryPgPool {
  query(queryText: string, values?: unknown[]): Promise<AdminAffiliateQueryPgResult>;
}

interface AdminAffiliateQueryInMemoryDb {
  global: Record<string, string | undefined>;
}

export interface AdminAffiliateQueryRouteDependencies {
  requireMasterAdmin: RequestHandler;
  getIsPostgresActive: () => boolean;
  getPgPool: () => AdminAffiliateQueryPgPool | null;
  dbInMemoryLocal: AdminAffiliateQueryInMemoryDb;
}

export function registerAdminAffiliateQueryRoutes(
  app: Pick<Express, "get">,
  dependencies: AdminAffiliateQueryRouteDependencies
): void {
  app.get("/api/admin/affiliates", dependencies.requireMasterAdmin, async (req: Request, res: Response): Promise<void> => {
    try {
      let result: Record<string, unknown>[] = [];

      if (dependencies.getIsPostgresActive()) {
        const pgPool = dependencies.getPgPool();

        if (pgPool) {
          const affs = await pgPool.query("SELECT * FROM affiliates ORDER BY created_at DESC");
          result = affs.rows;
        } else {
          result = JSON.parse(dependencies.dbInMemoryLocal.global["affiliates"] || "[]");
        }
      } else {
        result = JSON.parse(dependencies.dbInMemoryLocal.global["affiliates"] || "[]");
      }

      res.json(result);
    } catch (err) {
      console.error("Erro ao listar afiliados:", err);
      res.status(500).json({ error: "Erro ao listar afiliados." });
    }
  });
}
