import { Request, Response } from 'express';
import { FiscalSyntheticScenarioCatalog } from '../load-planning/FiscalSyntheticScenarioCatalog';
import { FiscalLoadPlanningGuardrails } from '../load-planning/FiscalLoadPlanningGuardrails';
import { FiscalLoadRiskClassifier } from '../load-planning/FiscalLoadRiskClassifier';
import { FiscalLoadPlanningEstimatorService } from '../load-planning/FiscalLoadPlanningEstimatorService';
import { FiscalLoadPlanningReportService } from '../load-planning/FiscalLoadPlanningReportService';
import { FiscalLoadPlanningAuditService } from '../load-planning/FiscalLoadPlanningAuditService';

function extractContext(req: Request) {
   const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
   const userId = (req as any).user?.id || (req as any).session?.user_id || 'system';
   return { companyId, userId, endpoint: req.path };
}

export class FiscalLoadPlanningController {
  public static async getScenarios(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalLoadPlanningAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_SCENARIOS' });

      res.json({
        scenarios: FiscalSyntheticScenarioCatalog.getScenarios(),
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

      await FiscalLoadPlanningAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_GUARDRAILS' });

      res.json({
        guardrails: FiscalLoadPlanningGuardrails.getChecklist(),
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

      await FiscalLoadPlanningAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_RISKS' });
      
      const scenarios = FiscalSyntheticScenarioCatalog.getScenarios();
      const classifiedScenarios = scenarios.map(s => ({
          scenarioId: s.id,
          risk: s.risk,
          riskClassification: FiscalLoadRiskClassifier.isScenarioBlocked(s)
      }));

      res.json({
        riskClassifications: classifiedScenarios,
        planningOnly: true, syntheticOnly: true, simulationOnly: true, activationBlocked: true
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async estimate(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      const input = {
          scenarioIds: req.body.scenarioIds,
          durationMinutes: req.body.durationMinutes,
          targetRpm: req.body.targetRpm,
          metadata: req.body.metadata,
          companyId
      };

      const result = await FiscalLoadPlanningEstimatorService.estimate(input);

      await FiscalLoadPlanningAuditService.logAdministrativeAction({ 
          companyId, userId, endpoint, action: 'ESTIMATE_LOAD', details: { input, resultStatus: result.status } 
      });

      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getReport(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalLoadPlanningAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_REPORT' });

      res.json(FiscalLoadPlanningReportService.getReport());
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getAudit(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalLoadPlanningAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_AUDIT' });

      res.json({
         logs: FiscalLoadPlanningAuditService.getLogs(),
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
      callsRealEndpoint: false,
      callsLegacyHandler: false,
      callsV2Handler: false
    });
  }
}
