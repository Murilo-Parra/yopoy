import { Router } from 'express';
import { FiscalProductionRoutePromotionController } from './FiscalProductionRoutePromotionController';

const router = Router();

router.get('/policy', FiscalProductionRoutePromotionController.getPolicy);
router.get('/route-promotion-no-op-blueprint', FiscalProductionRoutePromotionController.getRoutePromotionNoOpBlueprint);
router.get('/traffic-slice-simulation-matrix', FiscalProductionRoutePromotionController.getTrafficSliceSimulationMatrix);
router.get('/canary-routing-no-activation-plan', FiscalProductionRoutePromotionController.getCanaryRoutingNoActivationPlan);
router.get('/traffic-percentage-no-mutation-matrix', FiscalProductionRoutePromotionController.getTrafficPercentageNoMutationMatrix);
router.get('/route-to-v2-blocked-evidence', FiscalProductionRoutePromotionController.getRouteToV2BlockedEvidence);
router.get('/legacy-route-mandatory-plan', FiscalProductionRoutePromotionController.getLegacyRouteMandatoryPlan);
router.get('/canary-abort-no-op-matrix', FiscalProductionRoutePromotionController.getCanaryAbortNoOpMatrix);
router.get('/traffic-promotion-criteria-simulation', FiscalProductionRoutePromotionController.getTrafficPromotionCriteriaSimulation);
router.get('/no-real-route-promotion-evidence', FiscalProductionRoutePromotionController.getNoRealRoutePromotionEvidence);
router.get('/no-real-canary-routing-evidence', FiscalProductionRoutePromotionController.getNoRealCanaryRoutingEvidence);
router.get('/dependency-matrix', FiscalProductionRoutePromotionController.getDependencyMatrix);
router.get('/blockers', FiscalProductionRoutePromotionController.getBlockers);
router.get('/risks', FiscalProductionRoutePromotionController.getRisks);
router.post('/validate', FiscalProductionRoutePromotionController.validate);
router.post('/evaluate', FiscalProductionRoutePromotionController.evaluate);
router.post('/simulate-decision', FiscalProductionRoutePromotionController.simulateDecision);
router.get('/report', FiscalProductionRoutePromotionController.getReport);
router.get('/audit', FiscalProductionRoutePromotionController.getAudit);
router.get('/health', FiscalProductionRoutePromotionController.getHealth);

export const fiscalProductionRoutePromotionRoutes = router;
