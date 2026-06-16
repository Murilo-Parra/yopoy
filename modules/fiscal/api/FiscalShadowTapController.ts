import { Request, Response } from "express";
import { FiscalShadowTapDecisionService } from "../canary/tap/FiscalShadowTapDecisionService";
import { FiscalShadowTapSimulationService } from "../canary/tap/FiscalShadowTapSimulationService";
import { FiscalShadowTapAuditService } from "../canary/tap/FiscalShadowTapAuditService";
import { FiscalShadowTapManualCaptureService } from "../canary/tap/FiscalShadowTapManualCaptureService";
import { FiscalShadowTapManualComparisonService } from "../canary/tap/FiscalShadowTapManualComparisonService";
import { FiscalShadowTapManualAuditService } from "../canary/tap/FiscalShadowTapManualAuditService";
import { FiscalShadowTapManualReportService } from "../canary/tap/FiscalShadowTapManualReportService";

export class FiscalShadowTapController {
  private decisionService: FiscalShadowTapDecisionService;
  private simulationService: FiscalShadowTapSimulationService;
  private auditService: FiscalShadowTapAuditService;
  private manualCaptureService: FiscalShadowTapManualCaptureService;
  private manualComparisonService: FiscalShadowTapManualComparisonService;
  private manualAuditService: FiscalShadowTapManualAuditService;
  private manualReportService: FiscalShadowTapManualReportService;

  constructor() {
    this.decisionService = new FiscalShadowTapDecisionService();
    this.auditService = new FiscalShadowTapAuditService();
    this.simulationService = new FiscalShadowTapSimulationService(this.auditService);
    this.manualCaptureService = new FiscalShadowTapManualCaptureService();
    this.manualComparisonService = new FiscalShadowTapManualComparisonService();
    this.manualAuditService = new FiscalShadowTapManualAuditService();
    this.manualReportService = new FiscalShadowTapManualReportService(this.manualAuditService);
  }

  private checkAuthAndPermissions(req: Request, res: Response): boolean {
    const user = (req as any).user;
    if (!user) {
      res.status(401).json({ error: "Requer autenticação" });
      return false;
    }
    if (!user.is_master_admin) {
      res.status(403).json({ error: "Requer papel master admin administrativo" });
      return false;
    }
    return true;
  }

  public getStatus = (req: Request, res: Response) => {
    if (!this.checkAuthAndPermissions(req, res)) return;
    
    try {
      res.json({
        success: true,
        simulationOnly: true,
        activationBlocked: true,
        data: this.decisionService.getStatus()
      });
    } catch(e: any) {
      res.status(500).json({ error: "Erro obtendo tap status" });
    }
  };

  public getConfig = (req: Request, res: Response) => {
    if (!this.checkAuthAndPermissions(req, res)) return;
    
    try {
      res.json({
        success: true,
        simulationOnly: true,
        activationBlocked: true,
        data: this.decisionService.getConfigSnapshot()
      });
    } catch(e: any) {
      res.status(500).json({ error: "Erro obtendo tap config" });
    }
  };

  public simulateCapture = (req: Request, res: Response) => {
    if (!this.checkAuthAndPermissions(req, res)) return;
    
    try {
      const result = this.simulationService.simulateCapture(req.body);
      res.json({
        success: true,
        simulationOnly: true,
        activationBlocked: true,
        data: result
      });
    } catch(e: any) {
      res.status(500).json({ error: "Erro simulando captura tap" });
    }
  };

  public validatePolicy = (req: Request, res: Response) => {
    if (!this.checkAuthAndPermissions(req, res)) return;
    
    try {
      const { route, operation } = req.body;
      const decision = this.simulationService.validatePolicy(route || "/unknown", operation || "UNKNOWN");
      res.json({
        success: true,
        simulationOnly: true,
        activationBlocked: true,
        data: decision
      });
    } catch(e: any) {
      res.status(500).json({ error: "Erro validando policy tap" });
    }
  };

  public getAudit = (req: Request, res: Response) => {
    if (!this.checkAuthAndPermissions(req, res)) return;
    
    try {
      res.json({
        success: true,
        simulationOnly: true,
        activationBlocked: true,
        data: this.auditService.getAuditRecords()
      });
    } catch(e: any) {
      res.status(500).json({ error: "Erro obtendo audit tap" });
    }
  };

  public manualSimulateCapture = (req: Request, res: Response) => {
    if (!this.checkAuthAndPermissions(req, res)) return;
    try {
      const result = this.manualCaptureService.simulateManualCapture(req.body);
      const isBlocked = result.blockers && result.blockers.length > 0;
      this.manualAuditService.logManualSimulation(result, "SIMULATE_CAPTURE");
      this.manualReportService.incrementSimulations(isBlocked, result.sanitized);

      res.json({
        success: true,
        simulationOnly: true,
        activationBlocked: true,
        data: result
      });
    } catch(e: any) {
      console.error(e);
      res.status(500).json({ error: "Erro simulando captura manual tap" });
    }
  };

  public manualCompareSnapshot = (req: Request, res: Response) => {
    if (!this.checkAuthAndPermissions(req, res)) return;
    try {
      const { legacySnapshot, v2Snapshot } = req.body;
      const result = this.manualComparisonService.compareSnapshot(legacySnapshot, v2Snapshot);
      
      this.manualAuditService.logManualSimulation(result, "COMPARE_SNAPSHOT");
      this.manualReportService.incrementDifferences(result.differenceCount);

      res.json({
        success: true,
        simulationOnly: true,
        activationBlocked: true,
        data: result
      });
    } catch(e: any) {
      console.error(e);
      res.status(500).json({ error: "Erro comparando snapshot manual tap" });
    }
  };

  public manualValidateSnapshot = (req: Request, res: Response) => {
    if (!this.checkAuthAndPermissions(req, res)) return;
    try {
      const result = this.manualCaptureService.validateSnapshot(req.body);
      res.json({
        success: true,
        simulationOnly: true,
        activationBlocked: true,
        data: result
      });
    } catch(e: any) {
      res.status(500).json({ error: "Erro validando snapshot manual tap" });
    }
  }

  public getManualReport = (req: Request, res: Response) => {
    if (!this.checkAuthAndPermissions(req, res)) return;
    try {
      res.json({
        success: true,
        simulationOnly: true,
        activationBlocked: true,
        data: this.manualReportService.getReport()
      });
    } catch(e: any) {
      res.status(500).json({ error: "Erro obtendo report manual tap" });
    }
  }

  public getManualAudit = (req: Request, res: Response) => {
    if (!this.checkAuthAndPermissions(req, res)) return;
    try {
      res.json({
        success: true,
        simulationOnly: true,
        activationBlocked: true,
        data: this.manualAuditService.getManualAuditRecords()
      });
    } catch(e: any) {
      res.status(500).json({ error: "Erro obtendo audit manual tap" });
    }
  }
}
