import { Router } from 'express';
import { FiscalProductionExternalIntegrationController } from './FiscalProductionExternalIntegrationController';

const router = Router();

router.get('/policy', FiscalProductionExternalIntegrationController.getPolicy);
router.get('/external-integration-no-call-blueprint', FiscalProductionExternalIntegrationController.getExternalIntegrationNoCallBlueprint);
router.get('/sefaz-adapter-no-call-plan', FiscalProductionExternalIntegrationController.getSefazAdapterNoCallPlan);
router.get('/authorization-token-no-issue-matrix', FiscalProductionExternalIntegrationController.getAuthorizationTokenNoIssueMatrix);
router.get('/external-webhook-no-send-plan', FiscalProductionExternalIntegrationController.getExternalWebhookNoSendPlan);
router.get('/notification-provider-no-send-matrix', FiscalProductionExternalIntegrationController.getNotificationProviderNoSendMatrix);
router.get('/external-callback-no-register-plan', FiscalProductionExternalIntegrationController.getExternalCallbackNoRegisterPlan);
router.get('/http-adapter-no-bind-matrix', FiscalProductionExternalIntegrationController.getHttpAdapterNoBindMatrix);
router.get('/external-credential-no-read-plan', FiscalProductionExternalIntegrationController.getExternalCredentialNoReadPlan);
router.get('/api-key-secret-no-read-matrix', FiscalProductionExternalIntegrationController.getApiKeySecretNoReadMatrix);
router.get('/certificate-pfx-no-read-plan', FiscalProductionExternalIntegrationController.getCertificatePfxNoReadPlan);
router.get('/fiscal-payload-no-read-matrix', FiscalProductionExternalIntegrationController.getFiscalPayloadNoReadMatrix);
router.get('/external-no-real-call-evidence', FiscalProductionExternalIntegrationController.getExternalNoRealCallEvidence);
router.get('/authorization-no-real-token-evidence', FiscalProductionExternalIntegrationController.getAuthorizationNoRealTokenEvidence);
router.get('/dependency-matrix', FiscalProductionExternalIntegrationController.getDependencyMatrix);
router.get('/blockers', FiscalProductionExternalIntegrationController.getBlockers);
router.get('/risks', FiscalProductionExternalIntegrationController.getRisks);
router.post('/validate', FiscalProductionExternalIntegrationController.validate);
router.post('/evaluate', FiscalProductionExternalIntegrationController.evaluate);
router.post('/simulate-decision', FiscalProductionExternalIntegrationController.simulateDecision);
router.get('/report', FiscalProductionExternalIntegrationController.getReport);
router.get('/audit', FiscalProductionExternalIntegrationController.getAudit);
router.get('/health', FiscalProductionExternalIntegrationController.getHealth);

export const fiscalProductionExternalIntegrationRoutes = router;
