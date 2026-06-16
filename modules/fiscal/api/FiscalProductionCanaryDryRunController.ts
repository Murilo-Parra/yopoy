import { Request, Response } from 'express';
import {
  FiscalProductionCanaryDryRunPolicy,
  FiscalProductionCanaryScopeCatalog,
  FiscalProductionTenantEligibilityMatrix,
  FiscalProductionTrafficSwitchDryRunPlan,
  FiscalProductionCanaryPercentagePlan,
  FiscalProductionCanaryKillSwitchReadiness,
  FiscalProductionCanaryRollbackReadiness,
  FiscalProductionCanaryDryRunBlockerRegister,
  FiscalProductionCanaryDryRunRiskRegister,
  FiscalProductionCanaryDryRunValidator,
  FiscalProductionCanaryDryRunEvaluationService,
  FiscalProductionCanaryDryRunDecisionService,
  FiscalProductionCanaryDryRunReportService,
  FiscalProductionCanaryDryRunAuditService
} from '../dedicated-homologation/production-activation/canary-dry-run';

export class FiscalProductionCanaryDryRunController {
  public static getPolicy(req: Request, res: Response) {
    const policy = FiscalProductionCanaryDryRunPolicy.getBaseResult();
    FiscalProductionCanaryDryRunAuditService.audit('GET_POLICY', { caller: (req as any).user?.id || 'admin' });
    res.json(policy);
  }

  public static getScopeCatalog(req: Request, res: Response) {
    const result = FiscalProductionCanaryScopeCatalog.generateCatalog(req.body);
    FiscalProductionCanaryDryRunAuditService.audit('GET_SCOPE_CATALOG', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getTenantEligibility(req: Request, res: Response) {
    const result = FiscalProductionTenantEligibilityMatrix.generateMatrix();
    FiscalProductionCanaryDryRunAuditService.audit('GET_TENANT_ELIGIBILITY', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getTrafficSwitchPlan(req: Request, res: Response) {
    const result = FiscalProductionTrafficSwitchDryRunPlan.generatePlan();
    FiscalProductionCanaryDryRunAuditService.audit('GET_TRAFFIC_SWITCH_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getPercentagePlan(req: Request, res: Response) {
    const intended = req.query.intended || req.body.intendedCanaryPercentage || 0;
    const result = FiscalProductionCanaryPercentagePlan.generatePlan(Number(intended));
    FiscalProductionCanaryDryRunAuditService.audit('GET_PERCENTAGE_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getKillSwitchReadiness(req: Request, res: Response) {
    const result = FiscalProductionCanaryKillSwitchReadiness.generateReadiness();
    FiscalProductionCanaryDryRunAuditService.audit('GET_KILL_SWITCH_READINESS', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getRollbackReadiness(req: Request, res: Response) {
    const result = FiscalProductionCanaryRollbackReadiness.generateReadiness();
    FiscalProductionCanaryDryRunAuditService.audit('GET_ROLLBACK_READINESS', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getBlockers(req: Request, res: Response) {
    const blockers = FiscalProductionCanaryDryRunBlockerRegister.getBlockers();
    FiscalProductionCanaryDryRunAuditService.audit('GET_BLOCKERS', { caller: (req as any).user?.id || 'admin' });
    res.json({ blockers });
  }

  public static getRisks(req: Request, res: Response) {
    const risks = FiscalProductionCanaryDryRunRiskRegister.getRisks();
    FiscalProductionCanaryDryRunAuditService.audit('GET_RISKS', { caller: (req as any).user?.id || 'admin' });
    res.json({ risks });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const validation = FiscalProductionCanaryDryRunValidator.validate(input);
    FiscalProductionCanaryDryRunAuditService.audit('VALIDATE_INPUT', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(validation);
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const evalResult = FiscalProductionCanaryDryRunEvaluationService.evaluate(input);
    FiscalProductionCanaryDryRunAuditService.audit('EVALUATE', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(evalResult);
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const decision = FiscalProductionCanaryDryRunDecisionService.simulateDecision(input);
    FiscalProductionCanaryDryRunAuditService.audit('SIMULATE_DECISION', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(decision);
  }

  public static getReport(req: Request, res: Response) {
    const report = FiscalProductionCanaryDryRunReportService.getReport();
    FiscalProductionCanaryDryRunAuditService.audit('GET_REPORT', { caller: (req as any).user?.id || 'admin' });
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const logs = FiscalProductionCanaryDryRunAuditService.getLogs();
    res.json({ auditTrails: logs });
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'UP', canaryScopeDryRunOnly: true, trafficSwitchDryRunOnly: true });
  }
}
