import { Request, Response } from 'express';
import { FiscalRealDualApprovalPolicy } from '../dedicated-homologation/real-authorization/dual-approval/FiscalRealDualApprovalPolicy';
import { FiscalRealAuthorizationDualApprovalMatrix } from '../dedicated-homologation/real-authorization/dual-approval/FiscalRealDualApprovalMatrix';
import { FiscalRealSegregationOfDutiesReview } from '../dedicated-homologation/real-authorization/dual-approval/FiscalRealSegregationOfDutiesReview';
import { FiscalRealDualApprovalBlockerRegister } from '../dedicated-homologation/real-authorization/dual-approval/FiscalRealDualApprovalBlockerRegister';
import { FiscalRealDualApprovalRiskRegister } from '../dedicated-homologation/real-authorization/dual-approval/FiscalRealDualApprovalRiskRegister';
import { FiscalRealDualApprovalValidator } from '../dedicated-homologation/real-authorization/dual-approval/FiscalRealDualApprovalValidator';
import { FiscalRealDualApprovalSimulationService } from '../dedicated-homologation/real-authorization/dual-approval/FiscalRealDualApprovalSimulationService';
import { FiscalRealDualApprovalEvaluationService } from '../dedicated-homologation/real-authorization/dual-approval/FiscalRealDualApprovalEvaluationService';
import { FiscalRealDualApprovalDecisionService } from '../dedicated-homologation/real-authorization/dual-approval/FiscalRealDualApprovalDecisionService';
import { FiscalRealDualApprovalReportService } from '../dedicated-homologation/real-authorization/dual-approval/FiscalRealDualApprovalReportService';
import { FiscalRealDualApprovalAuditService } from '../dedicated-homologation/real-authorization/dual-approval/FiscalRealDualApprovalAuditService';

function extractContext(req: Request) {
   const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
   const userId = (req as any).user?.id || (req as any).session?.user_id || 'system';
   return { companyId, userId, endpoint: req.path };
}

export class FiscalRealDualApprovalController {

  public static async getPolicy(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealDualApprovalAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_POLICY' });
        res.json({ message: FiscalRealDualApprovalPolicy.enforce({})?.blockers?.[0] || 'Real Dual Approval Simulation 15.2 é apenas simulação administrativa e revisão de segregação de funções. Nenhuma dupla aprovação real foi concluída e nenhuma autorização real foi concedida. Gate unlock real, autorização real, execution real, Terraform apply, etc. permanecem bloqueados.', readOnly: true, dualApprovalSimulationOnly: true, segregationOfDutiesReviewOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getMatrix(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealDualApprovalAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_MATRIX' });
        res.json({ matrix: FiscalRealAuthorizationDualApprovalMatrix.getMatrix(), readOnly: true, dualApprovalSimulationOnly: true, segregationOfDutiesReviewOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getSodReview(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealDualApprovalAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_SOD_REVIEW' });
        res.json(FiscalRealSegregationOfDutiesReview.review(req.body || {}));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getBlockers(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealDualApprovalAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_BLOCKERS' });
        res.json({ blockers: FiscalRealDualApprovalBlockerRegister.getBlockers(), readOnly: true, dualApprovalSimulationOnly: true, segregationOfDutiesReviewOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getRisks(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealDualApprovalAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_RISKS' });
        res.json({ risks: FiscalRealDualApprovalRiskRegister.getRisks(), readOnly: true, dualApprovalSimulationOnly: true, segregationOfDutiesReviewOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async validate(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealDualApprovalAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'VALIDATE' });
        res.json(FiscalRealDualApprovalValidator.validate({ ...req.body, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async simulate(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealDualApprovalAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'SIMULATE' });
        res.json(FiscalRealDualApprovalSimulationService.simulate({ ...req.body, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async evaluate(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealDualApprovalAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'EVALUATE' });
        res.json(FiscalRealDualApprovalEvaluationService.evaluate({ ...req.body, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async simulateDecision(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealDualApprovalAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'SIMULATE_DECISION' });
        res.json(FiscalRealDualApprovalDecisionService.simulateDecision({ ...req.body, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getReport(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealDualApprovalAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_REPORT' });
        res.json(FiscalRealDualApprovalReportService.getReport());
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getAudit(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealDualApprovalAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_AUDIT' });
        res.json({ logs: FiscalRealDualApprovalAuditService.getLogs(), readOnly: true, dualApprovalSimulationOnly: true, segregationOfDutiesReviewOnly: true, simulationOnly: true, governanceOnly: true, activationBlocked: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getHealth(req: Request, res: Response) {
    res.json({
        status: 'UP',
        readOnly: true,
        dualApprovalSimulationOnly: true,
        segregationOfDutiesReviewOnly: true,
        mockEnvironmentOnly: true,
        governanceOnly: true,
        simulationOnly: true,
        activationBlocked: true,
        dualApprovalCompleted: false,
        realApprovalGranted: false,
        realAuthorizationGranted: false,
        approvalRecordPersisted: false,
        approverANotifiedExternally: false,
        approverBNotifiedExternally: false,
        sameUserApprovalBlocked: true,
        authorizationRequestPersisted: false,
        authorizationEnvelopeExecutable: false,
        authorizationEnvelopeSigned: false,
        authorizationEnvelopePersisted: false,
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
        approvedForDualApprovalSimulationClosure: true,
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
