import { Router, Request, Response, NextFunction } from 'express';
import { FiscalHomologationReviewController } from './FiscalHomologationReviewController';
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

router.get('/metrics', FiscalHomologationReviewController.getMetrics);
router.get('/score', FiscalHomologationReviewController.getScore);
router.get('/risks', FiscalHomologationReviewController.getRisks);
router.get('/final-review', FiscalHomologationReviewController.getFinalReview);
router.get('/report', FiscalHomologationReviewController.getReport);
router.get('/audit', FiscalHomologationReviewController.getAudit);
router.get('/health', FiscalHomologationReviewController.getHealth);

export { router as fiscalHomologationReviewRoutes };
