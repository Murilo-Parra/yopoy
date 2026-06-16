import { Router, Request, Response, NextFunction } from 'express';
import { FiscalSafeShapeMiddlewareController } from './FiscalSafeShapeMiddlewareController';
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

router.get('/guardrails', FiscalSafeShapeMiddlewareController.getGuardrails);
router.get('/plan', FiscalSafeShapeMiddlewareController.getPlan);
router.post('/validate-envelope', FiscalSafeShapeMiddlewareController.validateEnvelope);
router.post('/simulate-decision', FiscalSafeShapeMiddlewareController.simulateDecision);
router.get('/report', FiscalSafeShapeMiddlewareController.getReport);
router.get('/audit', FiscalSafeShapeMiddlewareController.getAudit);
router.get('/health', FiscalSafeShapeMiddlewareController.getHealth);

export { router as fiscalSafeShapeMiddlewareRoutes };
