import { Router } from 'express';
import { FiscalProductionRollbackAbortController } from './FiscalProductionRollbackAbortController';
import { requireFiscalAuth } from './helpers';

const router = Router();
const controller = new FiscalProductionRollbackAbortController();

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
router.get('/rollback-matrix-simulation', (req, res) => controller.getRollbackMatrixSimulation(req, res));
router.get('/cutover-abort-no-op-plan', (req, res) => controller.getCutoverAbortNoOpPlan(req, res));
router.get('/rollback-scenario-catalog', (req, res) => controller.getRollbackScenarioCatalog(req, res));
router.get('/legacy-continuity-during-abort-plan', (req, res) => controller.getLegacyContinuityDuringAbortPlan(req, res));
router.get('/no-real-rollback-evidence', (req, res) => controller.getNoRealRollbackEvidence(req, res));
router.get('/traffic-recovery-no-op-matrix', (req, res) => controller.getTrafficRecoveryNoOpMatrix(req, res));
router.get('/rollback-safety-checklist', (req, res) => controller.getRollbackSafetyChecklist(req, res));
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
