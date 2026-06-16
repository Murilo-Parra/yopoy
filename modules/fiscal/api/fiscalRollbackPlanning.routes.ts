import { Router, Request, Response, NextFunction } from 'express';
import { FiscalRollbackPlanningController } from './FiscalRollbackPlanningController';
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

router.get('/plan', FiscalRollbackPlanningController.getRollbackPlan);
router.get('/circuit-breaker', FiscalRollbackPlanningController.getCircuitBreakerPlan);
router.get('/kill-switch', FiscalRollbackPlanningController.getKillSwitchPlan);
router.get('/sefaz-homologation', FiscalRollbackPlanningController.getSefazHomologationPlan);
router.get('/risks', FiscalRollbackPlanningController.getRisks);
router.post('/evaluate', FiscalRollbackPlanningController.evaluate);
router.get('/handoff', FiscalRollbackPlanningController.getHandoff);
router.get('/final-report', FiscalRollbackPlanningController.getFinalReport);
router.get('/audit', FiscalRollbackPlanningController.getAudit);
router.get('/health', FiscalRollbackPlanningController.getHealth);

export { router as fiscalRollbackPlanningRoutes };
