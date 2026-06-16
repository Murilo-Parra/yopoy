import { Request, Response } from 'express';
import { FiscalRealChangeWindowCalendar } from '../dedicated-homologation/real-provisioning/change-window/FiscalRealChangeWindowCalendar';
import { FiscalRealPreExecutionChecklist } from '../dedicated-homologation/real-provisioning/change-window/FiscalRealPreExecutionChecklist';
import { FiscalRealFreezeUnfreezeMatrix } from '../dedicated-homologation/real-provisioning/change-window/FiscalRealFreezeUnfreezeMatrix';
import { FiscalRealCommunicationPlan } from '../dedicated-homologation/real-provisioning/change-window/FiscalRealCommunicationPlan';
import { FiscalRealOperationalRollbackPlan } from '../dedicated-homologation/real-provisioning/change-window/FiscalRealOperationalRollbackPlan';
import { FiscalRealExecutionReadinessMatrix } from '../dedicated-homologation/real-provisioning/change-window/FiscalRealExecutionReadinessMatrix';
import { FiscalRealChangeWindowPolicy } from '../dedicated-homologation/real-provisioning/change-window/FiscalRealChangeWindowPolicy';
import { FiscalRealChangeWindowBlockerRegister } from '../dedicated-homologation/real-provisioning/change-window/FiscalRealChangeWindowBlockerRegister';
import { FiscalRealChangeWindowRiskRegister } from '../dedicated-homologation/real-provisioning/change-window/FiscalRealChangeWindowRiskRegister';
import { FiscalRealChangeWindowEvaluationService } from '../dedicated-homologation/real-provisioning/change-window/FiscalRealChangeWindowEvaluationService';
import { FiscalRealChangeWindowDecisionService } from '../dedicated-homologation/real-provisioning/change-window/FiscalRealChangeWindowDecisionService';
import { FiscalRealChangeWindowReportService } from '../dedicated-homologation/real-provisioning/change-window/FiscalRealChangeWindowReportService';
import { FiscalRealChangeWindowAuditService } from '../dedicated-homologation/real-provisioning/change-window/FiscalRealChangeWindowAuditService';

function extractContext(req: Request) {
   const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
   const userId = (req as any).user?.id || (req as any).session?.user_id || 'system';
   return { companyId, userId, endpoint: req.path };
}

export class FiscalRealChangeWindowController {

  public static async getPolicy(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealChangeWindowAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_WINDOW_POLICY' });
        res.json({ message: FiscalRealChangeWindowPolicy.getMandatoryMessage(), readOnly: true, changeWindowPlanningOnly: true, executionReadinessOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getCalendar(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealChangeWindowAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_CALENDAR' });
        res.json({ calendar: FiscalRealChangeWindowCalendar.getCalendar(), readOnly: true, changeWindowPlanningOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getPreExecutionChecklist(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealChangeWindowAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_PRE_EXECUTION_CHECKLIST' });
        res.json({ checklist: FiscalRealPreExecutionChecklist.getChecklist(), readOnly: true, changeWindowPlanningOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getFreezeUnfreeze(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealChangeWindowAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_FREEZE_UNFREEZE' });
        res.json({ matrix: FiscalRealFreezeUnfreezeMatrix.getMatrix(), readOnly: true, changeWindowPlanningOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getCommunicationPlan(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealChangeWindowAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_COMMUNICATION_PLAN' });
        res.json({ plan: FiscalRealCommunicationPlan.getPlan(), readOnly: true, changeWindowPlanningOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }
  
  public static async getRollbackPlan(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealChangeWindowAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_ROLLBACK_PLAN' });
        res.json({ plan: FiscalRealOperationalRollbackPlan.getPlan(), readOnly: true, changeWindowPlanningOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getReadinessMatrix(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealChangeWindowAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_READINESS_MATRIX' });
        res.json({ matrix: FiscalRealExecutionReadinessMatrix.getMatrix(), readOnly: true, executionReadinessOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getBlockers(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealChangeWindowAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_WINDOW_BLOCKERS' });
        res.json({ blockers: FiscalRealChangeWindowBlockerRegister.getBlockers(), readOnly: true, changeWindowPlanningOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getRisks(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealChangeWindowAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_WINDOW_RISKS' });
        res.json({ risks: FiscalRealChangeWindowRiskRegister.getRisks(), readOnly: true, changeWindowPlanningOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async evaluate(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealChangeWindowAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'EVALUATE_WINDOW' });
        res.json(FiscalRealChangeWindowEvaluationService.evaluate({ ...req.body, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async simulateDecision(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealChangeWindowAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'SIMULATE_WINDOW_DECISION' });
        res.json(FiscalRealChangeWindowDecisionService.simulateDecision({ ...req.body, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getReport(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealChangeWindowAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_WINDOW_REPORT' });
        res.json(FiscalRealChangeWindowReportService.getReport());
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getAudit(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealChangeWindowAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_WINDOW_AUDIT' });
        res.json({ logs: FiscalRealChangeWindowAuditService.getLogs(), readOnly: true, changeWindowPlanningOnly: true, executionReadinessOnly: true, simulationOnly: true, activationBlocked: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getHealth(req: Request, res: Response) {
    res.json({
        status: 'UP',
        readOnly: true,
        changeWindowPlanningOnly: true,
        executionReadinessOnly: true,
        mockEnvironmentOnly: true,
        governanceOnly: true,
        simulationOnly: true,
        activationBlocked: true,
        realChangeWindowOpened: false,
        realExecutionStarted: false,
        iacApplyApproved: false,
        iacApplied: false,
        terraformApplied: false,
        pulumiApplied: false,
        cloudFormationDeployed: false,
        realResourceCreated: false,
        infrastructureProvisioned: false,
        environmentActivated: false,
        networkApplied: false,
        databaseProvisioned: false,
        realDatabaseConnected: false,
        vaultProvisioned: false,
        secretWritten: false,
        secretLoaded: false,
        certificateLoaded: false,
        realPfxRead: false,
        certificatePasswordRead: false,
        realSefazCalled: false,
        endpointCalled: false,
        xmlSigned: false,
        realXmlSigned: false,
        pdfGenerated: false,
        realPdfGenerated: false,
        observabilityActivated: false,
        rollbackInstalled: false,
        killSwitchInstalled: false,
        circuitBreakerInstalled: false,
        releaseActivated: false,
        canaryActivated: false,
        productionV2Activated: false,
        trafficChanged: false,
        workersCreated: false,
        schedulersCreated: false,
        payloadIncluded: false,
        sensitiveDataIncluded: false,
        approvedForChangeWindowClosure: true,
        approvedForRealChangeWindow: false,
        approvedForExecutionStart: false,
        approvedForIacApply: false,
        approvedForInfrastructureProvisioning: false,
        approvedForEnvironmentActivation: false,
        approvedForRealHomologation: false,
        approvedForSefazConnection: false,
        approvedForCertificateLoad: false,
        approvedForXmlSigning: false,
        approvedForPdfGeneration: false,
        approvedForProductionV2: false
    });
  }
}
