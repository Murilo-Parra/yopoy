import { Router, Request, Response, NextFunction } from 'express';
import { FiscalReleaseGateController } from './FiscalReleaseGateController';
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

router.get('/signals', FiscalReleaseGateController.getSignals);
router.get('/criteria', FiscalReleaseGateController.getCriteria);
router.get('/risks', FiscalReleaseGateController.getRisks);
router.post('/evaluate', FiscalReleaseGateController.evaluate);
router.get('/handoff', FiscalReleaseGateController.getHandoff);
router.get('/final-report', FiscalReleaseGateController.getFinalReport);
router.get('/audit', FiscalReleaseGateController.getAudit);
router.get('/health', FiscalReleaseGateController.getHealth);

export { router as fiscalReleaseGateRoutes };
