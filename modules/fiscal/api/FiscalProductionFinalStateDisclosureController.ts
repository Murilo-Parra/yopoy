import { Request, Response } from 'express';
import {
  FiscalProductionFinalStateDisclosurePolicy,
  FiscalProductionFinalStateDisclosureReviewBlueprint,
  FiscalProductionFinalStateGovernanceReviewMatrix,
  FiscalProductionFinalStateNoExportHandoffPlan,
  FiscalProductionFinalStateDisclosureScopeMatrix,
  FiscalProductionFinalStateRecipientEligibilityNoNotifyMatrix,
  FiscalProductionFinalStateDisclosurePackageNoFilePlan,
  FiscalProductionFinalStateDisclosureRedactionNoReadMatrix,
  FiscalProductionFinalStateDisclosureNoExternalSubmissionPlan,
  FiscalProductionFinalStateDisclosureNoNotificationPlan,
  FiscalProductionFinalStateDisclosureNoPersistencePlan,
  FiscalProductionFinalStateDisclosureNoHashPlan,
  FiscalProductionFinalStateDisclosureNoSignaturePlan,
  FiscalProductionFinalStateDisclosureNoLegalEffectNotice,
  FiscalProductionNoRealDisclosureExportEvidence,
  FiscalProductionNoRealDisclosurePackageEvidence,
  FiscalProductionNoRealDisclosureNotificationEvidence,
  FiscalProductionFinalStateDisclosureDependencyMatrix,
  FiscalProductionFinalStateDisclosureBlockerRegister,
  FiscalProductionFinalStateDisclosureRiskRegister,
  FiscalProductionFinalStateDisclosureValidator,
  FiscalProductionFinalStateDisclosureEvaluationService,
  FiscalProductionFinalStateDisclosureDecisionService,
  FiscalProductionFinalStateDisclosureReportService,
  FiscalProductionFinalStateDisclosureAuditService
} from '../dedicated-homologation/production-final-state-ledger-governance/disclosure-review-dry-run';

export class FiscalProductionFinalStateDisclosureController {
  public static getPolicy(req: Request, res: Response) {
    res.json(FiscalProductionFinalStateDisclosurePolicy.getPolicy());
  }

  public static getDisclosureReviewBlueprint(req: Request, res: Response) {
    res.json(FiscalProductionFinalStateDisclosureReviewBlueprint.getBlueprint());
  }

  public static getGovernanceReviewMatrix(req: Request, res: Response) {
    res.json(FiscalProductionFinalStateGovernanceReviewMatrix.getMatrix());
  }

  public static getNoExportHandoffPlan(req: Request, res: Response) {
    res.json(FiscalProductionFinalStateNoExportHandoffPlan.getPlan());
  }

  public static getDisclosureScopeMatrix(req: Request, res: Response) {
    res.json(FiscalProductionFinalStateDisclosureScopeMatrix.getMatrix());
  }

  public static getRecipientEligibilityNoNotifyMatrix(req: Request, res: Response) {
    res.json(FiscalProductionFinalStateRecipientEligibilityNoNotifyMatrix.getMatrix());
  }

  public static getDisclosurePackageNoFilePlan(req: Request, res: Response) {
    res.json(FiscalProductionFinalStateDisclosurePackageNoFilePlan.getPlan());
  }

  public static getDisclosureRedactionNoReadMatrix(req: Request, res: Response) {
    res.json(FiscalProductionFinalStateDisclosureRedactionNoReadMatrix.getMatrix());
  }

  public static getDisclosureNoExternalSubmissionPlan(req: Request, res: Response) {
    res.json(FiscalProductionFinalStateDisclosureNoExternalSubmissionPlan.getPlan());
  }

  public static getDisclosureNoNotificationPlan(req: Request, res: Response) {
    res.json(FiscalProductionFinalStateDisclosureNoNotificationPlan.getPlan());
  }

  public static getDisclosureNoPersistencePlan(req: Request, res: Response) {
    res.json(FiscalProductionFinalStateDisclosureNoPersistencePlan.getPlan());
  }

  public static getDisclosureNoHashPlan(req: Request, res: Response) {
    res.json(FiscalProductionFinalStateDisclosureNoHashPlan.getPlan());
  }

  public static getDisclosureNoSignaturePlan(req: Request, res: Response) {
    res.json(FiscalProductionFinalStateDisclosureNoSignaturePlan.getPlan());
  }

  public static getDisclosureNoLegalEffectNotice(req: Request, res: Response) {
    res.json(FiscalProductionFinalStateDisclosureNoLegalEffectNotice.getNotice());
  }

  public static getNoRealDisclosureExportEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealDisclosureExportEvidence.getEvidence());
  }

  public static getNoRealDisclosurePackageEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealDisclosurePackageEvidence.getEvidence());
  }

  public static getNoRealDisclosureNotificationEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealDisclosureNotificationEvidence.getEvidence());
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    res.json(FiscalProductionFinalStateDisclosureDependencyMatrix.getMatrix());
  }

  public static getBlockers(req: Request, res: Response) {
    res.json({ blockers: FiscalProductionFinalStateDisclosureBlockerRegister.getBlockers() });
  }

  public static getRisks(req: Request, res: Response) {
    res.json({ risks: FiscalProductionFinalStateDisclosureRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const errors = FiscalProductionFinalStateDisclosureValidator.validate(input);
    res.json({ valid: errors.length === 0, errors });
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const warnings = FiscalProductionFinalStateDisclosureEvaluationService.evaluate(input);
    res.json({ evaluated: true, warnings });
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionFinalStateDisclosureDecisionService.simulateDecision(input);
    res.json(result);
  }

  public static getReport(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionFinalStateDisclosureDecisionService.simulateDecision(input);
    res.json(FiscalProductionFinalStateDisclosureReportService.generateReport(result as any));
  }

  public static getAudit(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionFinalStateDisclosureDecisionService.simulateDecision(input);
    res.json(FiscalProductionFinalStateDisclosureAuditService.generateAuditRecord(result));
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'ok', module: 'Production Final State Disclosure, Governance Review & No-Export Handoff Dry-Run', readOnly: true });
  }
}
