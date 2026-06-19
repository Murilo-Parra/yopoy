import type { Express, Request, Response } from "express";
import { FiscalProviderResolver } from "../../utils/locationResolver";

export function registerFiscalDiscoveryRoutes(app: Pick<Express, "post">): void {
  // Endpoint para consulta em tempo real e simulação de descoberta sem salvar
  app.post("/api/fiscal/discover", (req: Request, res: Response): void => {
    try {
      const { city, state_uf, ibge_code } = req.body;
      const resolved = FiscalProviderResolver(state_uf, city, ibge_code);
      res.json({ success: true, resolved });
    } catch (err) {
      console.error("Erro na rota de descoberta:", err);
      res.status(500).json({ error: "Erro interno no servidor ao descobrir provedor fiscal" });
    }
  });
}
