import { Router, Request, Response, NextFunction } from 'express';
import { FiscalLegalAuditTrailController } from './FiscalLegalAuditTrailController';
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

router.get('/policy', FiscalLegalAuditTrailController.getPolicy);
router.get('/ledger-blueprint', FiscalLegalAuditTrailController.getLedgerBlueprint);
router.get('/persistence-isolation-contract', FiscalLegalAuditTrailController.getPersistenceIsolationContract);
router.get('/immutability-contract', FiscalLegalAuditTrailController.getImmutabilityContract);
router.get('/retention-policy', FiscalLegalAuditTrailController.getRetentionPolicy);
router.get('/access-control-matrix', FiscalLegalAuditTrailController.getAccessControlMatrix);
router.get('/evidence-model', FiscalLegalAuditTrailController.getEvidenceModel);
router.get('/blockers', FiscalLegalAuditTrailController.getBlockers);
router.get('/risks', FiscalLegalAuditTrailController.getRisks);
router.post('/validate', FiscalLegalAuditTrailController.validate);
router.post('/evaluate', FiscalLegalAuditTrailController.evaluate);
router.post('/simulate-decision', FiscalLegalAuditTrailController.simulateDecision);
router.get('/report', FiscalLegalAuditTrailController.getReport);
router.get('/audit', FiscalLegalAuditTrailController.getAudit);
router.get('/health', FiscalLegalAuditTrailController.getHealth);

export default router;
