import { Request, Response } from 'express';
import { FiscalShadowMirrorCaptureValidator } from '../shadow-mirror/FiscalShadowMirrorCaptureValidator';
import { FiscalShadowMirrorCaptureDryRunService } from '../shadow-mirror/FiscalShadowMirrorCaptureDryRunService';
import { FiscalShadowMirrorCaptureReportService } from '../shadow-mirror/FiscalShadowMirrorCaptureReportService';
import { FiscalShadowMirrorCaptureAuditService } from '../shadow-mirror/FiscalShadowMirrorCaptureAuditService';

function extractContext(req: Request) {
   const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
   const userId = (req as any).user?.id || (req as any).session?.user_id || 'system';
   return { companyId, userId, endpoint: req.path };
}

export class FiscalShadowMirrorCaptureController {
  public static async validate(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalShadowMirrorCaptureAuditService.logAdministrativeRead({ companyId, userId, endpoint });

      const envelope = {
        routeId: req.body.routeId,
        syntheticMethod: req.body.syntheticMethod,
        syntheticPath: req.body.syntheticPath,
        syntheticHeaders: req.body.syntheticHeaders,
        syntheticRequestShape: req.body.syntheticRequestShape,
        syntheticResponseShape: req.body.syntheticResponseShape,
        metadata: req.body.metadata,
        companyId
      };

      const result = FiscalShadowMirrorCaptureValidator.validate(envelope);
      res.json({ 
          ...result, 
          dryRunOnly: true, adminEnvelopeOnly: true, captured: false, 
          requestCaptured: false, responseCaptured: false, dispatched: false,
          routeToV2: false, routeToLegacy: true, planningOnly: true, 
          simulationOnly: true, activationBlocked: true 
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async dryRun(req: Request, res: Response) {
    try {
      const { companyId } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      const envelope = {
        routeId: req.body.routeId,
        syntheticMethod: req.body.syntheticMethod,
        syntheticPath: req.body.syntheticPath,
        syntheticHeaders: req.body.syntheticHeaders,
        syntheticRequestShape: req.body.syntheticRequestShape,
        syntheticResponseShape: req.body.syntheticResponseShape,
        metadata: req.body.metadata,
        companyId
      };

      const result = await FiscalShadowMirrorCaptureDryRunService.simulateCapture(envelope);
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getReport(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalShadowMirrorCaptureAuditService.logAdministrativeRead({ companyId, userId, endpoint });

      res.json(FiscalShadowMirrorCaptureReportService.getReport());
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getAudit(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalShadowMirrorCaptureAuditService.logAdministrativeRead({ companyId, userId, endpoint });

      res.json({
         logs: FiscalShadowMirrorCaptureAuditService.getLogs(),
         dryRunOnly: true, adminEnvelopeOnly: true, captured: false, 
         requestCaptured: false, responseCaptured: false, dispatched: false,
         routeToV2: false, routeToLegacy: true, planningOnly: true, 
         simulationOnly: true, activationBlocked: true 
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
      dryRunOnly: true,
      adminEnvelopeOnly: true,
      captured: false,
      requestCaptured: false,
      responseCaptured: false,
      dispatched: false
    });
  }
}
