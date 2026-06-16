import { Router } from 'express';
import { FiscalProductionPostGoLiveObservabilityController } from './FiscalProductionPostGoLiveObservabilityController';

const router = Router();

router.get('/policy', FiscalProductionPostGoLiveObservabilityController.getPolicy);
router.get('/observability-review-no-install-blueprint', FiscalProductionPostGoLiveObservabilityController.getObservabilityReviewNoInstallBlueprint);
router.get('/operational-signal-no-capture-catalog', FiscalProductionPostGoLiveObservabilityController.getOperationalSignalNoCaptureCatalog);
router.get('/health-drift-simulation-matrix', FiscalProductionPostGoLiveObservabilityController.getHealthDriftSimulationMatrix);
router.get('/slo-sla-review-no-metric-plan', FiscalProductionPostGoLiveObservabilityController.getSloSlaReviewNoMetricPlan);
router.get('/live-telemetry-no-read-plan', FiscalProductionPostGoLiveObservabilityController.getLiveTelemetryNoReadPlan);
router.get('/dashboard-no-creation-plan', FiscalProductionPostGoLiveObservabilityController.getDashboardNoCreationPlan);
router.get('/alert-rule-no-activation-matrix', FiscalProductionPostGoLiveObservabilityController.getAlertRuleNoActivationMatrix);
router.get('/metrics-retention-no-persistence-plan', FiscalProductionPostGoLiveObservabilityController.getMetricsRetentionNoPersistencePlan);
router.get('/observability-tool-no-connection-matrix', FiscalProductionPostGoLiveObservabilityController.getObservabilityToolNoConnectionMatrix);
router.get('/no-real-metrics-capture-evidence', FiscalProductionPostGoLiveObservabilityController.getNoRealMetricsCaptureEvidence);
router.get('/no-real-alert-dashboard-evidence', FiscalProductionPostGoLiveObservabilityController.getNoRealAlertDashboardEvidence);
router.get('/dependency-matrix', FiscalProductionPostGoLiveObservabilityController.getDependencyMatrix);
router.get('/blockers', FiscalProductionPostGoLiveObservabilityController.getBlockers);
router.get('/risks', FiscalProductionPostGoLiveObservabilityController.getRisks);
router.post('/validate', FiscalProductionPostGoLiveObservabilityController.validate);
router.post('/evaluate', FiscalProductionPostGoLiveObservabilityController.evaluate);
router.post('/simulate-decision', FiscalProductionPostGoLiveObservabilityController.simulateDecision);
router.get('/report', FiscalProductionPostGoLiveObservabilityController.getReport);
router.get('/audit', FiscalProductionPostGoLiveObservabilityController.getAudit);
router.get('/health', FiscalProductionPostGoLiveObservabilityController.getHealth);

export const fiscalProductionPostGoLiveObservabilityRoutes = router;
