import { Request, Response } from 'express';
import { FiscalRealAuthorizationClosureInventory } from '../dedicated-homologation/real-authorization/closure/FiscalRealAuthorizationClosureInventory';
import { FiscalRealAuthorizationFinalChecklist } from '../dedicated-homologation/real-authorization/closure/FiscalRealAuthorizationFinalChecklist';
import { FiscalRealAuthorizationEvidencePackageService } from '../dedicated-homologation/real-authorization/closure/FiscalRealAuthorizationEvidencePackageService';
import { FiscalRealAuthorizationFinalBlockerRegister } from '../dedicated-homologation/real-authorization/closure/FiscalRealAuthorizationFinalBlockerRegister';
import { FiscalRealAuthorizationFinalRiskRegister } from '../dedicated-homologation/real-authorization/closure/FiscalRealAuthorizationFinalRiskRegister';
import { FiscalRealAuthorizationHandoffService } from '../dedicated-homologation/real-authorization/closure/FiscalRealAuthorizationHandoffService';
import { FiscalRealAuthorizationClosureReportService } from '../dedicated-homologation/real-authorization/closure/FiscalRealAuthorizationClosureReportService';
import { FiscalRealAuthorizationClosureAuditService } from '../dedicated-homologation/real-authorization/closure/FiscalRealAuthorizationClosureAuditService';

function extractContext(req: Request) {
   const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
   const userId = (req as any).user?.id || (req as any).session?.user_id || 'system';
   return { companyId, userId, endpoint: req.path };
}

export class FiscalRealAuthorizationClosureController {

  public static async getInventory(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealAuthorizationClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_CLOSURE_INVENTORY' });
        res.json({ inventory: FiscalRealAuthorizationClosureInventory.getInventory(), readOnly: true, authorizationTransitionClosureOnly: true, authorizationClosureOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getFinalChecklist(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealAuthorizationClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_FINAL_CHECKLIST' });
        res.json({ checklist: FiscalRealAuthorizationFinalChecklist.getChecklist(), readOnly: true, authorizationTransitionClosureOnly: true, authorizationClosureOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getEvidencePackage(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealAuthorizationClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_EVIDENCE_PACKAGE' });
        res.json(FiscalRealAuthorizationEvidencePackageService.getEvidencePackage());
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getBlockers(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealAuthorizationClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_BLOCKERS' });
        res.json({ blockers: FiscalRealAuthorizationFinalBlockerRegister.getBlockers(), readOnly: true, authorizationTransitionClosureOnly: true, authorizationClosureOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getRisks(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealAuthorizationClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_RISKS' });
        res.json({ risks: FiscalRealAuthorizationFinalRiskRegister.getRisks(), readOnly: true, authorizationTransitionClosureOnly: true, authorizationClosureOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getHandoff(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealAuthorizationClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_HANDOFF' });
        res.json({ handoff: FiscalRealAuthorizationHandoffService.getHandoff(), readOnly: true, authorizationTransitionClosureOnly: true, authorizationClosureOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getReport(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealAuthorizationClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_REPORT' });
        res.json(FiscalRealAuthorizationClosureReportService.getReport());
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getAudit(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealAuthorizationClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_AUDIT' });
        res.json({ logs: FiscalRealAuthorizationClosureAuditService.getLogs(), readOnly: true, authorizationTransitionClosureOnly: true, authorizationClosureOnly: true, simulationOnly: true, governanceOnly: true, activationBlocked: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getHealth(req: Request, res: Response) {
    res.json({
        status: 'UP',
        readOnly: true,
        authorizationTransitionClosureOnly: true,
        authorizationClosureOnly: true,
        mockEnvironmentOnly: true,
        governanceOnly: true,
        simulationOnly: true,
        activationBlocked: true,
        authorizationRequestPersisted: false,
        authorizationEnvelopeExecutable: false,
        authorizationEnvelopeSigned: false,
        authorizationEnvelopePersisted: false,
        dualApprovalCompleted: false,
        realApprovalGranted: false,
        realAuthorizationGranted: false,
        approvalRecordPersisted: false,
        approverANotifiedExternally: false,
        approverBNotifiedExternally: false,
        sameUserApprovalBlocked: true,
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
        approvedForAuthorizationClosure: true,
        approvedForAuthorizationTransitionClosure: true,
        approvedForRealDualApprovalCompletion: false,
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
