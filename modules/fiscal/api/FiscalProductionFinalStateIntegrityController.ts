import { Request, Response } from 'express';
import {
  FiscalProductionFinalStateIntegrityPolicy,
  FiscalProductionFinalStateIntegrityReviewBlueprint,
  FiscalProductionFinalStateReconciliationSimulationMatrix,
  FiscalProductionConsistencyDriftNoVerificationMatrix,
  FiscalProductionSnapshotToLedgerConsistencyNoReadPlan,
  FiscalProductionAttestationConsistencyNoPersistenceReview,
  FiscalProductionFinalStateDiffNoPayloadMatrix,
  FiscalProductionFinalStateCompletenessNoReadMatrix,
  FiscalProductionFinalStateLineageNoExternalVerifyPlan,
  FiscalProductionFinalStateDigestNoHashPlan,
  FiscalProductionFinalStateSignatureNoVerifyPlan,
  FiscalProductionFinalStateProofNoCreatePlan,
  FiscalProductionNoRealIntegrityVerificationEvidence,
  FiscalProductionNoRealConsistencyPersistenceEvidence,
  FiscalProductionNoRealFinalStateProofEvidence,
  FiscalProductionFinalStateIntegrityDependencyMatrix,
  FiscalProductionFinalStateIntegrityBlockerRegister,
  FiscalProductionFinalStateIntegrityRiskRegister,
  FiscalProductionFinalStateIntegrityValidator,
  FiscalProductionFinalStateIntegrityEvaluationService,
  FiscalProductionFinalStateIntegrityDecisionService,
  FiscalProductionFinalStateIntegrityReportService,
  FiscalProductionFinalStateIntegrityAuditService
} from '../dedicated-homologation/production-final-state-ledger-governance/integrity-reconciliation-dry-run';

export class FiscalProductionFinalStateIntegrityController {
  public static getPolicy(req: Request, res: Response) {
    res.json(FiscalProductionFinalStateIntegrityPolicy.getPolicy());
  }

  public static getIntegrityReviewBlueprint(req: Request, res: Response) {
    res.json(FiscalProductionFinalStateIntegrityReviewBlueprint.getBlueprint());
  }

  public static getReconciliationSimulationMatrix(req: Request, res: Response) {
    res.json(FiscalProductionFinalStateReconciliationSimulationMatrix.getMatrix());
  }

  public static getConsistencyDriftNoVerificationMatrix(req: Request, res: Response) {
    res.json(FiscalProductionConsistencyDriftNoVerificationMatrix.getMatrix());
  }

  public static getSnapshotToLedgerConsistencyNoReadPlan(req: Request, res: Response) {
    res.json(FiscalProductionSnapshotToLedgerConsistencyNoReadPlan.getPlan());
  }

  public static getAttestationConsistencyNoPersistenceReview(req: Request, res: Response) {
    res.json(FiscalProductionAttestationConsistencyNoPersistenceReview.getReview());
  }

  public static getFinalStateDiffNoPayloadMatrix(req: Request, res: Response) {
    res.json(FiscalProductionFinalStateDiffNoPayloadMatrix.getMatrix());
  }

  public static getFinalStateCompletenessNoReadMatrix(req: Request, res: Response) {
    res.json(FiscalProductionFinalStateCompletenessNoReadMatrix.getMatrix());
  }

  public static getFinalStateLineageNoExternalVerifyPlan(req: Request, res: Response) {
    res.json(FiscalProductionFinalStateLineageNoExternalVerifyPlan.getPlan());
  }

  public static getFinalStateDigestNoHashPlan(req: Request, res: Response) {
    res.json(FiscalProductionFinalStateDigestNoHashPlan.getPlan());
  }

  public static getFinalStateSignatureNoVerifyPlan(req: Request, res: Response) {
    res.json(FiscalProductionFinalStateSignatureNoVerifyPlan.getPlan());
  }

  public static getFinalStateProofNoCreatePlan(req: Request, res: Response) {
    res.json(FiscalProductionFinalStateProofNoCreatePlan.getPlan());
  }

  public static getNoRealIntegrityVerificationEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealIntegrityVerificationEvidence.getEvidence());
  }

  public static getNoRealConsistencyPersistenceEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealConsistencyPersistenceEvidence.getEvidence());
  }

  public static getNoRealFinalStateProofEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealFinalStateProofEvidence.getEvidence());
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    res.json(FiscalProductionFinalStateIntegrityDependencyMatrix.getMatrix());
  }

  public static getBlockers(req: Request, res: Response) {
    res.json({ blockers: FiscalProductionFinalStateIntegrityBlockerRegister.getBlockers() });
  }

  public static getRisks(req: Request, res: Response) {
    res.json({ risks: FiscalProductionFinalStateIntegrityRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const errors = FiscalProductionFinalStateIntegrityValidator.validate(input);
    res.json({ valid: errors.length === 0, errors });
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const warnings = FiscalProductionFinalStateIntegrityEvaluationService.evaluate(input);
    res.json({ evaluated: true, warnings });
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionFinalStateIntegrityDecisionService.simulateDecision(input);
    res.json(result);
  }

  public static getReport(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionFinalStateIntegrityDecisionService.simulateDecision(input);
    res.json(FiscalProductionFinalStateIntegrityReportService.generateReport(result as any));
  }

  public static getAudit(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionFinalStateIntegrityDecisionService.simulateDecision(input);
    res.json(FiscalProductionFinalStateIntegrityAuditService.generateAuditRecord(result));
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'ok', module: 'Production Final State Integrity Reconciliation, Consistency Drift & No-Verification Review Dry-Run', readOnly: true });
  }
}
