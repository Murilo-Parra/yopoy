import { Request, Response } from 'express';
import {
  FiscalProductionFinalStateLedgerClosurePolicy,
  FiscalProductionFinalStateLedgerClosureInventory,
  FiscalProductionFinalStateLedgerFinalChecklist,
  FiscalProductionFinalStateLedgerEvidencePackageService,
  FiscalProductionFinalStateNoActivationHandoffService,
  FiscalProductionFinalStateNoPersistenceHandoffService,
  FiscalProductionFinalStateNoLegalEffectHandoffService,
  FiscalProductionFinalStatePostClosureRoadmap,
  FiscalProductionFinalStateLedgerClosureDependencyMatrix,
  FiscalProductionFinalStateLedgerFinalBlockerRegister,
  FiscalProductionFinalStateLedgerFinalRiskRegister,
  FiscalProductionFinalStateLedgerClosureValidator,
  FiscalProductionFinalStateLedgerClosureEvaluationService,
  FiscalProductionFinalStateLedgerClosureDecisionService,
  FiscalProductionFinalStateLedgerClosureReportService,
  FiscalProductionFinalStateLedgerClosureAuditService
} from '../dedicated-homologation/production-final-state-ledger-governance/closure';

export class FiscalProductionFinalStateLedgerClosureController {
  public static getPolicy(req: Request, res: Response) {
    res.json(FiscalProductionFinalStateLedgerClosurePolicy.getPolicy());
  }

  public static getClosureInventory(req: Request, res: Response) {
    res.json(FiscalProductionFinalStateLedgerClosureInventory.getInventory());
  }

  public static getFinalChecklist(req: Request, res: Response) {
    res.json(FiscalProductionFinalStateLedgerFinalChecklist.getChecklist());
  }

  public static getEvidencePackage(req: Request, res: Response) {
    res.json(FiscalProductionFinalStateLedgerEvidencePackageService.getEvidencePackage());
  }

  public static getNoActivationHandoff(req: Request, res: Response) {
    res.json(FiscalProductionFinalStateNoActivationHandoffService.simulateHandoff());
  }

  public static getNoPersistenceHandoff(req: Request, res: Response) {
    res.json(FiscalProductionFinalStateNoPersistenceHandoffService.simulateHandoff());
  }

  public static getNoLegalEffectHandoff(req: Request, res: Response) {
    res.json(FiscalProductionFinalStateNoLegalEffectHandoffService.getHandoff());
  }

  public static getPostClosureRoadmap(req: Request, res: Response) {
    res.json(FiscalProductionFinalStatePostClosureRoadmap.getRoadmap());
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    res.json(FiscalProductionFinalStateLedgerClosureDependencyMatrix.getMatrix());
  }

  public static getFinalBlockers(req: Request, res: Response) {
    res.json({ blockers: FiscalProductionFinalStateLedgerFinalBlockerRegister.getBlockers() });
  }

  public static getFinalRisks(req: Request, res: Response) {
    res.json({ risks: FiscalProductionFinalStateLedgerFinalRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const errors = FiscalProductionFinalStateLedgerClosureValidator.validate(input);
    res.json({ valid: errors.length === 0, errors });
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const warnings = FiscalProductionFinalStateLedgerClosureEvaluationService.evaluate(input);
    res.json({ evaluated: true, warnings });
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionFinalStateLedgerClosureDecisionService.simulateDecision(input);
    res.json(result);
  }

  public static getReport(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionFinalStateLedgerClosureDecisionService.simulateDecision(input);
    res.json(FiscalProductionFinalStateLedgerClosureReportService.generateReport(result as any));
  }

  public static getAudit(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionFinalStateLedgerClosureDecisionService.simulateDecision(input);
    res.json(FiscalProductionFinalStateLedgerClosureAuditService.generateAuditRecord(result));
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'ok', module: 'Production Final State Ledger Governance Closure', readOnly: true });
  }
}
