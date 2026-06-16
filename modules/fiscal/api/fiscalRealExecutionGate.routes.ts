import { Router, Request, Response, NextFunction } from 'express';
import { FiscalRealExecutionGateController } from './FiscalRealExecutionGateController';
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

router.get('/policy', FiscalRealExecutionGateController.getPolicy);
router.get('/pre-lock-checklist', FiscalRealExecutionGateController.getPreLockChecklist);
router.get('/authorization-state', FiscalRealExecutionGateController.getAuthorizationState);
router.get('/blockers', FiscalRealExecutionGateController.getBlockers);
router.get('/risks', FiscalRealExecutionGateController.getRisks);
router.post('/evaluate', FiscalRealExecutionGateController.evaluate);
router.post('/simulate-unlock-request', FiscalRealExecutionGateController.simulateUnlockRequest);
router.get('/report', FiscalRealExecutionGateController.getReport);
router.get('/audit', FiscalRealExecutionGateController.getAudit);
router.get('/health', FiscalRealExecutionGateController.getHealth);

export { router as fiscalRealExecutionGateRoutes };
