import { Request, Response } from 'express';
import { FiscalRealApprovalRecordPolicy } from '../dedicated-homologation/real-approval-records/FiscalRealApprovalRecordPolicy';
import { FiscalRealApprovalRecordBlueprint } from '../dedicated-homologation/real-approval-records/FiscalRealApprovalRecordBlueprint';
import { FiscalRealApprovalRecordSchemaPlan } from '../dedicated-homologation/real-approval-records/FiscalRealApprovalRecordSchemaPlan';
import { FiscalRealApprovalRecordBlockerRegister } from '../dedicated-homologation/real-approval-records/FiscalRealApprovalRecordBlockerRegister';
import { FiscalRealApprovalRecordRiskRegister } from '../dedicated-homologation/real-approval-records/FiscalRealApprovalRecordRiskRegister';
import { FiscalRealApprovalRecordValidator } from '../dedicated-homologation/real-approval-records/FiscalRealApprovalRecordValidator';
import { FiscalRealApprovalRecordEvaluationService } from '../dedicated-homologation/real-approval-records/FiscalRealApprovalRecordEvaluationService';
import { FiscalRealApprovalRecordDecisionService } from '../dedicated-homologation/real-approval-records/FiscalRealApprovalRecordDecisionService';
import { FiscalRealNonExecutableSignatureEnvelope } from '../dedicated-homologation/real-approval-records/FiscalRealNonExecutableSignatureEnvelope';
import { FiscalRealApprovalRecordReportService } from '../dedicated-homologation/real-approval-records/FiscalRealApprovalRecordReportService';
import { FiscalRealApprovalRecordAuditService } from '../dedicated-homologation/real-approval-records/FiscalRealApprovalRecordAuditService';

function extractContext(req: Request) {
   const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
   const userId = (req as any).user?.id || (req as any).session?.user_id || 'system';
   return { companyId, userId, endpoint: req.path };
}

export class FiscalRealApprovalRecordController {

  public static async getPolicy(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalRecordAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_POLICY' });
        res.json({ message: FiscalRealApprovalRecordPolicy.enforce({})?.blockers?.[0] || 'Approval Record Registry Blueprint 16.1 é apenas blueprint administrativo e envelope de assinatura não executável. Nenhum approval record real foi criado, persistido ou assinado. Nenhuma autorização real foi concedida. Gate unlock real, execução real, Terraform apply, etc. permanecem bloqueados.', readOnly: true, approvalRecordBlueprintOnly: true, nonExecutableSignatureEnvelopeOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getBlueprint(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalRecordAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_BLUEPRINT' });
        res.json(FiscalRealApprovalRecordBlueprint.generateBlueprint({ requestedBy: userId, companyId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getSchemaPlan(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalRecordAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_SCHEMA_PLAN' });
        res.json(FiscalRealApprovalRecordSchemaPlan.generatePlan());
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getBlockers(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalRecordAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_BLOCKERS' });
        res.json({ blockers: FiscalRealApprovalRecordBlockerRegister.getBlockers(), readOnly: true, approvalRecordBlueprintOnly: true, nonExecutableSignatureEnvelopeOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getRisks(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalRecordAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_RISKS' });
        res.json({ risks: FiscalRealApprovalRecordRiskRegister.getRisks(), readOnly: true, approvalRecordBlueprintOnly: true, nonExecutableSignatureEnvelopeOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async validate(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalRecordAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'VALIDATE' });
        res.json(FiscalRealApprovalRecordValidator.validate({ ...req.body, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async evaluate(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalRecordAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'EVALUATE' });
        res.json(FiscalRealApprovalRecordEvaluationService.evaluate({ ...req.body, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async simulateDecision(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalRecordAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'SIMULATE_DECISION' });
        res.json(FiscalRealApprovalRecordDecisionService.simulateDecision({ ...req.body, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getNonExecutableSignatureEnvelope(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalRecordAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_ENVELOPE' });
        res.json({ envelope: FiscalRealNonExecutableSignatureEnvelope.generate(), readOnly: true, approvalRecordBlueprintOnly: true, nonExecutableSignatureEnvelopeOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getReport(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalRecordAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_REPORT' });
        res.json(FiscalRealApprovalRecordReportService.getReport());
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getAudit(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealApprovalRecordAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_AUDIT' });
        res.json({ logs: FiscalRealApprovalRecordAuditService.getLogs(), readOnly: true, approvalRecordBlueprintOnly: true, nonExecutableSignatureEnvelopeOnly: true, simulationOnly: true, governanceOnly: true, activationBlocked: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getHealth(req: Request, res: Response) {
    res.json({
        status: 'UP',
        readOnly: true,
        approvalRecordBlueprintOnly: true,
        nonExecutableSignatureEnvelopeOnly: true,
        mockEnvironmentOnly: true,
        governanceOnly: true,
        simulationOnly: true,
        activationBlocked: true,
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
        realExecutionGateUnlocked: false,
        realExecutionAuthorized: false,
        realExecutionStarted: false,
        iacApplyApproved: false,
        iacApplied: false,
        terraformApplied: false,
        pulumiApplied: false,
        cloudFormationDeployed: false,
        realResourceCreated: false,
        infrastructureProvisioned: false,
        environmentActivated: false,
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
        approvedForApprovalRecordBlueprintClosure: true,
        approvedForNonExecutableSignatureEnvelope: true,
        approvedForRealApprovalRecordCreation: false,
        approvedForRealApprovalRecordPersistence: false,
        approvedForRealApprovalRecordSignature: false,
        approvedForRealAuthorizationGrant: false,
        approvedForRealExecutionAuthorization: false,
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
