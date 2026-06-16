import { Router, Request, Response, NextFunction } from 'express';
import { FiscalProductionRuntimeExecutionClosureController } from './FiscalProductionRuntimeExecutionClosureController';
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

router.get('/policy', FiscalProductionRuntimeExecutionClosureController.getPolicy);
router.get('/closure-inventory', FiscalProductionRuntimeExecutionClosureController.getClosureInventory);
router.get('/final-checklist', FiscalProductionRuntimeExecutionClosureController.getFinalChecklist);
router.get('/evidence-package', FiscalProductionRuntimeExecutionClosureController.getEvidencePackage);
router.get('/no-execution-handoff', FiscalProductionRuntimeExecutionClosureController.getNoExecutionHandoff);
router.get('/post-closure-roadmap', FiscalProductionRuntimeExecutionClosureController.getPostClosureRoadmap);
router.get('/final-blockers', FiscalProductionRuntimeExecutionClosureController.getFinalBlockers);
router.get('/final-risks', FiscalProductionRuntimeExecutionClosureController.getFinalRisks);
router.post('/validate', FiscalProductionRuntimeExecutionClosureController.validate);
router.post('/evaluate', FiscalProductionRuntimeExecutionClosureController.evaluate);
router.post('/simulate-decision', FiscalProductionRuntimeExecutionClosureController.simulateDecision);
router.get('/report', FiscalProductionRuntimeExecutionClosureController.getReport);
router.get('/audit', FiscalProductionRuntimeExecutionClosureController.getAudit);
router.get('/health', FiscalProductionRuntimeExecutionClosureController.getHealth);

export default router;
