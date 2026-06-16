import { Request, Response } from 'express';
import {
  FiscalProductionFinalHandshakePolicy,
  FiscalProductionSystemWideFinalHandshakeBlueprint,
  FiscalProductionVirtualSignOffSimulationMatrix,
  FiscalProductionAuthorityNonConversionContract,
  FiscalProductionEvidenceToAuthorityDenialMatrix,
  FiscalProductionHandshakeNoOperationalHandoffPlan,
  FiscalProductionExecutiveAcknowledgementNoBindingMatrix,
  FiscalProductionFinalSealReviewNoCreatePlan,
  FiscalProductionFinalCommandNoExecuteMatrix,
  FiscalProductionNoRealHandshakeEvidence,
  FiscalProductionNoRealSignOffEvidence,
  FiscalProductionNoRealAuthorityConversionEvidence,
  FiscalProductionNoRealFinalCommandEvidence,
  FiscalProductionFinalHandshakeDependencyMatrix,
  FiscalProductionFinalHandshakeBlockerRegister,
  FiscalProductionFinalHandshakeRiskRegister,
  FiscalProductionFinalHandshakeValidator,
  FiscalProductionFinalHandshakeEvaluationService,
  FiscalProductionFinalHandshakeDecisionService,
  FiscalProductionFinalHandshakeReportService,
  FiscalProductionFinalHandshakeAuditService
} from '../dedicated-homologation/production-system-wide-non-operational-seal/final-handshake-dry-run';

export class FiscalProductionFinalHandshakeController {
  public static getPolicy(req: Request, res: Response) {
    res.json(FiscalProductionFinalHandshakePolicy.getPolicy());
  }

  public static getFinalHandshakeBlueprint(req: Request, res: Response) {
    res.json(FiscalProductionSystemWideFinalHandshakeBlueprint.getBlueprint());
  }

  public static getVirtualSignOffSimulationMatrix(req: Request, res: Response) {
    res.json(FiscalProductionVirtualSignOffSimulationMatrix.getMatrix());
  }

  public static getAuthorityNonConversionContract(req: Request, res: Response) {
    res.json(FiscalProductionAuthorityNonConversionContract.getContract());
  }

  public static getEvidenceToAuthorityDenialMatrix(req: Request, res: Response) {
    res.json(FiscalProductionEvidenceToAuthorityDenialMatrix.getMatrix());
  }

  public static getHandshakeNoOperationalHandoffPlan(req: Request, res: Response) {
    res.json(FiscalProductionHandshakeNoOperationalHandoffPlan.getPlan());
  }

  public static getExecutiveAcknowledgementNoBindingMatrix(req: Request, res: Response) {
    res.json(FiscalProductionExecutiveAcknowledgementNoBindingMatrix.getMatrix());
  }

  public static getFinalSealReviewNoCreatePlan(req: Request, res: Response) {
    res.json(FiscalProductionFinalSealReviewNoCreatePlan.getPlan());
  }

  public static getFinalCommandNoExecuteMatrix(req: Request, res: Response) {
    res.json(FiscalProductionFinalCommandNoExecuteMatrix.getMatrix());
  }

  public static getNoRealHandshakeEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealHandshakeEvidence.getEvidence());
  }

  public static getNoRealSignOffEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealSignOffEvidence.getEvidence());
  }

  public static getNoRealAuthorityConversionEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealAuthorityConversionEvidence.getEvidence());
  }

  public static getNoRealFinalCommandEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealFinalCommandEvidence.getEvidence());
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    res.json(FiscalProductionFinalHandshakeDependencyMatrix.getMatrix());
  }

  public static getBlockers(req: Request, res: Response) {
    res.json({ blockers: FiscalProductionFinalHandshakeBlockerRegister.getBlockers() });
  }

  public static getRisks(req: Request, res: Response) {
    res.json({ risks: FiscalProductionFinalHandshakeRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const errors = FiscalProductionFinalHandshakeValidator.validate(input);
    res.json({ valid: errors.length === 0, errors });
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const warnings = FiscalProductionFinalHandshakeEvaluationService.evaluate(input);
    res.json({ evaluated: true, warnings });
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionFinalHandshakeDecisionService.simulateDecision(input);
    res.json(result);
  }

  public static getReport(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionFinalHandshakeDecisionService.simulateDecision(input);
    res.json(FiscalProductionFinalHandshakeReportService.generateReport(result as any));
  }

  public static getAudit(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionFinalHandshakeDecisionService.simulateDecision(input);
    res.json(FiscalProductionFinalHandshakeAuditService.generateAuditRecord(result));
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'ok', module: 'Production Final Handshake Dry-Run', readOnly: true });
  }
}
