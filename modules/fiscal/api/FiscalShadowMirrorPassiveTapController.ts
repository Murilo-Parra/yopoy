import { Request, Response } from 'express';
import { FiscalShadowMirrorPassiveTapRegistry } from '../shadow-mirror/passive-tap/FiscalShadowMirrorPassiveTapRegistry';
import { FiscalShadowMirrorPassiveTapGuardrails } from '../shadow-mirror/passive-tap/FiscalShadowMirrorPassiveTapGuardrails';
import { FiscalShadowMirrorPassiveTapPlanService } from '../shadow-mirror/passive-tap/FiscalShadowMirrorPassiveTapPlanService';
import { FiscalShadowMirrorPassiveTapDecisionService } from '../shadow-mirror/passive-tap/FiscalShadowMirrorPassiveTapDecisionService';
import { FiscalShadowMirrorPassiveTapReportService } from '../shadow-mirror/passive-tap/FiscalShadowMirrorPassiveTapReportService';
import { FiscalShadowMirrorPassiveTapAuditService } from '../shadow-mirror/passive-tap/FiscalShadowMirrorPassiveTapAuditService';

function extractContext(req: Request) {
   const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
   const userId = (req as any).user?.id || (req as any).session?.user_id || 'system';
   return { companyId, userId, endpoint: req.path };
}

export class FiscalShadowMirrorPassiveTapController {
  public static async getRegistry(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalShadowMirrorPassiveTapAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_REGISTRY' });

      res.json({
        registry: FiscalShadowMirrorPassiveTapRegistry.getTapPoints(),
        designOnly: true, planningOnly: true, simulationOnly: true, activationBlocked: true
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getGuardrails(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalShadowMirrorPassiveTapAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_GUARDRAILS' });

      res.json({
        guardrails: FiscalShadowMirrorPassiveTapGuardrails.getChecklist(),
        designOnly: true, planningOnly: true, simulationOnly: true, activationBlocked: true
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getPlan(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalShadowMirrorPassiveTapAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_PLAN' });

      res.json({ ...FiscalShadowMirrorPassiveTapPlanService.getPlan() });
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

      const decision = FiscalShadowMirrorPassiveTapDecisionService.simulateDecision(routeId);

      await FiscalShadowMirrorPassiveTapAuditService.logAdministrativeAction({ 
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

      await FiscalShadowMirrorPassiveTapAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_REPORT' });

      res.json(FiscalShadowMirrorPassiveTapReportService.getReport());
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getAudit(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalShadowMirrorPassiveTapAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_AUDIT' });

      res.json({
         logs: FiscalShadowMirrorPassiveTapAuditService.getLogs(),
         designOnly: true, planningOnly: true, simulationOnly: true, activationBlocked: true 
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getHealth(req: Request, res: Response) {
    res.json({ 
      status: 'UP',
      designOnly: true,
      planningOnly: true,
      simulationOnly: true,
      activationBlocked: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      approvedForRealCanary: false,
      approvedForProductionV2: false,
      routeToV2: false,
      routeToLegacy: true,
      installableNow: false,
      installed: false,
      active: false,
      capturesRequest: false,
      capturesResponse: false
    });
  }
}
