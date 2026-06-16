import { Router } from 'express';
import { FiscalProductionBaselineCutoverController } from './FiscalProductionBaselineCutoverController';
import { requireFiscalAuth } from './helpers';

const router = Router();
const controller = new FiscalProductionBaselineCutoverController();

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
router.get('/readiness-blueprint', (req, res) => controller.getReadinessBlueprint(req, res));
router.get('/hard-execution-lock-contract', (req, res) => controller.getHardExecutionLockContract(req, res));
router.get('/scope-inventory', (req, res) => controller.getScopeInventory(req, res));
router.get('/precondition-matrix', (req, res) => controller.getPreconditionMatrix(req, res));
router.get('/legacy-continuity-baseline-plan', (req, res) => controller.getLegacyContinuityBaselinePlan(req, res));
router.get('/v2-activation-locked-plan', (req, res) => controller.getV2ActivationLockedPlan(req, res));
router.get('/traffic-mutation-locked-plan', (req, res) => controller.getTrafficMutationLockedPlan(req, res));
router.get('/runtime-execution-locked-plan', (req, res) => controller.getRuntimeExecutionLockedPlan(req, res));
router.get('/data-boundary-locked-plan', (req, res) => controller.getDataBoundaryLockedPlan(req, res));
router.get('/external-integration-locked-plan', (req, res) => controller.getExternalIntegrationLockedPlan(req, res));
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
