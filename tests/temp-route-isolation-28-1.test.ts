import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import express from 'express';

vi.mock('../modules/fiscal/api/helpers', () => ({
  requireFiscalAuth: (req: any, res: any, next: any) => {
    if ((req as any).user?.role === 'unauthenticated') {
      return res.status(401).json({ error: 'Não autenticado' });
    }
    next();
  }
}));

import fiscalDay2OperationsRoutes from '../modules/fiscal/api/fiscalDay2Operations.routes';
import { FiscalDay2OperationsValidator } from '../modules/fiscal/dedicated-homologation/day2-operations-governance';

const createTestApp = (userRole?: string, isAdmin: boolean = false) => {
  const app = express();
  app.use(express.json());
  
  app.use((req, res, next) => {
    if (userRole === 'unauthenticated') {
      return res.status(401).json({ error: 'Não autenticado' });
    }
    
    (req as any).user = { id: 'test-user', role: userRole || 'Comum', is_admin: isAdmin };
    (req as any).session = { is_admin: isAdmin };
    next();
  });

  app.use('/api/fiscal-v2/dedicated-homologation/day2-operations-governance', fiscalDay2OperationsRoutes);
  
  return app;
};

describe('Fiscal Day-2 Operations Governance 28.1', () => {
  const unauthApp = createTestApp('unauthenticated');
  const userApp = createTestApp('Comum', false);
  const adminApp = createTestApp('Administrador', true);

  it('Acesso sem autenticação retorna 401', async () => {
    const res = await request(unauthApp).get('/api/fiscal-v2/dedicated-homologation/day2-operations-governance/policy');
    expect(res.status).toBe(401);
  });

  it('Usuário comum sem permissão retorna 403', async () => {
    const res = await request(userApp).get('/api/fiscal-v2/dedicated-homologation/day2-operations-governance/policy');
    expect(res.status).toBe(403);
  });

  it('Master Admin acessa policy', async () => {
    const res = await request(adminApp).get('/api/fiscal-v2/dedicated-homologation/day2-operations-governance/policy');
    expect(res.status).toBe(200);
    expect(res.body.day2OperationsGovernanceBlueprintOnly).toBe(true);
  });

  it('Master Admin acessa governance-blueprint', async () => {
    const res = await request(adminApp).get('/api/fiscal-v2/dedicated-homologation/day2-operations-governance/governance-blueprint');
    expect(res.status).toBe(200);
    expect(res.body.governanceBlueprintGenerated).toBe(true);
    expect(res.body.realDay2OperationExecuted).toBe(false);
  });

  it('Master Admin acessa no-activation-operational-readiness-contract', async () => {
    const res = await request(adminApp).get('/api/fiscal-v2/dedicated-homologation/day2-operations-governance/no-activation-operational-readiness-contract');
    expect(res.status).toBe(200);
    expect(res.body.noActivationOperationalReadinessContractGenerated).toBe(true);
    expect(res.body.realAuthorizationGranted).toBe(false);
  });

  it('Master Admin acessa support-runbook-readiness-plan', async () => {
    const res = await request(adminApp).get('/api/fiscal-v2/dedicated-homologation/day2-operations-governance/support-runbook-readiness-plan');
    expect(res.status).toBe(200);
    expect(res.body.supportRunbookReadinessPlanGenerated).toBe(true);
    expect(res.body.realRunbookExecuted).toBe(false);
  });

  it('Master Admin acessa escalation-no-notification-matrix', async () => {
     const res = await request(adminApp).get('/api/fiscal-v2/dedicated-homologation/day2-operations-governance/escalation-no-notification-matrix');
     expect(res.status).toBe(200);
     expect(res.body.escalationNoNotificationMatrixGenerated).toBe(true);
     expect(res.body.externalOperatorNotified).toBe(false);
     expect(res.body.slackSent).toBe(false);
  });

  it('Master Admin acessa service-continuity-no-op-plan', async () => {
     const res = await request(adminApp).get('/api/fiscal-v2/dedicated-homologation/day2-operations-governance/service-continuity-no-op-plan');
     expect(res.status).toBe(200);
     expect(res.body.serviceContinuityNoOpPlanGenerated).toBe(true);
     expect(res.body.productionV2Activated).toBe(false);
  });
  
  it('Master Admin executa evaluate', async () => {
       const res = await request(adminApp).post('/api/fiscal-v2/dedicated-homologation/day2-operations-governance/evaluate').send({});
       expect(res.status).toBe(200);
       expect(res.body.governanceBlueprintGenerated).toBe(true);
       expect(res.body.supportRunbookReadinessPlanGenerated).toBe(true);
       expect(res.body.incidentManagementReadinessPlanGenerated).toBe(true);
       expect(res.body.operationalMonitoringNoOpPlanGenerated).toBe(true);
       expect(res.body.alertingNoOpPlanGenerated).toBe(true);
       expect(res.body.realDay2OperationExecuted).toBe(false);
       expect(res.body.productionV2Activated).toBe(false);
  });

  it('Validator bloqueia actions reais e permissões executivas', () => {
      expect(FiscalDay2OperationsValidator.validate({ forceExecuteRealDay2Operation: true }).valid).toBe(false);
      expect(FiscalDay2OperationsValidator.validate({ forceOpenRealIncident: true }).valid).toBe(false);
      expect(FiscalDay2OperationsValidator.validate({ forceInstallRealObservability: true }).valid).toBe(false);
      expect(FiscalDay2OperationsValidator.validate({ forceSendSlack: true }).valid).toBe(false);
      expect(FiscalDay2OperationsValidator.validate({ metadata: { action: 'incident' } }).valid).toBe(false);
      expect(FiscalDay2OperationsValidator.validate({ metadata: { action: 'runbook' } }).valid).toBe(false);
      
      expect(FiscalDay2OperationsValidator.validate({ metadata: { name: 'governance-blueprint' } }).valid).toBe(true);
  });
});
