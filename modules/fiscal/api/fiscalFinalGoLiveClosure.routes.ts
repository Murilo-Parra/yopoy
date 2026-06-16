import { Router, Request, Response, NextFunction } from 'express';
import { FiscalFinalGoLiveClosureController } from './FiscalFinalGoLiveClosureController';
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

router.get('/policy', FiscalFinalGoLiveClosureController.getPolicy);
router.get('/inventory', FiscalFinalGoLiveClosureController.getInventory);
router.get('/final-checklist', FiscalFinalGoLiveClosureController.getFinalChecklist);
router.get('/evidence-package', FiscalFinalGoLiveClosureController.getEvidencePackage);
router.get('/no-activation-handoff', FiscalFinalGoLiveClosureController.getNoActivationHandoff);
router.get('/post-closure-roadmap', FiscalFinalGoLiveClosureController.getPostClosureRoadmap);
router.get('/final-readiness-review', FiscalFinalGoLiveClosureController.getFinalReadinessReview);
router.get('/blockers', FiscalFinalGoLiveClosureController.getBlockers);
router.get('/risks', FiscalFinalGoLiveClosureController.getRisks);
router.post('/validate', FiscalFinalGoLiveClosureController.validate);
router.post('/evaluate', FiscalFinalGoLiveClosureController.evaluate);
router.post('/simulate-decision', FiscalFinalGoLiveClosureController.simulateDecision);
router.get('/report', FiscalFinalGoLiveClosureController.getReport);
router.get('/audit', FiscalFinalGoLiveClosureController.getAudit);
router.get('/health', FiscalFinalGoLiveClosureController.getHealth);

export default router;
