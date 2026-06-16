import { Router, Request, Response, NextFunction } from 'express';
import { FiscalOperationalObservabilityDryRunController } from './FiscalOperationalObservabilityDryRunController';
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

router.get('/policy', FiscalOperationalObservabilityDryRunController.getPolicy);
router.get('/signal-catalog', FiscalOperationalObservabilityDryRunController.getSignalCatalog);
router.get('/alerting-plan', FiscalOperationalObservabilityDryRunController.getAlertingPlan);
router.get('/dashboard-readiness', FiscalOperationalObservabilityDryRunController.getDashboardReadiness);
router.get('/slo-sla-matrix', FiscalOperationalObservabilityDryRunController.getSloSlaMatrix);
router.get('/incident-trigger-simulation', FiscalOperationalObservabilityDryRunController.getIncidentTriggerSimulation);
router.get('/telemetry-retention', FiscalOperationalObservabilityDryRunController.getTelemetryRetention);
router.get('/escalation-signal-matrix', FiscalOperationalObservabilityDryRunController.getEscalationSignalMatrix);
router.get('/blockers', FiscalOperationalObservabilityDryRunController.getBlockers);
router.get('/risks', FiscalOperationalObservabilityDryRunController.getRisks);
router.post('/validate', FiscalOperationalObservabilityDryRunController.validate);
router.post('/evaluate', FiscalOperationalObservabilityDryRunController.evaluate);
router.post('/simulate-decision', FiscalOperationalObservabilityDryRunController.simulateDecision);
router.get('/report', FiscalOperationalObservabilityDryRunController.getReport);
router.get('/audit', FiscalOperationalObservabilityDryRunController.getAudit);
router.get('/health', FiscalOperationalObservabilityDryRunController.getHealth);

export default router;
