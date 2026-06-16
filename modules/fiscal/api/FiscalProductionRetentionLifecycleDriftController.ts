import { Request, Response } from 'express';
import {
  FiscalProductionRetentionLifecycleDriftPolicy,
  FiscalProductionRetentionLifecycleDriftReviewBlueprint,
  FiscalProductionLifecycleDriftSimulationMatrix,
  FiscalProductionExpirationWindowNoEvaluatePlan,
  FiscalProductionDeletionEligibilityNoExecuteMatrix,
  FiscalProductionDormancyContinuityNoMutationPlan,
  FiscalProductionRetentionPolicyVersionNoApplyMatrix,
  FiscalProductionArchiveStateTransitionNoOpPlan,
  FiscalProductionCustodyStateDriftNoPersistenceMatrix,
  FiscalProductionLifecycleDriftNoRecordPlan,
  FiscalProductionRetentionDriftNoticeNoNotificationPlan,
  FiscalProductionNoRealExpirationEvidence,
  FiscalProductionNoRealDeletionExecutionEvidence,
  FiscalProductionNoRealLifecycleDriftMutationEvidence,
  FiscalProductionRetentionLifecycleDriftDependencyMatrix,
  FiscalProductionRetentionLifecycleDriftBlockerRegister,
  FiscalProductionRetentionLifecycleDriftRiskRegister,
  FiscalProductionRetentionLifecycleDriftValidator,
  FiscalProductionRetentionLifecycleDriftEvaluationService,
  FiscalProductionRetentionLifecycleDriftDecisionService,
  FiscalProductionRetentionLifecycleDriftReportService,
  FiscalProductionRetentionLifecycleDriftAuditService
} from '../dedicated-homologation/production-governance-retention-dormancy/lifecycle-drift-dry-run';

export class FiscalProductionRetentionLifecycleDriftController {
  public static getPolicy(req: Request, res: Response) {
    res.json(FiscalProductionRetentionLifecycleDriftPolicy.getPolicy());
  }

  public static getLifecycleDriftReviewBlueprint(req: Request, res: Response) {
    res.json(FiscalProductionRetentionLifecycleDriftReviewBlueprint.getBlueprint());
  }

  public static getLifecycleDriftSimulationMatrix(req: Request, res: Response) {
    res.json(FiscalProductionLifecycleDriftSimulationMatrix.getMatrix());
  }

  public static getExpirationWindowNoEvaluatePlan(req: Request, res: Response) {
    res.json(FiscalProductionExpirationWindowNoEvaluatePlan.getPlan());
  }

  public static getDeletionEligibilityNoExecuteMatrix(req: Request, res: Response) {
    res.json(FiscalProductionDeletionEligibilityNoExecuteMatrix.getMatrix());
  }

  public static getDormancyContinuityNoMutationPlan(req: Request, res: Response) {
    res.json(FiscalProductionDormancyContinuityNoMutationPlan.getPlan());
  }

  public static getRetentionPolicyVersionNoApplyMatrix(req: Request, res: Response) {
    res.json(FiscalProductionRetentionPolicyVersionNoApplyMatrix.getMatrix());
  }

  public static getArchiveStateTransitionNoOpPlan(req: Request, res: Response) {
    res.json(FiscalProductionArchiveStateTransitionNoOpPlan.getPlan());
  }

  public static getCustodyStateDriftNoPersistenceMatrix(req: Request, res: Response) {
    res.json(FiscalProductionCustodyStateDriftNoPersistenceMatrix.getMatrix());
  }

  public static getLifecycleDriftNoRecordPlan(req: Request, res: Response) {
    res.json(FiscalProductionLifecycleDriftNoRecordPlan.getPlan());
  }

  public static getRetentionDriftNoticeNoNotificationPlan(req: Request, res: Response) {
    res.json(FiscalProductionRetentionDriftNoticeNoNotificationPlan.getPlan());
  }

  public static getNoRealExpirationEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealExpirationEvidence.getEvidence());
  }

  public static getNoRealDeletionExecutionEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealDeletionExecutionEvidence.getEvidence());
  }

  public static getNoRealLifecycleDriftMutationEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealLifecycleDriftMutationEvidence.getEvidence());
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    res.json(FiscalProductionRetentionLifecycleDriftDependencyMatrix.getMatrix());
  }

  public static getBlockers(req: Request, res: Response) {
    res.json({ blockers: FiscalProductionRetentionLifecycleDriftBlockerRegister.getBlockers() });
  }

  public static getRisks(req: Request, res: Response) {
    res.json({ risks: FiscalProductionRetentionLifecycleDriftRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const errors = FiscalProductionRetentionLifecycleDriftValidator.validate(input);
    res.json({ valid: errors.length === 0, errors });
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const warnings = FiscalProductionRetentionLifecycleDriftEvaluationService.evaluate(input);
    res.json({ evaluated: true, warnings });
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionRetentionLifecycleDriftDecisionService.simulateDecision(input);
    res.json(result);
  }

  public static getReport(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionRetentionLifecycleDriftDecisionService.simulateDecision(input);
    res.json(FiscalProductionRetentionLifecycleDriftReportService.generateReport(result as any));
  }

  public static getAudit(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionRetentionLifecycleDriftDecisionService.simulateDecision(input);
    res.json(FiscalProductionRetentionLifecycleDriftAuditService.generateAuditRecord(result));
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'ok', module: 'Production Retention Lifecycle Drift', readOnly: true });
  }
}
