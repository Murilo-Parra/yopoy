import { Router } from 'express';
import { FiscalProductionGoLiveRollbackController } from './FiscalProductionGoLiveRollbackController';

const router = Router();

router.get('/policy', FiscalProductionGoLiveRollbackController.getPolicy);
router.get('/rollback-no-op-blueprint', FiscalProductionGoLiveRollbackController.getRollbackNoOpBlueprint);
router.get('/cutover-abort-no-op-plan', FiscalProductionGoLiveRollbackController.getCutoverAbortNoOpPlan);
router.get('/legacy-fallback-safety-plan', FiscalProductionGoLiveRollbackController.getLegacyFallbackSafetyPlan);
router.get('/rollback-eligibility-simulation-matrix', FiscalProductionGoLiveRollbackController.getRollbackEligibilitySimulationMatrix);
router.get('/traffic-reversion-no-op-matrix', FiscalProductionGoLiveRollbackController.getTrafficReversionNoOpMatrix);
router.get('/v2-shutdown-no-op-matrix', FiscalProductionGoLiveRollbackController.getV2ShutdownNoOpMatrix);
router.get('/rollback-trigger-no-execute-matrix', FiscalProductionGoLiveRollbackController.getRollbackTriggerNoExecuteMatrix);
router.get('/post-abort-continuity-matrix', FiscalProductionGoLiveRollbackController.getPostAbortContinuityMatrix);
router.get('/no-real-rollback-evidence', FiscalProductionGoLiveRollbackController.getNoRealRollbackEvidence);
router.get('/no-real-fallback-evidence', FiscalProductionGoLiveRollbackController.getNoRealFallbackEvidence);
router.get('/dependency-matrix', FiscalProductionGoLiveRollbackController.getDependencyMatrix);
router.get('/blockers', FiscalProductionGoLiveRollbackController.getBlockers);
router.get('/risks', FiscalProductionGoLiveRollbackController.getRisks);
router.post('/validate', FiscalProductionGoLiveRollbackController.validate);
router.post('/evaluate', FiscalProductionGoLiveRollbackController.evaluate);
router.post('/simulate-decision', FiscalProductionGoLiveRollbackController.simulateDecision);
router.get('/report', FiscalProductionGoLiveRollbackController.getReport);
router.get('/audit', FiscalProductionGoLiveRollbackController.getAudit);
router.get('/health', FiscalProductionGoLiveRollbackController.getHealth);

export const fiscalProductionGoLiveRollbackRoutes = router;
