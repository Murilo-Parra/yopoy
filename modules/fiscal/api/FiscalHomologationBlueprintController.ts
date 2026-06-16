import { Request, Response } from 'express';
import { FiscalHomologationEnvironmentInventory } from '../homologation/FiscalHomologationEnvironmentInventory';
import { FiscalHomologationIsolationPlan } from '../homologation/FiscalHomologationIsolationPlan';
import { FiscalHomologationCertificatePlan } from '../homologation/FiscalHomologationCertificatePlan';
import { FiscalHomologationXmlPlan } from '../homologation/FiscalHomologationXmlPlan';
import { FiscalHomologationDanfePlan } from '../homologation/FiscalHomologationDanfePlan';
import { FiscalHomologationRunbook } from '../homologation/FiscalHomologationRunbook';
import { FiscalHomologationRiskRegister } from '../homologation/FiscalHomologationRiskRegister';
import { FiscalHomologationEvaluationService } from '../homologation/FiscalHomologationEvaluationService';
import { FiscalHomologationHandoffService } from '../homologation/FiscalHomologationHandoffService';
import { FiscalHomologationReportService } from '../homologation/FiscalHomologationReportService';
import { FiscalHomologationAuditService } from '../homologation/FiscalHomologationAuditService';

function extractContext(req: Request) {
   const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
   const userId = (req as any).user?.id || (req as any).session?.user_id || 'system';
   return { companyId, userId, endpoint: req.path };
}

export class FiscalHomologationBlueprintController {
  public static async getEnvironments(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalHomologationAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_ENVIRONMENTS' });

      res.json({
        environments: FiscalHomologationEnvironmentInventory.getEnvironments(),
        readOnly: true, governanceOnly: true, planningOnly: true, simulationOnly: true, activationBlocked: true, blueprintOnly: true, runbookPlanningOnly: true
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getIsolation(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalHomologationAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_ISOLATION_PLAN' });

      res.json({
        isolationPlan: FiscalHomologationIsolationPlan.getIsolationPlans(),
        readOnly: true, governanceOnly: true, planningOnly: true, simulationOnly: true, activationBlocked: true, blueprintOnly: true, runbookPlanningOnly: true
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getCertificates(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalHomologationAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_CERTIFICATE_PLAN' });

      res.json({
        certificatePlan: FiscalHomologationCertificatePlan.getCertificatePlans(),
        readOnly: true, governanceOnly: true, planningOnly: true, simulationOnly: true, activationBlocked: true, blueprintOnly: true, runbookPlanningOnly: true
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getXml(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalHomologationAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_XML_PLAN' });

      res.json({
        xmlPlan: FiscalHomologationXmlPlan.getXmlPlans(),
        readOnly: true, governanceOnly: true, planningOnly: true, simulationOnly: true, activationBlocked: true, blueprintOnly: true, runbookPlanningOnly: true
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getDanfe(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalHomologationAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_DANFE_PLAN' });

      res.json({
        danfePlan: FiscalHomologationDanfePlan.getDanfePlans(),
        readOnly: true, governanceOnly: true, planningOnly: true, simulationOnly: true, activationBlocked: true, blueprintOnly: true, runbookPlanningOnly: true
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getRunbook(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalHomologationAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_RUNBOOK' });

      res.json({
        runbook: FiscalHomologationRunbook.getRunbook(),
        readOnly: true, governanceOnly: true, planningOnly: true, simulationOnly: true, activationBlocked: true, blueprintOnly: true, runbookPlanningOnly: true
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getRisks(req: Request, res: Response) {
     try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalHomologationAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_RISKS' });

      res.json({
        risks: FiscalHomologationRiskRegister.getRisks(),
        readOnly: true, governanceOnly: true, planningOnly: true, simulationOnly: true, activationBlocked: true, blueprintOnly: true, runbookPlanningOnly: true
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

      const result = await FiscalHomologationEvaluationService.evaluate(input);

      await FiscalHomologationAuditService.logAdministrativeAction({ 
          companyId, userId, endpoint, action: 'EVALUATE_HOMOLOGATION_BLUEPRINT', details: { input, result } 
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

      await FiscalHomologationAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_HANDOFF' });

      res.json(FiscalHomologationHandoffService.generateHandoff());
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getFinalReport(req: Request, res: Response) {
     try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalHomologationAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_FINAL_REPORT' });

      res.json(FiscalHomologationReportService.getFinalReport());
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getAudit(req: Request, res: Response) {
     try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalHomologationAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_AUDIT' });

      res.json({
         logs: FiscalHomologationAuditService.getLogs(),
         readOnly: true, governanceOnly: true, planningOnly: true, simulationOnly: true, activationBlocked: true, blueprintOnly: true, runbookPlanningOnly: true
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
      blueprintOnly: true,
      runbookPlanningOnly: true,
      activationBlocked: true,
      homologationExecuted: false,
      sefazCalled: false,
      xmlSigned: false,
      pdfGenerated: false,
      certificateLoaded: false,
      releaseActivated: false,
      canaryActivated: false,
      productionV2Activated: false,
      trafficChanged: false,
      payloadIncluded: false,
      sensitiveDataIncluded: false
    });
  }
}
