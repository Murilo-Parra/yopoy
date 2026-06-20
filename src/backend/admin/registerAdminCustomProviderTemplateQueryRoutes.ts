import type { Express, Request, RequestHandler, Response } from "express";

interface AdminCustomProviderTemplateQueryPgResult {
  rows: Record<string, unknown>[];
}

interface AdminCustomProviderTemplateQueryPgPool {
  query(queryText: string, values: unknown[]): Promise<AdminCustomProviderTemplateQueryPgResult>;
}

export interface AdminCustomProviderTemplateQueryRouteDependencies {
  requireMasterAdmin: RequestHandler;
  getPgPool: () => AdminCustomProviderTemplateQueryPgPool | null;
}

function getErrorDetails(error: unknown): unknown {
  if (typeof error === "object" && error !== null && "message" in error) {
    return error.message;
  }
  return undefined;
}

export function registerAdminCustomProviderTemplateQueryRoutes(
  app: Pick<Express, "get">,
  dependencies: AdminCustomProviderTemplateQueryRouteDependencies
): void {
  app.get("/api/admin/custom-providers/:id/templates", dependencies.requireMasterAdmin, async (req: Request, res: Response): Promise<void> => {
    try {
      const pgPool = dependencies.getPgPool();
      if (!pgPool) {
        res.json([]);
        return;
      }
      const { id } = req.params;
      const result = await pgPool.query(`
      SELECT * FROM custom_provider_templates WHERE provider_id = $1
    `, [id]);
      res.json(result.rows);
    } catch (err) {
      console.error("Erro ao listar templates:", err);
      res.status(500).json({ error: "Falha ao listar templates", details: getErrorDetails(err) });
    }
  });
}
