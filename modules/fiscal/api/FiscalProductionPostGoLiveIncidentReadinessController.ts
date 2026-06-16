import { Request, Response } from 'express';
import {
  FiscalProductionPostGoLiveIncidentReadinessPolicy,
  FiscalProductionIncidentReadinessSimulationBlueprint,
  FiscalProductionIncidentTriageNoOpenMatrix,
  FiscalProductionIncidentSeveritySimulationMatrix,
  FiscalProductionSupportRunbookNoExecutePlan,
  FiscalProductionMitigationActionNoOpCatalog,
  FiscalProductionEscalationNoNotificationPlan,
  FiscalProductionIncidentCommunicationNoSendPlan,
  FiscalProductionPostIncidentReviewNoPersistencePlan,
  FiscalProductionIncidentEvidenceNoCaptureMatrix,
  FiscalProductionNoRealIncidentEvidence,
  FiscalProductionNoRealRunbookExecutionEvidence,
  FiscalProductionPostGoLiveIncidentReadinessDependencyMatrix,
  FiscalProductionPostGoLiveIncidentReadinessBlockerRegister,
  FiscalProductionPostGoLiveIncidentReadinessRiskRegister,
  FiscalProductionPostGoLiveIncidentReadinessValidator,
  FiscalProductionPostGoLiveIncidentReadinessEvaluationService,
  FiscalProductionPostGoLiveIncidentReadinessDecisionService,
  FiscalProductionPostGoLiveIncidentReadinessReportService,
  FiscalProductionPostGoLiveIncidentReadinessAuditService
} from '../dedicated-homologation/production-post-go-live-stabilization/incident-readiness-dry-run';

export class FiscalProductionPostGoLiveIncidentReadinessController {
  public static getPolicy(req: Request, res: Response) {
    res.json(FiscalProductionPostGoLiveIncidentReadinessPolicy.getPolicy());
  }

  public static getIncidentReadinessBlueprint(req: Request, res: Response) {
    res.json(FiscalProductionIncidentReadinessSimulationBlueprint.getBlueprint());
  }

  public static getIncidentTriageNoOpenMatrix(req: Request, res: Response) {
    res.json(FiscalProductionIncidentTriageNoOpenMatrix.getMatrix());
  }

  public static getIncidentSeveritySimulationMatrix(req: Request, res: Response) {
    res.json(FiscalProductionIncidentSeveritySimulationMatrix.getMatrix());
  }

  public static getSupportRunbookNoExecutePlan(req: Request, res: Response) {
    res.json(FiscalProductionSupportRunbookNoExecutePlan.getPlan());
  }

  public static getMitigationActionNoOpCatalog(req: Request, res: Response) {
    res.json(FiscalProductionMitigationActionNoOpCatalog.getCatalog());
  }

  public static getEscalationNoNotificationPlan(req: Request, res: Response) {
    res.json(FiscalProductionEscalationNoNotificationPlan.getPlan());
  }

  public static getIncidentCommunicationNoSendPlan(req: Request, res: Response) {
    res.json(FiscalProductionIncidentCommunicationNoSendPlan.getPlan());
  }

  public static getPostIncidentReviewNoPersistencePlan(req: Request, res: Response) {
    res.json(FiscalProductionPostIncidentReviewNoPersistencePlan.getPlan());
  }

  public static getIncidentEvidenceNoCaptureMatrix(req: Request, res: Response) {
    res.json(FiscalProductionIncidentEvidenceNoCaptureMatrix.getMatrix());
  }

  public static getNoRealIncidentEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealIncidentEvidence.getEvidence());
  }

  public static getNoRealRunbookExecutionEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealRunbookExecutionEvidence.getEvidence());
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    res.json(FiscalProductionPostGoLiveIncidentReadinessDependencyMatrix.getMatrix());
  }

  public static getBlockers(req: Request, res: Response) {
    res.json({ blockers: FiscalProductionPostGoLiveIncidentReadinessBlockerRegister.getBlockers() });
  }

  public static getRisks(req: Request, res: Response) {
    res.json({ risks: FiscalProductionPostGoLiveIncidentReadinessRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const errors = FiscalProductionPostGoLiveIncidentReadinessValidator.validate(input);
    res.json({ valid: errors.length === 0, errors });
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const warnings = FiscalProductionPostGoLiveIncidentReadinessEvaluationService.evaluate(input);
    res.json({ evaluated: true, warnings });
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionPostGoLiveIncidentReadinessDecisionService.simulateDecision(input);
    res.json(result);
  }

  public static getReport(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionPostGoLiveIncidentReadinessDecisionService.simulateDecision(input);
    const report = FiscalProductionPostGoLiveIncidentReadinessReportService.generateReport(result);
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionPostGoLiveIncidentReadinessDecisionService.simulateDecision(input);
    const audit = FiscalProductionPostGoLiveIncidentReadinessAuditService.generateAuditRecord(result);
    res.json(audit);
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'ok', module: 'Production Post-Go-Live Incident Readiness & Support Runbook No-Op Dry-Run', readOnly: true });
  }
}
