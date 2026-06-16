import { Router, Request, Response, NextFunction } from 'express';
import { FiscalShadowMirrorPassiveTapController } from './FiscalShadowMirrorPassiveTapController';
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

router.get('/registry', FiscalShadowMirrorPassiveTapController.getRegistry);
router.get('/guardrails', FiscalShadowMirrorPassiveTapController.getGuardrails);
router.get('/plan', FiscalShadowMirrorPassiveTapController.getPlan);
router.post('/simulate-decision', FiscalShadowMirrorPassiveTapController.simulateDecision);
router.get('/report', FiscalShadowMirrorPassiveTapController.getReport);
router.get('/audit', FiscalShadowMirrorPassiveTapController.getAudit);
router.get('/health', FiscalShadowMirrorPassiveTapController.getHealth);

export { router as fiscalShadowMirrorPassiveTapRoutes };
