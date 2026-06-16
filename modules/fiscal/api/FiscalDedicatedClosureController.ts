import { Request, Response } from 'express';
import { FiscalDedicatedClosureInventory } from '../dedicated-homologation/closure/FiscalDedicatedClosureInventory';
import { FiscalDedicatedClosureCriteria } from '../dedicated-homologation/closure/FiscalDedicatedClosureCriteria';
import { FiscalDedicatedClosureBlockerRegister } from '../dedicated-homologation/closure/FiscalDedicatedClosureBlockerRegister';
import { FiscalDedicatedClosureRiskRegister } from '../dedicated-homologation/closure/FiscalDedicatedClosureRiskRegister';
import { FiscalDedicatedEvidencePackageService } from '../dedicated-homologation/closure/FiscalDedicatedEvidencePackageService';
import { FiscalDedicatedTransitionChecklist } from '../dedicated-homologation/closure/FiscalDedicatedTransitionChecklist';
import { FiscalDedicatedEngineeringApprovalService } from '../dedicated-homologation/closure/FiscalDedicatedEngineeringApprovalService';
import { FiscalDedicatedHandoffService } from '../dedicated-homologation/closure/FiscalDedicatedHandoffService';
import { FiscalDedicatedClosureReportService } from '../dedicated-homologation/closure/FiscalDedicatedClosureReportService';
import { FiscalDedicatedClosureAuditService } from '../dedicated-homologation/closure/FiscalDedicatedClosureAuditService';

function extractContext(req: Request) {
   const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
   const userId = (req as any).user?.id || (req as any).session?.user_id || 'system';
   return { companyId, userId, endpoint: req.path };
}

export class FiscalDedicatedClosureController {
  
  public static async getInventory(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_INVENTORY' });
        res.json({ inventory: FiscalDedicatedClosureInventory.getInventory(), readOnly: true, engineeringApprovalOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getCriteria(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_CRITERIA' });
        res.json({ criteria: FiscalDedicatedClosureCriteria.getCriteria(), readOnly: true, engineeringApprovalOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getBlockers(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_BLOCKERS' });
        res.json({ blockers: FiscalDedicatedClosureBlockerRegister.getBlockers(), readOnly: true, engineeringApprovalOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getRisks(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_RISKS' });
        res.json({ risks: FiscalDedicatedClosureRiskRegister.getRisks(), readOnly: true, engineeringApprovalOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getEvidencePackage(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_EVIDENCE_PACKAGE' });
        res.json(FiscalDedicatedEvidencePackageService.getEvidencePackage());
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getTransitionChecklist(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_TRANSITION_CHECKLIST' });
        res.json({ checklist: FiscalDedicatedTransitionChecklist.getChecklist(), readOnly: true, engineeringApprovalOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async evaluateApproval(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'EVALUATE_APPROVAL' });
        res.json(FiscalDedicatedEngineeringApprovalService.evaluateApproval({ ...req.body, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getHandoff(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_HANDOFF' });
        res.json(FiscalDedicatedHandoffService.getHandoff());
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getFinalReport(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_FINAL_REPORT' });
        res.json(FiscalDedicatedClosureReportService.getFinalReport());
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getAudit(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_AUDIT' });
        res.json({ logs: FiscalDedicatedClosureAuditService.getLogs(), readOnly: true, engineeringApprovalOnly: true, transitionClosureOnly: true, mockEnvironmentOnly: true, governanceOnly: true, simulationOnly: true, activationBlocked: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getHealth(req: Request, res: Response) {
    res.json({
        status: 'UP',
        readOnly: true,
        engineeringApprovalOnly: true,
        transitionClosureOnly: true,
        mockEnvironmentOnly: true,
        governanceOnly: true,
        simulationOnly: true,
        activationBlocked: true,
        realTrafficCaptured: false,
        realTrafficProcessed: false,
        endpointCalled: false,
        legacyHandlerCalled: false,
        v2HandlerCalled: false,
        environmentActivated: false,
        infrastructureProvisioned: false,
        databaseProvisioned: false,
        realDatabaseConnected: false,
        vaultProvisioned: false,
        secretLoaded: false,
        certificateLoaded: false,
        realPfxRead: false,
        certificatePasswordRead: false,
        realSefazCalled: false,
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
        approvedForEngineeringClosure: true,
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
