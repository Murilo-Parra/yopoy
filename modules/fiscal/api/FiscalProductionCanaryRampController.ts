import { Request, Response } from 'express';
import { FiscalProductionTrafficSliceSimulationMatrix } from '../dedicated-homologation/production-activation-control-plane/canary-ramp-dry-run/FiscalProductionTrafficSliceSimulationMatrix';
import { 
  FiscalProductionCanaryRampPolicy,
  FiscalProductionCanaryRampSimulation,
  FiscalProductionTrafficPromotionNoOpPlan,
  FiscalProductionCanaryPercentageNoOpMatrix,
  FiscalProductionReversibleTrafficPromotionPlan,
  FiscalProductionLegacyContinuityDuringCanaryPlan,
  FiscalProductionCanaryAbortReversionMatrix,
  FiscalProductionNoRealTrafficPromotionEvidence,
  FiscalProductionNoRealCanaryActivationEvidence,
  FiscalProductionCanaryRampDependencyMatrix,
  FiscalProductionCanaryRampBlockerRegister,
  FiscalProductionCanaryRampRiskRegister,
  FiscalProductionCanaryRampEvaluationService,
  FiscalProductionCanaryRampDecisionService,
  FiscalProductionCanaryRampReportService,
  FiscalProductionCanaryRampAuditService,
  FiscalProductionCanaryRampValidator,
  FiscalProductionActivationCanaryRampInput
} from '../dedicated-homologation/production-activation-control-plane/canary-ramp-dry-run';

export class FiscalProductionCanaryRampController {
  public static getPolicy(req: Request, res: Response) {
    FiscalProductionCanaryRampAuditService.logAdminRead('getPolicy');
    res.status(200).json({ policy: FiscalProductionCanaryRampPolicy.getPolicyMessage() });
  }

  public static getCanaryRampSimulation(req: Request, res: Response) {
    FiscalProductionCanaryRampAuditService.logAdminRead('getCanaryRampSimulation');
    res.status(200).json({ simulation: FiscalProductionCanaryRampSimulation.simulate() });
  }

  public static getTrafficPromotionNoOpPlan(req: Request, res: Response) {
    FiscalProductionCanaryRampAuditService.logAdminRead('getTrafficPromotionNoOpPlan');
    res.status(200).json({ plan: FiscalProductionTrafficPromotionNoOpPlan.getPlan() });
  }

  public static getTrafficSliceSimulationMatrix(req: Request, res: Response) {
    FiscalProductionCanaryRampAuditService.logAdminRead('getTrafficSliceSimulationMatrix');
    res.status(200).json({ matrix: FiscalProductionTrafficSliceSimulationMatrix.getMatrix() });
  }

  public static getCanaryPercentageNoOpMatrix(req: Request, res: Response) {
    FiscalProductionCanaryRampAuditService.logAdminRead('getCanaryPercentageNoOpMatrix');
    res.status(200).json({ matrix: FiscalProductionCanaryPercentageNoOpMatrix.getMatrix() });
  }

  public static getReversibleTrafficPromotionPlan(req: Request, res: Response) {
    FiscalProductionCanaryRampAuditService.logAdminRead('getReversibleTrafficPromotionPlan');
    res.status(200).json({ plan: FiscalProductionReversibleTrafficPromotionPlan.getPlan() });
  }

  public static getLegacyContinuityDuringCanaryPlan(req: Request, res: Response) {
    FiscalProductionCanaryRampAuditService.logAdminRead('getLegacyContinuityDuringCanaryPlan');
    res.status(200).json({ plan: FiscalProductionLegacyContinuityDuringCanaryPlan.getPlan() });
  }

  public static getCanaryAbortReversionMatrix(req: Request, res: Response) {
    FiscalProductionCanaryRampAuditService.logAdminRead('getCanaryAbortReversionMatrix');
    res.status(200).json({ matrix: FiscalProductionCanaryAbortReversionMatrix.getMatrix() });
  }

  public static getNoRealTrafficPromotionEvidence(req: Request, res: Response) {
    FiscalProductionCanaryRampAuditService.logAdminRead('getNoRealTrafficPromotionEvidence');
    res.status(200).json({ evidence: FiscalProductionNoRealTrafficPromotionEvidence.getEvidence() });
  }

  public static getNoRealCanaryActivationEvidence(req: Request, res: Response) {
    FiscalProductionCanaryRampAuditService.logAdminRead('getNoRealCanaryActivationEvidence');
    res.status(200).json({ evidence: FiscalProductionNoRealCanaryActivationEvidence.getEvidence() });
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    FiscalProductionCanaryRampAuditService.logAdminRead('getDependencyMatrix');
    res.status(200).json({ matrix: FiscalProductionCanaryRampDependencyMatrix.getMatrix() });
  }

  public static getBlockers(req: Request, res: Response) {
    FiscalProductionCanaryRampAuditService.logAdminRead('getBlockers');
    res.status(200).json({ blockers: FiscalProductionCanaryRampBlockerRegister.getBlockers() });
  }

  public static getRisks(req: Request, res: Response) {
    FiscalProductionCanaryRampAuditService.logAdminRead('getRisks');
    res.status(200).json({ risks: FiscalProductionCanaryRampRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
      try {
          const input: FiscalProductionActivationCanaryRampInput = req.body;
          FiscalProductionCanaryRampValidator.validate(input);
          FiscalProductionCanaryRampAuditService.logAdminRead('validate', { success: true });
          res.status(200).json({ valid: true });
      } catch (error: any) {
          FiscalProductionCanaryRampAuditService.logAdminRead('validate', { success: false, error: error.message });
          res.status(400).json({ valid: false, error: error.message });
      }
  }

  public static evaluate(req: Request, res: Response) {
      try {
        const input: FiscalProductionActivationCanaryRampInput = req.body;
        const evaluation = FiscalProductionCanaryRampEvaluationService.evaluate(input);
        FiscalProductionCanaryRampAuditService.logAdminRead('evaluate', { success: true });
        res.status(200).json({ evaluation });
      } catch (error: any) {
        FiscalProductionCanaryRampAuditService.logAdminRead('evaluate', { success: false, error: error.message });
        res.status(400).json({ valid: false, error: error.message });
      }
  }

  public static simulateDecision(req: Request, res: Response) {
      try {
        const input: FiscalProductionActivationCanaryRampInput = req.body;
        FiscalProductionCanaryRampValidator.validate(input);
        const decision = FiscalProductionCanaryRampDecisionService.simulateDecision(input);
        FiscalProductionCanaryRampAuditService.logAdminRead('simulateDecision', { success: true });
        res.status(200).json({ decision });
      } catch (error: any) {
        FiscalProductionCanaryRampAuditService.logAdminRead('simulateDecision', { success: false, error: error.message });
        res.status(400).json({ error: error.message });
      }
  }

  public static getReport(req: Request, res: Response) {
    FiscalProductionCanaryRampAuditService.logAdminRead('getReport');
    res.status(200).json({ report: FiscalProductionCanaryRampReportService.getReport() });
  }

  public static getAudit(req: Request, res: Response) {
    res.status(200).json({ logs: FiscalProductionCanaryRampAuditService.getLogs() });
  }

  public static getHealth(req: Request, res: Response) {
    res.status(200).json({
      status: 'ok',
      module: '33.4',
      description: 'Production Activation Canary Ramp',
      realCanaryActivated: false,
      realTrafficPromoted: false,
      realExecutionGateUnlocked: false,
      realAuthorizationGranted: false,
      realAuthorizationTokenIssued: false
    });
  }
}
