import { Request, Response } from 'express';
import {
  FiscalProductionFinalStateLedgerPolicy,
  FiscalProductionFinalStateLedgerGovernanceBlueprint,
  FiscalProductionImmutableNoActivationRecordContract,
  FiscalProductionVirtualLedgerScopeInventory,
  FiscalProductionFinalNoActivationStateMatrix,
  FiscalProductionFinalNoAuthorityStateMatrix,
  FiscalProductionFinalNoRoutingStateMatrix,
  FiscalProductionFinalNoRuntimeStateMatrix,
  FiscalProductionFinalNoDatabaseStateMatrix,
  FiscalProductionFinalNoExternalIntegrationStateMatrix,
  FiscalProductionFinalNoSensitiveDataStateMatrix,
  FiscalProductionLedgerNoPersistencePlan,
  FiscalProductionLedgerNoRealHashPlan,
  FiscalProductionLedgerNoRealSignaturePlan,
  FiscalProductionFinalStateNoLegalEffectNotice,
  FiscalProductionFinalStateLedgerDependencyMatrix,
  FiscalProductionFinalStateLedgerBlockerRegister,
  FiscalProductionFinalStateLedgerRiskRegister,
  FiscalProductionFinalStateLedgerValidator,
  FiscalProductionFinalStateLedgerEvaluationService,
  FiscalProductionFinalStateLedgerDecisionService,
  FiscalProductionFinalStateLedgerReportService,
  FiscalProductionFinalStateLedgerAuditService
} from '../dedicated-homologation/production-final-state-ledger-governance';

export class FiscalProductionFinalStateLedgerController {
  public static getPolicy(req: Request, res: Response) {
    res.json(FiscalProductionFinalStateLedgerPolicy.getPolicy());
  }

  public static getFinalStateLedgerGovernanceBlueprint(req: Request, res: Response) {
    res.json(FiscalProductionFinalStateLedgerGovernanceBlueprint.getBlueprint());
  }

  public static getImmutableNoActivationRecordContract(req: Request, res: Response) {
    res.json(FiscalProductionImmutableNoActivationRecordContract.getContract());
  }

  public static getVirtualLedgerScopeInventory(req: Request, res: Response) {
    res.json(FiscalProductionVirtualLedgerScopeInventory.getInventory());
  }

  public static getFinalNoActivationStateMatrix(req: Request, res: Response) {
    res.json(FiscalProductionFinalNoActivationStateMatrix.getMatrix());
  }

  public static getFinalNoAuthorityStateMatrix(req: Request, res: Response) {
    res.json(FiscalProductionFinalNoAuthorityStateMatrix.getMatrix());
  }

  public static getFinalNoRoutingStateMatrix(req: Request, res: Response) {
    res.json(FiscalProductionFinalNoRoutingStateMatrix.getMatrix());
  }

  public static getFinalNoRuntimeStateMatrix(req: Request, res: Response) {
    res.json(FiscalProductionFinalNoRuntimeStateMatrix.getMatrix());
  }

  public static getFinalNoDatabaseStateMatrix(req: Request, res: Response) {
    res.json(FiscalProductionFinalNoDatabaseStateMatrix.getMatrix());
  }

  public static getFinalNoExternalIntegrationStateMatrix(req: Request, res: Response) {
    res.json(FiscalProductionFinalNoExternalIntegrationStateMatrix.getMatrix());
  }

  public static getFinalNoSensitiveDataStateMatrix(req: Request, res: Response) {
    res.json(FiscalProductionFinalNoSensitiveDataStateMatrix.getMatrix());
  }

  public static getLedgerNoPersistencePlan(req: Request, res: Response) {
    res.json(FiscalProductionLedgerNoPersistencePlan.getPlan());
  }

  public static getLedgerNoRealHashPlan(req: Request, res: Response) {
    res.json(FiscalProductionLedgerNoRealHashPlan.getPlan());
  }

  public static getLedgerNoRealSignaturePlan(req: Request, res: Response) {
    res.json(FiscalProductionLedgerNoRealSignaturePlan.getPlan());
  }

  public static getFinalStateNoLegalEffectNotice(req: Request, res: Response) {
    res.json(FiscalProductionFinalStateNoLegalEffectNotice.getNotice());
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    res.json(FiscalProductionFinalStateLedgerDependencyMatrix.getMatrix());
  }

  public static getBlockers(req: Request, res: Response) {
    res.json({ blockers: FiscalProductionFinalStateLedgerBlockerRegister.getBlockers() });
  }

  public static getRisks(req: Request, res: Response) {
    res.json({ risks: FiscalProductionFinalStateLedgerRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const errors = FiscalProductionFinalStateLedgerValidator.validate(input);
    res.json({ valid: errors.length === 0, errors });
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const warnings = FiscalProductionFinalStateLedgerEvaluationService.evaluate(input);
    res.json({ evaluated: true, warnings });
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionFinalStateLedgerDecisionService.simulateDecision(input);
    res.json(result);
  }

  public static getReport(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionFinalStateLedgerDecisionService.simulateDecision(input);
    res.json(FiscalProductionFinalStateLedgerReportService.generateReport(result as any));
  }

  public static getAudit(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionFinalStateLedgerDecisionService.simulateDecision(input);
    res.json(FiscalProductionFinalStateLedgerAuditService.generateAuditRecord(result));
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'ok', module: 'Production Final State Ledger Governance Blueprint & Immutable No-Activation Record Contract', readOnly: true });
  }
}
