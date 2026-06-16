import { Request, Response } from 'express';
import {
  FiscalProductionCrossDomainSealEvidencePolicy,
  FiscalProductionCrossDomainSealEvidenceAggregationBlueprint,
  FiscalProductionAuthorityAbsenceRevalidationMatrix,
  FiscalProductionDomainNoAuthorityContinuityMatrix,
  FiscalProductionDomainNoActivationContinuityMatrix,
  FiscalProductionDomainNoRoutingContinuityMatrix,
  FiscalProductionDomainNoRuntimeContinuityMatrix,
  FiscalProductionDomainNoDatabaseContinuityMatrix,
  FiscalProductionDomainNoExternalIntegrationContinuityMatrix,
  FiscalProductionDomainNoSensitiveDataContinuityMatrix,
  FiscalProductionCrossDomainNoRealSealEvidence,
  FiscalProductionCrossDomainNoRealAuthorityEvidence,
  FiscalProductionCrossDomainNoRealActivationEvidence,
  FiscalProductionCrossDomainNoRealExecutionEvidence,
  FiscalProductionCrossDomainSealEvidenceDependencyMatrix,
  FiscalProductionCrossDomainSealEvidenceBlockerRegister,
  FiscalProductionCrossDomainSealEvidenceRiskRegister,
  FiscalProductionCrossDomainSealEvidenceValidator,
  FiscalProductionCrossDomainSealEvidenceEvaluationService,
  FiscalProductionCrossDomainSealEvidenceDecisionService,
  FiscalProductionCrossDomainSealEvidenceReportService,
  FiscalProductionCrossDomainSealEvidenceAuditService
} from '../dedicated-homologation/production-system-wide-non-operational-seal/cross-domain-evidence-dry-run';

export class FiscalProductionCrossDomainSealEvidenceController {
  public static getPolicy(req: Request, res: Response) {
    res.json(FiscalProductionCrossDomainSealEvidencePolicy.getPolicy());
  }

  public static getCrossDomainSealEvidenceAggregationBlueprint(req: Request, res: Response) {
    res.json(FiscalProductionCrossDomainSealEvidenceAggregationBlueprint.getBlueprint());
  }

  public static getAuthorityAbsenceRevalidationMatrix(req: Request, res: Response) {
    res.json(FiscalProductionAuthorityAbsenceRevalidationMatrix.getMatrix());
  }

  public static getDomainNoAuthorityContinuityMatrix(req: Request, res: Response) {
    res.json(FiscalProductionDomainNoAuthorityContinuityMatrix.getMatrix());
  }

  public static getDomainNoActivationContinuityMatrix(req: Request, res: Response) {
    res.json(FiscalProductionDomainNoActivationContinuityMatrix.getMatrix());
  }

  public static getDomainNoRoutingContinuityMatrix(req: Request, res: Response) {
    res.json(FiscalProductionDomainNoRoutingContinuityMatrix.getMatrix());
  }

  public static getDomainNoRuntimeContinuityMatrix(req: Request, res: Response) {
    res.json(FiscalProductionDomainNoRuntimeContinuityMatrix.getMatrix());
  }

  public static getDomainNoDatabaseContinuityMatrix(req: Request, res: Response) {
    res.json(FiscalProductionDomainNoDatabaseContinuityMatrix.getMatrix());
  }

  public static getDomainNoExternalIntegrationContinuityMatrix(req: Request, res: Response) {
    res.json(FiscalProductionDomainNoExternalIntegrationContinuityMatrix.getMatrix());
  }

  public static getDomainNoSensitiveDataContinuityMatrix(req: Request, res: Response) {
    res.json(FiscalProductionDomainNoSensitiveDataContinuityMatrix.getMatrix());
  }

  public static getCrossDomainNoRealSealEvidence(req: Request, res: Response) {
    res.json(FiscalProductionCrossDomainNoRealSealEvidence.getEvidence());
  }

  public static getCrossDomainNoRealAuthorityEvidence(req: Request, res: Response) {
    res.json(FiscalProductionCrossDomainNoRealAuthorityEvidence.getEvidence());
  }

  public static getCrossDomainNoRealActivationEvidence(req: Request, res: Response) {
    res.json(FiscalProductionCrossDomainNoRealActivationEvidence.getEvidence());
  }

  public static getCrossDomainNoRealExecutionEvidence(req: Request, res: Response) {
    res.json(FiscalProductionCrossDomainNoRealExecutionEvidence.getEvidence());
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    res.json(FiscalProductionCrossDomainSealEvidenceDependencyMatrix.getMatrix());
  }

  public static getBlockers(req: Request, res: Response) {
    res.json({ blockers: FiscalProductionCrossDomainSealEvidenceBlockerRegister.getBlockers() });
  }

  public static getRisks(req: Request, res: Response) {
    res.json({ risks: FiscalProductionCrossDomainSealEvidenceRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const errors = FiscalProductionCrossDomainSealEvidenceValidator.validate(input);
    res.json({ valid: errors.length === 0, errors });
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const warnings = FiscalProductionCrossDomainSealEvidenceEvaluationService.evaluate(input);
    res.json({ evaluated: true, warnings });
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionCrossDomainSealEvidenceDecisionService.simulateDecision(input);
    res.json(result);
  }

  public static getReport(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionCrossDomainSealEvidenceDecisionService.simulateDecision(input);
    res.json(FiscalProductionCrossDomainSealEvidenceReportService.generateReport(result as any));
  }

  public static getAudit(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionCrossDomainSealEvidenceDecisionService.simulateDecision(input);
    res.json(FiscalProductionCrossDomainSealEvidenceAuditService.generateAuditRecord(result));
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'ok', module: 'Production Cross-Domain Seal Evidence', readOnly: true });
  }
}
