import { Router, Request, Response, NextFunction } from 'express';
import { FiscalRealAuthorizationClosureController } from './FiscalRealAuthorizationClosureController';
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

router.get('/inventory', FiscalRealAuthorizationClosureController.getInventory);
router.get('/final-checklist', FiscalRealAuthorizationClosureController.getFinalChecklist);
router.get('/evidence-package', FiscalRealAuthorizationClosureController.getEvidencePackage);
router.get('/blockers', FiscalRealAuthorizationClosureController.getBlockers);
router.get('/risks', FiscalRealAuthorizationClosureController.getRisks);
router.get('/handoff', FiscalRealAuthorizationClosureController.getHandoff);
router.get('/report', FiscalRealAuthorizationClosureController.getReport);
router.get('/audit', FiscalRealAuthorizationClosureController.getAudit);
router.get('/health', FiscalRealAuthorizationClosureController.getHealth);

export { router as fiscalRealAuthorizationClosureRoutes };
