import { Request, Response } from 'express';
import {
  FiscalProductionFinalGoLiveActivationCommandPolicy,
  FiscalProductionActivationCommandRehearsalBlueprint,
  FiscalProductionActivationCommandNonExecutableEnvelope,
  FiscalProductionExecutionDenialNoOpMatrix,
  FiscalProductionGateUnlockDenialMatrix,
  FiscalProductionAuthorizationTokenIssueDenialPlan,
  FiscalProductionRouteToV2CommandDenialPlan,
  FiscalProductionTrafficSwitchCommandDenialMatrix,
  FiscalProductionRuntimeStartCommandDenialPlan,
  FiscalProductionDatabaseCommandDenialPlan,
  FiscalProductionExternalIntegrationCommandDenialPlan,
  FiscalProductionSensitiveDataCommandDenialPlan,
  FiscalProductionNoRealActivationCommandEvidence,
  FiscalProductionNoRealExecutionEvidence,
  FiscalProductionNoRealGateUnlockFromCommandEvidence,
  FiscalProductionNoRealTokenIssueFromCommandEvidence,
  FiscalProductionFinalGoLiveActivationCommandDependencyMatrix,
  FiscalProductionFinalGoLiveActivationCommandBlockerRegister,
  FiscalProductionFinalGoLiveActivationCommandRiskRegister,
  FiscalProductionFinalGoLiveActivationCommandValidator,
  FiscalProductionFinalGoLiveActivationCommandEvaluationService,
  FiscalProductionFinalGoLiveActivationCommandDecisionService,
  FiscalProductionFinalGoLiveActivationCommandReportService,
  FiscalProductionFinalGoLiveActivationCommandAuditService
} from '../dedicated-homologation/production-final-go-live-command-center/activation-command-dry-run';

export class FiscalProductionFinalGoLiveActivationCommandController {
  public static getPolicy(req: Request, res: Response) {
    res.json(FiscalProductionFinalGoLiveActivationCommandPolicy.getPolicy());
  }

  public static getActivationCommandRehearsalBlueprint(req: Request, res: Response) {
    res.json(FiscalProductionActivationCommandRehearsalBlueprint.getBlueprint());
  }

  public static getActivationCommandNonExecutableEnvelope(req: Request, res: Response) {
    res.json(FiscalProductionActivationCommandNonExecutableEnvelope.getEnvelope());
  }

  public static getExecutionDenialNoOpMatrix(req: Request, res: Response) {
    res.json(FiscalProductionExecutionDenialNoOpMatrix.getMatrix());
  }

  public static getGateUnlockDenialMatrix(req: Request, res: Response) {
    res.json(FiscalProductionGateUnlockDenialMatrix.getMatrix());
  }

  public static getAuthorizationTokenIssueDenialPlan(req: Request, res: Response) {
    res.json(FiscalProductionAuthorizationTokenIssueDenialPlan.getPlan());
  }

  public static getRouteToV2CommandDenialPlan(req: Request, res: Response) {
    res.json(FiscalProductionRouteToV2CommandDenialPlan.getPlan());
  }

  public static getTrafficSwitchCommandDenialMatrix(req: Request, res: Response) {
    res.json(FiscalProductionTrafficSwitchCommandDenialMatrix.getMatrix());
  }

  public static getRuntimeStartCommandDenialPlan(req: Request, res: Response) {
    res.json(FiscalProductionRuntimeStartCommandDenialPlan.getPlan());
  }

  public static getDatabaseCommandDenialPlan(req: Request, res: Response) {
    res.json(FiscalProductionDatabaseCommandDenialPlan.getPlan());
  }

  public static getExternalIntegrationCommandDenialPlan(req: Request, res: Response) {
    res.json(FiscalProductionExternalIntegrationCommandDenialPlan.getPlan());
  }

  public static getSensitiveDataCommandDenialPlan(req: Request, res: Response) {
    res.json(FiscalProductionSensitiveDataCommandDenialPlan.getPlan());
  }

  public static getNoRealActivationCommandEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealActivationCommandEvidence.getEvidence());
  }

  public static getNoRealExecutionEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealExecutionEvidence.getEvidence());
  }

  public static getNoRealGateUnlockFromCommandEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealGateUnlockFromCommandEvidence.getEvidence());
  }

  public static getNoRealTokenIssueFromCommandEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealTokenIssueFromCommandEvidence.getEvidence());
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    res.json(FiscalProductionFinalGoLiveActivationCommandDependencyMatrix.getMatrix());
  }

  public static getBlockers(req: Request, res: Response) {
    res.json({ blockers: FiscalProductionFinalGoLiveActivationCommandBlockerRegister.getBlockers() });
  }

  public static getRisks(req: Request, res: Response) {
    res.json({ risks: FiscalProductionFinalGoLiveActivationCommandRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const errors = FiscalProductionFinalGoLiveActivationCommandValidator.validate(input);
    res.json({ valid: errors.length === 0, errors });
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const warnings = FiscalProductionFinalGoLiveActivationCommandEvaluationService.evaluate(input);
    res.json({ evaluated: true, warnings });
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionFinalGoLiveActivationCommandDecisionService.simulateDecision(input);
    res.json(result);
  }

  public static getReport(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionFinalGoLiveActivationCommandDecisionService.simulateDecision(input);
    res.json(FiscalProductionFinalGoLiveActivationCommandReportService.generateReport(result as any));
  }

  public static getAudit(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionFinalGoLiveActivationCommandDecisionService.simulateDecision(input);
    res.json(FiscalProductionFinalGoLiveActivationCommandAuditService.generateAuditRecord(result));
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'ok', module: 'Production Final Go-Live Activation Command Rehearsal & Execution Denial No-Op Dry-Run', readOnly: true });
  }
}
