import { Request, Response } from 'express';
import {
  FiscalProductionFinalGoLiveCommandCenterPolicy,
  FiscalProductionFinalGoLiveCommandCenterBlueprint,
  FiscalProductionHardActivationNonAuthorityContract,
  FiscalProductionFinalGoLiveScopeInventory,
  FiscalProductionDomainReadinessAggregationMatrix,
  FiscalProductionNoAuthorityActivationBoundary,
  FiscalProductionFinalGoLiveDecisionNoOpMatrix,
  FiscalProductionCommandCenterNoExecutionPlan,
  FiscalProductionCommandCenterNoRoutingPlan,
  FiscalProductionCommandCenterNoRuntimePlan,
  FiscalProductionCommandCenterNoDatabasePlan,
  FiscalProductionCommandCenterNoExternalIntegrationPlan,
  FiscalProductionCommandCenterNoSensitiveDataPlan,
  FiscalProductionFinalGoLiveNoRealAuthorityEvidence,
  FiscalProductionFinalGoLiveNoActivationEvidence,
  FiscalProductionFinalGoLiveCommandCenterDependencyMatrix,
  FiscalProductionFinalGoLiveCommandCenterBlockerRegister,
  FiscalProductionFinalGoLiveCommandCenterRiskRegister,
  FiscalProductionFinalGoLiveCommandCenterValidator,
  FiscalProductionFinalGoLiveCommandCenterEvaluationService,
  FiscalProductionFinalGoLiveCommandCenterDecisionService,
  FiscalProductionFinalGoLiveCommandCenterReportService,
  FiscalProductionFinalGoLiveCommandCenterAuditService
} from '../dedicated-homologation/production-final-go-live-command-center';

export class FiscalProductionFinalGoLiveCommandCenterController {
  public static getPolicy(req: Request, res: Response) {
    res.json(FiscalProductionFinalGoLiveCommandCenterPolicy.getPolicy());
  }

  public static getCommandCenterBlueprint(req: Request, res: Response) {
    res.json(FiscalProductionFinalGoLiveCommandCenterBlueprint.getBlueprint());
  }

  public static getHardActivationNonAuthorityContract(req: Request, res: Response) {
    res.json(FiscalProductionHardActivationNonAuthorityContract.getContract());
  }

  public static getScopeInventory(req: Request, res: Response) {
    res.json(FiscalProductionFinalGoLiveScopeInventory.getInventory());
  }

  public static getDomainReadinessAggregationMatrix(req: Request, res: Response) {
    res.json(FiscalProductionDomainReadinessAggregationMatrix.getMatrix());
  }

  public static getNoAuthorityActivationBoundary(req: Request, res: Response) {
    res.json(FiscalProductionNoAuthorityActivationBoundary.getBoundary());
  }

  public static getFinalGoLiveDecisionNoOpMatrix(req: Request, res: Response) {
    res.json(FiscalProductionFinalGoLiveDecisionNoOpMatrix.getMatrix());
  }

  public static getCommandCenterNoExecutionPlan(req: Request, res: Response) {
    res.json(FiscalProductionCommandCenterNoExecutionPlan.getPlan());
  }

  public static getCommandCenterNoRoutingPlan(req: Request, res: Response) {
    res.json(FiscalProductionCommandCenterNoRoutingPlan.getPlan());
  }

  public static getCommandCenterNoRuntimePlan(req: Request, res: Response) {
    res.json(FiscalProductionCommandCenterNoRuntimePlan.getPlan());
  }

  public static getCommandCenterNoDatabasePlan(req: Request, res: Response) {
    res.json(FiscalProductionCommandCenterNoDatabasePlan.getPlan());
  }

  public static getCommandCenterNoExternalIntegrationPlan(req: Request, res: Response) {
    res.json(FiscalProductionCommandCenterNoExternalIntegrationPlan.getPlan());
  }

  public static getCommandCenterNoSensitiveDataPlan(req: Request, res: Response) {
    res.json(FiscalProductionCommandCenterNoSensitiveDataPlan.getPlan());
  }

  public static getNoRealAuthorityEvidence(req: Request, res: Response) {
    res.json(FiscalProductionFinalGoLiveNoRealAuthorityEvidence.getEvidence());
  }

  public static getNoActivationEvidence(req: Request, res: Response) {
    res.json(FiscalProductionFinalGoLiveNoActivationEvidence.getEvidence());
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    res.json(FiscalProductionFinalGoLiveCommandCenterDependencyMatrix.getMatrix());
  }

  public static getBlockers(req: Request, res: Response) {
    res.json({ blockers: FiscalProductionFinalGoLiveCommandCenterBlockerRegister.getBlockers() });
  }

  public static getRisks(req: Request, res: Response) {
    res.json({ risks: FiscalProductionFinalGoLiveCommandCenterRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const errors = FiscalProductionFinalGoLiveCommandCenterValidator.validate(input);
    res.json({ valid: errors.length === 0, errors });
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const warnings = FiscalProductionFinalGoLiveCommandCenterEvaluationService.evaluate(input);
    res.json({ evaluated: true, warnings });
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionFinalGoLiveCommandCenterDecisionService.simulateDecision(input);
    res.json(result);
  }

  public static getReport(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionFinalGoLiveCommandCenterDecisionService.simulateDecision(input);
    res.json(FiscalProductionFinalGoLiveCommandCenterReportService.generateReport(result));
  }

  public static getAudit(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionFinalGoLiveCommandCenterDecisionService.simulateDecision(input);
    res.json(FiscalProductionFinalGoLiveCommandCenterAuditService.generateAuditRecord(result));
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'ok', module: 'Production Final Go-Live Command Center Governance Blueprint & Hard Activation Non-Authority Contract', readOnly: true });
  }
}
