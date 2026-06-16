import { Request, Response } from 'express';
import { FiscalProductionPostSealDormantStateClosurePolicy } from '../dedicated-homologation/production-post-seal-dormant-state-governance/closure/FiscalProductionPostSealDormantStateClosurePolicy';
import { FiscalProductionPostSealDormantStateClosureInventory } from '../dedicated-homologation/production-post-seal-dormant-state-governance/closure/FiscalProductionPostSealDormantStateClosureInventory';
import { FiscalProductionPostSealDormantStateFinalChecklist } from '../dedicated-homologation/production-post-seal-dormant-state-governance/closure/FiscalProductionPostSealDormantStateFinalChecklist';
import { FiscalProductionDormantStateEvidencePackageService } from '../dedicated-homologation/production-post-seal-dormant-state-governance/closure/FiscalProductionDormantStateEvidencePackageService';
import { FiscalProductionNoReentryNoResumptionHandoffService } from '../dedicated-homologation/production-post-seal-dormant-state-governance/closure/FiscalProductionNoReentryNoResumptionHandoffService';
import { FiscalProductionNoAuthorityNoActivationHandoffService } from '../dedicated-homologation/production-post-seal-dormant-state-governance/closure/FiscalProductionNoAuthorityNoActivationHandoffService';
import { FiscalProductionNoRuntimeNoDatabaseHandoffService } from '../dedicated-homologation/production-post-seal-dormant-state-governance/closure/FiscalProductionNoRuntimeNoDatabaseHandoffService';
import { FiscalProductionNoExternalIntegrationNoSensitiveDataHandoffService } from '../dedicated-homologation/production-post-seal-dormant-state-governance/closure/FiscalProductionNoExternalIntegrationNoSensitiveDataHandoffService';
import { FiscalProductionPostSealDormantStatePostClosureRoadmap } from '../dedicated-homologation/production-post-seal-dormant-state-governance/closure/FiscalProductionPostSealDormantStatePostClosureRoadmap';
import { FiscalProductionPostSealDormantStateClosureDependencyMatrix } from '../dedicated-homologation/production-post-seal-dormant-state-governance/closure/FiscalProductionPostSealDormantStateClosureDependencyMatrix';
import { FiscalProductionPostSealDormantStateFinalBlockerRegister } from '../dedicated-homologation/production-post-seal-dormant-state-governance/closure/FiscalProductionPostSealDormantStateFinalBlockerRegister';
import { FiscalProductionPostSealDormantStateFinalRiskRegister } from '../dedicated-homologation/production-post-seal-dormant-state-governance/closure/FiscalProductionPostSealDormantStateFinalRiskRegister';
import { FiscalProductionPostSealDormantStateClosureEvaluationService } from '../dedicated-homologation/production-post-seal-dormant-state-governance/closure/FiscalProductionPostSealDormantStateClosureEvaluationService';
import { FiscalProductionPostSealDormantStateClosureDecisionService } from '../dedicated-homologation/production-post-seal-dormant-state-governance/closure/FiscalProductionPostSealDormantStateClosureDecisionService';
import { FiscalProductionPostSealDormantStateClosureReportService } from '../dedicated-homologation/production-post-seal-dormant-state-governance/closure/FiscalProductionPostSealDormantStateClosureReportService';
import { FiscalProductionPostSealDormantStateClosureAuditService } from '../dedicated-homologation/production-post-seal-dormant-state-governance/closure/FiscalProductionPostSealDormantStateClosureAuditService';

export class FiscalProductionPostSealDormantStateClosureController {
  public static getPolicy(req: Request, res: Response): void {
    res.json({ policy: FiscalProductionPostSealDormantStateClosurePolicy.getMessage() });
  }

  public static getClosureInventory(req: Request, res: Response): void {
    res.json(FiscalProductionPostSealDormantStateClosureInventory.getInventory());
  }

  public static getFinalChecklist(req: Request, res: Response): void {
    res.json(FiscalProductionPostSealDormantStateFinalChecklist.getChecklist());
  }

  public static getEvidencePackage(req: Request, res: Response): void {
    res.json(FiscalProductionDormantStateEvidencePackageService.getPackage());
  }

  public static getNoReentryNoResumptionHandoff(req: Request, res: Response): void {
    res.json(FiscalProductionNoReentryNoResumptionHandoffService.getHandoff());
  }

  public static getNoAuthorityNoActivationHandoff(req: Request, res: Response): void {
    res.json(FiscalProductionNoAuthorityNoActivationHandoffService.getHandoff());
  }

  public static getNoRuntimeNoDatabaseHandoff(req: Request, res: Response): void {
    res.json(FiscalProductionNoRuntimeNoDatabaseHandoffService.getHandoff());
  }

  public static getNoExternalIntegrationNoSensitiveDataHandoff(req: Request, res: Response): void {
    res.json(FiscalProductionNoExternalIntegrationNoSensitiveDataHandoffService.getHandoff());
  }

  public static getPostClosureRoadmap(req: Request, res: Response): void {
    res.json(FiscalProductionPostSealDormantStatePostClosureRoadmap.getRoadmap());
  }

  public static getDependencyMatrix(req: Request, res: Response): void {
    res.json(FiscalProductionPostSealDormantStateClosureDependencyMatrix.getMatrix());
  }

  public static getFinalBlockers(req: Request, res: Response): void {
    res.json({ blockers: FiscalProductionPostSealDormantStateFinalBlockerRegister.getBlockers() });
  }

  public static getFinalRisks(req: Request, res: Response): void {
    res.json({ risks: FiscalProductionPostSealDormantStateFinalRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response): void {
    FiscalProductionPostSealDormantStateClosureAuditService.audit('Validation requested', { user: (req as any).user, body: req.body });
    const evaluation = FiscalProductionPostSealDormantStateClosureEvaluationService.evaluate(req.body);
    if (evaluation.blockers && evaluation.blockers.length > 0) {
      res.status(403).json(evaluation);
    } else {
      res.json(evaluation);
    }
  }

  public static evaluate(req: Request, res: Response): void {
    FiscalProductionPostSealDormantStateClosureAuditService.audit('Evaluation requested', { user: (req as any).user, body: req.body });
    const evaluation = FiscalProductionPostSealDormantStateClosureEvaluationService.evaluate(req.body);
    if (evaluation.blockers && evaluation.blockers.length > 0) {
      res.status(403).json(evaluation);
    } else {
      res.json(evaluation);
    }
  }

  public static simulateDecision(req: Request, res: Response): void {
    FiscalProductionPostSealDormantStateClosureAuditService.audit('Decision simulated', { user: (req as any).user, body: req.body });
    const blockers = FiscalProductionPostSealDormantStateClosureEvaluationService.evaluate(req.body).blockers;
    if (blockers && blockers.length > 0) {
      res.status(403).json({ status: 'FAILED_SAFE', blockers, validationExecuted: true, evaluationExecuted: false });
      return;
    }
    res.json(FiscalProductionPostSealDormantStateClosureDecisionService.simulateDecision(req.body));
  }

  public static getReport(req: Request, res: Response): void {
    FiscalProductionPostSealDormantStateClosureAuditService.audit('Report requested', { user: (req as any).user });
    res.json({ report: FiscalProductionPostSealDormantStateClosureReportService.getReport() });
  }

  public static getAudit(req: Request, res: Response): void {
    FiscalProductionPostSealDormantStateClosureAuditService.audit('Audit records requested', { user: (req as any).user });
    res.json({ message: 'Audit events are logged to the console.' });
  }

  public static getHealth(req: Request, res: Response): void {
    res.json({ status: 'healthy', module: 'production-post-seal-dormant-state-closure' });
  }
}
