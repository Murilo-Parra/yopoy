import { Router, Request, Response, NextFunction } from 'express';
import { FiscalRealUnlockController } from './FiscalRealUnlockController';
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

router.get('/policy', FiscalRealUnlockController.getPolicy);
router.get('/eligibility-checklist', FiscalRealUnlockController.getEligibilityChecklist);
router.get('/dual-approval-matrix', FiscalRealUnlockController.getDualApprovalMatrix);
router.get('/blockers', FiscalRealUnlockController.getBlockers);
router.get('/risks', FiscalRealUnlockController.getRisks);
router.post('/evaluate', FiscalRealUnlockController.evaluate);
router.post('/simulate-dual-approval', FiscalRealUnlockController.simulateDualApproval);
router.get('/report', FiscalRealUnlockController.getReport);
router.get('/audit', FiscalRealUnlockController.getAudit);
router.get('/health', FiscalRealUnlockController.getHealth);

export { router as fiscalRealUnlockRoutes };
