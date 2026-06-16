import { Router } from 'express';
import { FiscalDay2SupportAccessController } from './FiscalDay2SupportAccessController';
import { requireFiscalAuth } from './helpers';

const router = Router();
const controller = new FiscalDay2SupportAccessController();

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
router.get('/support-team-access-blueprint', (req, res) => controller.getSupportTeamAccessBlueprint(req, res));
router.get('/support-responsibility-matrix', (req, res) => controller.getSupportResponsibilityMatrix(req, res));
router.get('/support-rbac-simulation-matrix', (req, res) => controller.getSupportRbacSimulationMatrix(req, res));
router.get('/no-privilege-escalation-boundary', (req, res) => controller.getNoPrivilegeEscalationBoundary(req, res));
router.get('/support-data-access-no-read-plan', (req, res) => controller.getSupportDataAccessNoReadPlan(req, res));
router.get('/assisted-session-no-op-plan', (req, res) => controller.getAssistedSessionNoOpPlan(req, res));
router.get('/support-audit-no-persistence-plan', (req, res) => controller.getSupportAuditNoPersistencePlan(req, res));
router.get('/internal-escalation-no-notification-plan', (req, res) => controller.getInternalEscalationNoNotificationPlan(req, res));
router.get('/support-access-safety-checklist', (req, res) => controller.getSupportAccessSafetyChecklist(req, res));
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
