import { Request, Response } from 'express';
import {
  FiscalProductionFinalGoLiveReadinessPolicy,
  FiscalProductionFinalReadinessAggregationBlueprint,
  FiscalProductionExecutiveQuorumSimulationMatrix,
  FiscalProductionStakeholderEligibilityNoAuthorityMatrix,
  FiscalProductionDomainEvidenceReviewNoReadMatrix,
  FiscalProductionFinalGoLiveVoteSimulation,
  FiscalProductionNonBindingDecisionMatrix,
  FiscalProductionNoRealExecutiveApprovalEvidence,
  FiscalProductionNoRealActivationAuthorityEvidence,
  FiscalProductionNoRealGateUnlockEvidence,
  FiscalProductionNoRealTokenIssueEvidence,
  FiscalProductionFinalReadinessNoExecutionPlan,
  FiscalProductionFinalReadinessNoRoutingPlan,
  FiscalProductionFinalReadinessNoRuntimePlan,
  FiscalProductionFinalReadinessNoDatabasePlan,
  FiscalProductionFinalReadinessNoExternalIntegrationPlan,
  FiscalProductionFinalGoLiveReadinessDependencyMatrix,
  FiscalProductionFinalGoLiveReadinessBlockerRegister,
  FiscalProductionFinalGoLiveReadinessRiskRegister,
  FiscalProductionFinalGoLiveReadinessValidator,
  FiscalProductionFinalGoLiveReadinessEvaluationService,
  FiscalProductionFinalGoLiveReadinessDecisionService,
  FiscalProductionFinalGoLiveReadinessReportService,
  FiscalProductionFinalGoLiveReadinessAuditService
} from '../dedicated-homologation/production-final-go-live-command-center/readiness-decision-dry-run';

export class FiscalProductionFinalGoLiveReadinessController {
  public static getPolicy(req: Request, res: Response) {
    res.json(FiscalProductionFinalGoLiveReadinessPolicy.getPolicy());
  }

  public static getFinalReadinessAggregationBlueprint(req: Request, res: Response) {
    res.json(FiscalProductionFinalReadinessAggregationBlueprint.getBlueprint());
  }

  public static getExecutiveQuorumSimulationMatrix(req: Request, res: Response) {
    res.json(FiscalProductionExecutiveQuorumSimulationMatrix.getMatrix());
  }

  public static getStakeholderEligibilityNoAuthorityMatrix(req: Request, res: Response) {
    res.json(FiscalProductionStakeholderEligibilityNoAuthorityMatrix.getMatrix());
  }

  public static getDomainEvidenceReviewNoReadMatrix(req: Request, res: Response) {
    res.json(FiscalProductionDomainEvidenceReviewNoReadMatrix.getMatrix());
  }

  public static getFinalGoLiveVoteSimulation(req: Request, res: Response) {
    res.json(FiscalProductionFinalGoLiveVoteSimulation.getSimulation());
  }

  public static getNonBindingDecisionMatrix(req: Request, res: Response) {
    res.json(FiscalProductionNonBindingDecisionMatrix.getMatrix());
  }

  public static getNoRealExecutiveApprovalEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealExecutiveApprovalEvidence.getEvidence());
  }

  public static getNoRealActivationAuthorityEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealActivationAuthorityEvidence.getEvidence());
  }

  public static getNoRealGateUnlockEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealGateUnlockEvidence.getEvidence());
  }

  public static getNoRealTokenIssueEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealTokenIssueEvidence.getEvidence());
  }

  public static getNoExecutionPlan(req: Request, res: Response) {
    res.json(FiscalProductionFinalReadinessNoExecutionPlan.getPlan());
  }

  public static getNoRoutingPlan(req: Request, res: Response) {
    res.json(FiscalProductionFinalReadinessNoRoutingPlan.getPlan());
  }

  public static getNoRuntimePlan(req: Request, res: Response) {
    res.json(FiscalProductionFinalReadinessNoRuntimePlan.getPlan());
  }

  public static getNoDatabasePlan(req: Request, res: Response) {
    res.json(FiscalProductionFinalReadinessNoDatabasePlan.getPlan());
  }

  public static getNoExternalIntegrationPlan(req: Request, res: Response) {
    res.json(FiscalProductionFinalReadinessNoExternalIntegrationPlan.getPlan());
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    res.json(FiscalProductionFinalGoLiveReadinessDependencyMatrix.getMatrix());
  }

  public static getBlockers(req: Request, res: Response) {
    res.json({ blockers: FiscalProductionFinalGoLiveReadinessBlockerRegister.getBlockers() });
  }

  public static getRisks(req: Request, res: Response) {
    res.json({ risks: FiscalProductionFinalGoLiveReadinessRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const errors = FiscalProductionFinalGoLiveReadinessValidator.validate(input);
    res.json({ valid: errors.length === 0, errors });
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const warnings = FiscalProductionFinalGoLiveReadinessEvaluationService.evaluate(input);
    res.json({ evaluated: true, warnings });
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionFinalGoLiveReadinessDecisionService.simulateDecision(input);
    res.json(result);
  }

  public static getReport(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionFinalGoLiveReadinessDecisionService.simulateDecision(input);
    res.json(FiscalProductionFinalGoLiveReadinessReportService.generateReport(result));
  }

  public static getAudit(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionFinalGoLiveReadinessDecisionService.simulateDecision(input);
    res.json(FiscalProductionFinalGoLiveReadinessAuditService.generateAuditRecord(result));
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'ok', module: 'Production Final Go-Live Readiness Aggregation, Executive Quorum & Non-Binding Decision Dry-Run', readOnly: true });
  }
}
