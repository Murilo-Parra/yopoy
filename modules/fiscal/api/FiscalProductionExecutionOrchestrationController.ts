import { Request, Response } from 'express';
import {
  FiscalProductionExecutionOrchestrationPolicy,
  FiscalProductionExecutionOrchestrationBlueprint,
  FiscalProductionRuntimeNoOpSafetyContract,
  FiscalProductionExecutionRuntimePlan,
  FiscalProductionExecutionCommandBoundaryPlan,
  FiscalProductionExecutionGuardrailMatrix,
  FiscalProductionExecutionPreRunChecklist,
  FiscalProductionExecutionOrchestrationNoSideEffectEvidence,
  FiscalProductionExecutionDependencyMatrix,
  FiscalProductionExecutionOrchestrationBlockerRegister,
  FiscalProductionExecutionOrchestrationRiskRegister,
  FiscalProductionExecutionOrchestrationValidator,
  FiscalProductionExecutionOrchestrationEvaluationService,
  FiscalProductionExecutionOrchestrationDecisionService,
  FiscalProductionExecutionOrchestrationReportService,
  FiscalProductionExecutionOrchestrationAuditService
} from '../dedicated-homologation/production-execution-orchestration';

export class FiscalProductionExecutionOrchestrationController {
  public static getPolicy(req: Request, res: Response) {
    const policy = FiscalProductionExecutionOrchestrationPolicy.getBaseResult();
    FiscalProductionExecutionOrchestrationAuditService.audit('GET_POLICY', { caller: (req as any).user?.id || 'admin' });
    res.json(policy);
  }

  public static getOrchestrationBlueprint(req: Request, res: Response) {
    const result = FiscalProductionExecutionOrchestrationBlueprint.generateBlueprint();
    FiscalProductionExecutionOrchestrationAuditService.audit('GET_ORCHESTRATION_BLUEPRINT', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getRuntimeNoOpSafetyContract(req: Request, res: Response) {
    const result = FiscalProductionRuntimeNoOpSafetyContract.generateContract();
    FiscalProductionExecutionOrchestrationAuditService.audit('GET_RUNTIME_NO_OP_SAFETY_CONTRACT', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getRuntimePlan(req: Request, res: Response) {
    const result = FiscalProductionExecutionRuntimePlan.generatePlan();
    FiscalProductionExecutionOrchestrationAuditService.audit('GET_RUNTIME_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getCommandBoundaryPlan(req: Request, res: Response) {
    const result = FiscalProductionExecutionCommandBoundaryPlan.generatePlan();
    FiscalProductionExecutionOrchestrationAuditService.audit('GET_COMMAND_BOUNDARY_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getGuardrailMatrix(req: Request, res: Response) {
    const result = FiscalProductionExecutionGuardrailMatrix.getMatrix();
    FiscalProductionExecutionOrchestrationAuditService.audit('GET_GUARDRAIL_MATRIX', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getPreRunChecklist(req: Request, res: Response) {
    const result = FiscalProductionExecutionPreRunChecklist.generateChecklist();
    FiscalProductionExecutionOrchestrationAuditService.audit('GET_PRE_RUN_CHECKLIST', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getNoSideEffectEvidence(req: Request, res: Response) {
    const result = FiscalProductionExecutionOrchestrationNoSideEffectEvidence.generateEvidence();
    FiscalProductionExecutionOrchestrationAuditService.audit('GET_NO_SIDE_EFFECT_EVIDENCE', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    const result = FiscalProductionExecutionDependencyMatrix.getMatrix();
    FiscalProductionExecutionOrchestrationAuditService.audit('GET_DEPENDENCY_MATRIX', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getBlockers(req: Request, res: Response) {
    const blockers = FiscalProductionExecutionOrchestrationBlockerRegister.getBlockers();
    FiscalProductionExecutionOrchestrationAuditService.audit('GET_BLOCKERS', { caller: (req as any).user?.id || 'admin' });
    res.json({ blockers });
  }

  public static getRisks(req: Request, res: Response) {
    const risks = FiscalProductionExecutionOrchestrationRiskRegister.getRisks();
    FiscalProductionExecutionOrchestrationAuditService.audit('GET_RISKS', { caller: (req as any).user?.id || 'admin' });
    res.json({ risks });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const validation = FiscalProductionExecutionOrchestrationValidator.validate(input);
    FiscalProductionExecutionOrchestrationAuditService.audit('VALIDATE_INPUT', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(validation);
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const evalResult = FiscalProductionExecutionOrchestrationEvaluationService.evaluate(input);
    FiscalProductionExecutionOrchestrationAuditService.audit('EVALUATE', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(evalResult);
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const decision = FiscalProductionExecutionOrchestrationDecisionService.simulateDecision(input);
    FiscalProductionExecutionOrchestrationAuditService.audit('SIMULATE_DECISION', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(decision);
  }

  public static getReport(req: Request, res: Response) {
    const report = FiscalProductionExecutionOrchestrationReportService.getReport();
    FiscalProductionExecutionOrchestrationAuditService.audit('GET_REPORT', { caller: (req as any).user?.id || 'admin' });
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const logs = FiscalProductionExecutionOrchestrationAuditService.getLogs();
    res.json({ auditTrails: logs });
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'UP', productionExecutionOrchestrationBlueprintOnly: true });
  }
}
