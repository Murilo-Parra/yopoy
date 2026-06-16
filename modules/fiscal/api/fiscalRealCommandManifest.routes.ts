import { Router, Request, Response, NextFunction } from 'express';
import { FiscalRealCommandManifestController } from './FiscalRealCommandManifestController';
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

router.get('/policy', FiscalRealCommandManifestController.getPolicy);
router.get('/catalog', FiscalRealCommandManifestController.getCatalog);
router.get('/blockers', FiscalRealCommandManifestController.getBlockers);
router.get('/risks', FiscalRealCommandManifestController.getRisks);
router.post('/validate', FiscalRealCommandManifestController.validate);
router.post('/evaluate', FiscalRealCommandManifestController.evaluate);
router.post('/simulate-decision', FiscalRealCommandManifestController.simulateDecision);
router.get('/report', FiscalRealCommandManifestController.getReport);
router.get('/audit', FiscalRealCommandManifestController.getAudit);
router.get('/health', FiscalRealCommandManifestController.getHealth);

export { router as fiscalRealCommandManifestRoutes };
