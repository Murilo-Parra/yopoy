import { Request, Response } from 'express';
import { FiscalHomologationMetricsAggregator } from '../homologation/review/FiscalHomologationMetricsAggregator';
import { FiscalHomologationMaturityScoreService } from '../homologation/review/FiscalHomologationMaturityScoreService';
import { FiscalHomologationRiskReviewService } from '../homologation/review/FiscalHomologationRiskReviewService';
import { FiscalHomologationFinalReviewService } from '../homologation/review/FiscalHomologationFinalReviewService';
import { FiscalHomologationReviewReportService } from '../homologation/review/FiscalHomologationReviewReportService';
import { FiscalHomologationReviewAuditService } from '../homologation/review/FiscalHomologationReviewAuditService';

function extractContext(req: Request) {
   const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
   const userId = (req as any).user?.id || (req as any).session?.user_id || 'system';
   return { companyId, userId, endpoint: req.path };
}

export class FiscalHomologationReviewController {
  public static async getMetrics(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalHomologationReviewAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_METRICS' });

      res.json(FiscalHomologationMetricsAggregator.aggregateMetrics());
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getScore(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalHomologationReviewAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_SCORE' });

      res.json(FiscalHomologationMaturityScoreService.calculateScore());
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getRisks(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalHomologationReviewAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_RISKS' });

      res.json({
         risks: FiscalHomologationRiskReviewService.getRisks(),
         readOnly: true, mockOnly: true, governanceOnly: true, reviewOnly: true, simulationOnly: true, activationBlocked: true
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getFinalReview(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalHomologationReviewAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_FINAL_REVIEW' });

      res.json(FiscalHomologationFinalReviewService.getFinalReview());
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getReport(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalHomologationReviewAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_REPORT' });

      res.json(FiscalHomologationReviewReportService.getReport());
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getAudit(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalHomologationReviewAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_AUDIT' });

      res.json({
         logs: FiscalHomologationReviewAuditService.getLogs(),
         readOnly: true, mockOnly: true, governanceOnly: true, reviewOnly: true, simulationOnly: true, activationBlocked: true
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getHealth(req: Request, res: Response) {
    res.json({ 
      status: 'UP',
      readOnly: true,
      governanceOnly: true,
      mockOnly: true,
      reviewOnly: true,
      simulationOnly: true,
      activationBlocked: true,
      go: false,
      noGo: true,
      realHomologationExecutions: 0,
      realSefazCalls: 0,
      realCertificatesLoaded: 0,
      realPfxReads: 0,
      realCertificatePasswordReads: 0,
      realXmlSigned: 0,
      realPdfGenerated: 0,
      realTrafficChanges: 0,
      realDmlExecutions: 0,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      homologationExecuted: false,
      realSefazCalled: false,
      certificateLoaded: false,
      realPfxRead: false,
      certificatePasswordRead: false,
      xmlSigned: false,
      pdfGenerated: false,
      releaseActivated: false,
      canaryActivated: false,
      productionV2Activated: false,
      trafficChanged: false,
      approvedForHomologationExecution: false,
      approvedForSefazConnection: false,
      approvedForCertificateLoad: false,
      approvedForXmlSigning: false,
      approvedForPdfGeneration: false,
      approvedForProductionV2: false
    });
  }
}
