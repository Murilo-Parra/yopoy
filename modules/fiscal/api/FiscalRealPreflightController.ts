import { Request, Response } from 'express';
import { FiscalRealPreflightPolicy } from '../dedicated-homologation/real-execution-preparation/preflight/FiscalRealPreflightPolicy';
import { FiscalRealReadinessEvidenceInventory } from '../dedicated-homologation/real-execution-preparation/preflight/FiscalRealReadinessEvidenceInventory';
import { FiscalRealPreflightChecklist } from '../dedicated-homologation/real-execution-preparation/preflight/FiscalRealPreflightChecklist';
import { FiscalRealPreflightBlockerRegister } from '../dedicated-homologation/real-execution-preparation/preflight/FiscalRealPreflightBlockerRegister';
import { FiscalRealPreflightRiskRegister } from '../dedicated-homologation/real-execution-preparation/preflight/FiscalRealPreflightRiskRegister';
import { FiscalRealReadinessEvidencePackageService } from '../dedicated-homologation/real-execution-preparation/preflight/FiscalRealReadinessEvidencePackageService';
import { FiscalRealPreflightEvaluationService } from '../dedicated-homologation/real-execution-preparation/preflight/FiscalRealPreflightEvaluationService';
import { FiscalRealPreflightDecisionService } from '../dedicated-homologation/real-execution-preparation/preflight/FiscalRealPreflightDecisionService';
import { FiscalRealPreflightReportService } from '../dedicated-homologation/real-execution-preparation/preflight/FiscalRealPreflightReportService';
import { FiscalRealPreflightAuditService } from '../dedicated-homologation/real-execution-preparation/preflight/FiscalRealPreflightAuditService';

function extractContext(req: Request) {
   const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
   const userId = (req as any).user?.id || (req as any).session?.user_id || 'system';
   return { companyId, userId, endpoint: req.path };
}

export class FiscalRealPreflightController {

  public static async getPolicy(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealPreflightAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_PREFLIGHT_POLICY' });
        res.json({ message: FiscalRealPreflightPolicy.enforce({})?.blockers?.[0] || 'Real Execution Preflight Review 14.3 é apenas revisão administrativa de evidências e readiness. Nenhuma execução real foi autorizada. Gate unlock real, autorização real, Terraform apply, Pulumi up, deploy real, banco real, vault real, secrets reais, certificado real, SEFAZ real, XML real assinado, PDF real e Produção V2 permanecem bloqueados.', readOnly: true, readinessEvidenceOnly: true, preflightReviewOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getEvidenceInventory(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealPreflightAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_EVIDENCE_INVENTORY' });
        res.json({ inventory: FiscalRealReadinessEvidenceInventory.getInventory(), readOnly: true, readinessEvidenceOnly: true, preflightReviewOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getChecklist(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealPreflightAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_PREFLIGHT_CHECKLIST' });
        res.json({ checklist: FiscalRealPreflightChecklist.getChecklist(), readOnly: true, readinessEvidenceOnly: true, preflightReviewOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getBlockers(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealPreflightAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_PREFLIGHT_BLOCKERS' });
        res.json({ blockers: FiscalRealPreflightBlockerRegister.getBlockers(), readOnly: true, readinessEvidenceOnly: true, preflightReviewOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getRisks(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealPreflightAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_PREFLIGHT_RISKS' });
        res.json({ risks: FiscalRealPreflightRiskRegister.getRisks(), readOnly: true, readinessEvidenceOnly: true, preflightReviewOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getEvidencePackage(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealPreflightAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_EVIDENCE_PACKAGE' });
        res.json(FiscalRealReadinessEvidencePackageService.getEvidencePackage());
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async evaluate(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealPreflightAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'EVALUATE_PREFLIGHT' });
        res.json(FiscalRealPreflightEvaluationService.evaluate({ ...req.body, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async simulateReview(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealPreflightAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'SIMULATE_PREFLIGHT_REVIEW' });
        res.json(FiscalRealPreflightDecisionService.simulateDecision({ ...req.body, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getReport(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealPreflightAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_PREFLIGHT_REPORT' });
        res.json(FiscalRealPreflightReportService.getReport());
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getAudit(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealPreflightAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_PREFLIGHT_AUDIT' });
        res.json({ logs: FiscalRealPreflightAuditService.getLogs(), readOnly: true, readinessEvidenceOnly: true, preflightReviewOnly: true, simulationOnly: true, governanceOnly: true, activationBlocked: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getHealth(req: Request, res: Response) {
    res.json({
        status: 'UP',
        readOnly: true,
        readinessEvidenceOnly: true,
        preflightReviewOnly: true,
        mockEnvironmentOnly: true,
        governanceOnly: true,
        simulationOnly: true,
        activationBlocked: true,
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
        approvedForPreflightClosure: true,
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
