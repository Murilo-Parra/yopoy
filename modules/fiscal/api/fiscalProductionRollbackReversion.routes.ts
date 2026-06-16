import { Router } from 'express';
import { FiscalProductionRollbackReversionController } from './FiscalProductionRollbackReversionController';
import { requireFiscalAuth } from './helpers';

const router = Router();
const controller = new FiscalProductionRollbackReversionController();

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
router.get('/rollback-simulation-matrix', (req, res) => controller.getRollbackSimulationMatrix(req, res));
router.get('/abort-no-op-plan', (req, res) => controller.getAbortNoOpPlan(req, res));
router.get('/legacy-reversion-no-op-plan', (req, res) => controller.getLegacyReversionNoOpPlan(req, res));
router.get('/reversion-path-safety-matrix', (req, res) => controller.getReversionPathSafetyMatrix(req, res));
router.get('/post-abort-legacy-continuity-plan', (req, res) => controller.getPostAbortLegacyContinuityPlan(req, res));
router.get('/no-traffic-mutation-evidence', (req, res) => controller.getNoTrafficMutationEvidence(req, res));
router.get('/no-real-rollback-execution-evidence', (req, res) => controller.getNoRealRollbackExecutionEvidence(req, res));
router.get('/rollback-recovery-no-op-matrix', (req, res) => controller.getRollbackRecoveryNoOpMatrix(req, res));
router.get('/rollback-abort-criteria', (req, res) => controller.getRollbackAbortCriteria(req, res));
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
