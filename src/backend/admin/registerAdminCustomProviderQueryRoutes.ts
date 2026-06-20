import type { Express, Request, RequestHandler, Response } from "express";

interface AdminCustomProviderQueryPgResult {
  rows: Record<string, unknown>[];
}

interface AdminCustomProviderQueryPgPool {
  query(queryText: string): Promise<AdminCustomProviderQueryPgResult>;
}

export interface AdminCustomProviderQueryRouteDependencies {
  requireMasterAdmin: RequestHandler;
  getPgPool: () => AdminCustomProviderQueryPgPool | null;
}

function getErrorDetails(error: unknown): unknown {
  if (typeof error === "object" && error !== null && "message" in error) {
    return error.message;
  }
  return undefined;
}

export function registerAdminCustomProviderQueryRoutes(
  app: Pick<Express, "get">,
  dependencies: AdminCustomProviderQueryRouteDependencies
): void {
  app.get("/api/admin/custom-providers", dependencies.requireMasterAdmin, async (req: Request, res: Response): Promise<void> => {
    try {
      const pgPool = dependencies.getPgPool();
      if (!pgPool) {
        res.json([]);
        return;
      }
      const result = await pgPool.query(`
      SELECT * FROM custom_nfse_providers ORDER BY created_at DESC
    `);
      res.json(result.rows);
    } catch (err) {
      console.error("Erro ao listar provedores customizados:", err);
      res.status(500).json({ error: "Falha ao listar provedores customizados", details: getErrorDetails(err) });
    }
  });
}
