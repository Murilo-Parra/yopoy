import { Request, Response } from 'express';
import { FiscalDedicatedReplayPolicy } from '../dedicated-homologation/replay/FiscalDedicatedReplayPolicy';
import { FiscalDedicatedReplayScenarioCatalog } from '../dedicated-homologation/replay/FiscalDedicatedReplayScenarioCatalog';
import { FiscalDedicatedReplayService } from '../dedicated-homologation/replay/FiscalDedicatedReplayService';
import { FiscalDedicatedReplayReportService } from '../dedicated-homologation/replay/FiscalDedicatedReplayReportService';
import { FiscalDedicatedReplayAuditService } from '../dedicated-homologation/replay/FiscalDedicatedReplayAuditService';

function extractContext(req: Request) {
   const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
   const userId = (req as any).user?.id || (req as any).session?.user_id || 'system';
   return { companyId, userId, endpoint: req.path };
}

export class FiscalDedicatedReplayController {
  
  public static async getPolicy(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedReplayAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_POLICY' });
        res.json({ message: FiscalDedicatedReplayPolicy.getMandatoryMessage(), readOnly: true, replayHarnessOnly: true, syntheticReplayOnly: true, mockEnvironmentOnly: true, governanceOnly: true, simulationOnly: true, activationBlocked: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getScenarios(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedReplayAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_SCENARIOS' });
        res.json(FiscalDedicatedReplayScenarioCatalog.getScenarios());
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async validate(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedReplayAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'VALIDATE_REPLAY' });
        res.json(FiscalDedicatedReplayService.validate({ ...req.body, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async enqueue(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedReplayAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'ENQUEUE_REPLAY' });
        res.json(FiscalDedicatedReplayService.enqueue({ ...req.body, companyId, requestedBy: userId }));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getQueue(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedReplayAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_QUEUE' });
        res.json({ queue: FiscalDedicatedReplayService.getQueue(), readOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async runOne(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedReplayAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'RUN_ONE_REPLAY' });
        res.json(FiscalDedicatedReplayService.runOne(req.body.id));
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async runBatch(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedReplayAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'RUN_BATCH_REPLAY' });
        const ids = req.body.ids || [];
        const result = FiscalDedicatedReplayService.runBatch(ids);
        res.json({ results: result, workersCreated: false, schedulersCreated: false, readOnly: true, simulationOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async compareShape(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedReplayAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'COMPARE_SHAPE' });
        res.json({ differences: FiscalDedicatedReplayService.compareShape(req.body.left, req.body.right), readOnly: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getReport(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedReplayAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_REPORT' });
        res.json(FiscalDedicatedReplayReportService.getReport());
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getAudit(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedReplayAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_AUDIT' });
        res.json({ logs: FiscalDedicatedReplayAuditService.getLogs(), readOnly: true, replayHarnessOnly: true, syntheticReplayOnly: true, mockEnvironmentOnly: true, governanceOnly: true, simulationOnly: true, activationBlocked: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getHealth(req: Request, res: Response) {
    res.json({
        status: 'UP',
        readOnly: true,
        replayHarnessOnly: true,
        syntheticReplayOnly: true,
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
