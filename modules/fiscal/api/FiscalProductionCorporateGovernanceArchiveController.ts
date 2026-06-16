import { Request, Response } from 'express';
import {
  FiscalProductionCorporateGovernanceArchivePolicy,
  FiscalProductionCorporateGovernanceArchiveBlueprint,
  FiscalProductionNonOperationalContinuityRecordContract,
  FiscalProductionCorporateArchiveScopeInventory,
  FiscalProductionDomainClosureAggregationMatrix,
  FiscalProductionGovernanceArchiveNoFilePlan,
  FiscalProductionContinuityRecordNoPersistencePlan,
  FiscalProductionArchiveNoLegalEffectNotice,
  FiscalProductionArchiveNoExportPlan,
  FiscalProductionArchiveRecipientNoNotificationMatrix,
  FiscalProductionArchiveEvidenceReferenceNoReadMatrix,
  FiscalProductionArchiveNoHashNoSignaturePlan,
  FiscalProductionArchiveNoRealRecordEvidence,
  FiscalProductionArchiveNoRealFileEvidence,
  FiscalProductionArchiveNoRealExportEvidence,
  FiscalProductionCorporateGovernanceArchiveDependencyMatrix,
  FiscalProductionCorporateGovernanceArchiveBlockerRegister,
  FiscalProductionCorporateGovernanceArchiveRiskRegister,
  FiscalProductionCorporateGovernanceArchiveValidator,
  FiscalProductionCorporateGovernanceArchiveEvaluationService,
  FiscalProductionCorporateGovernanceArchiveDecisionService,
  FiscalProductionCorporateGovernanceArchiveReportService,
  FiscalProductionCorporateGovernanceArchiveAuditService
} from '../dedicated-homologation/production-corporate-governance-archive';

export class FiscalProductionCorporateGovernanceArchiveController {
  public static getPolicy(req: Request, res: Response) {
    res.json(FiscalProductionCorporateGovernanceArchivePolicy.getPolicy());
  }

  public static getArchiveBlueprint(req: Request, res: Response) {
    res.json(FiscalProductionCorporateGovernanceArchiveBlueprint.getBlueprint());
  }

  public static getNonOperationalContinuityRecordContract(req: Request, res: Response) {
    res.json(FiscalProductionNonOperationalContinuityRecordContract.getContract());
  }

  public static getArchiveScopeInventory(req: Request, res: Response) {
    res.json(FiscalProductionCorporateArchiveScopeInventory.getInventory());
  }

  public static getDomainClosureAggregationMatrix(req: Request, res: Response) {
    res.json(FiscalProductionDomainClosureAggregationMatrix.getMatrix());
  }

  public static getArchiveNoFilePlan(req: Request, res: Response) {
    res.json(FiscalProductionGovernanceArchiveNoFilePlan.getPlan());
  }

  public static getContinuityRecordNoPersistencePlan(req: Request, res: Response) {
    res.json(FiscalProductionContinuityRecordNoPersistencePlan.getPlan());
  }

  public static getArchiveNoLegalEffectNotice(req: Request, res: Response) {
    res.json(FiscalProductionArchiveNoLegalEffectNotice.getNotice());
  }

  public static getArchiveNoExportPlan(req: Request, res: Response) {
    res.json(FiscalProductionArchiveNoExportPlan.getPlan());
  }

  public static getArchiveRecipientNoNotificationMatrix(req: Request, res: Response) {
    res.json(FiscalProductionArchiveRecipientNoNotificationMatrix.getMatrix());
  }

  public static getArchiveEvidenceReferenceNoReadMatrix(req: Request, res: Response) {
    res.json(FiscalProductionArchiveEvidenceReferenceNoReadMatrix.getMatrix());
  }

  public static getArchiveNoHashNoSignaturePlan(req: Request, res: Response) {
    res.json(FiscalProductionArchiveNoHashNoSignaturePlan.getPlan());
  }

  public static getNoRealRecordEvidence(req: Request, res: Response) {
    res.json(FiscalProductionArchiveNoRealRecordEvidence.getEvidence());
  }

  public static getNoRealFileEvidence(req: Request, res: Response) {
    res.json(FiscalProductionArchiveNoRealFileEvidence.getEvidence());
  }

  public static getNoRealExportEvidence(req: Request, res: Response) {
    res.json(FiscalProductionArchiveNoRealExportEvidence.getEvidence());
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    res.json(FiscalProductionCorporateGovernanceArchiveDependencyMatrix.getMatrix());
  }

  public static getBlockers(req: Request, res: Response) {
    res.json({ blockers: FiscalProductionCorporateGovernanceArchiveBlockerRegister.getBlockers() });
  }

  public static getRisks(req: Request, res: Response) {
    res.json({ risks: FiscalProductionCorporateGovernanceArchiveRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const errors = FiscalProductionCorporateGovernanceArchiveValidator.validate(input);
    res.json({ valid: errors.length === 0, errors });
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const warnings = FiscalProductionCorporateGovernanceArchiveEvaluationService.evaluate(input);
    res.json({ evaluated: true, warnings });
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionCorporateGovernanceArchiveDecisionService.simulateDecision(input);
    res.json(result);
  }

  public static getReport(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionCorporateGovernanceArchiveDecisionService.simulateDecision(input);
    res.json(FiscalProductionCorporateGovernanceArchiveReportService.generateReport(result as any));
  }

  public static getAudit(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionCorporateGovernanceArchiveDecisionService.simulateDecision(input);
    res.json(FiscalProductionCorporateGovernanceArchiveAuditService.generateAuditRecord(result));
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'ok', module: 'Production Corporate Governance Archive', readOnly: true });
  }
}
