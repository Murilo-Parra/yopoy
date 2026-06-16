import { Request, Response } from 'express';
import { FiscalReleaseReadinessClosureInventory } from '../release-gate/closure/FiscalReleaseReadinessClosureInventory';
import { FiscalReleaseReadinessClosureCriteria } from '../release-gate/closure/FiscalReleaseReadinessClosureCriteria';
import { FiscalReleaseReadinessClosureEvidenceService } from '../release-gate/closure/FiscalReleaseReadinessClosureEvidenceService';
import { FiscalReleaseReadinessClosureRiskRegister } from '../release-gate/closure/FiscalReleaseReadinessClosureRiskRegister';
import { FiscalReleaseReadinessClosureHandoffService } from '../release-gate/closure/FiscalReleaseReadinessClosureHandoffService';
import { FiscalReleaseReadinessClosureReportService } from '../release-gate/closure/FiscalReleaseReadinessClosureReportService';
import { FiscalReleaseReadinessClosureAuditService } from '../release-gate/closure/FiscalReleaseReadinessClosureAuditService';

function extractContext(req: Request) {
   const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
   const userId = (req as any).user?.id || (req as any).session?.user_id || 'system';
   return { companyId, userId, endpoint: req.path };
}

export class FiscalReleaseReadinessClosureController {
  public static async getInventory(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalReleaseReadinessClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_CLOSURE_INVENTORY' });

      res.json({
        inventory: FiscalReleaseReadinessClosureInventory.getInventory(),
        readOnly: true, governanceOnly: true, releasePlanningOnly: true, planningOnly: true, simulationOnly: true, activationBlocked: true
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getCriteria(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalReleaseReadinessClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_CLOSURE_CRITERIA' });

      res.json({
        criteria: FiscalReleaseReadinessClosureCriteria.getCriteria(),
        readOnly: true, governanceOnly: true, releasePlanningOnly: true, planningOnly: true, simulationOnly: true, activationBlocked: true
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getEvidence(req: Request, res: Response) {
     try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalReleaseReadinessClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_CLOSURE_EVIDENCE' });

      res.json(FiscalReleaseReadinessClosureEvidenceService.getEvidence());
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getRisks(req: Request, res: Response) {
     try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalReleaseReadinessClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_CLOSURE_RISKS' });

      res.json({
        risks: FiscalReleaseReadinessClosureRiskRegister.getRisks(),
        readOnly: true, governanceOnly: true, releasePlanningOnly: true, planningOnly: true, simulationOnly: true, activationBlocked: true
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getHandoff(req: Request, res: Response) {
     try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalReleaseReadinessClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_CLOSURE_HANDOFF' });

      res.json(FiscalReleaseReadinessClosureHandoffService.generateHandoff());
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getFinalReport(req: Request, res: Response) {
     try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalReleaseReadinessClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_CLOSURE_FINAL_REPORT' });

      res.json(FiscalReleaseReadinessClosureReportService.getFinalReport());
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getAudit(req: Request, res: Response) {
     try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalReleaseReadinessClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_CLOSURE_AUDIT' });

      res.json({
         logs: FiscalReleaseReadinessClosureAuditService.getLogs(),
         readOnly: true, governanceOnly: true, releasePlanningOnly: true, planningOnly: true, simulationOnly: true, activationBlocked: true 
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
      planningOnly: true,
      simulationOnly: true,
      activationBlocked: true,
      realReleaseExecuted: false,
      realCanaryActivated: false,
      productionV2Activated: false,
      rollbackExecuted: false,
      circuitBreakerInstalled: false,
      killSwitchActivated: false,
      sefazHomologationActivated: false,
      sefazCalled: false,
      xmlSigned: false,
      pdfGenerated: false,
      trafficChanged: false,
      endpointsCalled: false,
      workersCreated: false,
      schedulersCreated: false,
      approvedForRealRelease: false,
      approvedForRealCanary: false,
      approvedForProductionV2: false,
      payloadIncluded: false,
      sensitiveDataIncluded: false
    });
  }
}
