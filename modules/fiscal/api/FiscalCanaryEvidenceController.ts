import { Request, Response } from "express";
import { FiscalCanaryEvidenceService } from "../canary/FiscalCanaryEvidenceService";
import { FiscalCanaryCorrelationService } from "../canary/FiscalCanaryCorrelationService";
import { FiscalCanarySuspensionService } from "../canary/FiscalCanarySuspensionService";

export class FiscalCanaryEvidenceController {
  private evidenceService = new FiscalCanaryEvidenceService();
  private correlationService = new FiscalCanaryCorrelationService();
  private suspensionService = new FiscalCanarySuspensionService();

  public async getSummary(req: Request, res: Response): Promise<void> {
    try {
      this.enforceMasterAdmin(req);
      const { route, operation, companyId } = req.query;
      if (!route || !operation) {
         res.status(400).json({ success: false, error: "Missing route or operation" });
         return;
      }
      const data = await this.evidenceService.evaluateEvidence(route as string, operation as string, companyId as string);
      res.json({ success: true, data });
    } catch (e: any) {
      this.handleError(e, res);
    }
  }

  public async getByRecord(req: Request, res: Response): Promise<void> {
    try {
      this.enforceMasterAdmin(req);
      const data = await this.correlationService.correlateRecord(req.params.id);
      res.json({ success: true, data });
    } catch (e: any) {
      this.handleError(e, res);
    }
  }

  public async getCorrelation(req: Request, res: Response): Promise<void> {
    try {
      this.enforceMasterAdmin(req);
      const recordId = req.query.recordId as string;
      if (recordId) {
        const data = await this.correlationService.correlateRecord(recordId);
        res.json({ success: true, data });
      } else {
        res.status(400).json({ success: false, error: "Missing recordId parameter" });
      }
    } catch (e: any) {
      this.handleError(e, res);
    }
  }

  public async revalidate(req: Request, res: Response): Promise<void> {
    try {
      this.enforceMasterAdmin(req);
      const recordId = req.body.recordId as string;
      const data = await this.correlationService.correlateRecord(recordId);
      res.json({ success: true, data });
    } catch (e: any) {
      this.handleError(e, res);
    }
  }

  public async simulateSuspension(req: Request, res: Response): Promise<void> {
    try {
      this.enforceMasterAdmin(req);
      const recordId = req.body.recordId as string;
      const data = await this.suspensionService.simulateSuspensionForRecord(recordId);
      res.json({ success: true, data });
    } catch (e: any) {
      this.handleError(e, res);
    }
  }

  private enforceMasterAdmin(req: Request): void {
    const isMasterAdmin = (req as any).user?.is_master_admin === true;
    if (!isMasterAdmin) {
      throw new Error("Acesso restrito. Módulo de Canary Evidence exige privilégios de Master Admin.");
    }
  }

  private handleError(e: any, res: Response): void {
    if (e.message.includes("Master Admin")) {
      res.status(403).json({ success: false, error: e.message });
    } else {
      res.status(500).json({ success: false, error: "Internal Error" });
    }
  }
}
