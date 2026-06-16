import { Router } from 'express';
import { FiscalProductionPostGoLiveIncidentReadinessController } from './FiscalProductionPostGoLiveIncidentReadinessController';

const router = Router();

router.get('/policy', FiscalProductionPostGoLiveIncidentReadinessController.getPolicy);
router.get('/incident-readiness-blueprint', FiscalProductionPostGoLiveIncidentReadinessController.getIncidentReadinessBlueprint);
router.get('/incident-triage-no-open-matrix', FiscalProductionPostGoLiveIncidentReadinessController.getIncidentTriageNoOpenMatrix);
router.get('/incident-severity-simulation-matrix', FiscalProductionPostGoLiveIncidentReadinessController.getIncidentSeveritySimulationMatrix);
router.get('/support-runbook-no-execute-plan', FiscalProductionPostGoLiveIncidentReadinessController.getSupportRunbookNoExecutePlan);
router.get('/mitigation-action-no-op-catalog', FiscalProductionPostGoLiveIncidentReadinessController.getMitigationActionNoOpCatalog);
router.get('/escalation-no-notification-plan', FiscalProductionPostGoLiveIncidentReadinessController.getEscalationNoNotificationPlan);
router.get('/incident-communication-no-send-plan', FiscalProductionPostGoLiveIncidentReadinessController.getIncidentCommunicationNoSendPlan);
router.get('/post-incident-review-no-persistence-plan', FiscalProductionPostGoLiveIncidentReadinessController.getPostIncidentReviewNoPersistencePlan);
router.get('/incident-evidence-no-capture-matrix', FiscalProductionPostGoLiveIncidentReadinessController.getIncidentEvidenceNoCaptureMatrix);
router.get('/no-real-incident-evidence', FiscalProductionPostGoLiveIncidentReadinessController.getNoRealIncidentEvidence);
router.get('/no-real-runbook-execution-evidence', FiscalProductionPostGoLiveIncidentReadinessController.getNoRealRunbookExecutionEvidence);
router.get('/dependency-matrix', FiscalProductionPostGoLiveIncidentReadinessController.getDependencyMatrix);
router.get('/blockers', FiscalProductionPostGoLiveIncidentReadinessController.getBlockers);
router.get('/risks', FiscalProductionPostGoLiveIncidentReadinessController.getRisks);
router.post('/validate', FiscalProductionPostGoLiveIncidentReadinessController.validate);
router.post('/evaluate', FiscalProductionPostGoLiveIncidentReadinessController.evaluate);
router.post('/simulate-decision', FiscalProductionPostGoLiveIncidentReadinessController.simulateDecision);
router.get('/report', FiscalProductionPostGoLiveIncidentReadinessController.getReport);
router.get('/audit', FiscalProductionPostGoLiveIncidentReadinessController.getAudit);
router.get('/health', FiscalProductionPostGoLiveIncidentReadinessController.getHealth);

export const fiscalProductionPostGoLiveIncidentReadinessRoutes = router;
