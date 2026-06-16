import { Request, Response } from 'express';
import {
  FiscalProductionSchedulerCommandPolicy,
  FiscalProductionSchedulerNoCreateBlueprint,
  FiscalProductionCronNoCreatePlan,
  FiscalProductionCommandRunnerNoExecuteMatrix,
  FiscalProductionShellCommandNoExecutePlan,
  FiscalProductionProcessManagerNoCreateMatrix,
  FiscalProductionLifecycleRunnerNoCreatePlan,
  FiscalProductionTaskRunnerNoExecuteMatrix,
  FiscalProductionRecurringTaskNoRegisterPlan,
  FiscalProductionTimeoutGuardNoActivationMatrix,
  FiscalProductionLifecycleHookNoCallPlan,
  FiscalProductionSchedulerCommandNoRealExecutionEvidence,
  FiscalProductionSchedulerCommandNoRealProcessEvidence,
  FiscalProductionSchedulerCommandDependencyMatrix,
  FiscalProductionSchedulerCommandBlockerRegister,
  FiscalProductionSchedulerCommandRiskRegister,
  FiscalProductionSchedulerCommandValidator,
  FiscalProductionSchedulerCommandEvaluationService,
  FiscalProductionSchedulerCommandDecisionService,
  FiscalProductionSchedulerCommandReportService,
  FiscalProductionSchedulerCommandAuditService
} from '../dedicated-homologation/production-runtime-orchestration-governance/scheduler-command-dry-run';

export class FiscalProductionSchedulerCommandController {
  public static getPolicy(req: Request, res: Response) {
    res.json(FiscalProductionSchedulerCommandPolicy.getPolicy());
  }

  public static getSchedulerNoCreateBlueprint(req: Request, res: Response) {
    res.json(FiscalProductionSchedulerNoCreateBlueprint.getBlueprint());
  }

  public static getCronNoCreatePlan(req: Request, res: Response) {
    res.json(FiscalProductionCronNoCreatePlan.getPlan());
  }

  public static getCommandRunnerNoExecuteMatrix(req: Request, res: Response) {
    res.json(FiscalProductionCommandRunnerNoExecuteMatrix.getMatrix());
  }

  public static getShellCommandNoExecutePlan(req: Request, res: Response) {
    res.json(FiscalProductionShellCommandNoExecutePlan.getPlan());
  }

  public static getProcessManagerNoCreateMatrix(req: Request, res: Response) {
    res.json(FiscalProductionProcessManagerNoCreateMatrix.getMatrix());
  }

  public static getLifecycleRunnerNoCreatePlan(req: Request, res: Response) {
    res.json(FiscalProductionLifecycleRunnerNoCreatePlan.getPlan());
  }

  public static getTaskRunnerNoExecuteMatrix(req: Request, res: Response) {
    res.json(FiscalProductionTaskRunnerNoExecuteMatrix.getMatrix());
  }

  public static getRecurringTaskNoRegisterPlan(req: Request, res: Response) {
    res.json(FiscalProductionRecurringTaskNoRegisterPlan.getPlan());
  }

  public static getTimeoutGuardNoActivationMatrix(req: Request, res: Response) {
    res.json(FiscalProductionTimeoutGuardNoActivationMatrix.getMatrix());
  }

  public static getLifecycleHookNoCallPlan(req: Request, res: Response) {
    res.json(FiscalProductionLifecycleHookNoCallPlan.getPlan());
  }

  public static getSchedulerCommandNoRealExecutionEvidence(req: Request, res: Response) {
    res.json(FiscalProductionSchedulerCommandNoRealExecutionEvidence.getEvidence());
  }

  public static getSchedulerCommandNoRealProcessEvidence(req: Request, res: Response) {
    res.json(FiscalProductionSchedulerCommandNoRealProcessEvidence.getEvidence());
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    res.json(FiscalProductionSchedulerCommandDependencyMatrix.getMatrix());
  }

  public static getBlockers(req: Request, res: Response) {
    res.json({ blockers: FiscalProductionSchedulerCommandBlockerRegister.getBlockers() });
  }

  public static getRisks(req: Request, res: Response) {
    res.json({ risks: FiscalProductionSchedulerCommandRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const errors = FiscalProductionSchedulerCommandValidator.validate(input);
    res.json({ valid: errors.length === 0, errors });
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const warnings = FiscalProductionSchedulerCommandEvaluationService.evaluate(input);
    res.json({ evaluated: true, warnings });
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionSchedulerCommandDecisionService.simulateDecision(input);
    res.json(result);
  }

  public static getReport(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionSchedulerCommandDecisionService.simulateDecision(input);
    res.json(FiscalProductionSchedulerCommandReportService.generateReport(result));
  }

  public static getAudit(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionSchedulerCommandDecisionService.simulateDecision(input);
    res.json(FiscalProductionSchedulerCommandAuditService.generateAuditRecord(result));
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'ok', module: 'Production Scheduler, Cron, Command Runner & Lifecycle Execution No-Create / No-Execute Dry-Run', readOnly: true });
  }
}
