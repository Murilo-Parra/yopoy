import { Request, Response } from 'express';
import {
  FiscalProductionCanaryTrafficSwitchPolicy,
  FiscalProductionCanaryTrafficSimulationPlan,
  FiscalProductionReversibleActivationPlan,
  FiscalProductionTrafficSwitchSafetyMatrix,
  FiscalProductionCanaryPercentageSimulation,
  FiscalProductionLegacyReversionPlan,
  FiscalProductionCanaryAbortCriteria,
  FiscalProductionCanaryDecisionCheckpointMatrix,
  FiscalProductionCanaryDependencyMatrix,
  FiscalProductionCanaryTrafficSwitchBlockerRegister,
  FiscalProductionCanaryTrafficSwitchRiskRegister,
  FiscalProductionCanaryTrafficSwitchValidator,
  FiscalProductionCanaryTrafficSwitchEvaluationService,
  FiscalProductionCanaryTrafficSwitchDecisionService,
  FiscalProductionCanaryTrafficSwitchReportService,
  FiscalProductionCanaryTrafficSwitchAuditService
} from '../dedicated-homologation/production-deployment-isolation/canary-traffic-switch-dry-run';

export class FiscalProductionCanaryTrafficSwitchController {
  public static getPolicy(req: Request, res: Response) {
    const policy = FiscalProductionCanaryTrafficSwitchPolicy.getBaseResult();
    FiscalProductionCanaryTrafficSwitchAuditService.audit('GET_POLICY', { caller: (req as any).user?.id || 'admin' });
    res.json(policy);
  }

  public static getCanaryTrafficSimulationPlan(req: Request, res: Response) {
    const result = FiscalProductionCanaryTrafficSimulationPlan.generatePlan();
    FiscalProductionCanaryTrafficSwitchAuditService.audit('GET_CANARY_TRAFFIC_SIMULATION_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getReversibleActivationPlan(req: Request, res: Response) {
    const result = FiscalProductionReversibleActivationPlan.generatePlan();
    FiscalProductionCanaryTrafficSwitchAuditService.audit('GET_REVERSIBLE_ACTIVATION_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getTrafficSwitchSafetyMatrix(req: Request, res: Response) {
    const result = FiscalProductionTrafficSwitchSafetyMatrix.generateMatrix();
    FiscalProductionCanaryTrafficSwitchAuditService.audit('GET_TRAFFIC_SWITCH_SAFETY_MATRIX', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getCanaryPercentageSimulation(req: Request, res: Response) {
    const result = FiscalProductionCanaryPercentageSimulation.simulatePercentage();
    FiscalProductionCanaryTrafficSwitchAuditService.audit('GET_CANARY_PERCENTAGE_SIMULATION', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getLegacyReversionPlan(req: Request, res: Response) {
    const result = FiscalProductionLegacyReversionPlan.generatePlan();
    FiscalProductionCanaryTrafficSwitchAuditService.audit('GET_LEGACY_REVERSION_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getCanaryAbortCriteria(req: Request, res: Response) {
    const result = FiscalProductionCanaryAbortCriteria.generateCriteria();
    FiscalProductionCanaryTrafficSwitchAuditService.audit('GET_CANARY_ABORT_CRITERIA', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getDecisionCheckpointMatrix(req: Request, res: Response) {
    const result = FiscalProductionCanaryDecisionCheckpointMatrix.generateMatrix();
    FiscalProductionCanaryTrafficSwitchAuditService.audit('GET_DECISION_CHECKPOINT_MATRIX', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    const result = FiscalProductionCanaryDependencyMatrix.generateMatrix();
    FiscalProductionCanaryTrafficSwitchAuditService.audit('GET_DEPENDENCY_MATRIX', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getBlockers(req: Request, res: Response) {
    const blockers = FiscalProductionCanaryTrafficSwitchBlockerRegister.getBlockers();
    FiscalProductionCanaryTrafficSwitchAuditService.audit('GET_BLOCKERS', { caller: (req as any).user?.id || 'admin' });
    res.json({ blockers });
  }

  public static getRisks(req: Request, res: Response) {
    const risks = FiscalProductionCanaryTrafficSwitchRiskRegister.getRisks();
    FiscalProductionCanaryTrafficSwitchAuditService.audit('GET_RISKS', { caller: (req as any).user?.id || 'admin' });
    res.json({ risks });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const validation = FiscalProductionCanaryTrafficSwitchValidator.validate(input);
    FiscalProductionCanaryTrafficSwitchAuditService.audit('VALIDATE_INPUT', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(validation);
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const evalResult = FiscalProductionCanaryTrafficSwitchEvaluationService.evaluate(input);
    FiscalProductionCanaryTrafficSwitchAuditService.audit('EVALUATE', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(evalResult);
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const decision = FiscalProductionCanaryTrafficSwitchDecisionService.simulateDecision(input);
    FiscalProductionCanaryTrafficSwitchAuditService.audit('SIMULATE_DECISION', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(decision);
  }

  public static getReport(req: Request, res: Response) {
    const report = FiscalProductionCanaryTrafficSwitchReportService.getReport();
    FiscalProductionCanaryTrafficSwitchAuditService.audit('GET_REPORT', { caller: (req as any).user?.id || 'admin' });
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const logs = FiscalProductionCanaryTrafficSwitchAuditService.getLogs();
    res.json({ auditTrails: logs });
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'UP', canaryTrafficSwitchDryRunOnly: true, reversibleActivationSimulationOnly: true });
  }
}
