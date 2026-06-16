import { Request, Response } from 'express';
import { FiscalRealActionPlanPolicy } from '../dedicated-homologation/real-execution-gate/action-plan/FiscalRealActionPlanPolicy';
import { FiscalRealAuthorizationPayloadBuilder } from '../dedicated-homologation/real-execution-gate/action-plan/FiscalRealAuthorizationPayloadBuilder';
import { FiscalRealLockedActionPlanCatalog } from '../dedicated-homologation/real-execution-gate/action-plan/FiscalRealLockedActionPlanCatalog';
import { FiscalRealForbiddenCommandMatrix } from '../dedicated-homologation/real-execution-gate/action-plan/FiscalRealForbiddenCommandMatrix';
import { FiscalRealActionPlanBlockerRegister } from '../dedicated-homologation/real-execution-gate/action-plan/FiscalRealActionPlanBlockerRegister';
import { FiscalRealActionPlanRiskRegister } from '../dedicated-homologation/real-execution-gate/action-plan/FiscalRealActionPlanRiskRegister';
import { FiscalRealActionPlanEvaluationService } from '../dedicated-homologation/real-execution-gate/action-plan/FiscalRealActionPlanEvaluationService';
import { FiscalRealActionPlanDecisionService } from '../dedicated-homologation/real-execution-gate/action-plan/FiscalRealActionPlanDecisionService';
import { FiscalRealActionPlanReportService } from '../dedicated-homologation/real-execution-gate/action-plan/FiscalRealActionPlanReportService';
import { FiscalRealActionPlanAuditService } from '../dedicated-homologation/real-execution-gate/action-plan/FiscalRealActionPlanAuditService';

function extractContext(req: Request) {
   const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
   const userId = (req as any).user?.id || (req as any).session?.user_id || 'system';
   return { companyId, userId, endpoint: req.path };
}

export class FiscalRealActionPlanController {

  public static async getPolicy(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealActionPlanAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_ACTION_PLAN_POLICY' });
        res.json({ message: FiscalRealActionPlanPolicy.enforce({})?.blockers?.[0] || 'Real Execution Action Plan 13.3 é payload administrativo e plano de ação bloqueado. O payload não é executável, não é assinado, não é persistido, e não autoriza execução real. Gate unlock real, autorização real, Terraform apply, Pulumi up, deploy real, banco real, vault real, secrets reais, certificado real, SEFAZ real, XML real assinado, PDF real e Produção V2 permanecem bloqueados.', readOnly: true, authorizationPayloadOnly: true, lockedActionPlanOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getPayloadTemplate(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealActionPlanAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_PAYLOAD_TEMPLATE' });
        res.json({ template: FiscalRealAuthorizationPayloadBuilder.getTemplate(), readOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getLockedCatalog(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealActionPlanAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_LOCKED_CATALOG' });
        res.json({ catalog: FiscalRealLockedActionPlanCatalog.getCatalog(), readOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getForbiddenCommands(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealActionPlanAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_FORBIDDEN_COMMANDS' });
        res.json({ matrix: FiscalRealForbiddenCommandMatrix.getMatrix(), readOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getBlockers(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealActionPlanAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_ACTION_PLAN_BLOCKERS' });
        res.json({ blockers: FiscalRealActionPlanBlockerRegister.getBlockers(), readOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getRisks(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealActionPlanAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_ACTION_PLAN_RISKS' });
        res.json({ risks: FiscalRealActionPlanRiskRegister.getRisks(), readOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async buildPayload(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealActionPlanAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'BUILD_PAYLOAD' });
        res.json(FiscalRealAuthorizationPayloadBuilder.buildPayload({ ...req.body, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async evaluate(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealActionPlanAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'EVALUATE_ACTION_PLAN' });
        res.json(FiscalRealActionPlanEvaluationService.evaluate({ ...req.body, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async simulateDecision(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealActionPlanAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'SIMULATE_ACTION_PLAN_DECISION' });
        res.json(FiscalRealActionPlanDecisionService.simulateDecision({ ...req.body, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getReport(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealActionPlanAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_ACTION_PLAN_REPORT' });
        res.json(FiscalRealActionPlanReportService.getReport());
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getAudit(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealActionPlanAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_ACTION_PLAN_AUDIT' });
        res.json({ logs: FiscalRealActionPlanAuditService.getLogs(), readOnly: true, authorizationPayloadOnly: true, lockedActionPlanOnly: true, simulationOnly: true, governanceOnly: true, activationBlocked: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getHealth(req: Request, res: Response) {
    res.json({
        status: 'UP',
        readOnly: true,
        authorizationPayloadOnly: true,
        lockedActionPlanOnly: true,
        mockEnvironmentOnly: true,
        governanceOnly: true,
        simulationOnly: true,
        activationBlocked: true,
        payloadExecutable: false,
        payloadSigned: false,
        payloadPersisted: false,
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
        approvedForActionPlanClosure: true,
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
