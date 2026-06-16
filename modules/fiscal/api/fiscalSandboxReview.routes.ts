import { Router, Request, Response, NextFunction } from 'express';
import { FiscalSandboxReviewController } from './FiscalSandboxReviewController';
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

router.get('/snapshots', FiscalSandboxReviewController.listSnapshots);
router.get('/snapshots/:id', FiscalSandboxReviewController.getSnapshot);

router.post('/snapshots/:id/mark-reviewed', FiscalSandboxReviewController.markReviewed);
router.post('/snapshots/:id/retain', FiscalSandboxReviewController.retain);
router.post('/snapshots/:id/mark-cleanup-eligible', FiscalSandboxReviewController.markCleanupEligible);

router.post('/cleanup/preview', FiscalSandboxReviewController.previewCleanup);
router.post('/cleanup/execute', FiscalSandboxReviewController.executeCleanup);

router.get('/report', FiscalSandboxReviewController.getReport);
router.get('/audit', FiscalSandboxReviewController.getAudit);
router.get('/health', FiscalSandboxReviewController.getHealth);

export { router as fiscalSandboxReviewRoutes };
