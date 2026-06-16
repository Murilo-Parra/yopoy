import { Request, Response } from 'express';
import { FiscalProductionPostSealDormantStatePolicy } from '../dedicated-homologation/production-post-seal-dormant-state-governance/FiscalProductionPostSealDormantStatePolicy';
import { FiscalProductionPostSealDormantStateGovernanceBlueprint } from '../dedicated-homologation/production-post-seal-dormant-state-governance/FiscalProductionPostSealDormantStateGovernanceBlueprint';
import { FiscalProductionPermanentNonResumptionContract } from '../dedicated-homologation/production-post-seal-dormant-state-governance/FiscalProductionPermanentNonResumptionContract';
import { FiscalProductionNoReentryBoundaryMatrix } from '../dedicated-homologation/production-post-seal-dormant-state-governance/FiscalProductionNoReentryBoundaryMatrix';
import { FiscalProductionAuthorityResumptionBlockedPlan } from '../dedicated-homologation/production-post-seal-dormant-state-governance/FiscalProductionAuthorityResumptionBlockedPlan';
import { FiscalProductionActivationResumptionBlockedPlan } from '../dedicated-homologation/production-post-seal-dormant-state-governance/FiscalProductionActivationResumptionBlockedPlan';
import { FiscalProductionRoutingResumptionBlockedMatrix } from '../dedicated-homologation/production-post-seal-dormant-state-governance/FiscalProductionRoutingResumptionBlockedMatrix';
import { FiscalProductionRuntimeResumptionBlockedPlan } from '../dedicated-homologation/production-post-seal-dormant-state-governance/FiscalProductionRuntimeResumptionBlockedPlan';
import { FiscalProductionDatabaseResumptionBlockedMatrix } from '../dedicated-homologation/production-post-seal-dormant-state-governance/FiscalProductionDatabaseResumptionBlockedMatrix';
import { FiscalProductionExternalIntegrationResumptionBlockedPlan } from '../dedicated-homologation/production-post-seal-dormant-state-governance/FiscalProductionExternalIntegrationResumptionBlockedPlan';
import { FiscalProductionSensitiveDataResumptionBlockedMatrix } from '../dedicated-homologation/production-post-seal-dormant-state-governance/FiscalProductionSensitiveDataResumptionBlockedMatrix';
import { FiscalProductionDormantStateNoRecordPlan } from '../dedicated-homologation/production-post-seal-dormant-state-governance/FiscalProductionDormantStateNoRecordPlan';
import { FiscalProductionNoRealDormancyRecordEvidence } from '../dedicated-homologation/production-post-seal-dormant-state-governance/FiscalProductionNoRealDormancyRecordEvidence';
import { FiscalProductionNoRealResumptionEvidence } from '../dedicated-homologation/production-post-seal-dormant-state-governance/FiscalProductionNoRealResumptionEvidence';
import { FiscalProductionNoRealReentryEvidence } from '../dedicated-homologation/production-post-seal-dormant-state-governance/FiscalProductionNoRealReentryEvidence';
import { FiscalProductionPostSealDormantStateDependencyMatrix } from '../dedicated-homologation/production-post-seal-dormant-state-governance/FiscalProductionPostSealDormantStateDependencyMatrix';
import { FiscalProductionPostSealDormantStateBlockerRegister } from '../dedicated-homologation/production-post-seal-dormant-state-governance/FiscalProductionPostSealDormantStateBlockerRegister';
import { FiscalProductionPostSealDormantStateRiskRegister } from '../dedicated-homologation/production-post-seal-dormant-state-governance/FiscalProductionPostSealDormantStateRiskRegister';
import { FiscalProductionPostSealDormantStateEvaluationService } from '../dedicated-homologation/production-post-seal-dormant-state-governance/FiscalProductionPostSealDormantStateEvaluationService';
import { FiscalProductionPostSealDormantStateDecisionService } from '../dedicated-homologation/production-post-seal-dormant-state-governance/FiscalProductionPostSealDormantStateDecisionService';
import { FiscalProductionPostSealDormantStateReportService } from '../dedicated-homologation/production-post-seal-dormant-state-governance/FiscalProductionPostSealDormantStateReportService';
import { FiscalProductionPostSealDormantStateAuditService } from '../dedicated-homologation/production-post-seal-dormant-state-governance/FiscalProductionPostSealDormantStateAuditService';

export class FiscalProductionPostSealDormantStateController {
  public static getPolicy(req: Request, res: Response): void {
    res.json({ policy: FiscalProductionPostSealDormantStatePolicy.getMessage() });
  }

  public static getDormantStateBlueprint(req: Request, res: Response): void {
    res.json(FiscalProductionPostSealDormantStateGovernanceBlueprint.getBlueprint());
  }

  public static getPermanentNonResumptionContract(req: Request, res: Response): void {
    res.json(FiscalProductionPermanentNonResumptionContract.getContract());
  }

  public static getNoReentryBoundaryMatrix(req: Request, res: Response): void {
    res.json(FiscalProductionNoReentryBoundaryMatrix.getMatrix());
  }

  public static getAuthorityResumptionBlockedPlan(req: Request, res: Response): void {
    res.json(FiscalProductionAuthorityResumptionBlockedPlan.getPlan());
  }

  public static getActivationResumptionBlockedPlan(req: Request, res: Response): void {
    res.json(FiscalProductionActivationResumptionBlockedPlan.getPlan());
  }

  public static getRoutingResumptionBlockedMatrix(req: Request, res: Response): void {
    res.json(FiscalProductionRoutingResumptionBlockedMatrix.getMatrix());
  }

  public static getRuntimeResumptionBlockedPlan(req: Request, res: Response): void {
    res.json(FiscalProductionRuntimeResumptionBlockedPlan.getPlan());
  }

  public static getDatabaseResumptionBlockedMatrix(req: Request, res: Response): void {
    res.json(FiscalProductionDatabaseResumptionBlockedMatrix.getMatrix());
  }

  public static getExternalIntegrationResumptionBlockedPlan(req: Request, res: Response): void {
    res.json(FiscalProductionExternalIntegrationResumptionBlockedPlan.getPlan());
  }

  public static getSensitiveDataResumptionBlockedMatrix(req: Request, res: Response): void {
    res.json(FiscalProductionSensitiveDataResumptionBlockedMatrix.getMatrix());
  }

  public static getDormantStateNoRecordPlan(req: Request, res: Response): void {
    res.json(FiscalProductionDormantStateNoRecordPlan.getPlan());
  }

  public static getNoRealDormancyRecordEvidence(req: Request, res: Response): void {
    res.json(FiscalProductionNoRealDormancyRecordEvidence.getEvidence());
  }

  public static getNoRealResumptionEvidence(req: Request, res: Response): void {
    res.json(FiscalProductionNoRealResumptionEvidence.getEvidence());
  }

  public static getNoRealReentryEvidence(req: Request, res: Response): void {
    res.json(FiscalProductionNoRealReentryEvidence.getEvidence());
  }

  public static getDependencyMatrix(req: Request, res: Response): void {
    res.json(FiscalProductionPostSealDormantStateDependencyMatrix.getMatrix());
  }

  public static getBlockers(req: Request, res: Response): void {
    res.json({ blockers: FiscalProductionPostSealDormantStateBlockerRegister.getBlockers() });
  }

  public static getRisks(req: Request, res: Response): void {
    res.json({ risks: FiscalProductionPostSealDormantStateRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response): void {
    FiscalProductionPostSealDormantStateAuditService.audit('Validation requested', { user: (req as any).user, body: req.body });
    const evaluation = FiscalProductionPostSealDormantStateEvaluationService.evaluate(req.body);
    if (evaluation.blockers && evaluation.blockers.length > 0) {
      res.status(403).json(evaluation);
    } else {
      res.json(evaluation);
    }
  }

  public static evaluate(req: Request, res: Response): void {
    FiscalProductionPostSealDormantStateAuditService.audit('Evaluation requested', { user: (req as any).user, body: req.body });
    const evaluation = FiscalProductionPostSealDormantStateEvaluationService.evaluate(req.body);
    if (evaluation.blockers && evaluation.blockers.length > 0) {
      res.status(403).json(evaluation);
    } else {
      res.json(evaluation);
    }
  }

  public static simulateDecision(req: Request, res: Response): void {
    FiscalProductionPostSealDormantStateAuditService.audit('Decision simulated', { user: (req as any).user, body: req.body });
    const blockers = FiscalProductionPostSealDormantStateEvaluationService.evaluate(req.body).blockers;
    if (blockers && blockers.length > 0) {
      res.status(403).json({ status: 'FAILED_SAFE', blockers, validationExecuted: true, evaluationExecuted: false });
      return;
    }
    res.json(FiscalProductionPostSealDormantStateDecisionService.simulateDecision(req.body));
  }

  public static getReport(req: Request, res: Response): void {
    FiscalProductionPostSealDormantStateAuditService.audit('Report requested', { user: (req as any).user });
    res.json({ report: FiscalProductionPostSealDormantStateReportService.getReport() });
  }

  public static getAudit(req: Request, res: Response): void {
    FiscalProductionPostSealDormantStateAuditService.audit('Audit records requested', { user: (req as any).user });
    res.json({ message: 'Audit events are logged to the console.' });
  }

  public static getHealth(req: Request, res: Response): void {
    res.json({ status: 'healthy', module: 'production-post-seal-dormant-state-governance' });
  }
}
