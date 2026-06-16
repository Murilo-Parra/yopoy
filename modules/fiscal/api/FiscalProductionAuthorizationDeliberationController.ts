import { Request, Response } from 'express';
import { FiscalProductionAuthorizationDeliberationPolicy } from '../dedicated-homologation/production-operations-transition/authorization-deliberation-dry-run/FiscalProductionAuthorizationDeliberationPolicy';
import { FiscalProductionAuthorizationDeliberationCharter } from '../dedicated-homologation/production-operations-transition/authorization-deliberation-dry-run/FiscalProductionAuthorizationDeliberationCharter';
import { FiscalProductionAuthorizationQuorumSimulation } from '../dedicated-homologation/production-operations-transition/authorization-deliberation-dry-run/FiscalProductionAuthorizationQuorumSimulation';
import { FiscalProductionAuthorityVoteSimulation } from '../dedicated-homologation/production-operations-transition/authorization-deliberation-dry-run/FiscalProductionAuthorityVoteSimulation';
import { FiscalProductionGatePreconditionReview } from '../dedicated-homologation/production-operations-transition/authorization-deliberation-dry-run/FiscalProductionGatePreconditionReview';
import { FiscalProductionConsentEvidenceReviewMatrix } from '../dedicated-homologation/production-operations-transition/authorization-deliberation-dry-run/FiscalProductionConsentEvidenceReviewMatrix';
import { FiscalProductionSoDRevalidationMatrix } from '../dedicated-homologation/production-operations-transition/authorization-deliberation-dry-run/FiscalProductionSoDRevalidationMatrix';
import { FiscalProductionRiskAcceptanceNoOpReview } from '../dedicated-homologation/production-operations-transition/authorization-deliberation-dry-run/FiscalProductionRiskAcceptanceNoOpReview';
import { FiscalProductionDeliberationNoPersistenceEvidence } from '../dedicated-homologation/production-operations-transition/authorization-deliberation-dry-run/FiscalProductionDeliberationNoPersistenceEvidence';
import { FiscalProductionAuthorizationDeliberationDependencyMatrix } from '../dedicated-homologation/production-operations-transition/authorization-deliberation-dry-run/FiscalProductionAuthorizationDeliberationDependencyMatrix';
import { FiscalProductionAuthorizationDeliberationBlockerRegister } from '../dedicated-homologation/production-operations-transition/authorization-deliberation-dry-run/FiscalProductionAuthorizationDeliberationBlockerRegister';
import { FiscalProductionAuthorizationDeliberationRiskRegister } from '../dedicated-homologation/production-operations-transition/authorization-deliberation-dry-run/FiscalProductionAuthorizationDeliberationRiskRegister';
import { FiscalProductionAuthorizationDeliberationValidator } from '../dedicated-homologation/production-operations-transition/authorization-deliberation-dry-run/FiscalProductionAuthorizationDeliberationValidator';
import { FiscalProductionAuthorizationDeliberationEvaluationService } from '../dedicated-homologation/production-operations-transition/authorization-deliberation-dry-run/FiscalProductionAuthorizationDeliberationEvaluationService';
import { FiscalProductionAuthorizationDeliberationDecisionService } from '../dedicated-homologation/production-operations-transition/authorization-deliberation-dry-run/FiscalProductionAuthorizationDeliberationDecisionService';
import { FiscalProductionAuthorizationDeliberationReportService } from '../dedicated-homologation/production-operations-transition/authorization-deliberation-dry-run/FiscalProductionAuthorizationDeliberationReportService';
import { FiscalProductionAuthorizationDeliberationAuditService } from '../dedicated-homologation/production-operations-transition/authorization-deliberation-dry-run/FiscalProductionAuthorizationDeliberationAuditService';

export class FiscalProductionAuthorizationDeliberationController {
  
  public getPolicy(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionAuthorizationDeliberationPolicy.enforce(input);
    if (result && !result.success) {
      return res.status(403).json(result);
    }
    return res.status(200).json(FiscalProductionAuthorizationDeliberationPolicy.getBaseResult());
  }

  public getDeliberationCharter(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionAuthorizationDeliberationCharter.getCharter());
  }

  public getQuorumSimulation(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionAuthorizationQuorumSimulation.getSimulation());
  }

  public getAuthorityVoteSimulation(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionAuthorityVoteSimulation.getSimulation());
  }

  public getGatePreconditionReview(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionGatePreconditionReview.getReview());
  }

  public getConsentEvidenceReviewMatrix(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionConsentEvidenceReviewMatrix.getMatrix());
  }

  public getSoDRevalidationMatrix(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionSoDRevalidationMatrix.getMatrix());
  }

  public getRiskAcceptanceNoOpReview(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionRiskAcceptanceNoOpReview.getReview());
  }

  public getDeliberationNoPersistenceEvidence(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionDeliberationNoPersistenceEvidence.getEvidence());
  }

  public getDependencyMatrix(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionAuthorizationDeliberationDependencyMatrix.getMatrix());
  }

  public getBlockers(req: Request, res: Response) {
    return res.status(200).json({ blockers: FiscalProductionAuthorizationDeliberationBlockerRegister.getBlockers() });
  }

  public getRisks(req: Request, res: Response) {
    return res.status(200).json({ risks: FiscalProductionAuthorizationDeliberationRiskRegister.getRisks() });
  }

  public validate(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionAuthorizationDeliberationValidator.validate(input);
    FiscalProductionAuthorizationDeliberationAuditService.logValidation(input, result);
    if (!result.valid) {
      return res.status(403).json(result);
    }
    return res.status(200).json(result);
  }

  public evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionAuthorizationDeliberationEvaluationService.evaluate(input);
    FiscalProductionAuthorizationDeliberationAuditService.logEvaluation(input, result);
    const status = result.success ? 200 : 403;
    return res.status(status).json(result);
  }

  public simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionAuthorizationDeliberationDecisionService.simulateDecision(input);
    FiscalProductionAuthorizationDeliberationAuditService.logDecisionSimulation(input, result);
    const status = result.success ? 200 : 403;
    return res.status(status).json(result);
  }

  public getReport(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionAuthorizationDeliberationReportService.getReport());
  }

  public getAudit(req: Request, res: Response) {
    return res.status(200).json({ logs: FiscalProductionAuthorizationDeliberationAuditService.getAuditLogs() });
  }

  public getHealth(req: Request, res: Response) {
    return res.status(200).json({ status: 'UP', module: 'ProductionAuthorizationDeliberationDryRun' });
  }
}
