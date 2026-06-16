import { Request, Response } from 'express';
import {
  FiscalRouteTransitionPolicy,
  FiscalRouteTransitionBlueprint,
  FiscalLegacyRouteInventory,
  FiscalV2RouteReadinessInventory,
  FiscalLegacyPreservationContract,
  FiscalNoInterceptionContract,
  FiscalRouteFallbackPlan,
  FiscalRouteDependencyMatrix,
  FiscalRouteTransitionBlockerRegister,
  FiscalRouteTransitionRiskRegister,
  FiscalRouteTransitionValidator,
  FiscalRouteTransitionEvaluationService,
  FiscalRouteTransitionDecisionService,
  FiscalRouteTransitionReportService,
  FiscalRouteTransitionAuditService
} from '../dedicated-homologation/route-transition';

export class FiscalRouteTransitionController {
  public static getPolicy(req: Request, res: Response) {
    const policy = FiscalRouteTransitionPolicy.getBaseResult();
    FiscalRouteTransitionAuditService.audit('GET_POLICY', { caller: (req as any).user?.id || 'admin' });
    res.json(policy);
  }

  public static getBlueprint(req: Request, res: Response) {
    const result = FiscalRouteTransitionBlueprint.generateBlueprint();
    FiscalRouteTransitionAuditService.audit('GET_BLUEPRINT', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getLegacyRouteInventory(req: Request, res: Response) {
    const result = FiscalLegacyRouteInventory.generateInventory();
    FiscalRouteTransitionAuditService.audit('GET_LEGACY_ROUTE_INVENTORY', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getV2RouteReadiness(req: Request, res: Response) {
    const result = FiscalV2RouteReadinessInventory.generateInventory();
    FiscalRouteTransitionAuditService.audit('GET_V2_ROUTE_READINESS', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getLegacyPreservationContract(req: Request, res: Response) {
    const result = FiscalLegacyPreservationContract.generateContract();
    FiscalRouteTransitionAuditService.audit('GET_LEGACY_PRESERVATION_CONTRACT', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getNoInterceptionContract(req: Request, res: Response) {
    const result = FiscalNoInterceptionContract.generateContract();
    FiscalRouteTransitionAuditService.audit('GET_NO_INTERCEPTION_CONTRACT', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getFallbackPlan(req: Request, res: Response) {
    const result = FiscalRouteFallbackPlan.generatePlan();
    FiscalRouteTransitionAuditService.audit('GET_FALLBACK_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    const result = FiscalRouteDependencyMatrix.generateMatrix();
    FiscalRouteTransitionAuditService.audit('GET_DEPENDENCY_MATRIX', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getBlockers(req: Request, res: Response) {
    const blockers = FiscalRouteTransitionBlockerRegister.getBlockers();
    FiscalRouteTransitionAuditService.audit('GET_BLOCKERS', { caller: (req as any).user?.id || 'admin' });
    res.json({ blockers });
  }

  public static getRisks(req: Request, res: Response) {
    const risks = FiscalRouteTransitionRiskRegister.getRisks();
    FiscalRouteTransitionAuditService.audit('GET_RISKS', { caller: (req as any).user?.id || 'admin' });
    res.json({ risks });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const validation = FiscalRouteTransitionValidator.validate(input);
    FiscalRouteTransitionAuditService.audit('VALIDATE_INPUT', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(validation);
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const evalResult = FiscalRouteTransitionEvaluationService.evaluate(input);
    FiscalRouteTransitionAuditService.audit('EVALUATE', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(evalResult);
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const decision = FiscalRouteTransitionDecisionService.simulateDecision(input);
    FiscalRouteTransitionAuditService.audit('SIMULATE_DECISION', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(decision);
  }

  public static getReport(req: Request, res: Response) {
    const report = FiscalRouteTransitionReportService.getReport();
    FiscalRouteTransitionAuditService.audit('GET_REPORT', { caller: (req as any).user?.id || 'admin' });
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const logs = FiscalRouteTransitionAuditService.getLogs();
    res.json({ auditTrails: logs });
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'UP', routeTransitionBlueprintOnly: true, legacyPreservationContractOnly: true });
  }
}
