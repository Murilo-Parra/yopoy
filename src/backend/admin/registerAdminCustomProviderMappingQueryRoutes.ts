import type { Express, Request, RequestHandler, Response } from "express";

interface AdminCustomProviderMappingQueryPgResult {
  rows: Record<string, unknown>[];
}

interface AdminCustomProviderMappingQueryPgPool {
  query(queryText: string, values: unknown[]): Promise<AdminCustomProviderMappingQueryPgResult>;
}

export interface AdminCustomProviderMappingQueryRouteDependencies {
  requireMasterAdmin: RequestHandler;
  getPgPool: () => AdminCustomProviderMappingQueryPgPool | null;
}

function getErrorDetails(error: unknown): unknown {
  if (typeof error === "object" && error !== null && "message" in error) {
    return error.message;
  }
  return undefined;
}

export function registerAdminCustomProviderMappingQueryRoutes(
  app: Pick<Express, "get">,
  dependencies: AdminCustomProviderMappingQueryRouteDependencies
): void {
  app.get("/api/admin/custom-providers/:id/mappings", dependencies.requireMasterAdmin, async (req: Request, res: Response): Promise<void> => {
    try {
      const pgPool = dependencies.getPgPool();
      if (!pgPool) {
        res.json([]);
        return;
      }
      const { id } = req.params;
      const result = await pgPool.query(`
      SELECT * FROM custom_provider_mappings WHERE provider_id = $1
    `, [id]);
      res.json(result.rows);
    } catch (err) {
      console.error("Erro ao listar mapeamentos:", err);
      res.status(500).json({ error: "Falha ao listar mapeamentos", details: getErrorDetails(err) });
    }
  });
}
