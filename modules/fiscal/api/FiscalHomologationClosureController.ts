import { Request, Response } from 'express';
import { FiscalHomologationClosureInventory } from '../homologation/closure/FiscalHomologationClosureInventory';
import { FiscalHomologationClosureCriteria } from '../homologation/closure/FiscalHomologationClosureCriteria';
import { FiscalHomologationEvidencePackageService } from '../homologation/closure/FiscalHomologationEvidencePackageService';
import { FiscalHomologationClosureRiskRegister } from '../homologation/closure/FiscalHomologationClosureRiskRegister';
import { FiscalHomologationClosureHandoffService } from '../homologation/closure/FiscalHomologationClosureHandoffService';
import { FiscalHomologationClosureReportService } from '../homologation/closure/FiscalHomologationClosureReportService';
import { FiscalHomologationClosureAuditService } from '../homologation/closure/FiscalHomologationClosureAuditService';

function extractContext(req: Request) {
   const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
   const userId = (req as any).user?.id || (req as any).session?.user_id || 'system';
   return { companyId, userId, endpoint: req.path };
}

export class FiscalHomologationClosureController {
  public static async getInventory(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalHomologationClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_INVENTORY' });

      res.json({
        inventory: FiscalHomologationClosureInventory.getInventory(),
        readOnly: true, closureOnly: true, mockOnly: true, governanceOnly: true, simulationOnly: true, activationBlocked: true
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getCriteria(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalHomologationClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_CRITERIA' });

      res.json({
        criteria: FiscalHomologationClosureCriteria.getCriteria(),
        readOnly: true, closureOnly: true, mockOnly: true, governanceOnly: true, simulationOnly: true, activationBlocked: true
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getEvidencePackage(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalHomologationClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_EVIDENCE' });

      res.json(FiscalHomologationEvidencePackageService.getEvidencePackage());
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getRisks(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalHomologationClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_RISKS' });

      res.json({
        risks: FiscalHomologationClosureRiskRegister.getRisks(),
        readOnly: true, closureOnly: true, mockOnly: true, governanceOnly: true, simulationOnly: true, activationBlocked: true
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getHandoff(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalHomologationClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_HANDOFF' });

      res.json(FiscalHomologationClosureHandoffService.generateHandoff());
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getFinalReport(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalHomologationClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_FINAL_REPORT' });

      res.json(FiscalHomologationClosureReportService.getFinalReport());
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getAudit(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalHomologationClosureAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_AUDIT' });

      res.json({
        logs: FiscalHomologationClosureAuditService.getLogs(),
        readOnly: true, closureOnly: true, mockOnly: true, governanceOnly: true, simulationOnly: true, activationBlocked: true
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getHealth(req: Request, res: Response) {
    res.json({ 
      status: 'UP',
      readOnly: true,
      closureOnly: true,
      mockOnly: true,
      governanceOnly: true,
      simulationOnly: true,
      activationBlocked: true,
      realHomologationExecutions: 0,
      realSefazCalls: 0,
      realCertificatesLoaded: 0,
      realPfxReads: 0,
      realCertificatePasswordReads: 0,
      realXmlSigned: 0,
      realPdfGenerated: 0,
      realTrafficChanges: 0,
      realDmlExecutions: 0,
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
      endpointsCalled: false,
      workersCreated: false,
      schedulersCreated: false,
      approvedForRealHomologation: false,
      approvedForSefazConnection: false,
      approvedForCertificateLoad: false,
      approvedForXmlSigning: false,
      approvedForPdfGeneration: false,
      approvedForProductionV2: false,
      payloadIncluded: false,
      sensitiveDataIncluded: false
    });
  }
}
