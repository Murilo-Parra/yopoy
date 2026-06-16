import { Request, Response } from "express";
import { FiscalV2ReadinessInventory } from "../canary/readiness/FiscalV2ReadinessInventory";
import { FiscalV2ReadinessAuditService } from "../canary/readiness/FiscalV2ReadinessAuditService";
import { FiscalV2ReadinessRiskMatrix } from "../canary/readiness/FiscalV2ReadinessRiskMatrix";
import { FiscalV2ReadinessGapService } from "../canary/readiness/FiscalV2ReadinessGapService";
import { FiscalV2ReadinessReportService } from "../canary/readiness/FiscalV2ReadinessReportService";

export class FiscalV2ReadinessController {
  private auditService: FiscalV2ReadinessAuditService;
  private reportService: FiscalV2ReadinessReportService;

  constructor() {
    this.auditService = new FiscalV2ReadinessAuditService();
    this.reportService = new FiscalV2ReadinessReportService();
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

  public getInventory = (req: Request, res: Response) => {
    if (!this.checkAuthAndPermissions(req, res)) return;
    
    try {
      const inventory = FiscalV2ReadinessInventory.getInventory();
      res.json({
        success: true,
        simulationOnly: true,
        activationBlocked: true,
        data: inventory
      });
    } catch (e: any) {
      res.status(500).json({ error: "Erro gerando inventário" });
    }
  };

  public getAudit = (req: Request, res: Response) => {
    if (!this.checkAuthAndPermissions(req, res)) return;
    try {
      const checks = this.auditService.executeChecks();
      res.json({
        success: true,
        simulationOnly: true,
        activationBlocked: true,
        data: checks
      });
    } catch (e: any) {
      res.status(500).json({ error: "Erro executando auditoria" });
    }
  };

  public getRisks = (req: Request, res: Response) => {
    if (!this.checkAuthAndPermissions(req, res)) return;
    try {
      const risks = FiscalV2ReadinessRiskMatrix.getRisks();
      res.json({
        success: true,
        simulationOnly: true,
        activationBlocked: true,
        data: risks
      });
    } catch (e: any) {
      res.status(500).json({ error: "Erro buscando riscos" });
    }
  };

  public getGaps = (req: Request, res: Response) => {
    if (!this.checkAuthAndPermissions(req, res)) return;
    try {
      const gaps = FiscalV2ReadinessGapService.getGaps();
      res.json({
        success: true,
        simulationOnly: true,
        activationBlocked: true,
        data: gaps
      });
    } catch (e: any) {
      res.status(500).json({ error: "Erro buscando gaps" });
    }
  };

  public getFinalReport = (req: Request, res: Response) => {
    if (!this.checkAuthAndPermissions(req, res)) return;
    try {
      const report = this.reportService.getFinalReport();
      res.json({
        success: true,
        simulationOnly: true,
        activationBlocked: true,
        data: report
      });
    } catch (e: any) {
      res.status(500).json({ error: "Erro gerando relatório final" });
    }
  };

  public simulateFutureActivationReview = (req: Request, res: Response) => {
    if (!this.checkAuthAndPermissions(req, res)) return;
    try {
      res.json({
        success: true,
        simulationOnly: true,
        activationBlocked: true,
        data: {
          approvedForRealCanary: false,
          approvedForProductionV2: false,
          message: "A Sprint 4.27 é uma auditoria final de prontidão. Ativação real permanece bloqueada.",
          reviewStatus: "BLOCKED_FOR_REAL_ACTIVATION",
          pendingGapsCount: FiscalV2ReadinessGapService.getGaps().filter(g => g.blockerForRealActivation).length
        }
      });
    } catch (e: any) {
      res.status(500).json({ error: "Erro simulando revisão" });
    }
  };
}
