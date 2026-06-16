import { Request, Response } from 'express';
import { FiscalProductionOperationsReadinessPolicy } from '../dedicated-homologation/production-operations-readiness/FiscalProductionOperationsReadinessPolicy';
import { FiscalProductionOperationsTransitionReadinessBlueprint } from '../dedicated-homologation/production-operations-readiness/FiscalProductionOperationsTransitionReadinessBlueprint';
import { FiscalProductionOperationsHardNoExecutionContract } from '../dedicated-homologation/production-operations-readiness/FiscalProductionOperationsHardNoExecutionContract';
import { FiscalProductionOperationsResponsibilityInventory } from '../dedicated-homologation/production-operations-readiness/FiscalProductionOperationsResponsibilityInventory';
import { FiscalProductionOperationsLegacyContinuityPlan } from '../dedicated-homologation/production-operations-readiness/FiscalProductionOperationsLegacyContinuityPlan';
import { FiscalProductionOperationsTransitionNoActivationPlan } from '../dedicated-homologation/production-operations-readiness/FiscalProductionOperationsTransitionNoActivationPlan';
import { FiscalProductionOperationsPreconditionMatrix } from '../dedicated-homologation/production-operations-readiness/FiscalProductionOperationsPreconditionMatrix';
import { FiscalProductionOperationsDataBoundaryLockedPlan } from '../dedicated-homologation/production-operations-readiness/FiscalProductionOperationsDataBoundaryLockedPlan';
import { FiscalProductionOperationsRuntimeLockedPlan } from '../dedicated-homologation/production-operations-readiness/FiscalProductionOperationsRuntimeLockedPlan';
import { FiscalProductionOperationsExternalIntegrationLockedPlan } from '../dedicated-homologation/production-operations-readiness/FiscalProductionOperationsExternalIntegrationLockedPlan';
import { FiscalProductionOperationsReadinessDependencyMatrix } from '../dedicated-homologation/production-operations-readiness/FiscalProductionOperationsReadinessDependencyMatrix';
import { FiscalProductionOperationsReadinessBlockerRegister } from '../dedicated-homologation/production-operations-readiness/FiscalProductionOperationsReadinessBlockerRegister';
import { FiscalProductionOperationsReadinessRiskRegister } from '../dedicated-homologation/production-operations-readiness/FiscalProductionOperationsReadinessRiskRegister';
import { FiscalProductionOperationsReadinessValidator } from '../dedicated-homologation/production-operations-readiness/FiscalProductionOperationsReadinessValidator';
import { FiscalProductionOperationsReadinessEvaluationService } from '../dedicated-homologation/production-operations-readiness/FiscalProductionOperationsReadinessEvaluationService';
import { FiscalProductionOperationsReadinessDecisionService } from '../dedicated-homologation/production-operations-readiness/FiscalProductionOperationsReadinessDecisionService';
import { FiscalProductionOperationsReadinessReportService } from '../dedicated-homologation/production-operations-readiness/FiscalProductionOperationsReadinessReportService';
import { FiscalProductionOperationsReadinessAuditService } from '../dedicated-homologation/production-operations-readiness/FiscalProductionOperationsReadinessAuditService';

export class FiscalProductionOperationsReadinessController {
  
  public getPolicy(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionOperationsReadinessPolicy.enforce(input);
    if (result && !result.success) {
      return res.status(403).json(result);
    }
    return res.status(200).json(FiscalProductionOperationsReadinessPolicy.getBaseResult());
  }

  public getReadinessBlueprint(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionOperationsTransitionReadinessBlueprint.getBlueprint());
  }

  public getHardNoExecutionContract(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionOperationsHardNoExecutionContract.getContract());
  }

  public getResponsibilityInventory(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionOperationsResponsibilityInventory.getInventory());
  }

  public getLegacyContinuityPlan(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionOperationsLegacyContinuityPlan.getPlan());
  }

  public getTransitionNoActivationPlan(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionOperationsTransitionNoActivationPlan.getPlan());
  }

  public getPreconditionMatrix(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionOperationsPreconditionMatrix.getMatrix());
  }

  public getDataBoundaryLockedPlan(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionOperationsDataBoundaryLockedPlan.getPlan());
  }

  public getRuntimeLockedPlan(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionOperationsRuntimeLockedPlan.getPlan());
  }

  public getExternalIntegrationLockedPlan(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionOperationsExternalIntegrationLockedPlan.getPlan());
  }

  public getDependencyMatrix(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionOperationsReadinessDependencyMatrix.getMatrix());
  }

  public getBlockers(req: Request, res: Response) {
    return res.status(200).json({ blockers: FiscalProductionOperationsReadinessBlockerRegister.getBlockers() });
  }

  public getRisks(req: Request, res: Response) {
    return res.status(200).json({ risks: FiscalProductionOperationsReadinessRiskRegister.getRisks() });
  }

  public validate(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionOperationsReadinessValidator.validate(input);
    FiscalProductionOperationsReadinessAuditService.logValidation(input, result);
    if (!result.valid) {
      return res.status(403).json(result);
    }
    return res.status(200).json(result);
  }

  public evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionOperationsReadinessEvaluationService.evaluate(input);
    FiscalProductionOperationsReadinessAuditService.logEvaluation(input, result);
    const status = result.success ? 200 : 403;
    return res.status(status).json(result);
  }

  public simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionOperationsReadinessDecisionService.simulateDecision(input);
    FiscalProductionOperationsReadinessAuditService.logDecisionSimulation(input, result);
    const status = result.success ? 200 : 403;
    return res.status(status).json(result);
  }

  public getReport(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionOperationsReadinessReportService.getReport());
  }

  public getAudit(req: Request, res: Response) {
    return res.status(200).json({ logs: FiscalProductionOperationsReadinessAuditService.getAuditLogs() });
  }

  public getHealth(req: Request, res: Response) {
    return res.status(200).json({ status: 'UP', module: 'ProductionOperationsTransitionReadiness' });
  }
}
