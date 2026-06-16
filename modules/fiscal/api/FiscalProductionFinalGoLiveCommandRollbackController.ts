import { Request, Response } from 'express';
import {
  FiscalProductionFinalGoLiveCommandRollbackPolicy,
  FiscalProductionCommandRollbackScenarioBlueprint,
  FiscalProductionCommandAbortPathNoOpPlan,
  FiscalProductionPostCommandEventHorizonSimulationMatrix,
  FiscalProductionRollbackExecutionDenialMatrix,
  FiscalProductionAbortExecutionDenialMatrix,
  FiscalProductionFallbackExecutionDenialPlan,
  FiscalProductionTrafficReversionDenialMatrix,
  FiscalProductionRuntimeContainmentDenialPlan,
  FiscalProductionEmergencyHoldNoActivationPlan,
  FiscalProductionLegacyContinuityAfterDeniedCommandPlan,
  FiscalProductionV2ShutdownNoExecuteMatrix,
  FiscalProductionNoRealRollbackFromCommandEvidence,
  FiscalProductionNoRealAbortFromCommandEvidence,
  FiscalProductionNoRealFallbackFromCommandEvidence,
  FiscalProductionNoRealTrafficReversionEvidence,
  FiscalProductionFinalGoLiveCommandRollbackDependencyMatrix,
  FiscalProductionFinalGoLiveCommandRollbackBlockerRegister,
  FiscalProductionFinalGoLiveCommandRollbackRiskRegister,
  FiscalProductionFinalGoLiveCommandRollbackValidator,
  FiscalProductionFinalGoLiveCommandRollbackEvaluationService,
  FiscalProductionFinalGoLiveCommandRollbackDecisionService,
  FiscalProductionFinalGoLiveCommandRollbackReportService,
  FiscalProductionFinalGoLiveCommandRollbackAuditService
} from '../dedicated-homologation/production-final-go-live-command-center/command-rollback-dry-run';

export class FiscalProductionFinalGoLiveCommandRollbackController {
  public static getPolicy(req: Request, res: Response) {
    res.json(FiscalProductionFinalGoLiveCommandRollbackPolicy.getPolicy());
  }

  public static getCommandRollbackScenarioBlueprint(req: Request, res: Response) {
    res.json(FiscalProductionCommandRollbackScenarioBlueprint.getBlueprint());
  }

  public static getCommandAbortPathNoOpPlan(req: Request, res: Response) {
    res.json(FiscalProductionCommandAbortPathNoOpPlan.getPlan());
  }

  public static getPostCommandEventHorizonSimulationMatrix(req: Request, res: Response) {
    res.json(FiscalProductionPostCommandEventHorizonSimulationMatrix.getMatrix());
  }

  public static getRollbackExecutionDenialMatrix(req: Request, res: Response) {
    res.json(FiscalProductionRollbackExecutionDenialMatrix.getMatrix());
  }

  public static getAbortExecutionDenialMatrix(req: Request, res: Response) {
    res.json(FiscalProductionAbortExecutionDenialMatrix.getMatrix());
  }

  public static getFallbackExecutionDenialPlan(req: Request, res: Response) {
    res.json(FiscalProductionFallbackExecutionDenialPlan.getPlan());
  }

  public static getTrafficReversionDenialMatrix(req: Request, res: Response) {
    res.json(FiscalProductionTrafficReversionDenialMatrix.getMatrix());
  }

  public static getRuntimeContainmentDenialPlan(req: Request, res: Response) {
    res.json(FiscalProductionRuntimeContainmentDenialPlan.getPlan());
  }

  public static getEmergencyHoldNoActivationPlan(req: Request, res: Response) {
    res.json(FiscalProductionEmergencyHoldNoActivationPlan.getPlan());
  }

  public static getLegacyContinuityAfterDeniedCommandPlan(req: Request, res: Response) {
    res.json(FiscalProductionLegacyContinuityAfterDeniedCommandPlan.getPlan());
  }

  public static getV2ShutdownNoExecuteMatrix(req: Request, res: Response) {
    res.json(FiscalProductionV2ShutdownNoExecuteMatrix.getMatrix());
  }

  public static getNoRealRollbackFromCommandEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealRollbackFromCommandEvidence.getEvidence());
  }

  public static getNoRealAbortFromCommandEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealAbortFromCommandEvidence.getEvidence());
  }

  public static getNoRealFallbackFromCommandEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealFallbackFromCommandEvidence.getEvidence());
  }

  public static getNoRealTrafficReversionEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealTrafficReversionEvidence.getEvidence());
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    res.json(FiscalProductionFinalGoLiveCommandRollbackDependencyMatrix.getMatrix());
  }

  public static getBlockers(req: Request, res: Response) {
    res.json({ blockers: FiscalProductionFinalGoLiveCommandRollbackBlockerRegister.getBlockers() });
  }

  public static getRisks(req: Request, res: Response) {
    res.json({ risks: FiscalProductionFinalGoLiveCommandRollbackRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const errors = FiscalProductionFinalGoLiveCommandRollbackValidator.validate(input);
    res.json({ valid: errors.length === 0, errors });
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const warnings = FiscalProductionFinalGoLiveCommandRollbackEvaluationService.evaluate(input);
    res.json({ evaluated: true, warnings });
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionFinalGoLiveCommandRollbackDecisionService.simulateDecision(input);
    res.json(result);
  }

  public static getReport(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionFinalGoLiveCommandRollbackDecisionService.simulateDecision(input);
    res.json(FiscalProductionFinalGoLiveCommandRollbackReportService.generateReport(result as any));
  }

  public static getAudit(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionFinalGoLiveCommandRollbackDecisionService.simulateDecision(input);
    res.json(FiscalProductionFinalGoLiveCommandRollbackAuditService.generateAuditRecord(result));
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'ok', module: 'Production Final Go-Live Command Rollback Scenario, Abort Path & Post-Command Event Horizon No-Op Dry-Run', readOnly: true });
  }
}
