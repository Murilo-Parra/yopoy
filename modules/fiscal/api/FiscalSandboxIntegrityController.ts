import { Request, Response } from 'express';
import { FiscalSandboxIntegrityMetricsService } from '../sandbox-persistence/FiscalSandboxIntegrityMetricsService';
import { FiscalSandboxIntegrityReportService } from '../sandbox-persistence/FiscalSandboxIntegrityReportService';
import { FiscalSandboxIntegrityAuditService } from '../sandbox-persistence/FiscalSandboxIntegrityAuditService';

const metricsService = new FiscalSandboxIntegrityMetricsService();
const reportService = new FiscalSandboxIntegrityReportService();

function extractContext(req: Request) {
   const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
   const userId = (req as any).user?.id || (req as any).session?.user_id || 'system';
   return { companyId, userId, endpoint: req.path };
}

export class FiscalSandboxIntegrityController {

  public static async getSummary(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalSandboxIntegrityAuditService.logAdministrativeRead({ companyId, userId, endpoint });

      const summary = await metricsService.getSummary(companyId);
      res.json(summary);
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getQualityScore(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalSandboxIntegrityAuditService.logAdministrativeRead({ companyId, userId, endpoint });

      const qualityScore = await metricsService.getQualityScore(companyId);
      res.json(qualityScore);
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getDuplicates(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalSandboxIntegrityAuditService.logAdministrativeRead({ companyId, userId, endpoint });

      const duplicates = await metricsService.getDuplicateCandidates(companyId);
      res.json({
        duplicates,
        readOnly: true,
        sandboxOnly: true,
        productionWrite: false
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getIncomplete(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalSandboxIntegrityAuditService.logAdministrativeRead({ companyId, userId, endpoint });

      const incomplete = await metricsService.getIncompleteCandidates(companyId);
      res.json({
        incomplete,
        readOnly: true,
        sandboxOnly: true,
        productionWrite: false
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getExpired(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalSandboxIntegrityAuditService.logAdministrativeRead({ companyId, userId, endpoint });

      const expired = await metricsService.getExpiredCandidates(companyId);
      res.json({
        expired,
        readOnly: true,
        sandboxOnly: true,
        productionWrite: false
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getRisks(req: Request, res: Response) {
     try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalSandboxIntegrityAuditService.logAdministrativeRead({ companyId, userId, endpoint });

      const report = await reportService.generateReport(companyId);
      res.json({
        risks: report.risks,
        issues: report.issues,
        readOnly: true,
        sandboxOnly: true,
        productionWrite: false
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getReport(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalSandboxIntegrityAuditService.logAdministrativeRead({ companyId, userId, endpoint });

      const report = await reportService.generateReport(companyId);
      res.json(report);
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getHealth(req: Request, res: Response) {
    res.json({ 
      status: 'UP',
      readOnly: true,
      sandboxOnly: true,
      productionWrite: false,
      simulationOnly: true,
      activationBlocked: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      approvedForRealCanary: false,
      approvedForProductionV2: false
    });
  }
}
