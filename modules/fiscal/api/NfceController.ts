import { Request, Response } from "express";
import { NfceService } from "../services/NfceService";
import { extractCompanyId, dryRunResponse } from "./helpers";
import { FiscalWriteOperationType } from "../types/fiscalWrite.types";

export class NfceController {
  private nfceService: NfceService;

  constructor(nfceService = new NfceService()) {
    this.nfceService = nfceService;
  }

  async listNfce(req: Request, res: Response): Promise<void> {
    try {
      const companyId = extractCompanyId(req);

      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;
      const offset = req.query.offset ? parseInt(req.query.offset as string, 10) : undefined;
      const status = req.query.status as string | undefined;

      const result = await this.nfceService.listNfce(companyId, {
        limit,
        offset,
        status,
      });

      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Erro ao listar NFC-es." });
    }
  }

  async getNfceById(req: Request, res: Response): Promise<void> {
    try {
      const companyId = extractCompanyId(req);
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ error: "id é obrigatório." });
        return;
      }

      const nfce = await this.nfceService.getNfceById(companyId, id);
      if (!nfce) {
        res.status(404).json({ error: "NFC-e não encontrada." });
        return;
      }

      res.json(nfce);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Erro ao obter NFC-e." });
    }
  }

  async dryRunCreateNfce(req: Request, res: Response): Promise<void> {
    try {
      const companyId = extractCompanyId(req);
      const payload = req.body;
      const result = await this.nfceService.dryRunCreateNfce(companyId, payload);
      dryRunResponse(res, FiscalWriteOperationType.CREATE, result);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Erro ao simular criação de NFC-e." });
    }
  }

  async dryRunCancelNfce(req: Request, res: Response): Promise<void> {
    try {
      const companyId = extractCompanyId(req);
      const { id } = req.params;
      const payload = req.body;
      const result = await this.nfceService.dryRunCancelNfce(companyId, id, payload);
      dryRunResponse(res, FiscalWriteOperationType.CANCEL, result);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Erro ao simular cancelamento de NFC-e." });
    }
  }
}
