import { Request, Response } from "express";
import { FiscalCanaryPreActivationChecklist } from "../canary/FiscalCanaryPreActivationChecklist";
import { FiscalCanaryPreActivationGate } from "../canary/FiscalCanaryPreActivationGate";
import { FiscalCanaryRollbackPlanService } from "../canary/FiscalCanaryRollbackPlanService";
import { FiscalCanaryFinalReportService } from "../canary/FiscalCanaryFinalReportService";

export class FiscalCanaryPreActivationController {
  private checklistService = new FiscalCanaryPreActivationChecklist();
  private gateService = new FiscalCanaryPreActivationGate();
  private rollbackService = new FiscalCanaryRollbackPlanService();
  private finalReportService = new FiscalCanaryFinalReportService();

  public async getChecklist(req: Request, res: Response): Promise<void> {
    try {
      this.enforceMasterAdmin(req);
      const companyId = req.query.companyId as string;
      const data = await this.checklistService.evaluateChecklist(companyId);
      res.json({ success: true, data });
    } catch (e: any) {
      this.handleError(e, res);
    }
  }

  public async getGate(req: Request, res: Response): Promise<void> {
    try {
      this.enforceMasterAdmin(req);
      const companyId = req.query.companyId as string;
      const data = await this.gateService.evaluateGate(companyId);
      res.json({ success: true, data });
    } catch (e: any) {
      this.handleError(e, res);
    }
  }

  public async getRollbackPlan(req: Request, res: Response): Promise<void> {
    try {
      this.enforceMasterAdmin(req);
      const companyId = req.query.companyId as string;
      const data = await this.rollbackService.getRollbackPlan(companyId);
      res.json({ success: true, data });
    } catch (e: any) {
      this.handleError(e, res);
    }
  }

  public async getFinalReport(req: Request, res: Response): Promise<void> {
    try {
      this.enforceMasterAdmin(req);
      const companyId = req.query.companyId as string;
      const data = await this.finalReportService.getFinalReport(companyId);
      res.json({ success: true, data });
    } catch (e: any) {
      this.handleError(e, res);
    }
  }

  public async simulateGoNoGo(req: Request, res: Response): Promise<void> {
    try {
      this.enforceMasterAdmin(req);
      const companyId = req.body.companyId as string;
      const data = await this.finalReportService.simulateGoNoGo(companyId);
      res.json({ success: true, data });
    } catch (e: any) {
      this.handleError(e, res);
    }
  }

  private enforceMasterAdmin(req: Request): void {
    const isMasterAdmin = (req as any).user?.is_master_admin === true;
    if (!isMasterAdmin) {
      throw new Error("Acesso restrito. Módulo de Canary Pre-Activation exige privilégios de Master Admin.");
    }
  }

  private handleError(e: any, res: Response): void {
    if (e.message.includes("Master Admin")) {
      res.status(403).json({ success: false, error: e.message });
    } else {
      res.status(500).json({ success: false, error: "Internal Pre-Activation Error" });
    }
  }
}
