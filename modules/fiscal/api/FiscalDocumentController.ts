import { Request, Response } from "express";
import { FiscalDocumentService } from "../services/FiscalDocumentService";
import { extractCompanyId, dryRunResponse } from "./helpers";
import { FiscalWriteOperationType } from "../types/fiscalWrite.types";

export class FiscalDocumentController {
  private fiscalDocumentService: FiscalDocumentService;

  constructor(fiscalDocumentService = new FiscalDocumentService()) {
    this.fiscalDocumentService = fiscalDocumentService;
  }

  async listDocuments(req: Request, res: Response): Promise<void> {
    try {
      const companyId = extractCompanyId(req);
      
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;
      const offset = req.query.offset ? parseInt(req.query.offset as string, 10) : undefined;
      const documentType = req.query.documentType as string | undefined;

      const result = await this.fiscalDocumentService.listDocuments(companyId, {
        limit,
        offset,
        documentType,
      });

      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Erro ao listar documentos fiscais." });
    }
  }

  async getDocumentById(req: Request, res: Response): Promise<void> {
    try {
      const companyId = extractCompanyId(req);
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ error: "id é obrigatório." });
        return;
      }

      const document = await this.fiscalDocumentService.getDocumentById(companyId, id);
      if (!document) {
        res.status(404).json({ error: "Documento fiscal não encontrado." });
        return;
      }

      res.json(document);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Erro ao obter documento fiscal." });
    }
  }

  async dryRunCreateDocument(req: Request, res: Response): Promise<void> {
    try {
      const companyId = extractCompanyId(req);
      const payload = req.body;
      const result = await this.fiscalDocumentService.dryRunCreateDocument(companyId, payload);
      dryRunResponse(res, FiscalWriteOperationType.CREATE, result);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Erro ao simular criação de documento fiscal." });
    }
  }
}
