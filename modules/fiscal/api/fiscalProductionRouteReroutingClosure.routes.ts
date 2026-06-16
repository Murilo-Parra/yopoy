import { Router } from 'express';
import { FiscalProductionRouteReroutingClosureController } from './FiscalProductionRouteReroutingClosureController';

const router = Router();
const controller = new FiscalProductionRouteReroutingClosureController();

router.get('/policy', (req, res) => controller.getPolicy(req, res));
router.get('/closure-inventory', (req, res) => controller.getClosureInventory(req, res));
router.get('/rerouting-no-op-plan', (req, res) => controller.getReroutingNoOpPlan(req, res));
router.get('/legacy-fallback-no-op-plan', (req, res) => controller.getLegacyFallbackNoOpPlan(req, res));
router.get('/route-invariant-evidence', (req, res) => controller.getRouteInvariantEvidence(req, res));
router.get('/no-traffic-change-evidence', (req, res) => controller.getNoTrafficChangeEvidence(req, res));
router.get('/static-route-comparison-plan', (req, res) => controller.getStaticRouteComparisonPlan(req, res));
router.get('/route-reversion-matrix', (req, res) => controller.getRouteReversionMatrix(req, res));
router.get('/traffic-safety-matrix', (req, res) => controller.getTrafficSafetyMatrix(req, res));
router.get('/dependency-matrix', (req, res) => controller.getDependencyMatrix(req, res));
router.get('/blockers', (req, res) => controller.getBlockers(req, res));
router.get('/risks', (req, res) => controller.getRisks(req, res));
router.post('/validate', (req, res) => controller.validate(req, res));
router.post('/evaluate', (req, res) => controller.evaluate(req, res));
router.post('/simulate-decision', (req, res) => controller.simulateDecision(req, res));
router.get('/report', (req, res) => controller.getReport(req, res));
router.get('/audit', (req, res) => controller.getAudit(req, res));
router.get('/health', (req, res) => controller.getHealth(req, res));

export default router;
