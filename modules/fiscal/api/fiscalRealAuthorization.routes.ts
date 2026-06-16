import { Router, Request, Response, NextFunction } from 'express';
import { FiscalRealAuthorizationController } from './FiscalRealAuthorizationController';
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

router.get('/policy', FiscalRealAuthorizationController.getPolicy);
router.get('/blockers', FiscalRealAuthorizationController.getBlockers);
router.get('/risks', FiscalRealAuthorizationController.getRisks);
router.post('/intake', FiscalRealAuthorizationController.intake);
router.post('/validate-request', FiscalRealAuthorizationController.validateRequest);
router.post('/evaluate', FiscalRealAuthorizationController.evaluate);
router.post('/simulate-decision', FiscalRealAuthorizationController.simulateDecision);
router.get('/non-executable-envelope', FiscalRealAuthorizationController.getNonExecutableEnvelope);
router.get('/report', FiscalRealAuthorizationController.getReport);
router.get('/audit', FiscalRealAuthorizationController.getAudit);
router.get('/health', FiscalRealAuthorizationController.getHealth);

export { router as fiscalRealAuthorizationRoutes };
