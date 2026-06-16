import { Router, Request, Response, NextFunction } from 'express';
import { FiscalOperationalHandoffClosureController } from './FiscalOperationalHandoffClosureController';
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

router.get('/policy', FiscalOperationalHandoffClosureController.getPolicy);
router.get('/inventory', FiscalOperationalHandoffClosureController.getInventory);
router.get('/final-checklist', FiscalOperationalHandoffClosureController.getFinalChecklist);
router.get('/evidence-package', FiscalOperationalHandoffClosureController.getEvidencePackage);
router.get('/legal-signoff-readiness', FiscalOperationalHandoffClosureController.getLegalSignOffReadiness);
router.get('/final-runbook-handoff', FiscalOperationalHandoffClosureController.getFinalRunbookHandoff);
router.get('/post-handoff-roadmap', FiscalOperationalHandoffClosureController.getPostHandoffRoadmap);
router.get('/blockers', FiscalOperationalHandoffClosureController.getBlockers);
router.get('/risks', FiscalOperationalHandoffClosureController.getRisks);
router.post('/validate', FiscalOperationalHandoffClosureController.validate);
router.post('/evaluate', FiscalOperationalHandoffClosureController.evaluate);
router.post('/simulate-decision', FiscalOperationalHandoffClosureController.simulateDecision);
router.get('/report', FiscalOperationalHandoffClosureController.getReport);
router.get('/audit', FiscalOperationalHandoffClosureController.getAudit);
router.get('/health', FiscalOperationalHandoffClosureController.getHealth);

export default router;
