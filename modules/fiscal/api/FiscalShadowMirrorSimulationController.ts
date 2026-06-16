import { Request, Response } from 'express';
import { FiscalShadowMirrorSimulationValidator } from '../shadow-mirror/FiscalShadowMirrorSimulationValidator';
import { FiscalShadowMirrorSimulationService } from '../shadow-mirror/FiscalShadowMirrorSimulationService';
import { FiscalShadowMirrorSimulationReportService } from '../shadow-mirror/FiscalShadowMirrorSimulationReportService';
import { FiscalShadowMirrorSimulationAuditService } from '../shadow-mirror/FiscalShadowMirrorSimulationAuditService';

function extractContext(req: Request) {
   const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
   const userId = (req as any).user?.id || (req as any).session?.user_id || 'system';
   return { companyId, userId, endpoint: req.path };
}

export class FiscalShadowMirrorSimulationController {
  public static async validate(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalShadowMirrorSimulationAuditService.logAdministrativeRead({ companyId, userId, endpoint });

      const input = {
        routeId: req.body.routeId,
        syntheticLegacyShape: req.body.syntheticLegacyShape,
        syntheticV2Shape: req.body.syntheticV2Shape,
        companyId
      };

      const result = FiscalShadowMirrorSimulationValidator.validate(input);
      res.json({ ...result, planningOnly: true, activationBlocked: true, routeToV2: false, routeToLegacy: true });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async run(req: Request, res: Response) {
    try {
      const { companyId } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      const input = {
        routeId: req.body.routeId,
        syntheticLegacyShape: req.body.syntheticLegacyShape,
        syntheticV2Shape: req.body.syntheticV2Shape,
        companyId
      };

      const result = await FiscalShadowMirrorSimulationService.simulate(input);
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getReport(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalShadowMirrorSimulationAuditService.logAdministrativeRead({ companyId, userId, endpoint });

      res.json(FiscalShadowMirrorSimulationReportService.getReport());
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getAudit(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalShadowMirrorSimulationAuditService.logAdministrativeRead({ companyId, userId, endpoint });

      res.json({
         logs: FiscalShadowMirrorSimulationAuditService.getLogs(),
         planningOnly: true, activationBlocked: true, routeToV2: false, routeToLegacy: true
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getHealth(req: Request, res: Response) {
    res.json({ 
      status: 'UP',
      planningOnly: true,
      simulationOnly: true,
      activationBlocked: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      approvedForRealCanary: false,
      approvedForProductionV2: false,
      routeToV2: false,
      routeToLegacy: true,
      manualOnly: true,
      syntheticOnly: true,
      captured: false,
      dispatched: false
    });
  }
}
