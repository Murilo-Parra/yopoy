import { Request, Response } from 'express';
import {
  FiscalProductionRuntimeOrchestrationPolicy,
  FiscalProductionRuntimeOrchestrationGovernanceBlueprint,
  FiscalProductionHardRuntimeNoExecutionContract,
  FiscalProductionRuntimeScopeInventory,
  FiscalProductionQueueWorkerNoStartPlan,
  FiscalProductionJobDispatchNoOpMatrix,
  FiscalProductionSchedulerCronNoCreatePlan,
  FiscalProductionCommandRunnerNoExecutePlan,
  FiscalProductionLifecycleRunnerNoOpMatrix,
  FiscalProductionRuntimeTransactionNoOpenPlan,
  FiscalProductionRuntimeExternalIntegrationNoCallPlan,
  FiscalProductionRuntimeDataBoundaryNoReadPlan,
  FiscalProductionRuntimeExecutionBlockMatrix,
  FiscalProductionRuntimeOrchestrationDependencyMatrix,
  FiscalProductionRuntimeOrchestrationBlockerRegister,
  FiscalProductionRuntimeOrchestrationRiskRegister,
  FiscalProductionRuntimeOrchestrationValidator,
  FiscalProductionRuntimeOrchestrationEvaluationService,
  FiscalProductionRuntimeOrchestrationDecisionService,
  FiscalProductionRuntimeOrchestrationReportService,
  FiscalProductionRuntimeOrchestrationAuditService
} from '../dedicated-homologation/production-runtime-orchestration-governance';

export class FiscalProductionRuntimeOrchestrationController {
  public static getPolicy(req: Request, res: Response) {
    res.json(FiscalProductionRuntimeOrchestrationPolicy.getPolicy());
  }

  public static getRuntimeOrchestrationGovernanceBlueprint(req: Request, res: Response) {
    res.json(FiscalProductionRuntimeOrchestrationGovernanceBlueprint.getBlueprint());
  }

  public static getHardRuntimeNoExecutionContract(req: Request, res: Response) {
    res.json(FiscalProductionHardRuntimeNoExecutionContract.getContract());
  }

  public static getRuntimeScopeInventory(req: Request, res: Response) {
    res.json(FiscalProductionRuntimeScopeInventory.getInventory());
  }

  public static getQueueWorkerNoStartPlan(req: Request, res: Response) {
    res.json(FiscalProductionQueueWorkerNoStartPlan.getPlan());
  }

  public static getJobDispatchNoOpMatrix(req: Request, res: Response) {
    res.json(FiscalProductionJobDispatchNoOpMatrix.getMatrix());
  }

  public static getSchedulerCronNoCreatePlan(req: Request, res: Response) {
    res.json(FiscalProductionSchedulerCronNoCreatePlan.getPlan());
  }

  public static getCommandRunnerNoExecutePlan(req: Request, res: Response) {
    res.json(FiscalProductionCommandRunnerNoExecutePlan.getPlan());
  }

  public static getLifecycleRunnerNoOpMatrix(req: Request, res: Response) {
    res.json(FiscalProductionLifecycleRunnerNoOpMatrix.getMatrix());
  }

  public static getRuntimeTransactionNoOpenPlan(req: Request, res: Response) {
    res.json(FiscalProductionRuntimeTransactionNoOpenPlan.getPlan());
  }

  public static getRuntimeExternalIntegrationNoCallPlan(req: Request, res: Response) {
    res.json(FiscalProductionRuntimeExternalIntegrationNoCallPlan.getPlan());
  }

  public static getRuntimeDataBoundaryNoReadPlan(req: Request, res: Response) {
    res.json(FiscalProductionRuntimeDataBoundaryNoReadPlan.getPlan());
  }

  public static getRuntimeExecutionBlockMatrix(req: Request, res: Response) {
    res.json(FiscalProductionRuntimeExecutionBlockMatrix.getMatrix());
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    res.json(FiscalProductionRuntimeOrchestrationDependencyMatrix.getMatrix());
  }

  public static getBlockers(req: Request, res: Response) {
    res.json({ blockers: FiscalProductionRuntimeOrchestrationBlockerRegister.getBlockers() });
  }

  public static getRisks(req: Request, res: Response) {
    res.json({ risks: FiscalProductionRuntimeOrchestrationRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const errors = FiscalProductionRuntimeOrchestrationValidator.validate(input);
    res.json({ valid: errors.length === 0, errors });
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const warnings = FiscalProductionRuntimeOrchestrationEvaluationService.evaluate(input);
    res.json({ evaluated: true, warnings });
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionRuntimeOrchestrationDecisionService.simulateDecision(input);
    res.json(result);
  }

  public static getReport(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionRuntimeOrchestrationDecisionService.simulateDecision(input);
    res.json(FiscalProductionRuntimeOrchestrationReportService.generateReport(result));
  }

  public static getAudit(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionRuntimeOrchestrationDecisionService.simulateDecision(input);
    res.json(FiscalProductionRuntimeOrchestrationAuditService.generateAuditRecord(result));
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'ok', module: 'Production Runtime Orchestration Governance', readOnly: true });
  }
}
