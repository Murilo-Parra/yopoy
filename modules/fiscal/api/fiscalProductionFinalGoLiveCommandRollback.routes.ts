import { Router } from 'express';
import { FiscalProductionFinalGoLiveCommandRollbackController } from './FiscalProductionFinalGoLiveCommandRollbackController';

const router = Router();

router.get('/policy', FiscalProductionFinalGoLiveCommandRollbackController.getPolicy);
router.get('/command-rollback-scenario-blueprint', FiscalProductionFinalGoLiveCommandRollbackController.getCommandRollbackScenarioBlueprint);
router.get('/command-abort-path-no-op-plan', FiscalProductionFinalGoLiveCommandRollbackController.getCommandAbortPathNoOpPlan);
router.get('/post-command-event-horizon-simulation-matrix', FiscalProductionFinalGoLiveCommandRollbackController.getPostCommandEventHorizonSimulationMatrix);
router.get('/rollback-execution-denial-matrix', FiscalProductionFinalGoLiveCommandRollbackController.getRollbackExecutionDenialMatrix);
router.get('/abort-execution-denial-matrix', FiscalProductionFinalGoLiveCommandRollbackController.getAbortExecutionDenialMatrix);
router.get('/fallback-execution-denial-plan', FiscalProductionFinalGoLiveCommandRollbackController.getFallbackExecutionDenialPlan);
router.get('/traffic-reversion-denial-matrix', FiscalProductionFinalGoLiveCommandRollbackController.getTrafficReversionDenialMatrix);
router.get('/runtime-containment-denial-plan', FiscalProductionFinalGoLiveCommandRollbackController.getRuntimeContainmentDenialPlan);
router.get('/emergency-hold-no-activation-plan', FiscalProductionFinalGoLiveCommandRollbackController.getEmergencyHoldNoActivationPlan);
router.get('/legacy-continuity-after-denied-command-plan', FiscalProductionFinalGoLiveCommandRollbackController.getLegacyContinuityAfterDeniedCommandPlan);
router.get('/v2-shutdown-no-execute-matrix', FiscalProductionFinalGoLiveCommandRollbackController.getV2ShutdownNoExecuteMatrix);
router.get('/no-real-rollback-from-command-evidence', FiscalProductionFinalGoLiveCommandRollbackController.getNoRealRollbackFromCommandEvidence);
router.get('/no-real-abort-from-command-evidence', FiscalProductionFinalGoLiveCommandRollbackController.getNoRealAbortFromCommandEvidence);
router.get('/no-real-fallback-from-command-evidence', FiscalProductionFinalGoLiveCommandRollbackController.getNoRealFallbackFromCommandEvidence);
router.get('/no-real-traffic-reversion-evidence', FiscalProductionFinalGoLiveCommandRollbackController.getNoRealTrafficReversionEvidence);
router.get('/dependency-matrix', FiscalProductionFinalGoLiveCommandRollbackController.getDependencyMatrix);
router.get('/blockers', FiscalProductionFinalGoLiveCommandRollbackController.getBlockers);
router.get('/risks', FiscalProductionFinalGoLiveCommandRollbackController.getRisks);
router.post('/validate', FiscalProductionFinalGoLiveCommandRollbackController.validate);
router.post('/evaluate', FiscalProductionFinalGoLiveCommandRollbackController.evaluate);
router.post('/simulate-decision', FiscalProductionFinalGoLiveCommandRollbackController.simulateDecision);
router.get('/report', FiscalProductionFinalGoLiveCommandRollbackController.getReport);
router.get('/audit', FiscalProductionFinalGoLiveCommandRollbackController.getAudit);
router.get('/health', FiscalProductionFinalGoLiveCommandRollbackController.getHealth);

export const fiscalProductionFinalGoLiveCommandRollbackRoutes = router;
