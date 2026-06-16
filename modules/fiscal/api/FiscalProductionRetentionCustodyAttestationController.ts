import { Request, Response } from 'express';
import {
  FiscalProductionRetentionCustodyAttestationPolicy,
  FiscalProductionRetentionCustodyAttestationBlueprint,
  FiscalProductionCustodyAttestationNonBindingMatrix,
  FiscalProductionLegalHoldReviewNoApplyMatrix,
  FiscalProductionNoDeletionHandoffPlan,
  FiscalProductionDormantCustodyReviewMatrix,
  FiscalProductionRetentionEligibilityNoMutationMatrix,
  FiscalProductionExpirationSuppressionNoExecutePlan,
  FiscalProductionDeletionSuppressionNoExecutePlan,
  FiscalProductionArchiveReclassificationNoOpMatrix,
  FiscalProductionCustodyChainNoPersistencePlan,
  FiscalProductionRetentionNoticeNoNotificationPlan,
  FiscalProductionCustodyAttestationNoLegalEffectNotice,
  FiscalProductionNoRealCustodyAttestationEvidence,
  FiscalProductionNoRealLegalHoldEvidence,
  FiscalProductionNoRealDeletionEvidence,
  FiscalProductionRetentionCustodyAttestationDependencyMatrix,
  FiscalProductionRetentionCustodyAttestationBlockerRegister,
  FiscalProductionRetentionCustodyAttestationRiskRegister,
  FiscalProductionRetentionCustodyAttestationValidator,
  FiscalProductionRetentionCustodyAttestationEvaluationService,
  FiscalProductionRetentionCustodyAttestationDecisionService,
  FiscalProductionRetentionCustodyAttestationReportService,
  FiscalProductionRetentionCustodyAttestationAuditService
} from '../dedicated-homologation/production-governance-retention-dormancy/custody-attestation-dry-run';

export class FiscalProductionRetentionCustodyAttestationController {
  public static getPolicy(req: Request, res: Response) {
    res.json(FiscalProductionRetentionCustodyAttestationPolicy.getPolicy());
  }

  public static getCustodyAttestationBlueprint(req: Request, res: Response) {
    res.json(FiscalProductionRetentionCustodyAttestationBlueprint.getBlueprint());
  }

  public static getCustodyAttestationNonBindingMatrix(req: Request, res: Response) {
    res.json(FiscalProductionCustodyAttestationNonBindingMatrix.getMatrix());
  }

  public static getLegalHoldReviewNoApplyMatrix(req: Request, res: Response) {
    res.json(FiscalProductionLegalHoldReviewNoApplyMatrix.getMatrix());
  }

  public static getNoDeletionHandoffPlan(req: Request, res: Response) {
    res.json(FiscalProductionNoDeletionHandoffPlan.getPlan());
  }

  public static getDormantCustodyReviewMatrix(req: Request, res: Response) {
    res.json(FiscalProductionDormantCustodyReviewMatrix.getMatrix());
  }

  public static getRetentionEligibilityNoMutationMatrix(req: Request, res: Response) {
    res.json(FiscalProductionRetentionEligibilityNoMutationMatrix.getMatrix());
  }

  public static getExpirationSuppressionNoExecutePlan(req: Request, res: Response) {
    res.json(FiscalProductionExpirationSuppressionNoExecutePlan.getPlan());
  }

  public static getDeletionSuppressionNoExecutePlan(req: Request, res: Response) {
    res.json(FiscalProductionDeletionSuppressionNoExecutePlan.getPlan());
  }

  public static getArchiveReclassificationNoOpMatrix(req: Request, res: Response) {
    res.json(FiscalProductionArchiveReclassificationNoOpMatrix.getMatrix());
  }

  public static getCustodyChainNoPersistencePlan(req: Request, res: Response) {
    res.json(FiscalProductionCustodyChainNoPersistencePlan.getPlan());
  }

  public static getRetentionNoticeNoNotificationPlan(req: Request, res: Response) {
    res.json(FiscalProductionRetentionNoticeNoNotificationPlan.getPlan());
  }

  public static getCustodyAttestationNoLegalEffectNotice(req: Request, res: Response) {
    res.json(FiscalProductionCustodyAttestationNoLegalEffectNotice.getNotice());
  }

  public static getNoRealCustodyAttestationEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealCustodyAttestationEvidence.getEvidence());
  }

  public static getNoRealLegalHoldEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealLegalHoldEvidence.getEvidence());
  }

  public static getNoRealDeletionEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealDeletionEvidence.getEvidence());
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    res.json(FiscalProductionRetentionCustodyAttestationDependencyMatrix.getMatrix());
  }

  public static getBlockers(req: Request, res: Response) {
    res.json({ blockers: FiscalProductionRetentionCustodyAttestationBlockerRegister.getBlockers() });
  }

  public static getRisks(req: Request, res: Response) {
    res.json({ risks: FiscalProductionRetentionCustodyAttestationRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const errors = FiscalProductionRetentionCustodyAttestationValidator.validate(input);
    res.json({ valid: errors.length === 0, errors });
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const warnings = FiscalProductionRetentionCustodyAttestationEvaluationService.evaluate(input);
    res.json({ evaluated: true, warnings });
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionRetentionCustodyAttestationDecisionService.simulateDecision(input);
    res.json(result);
  }

  public static getReport(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionRetentionCustodyAttestationDecisionService.simulateDecision(input);
    res.json(FiscalProductionRetentionCustodyAttestationReportService.generateReport(result as any));
  }

  public static getAudit(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionRetentionCustodyAttestationDecisionService.simulateDecision(input);
    res.json(FiscalProductionRetentionCustodyAttestationAuditService.generateAuditRecord(result));
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'ok', module: 'Production Retention Custody Attestation', readOnly: true });
  }
}
