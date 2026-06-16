import { Request, Response } from 'express';
import {
  FiscalProductionComplianceRollbackNoOpBlueprint,
  FiscalProductionV2ShutdownNoOpContract,
  FiscalProductionComplianceRollbackEligibilitySimulationMatrix,
  FiscalProductionV2ShutdownTriggerNoExecuteMatrix,
  FiscalProductionLegacyContinuityDuringRollbackPlan,
  FiscalProductionTrafficReversionNoOpPlan,
  FiscalProductionRegulatoryRollbackEvidenceSimulationMatrix,
  FiscalProductionPostRollbackComplianceReviewNoPersistencePlan,
  FiscalProductionComplianceNoRealRollbackEvidence,
  FiscalProductionNoRealV2ShutdownEvidence,
  FiscalProductionComplianceRollbackShutdownDependencyMatrix,
  FiscalProductionComplianceRollbackShutdownPolicy,
  FiscalProductionComplianceRollbackShutdownValidator,
  FiscalProductionComplianceRollbackShutdownBlockerRegister,
  FiscalProductionComplianceRollbackShutdownRiskRegister,
  FiscalProductionComplianceRollbackShutdownEvaluationService,
  FiscalProductionComplianceRollbackShutdownDecisionService,
  FiscalProductionComplianceRollbackShutdownReportService,
  FiscalProductionComplianceRollbackShutdownAuditService
} from '../dedicated-homologation/production-compliance-audit-governance/rollback-shutdown-dry-run';

export class FiscalProductionComplianceRollbackShutdownController {
  public static getPolicy(req: Request, res: Response) {
    res.json(FiscalProductionComplianceRollbackShutdownPolicy.getPolicy());
  }

  public static getRollbackNoOpBlueprint(req: Request, res: Response) {
    res.json(FiscalProductionComplianceRollbackNoOpBlueprint.getBlueprint());
  }

  public static getV2ShutdownNoOpContract(req: Request, res: Response) {
    res.json(FiscalProductionV2ShutdownNoOpContract.getContract());
  }

  public static getRollbackEligibilitySimulationMatrix(req: Request, res: Response) {
    res.json(FiscalProductionComplianceRollbackEligibilitySimulationMatrix.getMatrix());
  }

  public static getV2ShutdownTriggerNoExecuteMatrix(req: Request, res: Response) {
    res.json(FiscalProductionV2ShutdownTriggerNoExecuteMatrix.getMatrix());
  }

  public static getLegacyContinuityDuringRollbackPlan(req: Request, res: Response) {
    res.json(FiscalProductionLegacyContinuityDuringRollbackPlan.getPlan());
  }

  public static getTrafficReversionNoOpPlan(req: Request, res: Response) {
    res.json(FiscalProductionTrafficReversionNoOpPlan.getPlan());
  }

  public static getRegulatoryRollbackEvidenceSimulationMatrix(req: Request, res: Response) {
    res.json(FiscalProductionRegulatoryRollbackEvidenceSimulationMatrix.getMatrix());
  }

  public static getPostRollbackComplianceReviewNoPersistencePlan(req: Request, res: Response) {
    res.json(FiscalProductionPostRollbackComplianceReviewNoPersistencePlan.getPlan());
  }

  public static getNoRealRollbackEvidence(req: Request, res: Response) {
    res.json(FiscalProductionComplianceNoRealRollbackEvidence.getEvidence());
  }

  public static getNoRealV2ShutdownEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealV2ShutdownEvidence.getEvidence());
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    res.json(FiscalProductionComplianceRollbackShutdownDependencyMatrix.getMatrix());
  }

  public static getBlockers(req: Request, res: Response) {
    res.json({ blockers: FiscalProductionComplianceRollbackShutdownBlockerRegister.getBlockers() });
  }

  public static getRisks(req: Request, res: Response) {
    res.json({ risks: FiscalProductionComplianceRollbackShutdownRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const errors = FiscalProductionComplianceRollbackShutdownValidator.validate(input);
    res.json({ valid: errors.length === 0, errors });
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const warnings = FiscalProductionComplianceRollbackShutdownEvaluationService.evaluate(input);
    res.json({ evaluated: true, warnings });
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionComplianceRollbackShutdownDecisionService.simulateDecision(input);
    res.json(result);
  }

  public static getReport(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionComplianceRollbackShutdownDecisionService.simulateDecision(input);
    const report = FiscalProductionComplianceRollbackShutdownReportService.generateReport(result);
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionComplianceRollbackShutdownDecisionService.simulateDecision(input);
    const audit = FiscalProductionComplianceRollbackShutdownAuditService.generateAuditRecord(result);
    res.json(audit);
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'ok', module: 'Production Compliance Rollback & V2 Shutdown Mechanism No-Op Dry-Run', readOnly: true });
  }
}
