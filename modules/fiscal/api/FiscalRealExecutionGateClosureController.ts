import { Request, Response } from 'express';
import { FiscalRealExecutionGateClosureInventory } from '../dedicated-homologation/real-execution-gate/closure/FiscalRealExecutionGateClosureInventory';
import { FiscalRealExecutionGateFinalChecklist } from '../dedicated-homologation/real-execution-gate/closure/FiscalRealExecutionGateFinalChecklist';
import { FiscalRealExecutionGateEvidencePackageService } from '../dedicated-homologation/real-execution-gate/closure/FiscalRealExecutionGateEvidencePackageService';
import { FiscalRealExecutionGateFinalBlockerRegister } from '../dedicated-homologation/real-execution-gate/closure/FiscalRealExecutionGateFinalBlockerRegister';
import { FiscalRealExecutionGateFinalRiskRegister } from '../dedicated-homologation/real-execution-gate/closure/FiscalRealExecutionGateFinalRiskRegister';
import { FiscalRealExecutionGateHandoffService } from '../dedicated-homologation/real-execution-gate/closure/FiscalRealExecutionGateHandoffService';
import { FiscalRealExecutionGateClosureReportService } from '../dedicated-homologation/real-execution-gate/closure/FiscalRealExecutionGateClosureReportService';
import { FiscalRealExecutionGateClosureAuditService } from '../dedicated-homologation/real-execution-gate/closure/FiscalRealExecutionGateClosureAuditService';

function extractContext(req: Request) {
   const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
   const userId = (req as any).user?.id || (req as any).session?.user_id || 'system';
   return { companyId, userId, endpoint: req.path };
}

export class FiscalRealExecutionGateClosureController {

  public static async getInventory(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealExecutionGateClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_CLOSURE_INVENTORY' });
        res.json({ inventory: FiscalRealExecutionGateClosureInventory.getInventory(), readOnly: true, executionGateClosureOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getFinalChecklist(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealExecutionGateClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_FINAL_CHECKLIST' });
        res.json({ checklist: FiscalRealExecutionGateFinalChecklist.getChecklist(), readOnly: true, executionGateClosureOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getEvidencePackage(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealExecutionGateClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_EVIDENCE_PACKAGE' });
        res.json(FiscalRealExecutionGateEvidencePackageService.getEvidencePackage());
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getBlockers(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealExecutionGateClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_CLOSURE_BLOCKERS' });
        res.json({ blockers: FiscalRealExecutionGateFinalBlockerRegister.getBlockers(), readOnly: true, executionGateClosureOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getRisks(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealExecutionGateClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_CLOSURE_RISKS' });
        res.json({ risks: FiscalRealExecutionGateFinalRiskRegister.getRisks(), readOnly: true, executionGateClosureOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getHandoff(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealExecutionGateClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_READINESS_HANDOFF' });
        res.json(FiscalRealExecutionGateHandoffService.getHandoff());
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getReport(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealExecutionGateClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_CLOSURE_REPORT' });
        res.json(FiscalRealExecutionGateClosureReportService.getReport());
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getAudit(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealExecutionGateClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_CLOSURE_AUDIT' });
        res.json({ logs: FiscalRealExecutionGateClosureAuditService.getLogs(), readOnly: true, executionGateClosureOnly: true, simulationOnly: true, governanceOnly: true, activationBlocked: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getHealth(req: Request, res: Response) {
    res.json({
        status: 'UP',
        readOnly: true,
        executionGateClosureOnly: true,
        readinessHandoffOnly: true,
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
        approvedForExecutionGateClosure: true,
        approvedForReadinessHandoff: true,
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
