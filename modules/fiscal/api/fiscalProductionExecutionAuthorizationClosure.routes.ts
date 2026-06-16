import { Router, Request, Response, NextFunction } from 'express';
import { FiscalProductionExecutionAuthorizationClosureController } from './FiscalProductionExecutionAuthorizationClosureController';
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

router.get('/policy', FiscalProductionExecutionAuthorizationClosureController.getPolicy);
router.get('/closure-inventory', FiscalProductionExecutionAuthorizationClosureController.getClosureInventory);
router.get('/final-checklist', FiscalProductionExecutionAuthorizationClosureController.getFinalChecklist);
router.get('/evidence-package', FiscalProductionExecutionAuthorizationClosureController.getEvidencePackage);
router.get('/no-execution-handoff', FiscalProductionExecutionAuthorizationClosureController.getNoExecutionHandoff);
router.get('/post-closure-roadmap', FiscalProductionExecutionAuthorizationClosureController.getPostClosureRoadmap);
router.get('/final-blockers', FiscalProductionExecutionAuthorizationClosureController.getFinalBlockers);
router.get('/final-risks', FiscalProductionExecutionAuthorizationClosureController.getFinalRisks);
router.post('/validate', FiscalProductionExecutionAuthorizationClosureController.validate);
router.post('/evaluate', FiscalProductionExecutionAuthorizationClosureController.evaluate);
router.post('/simulate-decision', FiscalProductionExecutionAuthorizationClosureController.simulateDecision);
router.get('/report', FiscalProductionExecutionAuthorizationClosureController.getReport);
router.get('/audit', FiscalProductionExecutionAuthorizationClosureController.getAudit);
router.get('/health', FiscalProductionExecutionAuthorizationClosureController.getHealth);

export default router;
