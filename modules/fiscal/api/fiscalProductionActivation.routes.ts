import { Router, Request, Response, NextFunction } from 'express';
import { FiscalProductionActivationController } from './FiscalProductionActivationController';
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

router.get('/policy', FiscalProductionActivationController.getPolicy);
router.get('/blueprint', FiscalProductionActivationController.getBlueprint);
router.get('/release-contract', FiscalProductionActivationController.getReleaseContract);
router.get('/traffic-switch-plan', FiscalProductionActivationController.getTrafficSwitchPlan);
router.get('/canary-plan', FiscalProductionActivationController.getCanaryPlan);
router.get('/rollback-plan', FiscalProductionActivationController.getRollbackPlan);
router.get('/kill-switch-plan', FiscalProductionActivationController.getKillSwitchPlan);
router.get('/readiness-checklist', FiscalProductionActivationController.getReadinessChecklist);
router.get('/dependency-inventory', FiscalProductionActivationController.getDependencyInventory);
router.get('/blockers', FiscalProductionActivationController.getBlockers);
router.get('/risks', FiscalProductionActivationController.getRisks);
router.post('/validate', FiscalProductionActivationController.validate);
router.post('/evaluate', FiscalProductionActivationController.evaluate);
router.post('/simulate-decision', FiscalProductionActivationController.simulateDecision);
router.get('/report', FiscalProductionActivationController.getReport);
router.get('/audit', FiscalProductionActivationController.getAudit);
router.get('/health', FiscalProductionActivationController.getHealth);

export default router;
