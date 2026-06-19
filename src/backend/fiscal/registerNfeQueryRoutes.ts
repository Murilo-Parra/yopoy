import type { Express, Request, Response } from "express";

interface NfeQuerySession {
  company_id: string;
  user_id: string;
}

interface NfeQueryFilters {
  invoice_number?: number;
  series?: number;
  customer_id?: string;
  status?: string;
}

interface NfeQueryDocument {
  invoice_number: unknown;
  series: unknown;
  [key: string]: unknown;
}

export interface NfeQueryRouteDependencies {
  getSessionFromRequest: (req: Request) => Promise<NfeQuerySession | null>;
  getNfeDocuments: (
    companyId: string,
    filters?: NfeQueryFilters
  ) => Promise<unknown[]>;
  getNfeDocumentById: (
    companyId: string,
    id: string
  ) => Promise<NfeQueryDocument | null>;
  logAudit: (
    companyId: string | null,
    userId: string | null,
    action: string,
    details: string,
    ip: string
  ) => Promise<void>;
}

function getErrorDetail(error: unknown): string {
  if (
    typeof error === "object"
    && error !== null
    && "message" in error
    && error.message
  ) {
    return String(error.message);
  }
  return String(error);
}

export function registerNfeQueryRoutes(
  app: Pick<Express, "get">,
  dependencies: NfeQueryRouteDependencies
): void {
  // 1. LISTAR TODAS AS NF-E COM FILTROS E PAGINAÇÃO
  app.get("/api/nfe", async (req: Request, res: Response): Promise<void> => {
    try {
      const session = await dependencies.getSessionFromRequest(req);
      if (!session) {
        res.status(401).json({ error: "Sessão expirada para ler notas." });
        return;
      }
      const invoice_number = req.query.invoice_number ? parseInt(req.query.invoice_number as string, 10) : undefined;
      const series = req.query.series ? parseInt(req.query.series as string, 10) : undefined;
      const customer_id = req.query.customer_id ? String(req.query.customer_id) : undefined;
      const status = req.query.status ? String(req.query.status) : undefined;

      const docs = await dependencies.getNfeDocuments(session.company_id, { invoice_number, series, customer_id, status });

      // Log audit consulta
      const ip = req.ip || (req.headers["x-forwarded-for"] as string) || "127.0.0.1";
      await dependencies.logAudit(session.company_id, session.user_id, "CONSULTA_NFE_LISTA", `Consultou lista de NF-e executada com filtros: ${JSON.stringify(req.query)}`, ip);

      res.json({ success: true, documents: docs });
    } catch (err: unknown) {
      console.error("Erro ao ler nfe_documents:", err);
      res.status(500).json({ error: `Falha ao obter lista de NF-e: ${getErrorDetail(err)}` });
    }
  });

  // 2. OBTER DETALHES DE UMA NF-E ESPECÍFICA (MULTI-TENANT SAFE)
  app.get("/api/nfe/:id", async (req: Request, res: Response): Promise<void> => {
    try {
      const session = await dependencies.getSessionFromRequest(req);
      if (!session) {
        res.status(401).json({ error: "Sessão expirada." });
        return;
      }
      const doc = await dependencies.getNfeDocumentById(session.company_id, req.params.id);
      if (!doc) {
        res.status(404).json({ error: "Documento fiscal NF-e não encontrado de forma multi-tenant segura." });
        return;
      }

      // Log audit consulta individual
      const ip = req.ip || (req.headers["x-forwarded-for"] as string) || "127.0.0.1";
      await dependencies.logAudit(session.company_id, session.user_id, "CONSULTA_NFE_INDIVIDUAL", `Consultou detalhes da NF-e Nº ${doc.invoice_number} Série ${doc.series}.`, ip);

      res.json({ success: true, document: doc });
    } catch (err: unknown) {
      console.error("Erro ao obter documento NF-e:", err);
      res.status(500).json({ error: `Erro técnico ao ler documento: ${getErrorDetail(err)}` });
    }
  });
}
