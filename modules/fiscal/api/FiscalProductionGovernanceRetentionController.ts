import { Request, Response } from 'express';
import {
  FiscalProductionGovernanceRetentionPolicy,
  FiscalProductionGovernanceRetentionBlueprint,
  FiscalProductionDormantCustodyNonMutationContract,
  FiscalProductionRetentionScopeInventory,
  FiscalProductionDormancyScopeInventory,
  FiscalProductionRetentionLifecycleNoMutationMatrix,
  FiscalProductionCustodyStateNoPersistencePlan,
  FiscalProductionLegalHoldNoApplyPlan,
  FiscalProductionExpirationDeletionNoExecuteMatrix,
  FiscalProductionArchiveMovementNoOpPlan,
  FiscalProductionRetentionEvidenceReferenceNoReadMatrix,
  FiscalProductionRetentionNoHashNoSignaturePlan,
  FiscalProductionNoRealRetentionEvidence,
  FiscalProductionNoRealCustodyEvidence,
  FiscalProductionNoRealLifecycleMutationEvidence,
  FiscalProductionGovernanceRetentionDependencyMatrix,
  FiscalProductionGovernanceRetentionBlockerRegister,
  FiscalProductionGovernanceRetentionRiskRegister,
  FiscalProductionGovernanceRetentionValidator,
  FiscalProductionGovernanceRetentionEvaluationService,
  FiscalProductionGovernanceRetentionDecisionService,
  FiscalProductionGovernanceRetentionReportService,
  FiscalProductionGovernanceRetentionAuditService
} from '../dedicated-homologation/production-governance-retention-dormancy';

export class FiscalProductionGovernanceRetentionController {
  public static getPolicy(req: Request, res: Response) {
    res.json(FiscalProductionGovernanceRetentionPolicy.getPolicy());
  }

  public static getRetentionBlueprint(req: Request, res: Response) {
    res.json(FiscalProductionGovernanceRetentionBlueprint.getBlueprint());
  }

  public static getDormantCustodyNonMutationContract(req: Request, res: Response) {
    res.json(FiscalProductionDormantCustodyNonMutationContract.getContract());
  }

  public static getRetentionScopeInventory(req: Request, res: Response) {
    res.json(FiscalProductionRetentionScopeInventory.getInventory());
  }

  public static getDormancyScopeInventory(req: Request, res: Response) {
    res.json(FiscalProductionDormancyScopeInventory.getInventory());
  }

  public static getRetentionLifecycleNoMutationMatrix(req: Request, res: Response) {
    res.json(FiscalProductionRetentionLifecycleNoMutationMatrix.getMatrix());
  }

  public static getCustodyStateNoPersistencePlan(req: Request, res: Response) {
    res.json(FiscalProductionCustodyStateNoPersistencePlan.getPlan());
  }

  public static getLegalHoldNoApplyPlan(req: Request, res: Response) {
    res.json(FiscalProductionLegalHoldNoApplyPlan.getPlan());
  }

  public static getExpirationDeletionNoExecuteMatrix(req: Request, res: Response) {
    res.json(FiscalProductionExpirationDeletionNoExecuteMatrix.getMatrix());
  }

  public static getArchiveMovementNoOpPlan(req: Request, res: Response) {
    res.json(FiscalProductionArchiveMovementNoOpPlan.getPlan());
  }

  public static getRetentionEvidenceReferenceNoReadMatrix(req: Request, res: Response) {
    res.json(FiscalProductionRetentionEvidenceReferenceNoReadMatrix.getMatrix());
  }

  public static getRetentionNoHashNoSignaturePlan(req: Request, res: Response) {
    res.json(FiscalProductionRetentionNoHashNoSignaturePlan.getPlan());
  }

  public static getNoRealRetentionEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealRetentionEvidence.getEvidence());
  }

  public static getNoRealCustodyEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealCustodyEvidence.getEvidence());
  }

  public static getNoRealLifecycleMutationEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealLifecycleMutationEvidence.getEvidence());
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    res.json(FiscalProductionGovernanceRetentionDependencyMatrix.getMatrix());
  }

  public static getBlockers(req: Request, res: Response) {
    res.json({ blockers: FiscalProductionGovernanceRetentionBlockerRegister.getBlockers() });
  }

  public static getRisks(req: Request, res: Response) {
    res.json({ risks: FiscalProductionGovernanceRetentionRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const errors = FiscalProductionGovernanceRetentionValidator.validate(input);
    res.json({ valid: errors.length === 0, errors });
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const warnings = FiscalProductionGovernanceRetentionEvaluationService.evaluate(input);
    res.json({ evaluated: true, warnings });
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionGovernanceRetentionDecisionService.simulateDecision(input);
    res.json(result);
  }

  public static getReport(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionGovernanceRetentionDecisionService.simulateDecision(input);
    res.json(FiscalProductionGovernanceRetentionReportService.generateReport(result as any));
  }

  public static getAudit(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionGovernanceRetentionDecisionService.simulateDecision(input);
    res.json(FiscalProductionGovernanceRetentionAuditService.generateAuditRecord(result));
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'ok', module: 'Production Governance Retention Dormancy', readOnly: true });
  }
}
