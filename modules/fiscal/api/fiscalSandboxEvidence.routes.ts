import { Router, Request, Response, NextFunction } from 'express';
import { FiscalSandboxEvidenceController } from './FiscalSandboxEvidenceController';
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

router.get('/summary', FiscalSandboxEvidenceController.getSummary);
router.get('/checklist', FiscalSandboxEvidenceController.getChecklist);
router.get('/certification', FiscalSandboxEvidenceController.getCertification);
router.get('/export-json', FiscalSandboxEvidenceController.exportJson);
router.get('/export-text', FiscalSandboxEvidenceController.exportText);
router.get('/final-review', FiscalSandboxEvidenceController.getFinalReview);
router.get('/health', FiscalSandboxEvidenceController.getHealth);

export { router as fiscalSandboxEvidenceRoutes };
