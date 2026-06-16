import { Request, Response } from 'express';
import { FiscalProductionSystemWideNonOperationalSealClosurePolicy } from '../dedicated-homologation/production-system-wide-non-operational-seal/closure/FiscalProductionSystemWideNonOperationalSealClosurePolicy';
import { FiscalProductionSystemWideNonOperationalSealClosureInventory } from '../dedicated-homologation/production-system-wide-non-operational-seal/closure/FiscalProductionSystemWideNonOperationalSealClosureInventory';
import { FiscalProductionSystemWideNonOperationalSealFinalChecklist } from '../dedicated-homologation/production-system-wide-non-operational-seal/closure/FiscalProductionSystemWideNonOperationalSealFinalChecklist';
import { FiscalProductionSystemWideNoAuthorityEvidencePackageService } from '../dedicated-homologation/production-system-wide-non-operational-seal/closure/FiscalProductionSystemWideNoAuthorityEvidencePackageService';
import { FiscalProductionSystemWideNoActivationEvidencePackageService } from '../dedicated-homologation/production-system-wide-non-operational-seal/closure/FiscalProductionSystemWideNoActivationEvidencePackageService';
import { FiscalProductionSystemWideNoOperationalHandoffService } from '../dedicated-homologation/production-system-wide-non-operational-seal/closure/FiscalProductionSystemWideNoOperationalHandoffService';
import { FiscalProductionSystemWideNoAuthorityHandoffService } from '../dedicated-homologation/production-system-wide-non-operational-seal/closure/FiscalProductionSystemWideNoAuthorityHandoffService';
import { FiscalProductionSystemWideNoActivationHandoffService } from '../dedicated-homologation/production-system-wide-non-operational-seal/closure/FiscalProductionSystemWideNoActivationHandoffService';
import { FiscalProductionSystemWideNonOperationalSealPostClosureRoadmap } from '../dedicated-homologation/production-system-wide-non-operational-seal/closure/FiscalProductionSystemWideNonOperationalSealPostClosureRoadmap';
import { FiscalProductionSystemWideNonOperationalSealClosureDependencyMatrix } from '../dedicated-homologation/production-system-wide-non-operational-seal/closure/FiscalProductionSystemWideNonOperationalSealClosureDependencyMatrix';
import { FiscalProductionSystemWideNonOperationalSealFinalBlockerRegister } from '../dedicated-homologation/production-system-wide-non-operational-seal/closure/FiscalProductionSystemWideNonOperationalSealFinalBlockerRegister';
import { FiscalProductionSystemWideNonOperationalSealFinalRiskRegister } from '../dedicated-homologation/production-system-wide-non-operational-seal/closure/FiscalProductionSystemWideNonOperationalSealFinalRiskRegister';
import { FiscalProductionSystemWideNonOperationalSealClosureEvaluationService } from '../dedicated-homologation/production-system-wide-non-operational-seal/closure/FiscalProductionSystemWideNonOperationalSealClosureEvaluationService';
import { FiscalProductionSystemWideNonOperationalSealClosureDecisionService } from '../dedicated-homologation/production-system-wide-non-operational-seal/closure/FiscalProductionSystemWideNonOperationalSealClosureDecisionService';
import { FiscalProductionSystemWideNonOperationalSealClosureReportService } from '../dedicated-homologation/production-system-wide-non-operational-seal/closure/FiscalProductionSystemWideNonOperationalSealClosureReportService';
import { FiscalProductionSystemWideNonOperationalSealClosureAuditService } from '../dedicated-homologation/production-system-wide-non-operational-seal/closure/FiscalProductionSystemWideNonOperationalSealClosureAuditService';

export class FiscalProductionSystemWideNonOperationalSealClosureController {
  public static getPolicy(req: Request, res: Response): void {
    res.json({ policy: FiscalProductionSystemWideNonOperationalSealClosurePolicy.getMessage() });
  }

  public static getClosureInventory(req: Request, res: Response): void {
    res.json(FiscalProductionSystemWideNonOperationalSealClosureInventory.getInventory());
  }

  public static getFinalChecklist(req: Request, res: Response): void {
    res.json(FiscalProductionSystemWideNonOperationalSealFinalChecklist.getChecklist());
  }

  public static getNoAuthorityEvidencePackage(req: Request, res: Response): void {
    res.json(FiscalProductionSystemWideNoAuthorityEvidencePackageService.generatePackage());
  }

  public static getNoActivationEvidencePackage(req: Request, res: Response): void {
    res.json(FiscalProductionSystemWideNoActivationEvidencePackageService.generatePackage());
  }

  public static getNoOperationalHandoff(req: Request, res: Response): void {
    res.json(FiscalProductionSystemWideNoOperationalHandoffService.generateHandoff());
  }

  public static getNoAuthorityHandoff(req: Request, res: Response): void {
    res.json(FiscalProductionSystemWideNoAuthorityHandoffService.generateHandoff());
  }

  public static getNoActivationHandoff(req: Request, res: Response): void {
    res.json(FiscalProductionSystemWideNoActivationHandoffService.generateHandoff());
  }

  public static getPostClosureRoadmap(req: Request, res: Response): void {
    res.json(FiscalProductionSystemWideNonOperationalSealPostClosureRoadmap.getRoadmap());
  }

  public static getDependencyMatrix(req: Request, res: Response): void {
    res.json(FiscalProductionSystemWideNonOperationalSealClosureDependencyMatrix.getMatrix());
  }

  public static getFinalBlockers(req: Request, res: Response): void {
    res.json({ blockers: FiscalProductionSystemWideNonOperationalSealFinalBlockerRegister.getBlockers() });
  }

  public static getFinalRisks(req: Request, res: Response): void {
    res.json({ risks: FiscalProductionSystemWideNonOperationalSealFinalRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response): void {
    FiscalProductionSystemWideNonOperationalSealClosureAuditService.audit('Validation requested', { user: (req as any).user, body: req.body });
    const evaluation = FiscalProductionSystemWideNonOperationalSealClosureEvaluationService.evaluate(req.body);
    if (evaluation.blockers && evaluation.blockers.length > 0) {
      res.status(403).json(evaluation);
    } else {
      res.json(evaluation);
    }
  }

  public static evaluate(req: Request, res: Response): void {
    FiscalProductionSystemWideNonOperationalSealClosureAuditService.audit('Evaluation requested', { user: (req as any).user, body: req.body });
    const evaluation = FiscalProductionSystemWideNonOperationalSealClosureEvaluationService.evaluate(req.body);
    if (evaluation.blockers && evaluation.blockers.length > 0) {
      res.status(403).json(evaluation);
    } else {
      res.json(evaluation);
    }
  }

  public static simulateDecision(req: Request, res: Response): void {
    FiscalProductionSystemWideNonOperationalSealClosureAuditService.audit('Decision simulated', { user: (req as any).user, body: req.body });
    const blockers = FiscalProductionSystemWideNonOperationalSealClosureEvaluationService.evaluate(req.body).blockers;
    if (blockers && blockers.length > 0) {
      res.status(403).json({ status: 'FAILED_SAFE', blockers, validationExecuted: true, evaluationExecuted: false });
      return;
    }
    res.json(FiscalProductionSystemWideNonOperationalSealClosureDecisionService.simulateDecision(req.body));
  }

  public static getReport(req: Request, res: Response): void {
    FiscalProductionSystemWideNonOperationalSealClosureAuditService.audit('Report requested', { user: (req as any).user });
    res.json({ report: FiscalProductionSystemWideNonOperationalSealClosureReportService.getReport() });
  }

  public static getAudit(req: Request, res: Response): void {
    FiscalProductionSystemWideNonOperationalSealClosureAuditService.audit('Audit records requested', { user: (req as any).user });
    res.json({ message: 'Audit events are logged to the console.' });
  }

  public static getHealth(req: Request, res: Response): void {
    res.json({ status: 'healthy', module: 'production-system-wide-non-operational-seal-closure' });
  }
}
