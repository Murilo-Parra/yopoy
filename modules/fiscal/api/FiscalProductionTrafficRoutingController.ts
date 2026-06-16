import { Request, Response } from 'express';
import { FiscalProductionNoTrafficMutationEvidence } from '../dedicated-homologation/production-go-live-cutover/traffic-routing-dry-run/FiscalProductionNoTrafficMutationEvidence';
import { FiscalProductionTrafficSliceSimulationMatrix } from '../dedicated-homologation/production-go-live-cutover/traffic-routing-dry-run/FiscalProductionTrafficSliceSimulationMatrix';
import {
  FiscalProductionTrafficRoutingPolicy,
  FiscalProductionTrafficRoutingNoOpBlueprint,
  FiscalProductionLoadBalancerSwitchNoOpContract,
  FiscalProductionRouteMappingSimulationMatrix,
  FiscalProductionDnsRoutingNoChangePlan,
  FiscalProductionProxyMiddlewareTapNoInstallMatrix,
  FiscalProductionShadowTrafficNoCapturePlan,
  FiscalProductionLegacyPriorityPreservationPlan,
  FiscalProductionNoLoadBalancerSwitchEvidence,
  FiscalProductionTrafficRoutingDependencyMatrix,
  FiscalProductionTrafficRoutingBlockerRegister,
  FiscalProductionTrafficRoutingRiskRegister,
  FiscalProductionTrafficRoutingValidator,
  FiscalProductionTrafficRoutingEvaluationService,
  FiscalProductionTrafficRoutingDecisionService,
  FiscalProductionTrafficRoutingReportService,
  FiscalProductionTrafficRoutingAuditService
} from '../dedicated-homologation/production-go-live-cutover/traffic-routing-dry-run';

export class FiscalProductionTrafficRoutingController {
  public static getPolicy(req: Request, res: Response) {
    res.json(FiscalProductionTrafficRoutingPolicy.getPolicy());
  }

  public static getTrafficRoutingNoOpBlueprint(req: Request, res: Response) {
    res.json(FiscalProductionTrafficRoutingNoOpBlueprint.getBlueprint());
  }

  public static getLoadBalancerSwitchNoOpContract(req: Request, res: Response) {
    res.json(FiscalProductionLoadBalancerSwitchNoOpContract.getContract());
  }

  public static getRouteMappingSimulationMatrix(req: Request, res: Response) {
    res.json(FiscalProductionRouteMappingSimulationMatrix.getMatrix());
  }

  public static getDnsRoutingNoChangePlan(req: Request, res: Response) {
    res.json(FiscalProductionDnsRoutingNoChangePlan.getPlan());
  }

  public static getProxyMiddlewareTapNoInstallMatrix(req: Request, res: Response) {
    res.json(FiscalProductionProxyMiddlewareTapNoInstallMatrix.getMatrix());
  }

  public static getShadowTrafficNoCapturePlan(req: Request, res: Response) {
    res.json(FiscalProductionShadowTrafficNoCapturePlan.getPlan());
  }

  public static getTrafficSliceSimulationMatrix(req: Request, res: Response) {
    res.json(FiscalProductionTrafficSliceSimulationMatrix.getMatrix());
  }

  public static getLegacyPriorityPreservationPlan(req: Request, res: Response) {
    res.json(FiscalProductionLegacyPriorityPreservationPlan.getPlan());
  }

  public static getNoTrafficMutationEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoTrafficMutationEvidence.getEvidence());
  }

  public static getNoLoadBalancerSwitchEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoLoadBalancerSwitchEvidence.getEvidence());
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    res.json(FiscalProductionTrafficRoutingDependencyMatrix.getMatrix());
  }

  public static getBlockers(req: Request, res: Response) {
    res.json({ blockers: FiscalProductionTrafficRoutingBlockerRegister.getBlockers() });
  }

  public static getRisks(req: Request, res: Response) {
    res.json({ risks: FiscalProductionTrafficRoutingRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const errors = FiscalProductionTrafficRoutingValidator.validate(input);
    res.json({ valid: errors.length === 0, errors });
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const warnings = FiscalProductionTrafficRoutingEvaluationService.evaluate(input);
    res.json({ evaluated: true, warnings });
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionTrafficRoutingDecisionService.simulateDecision(input);
    res.json(result);
  }

  public static getReport(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionTrafficRoutingDecisionService.simulateDecision(input);
    const report = FiscalProductionTrafficRoutingReportService.generateReport(result);
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionTrafficRoutingDecisionService.simulateDecision(input);
    const audit = FiscalProductionTrafficRoutingAuditService.generateAuditRecord(result);
    res.json(audit);
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'ok', module: 'Production Traffic Routing, Load Balancer & Shadow Cutover No-Op Dry-Run', readOnly: true });
  }
}
