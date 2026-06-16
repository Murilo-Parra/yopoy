import { Request, Response } from 'express';
import { FiscalSafeShapeMiddlewareGuardrails } from '../shadow-mirror/safe-middleware/FiscalSafeShapeMiddlewareGuardrails';
import { FiscalSafeShapeMiddlewarePlanService } from '../shadow-mirror/safe-middleware/FiscalSafeShapeMiddlewarePlanService';
import { FiscalSafeShapeMiddlewareDecisionService } from '../shadow-mirror/safe-middleware/FiscalSafeShapeMiddlewareDecisionService';
import { FiscalSafeShapeMiddlewareReportService } from '../shadow-mirror/safe-middleware/FiscalSafeShapeMiddlewareReportService';
import { FiscalSafeShapeMiddlewareAuditService } from '../shadow-mirror/safe-middleware/FiscalSafeShapeMiddlewareAuditService';
import { FiscalSafeShapeMiddlewareEnvelope } from '../shadow-mirror/safe-middleware/FiscalSafeShapeMiddlewareEnvelope';
import { FiscalSafeShapeMiddlewareSerializer } from '../shadow-mirror/safe-middleware/FiscalSafeShapeMiddlewareSerializer';
import { FiscalSafeShapeMiddlewareStatus, FiscalSafeShapeMiddlewareEnvelopeResult } from '../shadow-mirror/safe-middleware/FiscalSafeShapeMiddlewareTypes';
import { FiscalShadowMirrorRouteCatalog } from '../shadow-mirror/FiscalShadowMirrorRouteCatalog';

function extractContext(req: Request) {
   const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
   const userId = (req as any).user?.id || (req as any).session?.user_id || 'system';
   return { companyId, userId, endpoint: req.path };
}

export class FiscalSafeShapeMiddlewareController {
  public static async getGuardrails(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalSafeShapeMiddlewareAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_GUARDRAILS' });

      res.json({
        guardrails: FiscalSafeShapeMiddlewareGuardrails.getChecklist(),
        designOnly: true, validationOnly: true, simulationOnly: true, activationBlocked: true
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getPlan(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalSafeShapeMiddlewareAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_PLAN' });

      res.json(FiscalSafeShapeMiddlewarePlanService.getPlan());
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async validateEnvelope(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      const input = {
          routeId: req.body.routeId,
          syntheticMethod: req.body.syntheticMethod,
          syntheticPath: req.body.syntheticPath,
          syntheticHeaders: req.body.syntheticHeaders,
          syntheticRequestShape: req.body.syntheticRequestShape,
          syntheticResponseShape: req.body.syntheticResponseShape,
          metadata: req.body.metadata,
          companyId
      };

      const route = FiscalShadowMirrorRouteCatalog.getRouteById(input.routeId);
      
      if (!route) {
          const status = FiscalSafeShapeMiddlewareStatus.ENVELOPE_BLOCKED;
          FiscalSafeShapeMiddlewareReportService.recordValidation(input.routeId, status);
          await FiscalSafeShapeMiddlewareAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'VALIDATE_ENVELOPE', details: { status } });
          return res.json(FiscalSafeShapeMiddlewareController.buildResult(false, status, input.routeId, ['Route not found'], [], null));
      }

      const safeEnvelope = FiscalSafeShapeMiddlewareEnvelope.process(input);
      const { error, serializerResult } = FiscalSafeShapeMiddlewareSerializer.serialize(safeEnvelope);

      if (error) {
          const status = FiscalSafeShapeMiddlewareStatus.BLOCKED_BY_SENSITIVE_INPUT;
          FiscalSafeShapeMiddlewareReportService.recordValidation(input.routeId, status);
          await FiscalSafeShapeMiddlewareAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'VALIDATE_ENVELOPE', details: { status } });
          return res.json(FiscalSafeShapeMiddlewareController.buildResult(false, status, input.routeId, [error], [], null));
      }

      const status = FiscalSafeShapeMiddlewareStatus.ENVELOPE_VALID;
      FiscalSafeShapeMiddlewareReportService.recordValidation(input.routeId, status);
      await FiscalSafeShapeMiddlewareAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'VALIDATE_ENVELOPE', details: { status } });
      
      res.json(FiscalSafeShapeMiddlewareController.buildResult(true, status, input.routeId, [], [], serializerResult));
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async simulateDecision(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      const routeId = req.body.routeId;
      if (!routeId) return res.status(400).json({ error: 'routeId is required' });

      const decision = FiscalSafeShapeMiddlewareDecisionService.simulateDecision(routeId);

      await FiscalSafeShapeMiddlewareAuditService.logAdministrativeAction({ 
         companyId, userId, endpoint, action: 'SIMULATE_DECISION', details: { routeId, status: decision.allowed ? 'ALLOWED' : 'BLOCKED' } 
      });

      res.json(decision);
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getReport(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalSafeShapeMiddlewareAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_REPORT' });

      res.json(FiscalSafeShapeMiddlewareReportService.getReport());
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getAudit(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalSafeShapeMiddlewareAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_AUDIT' });

      res.json({
         logs: FiscalSafeShapeMiddlewareAuditService.getLogs(),
         designOnly: true, validationOnly: true, simulationOnly: true, activationBlocked: true 
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getHealth(req: Request, res: Response) {
    res.json({ 
      status: 'UP',
      designOnly: true,
      validationOnly: true,
      simulationOnly: true,
      activationBlocked: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      approvedForRealCanary: false,
      approvedForProductionV2: false,
      routeToV2: false,
      routeToLegacy: true,
      middlewareInstalled: false,
      middlewareActive: false,
      capturesRequest: false,
      capturesResponse: false,
      readsRealBody: false,
      readsRealResponse: false,
      callsLegacyHandler: false,
      callsV2Handler: false
    });
  }

  private static buildResult(
      success: boolean, 
      status: string, 
      routeId: string, 
      blockers: string[], 
      warnings: string[],
      safeEnvelope: any
  ): FiscalSafeShapeMiddlewareEnvelopeResult {
      return {
          success, status, routeId, blockers, warnings, safeEnvelope,
          middlewareInstalled: false, middlewareActive: false,
          capturesRequest: false, capturesResponse: false,
          readsRealBody: false, readsRealResponse: false,
          callsLegacyHandler: false, callsV2Handler: false,
          routeToV2: false, routeToLegacy: true,
          designOnly: true, validationOnly: true, simulationOnly: true,
          activationBlocked: true, payloadIncluded: false, sensitiveDataIncluded: false,
          approvedForRealCanary: false, approvedForProductionV2: false
      };
  }
}
