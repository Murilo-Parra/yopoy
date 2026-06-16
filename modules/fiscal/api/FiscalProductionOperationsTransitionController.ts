import { Request, Response } from 'express';
import { FiscalProductionOperationsTransitionPolicy } from '../dedicated-homologation/production-operations-transition/FiscalProductionOperationsTransitionPolicy';
import { FiscalProductionOperationsTransitionControlPlaneBlueprint } from '../dedicated-homologation/production-operations-transition/FiscalProductionOperationsTransitionControlPlaneBlueprint';
import { FiscalProductionExplicitActivationConsentBoundary } from '../dedicated-homologation/production-operations-transition/FiscalProductionExplicitActivationConsentBoundary';
import { FiscalProductionRealActivationReadinessNonExecutablePlan } from '../dedicated-homologation/production-operations-transition/FiscalProductionRealActivationReadinessNonExecutablePlan';
import { FiscalProductionTransitionAuthorityMatrix } from '../dedicated-homologation/production-operations-transition/FiscalProductionTransitionAuthorityMatrix';
import { FiscalProductionTwoPersonRuleNoOpPlan } from '../dedicated-homologation/production-operations-transition/FiscalProductionTwoPersonRuleNoOpPlan';
import { FiscalProductionActivationSeparationOfDutiesMatrix } from '../dedicated-homologation/production-operations-transition/FiscalProductionActivationSeparationOfDutiesMatrix';
import { FiscalProductionTransitionPreconditionChecklist } from '../dedicated-homologation/production-operations-transition/FiscalProductionTransitionPreconditionChecklist';
import { FiscalProductionTransitionNoExecutionEvidence } from '../dedicated-homologation/production-operations-transition/FiscalProductionTransitionNoExecutionEvidence';
import { FiscalProductionOperationsTransitionDependencyMatrix } from '../dedicated-homologation/production-operations-transition/FiscalProductionOperationsTransitionDependencyMatrix';
import { FiscalProductionOperationsTransitionBlockerRegister } from '../dedicated-homologation/production-operations-transition/FiscalProductionOperationsTransitionBlockerRegister';
import { FiscalProductionOperationsTransitionRiskRegister } from '../dedicated-homologation/production-operations-transition/FiscalProductionOperationsTransitionRiskRegister';
import { FiscalProductionOperationsTransitionValidator } from '../dedicated-homologation/production-operations-transition/FiscalProductionOperationsTransitionValidator';
import { FiscalProductionOperationsTransitionEvaluationService } from '../dedicated-homologation/production-operations-transition/FiscalProductionOperationsTransitionEvaluationService';
import { FiscalProductionOperationsTransitionDecisionService } from '../dedicated-homologation/production-operations-transition/FiscalProductionOperationsTransitionDecisionService';
import { FiscalProductionOperationsTransitionReportService } from '../dedicated-homologation/production-operations-transition/FiscalProductionOperationsTransitionReportService';
import { FiscalProductionOperationsTransitionAuditService } from '../dedicated-homologation/production-operations-transition/FiscalProductionOperationsTransitionAuditService';

export class FiscalProductionOperationsTransitionController {
  
  public getPolicy(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionOperationsTransitionPolicy.enforce(input);
    if (result && !result.success) {
      return res.status(403).json(result);
    }
    return res.status(200).json(FiscalProductionOperationsTransitionPolicy.getBaseResult());
  }

  public getControlPlaneBlueprint(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionOperationsTransitionControlPlaneBlueprint.getBlueprint());
  }

  public getActivationConsentBoundary(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionExplicitActivationConsentBoundary.getBoundary());
  }

  public getRealActivationReadinessNonExecutablePlan(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionRealActivationReadinessNonExecutablePlan.getPlan());
  }

  public getTransitionAuthorityMatrix(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionTransitionAuthorityMatrix.getMatrix());
  }

  public getTwoPersonRuleNoOpPlan(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionTwoPersonRuleNoOpPlan.getPlan());
  }

  public getSeparationOfDutiesMatrix(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionActivationSeparationOfDutiesMatrix.getMatrix());
  }

  public getPreconditionChecklist(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionTransitionPreconditionChecklist.getChecklist());
  }

  public getNoExecutionEvidence(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionTransitionNoExecutionEvidence.getEvidence());
  }

  public getDependencyMatrix(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionOperationsTransitionDependencyMatrix.getMatrix());
  }

  public getBlockers(req: Request, res: Response) {
    return res.status(200).json({ blockers: FiscalProductionOperationsTransitionBlockerRegister.getBlockers() });
  }

  public getRisks(req: Request, res: Response) {
    return res.status(200).json({ risks: FiscalProductionOperationsTransitionRiskRegister.getRisks() });
  }

  public validate(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionOperationsTransitionValidator.validate(input);
    FiscalProductionOperationsTransitionAuditService.logValidation(input, result);
    if (!result.valid) {
      return res.status(403).json(result);
    }
    return res.status(200).json(result);
  }

  public evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionOperationsTransitionEvaluationService.evaluate(input);
    FiscalProductionOperationsTransitionAuditService.logEvaluation(input, result);
    const status = result.success ? 200 : 403;
    return res.status(status).json(result);
  }

  public simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionOperationsTransitionDecisionService.simulateDecision(input);
    FiscalProductionOperationsTransitionAuditService.logDecisionSimulation(input, result);
    const status = result.success ? 200 : 403;
    return res.status(status).json(result);
  }

  public getReport(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionOperationsTransitionReportService.getReport());
  }

  public getAudit(req: Request, res: Response) {
    return res.status(200).json({ logs: FiscalProductionOperationsTransitionAuditService.getAuditLogs() });
  }

  public getHealth(req: Request, res: Response) {
    return res.status(200).json({ status: 'UP', module: 'ProductionOperationsTransitionDryRun' });
  }
}
