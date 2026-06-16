import { Router } from 'express';
import { FiscalProductionGoLiveCutoverController } from './FiscalProductionGoLiveCutoverController';

const router = Router();

router.get('/policy', FiscalProductionGoLiveCutoverController.getPolicy);
router.get('/initialization-blueprint', FiscalProductionGoLiveCutoverController.getInitializationBlueprint);
router.get('/activation-execution-boundary-no-op-contract', FiscalProductionGoLiveCutoverController.getActivationExecutionBoundaryNoOpContract);
router.get('/cutover-initiation-readiness-matrix', FiscalProductionGoLiveCutoverController.getCutoverInitiationReadinessMatrix);
router.get('/activation-precondition-simulation-matrix', FiscalProductionGoLiveCutoverController.getActivationPreconditionSimulationMatrix);
router.get('/legacy-continuity-during-go-live-plan', FiscalProductionGoLiveCutoverController.getLegacyContinuityDuringGoLivePlan);
router.get('/v2-activation-blocked-plan', FiscalProductionGoLiveCutoverController.getV2ActivationBlockedPlan);
router.get('/traffic-switch-no-op-matrix', FiscalProductionGoLiveCutoverController.getTrafficSwitchNoOpMatrix);
router.get('/execution-authority-no-grant-matrix', FiscalProductionGoLiveCutoverController.getExecutionAuthorityNoGrantMatrix);
router.get('/no-real-activation-evidence', FiscalProductionGoLiveCutoverController.getNoRealActivationEvidence);
router.get('/no-real-cutover-evidence', FiscalProductionGoLiveCutoverController.getNoRealCutoverEvidence);
router.get('/dependency-matrix', FiscalProductionGoLiveCutoverController.getDependencyMatrix);
router.get('/blockers', FiscalProductionGoLiveCutoverController.getBlockers);
router.get('/risks', FiscalProductionGoLiveCutoverController.getRisks);
router.post('/validate', FiscalProductionGoLiveCutoverController.validate);
router.post('/evaluate', FiscalProductionGoLiveCutoverController.evaluate);
router.post('/simulate-decision', FiscalProductionGoLiveCutoverController.simulateDecision);
router.get('/report', FiscalProductionGoLiveCutoverController.getReport);
router.get('/audit', FiscalProductionGoLiveCutoverController.getAudit);
router.get('/health', FiscalProductionGoLiveCutoverController.getHealth);

export const fiscalProductionGoLiveCutoverRoutes = router;
