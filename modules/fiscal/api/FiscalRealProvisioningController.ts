import { Request, Response } from 'express';
import { FiscalRealIacResourceCatalog } from '../dedicated-homologation/real-provisioning/FiscalRealIacResourceCatalog';
import { FiscalRealIacStateBackendPlan } from '../dedicated-homologation/real-provisioning/FiscalRealIacStateBackendPlan';
import { FiscalRealIacVariablePlan } from '../dedicated-homologation/real-provisioning/FiscalRealIacVariablePlan';
import { FiscalRealSecretVaultDryRunContract } from '../dedicated-homologation/real-provisioning/FiscalRealSecretVaultDryRunContract';
import { FiscalRealIacPlanValidator } from '../dedicated-homologation/real-provisioning/FiscalRealIacPlanValidator';
import { FiscalRealSecretPlanValidator } from '../dedicated-homologation/real-provisioning/FiscalRealSecretPlanValidator';
import { FiscalRealCertificateSecretPlanValidator } from '../dedicated-homologation/real-provisioning/FiscalRealCertificateSecretPlanValidator';
import { FiscalRealVaultAccessPolicyValidator } from '../dedicated-homologation/real-provisioning/FiscalRealVaultAccessPolicyValidator';
import { FiscalRealVaultRotationPolicyValidator } from '../dedicated-homologation/real-provisioning/FiscalRealVaultRotationPolicyValidator';
import { FiscalRealVaultAuditPolicyValidator } from '../dedicated-homologation/real-provisioning/FiscalRealVaultAuditPolicyValidator';
import { FiscalRealProvisioningDryRunService } from '../dedicated-homologation/real-provisioning/FiscalRealProvisioningDryRunService';
import { FiscalRealProvisioningReportService } from '../dedicated-homologation/real-provisioning/FiscalRealProvisioningReportService';
import { FiscalRealProvisioningAuditService } from '../dedicated-homologation/real-provisioning/FiscalRealProvisioningAuditService';
import { FiscalRealIacPolicy } from '../dedicated-homologation/real-provisioning/FiscalRealIacPolicy';

function extractContext(req: Request) {
   const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
   const userId = (req as any).user?.id || (req as any).session?.user_id || 'system';
   return { companyId, userId, endpoint: req.path };
}

export class FiscalRealProvisioningController {

  public static async getPolicy(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealProvisioningAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_POLICY' });
        res.json({ message: FiscalRealIacPolicy.getMandatoryMessage(), readOnly: true, infrastructureContractOnly: true, iacPlanOnly: true, secretVaultDryRunOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getResources(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealProvisioningAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_RESOURCES' });
        res.json(FiscalRealIacResourceCatalog.getCatalog());
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getStateBackend(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealProvisioningAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_STATE_BACKEND' });
        res.json(FiscalRealIacStateBackendPlan.getPlan());
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getVariables(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealProvisioningAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_VARIABLES' });
        res.json(FiscalRealIacVariablePlan.getPlan());
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getVaultContract(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealProvisioningAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_VAULT_CONTRACT' });
        res.json(FiscalRealSecretVaultDryRunContract.getContract());
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async validateIacPlan(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealProvisioningAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'VALIDATE_IAC_PLAN' });
        res.json(FiscalRealIacPlanValidator.validate({ ...req.body, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async validateSecrets(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealProvisioningAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'VALIDATE_SECRETS' });
        res.json(FiscalRealSecretPlanValidator.validate({ ...req.body, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async validateCertificateSecret(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealProvisioningAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'VALIDATE_CERTIFICATE_SECRET' });
        res.json(FiscalRealCertificateSecretPlanValidator.validate({ ...req.body, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async validateAccessPolicy(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealProvisioningAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'VALIDATE_ACCESS_POLICY' });
        res.json(FiscalRealVaultAccessPolicyValidator.validate({ ...req.body, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async validateRotationPolicy(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealProvisioningAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'VALIDATE_ROTATION_POLICY' });
        res.json(FiscalRealVaultRotationPolicyValidator.validate({ ...req.body, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async validateAuditPolicy(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealProvisioningAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'VALIDATE_AUDIT_POLICY' });
        res.json(FiscalRealVaultAuditPolicyValidator.validate({ ...req.body, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async dryRun(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealProvisioningAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'EXECUTE_DRY_RUN' });
        res.json(FiscalRealProvisioningDryRunService.executeDryRun({ ...req.body, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getReport(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealProvisioningAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_REPORT' });
        res.json(FiscalRealProvisioningReportService.getReport());
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getAudit(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalRealProvisioningAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_AUDIT' });
        res.json({ logs: FiscalRealProvisioningAuditService.getLogs(), readOnly: true, iacPlanOnly: true, secretVaultDryRunOnly: true, infrastructureContractOnly: true, mockEnvironmentOnly: true, governanceOnly: true, simulationOnly: true, activationBlocked: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getHealth(req: Request, res: Response) {
    res.json({
        status: 'UP',
        readOnly: true,
        iacPlanOnly: true,
        secretVaultDryRunOnly: true,
        infrastructureContractOnly: true,
        mockEnvironmentOnly: true,
        governanceOnly: true,
        simulationOnly: true,
        activationBlocked: true,
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
        approvedForIacPlanClosure: true,
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
