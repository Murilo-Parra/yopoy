import { Request, Response } from 'express';
import { FiscalRollbackPlanMatrix } from '../release-gate/rollback/FiscalRollbackPlanMatrix';
import { FiscalCircuitBreakerPlan } from '../release-gate/rollback/FiscalCircuitBreakerPlan';
import { FiscalKillSwitchPlan } from '../release-gate/rollback/FiscalKillSwitchPlan';
import { FiscalSefazHomologationPlan } from '../release-gate/rollback/FiscalSefazHomologationPlan';
import { FiscalRollbackRiskRegister } from '../release-gate/rollback/FiscalRollbackRiskRegister';
import { FiscalRollbackEvaluationService } from '../release-gate/rollback/FiscalRollbackEvaluationService';
import { FiscalRollbackHandoffService } from '../release-gate/rollback/FiscalRollbackHandoffService';
import { FiscalRollbackReportService } from '../release-gate/rollback/FiscalRollbackReportService';
import { FiscalRollbackAuditService } from '../release-gate/rollback/FiscalRollbackAuditService';

function extractContext(req: Request) {
   const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
   const userId = (req as any).user?.id || (req as any).session?.user_id || 'system';
   return { companyId, userId, endpoint: req.path };
}

export class FiscalRollbackPlanningController {
  public static async getRollbackPlan(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalRollbackAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_ROLLBACK_PLAN' });

      res.json({
        rollbackPlan: FiscalRollbackPlanMatrix.getRollbackPlans(),
        readOnly: true, governanceOnly: true, planningOnly: true, simulationOnly: true, activationBlocked: true
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getCircuitBreakerPlan(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalRollbackAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_CIRCUIT_BREAKER_PLAN' });

      res.json({
        circuitBreakerPlan: FiscalCircuitBreakerPlan.getCircuitBreakers(),
        readOnly: true, governanceOnly: true, planningOnly: true, simulationOnly: true, activationBlocked: true
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getKillSwitchPlan(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalRollbackAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_KILL_SWITCH_PLAN' });

      res.json({
        killSwitchPlan: FiscalKillSwitchPlan.getKillSwitches(),
        readOnly: true, governanceOnly: true, planningOnly: true, simulationOnly: true, activationBlocked: true
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getSefazHomologationPlan(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalRollbackAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_SEFAZ_HOMOLOGATION_PLAN' });

      res.json({
        sefazHomologationPlan: FiscalSefazHomologationPlan.getHomologationPlans(),
        readOnly: true, governanceOnly: true, planningOnly: true, simulationOnly: true, activationBlocked: true
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getRisks(req: Request, res: Response) {
     try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalRollbackAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_RISKS' });

      res.json({
        risks: FiscalRollbackRiskRegister.getRisks(),
        readOnly: true, governanceOnly: true, planningOnly: true, simulationOnly: true, activationBlocked: true
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async evaluate(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      const input = {
          requestedBy: userId,
          companyId,
          requestedAction: req.body.requestedAction,
          forceExecute: req.body.forceExecute,
          metadata: req.body.metadata
      };

      const result = await FiscalRollbackEvaluationService.evaluate(input);

      await FiscalRollbackAuditService.logAdministrativeAction({ 
          companyId, userId, endpoint, action: 'EVALUATE_ROLLBACK_PLAN', details: { input, result } 
      });

      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getHandoff(req: Request, res: Response) {
     try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalRollbackAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_HANDOFF' });

      res.json(FiscalRollbackHandoffService.generateHandoff());
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getFinalReport(req: Request, res: Response) {
     try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalRollbackAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_FINAL_REPORT' });

      res.json(FiscalRollbackReportService.getFinalReport());
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getAudit(req: Request, res: Response) {
     try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalRollbackAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_AUDIT' });

      res.json({
         logs: FiscalRollbackAuditService.getLogs(),
         readOnly: true, governanceOnly: true, planningOnly: true, simulationOnly: true, activationBlocked: true 
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getHealth(req: Request, res: Response) {
    res.json({ 
      status: 'UP',
      readOnly: true,
      governanceOnly: true,
      planningOnly: true,
      simulationOnly: true,
      activationBlocked: true,
      rollbackExecuted: false,
      circuitBreakerInstalled: false,
      killSwitchActivated: false,
      sefazHomologationActivated: false,
      sefazCalled: false,
      xmlSigned: false,
      pdfGenerated: false,
      releaseActivated: false,
      canaryActivated: false,
      trafficChanged: false,
      payloadIncluded: false,
      sensitiveDataIncluded: false
    });
  }
}
