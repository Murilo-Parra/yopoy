import { Router } from 'express';
import { FiscalProductionOperationsReadinessClosureController } from './FiscalProductionOperationsReadinessClosureController';
import { requireFiscalAuth } from './helpers';

const router = Router();
const controller = new FiscalProductionOperationsReadinessClosureController();

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

router.get('/health', controller.getHealth.bind(controller));
router.get('/policy', controller.getPolicy.bind(controller));
router.get('/closure-inventory', controller.getClosureInventory.bind(controller));
router.get('/final-checklist', controller.getFinalChecklist.bind(controller));
router.get('/evidence-package', controller.getEvidencePackage.bind(controller));
router.get('/no-activation-handoff', controller.getNoActivationHandoff.bind(controller));
router.get('/post-closure-roadmap', controller.getPostClosureRoadmap.bind(controller));
router.get('/blockers', controller.getBlockers.bind(controller));
router.get('/risks', controller.getRisks.bind(controller));
router.post('/validate', controller.validate.bind(controller));
router.post('/evaluate', controller.evaluate.bind(controller));
router.post('/simulate-decision', controller.simulateDecision.bind(controller));
router.get('/report', controller.getReport.bind(controller));
router.get('/audit', controller.getAudit.bind(controller));

export default router;
