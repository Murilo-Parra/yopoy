import { Request, Response } from "express";
import { NfeService } from "../services/NfeService";
import { extractCompanyId, dryRunResponse } from "./helpers";
import { FiscalWriteOperationType } from "../types/fiscalWrite.types";

export class NfeController {
  private nfeService: NfeService;

  constructor(nfeService = new NfeService()) {
    this.nfeService = nfeService;
  }

  async listNfe(req: Request, res: Response): Promise<void> {
    try {
      const companyId = extractCompanyId(req);

      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;
      const offset = req.query.offset ? parseInt(req.query.offset as string, 10) : undefined;
      const status = req.query.status as string | undefined;

      const result = await this.nfeService.listNfe(companyId, {
        limit,
        offset,
        status,
      });

      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Erro ao listar NF-es." });
    }
  }

  async getNfeById(req: Request, res: Response): Promise<void> {
    try {
      const companyId = extractCompanyId(req);
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ error: "id é obrigatório." });
        return;
      }

      const nfe = await this.nfeService.getNfeById(companyId, id);
      if (!nfe) {
        res.status(404).json({ error: "NF-e não encontrada." });
        return;
      }

      res.json(nfe);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Erro ao obter NF-e." });
    }
  }

  async dryRunCreateNfe(req: Request, res: Response): Promise<void> {
    try {
      const companyId = extractCompanyId(req);
      const payload = req.body;
      const result = await this.nfeService.dryRunCreateNfe(companyId, payload);
      dryRunResponse(res, FiscalWriteOperationType.CREATE, result);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Erro ao simular criação de NF-e." });
    }
  }

  async dryRunUpdateNfeStatus(req: Request, res: Response): Promise<void> {
    try {
      const companyId = extractCompanyId(req);
      const { id } = req.params;
      const { status } = req.body;
      const result = await this.nfeService.dryRunUpdateNfeStatus(companyId, id, status);
      dryRunResponse(res, FiscalWriteOperationType.UPDATE, result);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Erro ao simular atualização de status de NF-e." });
    }
  }
}
