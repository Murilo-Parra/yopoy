import { Request, Response } from 'express';
import { FiscalProductionOperationsSupportRunbookPolicy } from '../dedicated-homologation/production-operations-readiness/support-runbook-dry-run/FiscalProductionOperationsSupportRunbookPolicy';
import { FiscalProductionOperationsSupportRunbookSimulationPlan } from '../dedicated-homologation/production-operations-readiness/support-runbook-dry-run/FiscalProductionOperationsSupportRunbookSimulationPlan';
import { FiscalProductionOperationsIncidentTriageSimulationMatrix } from '../dedicated-homologation/production-operations-readiness/support-runbook-dry-run/FiscalProductionOperationsIncidentTriageSimulationMatrix';
import { FiscalProductionOperationsSeverityClassificationMatrix } from '../dedicated-homologation/production-operations-readiness/support-runbook-dry-run/FiscalProductionOperationsSeverityClassificationMatrix';
import { FiscalProductionOperationsRunbookExecutionNoOpPlan } from '../dedicated-homologation/production-operations-readiness/support-runbook-dry-run/FiscalProductionOperationsRunbookExecutionNoOpPlan';
import { FiscalProductionOperationsMitigationNoOpCatalog } from '../dedicated-homologation/production-operations-readiness/support-runbook-dry-run/FiscalProductionOperationsMitigationNoOpCatalog';
import { FiscalProductionOperationsEscalationNoNotificationPlan } from '../dedicated-homologation/production-operations-readiness/support-runbook-dry-run/FiscalProductionOperationsEscalationNoNotificationPlan';
import { FiscalProductionOperationsIncidentCommunicationNoSendPlan } from '../dedicated-homologation/production-operations-readiness/support-runbook-dry-run/FiscalProductionOperationsIncidentCommunicationNoSendPlan';
import { FiscalProductionOperationsPostIncidentReviewNoPersistencePlan } from '../dedicated-homologation/production-operations-readiness/support-runbook-dry-run/FiscalProductionOperationsPostIncidentReviewNoPersistencePlan';
import { FiscalProductionOperationsNoRealIncidentEvidence } from '../dedicated-homologation/production-operations-readiness/support-runbook-dry-run/FiscalProductionOperationsNoRealIncidentEvidence';
import { FiscalProductionOperationsNoRealRunbookExecutionEvidence } from '../dedicated-homologation/production-operations-readiness/support-runbook-dry-run/FiscalProductionOperationsNoRealRunbookExecutionEvidence';
import { FiscalProductionOperationsSupportRunbookDependencyMatrix } from '../dedicated-homologation/production-operations-readiness/support-runbook-dry-run/FiscalProductionOperationsSupportRunbookDependencyMatrix';
import { FiscalProductionOperationsSupportRunbookBlockerRegister } from '../dedicated-homologation/production-operations-readiness/support-runbook-dry-run/FiscalProductionOperationsSupportRunbookBlockerRegister';
import { FiscalProductionOperationsSupportRunbookRiskRegister } from '../dedicated-homologation/production-operations-readiness/support-runbook-dry-run/FiscalProductionOperationsSupportRunbookRiskRegister';
import { FiscalProductionOperationsSupportRunbookValidator } from '../dedicated-homologation/production-operations-readiness/support-runbook-dry-run/FiscalProductionOperationsSupportRunbookValidator';
import { FiscalProductionOperationsSupportRunbookEvaluationService } from '../dedicated-homologation/production-operations-readiness/support-runbook-dry-run/FiscalProductionOperationsSupportRunbookEvaluationService';
import { FiscalProductionOperationsSupportRunbookDecisionService } from '../dedicated-homologation/production-operations-readiness/support-runbook-dry-run/FiscalProductionOperationsSupportRunbookDecisionService';
import { FiscalProductionOperationsSupportRunbookReportService } from '../dedicated-homologation/production-operations-readiness/support-runbook-dry-run/FiscalProductionOperationsSupportRunbookReportService';
import { FiscalProductionOperationsSupportRunbookAuditService } from '../dedicated-homologation/production-operations-readiness/support-runbook-dry-run/FiscalProductionOperationsSupportRunbookAuditService';

export class FiscalProductionOperationsSupportRunbookController {
  
  public getPolicy(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionOperationsSupportRunbookPolicy.enforce(input);
    if (result && !result.success) {
      return res.status(403).json(result);
    }
    return res.status(200).json(FiscalProductionOperationsSupportRunbookPolicy.getBaseResult());
  }

  public getSupportRunbookSimulationPlan(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionOperationsSupportRunbookSimulationPlan.getPlan());
  }

  public getIncidentTriageSimulationMatrix(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionOperationsIncidentTriageSimulationMatrix.getMatrix());
  }

  public getSeverityClassificationMatrix(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionOperationsSeverityClassificationMatrix.getMatrix());
  }

  public getRunbookExecutionNoOpPlan(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionOperationsRunbookExecutionNoOpPlan.getPlan());
  }

  public getMitigationNoOpCatalog(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionOperationsMitigationNoOpCatalog.getCatalog());
  }

  public getEscalationNoNotificationPlan(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionOperationsEscalationNoNotificationPlan.getPlan());
  }

  public getIncidentCommunicationNoSendPlan(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionOperationsIncidentCommunicationNoSendPlan.getPlan());
  }

  public getPostIncidentReviewNoPersistencePlan(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionOperationsPostIncidentReviewNoPersistencePlan.getPlan());
  }

  public getNoRealIncidentEvidence(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionOperationsNoRealIncidentEvidence.getEvidence());
  }

  public getNoRealRunbookExecutionEvidence(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionOperationsNoRealRunbookExecutionEvidence.getEvidence());
  }

  public getDependencyMatrix(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionOperationsSupportRunbookDependencyMatrix.getMatrix());
  }

  public getBlockers(req: Request, res: Response) {
    return res.status(200).json({ blockers: FiscalProductionOperationsSupportRunbookBlockerRegister.getBlockers() });
  }

  public getRisks(req: Request, res: Response) {
    return res.status(200).json({ risks: FiscalProductionOperationsSupportRunbookRiskRegister.getRisks() });
  }

  public validate(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionOperationsSupportRunbookValidator.validate(input);
    FiscalProductionOperationsSupportRunbookAuditService.logValidation(input, result);
    if (!result.valid) {
      return res.status(403).json(result);
    }
    return res.status(200).json(result);
  }

  public evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionOperationsSupportRunbookEvaluationService.evaluate(input);
    FiscalProductionOperationsSupportRunbookAuditService.logEvaluation(input, result);
    const status = result.success ? 200 : 403;
    return res.status(status).json(result);
  }

  public simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionOperationsSupportRunbookDecisionService.simulateDecision(input);
    FiscalProductionOperationsSupportRunbookAuditService.logDecisionSimulation(input, result);
    const status = result.success ? 200 : 403;
    return res.status(status).json(result);
  }

  public getReport(req: Request, res: Response) {
    return res.status(200).json(FiscalProductionOperationsSupportRunbookReportService.getReport());
  }

  public getAudit(req: Request, res: Response) {
    return res.status(200).json({ logs: FiscalProductionOperationsSupportRunbookAuditService.getAuditLogs() });
  }

  public getHealth(req: Request, res: Response) {
    return res.status(200).json({ status: 'UP', module: 'ProductionOperationsSupportRunbookDryRun' });
  }
}
