import { Request, Response } from 'express';
import { 
  FiscalProductionExecutionCutoverDenialPolicy,
  FiscalProductionPhysicalCutoverAttemptDenialMatrix,
  FiscalProductionEmergencyRuntimeContainmentNoOpPlan,
  FiscalProductionPhysicalExecutionAttemptBlockMatrix,
  FiscalProductionTrafficPromotionDenialMatrix,
  FiscalProductionLegacyMandatoryContinuityMatrix,
  FiscalProductionCutoverAbortNoOpMatrix,
  FiscalProductionRollbackNoOpMatrix,
  FiscalProductionNoPhysicalCutoverEvidence,
  FiscalProductionNoRealKillSwitchEvidence,
  FiscalProductionCutoverDenialNoTrafficMutationEvidence,
  FiscalProductionExecutionCutoverDenialDependencyMatrix,
  FiscalProductionExecutionCutoverDenialBlockerRegister,
  FiscalProductionExecutionCutoverDenialRiskRegister,
  FiscalProductionExecutionCutoverDenialValidator,
  FiscalProductionExecutionCutoverDenialEvaluationService,
  FiscalProductionExecutionCutoverDenialDecisionService,
  FiscalProductionExecutionCutoverDenialReportService,
  FiscalProductionExecutionCutoverDenialAuditService
} from '../dedicated-homologation/production-physical-execution-firewall/cutover-denial-dry-run';

export class FiscalProductionExecutionCutoverDenialController {
  public static getPolicy(req: Request, res: Response) {
    FiscalProductionExecutionCutoverDenialAuditService.audit('getPolicy');
    res.status(200).json({ policy: FiscalProductionExecutionCutoverDenialPolicy.getPolicyMessage() });
  }

  public static getPhysicalCutoverAttemptDenialMatrix(req: Request, res: Response) {
    FiscalProductionExecutionCutoverDenialAuditService.audit('getPhysicalCutoverAttemptDenialMatrix');
    res.status(200).json({ matrix: FiscalProductionPhysicalCutoverAttemptDenialMatrix.getMatrix() });
  }

  public static getEmergencyRuntimeContainmentNoOpPlan(req: Request, res: Response) {
    FiscalProductionExecutionCutoverDenialAuditService.audit('getEmergencyRuntimeContainmentNoOpPlan');
    res.status(200).json({ plan: FiscalProductionEmergencyRuntimeContainmentNoOpPlan.getPlan() });
  }

  public static getPhysicalExecutionAttemptBlockMatrix(req: Request, res: Response) {
    FiscalProductionExecutionCutoverDenialAuditService.audit('getPhysicalExecutionAttemptBlockMatrix');
    res.status(200).json({ matrix: FiscalProductionPhysicalExecutionAttemptBlockMatrix.getMatrix() });
  }

  public static getTrafficPromotionDenialMatrix(req: Request, res: Response) {
    FiscalProductionExecutionCutoverDenialAuditService.audit('getTrafficPromotionDenialMatrix');
    res.status(200).json({ matrix: FiscalProductionTrafficPromotionDenialMatrix.getMatrix() });
  }

  public static getLegacyMandatoryContinuityMatrix(req: Request, res: Response) {
    FiscalProductionExecutionCutoverDenialAuditService.audit('getLegacyMandatoryContinuityMatrix');
    res.status(200).json({ matrix: FiscalProductionLegacyMandatoryContinuityMatrix.getMatrix() });
  }

  public static getCutoverAbortNoOpMatrix(req: Request, res: Response) {
    FiscalProductionExecutionCutoverDenialAuditService.audit('getCutoverAbortNoOpMatrix');
    res.status(200).json({ matrix: FiscalProductionCutoverAbortNoOpMatrix.getMatrix() });
  }

  public static getRollbackNoOpMatrix(req: Request, res: Response) {
    FiscalProductionExecutionCutoverDenialAuditService.audit('getRollbackNoOpMatrix');
    res.status(200).json({ matrix: FiscalProductionRollbackNoOpMatrix.getMatrix() });
  }

  public static getNoPhysicalCutoverEvidence(req: Request, res: Response) {
    FiscalProductionExecutionCutoverDenialAuditService.audit('getNoPhysicalCutoverEvidence');
    res.status(200).json({ evidence: FiscalProductionNoPhysicalCutoverEvidence.getEvidence() });
  }

  public static getNoRealKillSwitchEvidence(req: Request, res: Response) {
    FiscalProductionExecutionCutoverDenialAuditService.audit('getNoRealKillSwitchEvidence');
    res.status(200).json({ evidence: FiscalProductionNoRealKillSwitchEvidence.getEvidence() });
  }

  public static getNoTrafficMutationEvidence(req: Request, res: Response) {
    FiscalProductionExecutionCutoverDenialAuditService.audit('getNoTrafficMutationEvidence');
    res.status(200).json({ evidence: FiscalProductionCutoverDenialNoTrafficMutationEvidence.getEvidence() });
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    FiscalProductionExecutionCutoverDenialAuditService.audit('getDependencyMatrix');
    res.status(200).json({ matrix: FiscalProductionExecutionCutoverDenialDependencyMatrix.getMatrix() });
  }

  public static getBlockers(req: Request, res: Response) {
    FiscalProductionExecutionCutoverDenialAuditService.audit('getBlockers');
    res.status(200).json({ blockers: FiscalProductionExecutionCutoverDenialBlockerRegister.getBlockers() });
  }

  public static getRisks(req: Request, res: Response) {
    FiscalProductionExecutionCutoverDenialAuditService.audit('getRisks');
    res.status(200).json({ risks: FiscalProductionExecutionCutoverDenialRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
    try {
      FiscalProductionExecutionCutoverDenialValidator.validate(req.body);
      FiscalProductionExecutionCutoverDenialAuditService.audit('validate', { success: true });
      res.status(200).json({ valid: true });
    } catch (error: any) {
      FiscalProductionExecutionCutoverDenialAuditService.audit('validate', { error: error.message });
      res.status(400).json({ error: error.message });
    }
  }

  public static evaluate(req: Request, res: Response) {
    try {
      const evaluation = FiscalProductionExecutionCutoverDenialEvaluationService.evaluate(req.body);
      FiscalProductionExecutionCutoverDenialAuditService.audit('evaluate', { success: true });
      res.status(200).json({ evaluation });
    } catch (error: any) {
      FiscalProductionExecutionCutoverDenialAuditService.audit('evaluate', { error: error.message });
      res.status(400).json({ error: error.message });
    }
  }

  public static simulateDecision(req: Request, res: Response) {
    try {
      FiscalProductionExecutionCutoverDenialValidator.validate(req.body);
      const decision = FiscalProductionExecutionCutoverDenialDecisionService.simulateDecision(req.body);
      FiscalProductionExecutionCutoverDenialAuditService.audit('simulateDecision', { success: true });
      res.status(200).json({ decision });
    } catch (error: any) {
      FiscalProductionExecutionCutoverDenialAuditService.audit('simulateDecision', { error: error.message });
      res.status(400).json({ error: error.message });
    }
  }

  public static getReport(req: Request, res: Response) {
    FiscalProductionExecutionCutoverDenialAuditService.audit('getReport');
    res.status(200).json({ report: FiscalProductionExecutionCutoverDenialReportService.getReport() });
  }

  public static getAudit(req: Request, res: Response) {
    res.status(200).json({ logs: FiscalProductionExecutionCutoverDenialAuditService.getLogs() });
  }

  public static getHealth(req: Request, res: Response) {
    res.status(200).json({
      status: 'ok',
      module: '34.4',
      realCutoverExecuted: false,
      realKillSwitchActivated: false
    });
  }
}
