import { Router } from 'express';
import { FiscalProductionTrafficArchitectureController } from './FiscalProductionTrafficArchitectureController';

const router = Router();

router.get('/policy', FiscalProductionTrafficArchitectureController.getPolicy);
router.get('/traffic-architecture-governance-blueprint', FiscalProductionTrafficArchitectureController.getTrafficArchitectureGovernanceBlueprint);
router.get('/hard-no-routing-execution-contract', FiscalProductionTrafficArchitectureController.getHardNoRoutingExecutionContract);
router.get('/traffic-topology-inventory', FiscalProductionTrafficArchitectureController.getTrafficTopologyInventory);
router.get('/legacy-route-preservation-plan', FiscalProductionTrafficArchitectureController.getLegacyRoutePreservationPlan);
router.get('/v2-route-locked-plan', FiscalProductionTrafficArchitectureController.getV2RouteLockedPlan);
router.get('/load-balancer-no-change-plan', FiscalProductionTrafficArchitectureController.getLoadBalancerNoChangePlan);
router.get('/dns-no-change-plan', FiscalProductionTrafficArchitectureController.getDnsNoChangePlan);
router.get('/proxy-middleware-no-install-plan', FiscalProductionTrafficArchitectureController.getProxyMiddlewareNoInstallPlan);
router.get('/shadow-traffic-no-activation-plan', FiscalProductionTrafficArchitectureController.getShadowTrafficNoActivationPlan);
router.get('/traffic-mutation-block-matrix', FiscalProductionTrafficArchitectureController.getTrafficMutationBlockMatrix);
router.get('/routing-execution-boundary-matrix', FiscalProductionTrafficArchitectureController.getRoutingExecutionBoundaryMatrix);
router.get('/dependency-matrix', FiscalProductionTrafficArchitectureController.getDependencyMatrix);
router.get('/blockers', FiscalProductionTrafficArchitectureController.getBlockers);
router.get('/risks', FiscalProductionTrafficArchitectureController.getRisks);
router.post('/validate', FiscalProductionTrafficArchitectureController.validate);
router.post('/evaluate', FiscalProductionTrafficArchitectureController.evaluate);
router.post('/simulate-decision', FiscalProductionTrafficArchitectureController.simulateDecision);
router.get('/report', FiscalProductionTrafficArchitectureController.getReport);
router.get('/audit', FiscalProductionTrafficArchitectureController.getAudit);
router.get('/health', FiscalProductionTrafficArchitectureController.getHealth);

export const fiscalProductionTrafficArchitectureRoutes = router;
