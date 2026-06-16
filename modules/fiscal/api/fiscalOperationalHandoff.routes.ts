import { Router, Request, Response, NextFunction } from 'express';
import { FiscalOperationalHandoffController } from './FiscalOperationalHandoffController';
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

router.get('/policy', FiscalOperationalHandoffController.getPolicy);
router.get('/runbook-blueprint', FiscalOperationalHandoffController.getRunbookBlueprint);
router.get('/responsibility-matrix', FiscalOperationalHandoffController.getResponsibilityMatrix);
router.get('/support-escalation', FiscalOperationalHandoffController.getSupportEscalation);
router.get('/incident-response', FiscalOperationalHandoffController.getIncidentResponse);
router.get('/observability-readiness', FiscalOperationalHandoffController.getObservabilityReadiness);
router.get('/change-freeze', FiscalOperationalHandoffController.getChangeFreeze);
router.get('/communication-matrix', FiscalOperationalHandoffController.getCommunicationMatrix);
router.get('/blockers', FiscalOperationalHandoffController.getBlockers);
router.get('/risks', FiscalOperationalHandoffController.getRisks);
router.post('/validate', FiscalOperationalHandoffController.validate);
router.post('/evaluate', FiscalOperationalHandoffController.evaluate);
router.post('/simulate-decision', FiscalOperationalHandoffController.simulateDecision);
router.get('/report', FiscalOperationalHandoffController.getReport);
router.get('/audit', FiscalOperationalHandoffController.getAudit);
router.get('/health', FiscalOperationalHandoffController.getHealth);

export default router;
