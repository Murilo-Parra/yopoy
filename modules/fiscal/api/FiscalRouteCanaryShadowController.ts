import { Request, Response } from 'express';
import {
  FiscalRouteCanaryShadowPolicy,
  FiscalRouteCanaryScopeSimulation,
  FiscalRouteShadowTrafficSimulationPlan,
  FiscalRouteTrafficMirrorApprovalGate,
  FiscalRouteCanaryEligibilityMatrix,
  FiscalRouteMirrorSafetyChecklist,
  FiscalRouteShadowNoCaptureEvidence,
  FiscalRouteCanaryRollbackReadiness,
  FiscalRouteCanaryShadowDependencyMatrix,
  FiscalRouteCanaryShadowBlockerRegister,
  FiscalRouteCanaryShadowRiskRegister,
  FiscalRouteCanaryShadowValidator,
  FiscalRouteCanaryShadowEvaluationService,
  FiscalRouteCanaryShadowDecisionService,
  FiscalRouteCanaryShadowReportService,
  FiscalRouteCanaryShadowAuditService
} from '../dedicated-homologation/route-transition/canary-shadow-dry-run';

export class FiscalRouteCanaryShadowController {
  public static getPolicy(req: Request, res: Response) {
    const policy = FiscalRouteCanaryShadowPolicy.getBaseResult();
    FiscalRouteCanaryShadowAuditService.audit('GET_POLICY', { caller: (req as any).user?.id || 'admin' });
    res.json(policy);
  }

  public static getCanaryScopeSimulation(req: Request, res: Response) {
    const result = FiscalRouteCanaryScopeSimulation.simulateScope();
    FiscalRouteCanaryShadowAuditService.audit('GET_CANARY_SCOPE_SIMULATION', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getShadowTrafficPlan(req: Request, res: Response) {
    const result = FiscalRouteShadowTrafficSimulationPlan.generatePlan();
    FiscalRouteCanaryShadowAuditService.audit('GET_SHADOW_TRAFFIC_PLAN', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getTrafficMirrorApprovalGate(req: Request, res: Response) {
    const result = FiscalRouteTrafficMirrorApprovalGate.generateGate();
    FiscalRouteCanaryShadowAuditService.audit('GET_TRAFFIC_MIRROR_APPROVAL_GATE', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getCanaryEligibility(req: Request, res: Response) {
    const result = FiscalRouteCanaryEligibilityMatrix.generateMatrix();
    FiscalRouteCanaryShadowAuditService.audit('GET_CANARY_ELIGIBILITY', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getMirrorSafetyChecklist(req: Request, res: Response) {
    const result = FiscalRouteMirrorSafetyChecklist.getChecklist();
    FiscalRouteCanaryShadowAuditService.audit('GET_MIRROR_SAFETY_CHECKLIST', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getShadowNoCaptureEvidence(req: Request, res: Response) {
    const result = FiscalRouteShadowNoCaptureEvidence.generateEvidence();
    FiscalRouteCanaryShadowAuditService.audit('GET_SHADOW_NO_CAPTURE_EVIDENCE', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getCanaryRollbackReadiness(req: Request, res: Response) {
    const result = FiscalRouteCanaryRollbackReadiness.review();
    FiscalRouteCanaryShadowAuditService.audit('GET_CANARY_ROLLBACK_READINESS', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    const result = FiscalRouteCanaryShadowDependencyMatrix.generateMatrix();
    FiscalRouteCanaryShadowAuditService.audit('GET_DEPENDENCY_MATRIX', { caller: (req as any).user?.id || 'admin' });
    res.json(result);
  }

  public static getBlockers(req: Request, res: Response) {
    const blockers = FiscalRouteCanaryShadowBlockerRegister.getBlockers();
    FiscalRouteCanaryShadowAuditService.audit('GET_BLOCKERS', { caller: (req as any).user?.id || 'admin' });
    res.json({ blockers });
  }

  public static getRisks(req: Request, res: Response) {
    const risks = FiscalRouteCanaryShadowRiskRegister.getRisks();
    FiscalRouteCanaryShadowAuditService.audit('GET_RISKS', { caller: (req as any).user?.id || 'admin' });
    res.json({ risks });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const validation = FiscalRouteCanaryShadowValidator.validate(input);
    FiscalRouteCanaryShadowAuditService.audit('VALIDATE_INPUT', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(validation);
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const evalResult = FiscalRouteCanaryShadowEvaluationService.evaluate(input);
    FiscalRouteCanaryShadowAuditService.audit('EVALUATE', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(evalResult);
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const decision = FiscalRouteCanaryShadowDecisionService.simulateDecision(input);
    FiscalRouteCanaryShadowAuditService.audit('SIMULATE_DECISION', { caller: (req as any).user?.id || 'admin', inputKeys: Object.keys(input) });
    res.json(decision);
  }

  public static getReport(req: Request, res: Response) {
    const report = FiscalRouteCanaryShadowReportService.getReport();
    FiscalRouteCanaryShadowAuditService.audit('GET_REPORT', { caller: (req as any).user?.id || 'admin' });
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const logs = FiscalRouteCanaryShadowAuditService.getLogs();
    res.json({ auditTrails: logs });
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'UP', canaryShadowingDryRunOnly: true, trafficMirrorApprovalGateOnly: true });
  }
}
