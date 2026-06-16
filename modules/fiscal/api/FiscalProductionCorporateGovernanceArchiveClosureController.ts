import { Request, Response } from 'express';
import {
  FiscalProductionCorporateGovernanceArchiveClosurePolicy,
  FiscalProductionCorporateGovernanceArchiveClosureInventory,
  FiscalProductionCorporateGovernanceArchiveFinalChecklist,
  FiscalProductionCorporateGovernanceArchiveEvidencePackageService,
  FiscalProductionCorporateGovernanceNoRecordHandoffService,
  FiscalProductionCorporateGovernanceNoNotificationHandoffService,
  FiscalProductionCorporateGovernanceNoLegalEffectHandoffService,
  FiscalProductionCorporateGovernancePostClosureRoadmap,
  FiscalProductionCorporateGovernanceArchiveClosureDependencyMatrix,
  FiscalProductionCorporateGovernanceArchiveFinalBlockerRegister,
  FiscalProductionCorporateGovernanceArchiveFinalRiskRegister,
  FiscalProductionCorporateGovernanceArchiveClosureValidator,
  FiscalProductionCorporateGovernanceArchiveClosureEvaluationService,
  FiscalProductionCorporateGovernanceArchiveClosureDecisionService,
  FiscalProductionCorporateGovernanceArchiveClosureReportService,
  FiscalProductionCorporateGovernanceArchiveClosureAuditService
} from '../dedicated-homologation/production-corporate-governance-archive/closure';

export class FiscalProductionCorporateGovernanceArchiveClosureController {
  public static getPolicy(req: Request, res: Response) {
    res.json(FiscalProductionCorporateGovernanceArchiveClosurePolicy.getPolicy());
  }

  public static getClosureInventory(req: Request, res: Response) {
    res.json(FiscalProductionCorporateGovernanceArchiveClosureInventory.getInventory());
  }

  public static getFinalChecklist(req: Request, res: Response) {
    res.json(FiscalProductionCorporateGovernanceArchiveFinalChecklist.getChecklist());
  }

  public static getEvidencePackage(req: Request, res: Response) {
    res.json(FiscalProductionCorporateGovernanceArchiveEvidencePackageService.getPackage());
  }

  public static getNoRecordHandoff(req: Request, res: Response) {
    res.json(FiscalProductionCorporateGovernanceNoRecordHandoffService.getHandoff());
  }

  public static getNoNotificationHandoff(req: Request, res: Response) {
    res.json(FiscalProductionCorporateGovernanceNoNotificationHandoffService.getHandoff());
  }

  public static getNoLegalEffectHandoff(req: Request, res: Response) {
    res.json(FiscalProductionCorporateGovernanceNoLegalEffectHandoffService.getHandoff());
  }

  public static getPostClosureRoadmap(req: Request, res: Response) {
    res.json(FiscalProductionCorporateGovernancePostClosureRoadmap.getRoadmap());
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    res.json(FiscalProductionCorporateGovernanceArchiveClosureDependencyMatrix.getMatrix());
  }

  public static getFinalBlockers(req: Request, res: Response) {
    res.json({ blockers: FiscalProductionCorporateGovernanceArchiveFinalBlockerRegister.getBlockers() });
  }

  public static getFinalRisks(req: Request, res: Response) {
    res.json({ risks: FiscalProductionCorporateGovernanceArchiveFinalRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const errors = FiscalProductionCorporateGovernanceArchiveClosureValidator.validate(input);
    res.json({ valid: errors.length === 0, errors });
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const warnings = FiscalProductionCorporateGovernanceArchiveClosureEvaluationService.evaluate(input);
    res.json({ evaluated: true, warnings });
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionCorporateGovernanceArchiveClosureDecisionService.simulateDecision(input);
    res.json(result);
  }

  public static getReport(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionCorporateGovernanceArchiveClosureDecisionService.simulateDecision(input);
    res.json(FiscalProductionCorporateGovernanceArchiveClosureReportService.generateReport(result as any));
  }

  public static getAudit(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionCorporateGovernanceArchiveClosureDecisionService.simulateDecision(input);
    res.json(FiscalProductionCorporateGovernanceArchiveClosureAuditService.generateAuditRecord(result));
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'ok', module: 'Production Corporate Governance Archive Closure', readOnly: true });
  }
}
