import type { Express, Request, RequestHandler, Response } from "express";

interface AdminCustomProviderTemplateMutationPgPool {
  query(queryText: string, values: unknown[]): Promise<unknown>;
}

interface AdminCustomProviderTemplateMutationRequestBody {
  template_name: unknown;
  template_xml: unknown;
  version: unknown;
}

export interface AdminCustomProviderTemplateMutationRouteDependencies {
  requireMasterAdmin: RequestHandler;
  getPgPool: () => AdminCustomProviderTemplateMutationPgPool | null;
  generateUuid: () => string;
}

function getErrorDetails(error: unknown): unknown {
  if (typeof error === "object" && error !== null && "message" in error) {
    return error.message;
  }
  return undefined;
}

export function registerAdminCustomProviderTemplateMutationRoutes(
  app: Pick<Express, "post">,
  dependencies: AdminCustomProviderTemplateMutationRouteDependencies
): void {
  app.post("/api/admin/custom-providers/:id/templates", dependencies.requireMasterAdmin, async (req: Request, res: Response): Promise<void> => {
    try {
      const pgPool = dependencies.getPgPool();
      if (!pgPool) {
        res.status(500).json({ error: "Banco de dados não conectado." });
        return;
      }
      const { id } = req.params;
      const { template_name, template_xml, version }: AdminCustomProviderTemplateMutationRequestBody = req.body;

      const templateId = dependencies.generateUuid();
      await pgPool.query(`
      INSERT INTO custom_provider_templates (
        id, provider_id, template_name, template_xml, version
      ) VALUES ($1, $2, $3, $4, $5)
    `, [templateId, id, template_name, template_xml, version || '1.0']);

      res.status(201).json({ id: templateId, message: "Template criado com sucesso" });
    } catch (err) {
      console.error("Erro ao criar template:", err);
      res.status(500).json({ error: "Falha ao criar template", details: getErrorDetails(err) });
    }
  });
}
