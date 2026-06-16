import { Request, Response } from 'express';
import {
  FiscalProductionTrafficArchitecturePolicy,
  FiscalProductionTrafficArchitectureGovernanceBlueprint,
  FiscalProductionHardNoRoutingExecutionContract,
  FiscalProductionTrafficTopologyInventory,
  FiscalProductionLegacyRoutePreservationPlan,
  FiscalProductionV2RouteLockedPlan,
  FiscalProductionLoadBalancerNoChangePlan,
  FiscalProductionDnsNoChangePlan,
  FiscalProductionProxyMiddlewareNoInstallPlan,
  FiscalProductionShadowTrafficNoActivationPlan,
  FiscalProductionTrafficMutationBlockMatrix,
  FiscalProductionRoutingExecutionBoundaryMatrix,
  FiscalProductionTrafficArchitectureDependencyMatrix,
  FiscalProductionTrafficArchitectureBlockerRegister,
  FiscalProductionTrafficArchitectureRiskRegister,
  FiscalProductionTrafficArchitectureValidator,
  FiscalProductionTrafficArchitectureEvaluationService,
  FiscalProductionTrafficArchitectureDecisionService,
  FiscalProductionTrafficArchitectureReportService,
  FiscalProductionTrafficArchitectureAuditService
} from '../dedicated-homologation/production-traffic-architecture-governance';

export class FiscalProductionTrafficArchitectureController {
  public static getPolicy(req: Request, res: Response) {
    res.json(FiscalProductionTrafficArchitecturePolicy.getPolicy());
  }

  public static getTrafficArchitectureGovernanceBlueprint(req: Request, res: Response) {
    res.json(FiscalProductionTrafficArchitectureGovernanceBlueprint.getBlueprint());
  }

  public static getHardNoRoutingExecutionContract(req: Request, res: Response) {
    res.json(FiscalProductionHardNoRoutingExecutionContract.getContract());
  }

  public static getTrafficTopologyInventory(req: Request, res: Response) {
    res.json(FiscalProductionTrafficTopologyInventory.getInventory());
  }

  public static getLegacyRoutePreservationPlan(req: Request, res: Response) {
    res.json(FiscalProductionLegacyRoutePreservationPlan.getPlan());
  }

  public static getV2RouteLockedPlan(req: Request, res: Response) {
    res.json(FiscalProductionV2RouteLockedPlan.getPlan());
  }

  public static getLoadBalancerNoChangePlan(req: Request, res: Response) {
    res.json(FiscalProductionLoadBalancerNoChangePlan.getPlan());
  }

  public static getDnsNoChangePlan(req: Request, res: Response) {
    res.json(FiscalProductionDnsNoChangePlan.getPlan());
  }

  public static getProxyMiddlewareNoInstallPlan(req: Request, res: Response) {
    res.json(FiscalProductionProxyMiddlewareNoInstallPlan.getPlan());
  }

  public static getShadowTrafficNoActivationPlan(req: Request, res: Response) {
    res.json(FiscalProductionShadowTrafficNoActivationPlan.getPlan());
  }

  public static getTrafficMutationBlockMatrix(req: Request, res: Response) {
    res.json(FiscalProductionTrafficMutationBlockMatrix.getMatrix());
  }

  public static getRoutingExecutionBoundaryMatrix(req: Request, res: Response) {
    res.json(FiscalProductionRoutingExecutionBoundaryMatrix.getMatrix());
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    res.json(FiscalProductionTrafficArchitectureDependencyMatrix.getMatrix());
  }

  public static getBlockers(req: Request, res: Response) {
    res.json({ blockers: FiscalProductionTrafficArchitectureBlockerRegister.getBlockers() });
  }

  public static getRisks(req: Request, res: Response) {
    res.json({ risks: FiscalProductionTrafficArchitectureRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const errors = FiscalProductionTrafficArchitectureValidator.validate(input);
    res.json({ valid: errors.length === 0, errors });
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const warnings = FiscalProductionTrafficArchitectureEvaluationService.evaluate(input);
    res.json({ evaluated: true, warnings });
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionTrafficArchitectureDecisionService.simulateDecision(input);
    res.json(result);
  }

  public static getReport(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionTrafficArchitectureDecisionService.simulateDecision(input);
    const report = FiscalProductionTrafficArchitectureReportService.generateReport(result);
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionTrafficArchitectureDecisionService.simulateDecision(input);
    const audit = FiscalProductionTrafficArchitectureAuditService.generateAuditRecord(result);
    res.json(audit);
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'ok', module: 'Production Traffic Architecture Governance Blueprint & Hard No-Routing Execution Contract', readOnly: true });
  }
}
