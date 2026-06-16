import { Request, Response } from 'express';
import {
  FiscalFinalGoLiveGateDryRunPolicy,
  FiscalFinalGoLiveGateEligibilityMatrix,
  FiscalFinalGoLiveMockActivationRunbook,
  FiscalFinalGoLiveGateUnlockSimulation,
  FiscalFinalGoLiveTrafficSwitchSimulation,
  FiscalFinalGoLiveRollbackSimulationPlan,
  FiscalFinalGoLiveKillSwitchSimulationPlan,
  FiscalFinalGoLiveDecisionCheckpointMatrix,
  FiscalFinalGoLiveGateDryRunBlockerRegister,
  FiscalFinalGoLiveGateDryRunRiskRegister,
  FiscalFinalGoLiveGateDryRunValidator,
  FiscalFinalGoLiveGateDryRunEvaluationService,
  FiscalFinalGoLiveGateDryRunDecisionService,
  FiscalFinalGoLiveGateDryRunReportService,
  FiscalFinalGoLiveGateDryRunAuditService
} from '../dedicated-homologation/final-golive/gate-dry-run';

export class FiscalFinalGoLiveGateDryRunController {
  public static getPolicy(req: Request, res: Response) {
    const policy = FiscalFinalGoLiveGateDryRunPolicy.getBaseResult();
    FiscalFinalGoLiveGateDryRunAuditService.audit('GET_POLICY', { caller: (req as any).user?.id || 'admin' });
    res.json(policy);
  }

  public static getGateEligibility(req: Request, res: Response) {
    const result = FiscalFinalGoLiveGateEligibilityMatrix.generateMatrix();
    FiscalFinalGoLiveGateDryRunAuditService.audit('GET_GATE_ELIGIBILITY', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getMockActivationRunbook(req: Request, res: Response) {
    const result = FiscalFinalGoLiveMockActivationRunbook.generateRunbook();
    FiscalFinalGoLiveGateDryRunAuditService.audit('GET_MOCK_ACTIVATION_RUNBOOK', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getGateUnlockSimulation(req: Request, res: Response) {
    const result = FiscalFinalGoLiveGateUnlockSimulation.simulateUnlock();
    FiscalFinalGoLiveGateDryRunAuditService.audit('GET_GATE_UNLOCK_SIMULATION', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getTrafficSwitchSimulation(req: Request, res: Response) {
    const result = FiscalFinalGoLiveTrafficSwitchSimulation.simulateSwitch();
    FiscalFinalGoLiveGateDryRunAuditService.audit('GET_TRAFFIC_SWITCH_SIMULATION', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getRollbackSimulation(req: Request, res: Response) {
    const result = FiscalFinalGoLiveRollbackSimulationPlan.simulateRollback();
    FiscalFinalGoLiveGateDryRunAuditService.audit('GET_ROLLBACK_SIMULATION', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getKillSwitchSimulation(req: Request, res: Response) {
    const result = FiscalFinalGoLiveKillSwitchSimulationPlan.simulateKillSwitch();
    FiscalFinalGoLiveGateDryRunAuditService.audit('GET_KILL_SWITCH_SIMULATION', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getDecisionCheckpoints(req: Request, res: Response) {
    const result = FiscalFinalGoLiveDecisionCheckpointMatrix.generateCheckpoints();
    FiscalFinalGoLiveGateDryRunAuditService.audit('GET_DECISION_CHECKPOINTS', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getBlockers(req: Request, res: Response) {
    const blockers = FiscalFinalGoLiveGateDryRunBlockerRegister.getBlockers();
    FiscalFinalGoLiveGateDryRunAuditService.audit('GET_BLOCKERS', { caller: (req as any).user?.id || 'admin' });
    res.json({ blockers });
  }

  public static getRisks(req: Request, res: Response) {
    const risks = FiscalFinalGoLiveGateDryRunRiskRegister.getRisks();
    FiscalFinalGoLiveGateDryRunAuditService.audit('GET_RISKS', { caller: (req as any).user?.id || 'admin' });
    res.json({ risks });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const validation = FiscalFinalGoLiveGateDryRunValidator.validate(input);
    FiscalFinalGoLiveGateDryRunAuditService.audit('VALIDATE_INPUT', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(validation);
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const evalResult = FiscalFinalGoLiveGateDryRunEvaluationService.evaluate(input);
    FiscalFinalGoLiveGateDryRunAuditService.audit('EVALUATE', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(evalResult);
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const decision = FiscalFinalGoLiveGateDryRunDecisionService.simulateDecision(input);
    FiscalFinalGoLiveGateDryRunAuditService.audit('SIMULATE_DECISION', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(decision);
  }

  public static getReport(req: Request, res: Response) {
    const report = FiscalFinalGoLiveGateDryRunReportService.getReport();
    FiscalFinalGoLiveGateDryRunAuditService.audit('GET_REPORT', { caller: (req as any).user?.id || 'admin' });
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const logs = FiscalFinalGoLiveGateDryRunAuditService.getLogs();
    res.json({ auditTrails: logs });
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'UP', finalGoLiveGateDryRunOnly: true, mockActivationRunbookOnly: true });
  }
}
