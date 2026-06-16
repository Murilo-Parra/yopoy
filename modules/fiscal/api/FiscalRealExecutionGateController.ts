import { Request, Response } from 'express';
import { FiscalRealExecutionGatePolicy } from '../dedicated-homologation/real-execution-gate/FiscalRealExecutionGatePolicy';
import { FiscalRealExecutionPreLockChecklist } from '../dedicated-homologation/real-execution-gate/FiscalRealExecutionPreLockChecklist';
import { FiscalRealExecutionAuthorizationState } from '../dedicated-homologation/real-execution-gate/FiscalRealExecutionAuthorizationState';
import { FiscalRealExecutionGateBlockerRegister } from '../dedicated-homologation/real-execution-gate/FiscalRealExecutionGateBlockerRegister';
import { FiscalRealExecutionGateRiskRegister } from '../dedicated-homologation/real-execution-gate/FiscalRealExecutionGateRiskRegister';
import { FiscalRealExecutionGateEvaluationService } from '../dedicated-homologation/real-execution-gate/FiscalRealExecutionGateEvaluationService';
import { FiscalRealExecutionGateDecisionService } from '../dedicated-homologation/real-execution-gate/FiscalRealExecutionGateDecisionService';
import { FiscalRealExecutionGateReportService } from '../dedicated-homologation/real-execution-gate/FiscalRealExecutionGateReportService';
import { FiscalRealExecutionGateAuditService } from '../dedicated-homologation/real-execution-gate/FiscalRealExecutionGateAuditService';

function extractContext(req: Request) {
   const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
   const userId = (req as any).user?.id || (req as any).session?.user_id || 'system';
   return { companyId, userId, endpoint: req.path };
}

export class FiscalRealExecutionGateController {

  public static async getPolicy(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealExecutionGateAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_GATE_POLICY' });
        res.json({ message: FiscalRealExecutionGatePolicy.enforce({})?.blockers?.[0] || 'O Módulo 13.1 criou apenas o Controlled Real Provisioning Execution Gate em modo read-only/execution-gate-only/pre-execution-lock-only/governance-only/simulation-only. O gate permanece bloqueado. Autorização real, abertura real de janela, execução real, Terraform apply, Pulumi up, deploy real, infraestrutura real, banco real, vault real, secrets reais, certificado real, SEFAZ real, XML assinado, PDF real, Release real, Canary real, Produção V2 e tráfego produtivo permanecem bloqueados.', readOnly: true, executionGateOnly: true, preExecutionLockOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getPreLockChecklist(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealExecutionGateAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_PRE_LOCK_CHECKLIST' });
        res.json({ checklist: FiscalRealExecutionPreLockChecklist.getChecklist(), readOnly: true, executionGateOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getAuthorizationState(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealExecutionGateAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_AUTHORIZATION_STATE' });
        res.json({ state: FiscalRealExecutionAuthorizationState.getState(), readOnly: true, executionGateOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getBlockers(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealExecutionGateAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_GATE_BLOCKERS' });
        res.json({ blockers: FiscalRealExecutionGateBlockerRegister.getBlockers(), readOnly: true, executionGateOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getRisks(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealExecutionGateAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_GATE_RISKS' });
        res.json({ risks: FiscalRealExecutionGateRiskRegister.getRisks(), readOnly: true, executionGateOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async evaluate(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealExecutionGateAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'EVALUATE_GATE' });
        res.json(FiscalRealExecutionGateEvaluationService.evaluate({ ...req.body, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async simulateUnlockRequest(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealExecutionGateAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'SIMULATE_UNLOCK_REQUEST' });
        res.json(FiscalRealExecutionGateDecisionService.simulateDecision({ ...req.body, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getReport(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealExecutionGateAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_GATE_REPORT' });
        res.json(FiscalRealExecutionGateReportService.getReport());
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getAudit(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealExecutionGateAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_GATE_AUDIT' });
        res.json({ logs: FiscalRealExecutionGateAuditService.getLogs(), readOnly: true, executionGateOnly: true, simulationOnly: true, preExecutionLockOnly: true, activationBlocked: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getHealth(req: Request, res: Response) {
    res.json({
        status: 'UP',
        readOnly: true,
        executionGateOnly: true,
        preExecutionLockOnly: true,
        mockEnvironmentOnly: true,
        governanceOnly: true,
        simulationOnly: true,
        activationBlocked: true,
        realExecutionGateCreated: true,
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
        approvedForExecutionGateClosure: true,
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
