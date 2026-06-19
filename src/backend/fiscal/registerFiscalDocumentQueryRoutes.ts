import type { Express, Request, Response } from "express";

interface FiscalDocumentQuerySession {
  company_id: string;
}

interface FiscalDocumentQueryResult {
  documents: unknown[];
  total: number;
}

export interface FiscalDocumentQueryRouteDependencies {
  getSessionFromRequest: (req: Request) => Promise<FiscalDocumentQuerySession | null>;
  getFiscalDocuments: (
    companyId: string,
    limit: number,
    offset: number
  ) => Promise<FiscalDocumentQueryResult>;
  getFiscalDocumentById: (companyId: string, id: string) => Promise<unknown>;
}

export function registerFiscalDocumentQueryRoutes(
  app: Pick<Express, "get">,
  dependencies: FiscalDocumentQueryRouteDependencies
): void {
  app.get("/api/fiscal/documents", async (req: Request, res: Response): Promise<void> => {
    try {
      const session = await dependencies.getSessionFromRequest(req);
      if (!session) {
        res.status(401).json({ error: "Sessão expirada ou Token inválido." });
        return;
      }
      const limit = parseInt(req.query.limit as string, 10) || 10;
      const offset = parseInt(req.query.offset as string, 10) || 0;

      const { documents, total } = await dependencies.getFiscalDocuments(
        session.company_id,
        limit,
        offset
      );
      res.json({ success: true, documents, total });
    } catch (err: unknown) {
      console.error("Erro ao obter documentos fiscais:", err);
      res.status(500).json({ error: "Erro interno ao obter lista de documentos fiscais" });
    }
  });

  app.get("/api/fiscal/documents/:id", async (req: Request, res: Response): Promise<void> => {
    try {
      const session = await dependencies.getSessionFromRequest(req);
      if (!session) {
        res.status(401).json({ error: "Sessão expirada." });
        return;
      }
      const doc = await dependencies.getFiscalDocumentById(session.company_id, req.params.id);
      if (!doc) {
        res.status(404).json({ error: "Documento fiscal não encontrado ou acesso não autorizado." });
        return;
      }
      res.json({ success: true, document: doc });
    } catch (err: unknown) {
      console.error("Erro ao carregar documento fiscal:", err);
      res.status(500).json({ error: "Erro interno ao carregar documento" });
    }
  });
}
