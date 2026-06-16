import { Request, Response } from 'express';
import { FiscalProductionRollbackReversionPolicy } from '../dedicated-homologation/production-baseline-cutover/rollback-reversion-dry-run/FiscalProductionRollbackReversionPolicy';
import { FiscalProductionBaselineRollbackSimulationMatrix } from '../dedicated-homologation/production-baseline-cutover/rollback-reversion-dry-run/FiscalProductionBaselineRollbackSimulationMatrix';
import { FiscalProductionBaselineAbortNoOpPlan } from '../dedicated-homologation/production-baseline-cutover/rollback-reversion-dry-run/FiscalProductionBaselineAbortNoOpPlan';
import { FiscalProductionLegacyReversionNoOpPlan } from '../dedicated-homologation/production-baseline-cutover/rollback-reversion-dry-run/FiscalProductionLegacyReversionNoOpPlan';
import { FiscalProductionReversionPathSafetyMatrix } from '../dedicated-homologation/production-baseline-cutover/rollback-reversion-dry-run/FiscalProductionReversionPathSafetyMatrix';
import { FiscalProductionPostAbortLegacyContinuityPlan } from '../dedicated-homologation/production-baseline-cutover/rollback-reversion-dry-run/FiscalProductionPostAbortLegacyContinuityPlan';
import { FiscalProductionNoTrafficMutationDuringRollbackEvidence } from '../dedicated-homologation/production-baseline-cutover/rollback-reversion-dry-run/FiscalProductionNoTrafficMutationDuringRollbackEvidence';
import { FiscalProductionNoRealRollbackExecutionEvidence } from '../dedicated-homologation/production-baseline-cutover/rollback-reversion-dry-run/FiscalProductionNoRealRollbackExecutionEvidence';
import { FiscalProductionRollbackRecoveryNoOpMatrix } from '../dedicated-homologation/production-baseline-cutover/rollback-reversion-dry-run/FiscalProductionRollbackRecoveryNoOpMatrix';
import { FiscalProductionRollbackAbortCriteria } from '../dedicated-homologation/production-baseline-cutover/rollback-reversion-dry-run/FiscalProductionRollbackAbortCriteria';
import { FiscalProductionRollbackReversionDependencyMatrix } from '../dedicated-homologation/production-baseline-cutover/rollback-reversion-dry-run/FiscalProductionRollbackReversionDependencyMatrix';
import { FiscalProductionRollbackReversionBlockerRegister } from '../dedicated-homologation/production-baseline-cutover/rollback-reversion-dry-run/FiscalProductionRollbackReversionBlockerRegister';
import { FiscalProductionRollbackReversionRiskRegister } from '../dedicated-homologation/production-baseline-cutover/rollback-reversion-dry-run/FiscalProductionRollbackReversionRiskRegister';
import { FiscalProductionRollbackReversionValidator } from '../dedicated-homologation/production-baseline-cutover/rollback-reversion-dry-run/FiscalProductionRollbackReversionValidator';
import { FiscalProductionRollbackReversionEvaluationService } from '../dedicated-homologation/production-baseline-cutover/rollback-reversion-dry-run/FiscalProductionRollbackReversionEvaluationService';
import { FiscalProductionRollbackReversionDecisionService } from '../dedicated-homologation/production-baseline-cutover/rollback-reversion-dry-run/FiscalProductionRollbackReversionDecisionService';
import { FiscalProductionRollbackReversionReportService } from '../dedicated-homologation/production-baseline-cutover/rollback-reversion-dry-run/FiscalProductionRollbackReversionReportService';
import { FiscalProductionRollbackReversionAuditService } from '../dedicated-homologation/production-baseline-cutover/rollback-reversion-dry-run/FiscalProductionRollbackReversionAuditService';

export class FiscalProductionRollbackReversionController {
  
  public getPolicy(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionRollbackReversionPolicy.enforce(input);
    if (result && !result.success) {
      return res.status(403).json(result);
    }
    return res.status(200).json(FiscalProductionRollbackReversionPolicy.getBaseResult());
  }

  public getRollbackSimulationMatrix(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionBaselineRollbackSimulationMatrix.getMatrix());
  }

  public getAbortNoOpPlan(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionBaselineAbortNoOpPlan.getPlan());
  }

  public getLegacyReversionNoOpPlan(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionLegacyReversionNoOpPlan.getPlan());
  }

  public getReversionPathSafetyMatrix(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionReversionPathSafetyMatrix.getMatrix());
  }

  public getPostAbortLegacyContinuityPlan(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionPostAbortLegacyContinuityPlan.getPlan());
  }

  public getNoTrafficMutationEvidence(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionNoTrafficMutationDuringRollbackEvidence.getEvidence());
  }

  public getNoRealRollbackExecutionEvidence(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionNoRealRollbackExecutionEvidence.getEvidence());
  }

  public getRollbackRecoveryNoOpMatrix(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionRollbackRecoveryNoOpMatrix.getMatrix());
  }

  public getRollbackAbortCriteria(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionRollbackAbortCriteria.getCriteria());
  }

  public getDependencyMatrix(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionRollbackReversionDependencyMatrix.getMatrix());
  }

  public getBlockers(req: Request, res: Response) {
    return res.status(200).json({ blockers: FiscalProductionRollbackReversionBlockerRegister.getBlockers() });
  }

  public getRisks(req: Request, res: Response) {
    return res.status(200).json({ risks: FiscalProductionRollbackReversionRiskRegister.getRisks() });
  }

  public validate(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionRollbackReversionValidator.validate(input);
    FiscalProductionRollbackReversionAuditService.logValidation(input, result);
    if (!result.valid) {
      return res.status(403).json(result);
    }
    return res.status(200).json(result);
  }

  public evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionRollbackReversionEvaluationService.evaluate(input);
    FiscalProductionRollbackReversionAuditService.logEvaluation(input, result);
    const status = result.success ? 200 : 403;
    return res.status(status).json(result);
  }

  public simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionRollbackReversionDecisionService.simulateDecision(input);
    FiscalProductionRollbackReversionAuditService.logDecisionSimulation(input, result);
    const status = result.success ? 200 : 403;
    return res.status(status).json(result);
  }

  public getReport(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionRollbackReversionReportService.getReport());
  }

  public getAudit(req: Request, res: Response) {
    return res.status(200).json({ logs: FiscalProductionRollbackReversionAuditService.getAuditLogs() });
  }

  public getHealth(req: Request, res: Response) {
    return res.status(200).json({ status: 'UP', module: 'ProductionRollbackReversionDryRun' });
  }
}
