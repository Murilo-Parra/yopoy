import { Request, Response } from 'express';
import {
  FiscalProductionProxyShadowPolicy,
  FiscalProductionProxyMiddlewareNoInstallBlueprint,
  FiscalProductionTapMirrorSnifferNoActivationPlan,
  FiscalProductionShadowTrafficNoCaptureBlueprint,
  FiscalProductionRequestResponseNoCaptureMatrix,
  FiscalProductionPayloadDuplicationNoOpPlan,
  FiscalProductionLegacyHandlerNoSideEffectPlan,
  FiscalProductionV2HandlerNoCallPlan,
  FiscalProductionTrafficMirrorNoMutationEvidence,
  FiscalProductionProxyShadowBoundaryMatrix,
  FiscalProductionProxyShadowDependencyMatrix,
  FiscalProductionProxyShadowBlockerRegister,
  FiscalProductionProxyShadowRiskRegister,
  FiscalProductionProxyShadowValidator,
  FiscalProductionProxyShadowEvaluationService,
  FiscalProductionProxyShadowDecisionService,
  FiscalProductionProxyShadowReportService,
  FiscalProductionProxyShadowAuditService
} from '../dedicated-homologation/production-traffic-architecture-governance/proxy-shadow-dry-run';

export class FiscalProductionProxyShadowController {
  public static getPolicy(req: Request, res: Response) {
    res.json(FiscalProductionProxyShadowPolicy.getPolicy());
  }

  public static getProxyMiddlewareNoInstallBlueprint(req: Request, res: Response) {
    res.json(FiscalProductionProxyMiddlewareNoInstallBlueprint.getBlueprint());
  }

  public static getTapMirrorSnifferNoActivationPlan(req: Request, res: Response) {
    res.json(FiscalProductionTapMirrorSnifferNoActivationPlan.getPlan());
  }

  public static getShadowTrafficNoCaptureBlueprint(req: Request, res: Response) {
    res.json(FiscalProductionShadowTrafficNoCaptureBlueprint.getBlueprint());
  }

  public static getRequestResponseNoCaptureMatrix(req: Request, res: Response) {
    res.json(FiscalProductionRequestResponseNoCaptureMatrix.getMatrix());
  }

  public static getPayloadDuplicationNoOpPlan(req: Request, res: Response) {
    res.json(FiscalProductionPayloadDuplicationNoOpPlan.getPlan());
  }

  public static getLegacyHandlerNoSideEffectPlan(req: Request, res: Response) {
    res.json(FiscalProductionLegacyHandlerNoSideEffectPlan.getPlan());
  }

  public static getV2HandlerNoCallPlan(req: Request, res: Response) {
    res.json(FiscalProductionV2HandlerNoCallPlan.getPlan());
  }

  public static getTrafficMirrorNoMutationEvidence(req: Request, res: Response) {
    res.json(FiscalProductionTrafficMirrorNoMutationEvidence.getEvidence());
  }

  public static getProxyShadowBoundaryMatrix(req: Request, res: Response) {
    res.json(FiscalProductionProxyShadowBoundaryMatrix.getMatrix());
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    res.json(FiscalProductionProxyShadowDependencyMatrix.getMatrix());
  }

  public static getBlockers(req: Request, res: Response) {
    res.json({ blockers: FiscalProductionProxyShadowBlockerRegister.getBlockers() });
  }

  public static getRisks(req: Request, res: Response) {
    res.json({ risks: FiscalProductionProxyShadowRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const errors = FiscalProductionProxyShadowValidator.validate(input);
    res.json({ valid: errors.length === 0, errors });
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const warnings = FiscalProductionProxyShadowEvaluationService.evaluate(input);
    res.json({ evaluated: true, warnings });
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionProxyShadowDecisionService.simulateDecision(input);
    res.json(result);
  }

  public static getReport(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionProxyShadowDecisionService.simulateDecision(input);
    res.json(FiscalProductionProxyShadowReportService.generateReport(result));
  }

  public static getAudit(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionProxyShadowDecisionService.simulateDecision(input);
    res.json(FiscalProductionProxyShadowAuditService.generateAuditRecord(result));
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'ok', module: 'Production Proxy, Middleware, Tap, Mirror & Shadow Traffic No-Install / No-Capture Dry-Run', readOnly: true });
  }
}
