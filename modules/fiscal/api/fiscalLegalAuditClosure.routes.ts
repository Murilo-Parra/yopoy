import { Router, Request, Response, NextFunction } from 'express';
import { FiscalLegalAuditClosureController } from './FiscalLegalAuditClosureController';
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

router.get('/policy', FiscalLegalAuditClosureController.getPolicy);
router.get('/inventory', FiscalLegalAuditClosureController.getInventory);
router.get('/final-checklist', FiscalLegalAuditClosureController.getFinalChecklist);
router.get('/evidence-package', FiscalLegalAuditClosureController.getEvidencePackage);
router.get('/auditor-handoff', FiscalLegalAuditClosureController.getAuditorHandoff);
router.get('/retention-handoff', FiscalLegalAuditClosureController.getRetentionHandoff);
router.get('/blockers', FiscalLegalAuditClosureController.getBlockers);
router.get('/risks', FiscalLegalAuditClosureController.getRisks);
router.post('/validate', FiscalLegalAuditClosureController.validate);
router.post('/evaluate', FiscalLegalAuditClosureController.evaluate);
router.post('/simulate-decision', FiscalLegalAuditClosureController.simulateDecision);
router.get('/report', FiscalLegalAuditClosureController.getReport);
router.get('/audit', FiscalLegalAuditClosureController.getAudit);
router.get('/health', FiscalLegalAuditClosureController.getHealth);

export default router;
