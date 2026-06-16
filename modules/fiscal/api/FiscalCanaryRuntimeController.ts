import { Request, Response } from "express";
import { FiscalCanaryRuntimeDecisionService } from "../canary/runtime/FiscalCanaryRuntimeDecisionService";
import { FiscalCanaryKillSwitch } from "../canary/runtime/FiscalCanaryKillSwitch";

export class FiscalCanaryRuntimeController {
  private decisionService = new FiscalCanaryRuntimeDecisionService();
  private killSwitch = new FiscalCanaryKillSwitch();

  public async getStatus(req: Request, res: Response): Promise<void> {
    try {
      this.enforceMasterAdmin(req);
      const data = this.decisionService.getRuntimeStatus();
      res.json({ success: true, data });
    } catch (e: any) {
      this.handleError(e, res);
    }
  }

  public async getFlags(req: Request, res: Response): Promise<void> {
    try {
      this.enforceMasterAdmin(req);
      const data = this.decisionService.getFlagSnapshot();
      res.json({ success: true, data });
    } catch (e: any) {
      this.handleError(e, res);
    }
  }

  public async getKillSwitch(req: Request, res: Response): Promise<void> {
    try {
      this.enforceMasterAdmin(req);
      const data = this.killSwitch.getStatus();
      res.json({ success: true, data });
    } catch (e: any) {
      this.handleError(e, res);
    }
  }

  public async simulateDecision(req: Request, res: Response): Promise<void> {
    try {
      this.enforceMasterAdmin(req);
      const route = req.body.route as string || "unknown";
      const operation = req.body.operation as string || "unknown";
      const companyId = req.body.companyId as string;
      const userId = (req as any).user?.id;
      const data = await this.decisionService.simulateRuntimeDecision(route, operation, companyId, userId);
      res.json({ success: true, data });
    } catch (e: any) {
      this.handleError(e, res);
    }
  }

  public async validateHardOff(req: Request, res: Response): Promise<void> {
    try {
      this.enforceMasterAdmin(req);
      const data = this.decisionService.validateHardOff();
      res.json({ success: true, data });
    } catch (e: any) {
      this.handleError(e, res);
    }
  }

  public async getAudit(req: Request, res: Response): Promise<void> {
    try {
      this.enforceMasterAdmin(req);
      res.json({ success: true, data: [] });
    } catch (e: any) {
      this.handleError(e, res);
    }
  }

  private enforceMasterAdmin(req: Request): void {
    const isMasterAdmin = (req as any).user?.is_master_admin === true;
    if (!isMasterAdmin) {
      throw new Error("Acesso restrito. Módulo de Canary Runtime exige privilégios de Master Admin.");
    }
  }

  private handleError(e: any, res: Response): void {
    if (e.message.includes("Master Admin")) {
      res.status(403).json({ success: false, error: e.message });
    } else {
      res.status(500).json({ success: false, error: "Internal Runtime Guard Error" });
    }
  }
}
