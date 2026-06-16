import { Request, Response } from "express";
import { FiscalShadowReplayQueueRepository } from "../canary/tap/replay/FiscalShadowReplayQueueRepository";
import { FiscalShadowReplayManualProcessor } from "../canary/tap/replay/FiscalShadowReplayManualProcessor";
import { FiscalShadowReplayAuditService } from "../canary/tap/replay/FiscalShadowReplayAuditService";
import { FiscalShadowReplayBatchService } from "../canary/tap/replay/batch/FiscalShadowReplayBatchService";
import { FiscalShadowReplayBatchManualRunner } from "../canary/tap/replay/batch/FiscalShadowReplayBatchManualRunner";
import { FiscalShadowReplayBatchAuditService } from "../canary/tap/replay/batch/FiscalShadowReplayBatchAuditService";
import { FiscalShadowReplayBatchReportService } from "../canary/tap/replay/batch/FiscalShadowReplayBatchReportService";

export class FiscalShadowReplayBatchController {
  public batchService: FiscalShadowReplayBatchService;

  constructor(
      repository: FiscalShadowReplayQueueRepository, 
      itemAuditService: FiscalShadowReplayAuditService
  ) {
    const itemProcessor = new FiscalShadowReplayManualProcessor(repository, itemAuditService);
    const runner = new FiscalShadowReplayBatchManualRunner(itemProcessor);
    const auditService = new FiscalShadowReplayBatchAuditService();
    const reportService = new FiscalShadowReplayBatchReportService();
    
    this.batchService = new FiscalShadowReplayBatchService(
        repository, runner, auditService, reportService
    );
  }

  private checkAuthAndPermissions(req: Request, res: Response): boolean {
    const r = req as any;
    if (!r.user) {
      res.status(401).json({ error: "Access denied" });
      return false;
    }
    if (!r.user.is_master_admin) {
      res.status(403).json({ error: "Permission denied. Master Admin required" });
      return false;
    }
    return true;
  }

  public validateBatch = (req: Request, res: Response) => {
    if (!this.checkAuthAndPermissions(req, res)) return;
    try {
      const result = this.batchService.validateBatch(req.body);
      res.json({
        success: true,
        simulationOnly: true,
        activationBlocked: true,
        manualOnly: true,
        autoRun: false,
        workerCreated: false,
        data: result
      });
    } catch (e: any) {
      res.status(500).json({ error: "Erro ao validar batch tap" });
    }
  };

  public simulateBatch = (req: Request, res: Response) => {
    if (!this.checkAuthAndPermissions(req, res)) return;
    try {
      const result = this.batchService.simulateBatch(req.body);
      res.json({
        success: true,
        simulationOnly: true,
        activationBlocked: true,
        data: result
      });
    } catch (e: any) {
      res.status(500).json({ error: "Erro ao simular batch tap" });
    }
  };

  public getBatch = (req: Request, res: Response) => {
    if (!this.checkAuthAndPermissions(req, res)) return;
    try {
      const result = this.batchService.getBatch(req.params.id);
      if (!result) {
         res.status(404).json({ error: "Not found" });
         return;
      }
      res.json({
        success: true,
        simulationOnly: true,
        activationBlocked: true,
        data: result
      });
    } catch (e: any) {
      res.status(500).json({ error: "Erro ao buscar batch tap" });
    }
  };

  public markReviewed = (req: Request, res: Response) => {
    if (!this.checkAuthAndPermissions(req, res)) return;
    try {
      const success = this.batchService.markReviewed(req.params.id);
      if (!success) {
         res.status(404).json({ error: "Not found" });
         return;
      }
      res.json({
        success: true,
        simulationOnly: true,
        activationBlocked: true
      });
    } catch (e: any) {
      res.status(500).json({ error: "Erro ao marcar batch como revisado" });
    }
  };

  public getReport = (req: Request, res: Response) => {
    if (!this.checkAuthAndPermissions(req, res)) return;
    try {
      res.json({
        success: true,
        simulationOnly: true,
        activationBlocked: true,
        data: this.batchService.getReport()
      });
    } catch (e: any) {
      res.status(500).json({ error: "Erro ao buscar report de batch" });
    }
  };

  public getAudit = (req: Request, res: Response) => {
    if (!this.checkAuthAndPermissions(req, res)) return;
    try {
      res.json({
        success: true,
        simulationOnly: true,
        activationBlocked: true,
        data: this.batchService.getAudit()
      });
    } catch (e: any) {
      res.status(500).json({ error: "Erro ao buscar audit de batch" });
    }
  };
}
