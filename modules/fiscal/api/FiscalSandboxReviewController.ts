import { Request, Response } from 'express';
import { FiscalSandboxReviewService } from '../sandbox-persistence/FiscalSandboxReviewService';
import { FiscalSandboxRetentionService } from '../sandbox-persistence/FiscalSandboxRetentionService';
import { FiscalSandboxReviewReportService } from '../sandbox-persistence/FiscalSandboxReviewReportService';
import { FiscalSandboxReviewAuditService } from '../sandbox-persistence/FiscalSandboxReviewAuditService';

const reviewService = new FiscalSandboxReviewService();
const retentionService = new FiscalSandboxRetentionService();
const reportService = new FiscalSandboxReviewReportService();

export class FiscalSandboxReviewController {

  public static async listSnapshots(req: Request, res: Response) {
    try {
      const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      const filters = req.query || {};
      const snapshots = await reviewService.getSnapshots(companyId, filters);
      
      res.json(snapshots);
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getSnapshot(req: Request, res: Response) {
    try {
      const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      const snapshot = await reviewService.getSnapshotById(companyId, req.params.id);
      if (!snapshot) return res.status(404).json({ error: 'Not found' });
      
      res.json(snapshot);
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async markReviewed(req: Request, res: Response) {
    try {
      const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      const userId = (req as any).user?.id || (req as any).session?.user_id || 'system';
      const result = await reviewService.markReviewed(companyId, req.params.id, userId);
      
      res.status(result.success ? 200 : 400).json(result);
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async retain(req: Request, res: Response) {
    try {
      const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      const userId = (req as any).user?.id || (req as any).session?.user_id || 'system';
      const result = await reviewService.retain(companyId, req.params.id, userId);
      
      res.status(result.success ? 200 : 400).json(result);
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async markCleanupEligible(req: Request, res: Response) {
    try {
      const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      const userId = (req as any).user?.id || (req as any).session?.user_id || 'system';
      const result = await reviewService.markCleanupEligible(companyId, req.params.id, userId);
      
      res.status(result.success ? 200 : 400).json(result);
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async previewCleanup(req: Request, res: Response) {
    try {
      const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      const olderThanDays = req.body.olderThanDays ? parseInt(req.body.olderThanDays) : undefined;
      const preview = await retentionService.previewCleanup(companyId, olderThanDays);
      
      res.json(preview);
    } catch (err: any) {
      res.status(400).json({ error: 'Preview failed', details: err.message });
    }
  }

  public static async executeCleanup(req: Request, res: Response) {
    try {
      const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      const candidateIds = req.body.candidateIds || [];
      if (!Array.isArray(candidateIds) || candidateIds.length === 0) {
         return res.status(400).json({ error: 'candidateIds array is required' });
      }

      const execResult = await retentionService.executeCleanup(companyId, candidateIds);
      
      res.json(execResult);
    } catch (err: any) {
      res.status(400).json({ error: 'Cleanup execution failed', details: err.message });
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

  public static async getAudit(req: Request, res: Response) {
    try {
      const logs = FiscalSandboxReviewAuditService.getLogs();
      res.json({ logs });
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
      sensitiveDataIncluded: false
    });
  }
}
