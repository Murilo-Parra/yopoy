import { Request, Response } from 'express';
import { FiscalRealCommandManifestPolicy } from '../dedicated-homologation/real-execution-preparation/command-manifest/FiscalRealCommandManifestPolicy';
import { FiscalRealCommandManifestCatalog } from '../dedicated-homologation/real-execution-preparation/command-manifest/FiscalRealCommandManifestCatalog';
import { FiscalRealCommandManifestBlockerRegister } from '../dedicated-homologation/real-execution-preparation/command-manifest/FiscalRealCommandManifestBlockerRegister';
import { FiscalRealCommandManifestRiskRegister } from '../dedicated-homologation/real-execution-preparation/command-manifest/FiscalRealCommandManifestRiskRegister';
import { FiscalRealCommandManifestValidator } from '../dedicated-homologation/real-execution-preparation/command-manifest/FiscalRealCommandManifestValidator';
import { FiscalRealCommandManifestEvaluationService } from '../dedicated-homologation/real-execution-preparation/command-manifest/FiscalRealCommandManifestEvaluationService';
import { FiscalRealCommandManifestDecisionService } from '../dedicated-homologation/real-execution-preparation/command-manifest/FiscalRealCommandManifestDecisionService';
import { FiscalRealCommandManifestReportService } from '../dedicated-homologation/real-execution-preparation/command-manifest/FiscalRealCommandManifestReportService';
import { FiscalRealCommandManifestAuditService } from '../dedicated-homologation/real-execution-preparation/command-manifest/FiscalRealCommandManifestAuditService';

function extractContext(req: Request) {
   const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
   const userId = (req as any).user?.id || (req as any).session?.user_id || 'system';
   return { companyId, userId, endpoint: req.path };
}

export class FiscalRealCommandManifestController {

  public static async getPolicy(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealCommandManifestAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_MANIFEST_POLICY' });
        res.json({ message: FiscalRealCommandManifestPolicy.enforce({})?.blockers?.[0] || 'Real Execution Command Manifest 14.2 é apenas manifesto administrativo dry-run. Nenhum comando real, comando executável, shell command, manifesto assinado, manifesto persistido ou execução real foi autorizado. Terraform apply, Pulumi up, deploy real, banco real, vault real, secrets reais, certificado real, SEFAZ real, XML assinado, PDF real e Produção V2 permanecem bloqueados.', readOnly: true, commandManifestOnly: true, dryRunManifestOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getCatalog(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealCommandManifestAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_MANIFEST_CATALOG' });
        res.json({ catalog: FiscalRealCommandManifestCatalog.getCatalog(), readOnly: true, commandManifestOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getBlockers(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealCommandManifestAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_MANIFEST_BLOCKERS' });
        res.json({ blockers: FiscalRealCommandManifestBlockerRegister.getBlockers(), readOnly: true, commandManifestOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getRisks(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealCommandManifestAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_MANIFEST_RISKS' });
        res.json({ risks: FiscalRealCommandManifestRiskRegister.getRisks(), readOnly: true, commandManifestOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async validate(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealCommandManifestAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'VALIDATE_MANIFEST' });
        res.json(FiscalRealCommandManifestValidator.validate({ ...req.body, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async evaluate(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealCommandManifestAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'EVALUATE_MANIFEST' });
        res.json(FiscalRealCommandManifestEvaluationService.evaluate({ ...req.body, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async simulateDecision(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealCommandManifestAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'SIMULATE_MANIFEST_DECISION' });
        res.json(FiscalRealCommandManifestDecisionService.simulateDecision({ ...req.body, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getReport(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealCommandManifestAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_MANIFEST_REPORT' });
        res.json(FiscalRealCommandManifestReportService.getReport());
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getAudit(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealCommandManifestAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_MANIFEST_AUDIT' });
        res.json({ logs: FiscalRealCommandManifestAuditService.getLogs(), readOnly: true, commandManifestOnly: true, dryRunManifestOnly: true, simulationOnly: true, governanceOnly: true, activationBlocked: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getHealth(req: Request, res: Response) {
    res.json({
        status: 'UP',
        readOnly: true,
        commandManifestOnly: true,
        dryRunManifestOnly: true,
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
        approvedForCommandManifestClosure: true,
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
