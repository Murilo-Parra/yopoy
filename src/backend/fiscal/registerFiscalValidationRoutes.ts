import type { Express, Request, Response } from "express";
import { XmlValidator } from "../../utils/xmlGenerator";

export function registerFiscalValidationRoutes(app: Pick<Express, "post">): void {
  app.post("/api/fiscal/documents/validate-payload", (req: Request, res: Response): void => {
    try {
      const { payload } = req.body;
      if (!payload) {
        res.status(400).json({ error: "Payload do documento é obrigatório" });
        return;
      }
      const errors = XmlValidator.validate(payload);
      res.json({ success: true, valid: errors.length === 0, errors });
    } catch (err) {
      console.error("Erro ao validar payload tributário:", err);
      res.status(500).json({ error: "Erro ao executar validação em lote" });
    }
  });
}
