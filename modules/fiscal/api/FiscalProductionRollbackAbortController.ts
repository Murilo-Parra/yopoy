import { Request, Response } from 'express';
import { FiscalProductionRollbackAbortPolicy } from '../dedicated-homologation/production-cutover-governance/rollback-abort-dry-run/FiscalProductionRollbackAbortPolicy';
import { FiscalProductionRollbackMatrixSimulation } from '../dedicated-homologation/production-cutover-governance/rollback-abort-dry-run/FiscalProductionRollbackMatrixSimulation';
import { FiscalProductionCutoverAbortNoOpPlan } from '../dedicated-homologation/production-cutover-governance/rollback-abort-dry-run/FiscalProductionCutoverAbortNoOpPlan';
import { FiscalProductionRollbackScenarioCatalog } from '../dedicated-homologation/production-cutover-governance/rollback-abort-dry-run/FiscalProductionRollbackScenarioCatalog';
import { FiscalProductionLegacyContinuityDuringAbortPlan } from '../dedicated-homologation/production-cutover-governance/rollback-abort-dry-run/FiscalProductionLegacyContinuityDuringAbortPlan';
import { FiscalProductionNoRealRollbackEvidence } from '../dedicated-homologation/production-cutover-governance/rollback-abort-dry-run/FiscalProductionNoRealRollbackEvidence';
import { FiscalProductionTrafficRecoveryNoOpMatrix } from '../dedicated-homologation/production-cutover-governance/rollback-abort-dry-run/FiscalProductionTrafficRecoveryNoOpMatrix';
import { FiscalProductionRollbackSafetyChecklist } from '../dedicated-homologation/production-cutover-governance/rollback-abort-dry-run/FiscalProductionRollbackSafetyChecklist';
import { FiscalProductionRollbackAbortDependencyMatrix } from '../dedicated-homologation/production-cutover-governance/rollback-abort-dry-run/FiscalProductionRollbackAbortDependencyMatrix';
import { FiscalProductionRollbackAbortBlockerRegister } from '../dedicated-homologation/production-cutover-governance/rollback-abort-dry-run/FiscalProductionRollbackAbortBlockerRegister';
import { FiscalProductionRollbackAbortRiskRegister } from '../dedicated-homologation/production-cutover-governance/rollback-abort-dry-run/FiscalProductionRollbackAbortRiskRegister';
import { FiscalProductionRollbackAbortValidator } from '../dedicated-homologation/production-cutover-governance/rollback-abort-dry-run/FiscalProductionRollbackAbortValidator';
import { FiscalProductionRollbackAbortEvaluationService } from '../dedicated-homologation/production-cutover-governance/rollback-abort-dry-run/FiscalProductionRollbackAbortEvaluationService';
import { FiscalProductionRollbackAbortDecisionService } from '../dedicated-homologation/production-cutover-governance/rollback-abort-dry-run/FiscalProductionRollbackAbortDecisionService';
import { FiscalProductionRollbackAbortReportService } from '../dedicated-homologation/production-cutover-governance/rollback-abort-dry-run/FiscalProductionRollbackAbortReportService';
import { FiscalProductionRollbackAbortAuditService } from '../dedicated-homologation/production-cutover-governance/rollback-abort-dry-run/FiscalProductionRollbackAbortAuditService';

export class FiscalProductionRollbackAbortController {
  
  public getPolicy(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionRollbackAbortPolicy.enforce(input);
    if (result && !result.success) {
      return res.status(403).json(result);
    }
    return res.status(200).json(FiscalProductionRollbackAbortPolicy.getBaseResult());
  }

  public getRollbackMatrixSimulation(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionRollbackMatrixSimulation.getSimulation());
  }

  public getCutoverAbortNoOpPlan(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionCutoverAbortNoOpPlan.getPlan());
  }

  public getRollbackScenarioCatalog(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionRollbackScenarioCatalog.getCatalog());
  }

  public getLegacyContinuityDuringAbortPlan(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionLegacyContinuityDuringAbortPlan.getPlan());
  }

  public getNoRealRollbackEvidence(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionNoRealRollbackEvidence.getEvidence());
  }

  public getTrafficRecoveryNoOpMatrix(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionTrafficRecoveryNoOpMatrix.getMatrix());
  }

  public getRollbackSafetyChecklist(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionRollbackSafetyChecklist.getChecklist());
  }

  public getDependencyMatrix(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionRollbackAbortDependencyMatrix.getMatrix());
  }

  public getBlockers(req: Request, res: Response) {
    return res.status(200).json({ blockers: FiscalProductionRollbackAbortBlockerRegister.getBlockers() });
  }

  public getRisks(req: Request, res: Response) {
    return res.status(200).json({ risks: FiscalProductionRollbackAbortRiskRegister.getRisks() });
  }

  public validate(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionRollbackAbortValidator.validate(input);
    FiscalProductionRollbackAbortAuditService.logValidation(input, result);
    if (!result.valid) {
      return res.status(403).json(result);
    }
    return res.status(200).json(result);
  }

  public evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionRollbackAbortEvaluationService.evaluate(input);
    FiscalProductionRollbackAbortAuditService.logEvaluation(input, result);
    const status = result.success ? 200 : 403;
    return res.status(status).json(result);
  }

  public simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionRollbackAbortDecisionService.simulateDecision(input);
    FiscalProductionRollbackAbortAuditService.logDecisionSimulation(input, result);
    const status = result.success ? 200 : 403;
    return res.status(status).json(result);
  }

  public getReport(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionRollbackAbortReportService.getReport());
  }

  public getAudit(req: Request, res: Response) {
    return res.status(200).json({ logs: FiscalProductionRollbackAbortAuditService.getAuditLogs() });
  }

  public getHealth(req: Request, res: Response) {
    return res.status(200).json({ status: 'UP', module: 'ProductionRollbackAbort' });
  }
}
