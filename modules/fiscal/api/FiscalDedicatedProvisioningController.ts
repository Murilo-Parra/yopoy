import { Request, Response } from 'express';
import { FiscalDedicatedProvisioningPolicy } from '../dedicated-homologation/provisioning/FiscalDedicatedProvisioningPolicy';
import { FiscalDedicatedNetworkPlanValidator } from '../dedicated-homologation/provisioning/FiscalDedicatedNetworkPlanValidator';
import { FiscalDedicatedDatabasePlanValidator } from '../dedicated-homologation/provisioning/FiscalDedicatedDatabasePlanValidator';
import { FiscalDedicatedSecretVaultPlanValidator } from '../dedicated-homologation/provisioning/FiscalDedicatedSecretVaultPlanValidator';
import { FiscalDedicatedCertificatePlanValidator } from '../dedicated-homologation/provisioning/FiscalDedicatedCertificatePlanValidator';
import { FiscalDedicatedSefazPlanValidator } from '../dedicated-homologation/provisioning/FiscalDedicatedSefazPlanValidator';
import { FiscalDedicatedXmlSignerPlanValidator } from '../dedicated-homologation/provisioning/FiscalDedicatedXmlSignerPlanValidator';
import { FiscalDedicatedDanfePlanValidator } from '../dedicated-homologation/provisioning/FiscalDedicatedDanfePlanValidator';
import { FiscalDedicatedObservabilityPlanValidator } from '../dedicated-homologation/provisioning/FiscalDedicatedObservabilityPlanValidator';
import { FiscalDedicatedRollbackPlanValidator } from '../dedicated-homologation/provisioning/FiscalDedicatedRollbackPlanValidator';
import { FiscalDedicatedProvisioningDryRunService } from '../dedicated-homologation/provisioning/FiscalDedicatedProvisioningDryRunService';
import { FiscalDedicatedProvisioningReportService } from '../dedicated-homologation/provisioning/FiscalDedicatedProvisioningReportService';
import { FiscalDedicatedProvisioningAuditService } from '../dedicated-homologation/provisioning/FiscalDedicatedProvisioningAuditService';
import { FiscalDedicatedProvisioningDomain } from '../dedicated-homologation/provisioning/FiscalDedicatedProvisioningTypes';

function extractContext(req: Request) {
   const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
   const userId = (req as any).user?.id || (req as any).session?.user_id || 'system';
   return { companyId, userId, endpoint: req.path };
}

export class FiscalDedicatedProvisioningController {
  
  public static async getPolicy(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedProvisioningAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_POLICY' });
        res.json({ message: FiscalDedicatedProvisioningPolicy.getMandatoryMessage(), readOnly: true, provisioningPlanOnly: true, dryRunValidatorOnly: true, contractValidationOnly: true, governanceOnly: true, simulationOnly: true, activationBlocked: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async validateNetwork(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedProvisioningAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'VALIDATE_NETWORK' });
        res.json(FiscalDedicatedNetworkPlanValidator.validate({ ...req.body, domain: FiscalDedicatedProvisioningDomain.NETWORK, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async validateDatabase(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedProvisioningAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'VALIDATE_DATABASE' });
        res.json(FiscalDedicatedDatabasePlanValidator.validate({ ...req.body, domain: FiscalDedicatedProvisioningDomain.DATABASE, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async validateSecrets(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedProvisioningAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'VALIDATE_SECRETS' });
        res.json(FiscalDedicatedSecretVaultPlanValidator.validate({ ...req.body, domain: FiscalDedicatedProvisioningDomain.SECRET_VAULT, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async validateCertificates(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedProvisioningAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'VALIDATE_CERTIFICATES' });
        res.json(FiscalDedicatedCertificatePlanValidator.validate({ ...req.body, domain: FiscalDedicatedProvisioningDomain.CERTIFICATE, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async validateSefaz(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedProvisioningAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'VALIDATE_SEFAZ' });
        res.json(FiscalDedicatedSefazPlanValidator.validate({ ...req.body, domain: FiscalDedicatedProvisioningDomain.SEFAZ, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async validateXmlSigner(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedProvisioningAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'VALIDATE_XML_SIGNER' });
        res.json(FiscalDedicatedXmlSignerPlanValidator.validate({ ...req.body, domain: FiscalDedicatedProvisioningDomain.XML_SIGNER, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async validateDanfe(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedProvisioningAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'VALIDATE_DANFE' });
        res.json(FiscalDedicatedDanfePlanValidator.validate({ ...req.body, domain: FiscalDedicatedProvisioningDomain.DANFE, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async validateObservability(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedProvisioningAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'VALIDATE_OBSERVABILITY' });
        res.json(FiscalDedicatedObservabilityPlanValidator.validate({ ...req.body, domain: FiscalDedicatedProvisioningDomain.OBSERVABILITY, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async validateRollback(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedProvisioningAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'VALIDATE_ROLLBACK' });
        res.json(FiscalDedicatedRollbackPlanValidator.validate({ ...req.body, domain: FiscalDedicatedProvisioningDomain.ROLLBACK, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async dryRun(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedProvisioningAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'EXECUTE_DRY_RUN' });
        res.json(FiscalDedicatedProvisioningDryRunService.executeDryRun({ ...req.body, domain: FiscalDedicatedProvisioningDomain.FULL_STACK, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getReport(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedProvisioningAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_REPORT' });
        res.json(FiscalDedicatedProvisioningReportService.getReport());
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getAudit(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedProvisioningAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_AUDIT' });
        res.json({ logs: FiscalDedicatedProvisioningAuditService.getLogs(), readOnly: true, provisioningPlanOnly: true, dryRunValidatorOnly: true, contractValidationOnly: true, governanceOnly: true, simulationOnly: true, activationBlocked: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getHealth(req: Request, res: Response) {
    res.json({
        status: 'UP',
        readOnly: true,
        provisioningPlanOnly: true,
        dryRunValidatorOnly: true,
        contractValidationOnly: true,
        governanceOnly: true,
        simulationOnly: true,
        activationBlocked: true,
        infrastructureProvisioned: false,
        networkApplied: false,
        databaseProvisioned: false,
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
