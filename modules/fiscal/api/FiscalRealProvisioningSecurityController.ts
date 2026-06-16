import { Request, Response } from 'express';
import { FiscalRealSecurityReviewChecklist } from '../dedicated-homologation/real-provisioning/security/FiscalRealSecurityReviewChecklist';
import { FiscalRealSecurityApprovalMatrix } from '../dedicated-homologation/real-provisioning/security/FiscalRealSecurityApprovalMatrix';
import { FiscalRealSegregationOfDutiesMatrix } from '../dedicated-homologation/real-provisioning/security/FiscalRealSegregationOfDutiesMatrix';
import { FiscalRealSecurityPolicy } from '../dedicated-homologation/real-provisioning/security/FiscalRealSecurityPolicy';
import { FiscalRealSecurityBlockerRegister } from '../dedicated-homologation/real-provisioning/security/FiscalRealSecurityBlockerRegister';
import { FiscalRealSecurityRiskRegister } from '../dedicated-homologation/real-provisioning/security/FiscalRealSecurityRiskRegister';
import { FiscalRealSecurityEvaluationService } from '../dedicated-homologation/real-provisioning/security/FiscalRealSecurityEvaluationService';
import { FiscalRealSecurityDecisionService } from '../dedicated-homologation/real-provisioning/security/FiscalRealSecurityDecisionService';
import { FiscalRealSecurityReportService } from '../dedicated-homologation/real-provisioning/security/FiscalRealSecurityReportService';
import { FiscalRealSecurityAuditService } from '../dedicated-homologation/real-provisioning/security/FiscalRealSecurityAuditService';

function extractContext(req: Request) {
   const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
   const userId = (req as any).user?.id || (req as any).session?.user_id || 'system';
   return { companyId, userId, endpoint: req.path };
}

export class FiscalRealProvisioningSecurityController {

  public static async getPolicy(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealSecurityAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_SECURITY_POLICY' });
        res.json({ message: FiscalRealSecurityPolicy.getMandatoryMessage(), readOnly: true, securityReviewOnly: true, approvalWorkflowOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getChecklist(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealSecurityAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_SECURITY_CHECKLIST' });
        res.json({ checklist: FiscalRealSecurityReviewChecklist.getChecklist(), readOnly: true, securityReviewOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getApprovalMatrix(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealSecurityAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_APPROVAL_MATRIX' });
        res.json({ matrix: FiscalRealSecurityApprovalMatrix.getMatrix(), readOnly: true, securityReviewOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getSegregationOfDuties(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealSecurityAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_SEGREGATION_MATRIX' });
        res.json({ matrix: FiscalRealSegregationOfDutiesMatrix.getMatrix(), readOnly: true, securityReviewOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getBlockers(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealSecurityAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_SECURITY_BLOCKERS' });
        res.json({ blockers: FiscalRealSecurityBlockerRegister.getBlockers(), readOnly: true, securityReviewOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getRisks(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealSecurityAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_SECURITY_RISKS' });
        res.json({ risks: FiscalRealSecurityRiskRegister.getRisks(), readOnly: true, securityReviewOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async evaluate(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealSecurityAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'EVALUATE_SECURITY' });
        res.json(FiscalRealSecurityEvaluationService.evaluate({ ...req.body, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async simulateApproval(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealSecurityAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'SIMULATE_APPROVAL' });
        res.json(FiscalRealSecurityDecisionService.simulateDecision({ ...req.body, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getReport(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealSecurityAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_SECURITY_REPORT' });
        res.json(FiscalRealSecurityReportService.getReport());
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getAudit(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealSecurityAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_SECURITY_AUDIT' });
        res.json({ logs: FiscalRealSecurityAuditService.getLogs(), readOnly: true, securityReviewOnly: true, approvalWorkflowOnly: true, simulationOnly: true, activationBlocked: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getHealth(req: Request, res: Response) {
    res.json({
        status: 'UP',
        readOnly: true,
        securityReviewOnly: true,
        approvalWorkflowOnly: true,
        mockEnvironmentOnly: true,
        governanceOnly: true,
        simulationOnly: true,
        activationBlocked: true,
        iacApplyApproved: false,
        infrastructureProvisioningApproved: false,
        realEnvironmentApproved: false,
        realDatabaseApproved: false,
        realVaultApproved: false,
        realSecretWriteApproved: false,
        realCertificateLoadApproved: false,
        realSefazApproved: false,
        realXmlSigningApproved: false,
        realPdfGenerationApproved: false,
        productionV2Approved: false,
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
        approvedForSecurityReviewClosure: true,
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
