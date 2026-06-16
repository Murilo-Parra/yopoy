import { Request, Response } from 'express';
import {
  FiscalProductionRuntimeQueueUnlockPolicy,
  FiscalProductionRuntimeQueueUnlockSimulation,
  FiscalProductionRuntimeQueueStateSimulation,
  FiscalProductionRuntimeDispatchEligibilityMatrix,
  FiscalProductionRuntimeWorkerDispatchNoOpPlan,
  FiscalProductionRuntimeCommandDispatchBoundary,
  FiscalProductionRuntimeDispatchSafetyChecklist,
  FiscalProductionRuntimeNoJobEnqueueEvidence,
  FiscalProductionRuntimeQueueUnlockDependencyMatrix,
  FiscalProductionRuntimeQueueUnlockBlockerRegister,
  FiscalProductionRuntimeQueueUnlockRiskRegister,
  FiscalProductionRuntimeQueueUnlockValidator,
  FiscalProductionRuntimeQueueUnlockEvaluationService,
  FiscalProductionRuntimeQueueUnlockDecisionService,
  FiscalProductionRuntimeQueueUnlockReportService,
  FiscalProductionRuntimeQueueUnlockAuditService
} from '../dedicated-homologation/production-execution-orchestration/queue-unlock-dry-run';

export class FiscalProductionRuntimeQueueUnlockController {
  public static getPolicy(req: Request, res: Response) {
    const policy = FiscalProductionRuntimeQueueUnlockPolicy.getBaseResult();
    FiscalProductionRuntimeQueueUnlockAuditService.audit('GET_POLICY', { caller: (req as any).user?.id || 'admin' });
    res.json(policy);
  }

  public static getQueueUnlockSimulation(req: Request, res: Response) {
    const result = FiscalProductionRuntimeQueueUnlockSimulation.generateSimulation();
    FiscalProductionRuntimeQueueUnlockAuditService.audit('GET_QUEUE_UNLOCK_SIMULATION', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getQueueStateSimulation(req: Request, res: Response) {
    const result = FiscalProductionRuntimeQueueStateSimulation.generateSimulation();
    FiscalProductionRuntimeQueueUnlockAuditService.audit('GET_QUEUE_STATE_SIMULATION', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getDispatchEligibilityMatrix(req: Request, res: Response) {
    const result = FiscalProductionRuntimeDispatchEligibilityMatrix.getMatrix();
    FiscalProductionRuntimeQueueUnlockAuditService.audit('GET_DISPATCH_ELIGIBILITY_MATRIX', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getWorkerDispatchNoOpPlan(req: Request, res: Response) {
    const result = FiscalProductionRuntimeWorkerDispatchNoOpPlan.generatePlan();
    FiscalProductionRuntimeQueueUnlockAuditService.audit('GET_WORKER_DISPATCH_NO_OP_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getCommandDispatchBoundary(req: Request, res: Response) {
    const result = FiscalProductionRuntimeCommandDispatchBoundary.generateBoundary();
    FiscalProductionRuntimeQueueUnlockAuditService.audit('GET_COMMAND_DISPATCH_BOUNDARY', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getDispatchSafetyChecklist(req: Request, res: Response) {
    const result = FiscalProductionRuntimeDispatchSafetyChecklist.generateChecklist();
    FiscalProductionRuntimeQueueUnlockAuditService.audit('GET_DISPATCH_SAFETY_CHECKLIST', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getNoJobEnqueueEvidence(req: Request, res: Response) {
    const result = FiscalProductionRuntimeNoJobEnqueueEvidence.generateEvidence();
    FiscalProductionRuntimeQueueUnlockAuditService.audit('GET_NO_JOB_ENQUEUE_EVIDENCE', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    const result = FiscalProductionRuntimeQueueUnlockDependencyMatrix.getMatrix();
    FiscalProductionRuntimeQueueUnlockAuditService.audit('GET_DEPENDENCY_MATRIX', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getBlockers(req: Request, res: Response) {
    const blockers = FiscalProductionRuntimeQueueUnlockBlockerRegister.getBlockers();
    FiscalProductionRuntimeQueueUnlockAuditService.audit('GET_BLOCKERS', { caller: (req as any).user?.id || 'admin' });
    res.json({ blockers });
  }

  public static getRisks(req: Request, res: Response) {
    const risks = FiscalProductionRuntimeQueueUnlockRiskRegister.getRisks();
    FiscalProductionRuntimeQueueUnlockAuditService.audit('GET_RISKS', { caller: (req as any).user?.id || 'admin' });
    res.json({ risks });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const validation = FiscalProductionRuntimeQueueUnlockValidator.validate(input);
    FiscalProductionRuntimeQueueUnlockAuditService.audit('VALIDATE_INPUT', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(validation);
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const evalResult = FiscalProductionRuntimeQueueUnlockEvaluationService.evaluate(input);
    FiscalProductionRuntimeQueueUnlockAuditService.audit('EVALUATE', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(evalResult);
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const decision = FiscalProductionRuntimeQueueUnlockDecisionService.simulateDecision(input);
    FiscalProductionRuntimeQueueUnlockAuditService.audit('SIMULATE_DECISION', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(decision);
  }

  public static getReport(req: Request, res: Response) {
    const report = FiscalProductionRuntimeQueueUnlockReportService.getReport();
    FiscalProductionRuntimeQueueUnlockAuditService.audit('GET_REPORT', { caller: (req as any).user?.id || 'admin' });
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const logs = FiscalProductionRuntimeQueueUnlockAuditService.getLogs();
    res.json({ auditTrails: logs });
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'UP', queueUnlockSimulationOnly: true });
  }
}
