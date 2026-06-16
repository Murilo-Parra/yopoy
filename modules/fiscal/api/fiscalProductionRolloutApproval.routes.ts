import { Router } from 'express';
import { FiscalProductionRolloutApprovalController } from './FiscalProductionRolloutApprovalController';
import { requireFiscalAuth } from './helpers';

const router = Router();
const controller = new FiscalProductionRolloutApprovalController();

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
router.get('/rollout-approval-matrix', (req, res) => controller.getRolloutApprovalMatrix(req, res));
router.get('/final-release-verification-plan', (req, res) => controller.getFinalReleaseVerificationPlan(req, res));
router.get('/release-readiness-no-op-review', (req, res) => controller.getReleaseReadinessNoOpReview(req, res));
router.get('/canary-rollout-no-op-plan', (req, res) => controller.getCanaryRolloutNoOpPlan(req, res));
router.get('/rollout-percentage-no-op-matrix', (req, res) => controller.getRolloutPercentageNoOpMatrix(req, res));
router.get('/golive-verification-no-op-evidence', (req, res) => controller.getGoLiveVerificationNoOpEvidence(req, res));
router.get('/no-traffic-promotion-evidence', (req, res) => controller.getNoTrafficPromotionEvidence(req, res));
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
