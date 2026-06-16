import { Request, Response } from 'express';
import { 
  FiscalProductionEvidenceVaultClosurePolicy,
  FiscalProductionEvidenceVaultClosureInventory,
  FiscalProductionEvidenceVaultFinalChecklist,
  FiscalProductionEvidenceVaultEvidencePackageService,
  FiscalProductionEvidenceNoPersistenceHandoffService,
  FiscalProductionEvidencePostClosureRoadmap,
  FiscalProductionEvidenceVaultFinalBlockerRegister,
  FiscalProductionEvidenceVaultFinalRiskRegister,
  FiscalProductionEvidenceVaultClosureValidator,
  FiscalProductionEvidenceVaultClosureEvaluationService,
  FiscalProductionEvidenceVaultClosureDecisionService,
  FiscalProductionEvidenceVaultClosureReportService,
  FiscalProductionEvidenceVaultClosureAuditService
} from '../dedicated-homologation/production-evidence-vault-governance/closure';

export class FiscalProductionEvidenceVaultClosureController {
  public static getPolicy(req: Request, res: Response) {
    FiscalProductionEvidenceVaultClosureAuditService.audit('getPolicy');
    res.status(200).json({ policy: FiscalProductionEvidenceVaultClosurePolicy.getPolicyMessage() });
  }

  public static getClosureInventory(req: Request, res: Response) {
    FiscalProductionEvidenceVaultClosureAuditService.audit('getClosureInventory');
    res.status(200).json({ inventory: FiscalProductionEvidenceVaultClosureInventory.getInventory() });
  }

  public static getFinalChecklist(req: Request, res: Response) {
    FiscalProductionEvidenceVaultClosureAuditService.audit('getFinalChecklist');
    res.status(200).json({ checklist: FiscalProductionEvidenceVaultFinalChecklist.getChecklist() });
  }

  public static getEvidencePackage(req: Request, res: Response) {
    FiscalProductionEvidenceVaultClosureAuditService.audit('getEvidencePackage');
    res.status(200).json({ package: FiscalProductionEvidenceVaultEvidencePackageService.getPackage() });
  }

  public static getNoPersistenceHandoff(req: Request, res: Response) {
    FiscalProductionEvidenceVaultClosureAuditService.audit('getNoPersistenceHandoff');
    res.status(200).json({ handoff: FiscalProductionEvidenceNoPersistenceHandoffService.getHandoff() });
  }

  public static getPostClosureRoadmap(req: Request, res: Response) {
    FiscalProductionEvidenceVaultClosureAuditService.audit('getPostClosureRoadmap');
    res.status(200).json({ roadmap: FiscalProductionEvidencePostClosureRoadmap.getRoadmap() });
  }

  public static getFinalBlockers(req: Request, res: Response) {
    FiscalProductionEvidenceVaultClosureAuditService.audit('getFinalBlockers');
    res.status(200).json({ blockers: FiscalProductionEvidenceVaultFinalBlockerRegister.getBlockers() });
  }

  public static getFinalRisks(req: Request, res: Response) {
    FiscalProductionEvidenceVaultClosureAuditService.audit('getFinalRisks');
    res.status(200).json({ risks: FiscalProductionEvidenceVaultFinalRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
    try {
      FiscalProductionEvidenceVaultClosureValidator.validate(req.body);
      FiscalProductionEvidenceVaultClosureAuditService.audit('validate', { success: true });
      res.status(200).json({ valid: true });
    } catch (error: any) {
      FiscalProductionEvidenceVaultClosureAuditService.audit('validate', { error: error.message });
      res.status(400).json({ error: error.message });
    }
  }

  public static evaluate(req: Request, res: Response) {
    try {
      const evaluation = FiscalProductionEvidenceVaultClosureEvaluationService.evaluate(req.body);
      FiscalProductionEvidenceVaultClosureAuditService.audit('evaluate', { success: true });
      res.status(200).json({ evaluation });
    } catch (error: any) {
      FiscalProductionEvidenceVaultClosureAuditService.audit('evaluate', { error: error.message });
      res.status(400).json({ error: error.message });
    }
  }

  public static simulateDecision(req: Request, res: Response) {
    try {
      FiscalProductionEvidenceVaultClosureValidator.validate(req.body);
      const decision = FiscalProductionEvidenceVaultClosureDecisionService.simulateDecision(req.body);
      FiscalProductionEvidenceVaultClosureAuditService.audit('simulateDecision', { success: true });
      res.status(200).json({ decision });
    } catch (error: any) {
      FiscalProductionEvidenceVaultClosureAuditService.audit('simulateDecision', { error: error.message });
      res.status(400).json({ error: error.message });
    }
  }

  public static getReport(req: Request, res: Response) {
    FiscalProductionEvidenceVaultClosureAuditService.audit('getReport');
    res.status(200).json({ report: FiscalProductionEvidenceVaultClosureReportService.getReport() });
  }

  public static getAudit(req: Request, res: Response) {
    res.status(200).json({ logs: FiscalProductionEvidenceVaultClosureAuditService.getLogs() });
  }

  public static getHealth(req: Request, res: Response) {
    res.status(200).json({
      status: 'ok',
      module: '35.5',
      realEvidenceVaultCreated: false,
      realClosureExecuted: false,
      realEvidencePersisted: false
    });
  }
}
