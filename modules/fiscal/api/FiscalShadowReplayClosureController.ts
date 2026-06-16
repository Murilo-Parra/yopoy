import { Request, Response } from "express";
import { FiscalShadowReplayClosureReportService } from "../canary/tap/replay/closure/FiscalShadowReplayClosureReportService";

export class FiscalShadowReplayClosureController {
  private reportService: FiscalShadowReplayClosureReportService;

  constructor() {
    this.reportService = new FiscalShadowReplayClosureReportService();
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

  public getInventory = (req: Request, res: Response) => {
    if (!this.checkAuthAndPermissions(req, res)) return;
    res.json({
      success: true,
      readOnly: true,
      simulationOnly: true,
      activationBlocked: true,
      data: this.reportService.getInventory()
    });
  };

  public getGuardrails = (req: Request, res: Response) => {
    if (!this.checkAuthAndPermissions(req, res)) return;
    res.json({
      success: true,
      readOnly: true,
      simulationOnly: true,
      activationBlocked: true,
      data: this.reportService.getGuardrails()
    });
  };

  public getHandoff = (req: Request, res: Response) => {
    if (!this.checkAuthAndPermissions(req, res)) return;
    res.json({
      success: true,
      readOnly: true,
      simulationOnly: true,
      activationBlocked: true,
      data: this.reportService.getHandoff()
    });
  };

  public getFinalReport = (req: Request, res: Response) => {
    if (!this.checkAuthAndPermissions(req, res)) return;
    res.json({
      success: true,
      readOnly: true,
      simulationOnly: true,
      activationBlocked: true,
      data: this.reportService.getFinalReport()
    });
  };
}
