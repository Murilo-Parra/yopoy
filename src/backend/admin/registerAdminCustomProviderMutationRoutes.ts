import type { Express, Request, RequestHandler, Response } from "express";

interface AdminCustomProviderMutationPgPool {
  query(queryText: string, values?: unknown[]): Promise<unknown>;
}

interface AdminCustomProviderMutationRequestBody {
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

export interface AdminCustomProviderMutationRouteDependencies {
  requireMasterAdmin: RequestHandler;
  getPgPool: () => AdminCustomProviderMutationPgPool | null;
  generateUuid: () => string;
}

function getErrorDetails(error: unknown): unknown {
  if (typeof error === "object" && error !== null && "message" in error) {
    return error.message;
  }
  return undefined;
}

export function registerAdminCustomProviderMutationRoutes(
  app: Pick<Express, "post">,
  dependencies: AdminCustomProviderMutationRouteDependencies
): void {
  app.post("/api/admin/custom-providers", dependencies.requireMasterAdmin, async (req: Request, res: Response): Promise<void> => {
    try {
      const pgPool = dependencies.getPgPool();
      if (!pgPool) {
        res.status(500).json({ error: "Banco de dados não conectado." });
        return;
      }
      const {
        name, city, state, ibge_code, production_url, homologation_url,
        communication_type, authentication_type, active
      }: AdminCustomProviderMutationRequestBody = req.body;

      if (!name) {
        res.status(400).json({ error: "Nome é obrigatório." });
        return;
      }

      const id = dependencies.generateUuid();
      await pgPool.query(`
      INSERT INTO custom_nfse_providers (
        id, name, city, state, ibge_code, production_url, homologation_url, communication_type, authentication_type, active
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    `, [
        id, name, city, state, ibge_code, production_url, homologation_url,
        communication_type, authentication_type, active !== false
      ]);

      res.status(201).json({ id, message: "Provedor criado com sucesso" });
    } catch (err) {
      console.error("Erro ao criar provedor customizado:", err);
      res.status(500).json({ error: "Falha ao criar provedor", details: getErrorDetails(err) });
    }
  });
}
