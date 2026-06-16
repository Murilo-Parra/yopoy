import { Request, Response } from 'express';
import { FiscalRealExecutionPreparationClosureInventory } from '../dedicated-homologation/real-execution-preparation/closure/FiscalRealExecutionPreparationClosureInventory';
import { FiscalRealExecutionPreparationFinalChecklist } from '../dedicated-homologation/real-execution-preparation/closure/FiscalRealExecutionPreparationFinalChecklist';
import { FiscalRealExecutionPreparationEvidencePackageService } from '../dedicated-homologation/real-execution-preparation/closure/FiscalRealExecutionPreparationEvidencePackageService';
import { FiscalRealExecutionPreparationFinalBlockerRegister } from '../dedicated-homologation/real-execution-preparation/closure/FiscalRealExecutionPreparationFinalBlockerRegister';
import { FiscalRealExecutionPreparationFinalRiskRegister } from '../dedicated-homologation/real-execution-preparation/closure/FiscalRealExecutionPreparationFinalRiskRegister';
import { FiscalRealExecutionPreparationHandoffService } from '../dedicated-homologation/real-execution-preparation/closure/FiscalRealExecutionPreparationHandoffService';
import { FiscalRealExecutionPreparationClosureReportService } from '../dedicated-homologation/real-execution-preparation/closure/FiscalRealExecutionPreparationClosureReportService';
import { FiscalRealExecutionPreparationClosureAuditService } from '../dedicated-homologation/real-execution-preparation/closure/FiscalRealExecutionPreparationClosureAuditService';

function extractContext(req: Request) {
   const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
   const userId = (req as any).user?.id || (req as any).session?.user_id || 'system';
   return { companyId, userId, endpoint: req.path };
}

export class FiscalRealExecutionPreparationClosureController {

  public static async getInventory(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealExecutionPreparationClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_CLOSURE_INVENTORY' });
        res.json({ inventory: FiscalRealExecutionPreparationClosureInventory.getInventory(), readOnly: true, transitionGateClosureOnly: true, preparationClosureOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getFinalChecklist(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealExecutionPreparationClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_FINAL_CHECKLIST' });
        res.json({ checklist: FiscalRealExecutionPreparationFinalChecklist.getChecklist(), readOnly: true, transitionGateClosureOnly: true, preparationClosureOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getEvidencePackage(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealExecutionPreparationClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_CLOSURE_EVIDENCE_PACKAGE' });
        res.json(FiscalRealExecutionPreparationEvidencePackageService.getEvidencePackage());
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getBlockers(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealExecutionPreparationClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_CLOSURE_BLOCKERS' });
        res.json({ blockers: FiscalRealExecutionPreparationFinalBlockerRegister.getBlockers(), readOnly: true, transitionGateClosureOnly: true, preparationClosureOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getRisks(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealExecutionPreparationClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_CLOSURE_RISKS' });
        res.json({ risks: FiscalRealExecutionPreparationFinalRiskRegister.getRisks(), readOnly: true, transitionGateClosureOnly: true, preparationClosureOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getHandoff(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealExecutionPreparationClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_CLOSURE_HANDOFF' });
        res.json({ handoff: FiscalRealExecutionPreparationHandoffService.getHandoff(), readOnly: true, transitionGateClosureOnly: true, preparationClosureOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getReport(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealExecutionPreparationClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_CLOSURE_REPORT' });
        res.json(FiscalRealExecutionPreparationClosureReportService.getReport());
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getAudit(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealExecutionPreparationClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_CLOSURE_AUDIT' });
        res.json({ logs: FiscalRealExecutionPreparationClosureAuditService.getLogs(), readOnly: true, transitionGateClosureOnly: true, preparationClosureOnly: true, simulationOnly: true, governanceOnly: true, activationBlocked: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getHealth(req: Request, res: Response) {
    res.json({
        status: 'UP',
        readOnly: true,
        transitionGateClosureOnly: true,
        preparationClosureOnly: true,
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
        approvedForPreparationClosure: true,
        approvedForTransitionGateClosure: true,
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
