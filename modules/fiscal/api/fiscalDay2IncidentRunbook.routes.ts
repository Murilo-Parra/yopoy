import { Router } from 'express';
import { FiscalDay2IncidentRunbookController } from './FiscalDay2IncidentRunbookController';
import { requireFiscalAuth } from './helpers';

const router = Router();
const controller = new FiscalDay2IncidentRunbookController();

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
router.get('/incident-response-simulation-plan', (req, res) => controller.getIncidentResponseSimulationPlan(req, res));
router.get('/incident-triage-matrix', (req, res) => controller.getIncidentTriageMatrix(req, res));
router.get('/severity-classification-matrix', (req, res) => controller.getSeverityClassificationMatrix(req, res));
router.get('/runbook-execution-no-op-plan', (req, res) => controller.getRunbookExecutionNoOpPlan(req, res));
router.get('/mitigation-action-no-op-catalog', (req, res) => controller.getMitigationActionNoOpCatalog(req, res));
router.get('/oncall-escalation-no-notification-plan', (req, res) => controller.getOnCallEscalationNoNotificationPlan(req, res));
router.get('/incident-communication-no-send-plan', (req, res) => controller.getIncidentCommunicationNoSendPlan(req, res));
router.get('/post-incident-review-no-persistence-plan', (req, res) => controller.getPostIncidentReviewNoPersistencePlan(req, res));
router.get('/incident-runbook-safety-checklist', (req, res) => controller.getIncidentRunbookSafetyChecklist(req, res));
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
