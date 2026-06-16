import { Request, Response } from "express";
import { FiscalShadowReplayQueueRepository } from "../canary/tap/replay/FiscalShadowReplayQueueRepository";
import { FiscalShadowReplayQueueService } from "../canary/tap/replay/FiscalShadowReplayQueueService";
import { FiscalShadowReplayManualProcessor } from "../canary/tap/replay/FiscalShadowReplayManualProcessor";
import { FiscalShadowReplayAuditService } from "../canary/tap/replay/FiscalShadowReplayAuditService";
import { FiscalShadowReplayReportService } from "../canary/tap/replay/FiscalShadowReplayReportService";

export class FiscalShadowReplayController {
  public repository: FiscalShadowReplayQueueRepository;
  private queueService: FiscalShadowReplayQueueService;
  private manualProcessor: FiscalShadowReplayManualProcessor;
  public auditService: FiscalShadowReplayAuditService;
  private reportService: FiscalShadowReplayReportService;

  constructor(repository?: FiscalShadowReplayQueueRepository, auditService?: FiscalShadowReplayAuditService) {
    this.repository = repository || new FiscalShadowReplayQueueRepository();
    this.auditService = auditService || new FiscalShadowReplayAuditService();
    this.queueService = new FiscalShadowReplayQueueService(this.repository, this.auditService);
    this.manualProcessor = new FiscalShadowReplayManualProcessor(this.repository, this.auditService);
    this.reportService = new FiscalShadowReplayReportService(this.repository);
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

  public enqueue = (req: Request, res: Response) => {
    if (!this.checkAuthAndPermissions(req, res)) return;
    try {
      const result = this.queueService.enqueueManualSnapshot(req.body);
      res.json({
        success: true,
        simulationOnly: true,
        activationBlocked: true,
        data: result
      });
    } catch (e: any) {
      res.status(500).json({ error: "Erro ao enfileirar no replay tap" });
    }
  };

  public list = (req: Request, res: Response) => {
    if (!this.checkAuthAndPermissions(req, res)) return;
    try {
      const filters = req.query;
      const result = this.queueService.listQueue(filters);
      res.json({
        success: true,
        simulationOnly: true,
        activationBlocked: true,
        data: result
      });
    } catch (e: any) {
      res.status(500).json({ error: "Erro ao listar replay tap" });
    }
  };

  public getById = (req: Request, res: Response) => {
    if (!this.checkAuthAndPermissions(req, res)) return;
    try {
      const result = this.queueService.getItem(req.params.id);
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
      res.status(500).json({ error: "Erro ao buscar replay tap" });
    }
  };

  public simulate = (req: Request, res: Response) => {
    if (!this.checkAuthAndPermissions(req, res)) return;
    try {
      const result = this.manualProcessor.simulateItem(req.params.id);
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
      res.status(500).json({ error: "Erro ao processar replay tap" });
    }
  };

  public markSkipped = (req: Request, res: Response) => {
    if (!this.checkAuthAndPermissions(req, res)) return;
    try {
      const { reason } = req.body;
      const result = this.queueService.markSkipped(req.params.id, reason || "Manual skip");
      if (!result) {
         res.status(404).json({ error: "Not found" });
         return;
      }
      res.json({
        success: true,
        simulationOnly: true,
        activationBlocked: true
      });
    } catch (e: any) {
      res.status(500).json({ error: "Erro ao pular item replay tap" });
    }
  };

  public validateItem = (req: Request, res: Response) => {
    if (!this.checkAuthAndPermissions(req, res)) return;
    try {
      const result = this.queueService.validateItem(req.body);
      res.json({
        success: true,
        simulationOnly: true,
        activationBlocked: true,
        data: result
      });
    } catch (e: any) {
      res.status(500).json({ error: "Erro validando item replay tap" });
    }
  };

  public getReport = (req: Request, res: Response) => {
    if (!this.checkAuthAndPermissions(req, res)) return;
    try {
      const report = this.reportService.getReport();
      res.json({
        success: true,
        simulationOnly: true,
        activationBlocked: true,
        data: report
      });
    } catch (e: any) {
      res.status(500).json({ error: "Erro gerando relatórrio replay tap" });
    }
  };

  public getAudit = (req: Request, res: Response) => {
    if (!this.checkAuthAndPermissions(req, res)) return;
    try {
      const audit = this.auditService.getReplayAuditRecords();
      res.json({
        success: true,
        simulationOnly: true,
        activationBlocked: true,
        data: audit
      });
    } catch (e: any) {
      res.status(500).json({ error: "Erro consultando auditoria replay tap" });
    }
  };
}
