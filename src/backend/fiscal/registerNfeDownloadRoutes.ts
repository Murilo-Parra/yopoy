import type { Express, Request, Response } from "express";

interface NfeDownloadSession {
  company_id: string;
  user_id: string;
}

interface NfeDownloadDocument {
  invoice_number: unknown;
  series: unknown;
  status: unknown;
  xml_authorized: unknown;
  xml_signed: unknown;
  xml_original: unknown;
}

export interface NfeDownloadRouteDependencies {
  getSessionFromRequest: (req: Request) => Promise<NfeDownloadSession | null>;
  getNfeDocumentById: (
    companyId: string,
    id: string
  ) => Promise<NfeDownloadDocument | null>;
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

export function registerNfeDownloadRoutes(
  app: Pick<Express, "get">,
  dependencies: NfeDownloadRouteDependencies
): void {
  app.get("/api/nfe/:id/download", async (req: Request, res: Response): Promise<void> => {
    const ip = req.ip || (req.headers["x-forwarded-for"] as string) || "127.0.0.1";
    try {
      const session = await dependencies.getSessionFromRequest(req);
      if (!session) {
        res.status(401).json({ error: "Sessão expirada." });
        return;
      }

      const doc = await dependencies.getNfeDocumentById(session.company_id, req.params.id);
      if (!doc) {
        res.status(404).json({ error: "Documento fiscal não localizado ou acesso negado à sua companhia." });
        return;
      }

      const xmlContent = doc.xml_authorized || doc.xml_signed || doc.xml_original;
      if (!xmlContent) {
        res.status(404).json({ error: "O XML correspondente a este documento faturado está vazio ou ausente." });
        return;
      }

      await dependencies.logAudit(session.company_id, session.user_id, "DOWNLOAD_XML_NFE", `Efetuou download de arquivo XML da NF-e N ${doc.invoice_number} Série ${doc.series}. [Ambiente: Sefaz Ativo]`, ip);

      res.set("Content-Type", "application/xml");
      res.set("Content-Disposition", `attachment; filename=NFe_${doc.invoice_number}_Serie_${doc.series}_${doc.status}.xml`);
      res.send(xmlContent);
    } catch (err: unknown) {
      console.error("Erro ao baixar faturamento XML:", err);
      res.status(500).json({ error: `Erro na extração do faturamento: ${getErrorDetail(err)}` });
    }
  });
}
