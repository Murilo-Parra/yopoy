import { Request, Response } from 'express';
import { FiscalDay2IncidentRunbookPolicy } from '../dedicated-homologation/day2-operations-governance/incident-runbook-dry-run/FiscalDay2IncidentRunbookPolicy';
import { FiscalDay2IncidentResponseSimulationPlan } from '../dedicated-homologation/day2-operations-governance/incident-runbook-dry-run/FiscalDay2IncidentResponseSimulationPlan';
import { FiscalDay2IncidentTriageMatrix } from '../dedicated-homologation/day2-operations-governance/incident-runbook-dry-run/FiscalDay2IncidentTriageMatrix';
import { FiscalDay2SeverityClassificationMatrix } from '../dedicated-homologation/day2-operations-governance/incident-runbook-dry-run/FiscalDay2SeverityClassificationMatrix';
import { FiscalDay2RunbookExecutionNoOpPlan } from '../dedicated-homologation/day2-operations-governance/incident-runbook-dry-run/FiscalDay2RunbookExecutionNoOpPlan';
import { FiscalDay2MitigationActionNoOpCatalog } from '../dedicated-homologation/day2-operations-governance/incident-runbook-dry-run/FiscalDay2MitigationActionNoOpCatalog';
import { FiscalDay2OnCallEscalationNoNotificationPlan } from '../dedicated-homologation/day2-operations-governance/incident-runbook-dry-run/FiscalDay2OnCallEscalationNoNotificationPlan';
import { FiscalDay2IncidentCommunicationNoSendPlan } from '../dedicated-homologation/day2-operations-governance/incident-runbook-dry-run/FiscalDay2IncidentCommunicationNoSendPlan';
import { FiscalDay2PostIncidentReviewNoPersistencePlan } from '../dedicated-homologation/day2-operations-governance/incident-runbook-dry-run/FiscalDay2PostIncidentReviewNoPersistencePlan';
import { FiscalDay2IncidentRunbookSafetyChecklist } from '../dedicated-homologation/day2-operations-governance/incident-runbook-dry-run/FiscalDay2IncidentRunbookSafetyChecklist';
import { FiscalDay2IncidentRunbookDependencyMatrix } from '../dedicated-homologation/day2-operations-governance/incident-runbook-dry-run/FiscalDay2IncidentRunbookDependencyMatrix';
import { FiscalDay2IncidentRunbookBlockerRegister } from '../dedicated-homologation/day2-operations-governance/incident-runbook-dry-run/FiscalDay2IncidentRunbookBlockerRegister';
import { FiscalDay2IncidentRunbookRiskRegister } from '../dedicated-homologation/day2-operations-governance/incident-runbook-dry-run/FiscalDay2IncidentRunbookRiskRegister';
import { FiscalDay2IncidentRunbookValidator } from '../dedicated-homologation/day2-operations-governance/incident-runbook-dry-run/FiscalDay2IncidentRunbookValidator';
import { FiscalDay2IncidentRunbookEvaluationService } from '../dedicated-homologation/day2-operations-governance/incident-runbook-dry-run/FiscalDay2IncidentRunbookEvaluationService';
import { FiscalDay2IncidentRunbookDecisionService } from '../dedicated-homologation/day2-operations-governance/incident-runbook-dry-run/FiscalDay2IncidentRunbookDecisionService';
import { FiscalDay2IncidentRunbookReportService } from '../dedicated-homologation/day2-operations-governance/incident-runbook-dry-run/FiscalDay2IncidentRunbookReportService';
import { FiscalDay2IncidentRunbookAuditService } from '../dedicated-homologation/day2-operations-governance/incident-runbook-dry-run/FiscalDay2IncidentRunbookAuditService';

export class FiscalDay2IncidentRunbookController {
  
  public getPolicy(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalDay2IncidentRunbookPolicy.enforce(input);
    if (result && !result.success) {
      return res.status(403).json(result);
    }
    return res.status(200).json(FiscalDay2IncidentRunbookPolicy.getBaseResult());
  }

  public getIncidentResponseSimulationPlan(req: Request, res: Response) {
    return res.status(200).json(FiscalDay2IncidentResponseSimulationPlan.getPlan());
  }

  public getIncidentTriageMatrix(req: Request, res: Response) {
    return res.status(200).json(FiscalDay2IncidentTriageMatrix.getMatrix());
  }

  public getSeverityClassificationMatrix(req: Request, res: Response) {
    return res.status(200).json(FiscalDay2SeverityClassificationMatrix.getMatrix());
  }

  public getRunbookExecutionNoOpPlan(req: Request, res: Response) {
    return res.status(200).json(FiscalDay2RunbookExecutionNoOpPlan.getPlan());
  }

  public getMitigationActionNoOpCatalog(req: Request, res: Response) {
    return res.status(200).json(FiscalDay2MitigationActionNoOpCatalog.getCatalog());
  }

  public getOnCallEscalationNoNotificationPlan(req: Request, res: Response) {
    return res.status(200).json(FiscalDay2OnCallEscalationNoNotificationPlan.getPlan());
  }

  public getIncidentCommunicationNoSendPlan(req: Request, res: Response) {
    return res.status(200).json(FiscalDay2IncidentCommunicationNoSendPlan.getPlan());
  }

  public getPostIncidentReviewNoPersistencePlan(req: Request, res: Response) {
    return res.status(200).json(FiscalDay2PostIncidentReviewNoPersistencePlan.getPlan());
  }

  public getIncidentRunbookSafetyChecklist(req: Request, res: Response) {
    return res.status(200).json(FiscalDay2IncidentRunbookSafetyChecklist.getChecklist());
  }

  public getDependencyMatrix(req: Request, res: Response) {
    return res.status(200).json(FiscalDay2IncidentRunbookDependencyMatrix.getMatrix());
  }

  public getBlockers(req: Request, res: Response) {
    return res.status(200).json({ blockers: FiscalDay2IncidentRunbookBlockerRegister.getBlockers() });
  }

  public getRisks(req: Request, res: Response) {
    return res.status(200).json({ risks: FiscalDay2IncidentRunbookRiskRegister.getRisks() });
  }

  public validate(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalDay2IncidentRunbookValidator.validate(input);
    FiscalDay2IncidentRunbookAuditService.logValidation(input, result);
    if (!result.valid) {
      return res.status(403).json(result);
    }
    return res.status(200).json(result);
  }

  public evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalDay2IncidentRunbookEvaluationService.evaluate(input);
    FiscalDay2IncidentRunbookAuditService.logEvaluation(input, result);
    const status = result.success ? 200 : 403;
    return res.status(status).json(result);
  }

  public simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalDay2IncidentRunbookDecisionService.simulateDecision(input);
    FiscalDay2IncidentRunbookAuditService.logDecisionSimulation(input, result);
    const status = result.success ? 200 : 403;
    return res.status(status).json(result);
  }

  public getReport(req: Request, res: Response) {
    return res.status(200).json(FiscalDay2IncidentRunbookReportService.getReport());
  }

  public getAudit(req: Request, res: Response) {
    return res.status(200).json({ logs: FiscalDay2IncidentRunbookAuditService.getAuditLogs() });
  }

  public getHealth(req: Request, res: Response) {
    return res.status(200).json({ status: 'UP', module: 'Day2IncidentRunbookDryRun' });
  }
}
