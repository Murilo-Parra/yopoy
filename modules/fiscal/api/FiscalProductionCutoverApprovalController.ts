import { Request, Response } from 'express';
import {
  FiscalProductionCutoverApprovalPolicy,
  FiscalProductionCutoverReadinessPlan,
  FiscalProductionRollbackGovernancePlan,
  FiscalProductionGoNoGoApprovalMatrix,
  FiscalProductionChangeWindowReadiness,
  FiscalProductionOperationalFreezePlan,
  FiscalProductionCutoverAbortCriteria,
  FiscalProductionCutoverDependencyMatrix,
  FiscalProductionCutoverApprovalBlockerRegister,
  FiscalProductionCutoverApprovalRiskRegister,
  FiscalProductionCutoverApprovalValidator,
  FiscalProductionCutoverApprovalEvaluationService,
  FiscalProductionCutoverApprovalDecisionService,
  FiscalProductionCutoverApprovalReportService,
  FiscalProductionCutoverApprovalAuditService
} from '../dedicated-homologation/production-deployment-isolation/cutover-approval-dry-run';

export class FiscalProductionCutoverApprovalController {
  public static getPolicy(req: Request, res: Response) {
    const policy = FiscalProductionCutoverApprovalPolicy.getBaseResult();
    FiscalProductionCutoverApprovalAuditService.audit('GET_POLICY', { caller: (req as any).user?.id || 'admin' });
    res.json(policy);
  }

  public static getCutoverReadinessPlan(req: Request, res: Response) {
    const result = FiscalProductionCutoverReadinessPlan.generatePlan();
    FiscalProductionCutoverApprovalAuditService.audit('GET_CUTOVER_READINESS_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getRollbackGovernancePlan(req: Request, res: Response) {
    const result = FiscalProductionRollbackGovernancePlan.generatePlan();
    FiscalProductionCutoverApprovalAuditService.audit('GET_ROLLBACK_GOVERNANCE_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getGoNoGoApprovalMatrix(req: Request, res: Response) {
    const result = FiscalProductionGoNoGoApprovalMatrix.generateMatrix();
    FiscalProductionCutoverApprovalAuditService.audit('GET_GONOGO_APPROVAL_MATRIX', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getChangeWindowReadiness(req: Request, res: Response) {
    const result = FiscalProductionChangeWindowReadiness.generateReadiness();
    FiscalProductionCutoverApprovalAuditService.audit('GET_CHANGE_WINDOW_READINESS', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getOperationalFreezePlan(req: Request, res: Response) {
    const result = FiscalProductionOperationalFreezePlan.generatePlan();
    FiscalProductionCutoverApprovalAuditService.audit('GET_OPERATIONAL_FREEZE_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getCutoverAbortCriteria(req: Request, res: Response) {
    const result = FiscalProductionCutoverAbortCriteria.generateCriteria();
    FiscalProductionCutoverApprovalAuditService.audit('GET_CUTOVER_ABORT_CRITERIA', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    const result = FiscalProductionCutoverDependencyMatrix.generateMatrix();
    FiscalProductionCutoverApprovalAuditService.audit('GET_DEPENDENCY_MATRIX', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getBlockers(req: Request, res: Response) {
    const blockers = FiscalProductionCutoverApprovalBlockerRegister.getBlockers();
    FiscalProductionCutoverApprovalAuditService.audit('GET_BLOCKERS', { caller: (req as any).user?.id || 'admin' });
    res.json({ blockers });
  }

  public static getRisks(req: Request, res: Response) {
    const risks = FiscalProductionCutoverApprovalRiskRegister.getRisks();
    FiscalProductionCutoverApprovalAuditService.audit('GET_RISKS', { caller: (req as any).user?.id || 'admin' });
    res.json({ risks });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const validation = FiscalProductionCutoverApprovalValidator.validate(input);
    FiscalProductionCutoverApprovalAuditService.audit('VALIDATE_INPUT', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(validation);
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const evalResult = FiscalProductionCutoverApprovalEvaluationService.evaluate(input);
    FiscalProductionCutoverApprovalAuditService.audit('EVALUATE', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(evalResult);
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const decision = FiscalProductionCutoverApprovalDecisionService.simulateDecision(input);
    FiscalProductionCutoverApprovalAuditService.audit('SIMULATE_DECISION', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(decision);
  }

  public static getReport(req: Request, res: Response) {
    const report = FiscalProductionCutoverApprovalReportService.getReport();
    FiscalProductionCutoverApprovalAuditService.audit('GET_REPORT', { caller: (req as any).user?.id || 'admin' });
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const logs = FiscalProductionCutoverApprovalAuditService.getLogs();
    res.json({ auditTrails: logs });
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'UP', productionCutoverApprovalDryRunOnly: true, rollbackGovernanceDryRunOnly: true });
  }
}
