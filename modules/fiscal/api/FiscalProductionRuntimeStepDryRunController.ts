import { Request, Response } from 'express';
import {
  FiscalProductionRuntimeStepDryRunPolicy,
  FiscalProductionRuntimeStepManifest,
  FiscalProductionRuntimeCommandManifest,
  FiscalProductionRuntimeCommandSanitizer,
  FiscalProductionRuntimeStepSequencePlan,
  FiscalProductionRuntimeQueueNoOpPlan,
  FiscalProductionRuntimeWorkerNoOpContract,
  FiscalProductionRuntimeStepRollbackPlan,
  FiscalProductionRuntimeCircuitBreakerPlan,
  FiscalProductionRuntimeExecutionDependencyMatrix,
  FiscalProductionRuntimeStepDryRunBlockerRegister,
  FiscalProductionRuntimeStepDryRunRiskRegister,
  FiscalProductionRuntimeStepDryRunValidator,
  FiscalProductionRuntimeStepDryRunEvaluationService,
  FiscalProductionRuntimeStepDryRunDecisionService,
  FiscalProductionRuntimeStepDryRunReportService,
  FiscalProductionRuntimeStepDryRunAuditService
} from '../dedicated-homologation/production-execution-orchestration/runtime-step-dry-run';

export class FiscalProductionRuntimeStepDryRunController {
  public static getPolicy(req: Request, res: Response) {
    const policy = FiscalProductionRuntimeStepDryRunPolicy.getBaseResult();
    FiscalProductionRuntimeStepDryRunAuditService.audit('GET_POLICY', { caller: (req as any).user?.id || 'admin' });
    res.json(policy);
  }

  public static getStepManifest(req: Request, res: Response) {
    const result = FiscalProductionRuntimeStepManifest.generateManifest();
    FiscalProductionRuntimeStepDryRunAuditService.audit('GET_STEP_MANIFEST', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getCommandManifest(req: Request, res: Response) {
    const result = FiscalProductionRuntimeCommandManifest.generateManifest();
    FiscalProductionRuntimeStepDryRunAuditService.audit('GET_COMMAND_MANIFEST', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getSanitizedCommandManifest(req: Request, res: Response) {
    const requestMetadata = typeof req.query.metadata === 'string' ? JSON.parse(req.query.metadata) : {};
    const result = FiscalProductionRuntimeCommandSanitizer.sanitize(requestMetadata);
    FiscalProductionRuntimeStepDryRunAuditService.audit('GET_SANITIZED_COMMAND_MANIFEST', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getStepSequencePlan(req: Request, res: Response) {
    const result = FiscalProductionRuntimeStepSequencePlan.generatePlan();
    FiscalProductionRuntimeStepDryRunAuditService.audit('GET_STEP_SEQUENCE_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getQueueNoOpPlan(req: Request, res: Response) {
    const result = FiscalProductionRuntimeQueueNoOpPlan.generatePlan();
    FiscalProductionRuntimeStepDryRunAuditService.audit('GET_QUEUE_NO_OP_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getWorkerNoOpContract(req: Request, res: Response) {
    const result = FiscalProductionRuntimeWorkerNoOpContract.generateContract();
    FiscalProductionRuntimeStepDryRunAuditService.audit('GET_WORKER_NO_OP_CONTRACT', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getStepRollbackPlan(req: Request, res: Response) {
    const result = FiscalProductionRuntimeStepRollbackPlan.generatePlan();
    FiscalProductionRuntimeStepDryRunAuditService.audit('GET_STEP_ROLLBACK_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getCircuitBreakerPlan(req: Request, res: Response) {
    const result = FiscalProductionRuntimeCircuitBreakerPlan.generatePlan();
    FiscalProductionRuntimeStepDryRunAuditService.audit('GET_CIRCUIT_BREAKER_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    const result = FiscalProductionRuntimeExecutionDependencyMatrix.getMatrix();
    FiscalProductionRuntimeStepDryRunAuditService.audit('GET_DEPENDENCY_MATRIX', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getBlockers(req: Request, res: Response) {
    const blockers = FiscalProductionRuntimeStepDryRunBlockerRegister.getBlockers();
    FiscalProductionRuntimeStepDryRunAuditService.audit('GET_BLOCKERS', { caller: (req as any).user?.id || 'admin' });
    res.json({ blockers });
  }

  public static getRisks(req: Request, res: Response) {
    const risks = FiscalProductionRuntimeStepDryRunRiskRegister.getRisks();
    FiscalProductionRuntimeStepDryRunAuditService.audit('GET_RISKS', { caller: (req as any).user?.id || 'admin' });
    res.json({ risks });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const validation = FiscalProductionRuntimeStepDryRunValidator.validate(input);
    FiscalProductionRuntimeStepDryRunAuditService.audit('VALIDATE_INPUT', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(validation);
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const evalResult = FiscalProductionRuntimeStepDryRunEvaluationService.evaluate(input);
    FiscalProductionRuntimeStepDryRunAuditService.audit('EVALUATE', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(evalResult);
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const decision = FiscalProductionRuntimeStepDryRunDecisionService.simulateDecision(input);
    FiscalProductionRuntimeStepDryRunAuditService.audit('SIMULATE_DECISION', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(decision);
  }

  public static getReport(req: Request, res: Response) {
    const report = FiscalProductionRuntimeStepDryRunReportService.getReport();
    FiscalProductionRuntimeStepDryRunAuditService.audit('GET_REPORT', { caller: (req as any).user?.id || 'admin' });
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const logs = FiscalProductionRuntimeStepDryRunAuditService.getLogs();
    res.json({ auditTrails: logs });
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'UP', runtimeStepManifestOnly: true });
  }
}
