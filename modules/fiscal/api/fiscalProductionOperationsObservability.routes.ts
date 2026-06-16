import { Router } from 'express';
import { FiscalProductionOperationsObservabilityController } from './FiscalProductionOperationsObservabilityController';
import { requireFiscalAuth } from './helpers';

const router = Router();
const controller = new FiscalProductionOperationsObservabilityController();

function requireAdminRole(req: any, res: any, next: any) {
  const session = req.session;
  const user = req.user;
  
  const isAdmin = session?.is_admin === true || session?.is_admin === 1 || 
                  user?.is_admin === true || user?.is_admin === 1 || 
                  session?.role === 'Proprietário' || session?.role === 'Administrador' ||
                  user?.role === 'Proprietário' || user?.role === 'Administrador';
  
  if (!isAdmin) {
    return res.status(403).json({ error: 'Acesso restrito. Privilégios administrativos necessários.' });
  }
  next();
}

router.use(requireFiscalAuth);
router.use(requireAdminRole);

router.get('/policy', (req, res) => controller.getPolicy(req, res));
router.get('/observability-readiness-simulation', (req, res) => controller.getObservabilityReadinessSimulation(req, res));
router.get('/signal-catalog', (req, res) => controller.getSignalCatalog(req, res));
router.get('/telemetry-no-capture-plan', (req, res) => controller.getTelemetryNoCapturePlan(req, res));
router.get('/live-metrics-drift-simulation', (req, res) => controller.getLiveMetricsDriftSimulation(req, res));
router.get('/dashboard-no-op-plan', (req, res) => controller.getDashboardNoOpPlan(req, res));
router.get('/slo-sla-simulation-matrix', (req, res) => controller.getSloSlaSimulationMatrix(req, res));
router.get('/alert-rule-no-activation-plan', (req, res) => controller.getAlertRuleNoActivationPlan(req, res));
router.get('/telemetry-source-no-read-plan', (req, res) => controller.getTelemetrySourceNoReadPlan(req, res));
router.get('/metrics-retention-no-persistence-plan', (req, res) => controller.getMetricsRetentionNoPersistencePlan(req, res));
router.get('/no-real-metrics-capture-evidence', (req, res) => controller.getNoRealMetricsCaptureEvidence(req, res));
router.get('/no-real-alert-evidence', (req, res) => controller.getNoRealAlertEvidence(req, res));
router.get('/dependency-matrix', (req, res) => controller.getDependencyMatrix(req, res));
router.get('/blockers', (req, res) => controller.getBlockers(req, res));
router.get('/risks', (req, res) => controller.getRisks(req, res));
router.post('/validate', (req, res) => controller.validate(req, res));
router.post('/evaluate', (req, res) => controller.evaluate(req, res));
router.post('/simulate-decision', (req, res) => controller.simulateDecision(req, res));
router.get('/report', (req, res) => controller.getReport(req, res));
router.get('/audit', (req, res) => controller.getAudit(req, res));
router.get('/health', (req, res) => controller.getHealth(req, res));

export default router;
