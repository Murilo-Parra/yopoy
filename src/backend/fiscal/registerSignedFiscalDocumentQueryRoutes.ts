import type { Express, Request, Response } from "express";

interface SignedFiscalDocumentQuerySession {
  company_id: string;
}

interface SignedFiscalDocument {
  id?: unknown;
  document_id?: unknown;
  [key: string]: unknown;
}

export interface SignedFiscalDocumentQueryRouteDependencies {
  getSessionFromRequest: (
    req: Request
  ) => Promise<SignedFiscalDocumentQuerySession | null>;
  getSignedDocuments: (companyId: string) => Promise<SignedFiscalDocument[]>;
}

export function registerSignedFiscalDocumentQueryRoutes(
  app: Pick<Express, "get">,
  dependencies: SignedFiscalDocumentQueryRouteDependencies
): void {
  // 4. Listar todas as assinaturas geradas (xmls assinados)
  app.get("/api/fiscal/documents/signed", async (req: Request, res: Response): Promise<void> => {
    try {
      const session = await dependencies.getSessionFromRequest(req);
      if (!session) {
        res.status(401).json({ error: "Sessão expirada." });
        return;
      }

      const signedDocs = await dependencies.getSignedDocuments(session.company_id);
      res.json({ success: true, signedDocuments: signedDocs });
    } catch (err: unknown) {
      console.error("Erro ao obter assinaturas digitais:", err);
      res.status(500).json({ error: "Erro interno ao carregar documentos fiscais assinados." });
    }
  });

  // 5. Obter XML assinado específico por ID
  app.get("/api/fiscal/documents/signed/:id", async (req: Request, res: Response): Promise<void> => {
    try {
      const session = await dependencies.getSessionFromRequest(req);
      if (!session) {
        res.status(401).json({ error: "Sessão inválida." });
        return;
      }

      const signedDocs = await dependencies.getSignedDocuments(session.company_id);
      const target = signedDocs.find(
        (d) => d.id === req.params.id || d.document_id === req.params.id
      );

      if (!target) {
        res.status(404).json({ error: "O documento assinado correspondente a esta busca não foi localizado." });
        return;
      }

      res.json({ success: true, signedDocument: target });
    } catch (err: unknown) {
      console.error("Erro ao carregar xml assinado:", err);
      res.status(500).json({ error: "Falha ao carregar metadados e arquivos assinados." });
    }
  });
}
