import { Request, Response } from "express";
import { DanfeService } from "../services/DanfeService";
import { extractCompanyId, dryRunResponse } from "./helpers";
import { FiscalWriteOperationType } from "../types/fiscalWrite.types";

export class DanfeController {
  private danfeService: DanfeService;

  constructor(danfeService = new DanfeService()) {
    this.danfeService = danfeService;
  }

  async listDanfe(req: Request, res: Response): Promise<void> {
    try {
      const companyId = extractCompanyId(req);

      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;
      const offset = req.query.offset ? parseInt(req.query.offset as string, 10) : undefined;
      const documentType = req.query.documentType as string | undefined;

      const result = await this.danfeService.listDanfe(companyId, {
        limit,
        offset,
        documentType,
      });

      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Erro ao listar DANFEs." });
    }
  }

  async getDanfeById(req: Request, res: Response): Promise<void> {
    try {
      const companyId = extractCompanyId(req);
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ error: "id é obrigatório." });
        return;
      }

      const danfe = await this.danfeService.getDanfeById(companyId, id);
      if (!danfe) {
        res.status(404).json({ error: "DANFE não encontrado." });
        return;
      }

      res.json(danfe);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Erro ao obter DANFE por id." });
    }
  }

  async getDanfeByNfeId(req: Request, res: Response): Promise<void> {
    try {
      const companyId = extractCompanyId(req);
      const { nfeId } = req.params;

      if (!nfeId) {
        res.status(400).json({ error: "nfeId é obrigatório." });
        return;
      }

      const danfe = await this.danfeService.getDanfeByNfeId(companyId, nfeId);
      if (!danfe) {
        res.status(404).json({ error: "DANFE não encontrado para a NFe fornecida." });
        return;
      }

      res.json(danfe);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Erro ao obter DANFE por nfeId." });
    }
  }

  async dryRunSaveDanfe(req: Request, res: Response): Promise<void> {
    try {
      const companyId = extractCompanyId(req);
      const payload = req.body;
      const result = await this.danfeService.dryRunSaveDanfe(companyId, payload);
      dryRunResponse(res, FiscalWriteOperationType.SAVE, result);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Erro ao simular salvamento de DANFE." });
    }
  }
}
