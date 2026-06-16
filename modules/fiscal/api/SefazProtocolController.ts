import { Request, Response } from "express";
import { SefazProtocolService } from "../services/SefazProtocolService";
import { extractCompanyId, dryRunResponse } from "./helpers";
import { FiscalWriteOperationType } from "../types/fiscalWrite.types";

export class SefazProtocolController {
  private sefazProtocolService: SefazProtocolService;

  constructor(sefazProtocolService = new SefazProtocolService()) {
    this.sefazProtocolService = sefazProtocolService;
  }

  async listProtocols(req: Request, res: Response): Promise<void> {
    try {
      const companyId = extractCompanyId(req);

      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;
      const offset = req.query.offset ? parseInt(req.query.offset as string, 10) : undefined;

      const result = await this.sefazProtocolService.listProtocols(companyId, {
        limit,
        offset,
      });

      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Erro ao listar protocolos SEFAZ." });
    }
  }

  async getProtocolsByDocumentId(req: Request, res: Response): Promise<void> {
    try {
      const companyId = extractCompanyId(req);
      const { documentId } = req.params;

      if (!documentId) {
        res.status(400).json({ error: "documentId é obrigatório." });
        return;
      }

      const protocols = await this.sefazProtocolService.getProtocolsByDocumentId(companyId, documentId);
      res.json(protocols);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Erro ao obter protocolos por ID de documento." });
    }
  }

  async dryRunSaveProtocol(req: Request, res: Response): Promise<void> {
    try {
      const companyId = extractCompanyId(req);
      const payload = req.body;
      const result = await this.sefazProtocolService.dryRunSaveProtocol(companyId, payload);
      dryRunResponse(res, FiscalWriteOperationType.SAVE, result);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Erro ao simular salvamento de protocolo SEFAZ." });
    }
  }
}
