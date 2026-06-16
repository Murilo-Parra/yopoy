import { Request, Response } from 'express';
import {
  FiscalRouteProxyDryRunPolicy,
  FiscalRouteProxyBlueprint,
  FiscalRouteMiddlewareSimulationPlan,
  FiscalRouteTapSimulationPlan,
  FiscalRouteConditionalRoutingSimulation,
  FiscalRouteNoInterceptionEvidence,
  FiscalRouteProxyFallbackSimulation,
  FiscalRouteProxyDependencyMatrix,
  FiscalRouteProxyDryRunBlockerRegister,
  FiscalRouteProxyDryRunRiskRegister,
  FiscalRouteProxyDryRunValidator,
  FiscalRouteProxyDryRunEvaluationService,
  FiscalRouteProxyDryRunDecisionService,
  FiscalRouteProxyDryRunReportService,
  FiscalRouteProxyDryRunAuditService
} from '../dedicated-homologation/route-transition/proxy-dry-run';

export class FiscalRouteProxyDryRunController {
  public static getPolicy(req: Request, res: Response) {
    const policy = FiscalRouteProxyDryRunPolicy.getBaseResult();
    FiscalRouteProxyDryRunAuditService.audit('GET_POLICY', { caller: (req as any).user?.id || 'admin' });
    res.json(policy);
  }

  public static getProxyBlueprint(req: Request, res: Response) {
    const result = FiscalRouteProxyBlueprint.generateBlueprint();
    FiscalRouteProxyDryRunAuditService.audit('GET_PROXY_BLUEPRINT', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getMiddlewareSimulation(req: Request, res: Response) {
    const result = FiscalRouteMiddlewareSimulationPlan.generatePlan();
    FiscalRouteProxyDryRunAuditService.audit('GET_MIDDLEWARE_SIMULATION', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getTapSimulation(req: Request, res: Response) {
    const result = FiscalRouteTapSimulationPlan.generatePlan();
    FiscalRouteProxyDryRunAuditService.audit('GET_TAP_SIMULATION', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getConditionalRoutingSimulation(req: Request, res: Response) {
    const result = FiscalRouteConditionalRoutingSimulation.simulateRouting();
    FiscalRouteProxyDryRunAuditService.audit('GET_CONDITIONAL_ROUTING_SIMULATION', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getNoInterceptionEvidence(req: Request, res: Response) {
    const result = FiscalRouteNoInterceptionEvidence.generateEvidence();
    FiscalRouteProxyDryRunAuditService.audit('GET_NO_INTERCEPTION_EVIDENCE', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getFallbackSimulation(req: Request, res: Response) {
    const result = FiscalRouteProxyFallbackSimulation.simulateFallback();
    FiscalRouteProxyDryRunAuditService.audit('GET_FALLBACK_SIMULATION', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    const result = FiscalRouteProxyDependencyMatrix.generateMatrix();
    FiscalRouteProxyDryRunAuditService.audit('GET_DEPENDENCY_MATRIX', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getBlockers(req: Request, res: Response) {
    const blockers = FiscalRouteProxyDryRunBlockerRegister.getBlockers();
    FiscalRouteProxyDryRunAuditService.audit('GET_BLOCKERS', { caller: (req as any).user?.id || 'admin' });
    res.json({ blockers });
  }

  public static getRisks(req: Request, res: Response) {
    const risks = FiscalRouteProxyDryRunRiskRegister.getRisks();
    FiscalRouteProxyDryRunAuditService.audit('GET_RISKS', { caller: (req as any).user?.id || 'admin' });
    res.json({ risks });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const validation = FiscalRouteProxyDryRunValidator.validate(input);
    FiscalRouteProxyDryRunAuditService.audit('VALIDATE_INPUT', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(validation);
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const evalResult = FiscalRouteProxyDryRunEvaluationService.evaluate(input);
    FiscalRouteProxyDryRunAuditService.audit('EVALUATE', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(evalResult);
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const decision = FiscalRouteProxyDryRunDecisionService.simulateDecision(input);
    FiscalRouteProxyDryRunAuditService.audit('SIMULATE_DECISION', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(decision);
  }

  public static getReport(req: Request, res: Response) {
    const report = FiscalRouteProxyDryRunReportService.getReport();
    FiscalRouteProxyDryRunAuditService.audit('GET_REPORT', { caller: (req as any).user?.id || 'admin' });
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const logs = FiscalRouteProxyDryRunAuditService.getLogs();
    res.json({ auditTrails: logs });
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'UP', proxyMiddlewareDryRunOnly: true, noInterceptionSimulationOnly: true });
  }
}
