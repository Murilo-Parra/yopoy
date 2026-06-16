import { Router, Request, Response, NextFunction } from 'express';
import { FiscalProductionRollbackKillSwitchController } from './FiscalProductionRollbackKillSwitchController';
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

// Exigir autenticação e papel administrativo
router.use(requireFiscalAuth);
router.use(requireAdminRole);

router.get('/policy', FiscalProductionRollbackKillSwitchController.getPolicy);
router.get('/rollback-plan', FiscalProductionRollbackKillSwitchController.getRollbackPlan);
router.get('/kill-switch-plan', FiscalProductionRollbackKillSwitchController.getKillSwitchPlan);
router.get('/legacy-fallback-plan', FiscalProductionRollbackKillSwitchController.getLegacyFallbackPlan);
router.get('/release-freeze-plan', FiscalProductionRollbackKillSwitchController.getReleaseFreezePlan);
router.get('/traffic-reversion-plan', FiscalProductionRollbackKillSwitchController.getTrafficReversionPlan);
router.get('/dependency-matrix', FiscalProductionRollbackKillSwitchController.getDependencyMatrix);
router.get('/readiness-matrix', FiscalProductionRollbackKillSwitchController.getReadinessMatrix);
router.get('/blockers', FiscalProductionRollbackKillSwitchController.getBlockers);
router.get('/risks', FiscalProductionRollbackKillSwitchController.getRisks);
router.post('/validate', FiscalProductionRollbackKillSwitchController.validate);
router.post('/evaluate', FiscalProductionRollbackKillSwitchController.evaluate);
router.post('/simulate-decision', FiscalProductionRollbackKillSwitchController.simulateDecision);
router.get('/report', FiscalProductionRollbackKillSwitchController.getReport);
router.get('/audit', FiscalProductionRollbackKillSwitchController.getAudit);
router.get('/health', FiscalProductionRollbackKillSwitchController.getHealth);

export default router;
