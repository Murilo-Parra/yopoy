import { Router, Request, Response, NextFunction } from 'express';
import { FiscalShadowMirrorTelemetryController } from './FiscalShadowMirrorTelemetryController';
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

router.get('/guardrails', FiscalShadowMirrorTelemetryController.getGuardrails);
router.get('/plan', FiscalShadowMirrorTelemetryController.getPlan);
router.post('/validate-event', FiscalShadowMirrorTelemetryController.validateEvent);
router.post('/simulate-event', FiscalShadowMirrorTelemetryController.simulateEvent);
router.get('/report', FiscalShadowMirrorTelemetryController.getReport);
router.get('/audit', FiscalShadowMirrorTelemetryController.getAudit);
router.get('/health', FiscalShadowMirrorTelemetryController.getHealth);

export { router as fiscalShadowMirrorTelemetryRoutes };
