import { Router, Request, Response, NextFunction } from 'express';
import { FiscalRouteCutoverController } from './FiscalRouteCutoverController';
import { requireFiscalAuth } from './helpers';

const router = Router();

function requireAdminRole(req: Request, res: Response, next: NextFunction) {
  const session = (req as any).session;
  const user = (req as any).user;
  
  const isAdmin = session?.is_admin === true || session?.is_admin === 1 || 
                  user?.is_admin === true || user?.is_admin === 1 || 
                  session?.role === 'Proprietário' || session?.role === 'Administrador' ||
                  user?.role === 'Proprietário' || user?.role === 'Administrador';
  
  if (!isAdmin) {
    res.status(403).json({ error: 'Acesso restrito. Privilégios administrativos necessários.' });
    return;
  }
  next();
}

router.use(requireFiscalAuth);
router.use(requireAdminRole);

router.get('/policy', FiscalRouteCutoverController.getPolicy);
router.get('/cutover-window-plan', FiscalRouteCutoverController.getCutoverWindowPlan);
router.get('/cutover-simulation-plan', FiscalRouteCutoverController.getCutoverSimulationPlan);
router.get('/legacy-fallback-governance', FiscalRouteCutoverController.getLegacyFallbackGovernance);
router.get('/shadow-rollback-plan', FiscalRouteCutoverController.getShadowRollbackPlan);
router.get('/abort-criteria', FiscalRouteCutoverController.getAbortCriteria);
router.get('/decision-matrix', FiscalRouteCutoverController.getDecisionMatrix);
router.get('/readiness-checklist', FiscalRouteCutoverController.getReadinessChecklist);
router.get('/dependency-matrix', FiscalRouteCutoverController.getDependencyMatrix);
router.get('/blockers', FiscalRouteCutoverController.getBlockers);
router.get('/risks', FiscalRouteCutoverController.getRisks);
router.post('/validate', FiscalRouteCutoverController.validate);
router.post('/evaluate', FiscalRouteCutoverController.evaluate);
router.post('/simulate-decision', FiscalRouteCutoverController.simulateDecision);
router.get('/report', FiscalRouteCutoverController.getReport);
router.get('/audit', FiscalRouteCutoverController.getAudit);
router.get('/health', FiscalRouteCutoverController.getHealth);

export default router;
