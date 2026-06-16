import { Request, Response } from 'express';
import { 
  FiscalSandboxPersistenceService,
  FiscalSandboxCleanupService,
  FiscalSandboxReportService
} from '../sandbox-persistence';

const persistenceService = new FiscalSandboxPersistenceService();
const cleanupService = new FiscalSandboxCleanupService();
const reportService = new FiscalSandboxReportService();

export class FiscalSandboxPersistenceController {
  
  public static async createSnapshot(req: Request, res: Response) {
    try {
      const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      const input = {
        ...req.body,
        companyId,
        userId: (req as any).user?.id || (req as any).session?.user_id
      };

      const result = await persistenceService.saveSnapshot(input);
      res.status(201).json(result);
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async listSnapshots(req: Request, res: Response) {
    try {
      const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      const { status, source } = req.query;
      const snapshots = await persistenceService.listSnapshots(companyId, { 
        status: status as string, 
        source: source as string 
      });
      res.json({ snapshots });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getSnapshot(req: Request, res: Response) {
    try {
      const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
      const { id } = req.params;
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      const snapshot = await persistenceService.getSnapshot(companyId, id);
      if (!snapshot) return res.status(404).json({ error: 'Snapshot not found' });
      res.json(snapshot);
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async markReviewed(req: Request, res: Response) {
    try {
      const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
      const { id } = req.params;
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      const userId = (req as any).user?.id || (req as any).session?.user_id;
      const success = await persistenceService.markReviewed(companyId, id, userId);
      if (!success) return res.status(404).json({ error: 'Snapshot not found or could not be updated' });
      res.json({ success: true, reviewedAt: new Date().toISOString() });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async cleanup(req: Request, res: Response) {
    try {
      const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      const { olderThanDays, status } = req.body;
      const result = await cleanupService.cleanup(companyId, { olderThanDays, status });
      res.json({ success: true, deletedCount: result.deletedCount });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getReport(req: Request, res: Response) {
    try {
      const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      const report = await reportService.generateReport(companyId);
      res.json(report);
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getHealth(req: Request, res: Response) {
    res.json({
      status: 'UP',
      sandboxOnly: true,
      productionWrite: false,
      simulationOnly: true,
      activationBlocked: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      timestamp: new Date().toISOString()
    });
  }
}

