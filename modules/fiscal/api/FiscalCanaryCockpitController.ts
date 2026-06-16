import { Request, Response } from "express";
import { FiscalCanaryCockpitService } from "../canary/FiscalCanaryCockpitService";
import { FiscalCanaryCockpitRecommendationService } from "../canary/FiscalCanaryCockpitRecommendationService";

export class FiscalCanaryCockpitController {
  private cockpitService = new FiscalCanaryCockpitService();
  private recommendationService = new FiscalCanaryCockpitRecommendationService();

  public async getOverview(req: Request, res: Response): Promise<void> {
    try {
      this.enforceMasterAdmin(req);
      const companyId = req.query.companyId as string;
      const data = await this.cockpitService.getOverview(companyId);
      res.json({ success: true, data });
    } catch (e: any) {
      this.handleError(e, res);
    }
  }

  public async getRoutes(req: Request, res: Response): Promise<void> {
    try {
      this.enforceMasterAdmin(req);
      // Stubbed list for safety and minimal scope
      res.json({ success: true, data: [] });
    } catch (e: any) {
      this.handleError(e, res);
    }
  }

  public async getBlockers(req: Request, res: Response): Promise<void> {
    try {
      this.enforceMasterAdmin(req);
      const companyId = req.query.companyId as string;
      const data = await this.cockpitService.getBlockers(companyId);
      res.json({ success: true, count: data.length, data });
    } catch (e: any) {
      this.handleError(e, res);
    }
  }

  public async getRecommendations(req: Request, res: Response): Promise<void> {
    try {
      this.enforceMasterAdmin(req);
      const companyId = req.query.companyId as string;
      const data = await this.recommendationService.getRecommendation(companyId);
      res.json({ success: true, data });
    } catch (e: any) {
      this.handleError(e, res);
    }
  }

  public async getTimeline(req: Request, res: Response): Promise<void> {
    try {
      this.enforceMasterAdmin(req);
      // Stubbed timeline list for safety
      res.json({ success: true, data: [] });
    } catch (e: any) {
      this.handleError(e, res);
    }
  }

  public async simulateFinalReview(req: Request, res: Response): Promise<void> {
    try {
      this.enforceMasterAdmin(req);
      const companyId = req.body.companyId as string;
      const data = await this.recommendationService.simulateFinalReview(companyId);
      res.json({ success: true, data });
    } catch (e: any) {
      this.handleError(e, res);
    }
  }

  private enforceMasterAdmin(req: Request): void {
    const isMasterAdmin = (req as any).user?.is_master_admin === true;
    if (!isMasterAdmin) {
      throw new Error("Acesso restrito. Módulo de Canary Cockpit exige privilégios de Master Admin.");
    }
  }

  private handleError(e: any, res: Response): void {
    if (e.message.includes("Master Admin")) {
      res.status(403).json({ success: false, error: e.message });
    } else {
      res.status(500).json({ success: false, error: "Internal Cockpit Error" });
    }
  }
}
