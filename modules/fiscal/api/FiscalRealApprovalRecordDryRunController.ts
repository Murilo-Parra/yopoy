import { Request, Response } from 'express';
import { FiscalRealApprovalRecordDryRunPolicy } from '../dedicated-homologation/real-approval-records/dry-run/FiscalRealApprovalRecordDryRunPolicy';
import { FiscalRealApprovalRecordVersioningPlan } from '../dedicated-homologation/real-approval-records/dry-run/FiscalRealApprovalRecordVersioningPlan';
import { FiscalRealApprovalRecordDryRunBlockerRegister } from '../dedicated-homologation/real-approval-records/dry-run/FiscalRealApprovalRecordDryRunBlockerRegister';
import { FiscalRealApprovalRecordDryRunRiskRegister } from '../dedicated-homologation/real-approval-records/dry-run/FiscalRealApprovalRecordDryRunRiskRegister';
import { FiscalRealApprovalRecordIntegrityValidator } from '../dedicated-homologation/real-approval-records/dry-run/FiscalRealApprovalRecordIntegrityValidator';
import { FiscalRealApprovalRecordDryRunRepository } from '../dedicated-homologation/real-approval-records/dry-run/FiscalRealApprovalRecordDryRunRepository';
import { FiscalRealApprovalRecordAuditTrailSimulator } from '../dedicated-homologation/real-approval-records/dry-run/FiscalRealApprovalRecordAuditTrailSimulator';
import { FiscalRealApprovalRecordDryRunEvaluationService } from '../dedicated-homologation/real-approval-records/dry-run/FiscalRealApprovalRecordDryRunEvaluationService';
import { FiscalRealApprovalRecordDryRunDecisionService } from '../dedicated-homologation/real-approval-records/dry-run/FiscalRealApprovalRecordDryRunDecisionService';
import { FiscalRealApprovalRecordDryRunReportService } from '../dedicated-homologation/real-approval-records/dry-run/FiscalRealApprovalRecordDryRunReportService';
import { FiscalRealApprovalRecordDryRunAuditService } from '../dedicated-homologation/real-approval-records/dry-run/FiscalRealApprovalRecordDryRunAuditService';

function extractContext(req: Request) {
   const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
   const userId = (req as any).user?.id || (req as any).session?.user_id || 'system';
   return { companyId, userId, endpoint: req.path };
}

export class FiscalRealApprovalRecordDryRunController {

  public static async getPolicy(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalRecordDryRunAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_POLICY' });
        res.json({ message: FiscalRealApprovalRecordDryRunPolicy.enforce({})?.blockers?.[0] || 'Approval Record Dry-Run Persistence 16.2 é apenas simulação.', readOnly: true, dryRunPersistenceOnly: true, auditTrailSimulationOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getVersioningPlan(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalRecordDryRunAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_VERSIONING_PLAN' });
        res.json(FiscalRealApprovalRecordVersioningPlan.generate());
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getBlockers(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalRecordDryRunAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_BLOCKERS' });
        res.json({ blockers: FiscalRealApprovalRecordDryRunBlockerRegister.getBlockers(), readOnly: true, dryRunPersistenceOnly: true, auditTrailSimulationOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getRisks(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalRecordDryRunAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_RISKS' });
        res.json({ risks: FiscalRealApprovalRecordDryRunRiskRegister.getRisks(), readOnly: true, dryRunPersistenceOnly: true, auditTrailSimulationOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async validateIntegrity(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalRecordDryRunAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'VALIDATE_INTEGRITY' });
        res.json(FiscalRealApprovalRecordIntegrityValidator.validate({ ...req.body, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async simulatePersistence(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalRecordDryRunAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'SIMULATE_PERSISTENCE' });
        res.json(FiscalRealApprovalRecordDryRunRepository.simulateStore({ ...req.body, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async simulateAuditTrail(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalRecordDryRunAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'SIMULATE_AUDIT_TRAIL' });
        res.json(FiscalRealApprovalRecordAuditTrailSimulator.simulate({ ...req.body, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async evaluate(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalRecordDryRunAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'EVALUATE' });
        res.json(FiscalRealApprovalRecordDryRunEvaluationService.evaluate({ ...req.body, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async simulateDecision(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalRecordDryRunAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'SIMULATE_DECISION' });
        res.json(FiscalRealApprovalRecordDryRunDecisionService.simulateDecision({ ...req.body, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getReport(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalRecordDryRunAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_REPORT' });
        res.json(FiscalRealApprovalRecordDryRunReportService.getReport());
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getAudit(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalRecordDryRunAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_AUDIT' });
        res.json({ logs: FiscalRealApprovalRecordDryRunAuditService.getLogs(), readOnly: true, dryRunPersistenceOnly: true, auditTrailSimulationOnly: true, simulationOnly: true, governanceOnly: true, activationBlocked: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getHealth(req: Request, res: Response) {
    res.json({
        status: 'UP',
        readOnly: true,
        dryRunPersistenceOnly: true,
        auditTrailSimulationOnly: true,
        mockEnvironmentOnly: true,
        governanceOnly: true,
        simulationOnly: true,
        activationBlocked: true,
        approvalRecordDryRunStored: true,
        approvalRecordPersisted: false,
        approvalRecordSigned: false,
        approvalRecordExecutable: false,
        realApprovalRecordCreated: false,
        realApprovalGranted: false,
        realAuthorizationGranted: false,
        dualApprovalCompleted: false,
        schemaApplied: false,
        migrationExecuted: false,
        ddlExecuted: false,
        dmlExecuted: false,
        insertExecuted: false,
        updateExecuted: false,
        deleteExecuted: false,
        commitExecuted: false,
        realDatabaseConnected: false,
        realExecutionGateUnlocked: false,
        realExecutionAuthorized: false,
        realExecutionStarted: false,
        iacApplied: false,
        terraformApplied: false,
        pulumiApplied: false,
        cloudFormationDeployed: false,
        infrastructureProvisioned: false,
        certificateLoaded: false,
        realSefazCalled: false,
        xmlSigned: false,
        pdfGenerated: false,
        productionV2Activated: false,
        trafficChanged: false,
        workersCreated: false,
        schedulersCreated: false,
        payloadIncluded: false,
        sensitiveDataIncluded: false,
        approvedForDryRunPersistenceSimulation: true,
        approvedForAuditTrailSimulation: true,
        approvedForRealApprovalRecordPersistence: false,
        approvedForRealApprovalRecordSignature: false,
        approvedForRealAuthorizationGrant: false,
        approvedForRealExecutionAuthorization: false,
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
