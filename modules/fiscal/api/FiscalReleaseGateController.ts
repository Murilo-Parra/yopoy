import { Request, Response } from 'express';
import { FiscalReleaseGateSignalInventory } from '../release-gate/FiscalReleaseGateSignalInventory';
import { FiscalReleaseGateCriteriaMatrix } from '../release-gate/FiscalReleaseGateCriteriaMatrix';
import { FiscalReleaseGateRiskRegister } from '../release-gate/FiscalReleaseGateRiskRegister';
import { FiscalReleaseGateEvaluationService } from '../release-gate/FiscalReleaseGateEvaluationService';
import { FiscalReleaseGateHandoffService } from '../release-gate/FiscalReleaseGateHandoffService';
import { FiscalReleaseGateReportService } from '../release-gate/FiscalReleaseGateReportService';
import { FiscalReleaseGateAuditService } from '../release-gate/FiscalReleaseGateAuditService';

function extractContext(req: Request) {
   const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
   const userId = (req as any).user?.id || (req as any).session?.user_id || 'system';
   return { companyId, userId, endpoint: req.path };
}

export class FiscalReleaseGateController {
  public static async getSignals(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalReleaseGateAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_SIGNALS' });

      res.json({
        signals: FiscalReleaseGateSignalInventory.getSignals(),
        readOnly: true, governanceOnly: true, releasePlanningOnly: true, simulationOnly: true, activationBlocked: true
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getCriteria(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalReleaseGateAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_CRITERIA' });

      res.json({
        criteria: FiscalReleaseGateCriteriaMatrix.getCriteria(),
        readOnly: true, governanceOnly: true, releasePlanningOnly: true, simulationOnly: true, activationBlocked: true
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getRisks(req: Request, res: Response) {
     try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalReleaseGateAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_RISKS' });

      res.json({
        risks: FiscalReleaseGateRiskRegister.getRisks(),
        readOnly: true, governanceOnly: true, releasePlanningOnly: true, simulationOnly: true, activationBlocked: true
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
          targetDomain: req.body.targetDomain,
          forceApproval: req.body.forceApproval,
          metadata: req.body.metadata
      };

      const result = await FiscalReleaseGateEvaluationService.evaluate(input);

      await FiscalReleaseGateAuditService.logAdministrativeAction({ 
          companyId, userId, endpoint, action: 'EVALUATE_RELEASE', details: { input, result } 
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

      await FiscalReleaseGateAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_HANDOFF' });

      res.json(FiscalReleaseGateHandoffService.generateHandoff());
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getFinalReport(req: Request, res: Response) {
     try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalReleaseGateAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_FINAL_REPORT' });

      res.json(FiscalReleaseGateReportService.getFinalReport());
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getAudit(req: Request, res: Response) {
     try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalReleaseGateAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_AUDIT' });

      res.json({
         logs: FiscalReleaseGateAuditService.getLogs(),
         readOnly: true, governanceOnly: true, releasePlanningOnly: true, simulationOnly: true, activationBlocked: true 
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
      releasePlanningOnly: true,
      simulationOnly: true,
      activationBlocked: true,
      go: false,
      noGo: true,
      approvedForRelease: false,
      approvedForRealCanary: false,
      approvedForProductionV2: false,
      releaseActivated: false,
      canaryActivated: false,
      trafficChanged: false,
      payloadIncluded: false,
      sensitiveDataIncluded: false
    });
  }
}
