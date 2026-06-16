import { Request, Response } from 'express';
import {
  FiscalProductionPostGoLiveRemediationPolicy,
  FiscalProductionWarRoomDrillNoActivationBlueprint,
  FiscalProductionRemediationReadinessNoExecutePlan,
  FiscalProductionMitigationPlaybookNoOpMatrix,
  FiscalProductionSupportHandoverNoConclusionPlan,
  FiscalProductionSupportRoleNoGrantMatrix,
  FiscalProductionAssistedSessionNoOpenPlan,
  FiscalProductionStabilizationDecisionNoAuthorizationMatrix,
  FiscalProductionWarRoomCommunicationNoSendPlan,
  FiscalProductionPostGoLiveRemediationNoPersistencePlan,
  FiscalProductionNoRealWarRoomEvidence,
  FiscalProductionNoRealRemediationEvidence,
  FiscalProductionPostGoLiveRemediationDependencyMatrix,
  FiscalProductionPostGoLiveRemediationBlockerRegister,
  FiscalProductionPostGoLiveRemediationRiskRegister,
  FiscalProductionPostGoLiveRemediationValidator,
  FiscalProductionPostGoLiveRemediationEvaluationService,
  FiscalProductionPostGoLiveRemediationDecisionService,
  FiscalProductionPostGoLiveRemediationReportService,
  FiscalProductionPostGoLiveRemediationAuditService
} from '../dedicated-homologation/production-post-go-live-stabilization/remediation-war-room-dry-run';

export class FiscalProductionPostGoLiveRemediationController {
  public static getPolicy(req: Request, res: Response) {
    res.json(FiscalProductionPostGoLiveRemediationPolicy.getPolicy());
  }

  public static getWarRoomDrillNoActivationBlueprint(req: Request, res: Response) {
    res.json(FiscalProductionWarRoomDrillNoActivationBlueprint.getBlueprint());
  }

  public static getRemediationReadinessNoExecutePlan(req: Request, res: Response) {
    res.json(FiscalProductionRemediationReadinessNoExecutePlan.getPlan());
  }

  public static getMitigationPlaybookNoOpMatrix(req: Request, res: Response) {
    res.json(FiscalProductionMitigationPlaybookNoOpMatrix.getMatrix());
  }

  public static getSupportHandoverNoConclusionPlan(req: Request, res: Response) {
    res.json(FiscalProductionSupportHandoverNoConclusionPlan.getPlan());
  }

  public static getSupportRoleNoGrantMatrix(req: Request, res: Response) {
    res.json(FiscalProductionSupportRoleNoGrantMatrix.getMatrix());
  }

  public static getAssistedSessionNoOpenPlan(req: Request, res: Response) {
    res.json(FiscalProductionAssistedSessionNoOpenPlan.getPlan());
  }

  public static getStabilizationDecisionNoAuthorizationMatrix(req: Request, res: Response) {
    res.json(FiscalProductionStabilizationDecisionNoAuthorizationMatrix.getMatrix());
  }

  public static getWarRoomCommunicationNoSendPlan(req: Request, res: Response) {
    res.json(FiscalProductionWarRoomCommunicationNoSendPlan.getPlan());
  }

  public static getPostGoLiveRemediationNoPersistencePlan(req: Request, res: Response) {
    res.json(FiscalProductionPostGoLiveRemediationNoPersistencePlan.getPlan());
  }

  public static getNoRealWarRoomEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealWarRoomEvidence.getEvidence());
  }

  public static getNoRealRemediationEvidence(req: Request, res: Response) {
    res.json(FiscalProductionNoRealRemediationEvidence.getEvidence());
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    res.json(FiscalProductionPostGoLiveRemediationDependencyMatrix.getMatrix());
  }

  public static getBlockers(req: Request, res: Response) {
    res.json({ blockers: FiscalProductionPostGoLiveRemediationBlockerRegister.getBlockers() });
  }

  public static getRisks(req: Request, res: Response) {
    res.json({ risks: FiscalProductionPostGoLiveRemediationRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const errors = FiscalProductionPostGoLiveRemediationValidator.validate(input);
    res.json({ valid: errors.length === 0, errors });
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const warnings = FiscalProductionPostGoLiveRemediationEvaluationService.evaluate(input);
    res.json({ evaluated: true, warnings });
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionPostGoLiveRemediationDecisionService.simulateDecision(input);
    res.json(result);
  }

  public static getReport(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionPostGoLiveRemediationDecisionService.simulateDecision(input);
    const report = FiscalProductionPostGoLiveRemediationReportService.generateReport(result);
    res.json(report);
  }

  public static getAudit(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionPostGoLiveRemediationDecisionService.simulateDecision(input);
    const audit = FiscalProductionPostGoLiveRemediationAuditService.generateAuditRecord(result);
    res.json(audit);
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'ok', module: 'Production Post-Go-Live Remediation, War Room Drill & Support Handover No-Op Dry-Run', readOnly: true });
  }
}
