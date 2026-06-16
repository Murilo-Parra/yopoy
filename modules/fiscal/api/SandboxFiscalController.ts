import { Request, Response } from "express";
import { FiscalDocumentService } from "../services/FiscalDocumentService";
import { NfeService } from "../services/NfeService";
import { NfceService } from "../services/NfceService";
import { DanfeService } from "../services/DanfeService";
import { SefazProtocolService } from "../services/SefazProtocolService";
import { FiscalSandboxCleanupService } from "../services/FiscalSandboxCleanupService";
import { FiscalWriteGuard } from "../services/FiscalWriteGuard";
import { FiscalWriteMode } from "../types/fiscalWrite.types";
import { extractCompanyId } from "./helpers";
import { pgPool } from "../../../infrastructure/database";

// Instanciamos o Guard explicitamente como SANDBOX_PERSISTENCE
const guard = new FiscalWriteGuard(FiscalWriteMode.SANDBOX_PERSISTENCE);

// Instanciamos os services
const docService = new FiscalDocumentService(undefined, guard);
const nfeService = new NfeService(undefined, guard);
const nfceService = new NfceService(undefined, guard);
const danfeService = new DanfeService(undefined, guard);
const sefazProtocolService = new SefazProtocolService(undefined, guard);
const cleanupService = new FiscalSandboxCleanupService();

export class SandboxFiscalController {
  private getUserId(req: Request): string | undefined {
    return (req as any).user?.id || (req as any).session?.user_id;
  }

  async sandboxCreateDocument(req: Request, res: Response): Promise<void> {
    try {
      const companyId = extractCompanyId(req);
      const userId = this.getUserId(req);
      const payload = { ...req.body };
      const result = await docService.sandboxCreateDocument(companyId, payload, userId);
      res.json({
        success: true,
        sandbox: true,
        persisted: true,
        cleanupRequired: true,
        operation: "sandboxCreateDocument",
        message: "Registro sandbox persistido para validação controlada. Nenhuma operação fiscal real foi executada.",
        createdIds: result.createdIds,
        result: result.data
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async sandboxCreateNfe(req: Request, res: Response): Promise<void> {
    try {
      const companyId = extractCompanyId(req);
      const userId = this.getUserId(req);
      const payload = { ...req.body };
      const result = await nfeService.sandboxCreateNfe(companyId, payload, userId);
      res.json({
        success: true,
        sandbox: true,
        persisted: true,
        cleanupRequired: true,
        operation: "sandboxCreateNfe",
        message: "Registro sandbox persistido para validação controlada. Nenhuma operação fiscal real foi executada.",
        createdIds: result.createdIds,
        result: result.data
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async sandboxUpdateNfeStatus(req: Request, res: Response): Promise<void> {
    try {
      const companyId = extractCompanyId(req);
      const userId = this.getUserId(req);
      const { id } = req.params;
      const { status } = req.body;
      const result = await nfeService.sandboxUpdateNfeStatus(companyId, id, status, userId);
      res.json({
        success: true,
        sandbox: true,
        persisted: true,
        cleanupRequired: true,
        operation: "sandboxUpdateNfeStatus",
        message: "Registro sandbox persistido para validação controlada. Nenhuma operação fiscal real foi executada.",
        createdIds: result.createdIds,
        result: result.data
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async sandboxCreateNfce(req: Request, res: Response): Promise<void> {
    try {
      const companyId = extractCompanyId(req);
      const userId = this.getUserId(req);
      const payload = { ...req.body };
      const result = await nfceService.sandboxCreateNfce(companyId, payload, userId);
      res.json({
        success: true,
        sandbox: true,
        persisted: true,
        cleanupRequired: true,
        operation: "sandboxCreateNfce",
        message: "Registro sandbox persistido para validação controlada. Nenhuma operação fiscal real foi executada.",
        createdIds: result.createdIds,
        result: result.data
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async sandboxCancelNfce(req: Request, res: Response): Promise<void> {
    try {
      const companyId = extractCompanyId(req);
      const userId = this.getUserId(req);
      const { id } = req.params;
      const payload = { ...req.body };
      const result = await nfceService.sandboxCancelNfce(companyId, id, payload, userId);
      res.json({
        success: true,
        sandbox: true,
        persisted: true,
        cleanupRequired: true,
        operation: "sandboxCancelNfce",
        message: "Registro sandbox persistido para validação controlada. Nenhuma operação fiscal real foi executada.",
        createdIds: result.createdIds,
        result: result.data
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async sandboxSaveDanfe(req: Request, res: Response): Promise<void> {
    try {
      const companyId = extractCompanyId(req);
      const userId = this.getUserId(req);
      const payload = { ...req.body };
      const result = await danfeService.sandboxSaveDanfe(companyId, payload, userId);
      res.json({
        success: true,
        sandbox: true,
        persisted: true,
        cleanupRequired: true,
        operation: "sandboxSaveDanfe",
        message: "Registro sandbox persistido para validação controlada. Nenhuma operação fiscal real foi executada.",
        createdIds: result.createdIds,
        result: result.data
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async sandboxSaveProtocol(req: Request, res: Response): Promise<void> {
    try {
      const companyId = extractCompanyId(req);
      const userId = this.getUserId(req);
      const payload = { ...req.body };
      const result = await sefazProtocolService.sandboxSaveProtocol(companyId, payload, userId);
      res.json({
        success: true,
        sandbox: true,
        persisted: true,
        cleanupRequired: true,
        operation: "sandboxSaveProtocol",
        message: "Registro sandbox persistido para validação controlada. Nenhuma operação fiscal real foi executada.",
        createdIds: result.createdIds,
        result: result.data
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async cleanupSandbox(req: Request, res: Response): Promise<void> {
    try {
      const companyId = extractCompanyId(req);
      const { createdIds, source } = req.body;
      
      let result;
      if (createdIds && Array.isArray(createdIds)) {
        result = await cleanupService.cleanupByCreatedIds(companyId, createdIds);
      } else if (source === "fiscal-v2-sandbox") {
        result = await cleanupService.cleanupBySandboxSource(companyId, source);
      } else {
        throw new Error("Parâmetros inválidos para cleanup: necessário 'createdIds' ou 'source' igual a 'fiscal-v2-sandbox'");
      }
      
      res.json({
        success: true,
        sandbox: true,
        cleanup: true,
        removedIds: result.deletedIds,
        message: "Registros sandbox removidos com filtro por company_id e marcador sandbox."
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

