import { Router, Request, Response, NextFunction } from 'express';
import { FiscalShadowMirrorController } from './FiscalShadowMirrorController';
import { requireFiscalAuth } from './helpers';

const router = Router();

function requireAdminRole(req: Request, res: Response, next: NextFunction) {
  const session = (req as any).session;
  const user = (req as any).user;
  
  // Checking typical admin flags in the system
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

// Authentication and Authorization middleware
router.use(requireFiscalAuth);
router.use(requireAdminRole);

router.get('/routes', FiscalShadowMirrorController.listRoutes);
router.get('/routes/:id', FiscalShadowMirrorController.getRouteById);
router.get('/risks', FiscalShadowMirrorController.getRisks);
router.get('/dependencies', FiscalShadowMirrorController.getDependencies);
router.get('/plan', FiscalShadowMirrorController.getPlan);
router.get('/report', FiscalShadowMirrorController.getReport);
router.get('/health', FiscalShadowMirrorController.getHealth);

export { router as fiscalShadowMirrorRoutes };
