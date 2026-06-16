import { Request, Response } from 'express';
import { 
  FiscalProductionEvidenceVaultGovernancePolicy,
  FiscalProductionEvidenceVaultBlueprint,
  FiscalProductionNoPersistenceAuditBoundaryContract,
  FiscalProductionEvidenceClassificationMatrix,
  FiscalProductionEvidenceRetentionNoOpPlan,
  FiscalProductionEvidenceHashingNoCryptoPlan,
  FiscalProductionEvidenceAccessNoReadMatrix,
  FiscalProductionEvidenceExportNoOpPlan,
  FiscalProductionAuditTrailInMemoryOnlyPlan,
  FiscalProductionEvidenceVaultDependencyMatrix,
  FiscalProductionEvidenceVaultGovernanceBlockerRegister,
  FiscalProductionEvidenceVaultGovernanceRiskRegister,
  FiscalProductionEvidenceVaultGovernanceValidator,
  FiscalProductionEvidenceVaultGovernanceEvaluationService,
  FiscalProductionEvidenceVaultGovernanceDecisionService,
  FiscalProductionEvidenceVaultGovernanceReportService,
  FiscalProductionEvidenceVaultGovernanceAuditService
} from '../dedicated-homologation/production-evidence-vault-governance';

export class FiscalProductionEvidenceVaultGovernanceController {
  public static getPolicy(req: Request, res: Response) {
    FiscalProductionEvidenceVaultGovernanceAuditService.audit('getPolicy');
    res.status(200).json({ policy: FiscalProductionEvidenceVaultGovernancePolicy.getPolicyMessage() });
  }

  public static getVaultBlueprint(req: Request, res: Response) {
    FiscalProductionEvidenceVaultGovernanceAuditService.audit('getVaultBlueprint');
    res.status(200).json({ blueprint: FiscalProductionEvidenceVaultBlueprint.getBlueprint() });
  }

  public static getNoPersistenceAuditBoundaryContract(req: Request, res: Response) {
    FiscalProductionEvidenceVaultGovernanceAuditService.audit('getNoPersistenceAuditBoundaryContract');
    res.status(200).json({ contract: FiscalProductionNoPersistenceAuditBoundaryContract.getContract() });
  }

  public static getEvidenceClassificationMatrix(req: Request, res: Response) {
    FiscalProductionEvidenceVaultGovernanceAuditService.audit('getEvidenceClassificationMatrix');
    res.status(200).json({ matrix: FiscalProductionEvidenceClassificationMatrix.getMatrix() });
  }

  public static getEvidenceRetentionNoOpPlan(req: Request, res: Response) {
    FiscalProductionEvidenceVaultGovernanceAuditService.audit('getEvidenceRetentionNoOpPlan');
    res.status(200).json({ plan: FiscalProductionEvidenceRetentionNoOpPlan.getPlan() });
  }

  public static getEvidenceHashingNoCryptoPlan(req: Request, res: Response) {
    FiscalProductionEvidenceVaultGovernanceAuditService.audit('getEvidenceHashingNoCryptoPlan');
    res.status(200).json({ plan: FiscalProductionEvidenceHashingNoCryptoPlan.getPlan() });
  }

  public static getEvidenceAccessNoReadMatrix(req: Request, res: Response) {
    FiscalProductionEvidenceVaultGovernanceAuditService.audit('getEvidenceAccessNoReadMatrix');
    res.status(200).json({ matrix: FiscalProductionEvidenceAccessNoReadMatrix.getMatrix() });
  }

  public static getEvidenceExportNoOpPlan(req: Request, res: Response) {
    FiscalProductionEvidenceVaultGovernanceAuditService.audit('getEvidenceExportNoOpPlan');
    res.status(200).json({ plan: FiscalProductionEvidenceExportNoOpPlan.getPlan() });
  }

  public static getAuditTrailInMemoryOnlyPlan(req: Request, res: Response) {
    FiscalProductionEvidenceVaultGovernanceAuditService.audit('getAuditTrailInMemoryOnlyPlan');
    res.status(200).json({ plan: FiscalProductionAuditTrailInMemoryOnlyPlan.getPlan() });
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    FiscalProductionEvidenceVaultGovernanceAuditService.audit('getDependencyMatrix');
    res.status(200).json({ matrix: FiscalProductionEvidenceVaultDependencyMatrix.getMatrix() });
  }

  public static getBlockers(req: Request, res: Response) {
    FiscalProductionEvidenceVaultGovernanceAuditService.audit('getBlockers');
    res.status(200).json({ blockers: FiscalProductionEvidenceVaultGovernanceBlockerRegister.getBlockers() });
  }

  public static getRisks(req: Request, res: Response) {
    FiscalProductionEvidenceVaultGovernanceAuditService.audit('getRisks');
    res.status(200).json({ risks: FiscalProductionEvidenceVaultGovernanceRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
    try {
      FiscalProductionEvidenceVaultGovernanceValidator.validate(req.body);
      FiscalProductionEvidenceVaultGovernanceAuditService.audit('validate', { success: true });
      res.status(200).json({ valid: true });
    } catch (error: any) {
      FiscalProductionEvidenceVaultGovernanceAuditService.audit('validate', { error: error.message });
      res.status(400).json({ error: error.message });
    }
  }

  public static evaluate(req: Request, res: Response) {
    try {
      const evaluation = FiscalProductionEvidenceVaultGovernanceEvaluationService.evaluate(req.body);
      FiscalProductionEvidenceVaultGovernanceAuditService.audit('evaluate', { success: true });
      res.status(200).json({ evaluation });
    } catch (error: any) {
      FiscalProductionEvidenceVaultGovernanceAuditService.audit('evaluate', { error: error.message });
      res.status(400).json({ error: error.message });
    }
  }

  public static simulateDecision(req: Request, res: Response) {
    try {
      FiscalProductionEvidenceVaultGovernanceValidator.validate(req.body);
      const decision = FiscalProductionEvidenceVaultGovernanceDecisionService.simulateDecision(req.body);
      FiscalProductionEvidenceVaultGovernanceAuditService.audit('simulateDecision', { success: true });
      res.status(200).json({ decision });
    } catch (error: any) {
      FiscalProductionEvidenceVaultGovernanceAuditService.audit('simulateDecision', { error: error.message });
      res.status(400).json({ error: error.message });
    }
  }

  public static getReport(req: Request, res: Response) {
    FiscalProductionEvidenceVaultGovernanceAuditService.audit('getReport');
    res.status(200).json({ report: FiscalProductionEvidenceVaultGovernanceReportService.getReport() });
  }

  public static getAudit(req: Request, res: Response) {
    res.status(200).json({ logs: FiscalProductionEvidenceVaultGovernanceAuditService.getLogs() });
  }

  public static getHealth(req: Request, res: Response) {
    res.status(200).json({
      status: 'ok',
      module: '35.1',
      realEvidenceVaultCreated: false,
      fileSystemWritten: false
    });
  }
}
