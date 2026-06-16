import { Router } from 'express';
import { FiscalProductionPostGoLiveStabilizationController } from './FiscalProductionPostGoLiveStabilizationController';

const router = Router();

router.get('/policy', FiscalProductionPostGoLiveStabilizationController.getPolicy);
router.get('/stabilization-blueprint', FiscalProductionPostGoLiveStabilizationController.getStabilizationBlueprint);
router.get('/no-activation-observation-contract', FiscalProductionPostGoLiveStabilizationController.getNoActivationObservationContract);
router.get('/stabilization-window-simulation-plan', FiscalProductionPostGoLiveStabilizationController.getStabilizationWindowSimulationPlan);
router.get('/operational-health-no-capture-matrix', FiscalProductionPostGoLiveStabilizationController.getOperationalHealthNoCaptureMatrix);
router.get('/legacy-continuity-post-go-live-plan', FiscalProductionPostGoLiveStabilizationController.getLegacyContinuityPostGoLivePlan);
router.get('/v2-inactive-observation-matrix', FiscalProductionPostGoLiveStabilizationController.getV2InactiveObservationMatrix);
router.get('/traffic-invariant-post-go-live-matrix', FiscalProductionPostGoLiveStabilizationController.getTrafficInvariantPostGoLiveMatrix);
router.get('/rollback-readiness-no-execute-plan', FiscalProductionPostGoLiveStabilizationController.getRollbackReadinessNoExecutePlan);
router.get('/incident-readiness-no-open-plan', FiscalProductionPostGoLiveStabilizationController.getIncidentReadinessNoOpenPlan);
router.get('/no-real-observation-evidence', FiscalProductionPostGoLiveStabilizationController.getNoRealObservationEvidence);
router.get('/no-activation-post-go-live-evidence', FiscalProductionPostGoLiveStabilizationController.getNoActivationPostGoLiveEvidence);
router.get('/dependency-matrix', FiscalProductionPostGoLiveStabilizationController.getDependencyMatrix);
router.get('/blockers', FiscalProductionPostGoLiveStabilizationController.getBlockers);
router.get('/risks', FiscalProductionPostGoLiveStabilizationController.getRisks);
router.post('/validate', FiscalProductionPostGoLiveStabilizationController.validate);
router.post('/evaluate', FiscalProductionPostGoLiveStabilizationController.evaluate);
router.post('/simulate-decision', FiscalProductionPostGoLiveStabilizationController.simulateDecision);
router.get('/report', FiscalProductionPostGoLiveStabilizationController.getReport);
router.get('/audit', FiscalProductionPostGoLiveStabilizationController.getAudit);
router.get('/health', FiscalProductionPostGoLiveStabilizationController.getHealth);

export const fiscalProductionPostGoLiveStabilizationRoutes = router;
