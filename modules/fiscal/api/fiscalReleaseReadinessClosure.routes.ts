import { Router, Request, Response, NextFunction } from 'express';
import { FiscalReleaseReadinessClosureController } from './FiscalReleaseReadinessClosureController';
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

router.get('/inventory', FiscalReleaseReadinessClosureController.getInventory);
router.get('/criteria', FiscalReleaseReadinessClosureController.getCriteria);
router.get('/evidence', FiscalReleaseReadinessClosureController.getEvidence);
router.get('/risks', FiscalReleaseReadinessClosureController.getRisks);
router.get('/handoff', FiscalReleaseReadinessClosureController.getHandoff);
router.get('/final-report', FiscalReleaseReadinessClosureController.getFinalReport);
router.get('/audit', FiscalReleaseReadinessClosureController.getAudit);
router.get('/health', FiscalReleaseReadinessClosureController.getHealth);

export { router as fiscalReleaseReadinessClosureRoutes };
