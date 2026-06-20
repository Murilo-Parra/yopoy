import type { Express, Request, RequestHandler, Response } from "express";

interface AdminCustomProviderUpdatePgPool {
  query(queryText: string, values?: unknown[]): Promise<unknown>;
}

interface AdminCustomProviderUpdateRequestBody {
  name: unknown;
  city: unknown;
  state: unknown;
  ibge_code: unknown;
  production_url: unknown;
  homologation_url: unknown;
  communication_type: unknown;
  authentication_type: unknown;
  active: unknown;
}

export interface AdminCustomProviderUpdateRouteDependencies {
  requireMasterAdmin: RequestHandler;
  getPgPool: () => AdminCustomProviderUpdatePgPool | null;
}

function getErrorDetails(error: unknown): unknown {
  if (typeof error === "object" && error !== null && "message" in error) {
    return error.message;
  }
  return undefined;
}

export function registerAdminCustomProviderUpdateRoutes(
  app: Pick<Express, "put">,
  dependencies: AdminCustomProviderUpdateRouteDependencies
): void {
  app.put("/api/admin/custom-providers/:id", dependencies.requireMasterAdmin, async (req: Request, res: Response): Promise<void> => {
    try {
      const pgPool = dependencies.getPgPool();
      if (!pgPool) {
        res.status(500).json({ error: "Banco de dados não conectado." });
        return;
      }
      const { id } = req.params;
      const {
        name, city, state, ibge_code, production_url, homologation_url,
        communication_type, authentication_type, active
      }: AdminCustomProviderUpdateRequestBody = req.body;

      await pgPool.query(`
      UPDATE custom_nfse_providers SET
        name = $1, city = $2, state = $3, ibge_code = $4, production_url = $5, homologation_url = $6,
        communication_type = $7, authentication_type = $8, active = $9, updated_at = CURRENT_TIMESTAMP
      WHERE id = $10
    `, [
        name, city, state, ibge_code, production_url, homologation_url,
        communication_type, authentication_type, active, id
      ]);

      res.json({ message: "Provedor atualizado com sucesso" });
    } catch (err) {
      console.error("Erro ao atualizar provedor customizado:", err);
      res.status(500).json({ error: "Falha ao atualizar provedor", details: getErrorDetails(err) });
    }
  });
}
