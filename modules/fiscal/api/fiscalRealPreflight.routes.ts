import { Router, Request, Response, NextFunction } from 'express';
import { FiscalRealPreflightController } from './FiscalRealPreflightController';
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

router.get('/policy', FiscalRealPreflightController.getPolicy);
router.get('/evidence-inventory', FiscalRealPreflightController.getEvidenceInventory);
router.get('/checklist', FiscalRealPreflightController.getChecklist);
router.get('/blockers', FiscalRealPreflightController.getBlockers);
router.get('/risks', FiscalRealPreflightController.getRisks);
router.get('/evidence-package', FiscalRealPreflightController.getEvidencePackage);
router.post('/evaluate', FiscalRealPreflightController.evaluate);
router.post('/simulate-review', FiscalRealPreflightController.simulateReview);
router.get('/report', FiscalRealPreflightController.getReport);
router.get('/audit', FiscalRealPreflightController.getAudit);
router.get('/health', FiscalRealPreflightController.getHealth);

export { router as fiscalRealPreflightRoutes };
