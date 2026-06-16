import { Router } from 'express';
import { FiscalProductionTrafficRoutingController } from './FiscalProductionTrafficRoutingController';

const router = Router();

router.get('/policy', FiscalProductionTrafficRoutingController.getPolicy);
router.get('/traffic-routing-no-op-blueprint', FiscalProductionTrafficRoutingController.getTrafficRoutingNoOpBlueprint);
router.get('/load-balancer-switch-no-op-contract', FiscalProductionTrafficRoutingController.getLoadBalancerSwitchNoOpContract);
router.get('/route-mapping-simulation-matrix', FiscalProductionTrafficRoutingController.getRouteMappingSimulationMatrix);
router.get('/dns-routing-no-change-plan', FiscalProductionTrafficRoutingController.getDnsRoutingNoChangePlan);
router.get('/proxy-middleware-tap-no-install-matrix', FiscalProductionTrafficRoutingController.getProxyMiddlewareTapNoInstallMatrix);
router.get('/shadow-traffic-no-capture-plan', FiscalProductionTrafficRoutingController.getShadowTrafficNoCapturePlan);
router.get('/traffic-slice-simulation-matrix', FiscalProductionTrafficRoutingController.getTrafficSliceSimulationMatrix);
router.get('/legacy-priority-preservation-plan', FiscalProductionTrafficRoutingController.getLegacyPriorityPreservationPlan);
router.get('/no-traffic-mutation-evidence', FiscalProductionTrafficRoutingController.getNoTrafficMutationEvidence);
router.get('/no-load-balancer-switch-evidence', FiscalProductionTrafficRoutingController.getNoLoadBalancerSwitchEvidence);
router.get('/dependency-matrix', FiscalProductionTrafficRoutingController.getDependencyMatrix);
router.get('/blockers', FiscalProductionTrafficRoutingController.getBlockers);
router.get('/risks', FiscalProductionTrafficRoutingController.getRisks);
router.post('/validate', FiscalProductionTrafficRoutingController.validate);
router.post('/evaluate', FiscalProductionTrafficRoutingController.evaluate);
router.post('/simulate-decision', FiscalProductionTrafficRoutingController.simulateDecision);
router.get('/report', FiscalProductionTrafficRoutingController.getReport);
router.get('/audit', FiscalProductionTrafficRoutingController.getAudit);
router.get('/health', FiscalProductionTrafficRoutingController.getHealth);

export const fiscalProductionTrafficRoutingRoutes = router;
