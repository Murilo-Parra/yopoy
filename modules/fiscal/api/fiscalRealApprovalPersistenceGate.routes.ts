import { Router, Request, Response, NextFunction } from 'express';
import { FiscalRealApprovalPersistenceGateController } from './FiscalRealApprovalPersistenceGateController';
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

router.get('/policy', FiscalRealApprovalPersistenceGateController.getPolicy);
router.get('/schema-contract', FiscalRealApprovalPersistenceGateController.getSchemaContract);
router.get('/legal-audit-trail-contract', FiscalRealApprovalPersistenceGateController.getLegalAuditTrailContract);
router.get('/readiness-checklist', FiscalRealApprovalPersistenceGateController.getReadinessChecklist);
router.get('/blockers', FiscalRealApprovalPersistenceGateController.getBlockers);
router.get('/risks', FiscalRealApprovalPersistenceGateController.getRisks);
router.post('/validate', FiscalRealApprovalPersistenceGateController.validate);
router.post('/evaluate', FiscalRealApprovalPersistenceGateController.evaluate);
router.post('/simulate-decision', FiscalRealApprovalPersistenceGateController.simulateDecision);
router.get('/report', FiscalRealApprovalPersistenceGateController.getReport);
router.get('/audit', FiscalRealApprovalPersistenceGateController.getAudit);
router.get('/health', FiscalRealApprovalPersistenceGateController.getHealth);

export { router as fiscalRealApprovalPersistenceGateRoutes };
