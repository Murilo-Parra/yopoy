import type { Express, Request, RequestHandler, Response } from "express";

interface AdminCustomProviderMappingMutationPgPool {
  query(queryText: string, values: unknown[]): Promise<unknown>;
}

interface AdminCustomProviderMappingMutationRequestBody {
  local_field: unknown;
  provider_field: unknown;
  required: unknown;
  data_type: unknown;
}

export interface AdminCustomProviderMappingMutationRouteDependencies {
  requireMasterAdmin: RequestHandler;
  getPgPool: () => AdminCustomProviderMappingMutationPgPool | null;
  generateUuid: () => string;
}

function getErrorDetails(error: unknown): unknown {
  if (typeof error === "object" && error !== null && "message" in error) {
    return error.message;
  }
  return undefined;
}

export function registerAdminCustomProviderMappingMutationRoutes(
  app: Pick<Express, "post">,
  dependencies: AdminCustomProviderMappingMutationRouteDependencies
): void {
  app.post("/api/admin/custom-providers/:id/mappings", dependencies.requireMasterAdmin, async (req: Request, res: Response): Promise<void> => {
    try {
      const pgPool = dependencies.getPgPool();
      if (!pgPool) {
        res.status(500).json({ error: "Banco de dados não conectado." });
        return;
      }
      const { id } = req.params;
      const {
        local_field, provider_field, required, data_type
      }: AdminCustomProviderMappingMutationRequestBody = req.body;

      const mappingId = dependencies.generateUuid();
      await pgPool.query(`
      INSERT INTO custom_provider_mappings (
        id, provider_id, local_field, provider_field, required, data_type
      ) VALUES ($1, $2, $3, $4, $5, $6)
    `, [mappingId, id, local_field, provider_field, required || false, data_type || 'string']);

      res.status(201).json({ id: mappingId, message: "Mapeamento criado com sucesso" });
    } catch (err) {
      console.error("Erro ao criar mapeamento:", err);
      res.status(500).json({ error: "Falha ao criar mapeamento", details: getErrorDetails(err) });
    }
  });
}
