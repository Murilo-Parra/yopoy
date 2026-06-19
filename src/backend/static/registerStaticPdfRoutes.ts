import fs from "fs";
import path from "path";
import type { Express, Request, Response } from "express";

export function registerStaticPdfRoutes(app: Pick<Express, "get">): void {
  // Rota pública para acessar/baixar o Manual Operacional (PDF)
  app.get("/manual.pdf", (req: Request, res: Response) => {
    const manualPath = path.join(process.cwd(), "MANUAL_OPERACIONAL.pdf");
    if (fs.existsSync(manualPath)) {
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", 'attachment; filename="MANUAL_OPERACIONAL.pdf"');
      res.sendFile(manualPath);
    } else {
      res.status(404).send("Manual em PDF não encontrado no servidor.");
    }
  });


  app.get("/relatorio-nfse.pdf", (req: Request, res: Response) => {
    const manualPath = path.join(process.cwd(), "RELATORIO_NFSE_INTEGRACAO.pdf");
    if (fs.existsSync(manualPath)) {
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", 'attachment; filename="RELATORIO_NFSE_INTEGRACAO.pdf"');
      res.sendFile(manualPath);
    } else {
      res.status(404).send("Relatório PDF não encontrado no servidor.");
    }
  });

  app.get("/relatorio-eventos.pdf", (req: Request, res: Response) => {
    const manualPath = path.join(process.cwd(), "RELATORIO_EVENTOS_SEFAZ.pdf");
    if (fs.existsSync(manualPath)) {
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", 'attachment; filename="RELATORIO_EVENTOS_SEFAZ.pdf"');
      res.sendFile(manualPath);
    } else {
      res.status(404).send("Relatório PDF não encontrado no servidor.");
    }
  });
}
