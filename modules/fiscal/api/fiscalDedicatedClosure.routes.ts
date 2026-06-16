import { Router, Request, Response, NextFunction } from 'express';
import { FiscalDedicatedClosureController } from './FiscalDedicatedClosureController';
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

router.get('/inventory', FiscalDedicatedClosureController.getInventory);
router.get('/criteria', FiscalDedicatedClosureController.getCriteria);
router.get('/blockers', FiscalDedicatedClosureController.getBlockers);
router.get('/risks', FiscalDedicatedClosureController.getRisks);
router.get('/evidence-package', FiscalDedicatedClosureController.getEvidencePackage);
router.get('/transition-checklist', FiscalDedicatedClosureController.getTransitionChecklist);
router.post('/evaluate-approval', FiscalDedicatedClosureController.evaluateApproval);
router.get('/handoff', FiscalDedicatedClosureController.getHandoff);
router.get('/final-report', FiscalDedicatedClosureController.getFinalReport);
router.get('/audit', FiscalDedicatedClosureController.getAudit);
router.get('/health', FiscalDedicatedClosureController.getHealth);

export { router as fiscalDedicatedClosureRoutes };
