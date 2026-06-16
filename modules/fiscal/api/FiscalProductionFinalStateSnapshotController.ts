import { Request, Response } from 'express';
import {
  FiscalProductionFinalStateSnapshotPolicy,
  FiscalProductionFinalStateSnapshotBlueprint,
  FiscalProductionVirtualLedgerEntrySimulation,
  FiscalProductionNoActivationAttestationEnvelope,
  FiscalProductionSnapshotTimestampNoAuthorityMatrix,
  FiscalProductionSnapshotCompletenessReviewMatrix,
  FiscalProductionSnapshotLineageNoVerifyMatrix,
  FiscalProductionSnapshotNoPersistencePlan,
  FiscalProductionAttestationNoPersistencePlan,
  FiscalProductionSnapshotNoRealHashPlan,
  FiscalProductionSnapshotNoRealSignaturePlan,
  FiscalProductionSnapshotNoLegalProofNotice,
  FiscalProductionNoRealLedgerEntryEvidence,
  FiscalProductionNoRealSnapshotPersistenceEvidence,
  FiscalProductionNoRealAttestationPersistenceEvidence,
  FiscalProductionFinalStateSnapshotDependencyMatrix,
  FiscalProductionFinalStateSnapshotBlockerRegister,
  FiscalProductionFinalStateSnapshotRiskRegister,
  FiscalProductionFinalStateSnapshotValidator,
  FiscalProductionFinalStateSnapshotEvaluationService,
  FiscalProductionFinalStateSnapshotDecisionService,
  FiscalProductionFinalStateSnapshotReportService,
  FiscalProductionFinalStateSnapshotAuditService
} from '../dedicated-homologation/production-final-state-ledger-governance/final-state-snapshot-dry-run';

export class FiscalProductionFinalStateSnapshotController {
  public static getPolicy(req: Request, res: Response) {
    res.json(FiscalProductionFinalStateSnapshotPolicy.getPolicy());
  }

  public static getFinalStateSnapshotBlueprint(req: Request, res: Response) {
    res.json(FiscalProductionFinalStateSnapshotBlueprint.getBlueprint());
  }

  public static getVirtualLedgerEntrySimulation(req: Request, res: Response) {
    res.json(FiscalProductionVirtualLedgerEntrySimulation.getSimulation());
  }

  public static getNoActivationAttestationEnvelope(req: Request, res: Response) {
    res.json(FiscalProductionNoActivationAttestationEnvelope.getEnvelope());
  }

  public static getSnapshotTimestampNoAuthorityMatrix(req: Request, res: Response) {
    res.json(FiscalProductionSnapshotTimestampNoAuthorityMatrix.getMatrix());
  }

  public static getSnapshotCompletenessReviewMatrix(req: Request, res: Response) {
    res.json(FiscalProductionSnapshotCompletenessReviewMatrix.getMatrix());
  }

  public static getSnapshotLineageNoVerifyMatrix(req: Request, res: Response) {
    res.json(FiscalProductionSnapshotLineageNoVerifyMatrix.getMatrix());
  }

  public static getSnapshotNoPersistencePlan(req: Request, res: Response) {
    res.json(FiscalProductionSnapshotNoPersistencePlan.getPlan());
  }

  public static getAttestationNoPersistencePlan(req: Request, res: Response) {
    res.json(FiscalProductionAttestationNoPersistencePlan.getPlan());
  }

  public static getSnapshotNoRealHashPlan(req: Request, res: Response) {
    res.json(FiscalProductionSnapshotNoRealHashPlan.getPlan());
  }

  public static getSnapshotNoRealSignaturePlan(req: Request, res: Response) {
    res.json(FiscalProductionSnapshotNoRealSignaturePlan.getPlan());
  }

  public static getSnapshotNoLegalProofNotice(req: Request, res: Response) {
    res.json(FiscalProductionSnapshotNoLegalProofNotice.getNotice());
  }
  
  public static getNoRealLedgerEntryEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealLedgerEntryEvidence.getEvidence());
  }
  
  public static getNoRealSnapshotPersistenceEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealSnapshotPersistenceEvidence.getEvidence());
  }

  public static getNoRealAttestationPersistenceEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealAttestationPersistenceEvidence.getEvidence());
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    res.json(FiscalProductionFinalStateSnapshotDependencyMatrix.getMatrix());
  }

  public static getBlockers(req: Request, res: Response) {
    res.json({ blockers: FiscalProductionFinalStateSnapshotBlockerRegister.getBlockers() });
  }

  public static getRisks(req: Request, res: Response) {
    res.json({ risks: FiscalProductionFinalStateSnapshotRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const errors = FiscalProductionFinalStateSnapshotValidator.validate(input);
    res.json({ valid: errors.length === 0, errors });
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const warnings = FiscalProductionFinalStateSnapshotEvaluationService.evaluate(input);
    res.json({ evaluated: true, warnings });
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionFinalStateSnapshotDecisionService.simulateDecision(input);
    res.json(result);
  }

  public static getReport(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionFinalStateSnapshotDecisionService.simulateDecision(input);
    res.json(FiscalProductionFinalStateSnapshotReportService.generateReport(result as any));
  }

  public static getAudit(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionFinalStateSnapshotDecisionService.simulateDecision(input);
    res.json(FiscalProductionFinalStateSnapshotAuditService.generateAuditRecord(result));
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'ok', module: 'Production Final State Snapshot, Virtual Ledger Entry & No-Persistence Attestation Dry-Run', readOnly: true });
  }
}
