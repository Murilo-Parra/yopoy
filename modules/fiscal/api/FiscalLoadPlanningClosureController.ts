import { Request, Response } from 'express';
import { FiscalLoadPlanningClosureInventory } from '../load-planning/closure/FiscalLoadPlanningClosureInventory';
import { FiscalLoadPlanningClosureGuardrails } from '../load-planning/closure/FiscalLoadPlanningClosureGuardrails';
import { FiscalLoadPlanningClosureRiskRegister } from '../load-planning/closure/FiscalLoadPlanningClosureRiskRegister';
import { FiscalLoadPlanningClosureEvidenceService } from '../load-planning/closure/FiscalLoadPlanningClosureEvidenceService';
import { FiscalLoadPlanningClosureHandoffService } from '../load-planning/closure/FiscalLoadPlanningClosureHandoffService';
import { FiscalLoadPlanningClosureReportService } from '../load-planning/closure/FiscalLoadPlanningClosureReportService';
import { FiscalLoadPlanningClosureAuditService } from '../load-planning/closure/FiscalLoadPlanningClosureAuditService';

function extractContext(req: Request) {
   const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
   const userId = (req as any).user?.id || (req as any).session?.user_id || 'system';
   return { companyId, userId, endpoint: req.path };
}

export class FiscalLoadPlanningClosureController {
  public static async getInventory(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalLoadPlanningClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_INVENTORY' });

      res.json({
        inventory: FiscalLoadPlanningClosureInventory.getInventory(),
        planningOnly: true, syntheticOnly: true, simulationOnly: true, activationBlocked: true
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getGuardrails(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalLoadPlanningClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_GUARDRAILS' });

      res.json({
        guardrails: FiscalLoadPlanningClosureGuardrails.getChecklist(),
        planningOnly: true, syntheticOnly: true, simulationOnly: true, activationBlocked: true
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getRisks(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalLoadPlanningClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_RISKS' });

      res.json({
        risks: FiscalLoadPlanningClosureRiskRegister.getRisks(),
        planningOnly: true, syntheticOnly: true, simulationOnly: true, activationBlocked: true
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }
  
  public static async getEvidence(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalLoadPlanningClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_EVIDENCE' });

      res.json(FiscalLoadPlanningClosureEvidenceService.getEvidence());
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getHandoff(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalLoadPlanningClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_HANDOFF' });

      res.json(FiscalLoadPlanningClosureHandoffService.generateHandoff());
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getFinalReport(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalLoadPlanningClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_FINAL_REPORT' });

      res.json(FiscalLoadPlanningClosureReportService.getFinalReport());
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getAudit(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalLoadPlanningClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_AUDIT' });

      res.json({
         logs: FiscalLoadPlanningClosureAuditService.getLogs(),
         planningOnly: true, syntheticOnly: true, simulationOnly: true, activationBlocked: true 
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getHealth(req: Request, res: Response) {
    res.json({ 
      status: 'UP',
      planningOnly: true,
      syntheticOnly: true,
      simulationOnly: true,
      activationBlocked: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      approvedForRealLoadTest: false,
      approvedForRealCanary: false,
      approvedForProductionV2: false,
      routeToV2: false,
      routeToLegacy: true,
      loadExecuted: false,
      executionEnabled: false,
      executionStarted: false,
      realTrafficGenerated: false,
      callsRealEndpoint: false,
      callsLegacyHandler: false,
      callsV2Handler: false
    });
  }
}
