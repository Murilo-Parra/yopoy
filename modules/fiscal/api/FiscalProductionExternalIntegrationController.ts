import { Request, Response } from 'express';
import {
  FiscalProductionExternalIntegrationPolicy,
  FiscalProductionExternalIntegrationNoCallBlueprint,
  FiscalProductionSefazAdapterNoCallPlan,
  FiscalProductionAuthorizationTokenNoIssueMatrix,
  FiscalProductionExternalWebhookNoSendPlan,
  FiscalProductionNotificationProviderNoSendMatrix,
  FiscalProductionExternalCallbackNoRegisterPlan,
  FiscalProductionHttpAdapterNoBindMatrix,
  FiscalProductionExternalCredentialNoReadPlan,
  FiscalProductionApiKeySecretNoReadMatrix,
  FiscalProductionCertificatePfxNoReadPlan,
  FiscalProductionFiscalPayloadNoReadMatrix,
  FiscalProductionExternalNoRealCallEvidence,
  FiscalProductionAuthorizationNoRealTokenEvidence,
  FiscalProductionExternalIntegrationDependencyMatrix,
  FiscalProductionExternalIntegrationBlockerRegister,
  FiscalProductionExternalIntegrationRiskRegister,
  FiscalProductionExternalIntegrationValidator,
  FiscalProductionExternalIntegrationEvaluationService,
  FiscalProductionExternalIntegrationDecisionService,
  FiscalProductionExternalIntegrationReportService,
  FiscalProductionExternalIntegrationAuditService
} from '../dedicated-homologation/production-runtime-orchestration-governance/external-integration-dry-run';

export class FiscalProductionExternalIntegrationController {
  public static getPolicy(req: Request, res: Response) {
    res.json(FiscalProductionExternalIntegrationPolicy.getPolicy());
  }

  public static getExternalIntegrationNoCallBlueprint(req: Request, res: Response) {
    res.json(FiscalProductionExternalIntegrationNoCallBlueprint.getBlueprint());
  }

  public static getSefazAdapterNoCallPlan(req: Request, res: Response) {
    res.json(FiscalProductionSefazAdapterNoCallPlan.getPlan());
  }

  public static getAuthorizationTokenNoIssueMatrix(req: Request, res: Response) {
    res.json(FiscalProductionAuthorizationTokenNoIssueMatrix.getMatrix());
  }

  public static getExternalWebhookNoSendPlan(req: Request, res: Response) {
    res.json(FiscalProductionExternalWebhookNoSendPlan.getPlan());
  }

  public static getNotificationProviderNoSendMatrix(req: Request, res: Response) {
    res.json(FiscalProductionNotificationProviderNoSendMatrix.getMatrix());
  }

  public static getExternalCallbackNoRegisterPlan(req: Request, res: Response) {
    res.json(FiscalProductionExternalCallbackNoRegisterPlan.getPlan());
  }

  public static getHttpAdapterNoBindMatrix(req: Request, res: Response) {
    res.json(FiscalProductionHttpAdapterNoBindMatrix.getMatrix());
  }

  public static getExternalCredentialNoReadPlan(req: Request, res: Response) {
    res.json(FiscalProductionExternalCredentialNoReadPlan.getPlan());
  }

  public static getApiKeySecretNoReadMatrix(req: Request, res: Response) {
    res.json(FiscalProductionApiKeySecretNoReadMatrix.getMatrix());
  }

  public static getCertificatePfxNoReadPlan(req: Request, res: Response) {
    res.json(FiscalProductionCertificatePfxNoReadPlan.getPlan());
  }

  public static getFiscalPayloadNoReadMatrix(req: Request, res: Response) {
    res.json(FiscalProductionFiscalPayloadNoReadMatrix.getMatrix());
  }

  public static getExternalNoRealCallEvidence(req: Request, res: Response) {
    res.json(FiscalProductionExternalNoRealCallEvidence.getEvidence());
  }

  public static getAuthorizationNoRealTokenEvidence(req: Request, res: Response) {
    res.json(FiscalProductionAuthorizationNoRealTokenEvidence.getEvidence());
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    res.json(FiscalProductionExternalIntegrationDependencyMatrix.getMatrix());
  }

  public static getBlockers(req: Request, res: Response) {
    res.json({ blockers: FiscalProductionExternalIntegrationBlockerRegister.getBlockers() });
  }

  public static getRisks(req: Request, res: Response) {
    res.json({ risks: FiscalProductionExternalIntegrationRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const errors = FiscalProductionExternalIntegrationValidator.validate(input);
    res.json({ valid: errors.length === 0, errors });
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const warnings = FiscalProductionExternalIntegrationEvaluationService.evaluate(input);
    res.json({ evaluated: true, warnings });
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionExternalIntegrationDecisionService.simulateDecision(input);
    res.json(result);
  }

  public static getReport(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionExternalIntegrationDecisionService.simulateDecision(input);
    res.json(FiscalProductionExternalIntegrationReportService.generateReport(result));
  }

  public static getAudit(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionExternalIntegrationDecisionService.simulateDecision(input);
    res.json(FiscalProductionExternalIntegrationAuditService.generateAuditRecord(result));
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'ok', module: 'Production External Integration, SEFAZ Adapter & Authorization Token Boundary No-Call / No-Issue Dry-Run', readOnly: true });
  }
}
