import { Request, Response } from 'express';
import { FiscalRealProvisioningClosureInventory } from '../dedicated-homologation/real-provisioning/closure/FiscalRealProvisioningClosureInventory';
import { FiscalRealProvisioningFinalChecklist } from '../dedicated-homologation/real-provisioning/closure/FiscalRealProvisioningFinalChecklist';
import { FiscalRealProvisioningEvidencePackageService } from '../dedicated-homologation/real-provisioning/closure/FiscalRealProvisioningEvidencePackageService';
import { FiscalRealExecutionAuthorizationWrapper } from '../dedicated-homologation/real-provisioning/closure/FiscalRealExecutionAuthorizationWrapper';
import { FiscalRealProvisioningFinalBlockerRegister } from '../dedicated-homologation/real-provisioning/closure/FiscalRealProvisioningFinalBlockerRegister';
import { FiscalRealProvisioningFinalRiskRegister } from '../dedicated-homologation/real-provisioning/closure/FiscalRealProvisioningFinalRiskRegister';
import { FiscalRealProvisioningHandoffService } from '../dedicated-homologation/real-provisioning/closure/FiscalRealProvisioningHandoffService';
import { FiscalRealProvisioningClosureReportService } from '../dedicated-homologation/real-provisioning/closure/FiscalRealProvisioningClosureReportService';
import { FiscalRealProvisioningClosureAuditService } from '../dedicated-homologation/real-provisioning/closure/FiscalRealProvisioningClosureAuditService';

function extractContext(req: Request) {
   const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
   const userId = (req as any).user?.id || (req as any).session?.user_id || 'system';
   return { companyId, userId, endpoint: req.path };
}

export class FiscalRealProvisioningClosureController {

  public static async getInventory(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealProvisioningClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_CLOSURE_INVENTORY' });
        res.json({ inventory: FiscalRealProvisioningClosureInventory.getInventory(), readOnly: true, dryRunClosureOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getFinalChecklist(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealProvisioningClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_FINAL_CHECKLIST' });
        res.json({ checklist: FiscalRealProvisioningFinalChecklist.getChecklist(), readOnly: true, dryRunClosureOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getEvidencePackage(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealProvisioningClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_EVIDENCE_PACKAGE' });
        res.json(FiscalRealProvisioningEvidencePackageService.getEvidence());
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getAuthorizationWrapper(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealProvisioningClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_WRAPPER' });
        res.json({ message: FiscalRealExecutionAuthorizationWrapper.getMessage(), readOnly: true, authorizationWrapperOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getBlockers(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealProvisioningClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_FINAL_BLOCKERS' });
        res.json({ blockers: FiscalRealProvisioningFinalBlockerRegister.getBlockers(), readOnly: true, dryRunClosureOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getRisks(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealProvisioningClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_FINAL_RISKS' });
        res.json({ risks: FiscalRealProvisioningFinalRiskRegister.getRisks(), readOnly: true, dryRunClosureOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async simulateAuthorization(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealProvisioningClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'SIMULATE_AUTHORIZATION' });
        res.json(FiscalRealExecutionAuthorizationWrapper.simulateAuthorization({ ...req.body, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getHandoff(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealProvisioningClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_HANDOFF' });
        res.json({ handoff: FiscalRealProvisioningHandoffService.getHandoff(), readOnly: true, dryRunClosureOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getReport(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealProvisioningClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_CLOSURE_REPORT' });
        res.json(FiscalRealProvisioningClosureReportService.getReport());
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getAudit(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealProvisioningClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_CLOSURE_AUDIT' });
        res.json({ logs: FiscalRealProvisioningClosureAuditService.getLogs(), readOnly: true, dryRunClosureOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getHealth(req: Request, res: Response) {
    res.json({
        status: 'UP',
        readOnly: true,
        dryRunClosureOnly: true,
        authorizationWrapperOnly: true,
        mockEnvironmentOnly: true,
        governanceOnly: true,
        simulationOnly: true,
        activationBlocked: true,
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
        approvedForRealProvisioningClosure: true,
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
