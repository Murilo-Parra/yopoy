import { Router, Request, Response, NextFunction } from 'express';
import { FiscalSandboxPersistenceController } from './FiscalSandboxPersistenceController';

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

router.use(requireAdminRole);

router.post('/snapshots', FiscalSandboxPersistenceController.createSnapshot);
router.get('/snapshots', FiscalSandboxPersistenceController.listSnapshots);
router.get('/snapshots/:id', FiscalSandboxPersistenceController.getSnapshot);
router.post('/snapshots/:id/mark-reviewed', FiscalSandboxPersistenceController.markReviewed);

router.post('/cleanup', FiscalSandboxPersistenceController.cleanup);

router.get('/report', FiscalSandboxPersistenceController.getReport);
router.get('/health', FiscalSandboxPersistenceController.getHealth);

export { router as fiscalSandboxPersistenceRoutes };


