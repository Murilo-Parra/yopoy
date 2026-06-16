import { Request, Response } from 'express';
import {
  FiscalProductionReleaseGatewayPolicy,
  FiscalProductionReleaseHandshakePlan,
  FiscalProductionAuthorizationDependencyCheck,
  FiscalProductionLegalAuditDependencyCheck,
  FiscalProductionCanaryDependencyCheck,
  FiscalProductionRollbackDependencyCheck,
  FiscalProductionKillSwitchDependencyCheck,
  FiscalProductionSefazReadinessCheck,
  FiscalProductionReleaseGatewayBlockerRegister,
  FiscalProductionReleaseGatewayRiskRegister,
  FiscalProductionReleaseGatewayValidator,
  FiscalProductionReleaseGatewayEvaluationService,
  FiscalProductionReleaseGatewayDecisionService,
  FiscalProductionReleaseGatewayReportService,
  FiscalProductionReleaseGatewayAuditService
} from '../dedicated-homologation/production-activation/release-gateway';

export class FiscalProductionReleaseGatewayController {
  public static getPolicy(req: Request, res: Response) {
    const policy = FiscalProductionReleaseGatewayPolicy.getBaseResult();
    FiscalProductionReleaseGatewayAuditService.audit('GET_POLICY', { caller: (req as any).user?.id || 'admin' });
    res.json(policy);
  }

  public static getHandshakePlan(req: Request, res: Response) {
    const result = FiscalProductionReleaseHandshakePlan.generatePlan();
    FiscalProductionReleaseGatewayAuditService.audit('GET_HANDSHAKE_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getAuthorizationDependency(req: Request, res: Response) {
    const result = FiscalProductionAuthorizationDependencyCheck.check();
    FiscalProductionReleaseGatewayAuditService.audit('GET_AUTH_DEPENDENCY', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getLegalAuditDependency(req: Request, res: Response) {
    const result = FiscalProductionLegalAuditDependencyCheck.check();
    FiscalProductionReleaseGatewayAuditService.audit('GET_LEGAL_AUDIT_DEPENDENCY', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getCanaryDependency(req: Request, res: Response) {
    const result = FiscalProductionCanaryDependencyCheck.check();
    FiscalProductionReleaseGatewayAuditService.audit('GET_CANARY_DEPENDENCY', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getRollbackDependency(req: Request, res: Response) {
    const result = FiscalProductionRollbackDependencyCheck.check();
    FiscalProductionReleaseGatewayAuditService.audit('GET_ROLLBACK_DEPENDENCY', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getKillSwitchDependency(req: Request, res: Response) {
    const result = FiscalProductionKillSwitchDependencyCheck.check();
    FiscalProductionReleaseGatewayAuditService.audit('GET_KILL_SWITCH_DEPENDENCY', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getSefazReadiness(req: Request, res: Response) {
    const result = FiscalProductionSefazReadinessCheck.check();
    FiscalProductionReleaseGatewayAuditService.audit('GET_SEFAZ_READINESS', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getBlockers(req: Request, res: Response) {
    const blockers = FiscalProductionReleaseGatewayBlockerRegister.getBlockers();
    FiscalProductionReleaseGatewayAuditService.audit('GET_BLOCKERS', { caller: (req as any).user?.id || 'admin' });
    res.json({ blockers });
  }

  public static getRisks(req: Request, res: Response) {
    const risks = FiscalProductionReleaseGatewayRiskRegister.getRisks();
    FiscalProductionReleaseGatewayAuditService.audit('GET_RISKS', { caller: (req as any).user?.id || 'admin' });
    res.json({ risks });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const validation = FiscalProductionReleaseGatewayValidator.validate(input);
    FiscalProductionReleaseGatewayAuditService.audit('VALIDATE_INPUT', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(validation);
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const evalResult = FiscalProductionReleaseGatewayEvaluationService.evaluate(input);
    FiscalProductionReleaseGatewayAuditService.audit('EVALUATE', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(evalResult);
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const decision = FiscalProductionReleaseGatewayDecisionService.simulateDecision(input);
    FiscalProductionReleaseGatewayAuditService.audit('SIMULATE_DECISION', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(decision);
  }

  public static getReport(req: Request, res: Response) {
    const report = FiscalProductionReleaseGatewayReportService.getReport();
    FiscalProductionReleaseGatewayAuditService.audit('GET_REPORT', { caller: (req as any).user?.id || 'admin' });
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const logs = FiscalProductionReleaseGatewayAuditService.getLogs();
    res.json({ auditTrails: logs });
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'UP', productionReleaseGatewayDryRunOnly: true, zeroExecutionReadinessValidatorOnly: true });
  }
}
