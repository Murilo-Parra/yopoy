import { Request, Response } from 'express';
import { FiscalRealExecutionPreparationPolicy } from '../dedicated-homologation/real-execution-preparation/FiscalRealExecutionPreparationPolicy';
import { FiscalRealOperationalEnvelope } from '../dedicated-homologation/real-execution-preparation/FiscalRealOperationalEnvelope';
import { FiscalRealExecutionPreparationChecklist } from '../dedicated-homologation/real-execution-preparation/FiscalRealExecutionPreparationChecklist';
import { FiscalRealExecutionPreparationBlockerRegister } from '../dedicated-homologation/real-execution-preparation/FiscalRealExecutionPreparationBlockerRegister';
import { FiscalRealExecutionPreparationRiskRegister } from '../dedicated-homologation/real-execution-preparation/FiscalRealExecutionPreparationRiskRegister';
import { FiscalRealExecutionPreparationEvaluationService } from '../dedicated-homologation/real-execution-preparation/FiscalRealExecutionPreparationEvaluationService';
import { FiscalRealExecutionPreparationDecisionService } from '../dedicated-homologation/real-execution-preparation/FiscalRealExecutionPreparationDecisionService';
import { FiscalRealExecutionPreparationReportService } from '../dedicated-homologation/real-execution-preparation/FiscalRealExecutionPreparationReportService';
import { FiscalRealExecutionPreparationAuditService } from '../dedicated-homologation/real-execution-preparation/FiscalRealExecutionPreparationAuditService';

function extractContext(req: Request) {
   const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
   const userId = (req as any).user?.id || (req as any).session?.user_id || 'system';
   return { companyId, userId, endpoint: req.path };
}

export class FiscalRealExecutionPreparationController {

  public static async getPolicy(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealExecutionPreparationAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_PREP_POLICY' });
        res.json({ message: FiscalRealExecutionPreparationPolicy.enforce({})?.blockers?.[0] || 'Real Infrastructure Execution Preparation 14.1 é apenas envelope operacional administrativo. Nenhuma execução real foi autorizada. Gate unlock real, autorização real, Terraform apply, Pulumi up, deploy real, banco real, vault real, secrets reais, certificado real, SEFAZ real, XML real assinado, PDF real e Produção V2 permanecem bloqueados.', readOnly: true, executionPreparationOnly: true, operationalEnvelopeOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getOperationalEnvelope(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealExecutionPreparationAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_OPERATIONAL_ENVELOPE' });
        res.json({ envelope: FiscalRealOperationalEnvelope.getEnvelope(), readOnly: true, executionPreparationOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getChecklist(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealExecutionPreparationAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_PREP_CHECKLIST' });
        res.json({ checklist: FiscalRealExecutionPreparationChecklist.getChecklist(), readOnly: true, executionPreparationOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getBlockers(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealExecutionPreparationAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_PREP_BLOCKERS' });
        res.json({ blockers: FiscalRealExecutionPreparationBlockerRegister.getBlockers(), readOnly: true, executionPreparationOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getRisks(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealExecutionPreparationAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_PREP_RISKS' });
        res.json({ risks: FiscalRealExecutionPreparationRiskRegister.getRisks(), readOnly: true, executionPreparationOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async evaluate(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealExecutionPreparationAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'EVALUATE_PREPARATION' });
        res.json(FiscalRealExecutionPreparationEvaluationService.evaluate({ ...req.body, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async simulatePreparation(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealExecutionPreparationAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'SIMULATE_PREPARATION' });
        res.json(FiscalRealExecutionPreparationDecisionService.simulateDecision({ ...req.body, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getReport(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealExecutionPreparationAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_PREP_REPORT' });
        res.json(FiscalRealExecutionPreparationReportService.getReport());
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getAudit(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealExecutionPreparationAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_PREP_AUDIT' });
        res.json({ logs: FiscalRealExecutionPreparationAuditService.getLogs(), readOnly: true, executionPreparationOnly: true, operationalEnvelopeOnly: true, simulationOnly: true, governanceOnly: true, activationBlocked: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getHealth(req: Request, res: Response) {
    res.json({
        status: 'UP',
        readOnly: true,
        executionPreparationOnly: true,
        operationalEnvelopeOnly: true,
        mockEnvironmentOnly: true,
        governanceOnly: true,
        simulationOnly: true,
        activationBlocked: true,
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
        approvedForExecutionPreparationClosure: true,
        approvedForRealExecutionAuthorization: false,
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
