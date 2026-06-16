import { Request, Response } from 'express';
import { FiscalProductionRolloutApprovalPolicy } from '../dedicated-homologation/production-cutover-governance/rollout-approval-dry-run/FiscalProductionRolloutApprovalPolicy';
import { FiscalProductionRolloutApprovalMatrix } from '../dedicated-homologation/production-cutover-governance/rollout-approval-dry-run/FiscalProductionRolloutApprovalMatrix';
import { FiscalProductionFinalReleaseVerificationPlan } from '../dedicated-homologation/production-cutover-governance/rollout-approval-dry-run/FiscalProductionFinalReleaseVerificationPlan';
import { FiscalProductionReleaseReadinessNoOpReview } from '../dedicated-homologation/production-cutover-governance/rollout-approval-dry-run/FiscalProductionReleaseReadinessNoOpReview';
import { FiscalProductionCanaryRolloutNoOpPlan } from '../dedicated-homologation/production-cutover-governance/rollout-approval-dry-run/FiscalProductionCanaryRolloutNoOpPlan';
import { FiscalProductionRolloutPercentageNoOpMatrix } from '../dedicated-homologation/production-cutover-governance/rollout-approval-dry-run/FiscalProductionRolloutPercentageNoOpMatrix';
import { FiscalProductionGoLiveVerificationNoOpEvidence } from '../dedicated-homologation/production-cutover-governance/rollout-approval-dry-run/FiscalProductionGoLiveVerificationNoOpEvidence';
import { FiscalProductionNoTrafficPromotionEvidence } from '../dedicated-homologation/production-cutover-governance/rollout-approval-dry-run/FiscalProductionNoTrafficPromotionEvidence';
import { FiscalProductionRolloutApprovalDependencyMatrix } from '../dedicated-homologation/production-cutover-governance/rollout-approval-dry-run/FiscalProductionRolloutApprovalDependencyMatrix';
import { FiscalProductionRolloutApprovalBlockerRegister } from '../dedicated-homologation/production-cutover-governance/rollout-approval-dry-run/FiscalProductionRolloutApprovalBlockerRegister';
import { FiscalProductionRolloutApprovalRiskRegister } from '../dedicated-homologation/production-cutover-governance/rollout-approval-dry-run/FiscalProductionRolloutApprovalRiskRegister';
import { FiscalProductionRolloutApprovalValidator } from '../dedicated-homologation/production-cutover-governance/rollout-approval-dry-run/FiscalProductionRolloutApprovalValidator';
import { FiscalProductionRolloutApprovalEvaluationService } from '../dedicated-homologation/production-cutover-governance/rollout-approval-dry-run/FiscalProductionRolloutApprovalEvaluationService';
import { FiscalProductionRolloutApprovalDecisionService } from '../dedicated-homologation/production-cutover-governance/rollout-approval-dry-run/FiscalProductionRolloutApprovalDecisionService';
import { FiscalProductionRolloutApprovalReportService } from '../dedicated-homologation/production-cutover-governance/rollout-approval-dry-run/FiscalProductionRolloutApprovalReportService';
import { FiscalProductionRolloutApprovalAuditService } from '../dedicated-homologation/production-cutover-governance/rollout-approval-dry-run/FiscalProductionRolloutApprovalAuditService';

export class FiscalProductionRolloutApprovalController {
  
  public getPolicy(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionRolloutApprovalPolicy.enforce(input);
    if (result && !result.success) {
      return res.status(403).json(result);
    }
    return res.status(200).json(FiscalProductionRolloutApprovalPolicy.getBaseResult());
  }

  public getRolloutApprovalMatrix(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionRolloutApprovalMatrix.getMatrix());
  }

  public getFinalReleaseVerificationPlan(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionFinalReleaseVerificationPlan.getPlan());
  }

  public getReleaseReadinessNoOpReview(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionReleaseReadinessNoOpReview.getReview());
  }

  public getCanaryRolloutNoOpPlan(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionCanaryRolloutNoOpPlan.getPlan());
  }

  public getRolloutPercentageNoOpMatrix(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionRolloutPercentageNoOpMatrix.getMatrix());
  }

  public getGoLiveVerificationNoOpEvidence(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionGoLiveVerificationNoOpEvidence.getEvidence());
  }

  public getNoTrafficPromotionEvidence(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionNoTrafficPromotionEvidence.getEvidence());
  }

  public getDependencyMatrix(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionRolloutApprovalDependencyMatrix.getMatrix());
  }

  public getBlockers(req: Request, res: Response) {
    return res.status(200).json({ blockers: FiscalProductionRolloutApprovalBlockerRegister.getBlockers() });
  }

  public getRisks(req: Request, res: Response) {
    return res.status(200).json({ risks: FiscalProductionRolloutApprovalRiskRegister.getRisks() });
  }

  public validate(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionRolloutApprovalValidator.validate(input);
    FiscalProductionRolloutApprovalAuditService.logValidation(input, result);
    if (!result.valid) {
      return res.status(403).json(result);
    }
    return res.status(200).json(result);
  }

  public evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionRolloutApprovalEvaluationService.evaluate(input);
    FiscalProductionRolloutApprovalAuditService.logEvaluation(input, result);
    const status = result.success ? 200 : 403;
    return res.status(status).json(result);
  }

  public simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionRolloutApprovalDecisionService.simulateDecision(input);
    FiscalProductionRolloutApprovalAuditService.logDecisionSimulation(input, result);
    const status = result.success ? 200 : 403;
    return res.status(status).json(result);
  }

  public getReport(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionRolloutApprovalReportService.getReport());
  }

  public getAudit(req: Request, res: Response) {
    return res.status(200).json({ logs: FiscalProductionRolloutApprovalAuditService.getAuditLogs() });
  }

  public getHealth(req: Request, res: Response) {
    return res.status(200).json({ status: 'UP', module: 'ProductionRolloutApproval' });
  }
}
