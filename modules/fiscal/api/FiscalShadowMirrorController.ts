import { Request, Response } from 'express';
import { FiscalShadowMirrorRegistryService } from '../shadow-mirror/FiscalShadowMirrorRegistryService';
import { FiscalShadowMirrorPlanService } from '../shadow-mirror/FiscalShadowMirrorPlanService';
import { FiscalShadowMirrorReportService } from '../shadow-mirror/FiscalShadowMirrorReportService';
import { FiscalShadowMirrorAuditService } from '../shadow-mirror/FiscalShadowMirrorAuditService';

function extractContext(req: Request) {
   const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
   const userId = (req as any).user?.id || (req as any).session?.user_id || 'system';
   return { companyId, userId, endpoint: req.path };
}

export class FiscalShadowMirrorController {
  public static async listRoutes(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalShadowMirrorAuditService.logAdministrativeRead({ companyId, userId, endpoint });

      res.json({
        routes: FiscalShadowMirrorRegistryService.listRoutes(),
        planningOnly: true,
        activationBlocked: true,
        approvedForRealCanary: false,
        approvedForProductionV2: false
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getRouteById(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalShadowMirrorAuditService.logAdministrativeRead({ companyId, userId, endpoint });

      const route = FiscalShadowMirrorRegistryService.getRoute(req.params.id);
      if (!route) return res.status(404).json({ error: 'Route not found' });
      
      res.json({
        route,
        planningOnly: true,
        activationBlocked: true,
        approvedForRealCanary: false,
        approvedForProductionV2: false
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getRisks(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalShadowMirrorAuditService.logAdministrativeRead({ companyId, userId, endpoint });

      res.json({
        risks: FiscalShadowMirrorRegistryService.getRisks(),
        planningOnly: true,
        activationBlocked: true,
        approvedForRealCanary: false,
        approvedForProductionV2: false
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getDependencies(req: Request, res: Response) {
     try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalShadowMirrorAuditService.logAdministrativeRead({ companyId, userId, endpoint });

      res.json({
        dependencies: FiscalShadowMirrorRegistryService.getDependencies(),
        planningOnly: true,
        activationBlocked: true,
        approvedForRealCanary: false,
        approvedForProductionV2: false
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getPlan(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalShadowMirrorAuditService.logAdministrativeRead({ companyId, userId, endpoint });

      const plan = FiscalShadowMirrorPlanService.getPlan();
      res.json({ ...plan, message: 'Este plano é planning-only e não autoriza interceptação, espelhamento real, SEFAZ, XML assinado ou PDF.' });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getReport(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalShadowMirrorAuditService.logAdministrativeRead({ companyId, userId, endpoint });

      res.json(FiscalShadowMirrorReportService.getReport());
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getHealth(req: Request, res: Response) {
    res.json({ 
      status: 'UP',
      planningOnly: true,
      activationBlocked: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      approvedForRealCanary: false,
      approvedForProductionV2: false,
      routeToV2: false,
      routeToLegacy: true
    });
  }
}
