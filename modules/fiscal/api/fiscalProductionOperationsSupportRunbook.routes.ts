import { Router } from 'express';
import { FiscalProductionOperationsSupportRunbookController } from './FiscalProductionOperationsSupportRunbookController';
import { requireFiscalAuth } from './helpers';

const router = Router();
const controller = new FiscalProductionOperationsSupportRunbookController();

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
router.get('/support-runbook-simulation-plan', (req, res) => controller.getSupportRunbookSimulationPlan(req, res));
router.get('/incident-triage-simulation-matrix', (req, res) => controller.getIncidentTriageSimulationMatrix(req, res));
router.get('/severity-classification-matrix', (req, res) => controller.getSeverityClassificationMatrix(req, res));
router.get('/runbook-execution-no-op-plan', (req, res) => controller.getRunbookExecutionNoOpPlan(req, res));
router.get('/mitigation-no-op-catalog', (req, res) => controller.getMitigationNoOpCatalog(req, res));
router.get('/escalation-no-notification-plan', (req, res) => controller.getEscalationNoNotificationPlan(req, res));
router.get('/incident-communication-no-send-plan', (req, res) => controller.getIncidentCommunicationNoSendPlan(req, res));
router.get('/post-incident-review-no-persistence-plan', (req, res) => controller.getPostIncidentReviewNoPersistencePlan(req, res));
router.get('/no-real-incident-evidence', (req, res) => controller.getNoRealIncidentEvidence(req, res));
router.get('/no-real-runbook-execution-evidence', (req, res) => controller.getNoRealRunbookExecutionEvidence(req, res));
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
