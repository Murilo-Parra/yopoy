import { Router, Request, Response, NextFunction } from 'express';
import { FiscalDedicatedReplayController } from './FiscalDedicatedReplayController';
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

router.get('/policy', FiscalDedicatedReplayController.getPolicy);
router.get('/scenarios', FiscalDedicatedReplayController.getScenarios);
router.post('/validate', FiscalDedicatedReplayController.validate);
router.post('/enqueue', FiscalDedicatedReplayController.enqueue);
router.get('/queue', FiscalDedicatedReplayController.getQueue);
router.post('/run-one', FiscalDedicatedReplayController.runOne);
router.post('/run-batch', FiscalDedicatedReplayController.runBatch);
router.post('/compare-shape', FiscalDedicatedReplayController.compareShape);
router.get('/report', FiscalDedicatedReplayController.getReport);
router.get('/audit', FiscalDedicatedReplayController.getAudit);
router.get('/health', FiscalDedicatedReplayController.getHealth);

export { router as fiscalDedicatedReplayRoutes };
