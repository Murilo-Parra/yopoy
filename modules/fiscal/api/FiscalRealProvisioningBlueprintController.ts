import { Request, Response } from 'express';
import { FiscalRealEnvironmentResourceInventory } from '../dedicated-homologation/real-blueprint/FiscalRealEnvironmentResourceInventory';
import { FiscalRealNetworkBlueprint } from '../dedicated-homologation/real-blueprint/FiscalRealNetworkBlueprint';
import { FiscalRealDatabaseBlueprint } from '../dedicated-homologation/real-blueprint/FiscalRealDatabaseBlueprint';
import { FiscalRealSecretVaultBlueprint } from '../dedicated-homologation/real-blueprint/FiscalRealSecretVaultBlueprint';
import { FiscalRealCertificateBlueprint } from '../dedicated-homologation/real-blueprint/FiscalRealCertificateBlueprint';
import { FiscalRealSefazBlueprint } from '../dedicated-homologation/real-blueprint/FiscalRealSefazBlueprint';
import { FiscalRealXmlSignerBlueprint } from '../dedicated-homologation/real-blueprint/FiscalRealXmlSignerBlueprint';
import { FiscalRealDanfeBlueprint } from '../dedicated-homologation/real-blueprint/FiscalRealDanfeBlueprint';
import { FiscalRealObservabilityBlueprint } from '../dedicated-homologation/real-blueprint/FiscalRealObservabilityBlueprint';
import { FiscalRealRollbackBlueprint } from '../dedicated-homologation/real-blueprint/FiscalRealRollbackBlueprint';
import { FiscalRealResponsibilityMatrix } from '../dedicated-homologation/real-blueprint/FiscalRealResponsibilityMatrix';
import { FiscalRealApprovalCriteria } from '../dedicated-homologation/real-blueprint/FiscalRealApprovalCriteria';
import { FiscalRealProvisioningBlockerRegister } from '../dedicated-homologation/real-blueprint/FiscalRealProvisioningBlockerRegister';
import { FiscalRealProvisioningEvaluationService } from '../dedicated-homologation/real-blueprint/FiscalRealProvisioningEvaluationService';
import { FiscalRealProvisioningReportService } from '../dedicated-homologation/real-blueprint/FiscalRealProvisioningReportService';
import { FiscalRealProvisioningAuditService } from '../dedicated-homologation/real-blueprint/FiscalRealProvisioningAuditService';

function extractContext(req: Request) {
   const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
   const userId = (req as any).user?.id || (req as any).session?.user_id || 'system';
   return { companyId, userId, endpoint: req.path };
}

export class FiscalRealProvisioningBlueprintController {
  
  public static async getInventory(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealProvisioningAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_INVENTORY' });
        res.json({ inventory: FiscalRealEnvironmentResourceInventory.getInventory(), readOnly: true, infrastructureDesignOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getNetwork(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealProvisioningAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_NETWORK' });
        res.json({ network: FiscalRealNetworkBlueprint.getBlueprint(), readOnly: true, infrastructureDesignOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getDatabase(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealProvisioningAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_DATABASE' });
        res.json({ database: FiscalRealDatabaseBlueprint.getBlueprint(), readOnly: true, infrastructureDesignOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getSecrets(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealProvisioningAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_SECRETS' });
        res.json({ secrets: FiscalRealSecretVaultBlueprint.getBlueprint(), readOnly: true, infrastructureDesignOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getCertificate(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealProvisioningAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_CERTIFICATE' });
        res.json({ certificate: FiscalRealCertificateBlueprint.getBlueprint(), readOnly: true, infrastructureDesignOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getSefaz(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealProvisioningAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_SEFAZ' });
        res.json({ sefaz: FiscalRealSefazBlueprint.getBlueprint(), readOnly: true, infrastructureDesignOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getXmlSigner(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealProvisioningAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_XML_SIGNER' });
        res.json({ xmlSigner: FiscalRealXmlSignerBlueprint.getBlueprint(), readOnly: true, infrastructureDesignOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getDanfe(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealProvisioningAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_DANFE' });
        res.json({ danfe: FiscalRealDanfeBlueprint.getBlueprint(), readOnly: true, infrastructureDesignOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getObservability(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealProvisioningAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_OBSERVABILITY' });
        res.json({ observability: FiscalRealObservabilityBlueprint.getBlueprint(), readOnly: true, infrastructureDesignOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getRollback(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealProvisioningAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_ROLLBACK' });
        res.json({ rollback: FiscalRealRollbackBlueprint.getBlueprint(), readOnly: true, infrastructureDesignOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getResponsibilities(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealProvisioningAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_RESPONSIBILITIES' });
        res.json({ responsibilities: FiscalRealResponsibilityMatrix.getMatrix(), readOnly: true, infrastructureDesignOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getCriteria(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealProvisioningAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_CRITERIA' });
        res.json({ criteria: FiscalRealApprovalCriteria.getCriteria(), readOnly: true, infrastructureDesignOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getBlockers(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealProvisioningAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_BLOCKERS' });
        res.json({ blockers: FiscalRealProvisioningBlockerRegister.getBlockers(), readOnly: true, infrastructureDesignOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async evaluate(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealProvisioningAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'EVALUATE_BLUEPRINT' });
        res.json(FiscalRealProvisioningEvaluationService.evaluate({ ...req.body, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getReport(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealProvisioningAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_REPORT' });
        res.json(FiscalRealProvisioningReportService.getFinalReport());
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getAudit(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealProvisioningAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_AUDIT' });
        res.json({ logs: FiscalRealProvisioningAuditService.getLogs(), readOnly: true, infrastructureDesignOnly: true, realProvisioningBlueprintOnly: true, mockEnvironmentOnly: true, governanceOnly: true, simulationOnly: true, activationBlocked: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getHealth(req: Request, res: Response) {
    res.json({
        status: 'UP',
        readOnly: true,
        realProvisioningBlueprintOnly: true,
        infrastructureDesignOnly: true,
        mockEnvironmentOnly: true,
        governanceOnly: true,
        simulationOnly: true,
        activationBlocked: true,
        infrastructureProvisioned: false,
        environmentActivated: false,
        networkApplied: false,
        databaseProvisioned: false,
        realDatabaseConnected: false,
        vaultProvisioned: false,
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
        approvedForBlueprintClosure: true,
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
