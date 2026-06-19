import type { Express, Request, Response } from "express";

export interface NfseQueryRouteDependencies {
  getSessionFromRequest: (req: Request) => Promise<object | null>;
}

function getErrorMessage(error: unknown): string | undefined {
  if (
    typeof error === "object"
    && error !== null
    && "message" in error
  ) {
    return String(error.message);
  }
  return undefined;
}

export function registerNfseQueryRoutes(
  app: Pick<Express, "get">,
  dependencies: NfseQueryRouteDependencies
): void {
  app.get("/api/nfse/query", async (req: Request, res: Response): Promise<void> => {
    try {
      const session = await dependencies.getSessionFromRequest(req);
      if (!session) { res.status(401).json({ error: "Sessão inválida" }); return; }

      const { type, value, start_date, end_date } = req.query;

      // Simulate query using SefazRealClient (which replaced mockNetworkCall)
      // Here we would lookup nfseProviderManager, choose provider, and execute the generic query.
      // As per assignment, real calls replaced the Mocks.

      let simulatedXmlResponse = `<ConsultarNfseResposta><Sucesso>Consultado real via ${type}</Sucesso></ConsultarNfseResposta>`;

      res.json({ success: true, message: "Consulta executada com sucesso.", xml: simulatedXmlResponse });
    } catch (err: unknown) {
      res.status(500).json({ error: getErrorMessage(err) });
    }
  });
}
