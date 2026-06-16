import { Request, Response } from 'express';
import { FiscalLoadRunnerBlueprintService } from '../load-planning/runner/FiscalLoadRunnerBlueprint';
import { FiscalLoadRunnerGuardrails } from '../load-planning/runner/FiscalLoadRunnerGuardrails';
import { FiscalLoadRunnerBatchPlanner } from '../load-planning/runner/FiscalLoadRunnerBatchPlanner';
import { FiscalLoadRunnerDecisionService } from '../load-planning/runner/FiscalLoadRunnerDecisionService';
import { FiscalLoadRunnerReportService } from '../load-planning/runner/FiscalLoadRunnerReportService';
import { FiscalLoadRunnerAuditService } from '../load-planning/runner/FiscalLoadRunnerAuditService';

function extractContext(req: Request) {
   const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
   const userId = (req as any).user?.id || (req as any).session?.user_id || 'system';
   return { companyId, userId, endpoint: req.path };
}

export class FiscalLoadRunnerController {
  public static async getBlueprint(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalLoadRunnerAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_BLUEPRINT' });

      res.json(FiscalLoadRunnerBlueprintService.getBlueprint());
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getGuardrails(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalLoadRunnerAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_GUARDRAILS' });

      res.json({
        guardrails: FiscalLoadRunnerGuardrails.getChecklist(),
        toolingDesignOnly: true, planningOnly: true, simulationOnly: true, activationBlocked: true
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async planBatch(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      const input = {
          scenarioIds: req.body.scenarioIds,
          plannedDurationMinutes: req.body.plannedDurationMinutes,
          plannedRpm: req.body.plannedRpm,
          plannedConcurrency: req.body.plannedConcurrency,
          metadata: req.body.metadata,
          companyId
      };

      const result = await FiscalLoadRunnerBatchPlanner.planBatch(input);

      await FiscalLoadRunnerAuditService.logAdministrativeAction({ 
          companyId, userId, endpoint, action: 'PLAN_BATCH', details: { input, resultStatus: result.status } 
      });

      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async simulateDecision(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      const input = {
          scenarioIds: req.body.scenarioIds,
          plannedDurationMinutes: req.body.plannedDurationMinutes,
          plannedRpm: req.body.plannedRpm,
          plannedConcurrency: req.body.plannedConcurrency,
          metadata: req.body.metadata,
          companyId
      };

      const decision = FiscalLoadRunnerDecisionService.simulateDecision(input);

      await FiscalLoadRunnerAuditService.logAdministrativeAction({ 
          companyId, userId, endpoint, action: 'SIMULATE_DECISION', details: { input, decision } 
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

      await FiscalLoadRunnerAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_REPORT' });

      res.json(FiscalLoadRunnerReportService.getReport());
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getAudit(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalLoadRunnerAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_AUDIT' });

      res.json({
         logs: FiscalLoadRunnerAuditService.getLogs(),
         toolingDesignOnly: true, planningOnly: true, syntheticOnly: true, simulationOnly: true, activationBlocked: true 
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getHealth(req: Request, res: Response) {
    res.json({ 
      status: 'UP',
      toolingDesignOnly: true,
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
      executionEnabled: false,
      executionStarted: false,
      loadExecuted: false,
      realTrafficGenerated: false,
      callsRealEndpoint: false,
      callsLegacyHandler: false,
      callsV2Handler: false,
      workerCreated: false,
      schedulerCreated: false
    });
  }
}
