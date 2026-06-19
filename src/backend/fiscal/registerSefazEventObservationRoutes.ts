import type { Express, Request, Response } from "express";

interface SefazEventObservationSession {
  company_id: string;
}

interface SefazEventObservationQueryResult {
  rows: Record<string, unknown>[];
}

interface SefazEventObservationPgPool {
  query(
    queryText: string,
    values?: unknown[]
  ): Promise<SefazEventObservationQueryResult>;
}

interface SefazEventObservationAuditService {
  getLogs(companyId: string, limit: number): Promise<unknown>;
}

export interface SefazEventObservationRouteDependencies {
  getSessionFromRequest: (
    req: Request
  ) => Promise<SefazEventObservationSession | null>;
  getPgPool: () => SefazEventObservationPgPool | null;
  sefazEventAuditService: SefazEventObservationAuditService;
}

function getErrorMessage(error: unknown): unknown {
  if (
    (typeof error === "object" && error !== null)
    || typeof error === "function"
  ) {
    if ("message" in error) {
      return error.message;
    }
  }
  return undefined;
}

export function registerSefazEventObservationRoutes(
  app: Pick<Express, "get">,
  dependencies: SefazEventObservationRouteDependencies
): void {
  app.get("/api/sefaz/distribuicao", async (req: Request, res: Response): Promise<void> => {
    try {
      const session = await dependencies.getSessionFromRequest(req);
      if (!session) { res.status(401).json({ error: "Sessão inválida" }); return; }
      
      const limit = parseInt(req.query.limit as string) || 100;
      const pgPool = dependencies.getPgPool();

      const result = pgPool ? await pgPool.query(
        'SELECT * FROM sefaz_distribution_documents WHERE company_id = $1 ORDER BY created_at DESC LIMIT $2', 
        [session.company_id, limit]
      ) : {rows:[]};

      res.json(result.rows || []);
    } catch (err: unknown) {
      res.status(500).json({ error: getErrorMessage(err) });
    }
  });

  app.get("/api/sefaz/event-queue", async (req: Request, res: Response): Promise<void> => {
    try {
      const session = await dependencies.getSessionFromRequest(req);
      if (!session) { res.status(401).json({ error: "Sessão inválida" }); return; }

      const pgPool = dependencies.getPgPool();
      const result = pgPool ? await pgPool.query(
        'SELECT * FROM sefaz_event_queue WHERE company_id = $1 ORDER BY created_at DESC LIMIT 50', 
        [session.company_id]
      ) : {rows: []};
      res.json(result.rows || []);
    } catch (err: unknown) {
      res.status(500).json({ error: getErrorMessage(err) });
    }
  });

  app.get("/api/sefaz/audit-logs", async (req: Request, res: Response): Promise<void> => {
    try {
      const session = await dependencies.getSessionFromRequest(req);
      if (!session) { res.status(401).json({ error: "Sessão inválida" }); return; }

      const logs = await dependencies.sefazEventAuditService.getLogs(session.company_id, 100);
      res.json(logs);
    } catch (err: unknown) {
      res.status(500).json({ error: getErrorMessage(err) });
    }
  });
}
