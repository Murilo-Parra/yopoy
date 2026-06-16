import { Router, Request, Response, NextFunction } from 'express';
import { FiscalSandboxIntegrityController } from './FiscalSandboxIntegrityController';
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

router.get('/summary', FiscalSandboxIntegrityController.getSummary);
router.get('/quality-score', FiscalSandboxIntegrityController.getQualityScore);
router.get('/duplicates', FiscalSandboxIntegrityController.getDuplicates);
router.get('/incomplete', FiscalSandboxIntegrityController.getIncomplete);
router.get('/expired', FiscalSandboxIntegrityController.getExpired);
router.get('/risks', FiscalSandboxIntegrityController.getRisks);
router.get('/report', FiscalSandboxIntegrityController.getReport);
router.get('/health', FiscalSandboxIntegrityController.getHealth);

export { router as fiscalSandboxIntegrityRoutes };
