import { Router, Request, Response, NextFunction } from 'express';
import { FiscalLegalAuditEventDryRunController } from './FiscalLegalAuditEventDryRunController';
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

router.get('/policy', FiscalLegalAuditEventDryRunController.getPolicy);
router.get('/event-model-plan', FiscalLegalAuditEventDryRunController.getEventModelPlan);
router.get('/append-simulation', FiscalLegalAuditEventDryRunController.getAppendSimulation);
router.get('/correction-simulation', FiscalLegalAuditEventDryRunController.getCorrectionSimulation);
router.get('/retention-event-simulation', FiscalLegalAuditEventDryRunController.getRetentionEventSimulation);
router.get('/linkage-plan', FiscalLegalAuditEventDryRunController.getLinkagePlan);
router.get('/mutation-diff', FiscalLegalAuditEventDryRunController.getMutationDiff);
router.get('/blockers', FiscalLegalAuditEventDryRunController.getBlockers);
router.get('/risks', FiscalLegalAuditEventDryRunController.getRisks);
router.post('/validate', FiscalLegalAuditEventDryRunController.validate);
router.post('/evaluate', FiscalLegalAuditEventDryRunController.evaluate);
router.post('/simulate-decision', FiscalLegalAuditEventDryRunController.simulateDecision);
router.get('/report', FiscalLegalAuditEventDryRunController.getReport);
router.get('/audit', FiscalLegalAuditEventDryRunController.getAudit);
router.get('/health', FiscalLegalAuditEventDryRunController.getHealth);

export default router;
