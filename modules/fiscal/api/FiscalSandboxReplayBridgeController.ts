import { Request, Response } from 'express';
import { FiscalSandboxReplayBridgeService } from '../sandbox-persistence/FiscalSandboxReplayBridgeService';
import { FiscalSandboxReplayBridgeReportService } from '../sandbox-persistence/FiscalSandboxReplayBridgeReportService';
import { FiscalSandboxReplayBridgeAuditService } from '../sandbox-persistence/FiscalSandboxReplayBridgeAuditService';
import { FiscalShadowTapManualCaptureService } from '../canary/tap/FiscalShadowTapManualCaptureService';
import { FiscalShadowReplayQueueService } from '../canary/tap/replay/FiscalShadowReplayQueueService';
import { FiscalShadowReplayQueueRepository } from '../canary/tap/replay/FiscalShadowReplayQueueRepository';
import { FiscalShadowReplayAuditService } from '../canary/tap/replay/FiscalShadowReplayAuditService';
import { FiscalShadowReplayManualProcessor } from '../canary/tap/replay/FiscalShadowReplayManualProcessor';
import { FiscalShadowReplayBatchService } from '../canary/tap/replay/batch/FiscalShadowReplayBatchService';
import { FiscalShadowReplayBatchManualRunner } from '../canary/tap/replay/batch/FiscalShadowReplayBatchManualRunner';
import { FiscalShadowReplayBatchAuditService } from '../canary/tap/replay/batch/FiscalShadowReplayBatchAuditService';
import { FiscalShadowReplayBatchReportService } from '../canary/tap/replay/batch/FiscalShadowReplayBatchReportService';

const bridgeService = new FiscalSandboxReplayBridgeService();
const reportService = new FiscalSandboxReplayBridgeReportService();
const manualCaptureService = new FiscalShadowTapManualCaptureService();
const replayQueueRepo = new FiscalShadowReplayQueueRepository();
const replayQueueAudit = new FiscalShadowReplayAuditService();
const replayQueueService = new FiscalShadowReplayQueueService(replayQueueRepo, replayQueueAudit);
const manualProcessor = new FiscalShadowReplayManualProcessor(replayQueueRepo, replayQueueAudit);
const batchRunner = new FiscalShadowReplayBatchManualRunner(manualProcessor);
const batchAudit = new FiscalShadowReplayBatchAuditService();
const batchReport = new FiscalShadowReplayBatchReportService();
const batchService = new FiscalShadowReplayBatchService(replayQueueRepo, batchRunner, batchAudit, batchReport);




export class FiscalSandboxReplayBridgeController {

  public static async storeManualToSandbox(req: Request, res: Response) {
    try {
      const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      // Run manual capture logic first
      const input = { ...req.body, companyId };
      const captureResult = manualCaptureService.simulateManualCapture(input);
      
      if (!captureResult.snapshot) {
        return res.status(400).json({ error: 'Manual capture blocked or invalid shape' });
      }

      const result = await bridgeService.storeManualCaptureSnapshot({
        companyId,
        userId: (req as any).user?.id || (req as any).session?.user_id,
        route: input.route,
        operation: input.operation,
        safeShape: captureResult.snapshot,
        metadata: { sourceClient: 'admin-ui' }
      });

      res.status(result.success ? 201 : 400).json(result);
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async storeReplayToSandbox(req: Request, res: Response) {
    try {
      const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      // Run replay queue manual staging logic
      const input = { ...req.body, companyId };
      const queueResult = replayQueueService.enqueueManualSnapshot(input);
      
      if (!queueResult.enqueued) {
         return res.status(400).json({ error: 'Replay Queue enqueue blocked' });
      }

      const result = await bridgeService.storeReplayQueueItem({
        companyId,
        userId: (req as any).user?.id || (req as any).session?.user_id,
        route: input.route,
        operation: input.operation,
        safeShape: input.safeShape || input,
        metadata: { queueId: queueResult.itemId }
      });


      res.status(result.success ? 201 : 400).json(result);
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async storeBatchToSandbox(req: Request, res: Response) {
    try {
      const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      // Run simulation directly
      const batchResult = batchService.simulateBatch(req.body);

      const result = await bridgeService.storeReplayBatchResult({
        companyId,
        userId: (req as any).user?.id || (req as any).session?.user_id,
        route: req.body.route || '/batch',
        operation: req.body.operation || 'batch',
        safeShape: batchResult,
        metadata: { batchId: batchResult.batchId }
      });


      res.status(result.success ? 201 : 400).json(result);
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async validate(req: Request, res: Response) {
    try {
      const result = await bridgeService.validateBridgeInput(req.body);
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getReport(req: Request, res: Response) {
    try {
      const report = await reportService.generateReport();
      res.json(report);
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getAudit(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string) || 100;
      const logs = await FiscalSandboxReplayBridgeAuditService.getLogs(limit);
      res.json(logs);
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }
}
