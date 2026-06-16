import { Request, Response } from 'express';
import {
  FiscalProductionFinalGoLiveCommandCenterClosurePolicy,
  FiscalProductionFinalGoLiveCommandCenterClosureInventory,
  FiscalProductionFinalGoLiveCommandCenterFinalChecklist,
  FiscalProductionFinalGoLiveCommandCenterEvidencePackageService,
  FiscalProductionFinalGoLiveNoActivationHandoffService,
  FiscalProductionFinalGoLiveNoAuthorityHandoffService,
  FiscalProductionFinalGoLivePostClosureRoadmap,
  FiscalProductionFinalGoLiveCommandCenterClosureDependencyMatrix,
  FiscalProductionFinalGoLiveCommandCenterFinalBlockerRegister,
  FiscalProductionFinalGoLiveCommandCenterFinalRiskRegister,
  FiscalProductionFinalGoLiveCommandCenterClosureValidator,
  FiscalProductionFinalGoLiveCommandCenterClosureEvaluationService,
  FiscalProductionFinalGoLiveCommandCenterClosureDecisionService,
  FiscalProductionFinalGoLiveCommandCenterClosureReportService,
  FiscalProductionFinalGoLiveCommandCenterClosureAuditService
} from '../dedicated-homologation/production-final-go-live-command-center/closure';

export class FiscalProductionFinalGoLiveCommandCenterClosureController {
  public static getPolicy(req: Request, res: Response) {
    res.json(FiscalProductionFinalGoLiveCommandCenterClosurePolicy.getPolicy());
  }

  public static getClosureInventory(req: Request, res: Response) {
    res.json(FiscalProductionFinalGoLiveCommandCenterClosureInventory.getInventory());
  }

  public static getFinalChecklist(req: Request, res: Response) {
    res.json(FiscalProductionFinalGoLiveCommandCenterFinalChecklist.getChecklist());
  }

  public static getEvidencePackage(req: Request, res: Response) {
    res.json(FiscalProductionFinalGoLiveCommandCenterEvidencePackageService.getPackage());
  }

  public static getNoActivationHandoff(req: Request, res: Response) {
    res.json(FiscalProductionFinalGoLiveNoActivationHandoffService.getHandoff());
  }

  public static getNoAuthorityHandoff(req: Request, res: Response) {
    res.json(FiscalProductionFinalGoLiveNoAuthorityHandoffService.getHandoff());
  }

  public static getPostClosureRoadmap(req: Request, res: Response) {
    res.json(FiscalProductionFinalGoLivePostClosureRoadmap.getRoadmap());
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    res.json(FiscalProductionFinalGoLiveCommandCenterClosureDependencyMatrix.getMatrix());
  }

  public static getFinalBlockers(req: Request, res: Response) {
    res.json({ blockers: FiscalProductionFinalGoLiveCommandCenterFinalBlockerRegister.getBlockers() });
  }

  public static getFinalRisks(req: Request, res: Response) {
    res.json({ risks: FiscalProductionFinalGoLiveCommandCenterFinalRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const errors = FiscalProductionFinalGoLiveCommandCenterClosureValidator.validate(input);
    res.json({ valid: errors.length === 0, errors });
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const warnings = FiscalProductionFinalGoLiveCommandCenterClosureEvaluationService.evaluate(input);
    res.json({ evaluated: true, warnings });
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionFinalGoLiveCommandCenterClosureDecisionService.simulateDecision(input);
    res.json(result);
  }

  public static getReport(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionFinalGoLiveCommandCenterClosureDecisionService.simulateDecision(input);
    res.json(FiscalProductionFinalGoLiveCommandCenterClosureReportService.generateReport(result as any));
  }

  public static getAudit(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionFinalGoLiveCommandCenterClosureDecisionService.simulateDecision(input);
    res.json(FiscalProductionFinalGoLiveCommandCenterClosureAuditService.generateAuditRecord(result));
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'ok', module: 'Production Final Go-Live Command Center Governance Closure & Final No-Activation / No-Authority Evidence Handoff Package', readOnly: true });
  }
}
