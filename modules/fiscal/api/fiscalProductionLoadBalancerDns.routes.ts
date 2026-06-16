import { Router } from 'express';
import { FiscalProductionLoadBalancerDnsController } from './FiscalProductionLoadBalancerDnsController';

const router = Router();

router.get('/policy', FiscalProductionLoadBalancerDnsController.getPolicy);
router.get('/load-balancer-blueprint', FiscalProductionLoadBalancerDnsController.getLoadBalancerBlueprint);
router.get('/dns-blueprint', FiscalProductionLoadBalancerDnsController.getDnsBlueprint);
router.get('/load-balancer-evidence', FiscalProductionLoadBalancerDnsController.getLoadBalancerEvidence);
router.get('/dns-evidence', FiscalProductionLoadBalancerDnsController.getDnsEvidence);
router.get('/routing-target-matrix', FiscalProductionLoadBalancerDnsController.getRoutingTargetMatrix);
router.get('/legacy-continuity-matrix', FiscalProductionLoadBalancerDnsController.getLegacyContinuityMatrix);
router.get('/v2-no-activation-matrix', FiscalProductionLoadBalancerDnsController.getV2NoActivationMatrix);
router.get('/gateway-plan', FiscalProductionLoadBalancerDnsController.getGatewayPlan);
router.get('/network-record-plan', FiscalProductionLoadBalancerDnsController.getNetworkRecordPlan);
router.get('/dependency-matrix', FiscalProductionLoadBalancerDnsController.getDependencyMatrix);
router.get('/blockers', FiscalProductionLoadBalancerDnsController.getBlockers);
router.get('/risks', FiscalProductionLoadBalancerDnsController.getRisks);
router.post('/validate', FiscalProductionLoadBalancerDnsController.validate);
router.post('/evaluate', FiscalProductionLoadBalancerDnsController.evaluate);
router.post('/simulate-decision', FiscalProductionLoadBalancerDnsController.simulateDecision);
router.get('/report', FiscalProductionLoadBalancerDnsController.getReport);
router.get('/audit', FiscalProductionLoadBalancerDnsController.getAudit);
router.get('/health', FiscalProductionLoadBalancerDnsController.getHealth);

export const fiscalProductionLoadBalancerDnsRoutes = router;
