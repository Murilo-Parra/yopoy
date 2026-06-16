import { Request, Response } from 'express';
import {
  FiscalProductionGovernanceRetentionDormancyClosurePolicy,
  FiscalProductionGovernanceRetentionDormancyClosureInventory,
  FiscalProductionGovernanceRetentionDormancyFinalChecklist,
  FiscalProductionRetentionDormancyEvidencePackageService,
  FiscalProductionNoRetentionNoCustodyHandoffService,
  FiscalProductionNoLifecycleMutationHandoffService,
  FiscalProductionNoAccessNoRetrievalHandoffService,
  FiscalProductionNoDisclosureNoExportHandoffService,
  FiscalProductionRetentionDormancyPostClosureRoadmap,
  FiscalProductionRetentionDormancyClosureDependencyMatrix,
  FiscalProductionRetentionDormancyFinalBlockerRegister,
  FiscalProductionRetentionDormancyFinalRiskRegister,
  FiscalProductionGovernanceRetentionDormancyClosureValidator,
  FiscalProductionGovernanceRetentionDormancyClosureEvaluationService,
  FiscalProductionGovernanceRetentionDormancyClosureDecisionService,
  FiscalProductionGovernanceRetentionDormancyClosureReportService,
  FiscalProductionGovernanceRetentionDormancyClosureAuditService
} from '../dedicated-homologation/production-governance-retention-dormancy/closure';

export class FiscalProductionGovernanceRetentionDormancyClosureController {
  public static getPolicy(req: Request, res: Response) {
    res.json(FiscalProductionGovernanceRetentionDormancyClosurePolicy.getPolicy());
  }

  public static getClosureInventory(req: Request, res: Response) {
    res.json(FiscalProductionGovernanceRetentionDormancyClosureInventory.getInventory());
  }

  public static getFinalChecklist(req: Request, res: Response) {
    res.json(FiscalProductionGovernanceRetentionDormancyFinalChecklist.getChecklist());
  }

  public static getEvidencePackage(req: Request, res: Response) {
    res.json(FiscalProductionRetentionDormancyEvidencePackageService.getPackage());
  }

  public static getNoRetentionNoCustodyHandoff(req: Request, res: Response) {
    res.json(FiscalProductionNoRetentionNoCustodyHandoffService.simulateHandoff());
  }

  public static getNoLifecycleMutationHandoff(req: Request, res: Response) {
    res.json(FiscalProductionNoLifecycleMutationHandoffService.simulateHandoff());
  }

  public static getNoAccessNoRetrievalHandoff(req: Request, res: Response) {
    res.json(FiscalProductionNoAccessNoRetrievalHandoffService.simulateHandoff());
  }

  public static getNoDisclosureNoExportHandoff(req: Request, res: Response) {
    res.json(FiscalProductionNoDisclosureNoExportHandoffService.simulateHandoff());
  }

  public static getPostClosureRoadmap(req: Request, res: Response) {
    res.json(FiscalProductionRetentionDormancyPostClosureRoadmap.getRoadmap());
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    res.json(FiscalProductionRetentionDormancyClosureDependencyMatrix.getMatrix());
  }

  public static getFinalBlockers(req: Request, res: Response) {
    res.json({ blockers: FiscalProductionRetentionDormancyFinalBlockerRegister.getBlockers() });
  }

  public static getFinalRisks(req: Request, res: Response) {
    res.json({ risks: FiscalProductionRetentionDormancyFinalRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const errors = FiscalProductionGovernanceRetentionDormancyClosureValidator.validate(input);
    res.json({ valid: errors.length === 0, errors });
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const warnings = FiscalProductionGovernanceRetentionDormancyClosureEvaluationService.evaluate(input);
    res.json({ evaluated: true, warnings });
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionGovernanceRetentionDormancyClosureDecisionService.simulateDecision(input);
    res.json(result);
  }

  public static getReport(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionGovernanceRetentionDormancyClosureDecisionService.simulateDecision(input);
    res.json(FiscalProductionGovernanceRetentionDormancyClosureReportService.generateReport(result as any));
  }

  public static getAudit(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionGovernanceRetentionDormancyClosureDecisionService.simulateDecision(input);
    res.json(FiscalProductionGovernanceRetentionDormancyClosureAuditService.generateAuditRecord(result));
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'ok', module: 'Production Governance Retention Dormancy Closure', readOnly: true });
  }
}
