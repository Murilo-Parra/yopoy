import { Router } from 'express';
import { FiscalProductionProxyShadowController } from './FiscalProductionProxyShadowController';

const router = Router();

router.get('/policy', FiscalProductionProxyShadowController.getPolicy);
router.get('/proxy-middleware-no-install-blueprint', FiscalProductionProxyShadowController.getProxyMiddlewareNoInstallBlueprint);
router.get('/tap-mirror-sniffer-no-activation-plan', FiscalProductionProxyShadowController.getTapMirrorSnifferNoActivationPlan);
router.get('/shadow-traffic-no-capture-blueprint', FiscalProductionProxyShadowController.getShadowTrafficNoCaptureBlueprint);
router.get('/request-response-no-capture-matrix', FiscalProductionProxyShadowController.getRequestResponseNoCaptureMatrix);
router.get('/payload-duplication-no-op-plan', FiscalProductionProxyShadowController.getPayloadDuplicationNoOpPlan);
router.get('/legacy-handler-no-side-effect-plan', FiscalProductionProxyShadowController.getLegacyHandlerNoSideEffectPlan);
router.get('/v2-handler-no-call-plan', FiscalProductionProxyShadowController.getV2HandlerNoCallPlan);
router.get('/traffic-mirror-no-mutation-evidence', FiscalProductionProxyShadowController.getTrafficMirrorNoMutationEvidence);
router.get('/proxy-shadow-boundary-matrix', FiscalProductionProxyShadowController.getProxyShadowBoundaryMatrix);
router.get('/dependency-matrix', FiscalProductionProxyShadowController.getDependencyMatrix);
router.get('/blockers', FiscalProductionProxyShadowController.getBlockers);
router.get('/risks', FiscalProductionProxyShadowController.getRisks);
router.post('/validate', FiscalProductionProxyShadowController.validate);
router.post('/evaluate', FiscalProductionProxyShadowController.evaluate);
router.post('/simulate-decision', FiscalProductionProxyShadowController.simulateDecision);
router.get('/report', FiscalProductionProxyShadowController.getReport);
router.get('/audit', FiscalProductionProxyShadowController.getAudit);
router.get('/health', FiscalProductionProxyShadowController.getHealth);

export const fiscalProductionProxyShadowRoutes = router;
