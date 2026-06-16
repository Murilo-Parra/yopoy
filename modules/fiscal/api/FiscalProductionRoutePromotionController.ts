import { Request, Response } from 'express';
import { FiscalProductionTrafficSliceSimulationMatrix } from '../dedicated-homologation/production-traffic-architecture-governance/route-promotion-dry-run/FiscalProductionTrafficSliceSimulationMatrix';
import {
  FiscalProductionRoutePromotionPolicy,
  FiscalProductionRoutePromotionNoOpBlueprint,
  FiscalProductionCanaryRoutingNoActivationPlan,
  FiscalProductionTrafficPercentageNoMutationMatrix,
  FiscalProductionRouteToV2BlockedEvidence,
  FiscalProductionLegacyRouteMandatoryPlan,
  FiscalProductionCanaryAbortNoOpMatrix,
  FiscalProductionTrafficPromotionCriteriaSimulation,
  FiscalProductionNoRealRoutePromotionEvidence,
  FiscalProductionNoRealCanaryRoutingEvidence,
  FiscalProductionRoutePromotionDependencyMatrix,
  FiscalProductionRoutePromotionBlockerRegister,
  FiscalProductionRoutePromotionRiskRegister,
  FiscalProductionRoutePromotionValidator,
  FiscalProductionRoutePromotionEvaluationService,
  FiscalProductionRoutePromotionDecisionService,
  FiscalProductionRoutePromotionReportService,
  FiscalProductionRoutePromotionAuditService
} from '../dedicated-homologation/production-traffic-architecture-governance/route-promotion-dry-run';

export class FiscalProductionRoutePromotionController {
  public static getPolicy(req: Request, res: Response) {
    res.json(FiscalProductionRoutePromotionPolicy.getPolicy());
  }

  public static getRoutePromotionNoOpBlueprint(req: Request, res: Response) {
    res.json(FiscalProductionRoutePromotionNoOpBlueprint.getBlueprint());
  }

  public static getTrafficSliceSimulationMatrix(req: Request, res: Response) {
    res.json(FiscalProductionTrafficSliceSimulationMatrix.getMatrix());
  }

  public static getCanaryRoutingNoActivationPlan(req: Request, res: Response) {
    res.json(FiscalProductionCanaryRoutingNoActivationPlan.getPlan());
  }

  public static getTrafficPercentageNoMutationMatrix(req: Request, res: Response) {
    res.json(FiscalProductionTrafficPercentageNoMutationMatrix.getMatrix());
  }

  public static getRouteToV2BlockedEvidence(req: Request, res: Response) {
    res.json(FiscalProductionRouteToV2BlockedEvidence.getEvidence());
  }

  public static getLegacyRouteMandatoryPlan(req: Request, res: Response) {
    res.json(FiscalProductionLegacyRouteMandatoryPlan.getPlan());
  }

  public static getCanaryAbortNoOpMatrix(req: Request, res: Response) {
    res.json(FiscalProductionCanaryAbortNoOpMatrix.getMatrix());
  }

  public static getTrafficPromotionCriteriaSimulation(req: Request, res: Response) {
    res.json(FiscalProductionTrafficPromotionCriteriaSimulation.getSimulation());
  }

  public static getNoRealRoutePromotionEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealRoutePromotionEvidence.getEvidence());
  }

  public static getNoRealCanaryRoutingEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealCanaryRoutingEvidence.getEvidence());
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    res.json(FiscalProductionRoutePromotionDependencyMatrix.getMatrix());
  }

  public static getBlockers(req: Request, res: Response) {
    res.json({ blockers: FiscalProductionRoutePromotionBlockerRegister.getBlockers() });
  }

  public static getRisks(req: Request, res: Response) {
    res.json({ risks: FiscalProductionRoutePromotionRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const errors = FiscalProductionRoutePromotionValidator.validate(input);
    res.json({ valid: errors.length === 0, errors });
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const warnings = FiscalProductionRoutePromotionEvaluationService.evaluate(input);
    res.json({ evaluated: true, warnings });
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionRoutePromotionDecisionService.simulateDecision(input);
    res.json(result);
  }

  public static getReport(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionRoutePromotionDecisionService.simulateDecision(input);
    res.json(FiscalProductionRoutePromotionReportService.generateReport(result));
  }

  public static getAudit(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionRoutePromotionDecisionService.simulateDecision(input);
    res.json(FiscalProductionRoutePromotionAuditService.generateAuditRecord(result));
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'ok', module: 'Production Route Promotion, Traffic Slice & Canary Routing No-Op Dry-Run', readOnly: true });
  }
}
