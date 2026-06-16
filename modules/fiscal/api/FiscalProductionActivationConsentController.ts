import { Request, Response } from 'express';
import { FiscalProductionActivationConsentPolicy } from '../dedicated-homologation/production-operations-transition/activation-consent-dry-run/FiscalProductionActivationConsentPolicy';
import { FiscalProductionActivationConsentRequestIntake } from '../dedicated-homologation/production-operations-transition/activation-consent-dry-run/FiscalProductionActivationConsentRequestIntake';
import { FiscalProductionActivationConsentRequestSanitizer } from '../dedicated-homologation/production-operations-transition/activation-consent-dry-run/FiscalProductionActivationConsentRequestSanitizer';
import { FiscalProductionExplicitActivationConsentEnvelope } from '../dedicated-homologation/production-operations-transition/activation-consent-dry-run/FiscalProductionExplicitActivationConsentEnvelope';
import { FiscalProductionConsentSignerEligibilityMatrix } from '../dedicated-homologation/production-operations-transition/activation-consent-dry-run/FiscalProductionConsentSignerEligibilityMatrix';
import { FiscalProductionTwoPersonConsentSimulation } from '../dedicated-homologation/production-operations-transition/activation-consent-dry-run/FiscalProductionTwoPersonConsentSimulation';
import { FiscalProductionConsentSeparationOfDutiesReview } from '../dedicated-homologation/production-operations-transition/activation-consent-dry-run/FiscalProductionConsentSeparationOfDutiesReview';
import { FiscalProductionAuthorizationScopeNoOpPlan } from '../dedicated-homologation/production-operations-transition/activation-consent-dry-run/FiscalProductionAuthorizationScopeNoOpPlan';
import { FiscalProductionConsentNoNotificationEvidence } from '../dedicated-homologation/production-operations-transition/activation-consent-dry-run/FiscalProductionConsentNoNotificationEvidence';
import { FiscalProductionActivationConsentDependencyMatrix } from '../dedicated-homologation/production-operations-transition/activation-consent-dry-run/FiscalProductionActivationConsentDependencyMatrix';
import { FiscalProductionActivationConsentBlockerRegister } from '../dedicated-homologation/production-operations-transition/activation-consent-dry-run/FiscalProductionActivationConsentBlockerRegister';
import { FiscalProductionActivationConsentRiskRegister } from '../dedicated-homologation/production-operations-transition/activation-consent-dry-run/FiscalProductionActivationConsentRiskRegister';
import { FiscalProductionActivationConsentValidator } from '../dedicated-homologation/production-operations-transition/activation-consent-dry-run/FiscalProductionActivationConsentValidator';
import { FiscalProductionActivationConsentEvaluationService } from '../dedicated-homologation/production-operations-transition/activation-consent-dry-run/FiscalProductionActivationConsentEvaluationService';
import { FiscalProductionActivationConsentDecisionService } from '../dedicated-homologation/production-operations-transition/activation-consent-dry-run/FiscalProductionActivationConsentDecisionService';
import { FiscalProductionActivationConsentReportService } from '../dedicated-homologation/production-operations-transition/activation-consent-dry-run/FiscalProductionActivationConsentReportService';
import { FiscalProductionActivationConsentAuditService } from '../dedicated-homologation/production-operations-transition/activation-consent-dry-run/FiscalProductionActivationConsentAuditService';

export class FiscalProductionActivationConsentController {
  
  public getPolicy(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionActivationConsentPolicy.enforce(input);
    if (result && !result.success) {
      return res.status(403).json(result);
    }
    return res.status(200).json(FiscalProductionActivationConsentPolicy.getBaseResult());
  }

  public getRequestIntake(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionActivationConsentRequestIntake.getIntake());
  }

  public getRequestSanitizer(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionActivationConsentRequestSanitizer.getSanitizer());
  }

  public getConsentEnvelope(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionExplicitActivationConsentEnvelope.getEnvelope());
  }

  public getSignerEligibilityMatrix(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionConsentSignerEligibilityMatrix.getMatrix());
  }

  public getTwoPersonConsentSimulation(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionTwoPersonConsentSimulation.getSimulation());
  }

  public getSeparationOfDutiesReview(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionConsentSeparationOfDutiesReview.getReview());
  }

  public getAuthorizationScopeNoOpPlan(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionAuthorizationScopeNoOpPlan.getPlan());
  }

  public getNoNotificationEvidence(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionConsentNoNotificationEvidence.getEvidence());
  }

  public getDependencyMatrix(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionActivationConsentDependencyMatrix.getMatrix());
  }

  public getBlockers(req: Request, res: Response) {
    return res.status(200).json({ blockers: FiscalProductionActivationConsentBlockerRegister.getBlockers() });
  }

  public getRisks(req: Request, res: Response) {
    return res.status(200).json({ risks: FiscalProductionActivationConsentRiskRegister.getRisks() });
  }

  public validate(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionActivationConsentValidator.validate(input);
    FiscalProductionActivationConsentAuditService.logValidation(input, result);
    if (!result.valid) {
      return res.status(403).json(result);
    }
    return res.status(200).json(result);
  }

  public evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionActivationConsentEvaluationService.evaluate(input);
    FiscalProductionActivationConsentAuditService.logEvaluation(input, result);
    const status = result.success ? 200 : 403;
    return res.status(status).json(result);
  }

  public simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionActivationConsentDecisionService.simulateDecision(input);
    FiscalProductionActivationConsentAuditService.logDecisionSimulation(input, result);
    const status = result.success ? 200 : 403;
    return res.status(status).json(result);
  }

  public getReport(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionActivationConsentReportService.getReport());
  }

  public getAudit(req: Request, res: Response) {
    return res.status(200).json({ logs: FiscalProductionActivationConsentAuditService.getAuditLogs() });
  }

  public getHealth(req: Request, res: Response) {
    return res.status(200).json({ status: 'UP', module: 'ProductionActivationConsentDryRun' });
  }
}
