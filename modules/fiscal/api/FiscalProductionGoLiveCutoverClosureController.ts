import { Request, Response } from 'express';
import {
  FiscalProductionGoLiveCutoverClosurePolicy,
  FiscalProductionGoLiveCutoverClosureInventory,
  FiscalProductionGoLiveCutoverFinalChecklist,
  FiscalProductionGoLiveCutoverEvidencePackageService,
  FiscalProductionGoLiveNoActivationHandoffService,
  FiscalProductionGoLivePostClosureRoadmap,
  FiscalProductionGoLiveCutoverFinalBlockerRegister,
  FiscalProductionGoLiveCutoverFinalRiskRegister,
  FiscalProductionGoLiveCutoverClosureValidator,
  FiscalProductionGoLiveCutoverClosureEvaluationService,
  FiscalProductionGoLiveCutoverClosureDecisionService,
  FiscalProductionGoLiveCutoverClosureReportService,
  FiscalProductionGoLiveCutoverClosureAuditService
} from '../dedicated-homologation/production-go-live-cutover/closure';

export class FiscalProductionGoLiveCutoverClosureController {
  public static getPolicy(req: Request, res: Response) {
    res.json(FiscalProductionGoLiveCutoverClosurePolicy.getPolicy());
  }

  public static getClosureInventory(req: Request, res: Response) {
    res.json(FiscalProductionGoLiveCutoverClosureInventory.getInventory());
  }

  public static getFinalChecklist(req: Request, res: Response) {
    res.json(FiscalProductionGoLiveCutoverFinalChecklist.getChecklist());
  }

  public static getEvidencePackage(req: Request, res: Response) {
    res.json(FiscalProductionGoLiveCutoverEvidencePackageService.getEvidencePackage());
  }

  public static getNoActivationHandoff(req: Request, res: Response) {
    res.json(FiscalProductionGoLiveNoActivationHandoffService.getHandoff());
  }

  public static getPostClosureRoadmap(req: Request, res: Response) {
    res.json(FiscalProductionGoLivePostClosureRoadmap.getRoadmap());
  }

  public static getFinalBlockers(req: Request, res: Response) {
    res.json({ blockers: FiscalProductionGoLiveCutoverFinalBlockerRegister.getBlockers() });
  }

  public static getFinalRisks(req: Request, res: Response) {
    res.json({ risks: FiscalProductionGoLiveCutoverFinalRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const errors = FiscalProductionGoLiveCutoverClosureValidator.validate(input);
    res.json({ valid: errors.length === 0, errors });
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const warnings = FiscalProductionGoLiveCutoverClosureEvaluationService.evaluate(input);
    res.json({ evaluated: true, warnings });
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionGoLiveCutoverClosureDecisionService.simulateDecision(input);
    res.json(result);
  }

  public static getReport(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionGoLiveCutoverClosureDecisionService.simulateDecision(input);
    const report = FiscalProductionGoLiveCutoverClosureReportService.generateReport(result);
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionGoLiveCutoverClosureDecisionService.simulateDecision(input);
    const audit = FiscalProductionGoLiveCutoverClosureAuditService.generateAuditRecord(result);
    res.json(audit);
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'ok', module: 'Production Go-Live Cutover Governance Closure & Final No-Activation Evidence Handoff Package', readOnly: true });
  }
}
