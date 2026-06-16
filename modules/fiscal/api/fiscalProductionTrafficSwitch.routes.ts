import { Router } from 'express';
import { FiscalProductionTrafficSwitchController } from './FiscalProductionTrafficSwitchController';
import { requireFiscalAuth } from './helpers';

const router = Router();
const controller = new FiscalProductionTrafficSwitchController();

function requireAdminRole(req: any, res: any, next: any) {
  const session = req.session;
  const user = req.user;
  
  const isAdmin = session?.is_admin === true || session?.is_admin === 1 || 
                  user?.is_admin === true || user?.is_admin === 1 || 
                  session?.role === 'Proprietário' || session?.role === 'Administrador' ||
                  user?.role === 'Proprietário' || user?.role === 'Administrador';
  
  if (!isAdmin) {
    return res.status(403).json({ error: 'Acesso restrito. Privilégios administrativos necessários.' });
  }
  next();
}

router.use(requireFiscalAuth);
router.use(requireAdminRole);

router.get('/policy', (req, res) => controller.getPolicy(req, res));
router.get('/traffic-switch-readiness-simulation', (req, res) => controller.getTrafficSwitchReadinessSimulation(req, res));
router.get('/route-activation-gate-no-op-plan', (req, res) => controller.getRouteActivationGateNoOpPlan(req, res));
router.get('/legacy-continuity-no-op-plan', (req, res) => controller.getLegacyContinuityNoOpPlan(req, res));
router.get('/v2-route-activation-no-op-plan', (req, res) => controller.getV2RouteActivationNoOpPlan(req, res));
router.get('/traffic-percentage-ramp-simulation', (req, res) => controller.getTrafficPercentageRampSimulation(req, res));
router.get('/canary-traffic-promotion-no-op-matrix', (req, res) => controller.getCanaryTrafficPromotionNoOpMatrix(req, res));
router.get('/reversible-golive-no-op-plan', (req, res) => controller.getReversibleGoLiveNoOpPlan(req, res));
router.get('/traffic-abort-reversion-matrix', (req, res) => controller.getTrafficAbortReversionMatrix(req, res));
router.get('/no-traffic-mutation-evidence', (req, res) => controller.getNoTrafficMutationEvidence(req, res));
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
