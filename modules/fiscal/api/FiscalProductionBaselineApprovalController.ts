import { Request, Response } from 'express';
import { FiscalProductionBaselineApprovalPolicy } from '../dedicated-homologation/production-baseline-cutover/approval-evidence-dry-run/FiscalProductionBaselineApprovalPolicy';
import { FiscalProductionBaselineCutoverApprovalPackage } from '../dedicated-homologation/production-baseline-cutover/approval-evidence-dry-run/FiscalProductionBaselineCutoverApprovalPackage';
import { FiscalProductionBaselineEvidenceGovernancePlan } from '../dedicated-homologation/production-baseline-cutover/approval-evidence-dry-run/FiscalProductionBaselineEvidenceGovernancePlan';
import { FiscalProductionBaselineApprovalMatrix } from '../dedicated-homologation/production-baseline-cutover/approval-evidence-dry-run/FiscalProductionBaselineApprovalMatrix';
import { FiscalProductionBaselinePreconditionEvidenceReview } from '../dedicated-homologation/production-baseline-cutover/approval-evidence-dry-run/FiscalProductionBaselinePreconditionEvidenceReview';
import { FiscalProductionHardLockEvidenceReview } from '../dedicated-homologation/production-baseline-cutover/approval-evidence-dry-run/FiscalProductionHardLockEvidenceReview';
import { FiscalProductionLegacyContinuityEvidenceReview } from '../dedicated-homologation/production-baseline-cutover/approval-evidence-dry-run/FiscalProductionLegacyContinuityEvidenceReview';
import { FiscalProductionV2LockedEvidenceReview } from '../dedicated-homologation/production-baseline-cutover/approval-evidence-dry-run/FiscalProductionV2LockedEvidenceReview';
import { FiscalProductionTrafficLockEvidenceReview } from '../dedicated-homologation/production-baseline-cutover/approval-evidence-dry-run/FiscalProductionTrafficLockEvidenceReview';
import { FiscalProductionRuntimeLockEvidenceReview } from '../dedicated-homologation/production-baseline-cutover/approval-evidence-dry-run/FiscalProductionRuntimeLockEvidenceReview';
import { FiscalProductionDataBoundaryEvidenceReview } from '../dedicated-homologation/production-baseline-cutover/approval-evidence-dry-run/FiscalProductionDataBoundaryEvidenceReview';
import { FiscalProductionExternalIntegrationEvidenceReview } from '../dedicated-homologation/production-baseline-cutover/approval-evidence-dry-run/FiscalProductionExternalIntegrationEvidenceReview';
import { FiscalProductionBaselineApprovalDependencyMatrix } from '../dedicated-homologation/production-baseline-cutover/approval-evidence-dry-run/FiscalProductionBaselineApprovalDependencyMatrix';
import { FiscalProductionBaselineApprovalBlockerRegister } from '../dedicated-homologation/production-baseline-cutover/approval-evidence-dry-run/FiscalProductionBaselineApprovalBlockerRegister';
import { FiscalProductionBaselineApprovalRiskRegister } from '../dedicated-homologation/production-baseline-cutover/approval-evidence-dry-run/FiscalProductionBaselineApprovalRiskRegister';
import { FiscalProductionBaselineApprovalValidator } from '../dedicated-homologation/production-baseline-cutover/approval-evidence-dry-run/FiscalProductionBaselineApprovalValidator';
import { FiscalProductionBaselineApprovalEvaluationService } from '../dedicated-homologation/production-baseline-cutover/approval-evidence-dry-run/FiscalProductionBaselineApprovalEvaluationService';
import { FiscalProductionBaselineApprovalDecisionService } from '../dedicated-homologation/production-baseline-cutover/approval-evidence-dry-run/FiscalProductionBaselineApprovalDecisionService';
import { FiscalProductionBaselineApprovalReportService } from '../dedicated-homologation/production-baseline-cutover/approval-evidence-dry-run/FiscalProductionBaselineApprovalReportService';
import { FiscalProductionBaselineApprovalAuditService } from '../dedicated-homologation/production-baseline-cutover/approval-evidence-dry-run/FiscalProductionBaselineApprovalAuditService';

export class FiscalProductionBaselineApprovalController {
  
  public getPolicy(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionBaselineApprovalPolicy.enforce(input);
    if (result && !result.success) {
      return res.status(403).json(result);
    }
    return res.status(200).json(FiscalProductionBaselineApprovalPolicy.getBaseResult());
  }

  public getApprovalPackage(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionBaselineCutoverApprovalPackage.getPackage());
  }

  public getEvidenceGovernancePlan(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionBaselineEvidenceGovernancePlan.getPlan());
  }

  public getApprovalMatrix(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionBaselineApprovalMatrix.getMatrix());
  }

  public getPreconditionEvidenceReview(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionBaselinePreconditionEvidenceReview.getReview());
  }

  public getHardLockEvidenceReview(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionHardLockEvidenceReview.getReview());
  }

  public getLegacyContinuityEvidenceReview(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionLegacyContinuityEvidenceReview.getReview());
  }

  public getV2LockedEvidenceReview(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionV2LockedEvidenceReview.getReview());
  }

  public getTrafficLockEvidenceReview(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionTrafficLockEvidenceReview.getReview());
  }

  public getRuntimeLockEvidenceReview(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionRuntimeLockEvidenceReview.getReview());
  }

  public getDataBoundaryEvidenceReview(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionDataBoundaryEvidenceReview.getReview());
  }

  public getExternalIntegrationEvidenceReview(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionExternalIntegrationEvidenceReview.getReview());
  }

  public getDependencyMatrix(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionBaselineApprovalDependencyMatrix.getMatrix());
  }

  public getBlockers(req: Request, res: Response) {
    return res.status(200).json({ blockers: FiscalProductionBaselineApprovalBlockerRegister.getBlockers() });
  }

  public getRisks(req: Request, res: Response) {
    return res.status(200).json({ risks: FiscalProductionBaselineApprovalRiskRegister.getRisks() });
  }

  public validate(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionBaselineApprovalValidator.validate(input);
    FiscalProductionBaselineApprovalAuditService.logValidation(input, result);
    if (!result.valid) {
      return res.status(403).json(result);
    }
    return res.status(200).json(result);
  }

  public evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionBaselineApprovalEvaluationService.evaluate(input);
    FiscalProductionBaselineApprovalAuditService.logEvaluation(input, result);
    const status = result.success ? 200 : 403;
    return res.status(status).json(result);
  }

  public simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionBaselineApprovalDecisionService.simulateDecision(input);
    FiscalProductionBaselineApprovalAuditService.logDecisionSimulation(input, result);
    const status = result.success ? 200 : 403;
    return res.status(status).json(result);
  }

  public getReport(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionBaselineApprovalReportService.getReport());
  }

  public getAudit(req: Request, res: Response) {
    return res.status(200).json({ logs: FiscalProductionBaselineApprovalAuditService.getAuditLogs() });
  }

  public getHealth(req: Request, res: Response) {
    return res.status(200).json({ status: 'UP', module: 'ProductionBaselineApprovalDryRun' });
  }
}
