import { Request, Response } from "express";
import { FiscalShadowReplayGovernanceSnapshotService } from "../canary/tap/replay/governance/FiscalShadowReplayGovernanceSnapshotService";
import { FiscalShadowReplayGovernanceChecklist } from "../canary/tap/replay/governance/FiscalShadowReplayGovernanceChecklist";
import { FiscalShadowReplayGovernanceRiskService } from "../canary/tap/replay/governance/FiscalShadowReplayGovernanceRiskService";
import { FiscalShadowReplayGovernanceExportService } from "../canary/tap/replay/governance/FiscalShadowReplayGovernanceExportService";
import { FiscalShadowReplayMetricsDashboardService } from "../canary/tap/replay/metrics/FiscalShadowReplayMetricsDashboardService";

export class FiscalShadowReplayGovernanceController {
  private snapshotService: FiscalShadowReplayGovernanceSnapshotService;
  private checklistService: FiscalShadowReplayGovernanceChecklist;
  private riskService: FiscalShadowReplayGovernanceRiskService;
  private exportService: FiscalShadowReplayGovernanceExportService;

  constructor(metricsService: FiscalShadowReplayMetricsDashboardService) {
    this.snapshotService = new FiscalShadowReplayGovernanceSnapshotService(metricsService);
    this.checklistService = new FiscalShadowReplayGovernanceChecklist();
    this.riskService = new FiscalShadowReplayGovernanceRiskService();
    this.exportService = new FiscalShadowReplayGovernanceExportService(this.snapshotService);
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

  public getSnapshot = (req: Request, res: Response) => {
      if (!this.checkAuthAndPermissions(req, res)) return;
      res.json({
          success: true,
          readOnly: true,
          simulationOnly: true,
          activationBlocked: true,
          data: this.snapshotService.getSnapshot()
      });
  };

  public getChecklist = (req: Request, res: Response) => {
      if (!this.checkAuthAndPermissions(req, res)) return;
      res.json({
          success: true,
          readOnly: true,
          simulationOnly: true,
          activationBlocked: true,
          data: this.checklistService.getChecklist()
      });
  };

  public getRisks = (req: Request, res: Response) => {
      if (!this.checkAuthAndPermissions(req, res)) return;
      res.json({
          success: true,
          readOnly: true,
          simulationOnly: true,
          activationBlocked: true,
          data: this.riskService.getRisks()
      });
  };

  public exportJson = (req: Request, res: Response) => {
      if (!this.checkAuthAndPermissions(req, res)) return;
      res.json({
          success: true,
          readOnly: true,
          simulationOnly: true,
          activationBlocked: true,
          data: this.exportService.exportJson()
      });
  };

  public exportText = (req: Request, res: Response) => {
      if (!this.checkAuthAndPermissions(req, res)) return;
      res.setHeader("Content-Type", "text/plain");
      res.send(this.exportService.exportText());
  };

  public getFinalReview = (req: Request, res: Response) => {
      if (!this.checkAuthAndPermissions(req, res)) return;
      res.json({
          success: true,
          readOnly: true,
          simulationOnly: true,
          activationBlocked: true,
          data: this.exportService.getFinalReview()
      });
  };
}
