import { Router, Request, Response, NextFunction } from 'express';
import { FiscalLoadRunnerController } from './FiscalLoadRunnerController';
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

router.get('/blueprint', FiscalLoadRunnerController.getBlueprint);
router.get('/guardrails', FiscalLoadRunnerController.getGuardrails);
router.post('/plan-batch', FiscalLoadRunnerController.planBatch);
router.post('/simulate-decision', FiscalLoadRunnerController.simulateDecision);
router.get('/report', FiscalLoadRunnerController.getReport);
router.get('/audit', FiscalLoadRunnerController.getAudit);
router.get('/health', FiscalLoadRunnerController.getHealth);

export { router as fiscalLoadRunnerRoutes };
