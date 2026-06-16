import { Request, Response } from "express";
import { FiscalCanaryRouteMappingService } from "../canary/routes/FiscalCanaryRouteMappingService";

export class FiscalCanaryRouteMappingController {
  private mappingService = new FiscalCanaryRouteMappingService();

  public async getCatalog(req: Request, res: Response): Promise<void> {
    try {
      this.enforceMasterAdmin(req);
      const data = this.mappingService.getCatalog();
      res.json({ success: true, count: data.length, data });
    } catch (e: any) {
      this.handleError(e, res);
    }
  }

  public async getMappings(req: Request, res: Response): Promise<void> {
    try {
      this.enforceMasterAdmin(req);
      const data = this.mappingService.getCatalog(); // simplified list
      res.json({ success: true, count: data.length, data });
    } catch (e: any) {
      this.handleError(e, res);
    }
  }

  public async getMappingById(req: Request, res: Response): Promise<void> {
    try {
      this.enforceMasterAdmin(req);
      const id = req.params.id;
      const data = this.mappingService.getMappingById(id);
      if (data) {
         res.json({ success: true, data });
      } else {
         res.status(404).json({ success: false, error: "Mapping not found" });
      }
    } catch (e: any) {
      this.handleError(e, res);
    }
  }

  public async getReadiness(req: Request, res: Response): Promise<void> {
    try {
      this.enforceMasterAdmin(req);
      const mappingId = req.query.mappingId as string;
      const companyId = req.query.companyId as string;
      if (!mappingId) {
        res.status(400).json({ success: false, error: "mappingId query parameter is required" });
        return;
      }
      const data = await this.mappingService.getReadiness(mappingId, companyId);
      res.json({ success: true, data });
    } catch (e: any) {
      this.handleError(e, res);
    }
  }

  public async simulateMapping(req: Request, res: Response): Promise<void> {
    try {
      this.enforceMasterAdmin(req);
      const method = req.body.method as string;
      const path = req.body.path as string;
      if (!method || !path) {
         res.status(400).json({ success: false, error: "method and path are required" });
         return;
      }
      const data = this.mappingService.simulateMapping(method, path);
      res.json({ success: true, data });
    } catch (e: any) {
      this.handleError(e, res);
    }
  }

  public async validateMapping(req: Request, res: Response): Promise<void> {
    try {
      this.enforceMasterAdmin(req);
      const method = req.body.method as string;
      const path = req.body.path as string;
      if (!method || !path) {
         res.status(400).json({ success: false, error: "method and path are required" });
         return;
      }
      const data = this.mappingService.validateMapping(method, path);
      res.json({ success: true, data });
    } catch (e: any) {
      this.handleError(e, res);
    }
  }

  private enforceMasterAdmin(req: Request): void {
    const isMasterAdmin = (req as any).user?.is_master_admin === true;
    if (!isMasterAdmin) {
      throw new Error("Acesso restrito. Módulo de Canary Route Mapping exige privilégios de Master Admin.");
    }
  }

  private handleError(e: any, res: Response): void {
    if (e.message.includes("Master Admin")) {
      res.status(403).json({ success: false, error: e.message });
    } else {
      res.status(500).json({ success: false, error: "Internal Route Mapping Error" });
    }
  }
}
