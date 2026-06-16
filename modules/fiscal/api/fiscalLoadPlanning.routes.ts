import { Router, Request, Response, NextFunction } from 'express';
import { FiscalLoadPlanningController } from './FiscalLoadPlanningController';
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

router.get('/scenarios', FiscalLoadPlanningController.getScenarios);
router.get('/guardrails', FiscalLoadPlanningController.getGuardrails);
router.get('/risks', FiscalLoadPlanningController.getRisks);
router.post('/estimate', FiscalLoadPlanningController.estimate);
router.get('/report', FiscalLoadPlanningController.getReport);
router.get('/audit', FiscalLoadPlanningController.getAudit);
router.get('/health', FiscalLoadPlanningController.getHealth);

export { router as fiscalLoadPlanningRoutes };
