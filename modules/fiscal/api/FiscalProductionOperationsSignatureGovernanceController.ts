import { Request, Response } from 'express';
import {
  FiscalProductionOperationsSignatureGovernancePolicy,
  FiscalProductionOperationsSignatureGovernanceBlueprint,
  FiscalProductionOperationsNonExecutableActivationConsentContract,
  FiscalProductionOperationsAuthorizedSignerMatrix,
  FiscalProductionOperationsTwoPersonSignatureSimulation,
  FiscalProductionOperationsSignatureSoDMatrix,
  FiscalProductionOperationsNonCryptographicSignatureEnvelope,
  FiscalProductionOperationsSignatureEvidenceNoPersistencePlan,
  FiscalProductionOperationsNoRealSignatureEvidence,
  FiscalProductionOperationsNoGateUnlockEvidence,
  FiscalProductionOperationsSignatureDependencyMatrix,
  FiscalProductionOperationsSignatureGovernanceBlockerRegister,
  FiscalProductionOperationsSignatureGovernanceRiskRegister,
  FiscalProductionOperationsSignatureGovernanceValidator,
  FiscalProductionOperationsSignatureGovernanceEvaluationService,
  FiscalProductionOperationsSignatureGovernanceDecisionService,
  FiscalProductionOperationsSignatureGovernanceReportService,
  FiscalProductionOperationsSignatureGovernanceAuditService,
  FiscalProductionOperationsSignatureGovernanceInput
} from '../dedicated-homologation/production-operations-signature-governance';

export class FiscalProductionOperationsSignatureGovernanceController {
  
  public getPolicy(req: Request, res: Response) {
    FiscalProductionOperationsSignatureGovernanceAuditService.logAdminRead({ action: 'getPolicy' });
    return res.json({ policy: FiscalProductionOperationsSignatureGovernancePolicy.getPolicyMessage() });
  }

  public getSignatureGovernanceBlueprint(req: Request, res: Response) {
    FiscalProductionOperationsSignatureGovernanceAuditService.logAdminRead({ action: 'getSignatureGovernanceBlueprint' });
    return res.json(FiscalProductionOperationsSignatureGovernanceBlueprint.getBlueprint());
  }

  public getNonExecutableActivationConsentContract(req: Request, res: Response) {
    FiscalProductionOperationsSignatureGovernanceAuditService.logAdminRead({ action: 'getNonExecutableActivationConsentContract' });
    return res.json(FiscalProductionOperationsNonExecutableActivationConsentContract.getContract());
  }

  public getAuthorizedSignerMatrix(req: Request, res: Response) {
    FiscalProductionOperationsSignatureGovernanceAuditService.logAdminRead({ action: 'getAuthorizedSignerMatrix' });
    return res.json(FiscalProductionOperationsAuthorizedSignerMatrix.getMatrix());
  }

  public getTwoPersonSignatureSimulation(req: Request, res: Response) {
    FiscalProductionOperationsSignatureGovernanceAuditService.logAdminRead({ action: 'getTwoPersonSignatureSimulation' });
    return res.json(FiscalProductionOperationsTwoPersonSignatureSimulation.simulate());
  }

  public getSignatureSoDMatrix(req: Request, res: Response) {
    FiscalProductionOperationsSignatureGovernanceAuditService.logAdminRead({ action: 'getSignatureSoDMatrix' });
    return res.json(FiscalProductionOperationsSignatureSoDMatrix.getMatrix());
  }

  public getNonCryptographicSignatureEnvelope(req: Request, res: Response) {
    FiscalProductionOperationsSignatureGovernanceAuditService.logAdminRead({ action: 'getNonCryptographicSignatureEnvelope' });
    return res.json(FiscalProductionOperationsNonCryptographicSignatureEnvelope.getEnvelope());
  }

  public getSignatureEvidenceNoPersistencePlan(req: Request, res: Response) {
    FiscalProductionOperationsSignatureGovernanceAuditService.logAdminRead({ action: 'getSignatureEvidenceNoPersistencePlan' });
    return res.json(FiscalProductionOperationsSignatureEvidenceNoPersistencePlan.getPlan());
  }

  public getNoRealSignatureEvidence(req: Request, res: Response) {
    FiscalProductionOperationsSignatureGovernanceAuditService.logAdminRead({ action: 'getNoRealSignatureEvidence' });
    return res.json(FiscalProductionOperationsNoRealSignatureEvidence.getEvidence());
  }

  public getNoGateUnlockEvidence(req: Request, res: Response) {
    FiscalProductionOperationsSignatureGovernanceAuditService.logAdminRead({ action: 'getNoGateUnlockEvidence' });
    return res.json(FiscalProductionOperationsNoGateUnlockEvidence.getEvidence());
  }

  public getDependencyMatrix(req: Request, res: Response) {
    FiscalProductionOperationsSignatureGovernanceAuditService.logAdminRead({ action: 'getDependencyMatrix' });
    return res.json(FiscalProductionOperationsSignatureDependencyMatrix.getMatrix());
  }

  public getBlockers(req: Request, res: Response) {
    FiscalProductionOperationsSignatureGovernanceAuditService.logAdminRead({ action: 'getBlockers' });
    return res.json({ blockers: FiscalProductionOperationsSignatureGovernanceBlockerRegister.getBlockers() });
  }

  public getRisks(req: Request, res: Response) {
    FiscalProductionOperationsSignatureGovernanceAuditService.logAdminRead({ action: 'getRisks' });
    return res.json({ risks: FiscalProductionOperationsSignatureGovernanceRiskRegister.getRisks() });
  }

  public validate(req: Request, res: Response) {
    const input: FiscalProductionOperationsSignatureGovernanceInput = req.body;
    try {
      FiscalProductionOperationsSignatureGovernanceValidator.validate(input);
      FiscalProductionOperationsSignatureGovernanceAuditService.logAdminRead({ action: 'validate', success: true });
      return res.json({ success: true, message: 'Validação concluída.' });
    } catch (e: any) {
      FiscalProductionOperationsSignatureGovernanceAuditService.logAdminRead({ action: 'validate', success: false });
      return res.status(400).json({ success: false, error: e.message });
    }
  }

  public evaluate(req: Request, res: Response) {
    const input: FiscalProductionOperationsSignatureGovernanceInput = req.body;
    try {
      const evaluation = FiscalProductionOperationsSignatureGovernanceEvaluationService.evaluate(input);
      FiscalProductionOperationsSignatureGovernanceAuditService.logAdminRead({ action: 'evaluate', success: true });
      return res.json({ success: true, evaluation });
    } catch (e: any) {
      FiscalProductionOperationsSignatureGovernanceAuditService.logAdminRead({ action: 'evaluate', success: false });
      return res.status(400).json({ success: false, error: e.message });
    }
  }

  public simulateDecision(req: Request, res: Response) {
    FiscalProductionOperationsSignatureGovernanceAuditService.logAdminRead({ action: 'simulateDecision' });
    return res.json(FiscalProductionOperationsSignatureGovernanceDecisionService.simulateDecision());
  }

  public getReport(req: Request, res: Response) {
    FiscalProductionOperationsSignatureGovernanceAuditService.logAdminRead({ action: 'getReport' });
    return res.json({ report: FiscalProductionOperationsSignatureGovernanceReportService.getReportMessage() });
  }

  public getAudit(req: Request, res: Response) {
    return res.json({ audit: FiscalProductionOperationsSignatureGovernanceAuditService.getEvents() });
  }

  public getHealth(req: Request, res: Response) {
    return res.json({ status: 'ok', component: 'FiscalProductionOperationsSignatureGovernance' });
  }
}
