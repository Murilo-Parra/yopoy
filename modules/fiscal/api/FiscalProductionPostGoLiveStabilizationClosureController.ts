import { Request, Response } from 'express';
import {
  FiscalProductionPostGoLiveStabilizationClosurePolicy,
  FiscalProductionPostGoLiveStabilizationClosureInventory,
  FiscalProductionPostGoLiveStabilizationFinalChecklist,
  FiscalProductionPostGoLiveStabilizationEvidencePackageService,
  FiscalProductionPostGoLiveNoActivationHandoffService,
  FiscalProductionPostGoLivePostClosureRoadmap,
  FiscalProductionPostGoLiveStabilizationFinalBlockerRegister,
  FiscalProductionPostGoLiveStabilizationFinalRiskRegister,
  FiscalProductionPostGoLiveStabilizationClosureValidator,
  FiscalProductionPostGoLiveStabilizationClosureEvaluationService,
  FiscalProductionPostGoLiveStabilizationClosureDecisionService,
  FiscalProductionPostGoLiveStabilizationClosureReportService,
  FiscalProductionPostGoLiveStabilizationClosureAuditService
} from '../dedicated-homologation/production-post-go-live-stabilization/closure';

export class FiscalProductionPostGoLiveStabilizationClosureController {
  public static getPolicy(req: Request, res: Response) {
    res.json(FiscalProductionPostGoLiveStabilizationClosurePolicy.getPolicy());
  }

  public static getClosureInventory(req: Request, res: Response) {
    res.json(FiscalProductionPostGoLiveStabilizationClosureInventory.getInventory());
  }

  public static getFinalChecklist(req: Request, res: Response) {
    res.json(FiscalProductionPostGoLiveStabilizationFinalChecklist.getChecklist());
  }

  public static getEvidencePackage(req: Request, res: Response) {
    res.json(FiscalProductionPostGoLiveStabilizationEvidencePackageService.getPackage());
  }

  public static getNoActivationHandoff(req: Request, res: Response) {
    res.json(FiscalProductionPostGoLiveNoActivationHandoffService.getHandoff());
  }

  public static getPostClosureRoadmap(req: Request, res: Response) {
    res.json(FiscalProductionPostGoLivePostClosureRoadmap.getRoadmap());
  }

  public static getFinalBlockers(req: Request, res: Response) {
    res.json({ blockers: FiscalProductionPostGoLiveStabilizationFinalBlockerRegister.getBlockers() });
  }

  public static getFinalRisks(req: Request, res: Response) {
    res.json({ risks: FiscalProductionPostGoLiveStabilizationFinalRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const errors = FiscalProductionPostGoLiveStabilizationClosureValidator.validate(input);
    res.json({ valid: errors.length === 0, errors });
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const warnings = FiscalProductionPostGoLiveStabilizationClosureEvaluationService.evaluate(input);
    res.json({ evaluated: true, warnings });
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionPostGoLiveStabilizationClosureDecisionService.simulateDecision(input);
    res.json(result);
  }

  public static getReport(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionPostGoLiveStabilizationClosureDecisionService.simulateDecision(input);
    const report = FiscalProductionPostGoLiveStabilizationClosureReportService.generateReport(result);
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionPostGoLiveStabilizationClosureDecisionService.simulateDecision(input);
    const audit = FiscalProductionPostGoLiveStabilizationClosureAuditService.generateAuditRecord(result);
    res.json(audit);
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'ok', module: 'Production Post-Go-Live Stabilization Governance Closure & Final No-Activation Evidence Handoff Package', readOnly: true });
  }
}
