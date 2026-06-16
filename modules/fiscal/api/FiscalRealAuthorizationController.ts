import { Request, Response } from 'express';
import { FiscalRealAuthorizationPolicy } from '../dedicated-homologation/real-authorization/FiscalRealAuthorizationPolicy';
import { FiscalRealAuthorizationBlockerRegister } from '../dedicated-homologation/real-authorization/FiscalRealAuthorizationBlockerRegister';
import { FiscalRealAuthorizationRiskRegister } from '../dedicated-homologation/real-authorization/FiscalRealAuthorizationRiskRegister';
import { FiscalRealAuthorizationRequestIntake } from '../dedicated-homologation/real-authorization/FiscalRealAuthorizationRequestIntake';
import { FiscalRealAuthorizationRequestValidator } from '../dedicated-homologation/real-authorization/FiscalRealAuthorizationRequestValidator';
import { FiscalRealAuthorizationEvaluationService } from '../dedicated-homologation/real-authorization/FiscalRealAuthorizationEvaluationService';
import { FiscalRealAuthorizationDecisionService } from '../dedicated-homologation/real-authorization/FiscalRealAuthorizationDecisionService';
import { FiscalRealNonExecutableApprovalEnvelope } from '../dedicated-homologation/real-authorization/FiscalRealNonExecutableApprovalEnvelope';
import { FiscalRealAuthorizationReportService } from '../dedicated-homologation/real-authorization/FiscalRealAuthorizationReportService';
import { FiscalRealAuthorizationAuditService } from '../dedicated-homologation/real-authorization/FiscalRealAuthorizationAuditService';

function extractContext(req: Request) {
   const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
   const userId = (req as any).user?.id || (req as any).session?.user_id || 'system';
   return { companyId, userId, endpoint: req.path };
}

export class FiscalRealAuthorizationController {

  public static async getPolicy(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealAuthorizationAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_AUTHORIZATION_POLICY' });
        res.json({ message: FiscalRealAuthorizationPolicy.enforce({})?.blockers?.[0] || 'Real Authorization Request Intake 15.1 é apenas intake administrativo e envelope de aprovação não executável. Nenhuma autorização real foi concedida. Gate unlock real, autorização real, execução real, Terraform apply, Pulumi up, deploy real, banco real, vault real, secrets reais, certificado real, SEFAZ real, XML assinado, PDF real e Produção V2 permanecem bloqueados.', readOnly: true, authorizationRequestIntakeOnly: true, nonExecutableApprovalEnvelopeOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getBlockers(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealAuthorizationAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_AUTHORIZATION_BLOCKERS' });
        res.json({ blockers: FiscalRealAuthorizationBlockerRegister.getBlockers(), readOnly: true, authorizationRequestIntakeOnly: true, nonExecutableApprovalEnvelopeOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getRisks(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealAuthorizationAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_AUTHORIZATION_RISKS' });
        res.json({ risks: FiscalRealAuthorizationRiskRegister.getRisks(), readOnly: true, authorizationRequestIntakeOnly: true, nonExecutableApprovalEnvelopeOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async intake(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealAuthorizationAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'INTAKE_AUTHORIZATION_REQUEST' });
        res.json(FiscalRealAuthorizationRequestIntake.processIntake({ ...req.body, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async validateRequest(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealAuthorizationAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'VALIDATE_AUTHORIZATION_REQUEST' });
        res.json(FiscalRealAuthorizationRequestValidator.validate({ ...req.body, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async evaluate(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealAuthorizationAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'EVALUATE_AUTHORIZATION' });
        res.json(FiscalRealAuthorizationEvaluationService.evaluate({ ...req.body, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async simulateDecision(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealAuthorizationAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'SIMULATE_AUTHORIZATION_DECISION' });
        res.json(FiscalRealAuthorizationDecisionService.simulateDecision({ ...req.body, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getNonExecutableEnvelope(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealAuthorizationAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_APPROVAL_ENVELOPE' });
        res.json({ envelope: FiscalRealNonExecutableApprovalEnvelope.getEnvelope() });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getReport(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealAuthorizationAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_AUTHORIZATION_REPORT' });
        res.json(FiscalRealAuthorizationReportService.getReport());
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getAudit(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealAuthorizationAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_AUTHORIZATION_AUDIT' });
        res.json({ logs: FiscalRealAuthorizationAuditService.getLogs(), readOnly: true, authorizationRequestIntakeOnly: true, nonExecutableApprovalEnvelopeOnly: true, simulationOnly: true, governanceOnly: true, activationBlocked: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getHealth(req: Request, res: Response) {
    res.json({
        status: 'UP',
        readOnly: true,
        authorizationRequestIntakeOnly: true,
        nonExecutableApprovalEnvelopeOnly: true,
        mockEnvironmentOnly: true,
        governanceOnly: true,
        simulationOnly: true,
        activationBlocked: true,
        authorizationRequestPersisted: false,
        authorizationEnvelopeExecutable: false,
        authorizationEnvelopeSigned: false,
        authorizationEnvelopePersisted: false,
        realAuthorizationGranted: false,
        dualApprovalCompleted: false,
        realCommandIncluded: false,
        executableCommandIncluded: false,
        shellCommandIncluded: false,
        manifestExecutable: false,
        manifestSigned: false,
        manifestPersisted: false,
        realExecutionGateUnlocked: false,
        realExecutionAuthorized: false,
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
        approvedForAuthorizationRequestIntake: true,
        approvedForNonExecutableEnvelope: true,
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
