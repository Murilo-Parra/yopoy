import { Request, Response } from 'express';
import {
  FiscalProductionSystemWideNonOperationalSealPolicy,
  FiscalProductionSystemWideNonOperationalSealBlueprint,
  FiscalProductionFinalActivationImpossibilityContract,
  FiscalProductionGlobalNoAuthorityScopeInventory,
  FiscalProductionDomainClosureReadOnlyAggregationMatrix,
  FiscalProductionNoRealSystemSealEvidence,
  FiscalProductionNoRealActivationAuthorityEvidence,
  FiscalProductionNoRealGoLiveOrCutoverEvidence,
  FiscalProductionNoRealProductionV2Evidence,
  FiscalProductionNoRealRoutingRuntimeDatabaseEvidence,
  FiscalProductionNoRealExternalIntegrationEvidence,
  FiscalProductionNoRealSensitiveDataAccessEvidence,
  FiscalProductionSystemWideNonOperationalSealDependencyMatrix,
  FiscalProductionSystemWideNonOperationalSealBlockerRegister,
  FiscalProductionSystemWideNonOperationalSealRiskRegister,
  FiscalProductionSystemWideNonOperationalSealValidator,
  FiscalProductionSystemWideNonOperationalSealEvaluationService,
  FiscalProductionSystemWideNonOperationalSealDecisionService,
  FiscalProductionSystemWideNonOperationalSealReportService,
  FiscalProductionSystemWideNonOperationalSealAuditService
} from '../dedicated-homologation/production-system-wide-non-operational-seal';

export class FiscalProductionSystemWideNonOperationalSealController {
  public static getPolicy(req: Request, res: Response) {
    res.json(FiscalProductionSystemWideNonOperationalSealPolicy.getPolicy());
  }

  public static getSealBlueprint(req: Request, res: Response) {
    res.json(FiscalProductionSystemWideNonOperationalSealBlueprint.getBlueprint());
  }

  public static getActivationImpossibilityContract(req: Request, res: Response) {
    res.json(FiscalProductionFinalActivationImpossibilityContract.getContract());
  }

  public static getGlobalNoAuthorityScopeInventory(req: Request, res: Response) {
    res.json(FiscalProductionGlobalNoAuthorityScopeInventory.getInventory());
  }

  public static getDomainClosureReadOnlyAggregationMatrix(req: Request, res: Response) {
    res.json(FiscalProductionDomainClosureReadOnlyAggregationMatrix.getMatrix());
  }

  public static getNoRealSystemSealEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealSystemSealEvidence.getEvidence());
  }

  public static getNoRealActivationAuthorityEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealActivationAuthorityEvidence.getEvidence());
  }

  public static getNoRealGoLiveOrCutoverEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealGoLiveOrCutoverEvidence.getEvidence());
  }

  public static getNoRealProductionV2Evidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealProductionV2Evidence.getEvidence());
  }

  public static getNoRealRoutingRuntimeDatabaseEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealRoutingRuntimeDatabaseEvidence.getEvidence());
  }

  public static getNoRealExternalIntegrationEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealExternalIntegrationEvidence.getEvidence());
  }

  public static getNoRealSensitiveDataAccessEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealSensitiveDataAccessEvidence.getEvidence());
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    res.json(FiscalProductionSystemWideNonOperationalSealDependencyMatrix.getMatrix());
  }

  public static getBlockers(req: Request, res: Response) {
    res.json({ blockers: FiscalProductionSystemWideNonOperationalSealBlockerRegister.getBlockers() });
  }

  public static getRisks(req: Request, res: Response) {
    res.json({ risks: FiscalProductionSystemWideNonOperationalSealRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const errors = FiscalProductionSystemWideNonOperationalSealValidator.validate(input);
    res.json({ valid: errors.length === 0, errors });
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const warnings = FiscalProductionSystemWideNonOperationalSealEvaluationService.evaluate(input);
    res.json({ evaluated: true, warnings });
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionSystemWideNonOperationalSealDecisionService.simulateDecision(input);
    res.json(result);
  }

  public static getReport(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionSystemWideNonOperationalSealDecisionService.simulateDecision(input);
    res.json(FiscalProductionSystemWideNonOperationalSealReportService.generateReport(result as any));
  }

  public static getAudit(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionSystemWideNonOperationalSealDecisionService.simulateDecision(input);
    res.json(FiscalProductionSystemWideNonOperationalSealAuditService.generateAuditRecord(result));
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'ok', module: 'Production System-Wide Non-Operational Seal', readOnly: true });
  }
}
