import { Request, Response } from 'express';
import { FiscalRealUnlockPolicy } from '../dedicated-homologation/real-execution-gate/unlock/FiscalRealUnlockPolicy';
import { FiscalRealUnlockEligibilityChecklist } from '../dedicated-homologation/real-execution-gate/unlock/FiscalRealUnlockEligibilityChecklist';
import { FiscalRealDualApprovalMatrix } from '../dedicated-homologation/real-execution-gate/unlock/FiscalRealDualApprovalMatrix';
import { FiscalRealUnlockBlockerRegister } from '../dedicated-homologation/real-execution-gate/unlock/FiscalRealUnlockBlockerRegister';
import { FiscalRealUnlockRiskRegister } from '../dedicated-homologation/real-execution-gate/unlock/FiscalRealUnlockRiskRegister';
import { FiscalRealUnlockEvaluationService } from '../dedicated-homologation/real-execution-gate/unlock/FiscalRealUnlockEvaluationService';
import { FiscalRealUnlockDecisionService } from '../dedicated-homologation/real-execution-gate/unlock/FiscalRealUnlockDecisionService';
import { FiscalRealUnlockReportService } from '../dedicated-homologation/real-execution-gate/unlock/FiscalRealUnlockReportService';
import { FiscalRealUnlockAuditService } from '../dedicated-homologation/real-execution-gate/unlock/FiscalRealUnlockAuditService';

function extractContext(req: Request) {
   const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
   const userId = (req as any).user?.id || (req as any).session?.user_id || 'system';
   return { companyId, userId, endpoint: req.path };
}

export class FiscalRealUnlockController {

  public static async getPolicy(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealUnlockAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_UNLOCK_POLICY' });
        res.json({ message: FiscalRealUnlockPolicy.enforce({})?.blockers?.[0] || 'Real Execution Gate Unlock 13.2 é simulação administrativa de dupla aprovação. Destravamento real do gate, autorização real, abertura real de janela, execução real, Terraform apply, Pulumi up, deploy real, banco real, vault real, secrets reais, certificado real, SEFAZ real, XML real assinado, PDF real e Produção V2 permanecem bloqueados.', readOnly: true, unlockSimulationOnly: true, dualApprovalGateOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getEligibilityChecklist(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealUnlockAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_ELIGIBILITY_CHECKLIST' });
        res.json({ checklist: FiscalRealUnlockEligibilityChecklist.getChecklist(), readOnly: true, unlockSimulationOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getDualApprovalMatrix(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealUnlockAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_DUAL_APPROVAL_MATRIX' });
        res.json({ matrix: FiscalRealDualApprovalMatrix.getMatrix(), readOnly: true, unlockSimulationOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getBlockers(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealUnlockAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_UNLOCK_BLOCKERS' });
        res.json({ blockers: FiscalRealUnlockBlockerRegister.getBlockers(), readOnly: true, unlockSimulationOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getRisks(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealUnlockAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_UNLOCK_RISKS' });
        res.json({ risks: FiscalRealUnlockRiskRegister.getRisks(), readOnly: true, unlockSimulationOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async evaluate(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealUnlockAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'EVALUATE_UNLOCK' });
        res.json(FiscalRealUnlockEvaluationService.evaluate({ ...req.body, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async simulateDualApproval(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealUnlockAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'SIMULATE_DUAL_APPROVAL' });
        res.json(FiscalRealUnlockDecisionService.simulateDecision({ ...req.body, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getReport(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealUnlockAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_UNLOCK_REPORT' });
        res.json(FiscalRealUnlockReportService.getReport());
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getAudit(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealUnlockAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_UNLOCK_AUDIT' });
        res.json({ logs: FiscalRealUnlockAuditService.getLogs(), readOnly: true, unlockSimulationOnly: true, simulationOnly: true, dualApprovalGateOnly: true, activationBlocked: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getHealth(req: Request, res: Response) {
    res.json({
        status: 'UP',
        readOnly: true,
        unlockSimulationOnly: true,
        dualApprovalGateOnly: true,
        mockEnvironmentOnly: true,
        governanceOnly: true,
        simulationOnly: true,
        activationBlocked: true,
        realExecutionGateUnlocked: false,
        primaryApprovalSimulated: true,
        secondaryApprovalSimulated: true,
        dualApprovalSatisfiedForSimulation: true,
        dualApprovalSatisfiedForRealUnlock: false,
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
        approvedForUnlockSimulationClosure: true,
        approvedForGateUnlock: false,
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
