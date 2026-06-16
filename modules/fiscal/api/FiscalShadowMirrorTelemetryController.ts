import { Request, Response } from 'express';
import { FiscalShadowMirrorTelemetryGuardrails } from '../shadow-mirror/telemetry/FiscalShadowMirrorTelemetryGuardrails';
import { FiscalShadowMirrorTelemetryPlanService } from '../shadow-mirror/telemetry/FiscalShadowMirrorTelemetryPlanService';
import { FiscalShadowMirrorTelemetryReportService } from '../shadow-mirror/telemetry/FiscalShadowMirrorTelemetryReportService';
import { FiscalShadowMirrorTelemetryAuditService } from '../shadow-mirror/telemetry/FiscalShadowMirrorTelemetryAuditService';
import { FiscalShadowMirrorTelemetryEvent } from '../shadow-mirror/telemetry/FiscalShadowMirrorTelemetryEvent';
import { FiscalShadowMirrorTelemetryPolicy } from '../shadow-mirror/telemetry/FiscalShadowMirrorTelemetryPolicy';
import { FiscalShadowMirrorTelemetrySerializer } from '../shadow-mirror/telemetry/FiscalShadowMirrorTelemetrySerializer';
import { FiscalShadowMirrorTelemetryAggregator } from '../shadow-mirror/telemetry/FiscalShadowMirrorTelemetryAggregator';
import { FiscalShadowMirrorTelemetryEventResult } from '../shadow-mirror/telemetry/FiscalShadowMirrorTelemetryTypes';

function extractContext(req: Request) {
   const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
   const userId = (req as any).user?.id || (req as any).session?.user_id || 'system';
   return { companyId, userId, endpoint: req.path };
}

export class FiscalShadowMirrorTelemetryController {
  public static async getGuardrails(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalShadowMirrorTelemetryAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_GUARDRAILS' });

      res.json({
        guardrails: FiscalShadowMirrorTelemetryGuardrails.getChecklist(),
        designOnly: true, telemetryDesignOnly: true, simulationOnly: true, activationBlocked: true
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getPlan(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalShadowMirrorTelemetryAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_PLAN' });

      res.json(FiscalShadowMirrorTelemetryPlanService.getPlan());
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async validateEvent(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      const input = { ...req.body, companyId };
      const safeEvent = FiscalShadowMirrorTelemetryEvent.process(input);
      const { allowed, status, blockers } = FiscalShadowMirrorTelemetryPolicy.evaluate(input);

      FiscalShadowMirrorTelemetryAggregator.addEvent(safeEvent, status, allowed);
      await FiscalShadowMirrorTelemetryAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'VALIDATE_EVENT', details: { status } });

      if (!allowed) {
          return res.json(FiscalShadowMirrorTelemetryController.buildResult(false, status, input.routeId, blockers, [], null, false));
      }

      const { error, serializerResult } = FiscalShadowMirrorTelemetrySerializer.serialize(safeEvent);
      if (error) {
          const errStatus = 'BLOCKED_BY_SENSITIVE_INPUT';
          FiscalShadowMirrorTelemetryAggregator.addEvent(safeEvent, errStatus, false);
          return res.json(FiscalShadowMirrorTelemetryController.buildResult(false, errStatus, input.routeId, [error], [], null, false));
      }

      res.json(FiscalShadowMirrorTelemetryController.buildResult(true, status, input.routeId, [], [], serializerResult, true));
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async simulateEvent(req: Request, res: Response) {
    // simulation behaves the same as validate in design phase
    return FiscalShadowMirrorTelemetryController.validateEvent(req, res);
  }

  public static async getReport(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalShadowMirrorTelemetryAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_REPORT' });

      res.json(FiscalShadowMirrorTelemetryReportService.getReport());
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getAudit(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalShadowMirrorTelemetryAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_AUDIT' });

      res.json({
         logs: FiscalShadowMirrorTelemetryAuditService.getLogs(),
         eventsSent: FiscalShadowMirrorTelemetryAggregator.getEvents(),
         designOnly: true, telemetryDesignOnly: true, simulationOnly: true, activationBlocked: true 
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getHealth(req: Request, res: Response) {
    res.json({ 
      status: 'UP',
      designOnly: true,
      telemetryDesignOnly: true,
      simulationOnly: true,
      activationBlocked: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      approvedForRealCanary: false,
      approvedForProductionV2: false,
      routeToV2: false,
      routeToLegacy: true,
      middlewareInstalled: false,
      tapInstalled: false,
      capturesRequest: false,
      capturesResponse: false,
      readsRealBody: false,
      readsRealResponse: false,
      telemetryPersisted: false,
      telemetryInMemoryOnly: true,
      telemetryFromRealTraffic: false
    });
  }

  private static buildResult(
      success: boolean, 
      status: string, 
      routeId: string, 
      blockers: string[], 
      warnings: string[],
      safeEvent: any,
      accepted: boolean
  ): FiscalShadowMirrorTelemetryEventResult {
      return {
          success, status, routeId, blockers, warnings, safeEvent,
          telemetryAccepted: accepted, telemetryPersisted: false,
          telemetryInMemoryOnly: true, telemetryFromRealTraffic: false,
          middlewareInstalled: false, tapInstalled: false,
          capturesRequest: false, capturesResponse: false,
          readsRealBody: false, readsRealResponse: false,
          routeToV2: false, routeToLegacy: true,
          designOnly: true, telemetryDesignOnly: true, simulationOnly: true,
          activationBlocked: true, payloadIncluded: false, sensitiveDataIncluded: false,
          approvedForRealCanary: false, approvedForProductionV2: false
      };
  }
}
