import { Request, Response } from 'express';
import { FiscalDedicatedSimulationPolicy } from '../dedicated-homologation/simulation/FiscalDedicatedSimulationPolicy';
import { FiscalDedicatedMockRuntime } from '../dedicated-homologation/simulation/FiscalDedicatedMockRuntime';
import { FiscalDedicatedMockDatabase } from '../dedicated-homologation/simulation/FiscalDedicatedMockDatabase';
import { FiscalDedicatedMockVault } from '../dedicated-homologation/simulation/FiscalDedicatedMockVault';
import { FiscalDedicatedMockCertificateProvider } from '../dedicated-homologation/simulation/FiscalDedicatedMockCertificateProvider';
import { FiscalDedicatedMockSefazEnvironment } from '../dedicated-homologation/simulation/FiscalDedicatedMockSefazEnvironment';
import { FiscalDedicatedMockXmlSigner } from '../dedicated-homologation/simulation/FiscalDedicatedMockXmlSigner';
import { FiscalDedicatedMockDanfeRenderer } from '../dedicated-homologation/simulation/FiscalDedicatedMockDanfeRenderer';
import { FiscalDedicatedMockObservability } from '../dedicated-homologation/simulation/FiscalDedicatedMockObservability';
import { FiscalDedicatedMockRollback } from '../dedicated-homologation/simulation/FiscalDedicatedMockRollback';
import { FiscalDedicatedSimulationHarness } from '../dedicated-homologation/simulation/FiscalDedicatedSimulationHarness';
import { FiscalDedicatedSimulationReportService } from '../dedicated-homologation/simulation/FiscalDedicatedSimulationReportService';
import { FiscalDedicatedSimulationAuditService } from '../dedicated-homologation/simulation/FiscalDedicatedSimulationAuditService';
import { FiscalDedicatedSimulationDomain } from '../dedicated-homologation/simulation/FiscalDedicatedSimulationTypes';

function extractContext(req: Request) {
   const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
   const userId = (req as any).user?.id || (req as any).session?.user_id || 'system';
   return { companyId, userId, endpoint: req.path };
}

export class FiscalDedicatedSimulationController {
  
  public static async getPolicy(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedSimulationAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_POLICY' });
        res.json({ message: FiscalDedicatedSimulationPolicy.getMandatoryMessage(), readOnly: true, simulationHarnessOnly: true, mockEnvironmentOnly: true, governanceOnly: true, simulationOnly: true, activationBlocked: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getRuntime(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedSimulationAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_RUNTIME' });
        res.json(FiscalDedicatedMockRuntime.simulate({ domain: FiscalDedicatedSimulationDomain.RUNTIME, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getDatabase(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedSimulationAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_DATABASE' });
        res.json(FiscalDedicatedMockDatabase.simulate({ domain: FiscalDedicatedSimulationDomain.DATABASE, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getVault(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedSimulationAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_VAULT' });
        res.json(FiscalDedicatedMockVault.simulate({ domain: FiscalDedicatedSimulationDomain.VAULT, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getCertificate(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedSimulationAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_CERTIFICATE' });
        res.json(FiscalDedicatedMockCertificateProvider.simulate({ domain: FiscalDedicatedSimulationDomain.CERTIFICATE, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getSefaz(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedSimulationAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_SEFAZ' });
        res.json(FiscalDedicatedMockSefazEnvironment.simulate({ domain: FiscalDedicatedSimulationDomain.SEFAZ, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getXmlSigner(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedSimulationAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_XML_SIGNER' });
        res.json(FiscalDedicatedMockXmlSigner.simulate({ domain: FiscalDedicatedSimulationDomain.XML_SIGNER, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getDanfe(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedSimulationAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_DANFE' });
        res.json(FiscalDedicatedMockDanfeRenderer.simulate({ domain: FiscalDedicatedSimulationDomain.DANFE, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getObservability(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedSimulationAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_OBSERVABILITY' });
        res.json(FiscalDedicatedMockObservability.simulate({ domain: FiscalDedicatedSimulationDomain.OBSERVABILITY, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getRollback(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedSimulationAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_ROLLBACK' });
        res.json(FiscalDedicatedMockRollback.simulate({ domain: FiscalDedicatedSimulationDomain.ROLLBACK, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async runSimulation(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedSimulationAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'EXECUTE_SIMULATION' });
        res.json(FiscalDedicatedSimulationHarness.executeSimulation({ ...req.body, domain: FiscalDedicatedSimulationDomain.FULL_STACK, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getReport(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedSimulationAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_REPORT' });
        res.json(FiscalDedicatedSimulationReportService.getReport());
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getAudit(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedSimulationAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_AUDIT' });
        res.json({ logs: FiscalDedicatedSimulationAuditService.getLogs(), readOnly: true, simulationHarnessOnly: true, mockEnvironmentOnly: true, governanceOnly: true, simulationOnly: true, activationBlocked: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getHealth(req: Request, res: Response) {
    res.json({
        status: 'UP',
        readOnly: true,
        simulationHarnessOnly: true,
        mockEnvironmentOnly: true,
        governanceOnly: true,
        simulationOnly: true,
        activationBlocked: true,
        environmentActivated: false,
        infrastructureProvisioned: false,
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
