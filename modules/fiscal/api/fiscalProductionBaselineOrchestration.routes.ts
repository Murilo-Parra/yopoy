import { Router } from 'express';
import { FiscalProductionBaselineOrchestrationController } from './FiscalProductionBaselineOrchestrationController';
import { requireFiscalAuth } from './helpers';

const router = Router();
const controller = new FiscalProductionBaselineOrchestrationController();

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
router.get('/cutover-orchestration-no-op-plan', (req, res) => controller.getCutoverOrchestrationNoOpPlan(req, res));
router.get('/endpoint-rollout-no-op-plan', (req, res) => controller.getEndpointRolloutNoOpPlan(req, res));
router.get('/route-promotion-no-op-plan', (req, res) => controller.getRoutePromotionNoOpPlan(req, res));
router.get('/traffic-slice-no-op-matrix', (req, res) => controller.getTrafficSliceNoOpMatrix(req, res));
router.get('/legacy-fallback-orchestration-plan', (req, res) => controller.getLegacyFallbackOrchestrationPlan(req, res));
router.get('/rollback-orchestration-no-op-plan', (req, res) => controller.getRollbackOrchestrationNoOpPlan(req, res));
router.get('/operational-sequence-no-op-matrix', (req, res) => controller.getOperationalSequenceNoOpMatrix(req, res));
router.get('/endpoint-readiness-no-call-evidence', (req, res) => controller.getEndpointReadinessNoCallEvidence(req, res));
router.get('/no-runtime-execution-evidence', (req, res) => controller.getNoRuntimeExecutionEvidence(req, res));
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
