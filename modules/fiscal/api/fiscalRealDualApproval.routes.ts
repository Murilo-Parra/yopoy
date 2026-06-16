import { Router, Request, Response, NextFunction } from 'express';
import { FiscalRealDualApprovalController } from './FiscalRealDualApprovalController';
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

router.get('/policy', FiscalRealDualApprovalController.getPolicy);
router.get('/matrix', FiscalRealDualApprovalController.getMatrix);
router.get('/sod-review', FiscalRealDualApprovalController.getSodReview);
router.get('/blockers', FiscalRealDualApprovalController.getBlockers);
router.get('/risks', FiscalRealDualApprovalController.getRisks);
router.post('/validate', FiscalRealDualApprovalController.validate);
router.post('/simulate', FiscalRealDualApprovalController.simulate);
router.post('/evaluate', FiscalRealDualApprovalController.evaluate);
router.post('/simulate-decision', FiscalRealDualApprovalController.simulateDecision);
router.get('/report', FiscalRealDualApprovalController.getReport);
router.get('/audit', FiscalRealDualApprovalController.getAudit);
router.get('/health', FiscalRealDualApprovalController.getHealth);

export { router as fiscalRealDualApprovalRoutes };
