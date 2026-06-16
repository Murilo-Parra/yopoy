import { Request, Response } from 'express';
import {
  FiscalProductionRuntimeExecutionGraphPolicy,
  FiscalProductionRuntimeExecutionGraphPlan,
  FiscalProductionRuntimeTransactionBoundaryPlan,
  FiscalProductionRuntimeDbTransactionNoOpPlan,
  FiscalProductionRuntimeSefazCallNoOpPlan,
  FiscalProductionRuntimeSigningNoOpPlan,
  FiscalProductionRuntimeIdempotencyCheckpointPlan,
  FiscalProductionRuntimeExecutionTraceNoOpEvidence,
  FiscalProductionRuntimeExecutionGraphDependencyMatrix,
  FiscalProductionRuntimeExecutionGraphBlockerRegister,
  FiscalProductionRuntimeExecutionGraphRiskRegister,
  FiscalProductionRuntimeExecutionGraphValidator,
  FiscalProductionRuntimeExecutionGraphEvaluationService,
  FiscalProductionRuntimeExecutionGraphDecisionService,
  FiscalProductionRuntimeExecutionGraphReportService,
  FiscalProductionRuntimeExecutionGraphAuditService
} from '../dedicated-homologation/production-execution-orchestration/execution-graph-dry-run';

export class FiscalProductionRuntimeExecutionGraphController {
  public static getPolicy(req: Request, res: Response) {
    const policy = FiscalProductionRuntimeExecutionGraphPolicy.getBaseResult();
    FiscalProductionRuntimeExecutionGraphAuditService.audit('GET_POLICY', { caller: (req as any).user?.id || 'admin' });
    res.json(policy);
  }

  public static getExecutionGraphPlan(req: Request, res: Response) {
    const result = FiscalProductionRuntimeExecutionGraphPlan.generatePlan();
    FiscalProductionRuntimeExecutionGraphAuditService.audit('GET_EXECUTION_GRAPH_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getTransactionBoundaryPlan(req: Request, res: Response) {
    const result = FiscalProductionRuntimeTransactionBoundaryPlan.generatePlan();
    FiscalProductionRuntimeExecutionGraphAuditService.audit('GET_TRANSACTION_BOUNDARY_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getDbTransactionNoOpPlan(req: Request, res: Response) {
    const result = FiscalProductionRuntimeDbTransactionNoOpPlan.generatePlan();
    FiscalProductionRuntimeExecutionGraphAuditService.audit('GET_DB_TRANSACTION_NO_OP_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getSefazCallNoOpPlan(req: Request, res: Response) {
    const result = FiscalProductionRuntimeSefazCallNoOpPlan.generatePlan();
    FiscalProductionRuntimeExecutionGraphAuditService.audit('GET_SEFAZ_CALL_NO_OP_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getSigningNoOpPlan(req: Request, res: Response) {
    const result = FiscalProductionRuntimeSigningNoOpPlan.generatePlan();
    FiscalProductionRuntimeExecutionGraphAuditService.audit('GET_SIGNING_NO_OP_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getIdempotencyCheckpointPlan(req: Request, res: Response) {
    const result = FiscalProductionRuntimeIdempotencyCheckpointPlan.generatePlan();
    FiscalProductionRuntimeExecutionGraphAuditService.audit('GET_IDEMPOTENCY_CHECKPOINT_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getExecutionTraceNoOpEvidence(req: Request, res: Response) {
    const result = FiscalProductionRuntimeExecutionTraceNoOpEvidence.generateEvidence();
    FiscalProductionRuntimeExecutionGraphAuditService.audit('GET_EXECUTION_TRACE_NO_OP_EVIDENCE', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    const result = FiscalProductionRuntimeExecutionGraphDependencyMatrix.getMatrix();
    FiscalProductionRuntimeExecutionGraphAuditService.audit('GET_DEPENDENCY_MATRIX', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getBlockers(req: Request, res: Response) {
    const blockers = FiscalProductionRuntimeExecutionGraphBlockerRegister.getBlockers();
    FiscalProductionRuntimeExecutionGraphAuditService.audit('GET_BLOCKERS', { caller: (req as any).user?.id || 'admin' });
    res.json({ blockers });
  }

  public static getRisks(req: Request, res: Response) {
    const risks = FiscalProductionRuntimeExecutionGraphRiskRegister.getRisks();
    FiscalProductionRuntimeExecutionGraphAuditService.audit('GET_RISKS', { caller: (req as any).user?.id || 'admin' });
    res.json({ risks });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const validation = FiscalProductionRuntimeExecutionGraphValidator.validate(input);
    FiscalProductionRuntimeExecutionGraphAuditService.audit('VALIDATE_INPUT', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(validation);
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const evalResult = FiscalProductionRuntimeExecutionGraphEvaluationService.evaluate(input);
    FiscalProductionRuntimeExecutionGraphAuditService.audit('EVALUATE', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(evalResult);
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const decision = FiscalProductionRuntimeExecutionGraphDecisionService.simulateDecision(input);
    FiscalProductionRuntimeExecutionGraphAuditService.audit('SIMULATE_DECISION', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(decision);
  }

  public static getReport(req: Request, res: Response) {
    const report = FiscalProductionRuntimeExecutionGraphReportService.getReport();
    FiscalProductionRuntimeExecutionGraphAuditService.audit('GET_REPORT', { caller: (req as any).user?.id || 'admin' });
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const logs = FiscalProductionRuntimeExecutionGraphAuditService.getLogs();
    res.json({ auditTrails: logs });
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'UP', runtimeExecutionGraphOnly: true });
  }
}
