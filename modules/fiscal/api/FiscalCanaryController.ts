import { Request, Response } from "express";
import { FiscalCanaryPlanService } from "../canary/FiscalCanaryPlanService";
import { FiscalCanaryEligibilityService } from "../canary/FiscalCanaryEligibilityService";
import { FiscalCanaryReadinessService } from "../canary/FiscalCanaryReadinessService";
import { FiscalCanaryDecisionService } from "../canary/FiscalCanaryDecisionService";
import { FiscalCanaryEligibilityInput } from "../canary/FiscalCanaryTypes";

export class FiscalCanaryController {
  private planService = new FiscalCanaryPlanService();
  private eligibilityService = new FiscalCanaryEligibilityService();
  private readinessService = new FiscalCanaryReadinessService();
  private decisionService = new FiscalCanaryDecisionService();

  public async getPlan(req: Request, res: Response): Promise<void> {
    this.enforceMasterAdmin(req);
    res.json({ success: true, data: this.planService.getPlanOverview() });
  }

  public async getEligibility(req: Request, res: Response): Promise<void> {
    try {
      this.enforceMasterAdmin(req);
      const input: FiscalCanaryEligibilityInput = {
        route: req.query.route as string,
        companyId: req.query.companyId as string
      };

      const result = await this.eligibilityService.evaluateEligibility(input);
      res.json({ success: true, data: result });
    } catch (e: any) {
      if (e.message.includes("Master Admin")) {
        res.status(403).json({ success: false, error: e.message });
      } else {
        res.status(500).json({ success: false, error: "Erro ao consultar elegibilidade" });
      }
    }
  }

  public async getReadiness(req: Request, res: Response): Promise<void> {
    try {
      this.enforceMasterAdmin(req);
      const route = req.query.route as string;
      const companyId = req.query.companyId as string;
      if (!route) {
        res.status(400).json({ success: false, error: "A rota é necessária para checar readiness." });
        return;
      }

      const result = await this.readinessService.evaluateRouteReadiness(route, companyId);
      res.json({ success: true, data: result });
    } catch (e: any) {
      if (e.message.includes("Master Admin")) {
        res.status(403).json({ success: false, error: e.message });
      } else {
        res.status(500).json({ success: false, error: "Erro ao consultar readiness" });
      }
    }
  }

  public async simulateDecision(req: Request, res: Response): Promise<void> {
    try {
      this.enforceMasterAdmin(req);
      const input: FiscalCanaryEligibilityInput = {
        route: req.body.route as string,
        companyId: req.body.companyId as string
      };
      const requestActivation = req.body.activation === true;

      const result = await this.decisionService.simulateDecision(input, requestActivation);
      res.json({ success: true, data: result });
    } catch (e: any) {
       if (e.message.includes("Master Admin")) {
        res.status(403).json({ success: false, error: e.message });
      } else {
        res.status(500).json({ success: false, error: "Erro na simulação do Canary" });
      }
    }
  }

  private enforceMasterAdmin(req: Request): void {
    const isMasterAdmin = (req as any).user?.is_master_admin === true;
    if (!isMasterAdmin) {
      throw new Error("Acesso restrito. Módulo de Canary Planning exige privilégios de Master Admin.");
    }
  }
}
