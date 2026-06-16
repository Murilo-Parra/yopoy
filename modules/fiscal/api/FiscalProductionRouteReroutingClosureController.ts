import { Request, Response } from 'express';
import { FiscalProductionRouteReroutingClosurePolicy } from '../dedicated-homologation/production-cutover-governance/route-rerouting-closure/FiscalProductionRouteReroutingClosurePolicy';
import { FiscalProductionRouteReroutingClosureInventory } from '../dedicated-homologation/production-cutover-governance/route-rerouting-closure/FiscalProductionRouteReroutingClosureInventory';
import { FiscalProductionRouteReroutingNoOpPlan } from '../dedicated-homologation/production-cutover-governance/route-rerouting-closure/FiscalProductionRouteReroutingNoOpPlan';
import { FiscalProductionLegacyFallbackNoOpPlan } from '../dedicated-homologation/production-cutover-governance/route-rerouting-closure/FiscalProductionLegacyFallbackNoOpPlan';
import { FiscalProductionRouteInvariantEvidence } from '../dedicated-homologation/production-cutover-governance/route-rerouting-closure/FiscalProductionRouteInvariantEvidence';
import { FiscalProductionNoTrafficChangeEvidence } from '../dedicated-homologation/production-cutover-governance/route-rerouting-closure/FiscalProductionNoTrafficChangeEvidence';
import { FiscalProductionStaticRouteComparisonPlan } from '../dedicated-homologation/production-cutover-governance/route-rerouting-closure/FiscalProductionStaticRouteComparisonPlan';
import { FiscalProductionRouteReversionMatrix } from '../dedicated-homologation/production-cutover-governance/route-rerouting-closure/FiscalProductionRouteReversionMatrix';
import { FiscalProductionTrafficSafetyMatrix } from '../dedicated-homologation/production-cutover-governance/route-rerouting-closure/FiscalProductionTrafficSafetyMatrix';
import { FiscalProductionRouteReroutingDependencyMatrix } from '../dedicated-homologation/production-cutover-governance/route-rerouting-closure/FiscalProductionRouteReroutingDependencyMatrix';
import { FiscalProductionRouteReroutingClosureBlockerRegister } from '../dedicated-homologation/production-cutover-governance/route-rerouting-closure/FiscalProductionRouteReroutingClosureBlockerRegister';
import { FiscalProductionRouteReroutingClosureRiskRegister } from '../dedicated-homologation/production-cutover-governance/route-rerouting-closure/FiscalProductionRouteReroutingClosureRiskRegister';
import { FiscalProductionRouteReroutingClosureValidator } from '../dedicated-homologation/production-cutover-governance/route-rerouting-closure/FiscalProductionRouteReroutingClosureValidator';
import { FiscalProductionRouteReroutingClosureEvaluationService } from '../dedicated-homologation/production-cutover-governance/route-rerouting-closure/FiscalProductionRouteReroutingClosureEvaluationService';
import { FiscalProductionRouteReroutingClosureDecisionService } from '../dedicated-homologation/production-cutover-governance/route-rerouting-closure/FiscalProductionRouteReroutingClosureDecisionService';
import { FiscalProductionRouteReroutingClosureReportService } from '../dedicated-homologation/production-cutover-governance/route-rerouting-closure/FiscalProductionRouteReroutingClosureReportService';
import { FiscalProductionRouteReroutingClosureAuditService } from '../dedicated-homologation/production-cutover-governance/route-rerouting-closure/FiscalProductionRouteReroutingClosureAuditService';

export class FiscalProductionRouteReroutingClosureController {
  
  public getPolicy(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionRouteReroutingClosurePolicy.enforce(input);
    if (result && !result.success) {
      return res.status(403).json(result);
    }
    return res.status(200).json(FiscalProductionRouteReroutingClosurePolicy.getBaseResult());
  }

  public getClosureInventory(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionRouteReroutingClosureInventory.getInventory());
  }

  public getReroutingNoOpPlan(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionRouteReroutingNoOpPlan.getPlan());
  }

  public getLegacyFallbackNoOpPlan(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionLegacyFallbackNoOpPlan.getPlan());
  }

  public getRouteInvariantEvidence(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionRouteInvariantEvidence.getEvidence());
  }

  public getNoTrafficChangeEvidence(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionNoTrafficChangeEvidence.getEvidence());
  }

  public getStaticRouteComparisonPlan(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionStaticRouteComparisonPlan.getPlan());
  }

  public getRouteReversionMatrix(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionRouteReversionMatrix.getMatrix());
  }

  public getTrafficSafetyMatrix(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionTrafficSafetyMatrix.getMatrix());
  }

  public getDependencyMatrix(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionRouteReroutingDependencyMatrix.getMatrix());
  }

  public getBlockers(req: Request, res: Response) {
    return res.status(200).json({ blockers: FiscalProductionRouteReroutingClosureBlockerRegister.getBlockers() });
  }

  public getRisks(req: Request, res: Response) {
    return res.status(200).json({ risks: FiscalProductionRouteReroutingClosureRiskRegister.getRisks() });
  }

  public validate(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionRouteReroutingClosureValidator.validate(input);
    FiscalProductionRouteReroutingClosureAuditService.logValidation(input, result);
    if (!result.valid) {
      return res.status(403).json(result);
    }
    return res.status(200).json(result);
  }

  public evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionRouteReroutingClosureEvaluationService.evaluate(input);
    FiscalProductionRouteReroutingClosureAuditService.logEvaluation(input, result);
    const status = result.success ? 200 : 403;
    return res.status(status).json(result);
  }

  public simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionRouteReroutingClosureDecisionService.simulateDecision(input);
    FiscalProductionRouteReroutingClosureAuditService.logDecisionSimulation(input, result);
    const status = result.success ? 200 : 403;
    return res.status(status).json(result);
  }

  public getReport(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionRouteReroutingClosureReportService.getReport());
  }

  public getAudit(req: Request, res: Response) {
    return res.status(200).json({ logs: FiscalProductionRouteReroutingClosureAuditService.getAuditLogs() });
  }

  public getHealth(req: Request, res: Response) {
    return res.status(200).json({ status: 'UP', module: 'ProductionRouteReroutingClosure' });
  }
}
