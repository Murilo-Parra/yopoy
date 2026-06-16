import { Request, Response } from 'express';
import {
  FiscalProductionOperationsStakeholderSignaturePolicy,
  FiscalProductionOperationsStakeholderSignatureEvidenceCollection,
  FiscalProductionOperationsMockAttestationEnvelope,
  FiscalProductionOperationsSignerEligibilityReviewMatrix,
  FiscalProductionOperationsStakeholderQuorumSimulation,
  FiscalProductionOperationsStakeholderSoDReview,
  FiscalProductionOperationsAttestationEvidenceReview,
  FiscalProductionOperationsAttestationDivergenceMatrix,
  FiscalProductionOperationsNoRealStakeholderNotificationEvidence,
  FiscalProductionOperationsNoRealSignaturePersistenceEvidence,
  FiscalProductionOperationsStakeholderSignatureDependencyMatrix,
  FiscalProductionOperationsStakeholderSignatureBlockerRegister,
  FiscalProductionOperationsStakeholderSignatureRiskRegister,
  FiscalProductionOperationsStakeholderSignatureValidator,
  FiscalProductionOperationsStakeholderSignatureEvaluationService,
  FiscalProductionOperationsStakeholderSignatureDecisionService,
  FiscalProductionOperationsStakeholderSignatureReportService,
  FiscalProductionOperationsStakeholderSignatureAuditService,
  FiscalProductionOperationsStakeholderSignatureInput
} from '../dedicated-homologation/production-operations-signature-governance/stakeholder-signature-dry-run';

export class FiscalProductionOperationsStakeholderSignatureController {
  
  public getPolicy(req: Request, res: Response) {
    FiscalProductionOperationsStakeholderSignatureAuditService.logAdminRead({ action: 'getPolicy' });
    return res.json({ policy: FiscalProductionOperationsStakeholderSignaturePolicy.getPolicyMessage() });
  }

  public getSignatureEvidenceCollection(req: Request, res: Response) {
    FiscalProductionOperationsStakeholderSignatureAuditService.logAdminRead({ action: 'getSignatureEvidenceCollection' });
    return res.json(FiscalProductionOperationsStakeholderSignatureEvidenceCollection.simulateCollection());
  }

  public getMockAttestationEnvelope(req: Request, res: Response) {
    FiscalProductionOperationsStakeholderSignatureAuditService.logAdminRead({ action: 'getMockAttestationEnvelope' });
    return res.json(FiscalProductionOperationsMockAttestationEnvelope.getEnvelope());
  }

  public getSignerEligibilityReviewMatrix(req: Request, res: Response) {
    FiscalProductionOperationsStakeholderSignatureAuditService.logAdminRead({ action: 'getSignerEligibilityReviewMatrix' });
    return res.json(FiscalProductionOperationsSignerEligibilityReviewMatrix.getMatrix());
  }

  public getStakeholderQuorumSimulation(req: Request, res: Response) {
    FiscalProductionOperationsStakeholderSignatureAuditService.logAdminRead({ action: 'getStakeholderQuorumSimulation' });
    return res.json(FiscalProductionOperationsStakeholderQuorumSimulation.simulate());
  }

  public getStakeholderSoDReview(req: Request, res: Response) {
    FiscalProductionOperationsStakeholderSignatureAuditService.logAdminRead({ action: 'getStakeholderSoDReview' });
    return res.json(FiscalProductionOperationsStakeholderSoDReview.getReview());
  }

  public getAttestationEvidenceReview(req: Request, res: Response) {
    FiscalProductionOperationsStakeholderSignatureAuditService.logAdminRead({ action: 'getAttestationEvidenceReview' });
    return res.json(FiscalProductionOperationsAttestationEvidenceReview.getReview());
  }

  public getAttestationDivergenceMatrix(req: Request, res: Response) {
    FiscalProductionOperationsStakeholderSignatureAuditService.logAdminRead({ action: 'getAttestationDivergenceMatrix' });
    return res.json(FiscalProductionOperationsAttestationDivergenceMatrix.getMatrix());
  }

  public getNoRealStakeholderNotificationEvidence(req: Request, res: Response) {
    FiscalProductionOperationsStakeholderSignatureAuditService.logAdminRead({ action: 'getNoRealStakeholderNotificationEvidence' });
    return res.json(FiscalProductionOperationsNoRealStakeholderNotificationEvidence.getEvidence());
  }

  public getNoRealSignaturePersistenceEvidence(req: Request, res: Response) {
    FiscalProductionOperationsStakeholderSignatureAuditService.logAdminRead({ action: 'getNoRealSignaturePersistenceEvidence' });
    return res.json(FiscalProductionOperationsNoRealSignaturePersistenceEvidence.getEvidence());
  }

  public getDependencyMatrix(req: Request, res: Response) {
    FiscalProductionOperationsStakeholderSignatureAuditService.logAdminRead({ action: 'getDependencyMatrix' });
    return res.json(FiscalProductionOperationsStakeholderSignatureDependencyMatrix.getMatrix());
  }

  public getBlockers(req: Request, res: Response) {
    FiscalProductionOperationsStakeholderSignatureAuditService.logAdminRead({ action: 'getBlockers' });
    return res.json({ blockers: FiscalProductionOperationsStakeholderSignatureBlockerRegister.getBlockers() });
  }

  public getRisks(req: Request, res: Response) {
    FiscalProductionOperationsStakeholderSignatureAuditService.logAdminRead({ action: 'getRisks' });
    return res.json({ risks: FiscalProductionOperationsStakeholderSignatureRiskRegister.getRisks() });
  }

  public validate(req: Request, res: Response) {
    const input: FiscalProductionOperationsStakeholderSignatureInput = req.body;
    try {
      FiscalProductionOperationsStakeholderSignatureValidator.validate(input);
      FiscalProductionOperationsStakeholderSignatureAuditService.logAdminRead({ action: 'validate', success: true });
      return res.json({ success: true, message: 'Validação concluída.' });
    } catch (e: any) {
      FiscalProductionOperationsStakeholderSignatureAuditService.logAdminRead({ action: 'validate', success: false });
      return res.status(400).json({ success: false, error: e.message });
    }
  }

  public evaluate(req: Request, res: Response) {
    const input: FiscalProductionOperationsStakeholderSignatureInput = req.body;
    try {
      const evaluation = FiscalProductionOperationsStakeholderSignatureEvaluationService.evaluate(input);
      FiscalProductionOperationsStakeholderSignatureAuditService.logAdminRead({ action: 'evaluate', success: true });
      return res.json({ success: true, evaluation });
    } catch (e: any) {
      FiscalProductionOperationsStakeholderSignatureAuditService.logAdminRead({ action: 'evaluate', success: false });
      return res.status(400).json({ success: false, error: e.message });
    }
  }

  public simulateDecision(req: Request, res: Response) {
    FiscalProductionOperationsStakeholderSignatureAuditService.logAdminRead({ action: 'simulateDecision' });
    return res.json(FiscalProductionOperationsStakeholderSignatureDecisionService.simulateDecision());
  }

  public getReport(req: Request, res: Response) {
    FiscalProductionOperationsStakeholderSignatureAuditService.logAdminRead({ action: 'getReport' });
    return res.json({ report: FiscalProductionOperationsStakeholderSignatureReportService.getReportMessage() });
  }

  public getAudit(req: Request, res: Response) {
    return res.json({ audit: FiscalProductionOperationsStakeholderSignatureAuditService.getEvents() });
  }

  public getHealth(req: Request, res: Response) {
    return res.json({ status: 'ok', component: 'FiscalProductionOperationsStakeholderSignature' });
  }
}
