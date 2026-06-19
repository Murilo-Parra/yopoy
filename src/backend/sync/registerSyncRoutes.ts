import type { Express, Request, Response } from "express";

interface SyncSession {
  company_id: string;
}

type SyncSavePayload = Record<string, unknown> & {
  key?: string;
  value: string | null;
};

export interface SyncRouteDependencies {
  getSessionFromRequest: (req: Request) => Promise<SyncSession | null>;
  saveSyncKey: (identifier: string, key: string, value: string | null) => Promise<void>;
  loadSyncData: (identifier: string) => Promise<{
    global: Record<string, string>;
    scoped: Record<string, string>;
  }>;
}

function getErrorMessage(error: unknown): unknown {
  if ((typeof error === "object" && error !== null) || typeof error === "function") {
    if ("message" in error) {
      return error.message;
    }
  }

  return undefined;
}

export function registerSyncRoutes(
  app: Pick<Express, "get" | "post">,
  dependencies: SyncRouteDependencies
): void {
  // Rota de sincronização: Salvar chave de localStorage no PostgreSQL / Fallback local com isolamento absoluto
  app.post("/api/sync/save", async (req: Request<Record<string, string>, unknown, SyncSavePayload>, res: Response): Promise<void> => {
    try {
      const { key, value } = req.body;
      if (!key) {
        res.status(400).json({ error: "Chave inválida." });
        return;
      }

      // Se houver sessão ativa, sobrepomos o identificador com o company_id correto. Caso contrário, restrito a 'guest'!
      const session = await dependencies.getSessionFromRequest(req);
      const identifier = session ? session.company_id : "guest";

      await dependencies.saveSyncKey(identifier, key, value);
      res.json({ success: true });
    } catch (err: unknown) {
      console.error("Erro ao salvar sincronia de dados:", err);
      res.status(500).json({ error: getErrorMessage(err) || "Erro interno de sincronia" });
    }
  });

  // Rota de sincronização: Carregar chaves do PostgreSQL com isolamento absoluto
  app.get("/api/sync/load", async (req: Request, res: Response): Promise<void> => {
    try {
      // Se houver sessão ativa, sobrepomos o identificador com o company_id correto. Caso contrário, restrito a 'guest'!
      const session = await dependencies.getSessionFromRequest(req);
      const identifier = session ? session.company_id : "guest";

      const data = await dependencies.loadSyncData(identifier);
      res.json(data);
    } catch (err: unknown) {
      console.error("Erro ao carregar sincronia de dados:", err);
      res.status(500).json({ error: getErrorMessage(err) || "Erro interno de sincronia" });
    }
  });
}
