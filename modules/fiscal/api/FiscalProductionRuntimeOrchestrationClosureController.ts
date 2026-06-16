import { Request, Response } from 'express';
import {
  FiscalProductionRuntimeOrchestrationClosurePolicy,
  FiscalProductionRuntimeOrchestrationClosureInventory,
  FiscalProductionRuntimeOrchestrationFinalChecklist,
  FiscalProductionRuntimeNoExecutionEvidencePackageService,
  FiscalProductionRuntimeNoExecutionHandoffService,
  FiscalProductionRuntimePostClosureRoadmap,
  FiscalProductionRuntimeNamespaceCollisionReviewMatrix,
  FiscalProductionRuntimeLintTs2308KnownIssueRegister,
  FiscalProductionRuntimeFinalBlockerRegister,
  FiscalProductionRuntimeFinalRiskRegister,
  FiscalProductionRuntimeOrchestrationClosureValidator,
  FiscalProductionRuntimeOrchestrationClosureEvaluationService,
  FiscalProductionRuntimeOrchestrationClosureDecisionService,
  FiscalProductionRuntimeOrchestrationClosureReportService,
  FiscalProductionRuntimeOrchestrationClosureAuditService
} from '../dedicated-homologation/production-runtime-orchestration-governance/closure';

export class FiscalProductionRuntimeOrchestrationClosureController {
  public static getPolicy(req: Request, res: Response) {
    res.json(FiscalProductionRuntimeOrchestrationClosurePolicy.getPolicy());
  }

  public static getClosureInventory(req: Request, res: Response) {
    res.json(FiscalProductionRuntimeOrchestrationClosureInventory.getInventory());
  }

  public static getFinalChecklist(req: Request, res: Response) {
    res.json(FiscalProductionRuntimeOrchestrationFinalChecklist.getChecklist());
  }

  public static getEvidencePackage(req: Request, res: Response) {
    res.json(FiscalProductionRuntimeNoExecutionEvidencePackageService.getPackage());
  }

  public static getNoExecutionHandoff(req: Request, res: Response) {
    res.json(FiscalProductionRuntimeNoExecutionHandoffService.getHandoff());
  }

  public static getPostClosureRoadmap(req: Request, res: Response) {
    res.json(FiscalProductionRuntimePostClosureRoadmap.getRoadmap());
  }

  public static getNamespaceCollisionReview(req: Request, res: Response) {
    res.json(FiscalProductionRuntimeNamespaceCollisionReviewMatrix.getMatrix());
  }

  public static getLintTs2308KnownIssues(req: Request, res: Response) {
    res.json(FiscalProductionRuntimeLintTs2308KnownIssueRegister.getRegister());
  }

  public static getFinalBlockers(req: Request, res: Response) {
    res.json({ blockers: FiscalProductionRuntimeFinalBlockerRegister.getBlockers() });
  }

  public static getFinalRisks(req: Request, res: Response) {
    res.json({ risks: FiscalProductionRuntimeFinalRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const errors = FiscalProductionRuntimeOrchestrationClosureValidator.validate(input);
    res.json({ valid: errors.length === 0, errors });
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const warnings = FiscalProductionRuntimeOrchestrationClosureEvaluationService.evaluate(input);
    res.json({ evaluated: true, warnings });
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionRuntimeOrchestrationClosureDecisionService.simulateDecision(input);
    res.json(result);
  }

  public static getReport(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionRuntimeOrchestrationClosureDecisionService.simulateDecision(input);
    res.json(FiscalProductionRuntimeOrchestrationClosureReportService.generateReport(result));
  }

  public static getAudit(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionRuntimeOrchestrationClosureDecisionService.simulateDecision(input);
    res.json(FiscalProductionRuntimeOrchestrationClosureAuditService.generateAuditRecord(result));
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'ok', module: 'Production Runtime Orchestration Governance Closure & Final No-Execution Evidence Handoff Package', readOnly: true });
  }
}
