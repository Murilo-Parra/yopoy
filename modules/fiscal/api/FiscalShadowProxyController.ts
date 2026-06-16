import { Request, Response } from "express";
import { FiscalShadowProxyHarness } from "../canary/proxy/FiscalShadowProxyHarness";

export class FiscalShadowProxyController {
  private harness = new FiscalShadowProxyHarness();

  public async getStatus(req: Request, res: Response): Promise<void> {
    try {
      this.enforceMasterAdmin(req);
      const data = this.harness.getStatus();
      res.json({ success: true, data });
    } catch (e: any) {
      this.handleError(e, res);
    }
  }

  public async simulateDispatch(req: Request, res: Response): Promise<void> {
    try {
      this.enforceMasterAdmin(req);
      const userId = (req as any).user?.id;
      const data = await this.harness.simulateDispatch(req.body, userId);
      res.json({ success: true, data });
    } catch (e: any) {
      this.handleError(e, res);
    }
  }

  public async compareShape(req: Request, res: Response): Promise<void> {
    try {
      this.enforceMasterAdmin(req);
      const data = this.harness.compareShape(req.body.legacyShape, req.body.v2Shape);
      res.json({ success: true, data });
    } catch (e: any) {
      this.handleError(e, res);
    }
  }

  public async validateRoute(req: Request, res: Response): Promise<void> {
    try {
      this.enforceMasterAdmin(req);
      const data = this.harness.validateRoute(req.body);
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

  public async validateSafeShape(req: Request, res: Response): Promise<void> {
    try {
      this.enforceMasterAdmin(req);
      const data = this.harness.validateSafeShape(req.body);
      res.json({ success: true, data });
    } catch (e: any) {
      this.handleError(e, res);
    }
  }

  private enforceMasterAdmin(req: Request): void {
    const isMasterAdmin = (req as any).user?.is_master_admin === true;
    if (!isMasterAdmin) {
      throw new Error("Acesso restrito. Módulo de Shadow Proxy exige privilégios de Master Admin.");
    }
  }

  private handleError(e: any, res: Response): void {
    if (e.message.includes("Master Admin")) {
      res.status(403).json({ success: false, error: e.message });
    } else {
      res.status(500).json({ success: false, error: "Internal Shadow Proxy Error" });
    }
  }
}
