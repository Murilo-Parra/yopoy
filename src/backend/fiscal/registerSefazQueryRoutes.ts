import type { Express, Request, Response } from "express";

interface SefazQuerySession {
  company_id: string;
}

export interface SefazQueryRouteDependencies {
  getSessionFromRequest: (req: Request) => Promise<SefazQuerySession | null>;
  getSefazProtocols: (companyId: string) => Promise<unknown[]>;
  getFiscalEvents: (companyId: string, documentId?: string) => Promise<unknown[]>;
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

export function registerSefazQueryRoutes(
  app: Pick<Express, "get">,
  dependencies: SefazQueryRouteDependencies
): void {
  // 3. RECUPERAR HISTÓRICO DE PROTOCOLOS EMITIDOS (SEFAZ_PROTOCOLS)
  app.get("/api/sefaz/protocols", async (req: Request, res: Response): Promise<void> => {
    try {
      const session = await dependencies.getSessionFromRequest(req);
      if (!session) {
        res.status(401).json({ error: "Sessão inválida." });
        return;
      }

      const protocols = await dependencies.getSefazProtocols(session.company_id);
      res.json({ success: true, protocols });
    } catch (err: unknown) {
      console.error("Erro ao carregar protocolos SEFAZ:", err);
      res.status(500).json({ error: `Falha ao ler histórico de faturas autorizadas: ${getErrorDetail(err)}` });
    }
  });

  // 5.3 HISTÓRICO COMPLETO GLOBAL OU POR DOCUMENTO DE EVENTOS FISCAIS (MULTI-TENANT ISOLADO)
  app.get("/api/sefaz/events", async (req: Request, res: Response): Promise<void> => {
    try {
      const session = await dependencies.getSessionFromRequest(req);
      if (!session) {
        res.status(401).json({ error: "Sessão expirada." });
        return;
      }
      const events = await dependencies.getFiscalEvents(session.company_id);
      res.json({ success: true, events });
    } catch (err: unknown) {
      console.error("Erro ao consultar histórico global de eventos:", err);
      res.status(500).json({ error: `Erro ao carregar histórico fiscal: ${getErrorDetail(err)}` });
    }
  });

  app.get("/api/sefaz/events/:docId", async (req: Request, res: Response): Promise<void> => {
    try {
      const session = await dependencies.getSessionFromRequest(req);
      if (!session) {
        res.status(401).json({ error: "Sessão expirada." });
        return;
      }
      const docId = req.params.docId;
      const events = await dependencies.getFiscalEvents(session.company_id, docId);
      res.json({ success: true, events });
    } catch (err: unknown) {
      console.error("Erro ao listar eventos do documento:", err);
      res.status(500).json({ error: `Erro ao recuperar eventos fiscais listados: ${getErrorDetail(err)}` });
    }
  });
}
