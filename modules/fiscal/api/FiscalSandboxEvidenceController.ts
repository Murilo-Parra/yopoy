import { Request, Response } from 'express';
import { FiscalSandboxEvidenceCertificationService } from '../sandbox-persistence/FiscalSandboxEvidenceCertificationService';
import { FiscalSandboxEvidenceExportService } from '../sandbox-persistence/FiscalSandboxEvidenceExportService';
import { FiscalSandboxEvidenceAuditService } from '../sandbox-persistence/FiscalSandboxEvidenceAuditService';
import { FiscalSandboxEvidenceChecklist } from '../sandbox-persistence/FiscalSandboxEvidenceChecklist';
import { FiscalSandboxEvidenceReadModel } from '../sandbox-persistence/FiscalSandboxEvidenceReadModel';

const certService = new FiscalSandboxEvidenceCertificationService();
const exportService = new FiscalSandboxEvidenceExportService();
const readModel = new FiscalSandboxEvidenceReadModel();

function extractContext(req: Request) {
   const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
   const userId = (req as any).user?.id || (req as any).session?.user_id || 'system';
   return { companyId, userId, endpoint: req.path };
}

export class FiscalSandboxEvidenceController {

  public static async getSummary(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalSandboxEvidenceAuditService.logAdministrativeExport({ companyId, userId, endpoint, format: 'json' });

      const summary = await certService.getSummary(companyId);
      res.json(summary);
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getChecklist(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalSandboxEvidenceAuditService.logAdministrativeExport({ companyId, userId, endpoint, format: 'json' });

      const data = await readModel.getEvidenceSummary(companyId);
      const checklist = FiscalSandboxEvidenceChecklist.evaluate(data.integrityReport);
      res.json({ checklist, readOnly: true, sandboxOnly: true, productionWrite: false, simulationOnly: true, activationBlocked: true });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getCertification(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalSandboxEvidenceAuditService.logAdministrativeExport({ companyId, userId, endpoint, format: 'json' });

      const cert = await certService.getCertification(companyId);
      res.json(cert);
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async exportJson(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalSandboxEvidenceAuditService.logAdministrativeExport({ companyId, userId, endpoint, format: 'file_json' });

      const jsonStr = await exportService.exportJson(companyId);
      res.setHeader('Content-disposition', 'attachment; filename=sandbox_evidence.json');
      res.setHeader('Content-type', 'application/json');
      res.send(jsonStr);
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async exportText(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalSandboxEvidenceAuditService.logAdministrativeExport({ companyId, userId, endpoint, format: 'file_txt' });

      const textStr = await exportService.exportText(companyId);
      res.setHeader('Content-disposition', 'attachment; filename=sandbox_evidence.txt');
      res.setHeader('Content-type', 'text/plain');
      res.send(textStr);
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getFinalReview(req: Request, res: Response) {
    try {
      const review = certService.getFinalReview();
      res.json(review);
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
