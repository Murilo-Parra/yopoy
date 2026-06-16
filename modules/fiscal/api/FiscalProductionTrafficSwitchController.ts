import { Request, Response } from 'express';
import { FiscalProductionTrafficSwitchPolicy } from '../dedicated-homologation/production-operations-transition/traffic-switch-dry-run/FiscalProductionTrafficSwitchPolicy';
import { FiscalProductionTrafficSwitchReadinessSimulation } from '../dedicated-homologation/production-operations-transition/traffic-switch-dry-run/FiscalProductionTrafficSwitchReadinessSimulation';
import { FiscalProductionRouteActivationGateNoOpPlan } from '../dedicated-homologation/production-operations-transition/traffic-switch-dry-run/FiscalProductionRouteActivationGateNoOpPlan';
import { FiscalProductionLegacyContinuityNoOpPlan } from '../dedicated-homologation/production-operations-transition/traffic-switch-dry-run/FiscalProductionLegacyContinuityNoOpPlan';
import { FiscalProductionV2RouteActivationNoOpPlan } from '../dedicated-homologation/production-operations-transition/traffic-switch-dry-run/FiscalProductionV2RouteActivationNoOpPlan';
import { FiscalProductionTrafficPercentageRampSimulation } from '../dedicated-homologation/production-operations-transition/traffic-switch-dry-run/FiscalProductionTrafficPercentageRampSimulation';
import { FiscalProductionCanaryTrafficPromotionNoOpMatrix } from '../dedicated-homologation/production-operations-transition/traffic-switch-dry-run/FiscalProductionCanaryTrafficPromotionNoOpMatrix';
import { FiscalProductionReversibleGoLiveNoOpPlan } from '../dedicated-homologation/production-operations-transition/traffic-switch-dry-run/FiscalProductionReversibleGoLiveNoOpPlan';
import { FiscalProductionTrafficAbortReversionMatrix } from '../dedicated-homologation/production-operations-transition/traffic-switch-dry-run/FiscalProductionTrafficAbortReversionMatrix';
import { FiscalProductionNoTrafficMutationEvidence } from '../dedicated-homologation/production-operations-transition/traffic-switch-dry-run/FiscalProductionNoTrafficMutationEvidence';
import { FiscalProductionTrafficSwitchDependencyMatrix } from '../dedicated-homologation/production-operations-transition/traffic-switch-dry-run/FiscalProductionTrafficSwitchDependencyMatrix';
import { FiscalProductionTrafficSwitchBlockerRegister } from '../dedicated-homologation/production-operations-transition/traffic-switch-dry-run/FiscalProductionTrafficSwitchBlockerRegister';
import { FiscalProductionTrafficSwitchRiskRegister } from '../dedicated-homologation/production-operations-transition/traffic-switch-dry-run/FiscalProductionTrafficSwitchRiskRegister';
import { FiscalProductionTrafficSwitchValidator } from '../dedicated-homologation/production-operations-transition/traffic-switch-dry-run/FiscalProductionTrafficSwitchValidator';
import { FiscalProductionTrafficSwitchEvaluationService } from '../dedicated-homologation/production-operations-transition/traffic-switch-dry-run/FiscalProductionTrafficSwitchEvaluationService';
import { FiscalProductionTrafficSwitchDecisionService } from '../dedicated-homologation/production-operations-transition/traffic-switch-dry-run/FiscalProductionTrafficSwitchDecisionService';
import { FiscalProductionTrafficSwitchReportService } from '../dedicated-homologation/production-operations-transition/traffic-switch-dry-run/FiscalProductionTrafficSwitchReportService';
import { FiscalProductionTrafficSwitchAuditService } from '../dedicated-homologation/production-operations-transition/traffic-switch-dry-run/FiscalProductionTrafficSwitchAuditService';

export class FiscalProductionTrafficSwitchController {
  
  public getPolicy(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionTrafficSwitchPolicy.enforce(input);
    if (result && !result.success) {
      return res.status(403).json(result);
    }
    return res.status(200).json(FiscalProductionTrafficSwitchPolicy.getBaseResult());
  }

  public getTrafficSwitchReadinessSimulation(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionTrafficSwitchReadinessSimulation.getSimulation());
  }

  public getRouteActivationGateNoOpPlan(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionRouteActivationGateNoOpPlan.getPlan());
  }

  public getLegacyContinuityNoOpPlan(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionLegacyContinuityNoOpPlan.getPlan());
  }

  public getV2RouteActivationNoOpPlan(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionV2RouteActivationNoOpPlan.getPlan());
  }

  public getTrafficPercentageRampSimulation(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionTrafficPercentageRampSimulation.getSimulation());
  }

  public getCanaryTrafficPromotionNoOpMatrix(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionCanaryTrafficPromotionNoOpMatrix.getMatrix());
  }

  public getReversibleGoLiveNoOpPlan(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionReversibleGoLiveNoOpPlan.getPlan());
  }

  public getTrafficAbortReversionMatrix(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionTrafficAbortReversionMatrix.getMatrix());
  }

  public getNoTrafficMutationEvidence(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionNoTrafficMutationEvidence.getEvidence());
  }

  public getDependencyMatrix(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionTrafficSwitchDependencyMatrix.getMatrix());
  }

  public getBlockers(req: Request, res: Response) {
    return res.status(200).json({ blockers: FiscalProductionTrafficSwitchBlockerRegister.getBlockers() });
  }

  public getRisks(req: Request, res: Response) {
    return res.status(200).json({ risks: FiscalProductionTrafficSwitchRiskRegister.getRisks() });
  }

  public validate(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionTrafficSwitchValidator.validate(input);
    FiscalProductionTrafficSwitchAuditService.logValidation(input, result);
    if (!result.valid) {
      return res.status(403).json(result);
    }
    return res.status(200).json(result);
  }

  public evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionTrafficSwitchEvaluationService.evaluate(input);
    FiscalProductionTrafficSwitchAuditService.logEvaluation(input, result);
    const status = result.success ? 200 : 403;
    return res.status(status).json(result);
  }

  public simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionTrafficSwitchDecisionService.simulateDecision(input);
    FiscalProductionTrafficSwitchAuditService.logDecisionSimulation(input, result);
    const status = result.success ? 200 : 403;
    return res.status(status).json(result);
  }

  public getReport(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionTrafficSwitchReportService.getReport());
  }

  public getAudit(req: Request, res: Response) {
    return res.status(200).json({ logs: FiscalProductionTrafficSwitchAuditService.getAuditLogs() });
  }

  public getHealth(req: Request, res: Response) {
    return res.status(200).json({ status: 'UP', module: 'ProductionTrafficSwitchDryRun' });
  }
}
