import { Request, Response } from 'express';
import {
  FiscalProductionLoadBalancerDnsPolicy,
  FiscalProductionLoadBalancerReadOnlyMappingBlueprint,
  FiscalProductionDnsReadOnlyMappingBlueprint,
  FiscalProductionLoadBalancerNoSwitchEvidence,
  FiscalProductionDnsNoChangeEvidence,
  FiscalProductionRoutingTargetSimulationMatrix,
  FiscalProductionLegacyEndpointContinuityMatrix,
  FiscalProductionV2EndpointNoActivationMatrix,
  FiscalProductionGatewayNoMutationPlan,
  FiscalProductionNetworkRecordNoWritePlan,
  FiscalProductionLoadBalancerDnsDependencyMatrix,
  FiscalProductionLoadBalancerDnsBlockerRegister,
  FiscalProductionLoadBalancerDnsRiskRegister,
  FiscalProductionLoadBalancerDnsValidator,
  FiscalProductionLoadBalancerDnsEvaluationService,
  FiscalProductionLoadBalancerDnsDecisionService,
  FiscalProductionLoadBalancerDnsReportService,
  FiscalProductionLoadBalancerDnsAuditService
} from '../dedicated-homologation/production-traffic-architecture-governance/load-balancer-dns-dry-run';

export class FiscalProductionLoadBalancerDnsController {
  public static getPolicy(req: Request, res: Response) {
    res.json(FiscalProductionLoadBalancerDnsPolicy.getPolicy());
  }

  public static getLoadBalancerBlueprint(req: Request, res: Response) {
    res.json(FiscalProductionLoadBalancerReadOnlyMappingBlueprint.getBlueprint());
  }

  public static getDnsBlueprint(req: Request, res: Response) {
    res.json(FiscalProductionDnsReadOnlyMappingBlueprint.getBlueprint());
  }

  public static getLoadBalancerEvidence(req: Request, res: Response) {
    res.json(FiscalProductionLoadBalancerNoSwitchEvidence.getEvidence());
  }

  public static getDnsEvidence(req: Request, res: Response) {
    res.json(FiscalProductionDnsNoChangeEvidence.getEvidence());
  }

  public static getRoutingTargetMatrix(req: Request, res: Response) {
    res.json(FiscalProductionRoutingTargetSimulationMatrix.getMatrix());
  }

  public static getLegacyContinuityMatrix(req: Request, res: Response) {
    res.json(FiscalProductionLegacyEndpointContinuityMatrix.getMatrix());
  }

  public static getV2NoActivationMatrix(req: Request, res: Response) {
    res.json(FiscalProductionV2EndpointNoActivationMatrix.getMatrix());
  }

  public static getGatewayPlan(req: Request, res: Response) {
    res.json(FiscalProductionGatewayNoMutationPlan.getPlan());
  }

  public static getNetworkRecordPlan(req: Request, res: Response) {
    res.json(FiscalProductionNetworkRecordNoWritePlan.getPlan());
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    res.json(FiscalProductionLoadBalancerDnsDependencyMatrix.getMatrix());
  }

  public static getBlockers(req: Request, res: Response) {
    res.json({ blockers: FiscalProductionLoadBalancerDnsBlockerRegister.getBlockers() });
  }

  public static getRisks(req: Request, res: Response) {
    res.json({ risks: FiscalProductionLoadBalancerDnsRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const errors = FiscalProductionLoadBalancerDnsValidator.validate(input);
    res.json({ valid: errors.length === 0, errors });
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const warnings = FiscalProductionLoadBalancerDnsEvaluationService.evaluate(input);
    res.json({ evaluated: true, warnings });
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionLoadBalancerDnsDecisionService.simulateDecision(input);
    res.json(result);
  }

  public static getReport(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionLoadBalancerDnsDecisionService.simulateDecision(input);
    res.json(FiscalProductionLoadBalancerDnsReportService.generateReport(result));
  }

  public static getAudit(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionLoadBalancerDnsDecisionService.simulateDecision(input);
    res.json(FiscalProductionLoadBalancerDnsAuditService.generateAuditRecord(result));
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'ok', module: 'Production Load Balancer & DNS Read-Only Mapping No-Change Dry-Run', readOnly: true });
  }
}
