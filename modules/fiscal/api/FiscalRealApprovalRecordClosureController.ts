import { Request, Response } from 'express';
import { FiscalRealApprovalRecordClosureInventory } from '../dedicated-homologation/real-approval-records/closure/FiscalRealApprovalRecordClosureInventory';
import { FiscalRealApprovalRecordFinalChecklist } from '../dedicated-homologation/real-approval-records/closure/FiscalRealApprovalRecordFinalChecklist';
import { FiscalRealApprovalRecordEvidencePackageService } from '../dedicated-homologation/real-approval-records/closure/FiscalRealApprovalRecordEvidencePackageService';
import { FiscalRealApprovalRecordFinalBlockerRegister } from '../dedicated-homologation/real-approval-records/closure/FiscalRealApprovalRecordFinalBlockerRegister';
import { FiscalRealApprovalRecordFinalRiskRegister } from '../dedicated-homologation/real-approval-records/closure/FiscalRealApprovalRecordFinalRiskRegister';
import { FiscalRealApprovalRecordHandoffService } from '../dedicated-homologation/real-approval-records/closure/FiscalRealApprovalRecordHandoffService';
import { FiscalRealApprovalRecordClosureReportService } from '../dedicated-homologation/real-approval-records/closure/FiscalRealApprovalRecordClosureReportService';
import { FiscalRealApprovalRecordClosureAuditService } from '../dedicated-homologation/real-approval-records/closure/FiscalRealApprovalRecordClosureAuditService';

function extractContext(req: Request) {
   const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
   const userId = (req as any).user?.id || (req as any).session?.user_id || 'system';
   return { companyId, userId, endpoint: req.path };
}

export class FiscalRealApprovalRecordClosureController {
  public static async getInventory(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalRecordClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_INVENTORY' });
        res.json(FiscalRealApprovalRecordClosureInventory.generateInventory());
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getFinalChecklist(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalRecordClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_CHECKLIST' });
        res.json(FiscalRealApprovalRecordFinalChecklist.getChecklist());
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getEvidencePackage(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalRecordClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_EVIDENCE_PACKAGE' });
        res.json(FiscalRealApprovalRecordEvidencePackageService.generate());
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getBlockers(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalRecordClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_BLOCKERS' });
        res.json({ blockers: FiscalRealApprovalRecordFinalBlockerRegister.getBlockers(), readOnly: true, approvalRecordClosureOnly: true, evidencePackageOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getRisks(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalRecordClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_RISKS' });
        res.json({ risks: FiscalRealApprovalRecordFinalRiskRegister.getRisks(), readOnly: true, approvalRecordClosureOnly: true, evidencePackageOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getHandoff(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalRecordClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_HANDOFF' });
        res.json(FiscalRealApprovalRecordHandoffService.getHandoff());
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getReport(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalRecordClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_REPORT' });
        res.json(FiscalRealApprovalRecordClosureReportService.getReport());
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getAudit(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalRecordClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_AUDIT' });
        res.json({ logs: FiscalRealApprovalRecordClosureAuditService.getLogs(), readOnly: true, approvalRecordClosureOnly: true, evidencePackageOnly: true, simulationOnly: true, governanceOnly: true, activationBlocked: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getHealth(req: Request, res: Response) {
    res.json({
        status: 'UP',
        readOnly: true,
        approvalRecordClosureOnly: true,
        evidencePackageOnly: true,
        approvalRecordBlueprintOnly: true,
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
        signatureEnvelopeExecutable: false,
        signatureEnvelopeSigned: false,
        signatureEnvelopePersisted: false,
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
        approvedForApprovalRecordClosure: true,
        approvedForApprovalRecordEvidencePackage: true,
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
