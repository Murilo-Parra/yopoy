import { Router } from 'express';
import { FiscalDay2OperationsController } from './FiscalDay2OperationsController';
import { requireFiscalAuth } from './helpers';

const router = Router();
const controller = new FiscalDay2OperationsController();

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
router.get('/governance-blueprint', (req, res) => controller.getGovernanceBlueprint(req, res));
router.get('/no-activation-operational-readiness-contract', (req, res) => controller.getNoActivationOperationalReadinessContract(req, res));
router.get('/support-runbook-readiness-plan', (req, res) => controller.getSupportRunbookReadinessPlan(req, res));
router.get('/incident-management-readiness-plan', (req, res) => controller.getIncidentManagementReadinessPlan(req, res));
router.get('/operational-monitoring-no-op-plan', (req, res) => controller.getOperationalMonitoringNoOpPlan(req, res));
router.get('/alerting-no-op-plan', (req, res) => controller.getAlertingNoOpPlan(req, res));
router.get('/escalation-no-notification-matrix', (req, res) => controller.getEscalationNoNotificationMatrix(req, res));
router.get('/change-control-readiness-matrix', (req, res) => controller.getChangeControlReadinessMatrix(req, res));
router.get('/rollback-escalation-matrix', (req, res) => controller.getRollbackEscalationMatrix(req, res));
router.get('/service-continuity-no-op-plan', (req, res) => controller.getServiceContinuityNoOpPlan(req, res));
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
