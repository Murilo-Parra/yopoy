import { Router, Request, Response, NextFunction } from 'express';
import { FiscalRealApprovalMockSignatureController } from './FiscalRealApprovalMockSignatureController';
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

// Exigir autenticação e papel administrativo ('master-admin' ou 'admin')
router.use(requireFiscalAuth);
router.use(requireAdminRole);

router.get('/policy', FiscalRealApprovalMockSignatureController.getPolicy);
router.get('/envelope', FiscalRealApprovalMockSignatureController.getEnvelope);
router.get('/mock-certificate', FiscalRealApprovalMockSignatureController.getMockCertificate);
router.get('/mock-signer', FiscalRealApprovalMockSignatureController.getMockSigner);
router.get('/external-authorization-simulator', FiscalRealApprovalMockSignatureController.getExternalAuthorizationSimulator);
router.get('/blockers', FiscalRealApprovalMockSignatureController.getBlockers);
router.get('/risks', FiscalRealApprovalMockSignatureController.getRisks);
router.post('/validate', FiscalRealApprovalMockSignatureController.validate);
router.post('/evaluate', FiscalRealApprovalMockSignatureController.evaluate);
router.post('/simulate-decision', FiscalRealApprovalMockSignatureController.simulateDecision);
router.get('/report', FiscalRealApprovalMockSignatureController.getReport);
router.get('/audit', FiscalRealApprovalMockSignatureController.getAudit);
router.get('/health', FiscalRealApprovalMockSignatureController.getHealth);

export default router;
