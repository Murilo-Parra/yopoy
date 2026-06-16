import { Router, Request, Response, NextFunction } from 'express';
import { FiscalLegalSignOffClosureController } from './FiscalLegalSignOffClosureController';
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

// Exigir autenticação e papel administrativo
router.use(requireFiscalAuth);
router.use(requireAdminRole);

router.get('/policy', FiscalLegalSignOffClosureController.getPolicy);
router.get('/inventory', FiscalLegalSignOffClosureController.getInventory);
router.get('/final-checklist', FiscalLegalSignOffClosureController.getFinalChecklist);
router.get('/evidence-package', FiscalLegalSignOffClosureController.getEvidencePackage);
router.get('/final-signature-readiness', FiscalLegalSignOffClosureController.getFinalSignatureReadiness);
router.get('/final-committee-handoff', FiscalLegalSignOffClosureController.getFinalCommitteeHandoff);
router.get('/post-signoff-roadmap', FiscalLegalSignOffClosureController.getPostSignOffRoadmap);
router.get('/blockers', FiscalLegalSignOffClosureController.getBlockers);
router.get('/risks', FiscalLegalSignOffClosureController.getRisks);
router.post('/validate', FiscalLegalSignOffClosureController.validate);
router.post('/evaluate', FiscalLegalSignOffClosureController.evaluate);
router.post('/simulate-decision', FiscalLegalSignOffClosureController.simulateDecision);
router.get('/report', FiscalLegalSignOffClosureController.getReport);
router.get('/audit', FiscalLegalSignOffClosureController.getAudit);
router.get('/health', FiscalLegalSignOffClosureController.getHealth);

export default router;
