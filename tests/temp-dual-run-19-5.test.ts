import express from 'express';
import req from 'supertest';
import { describe, it, expect } from 'vitest';
import fiscalProductionDualRunRoutes from '../modules/fiscal/api/fiscalProductionDualRun.routes';

const app = express();
app.use(express.json());

// Mock session and user
app.use((reqParams, res, next) => {
  const authHeader = reqParams.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  if (authHeader === 'Bearer user') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  // is admin
  // @ts-ignore
  reqParams.session = { is_admin: true, company_id: 'test-co' };
  // @ts-ignore
  reqParams.user = { id: 'master-admin', is_admin: true, company_id: 'test-co' };
  next();
});

app.use('/api', fiscalProductionDualRunRoutes);

describe('Production Dual-Run 19.5 Tests', () => {

  it('1. Acesso sem autenticação retorna 401', async () => {
    const res = await req(app).get('/api/health');
    expect(res.status).toBe(401);
  });

  it('2. Usuário comum sem permissão retorna 403', async () => {
    const res = await req(app).get('/api/health').set('Authorization', 'Bearer user');
    expect(res.status).toBe(403);
  });

  it('3. Master Admin acessa policy', async () => {
    const res = await req(app).get('/api/policy').set('Authorization', 'Bearer admin');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.go).toBe(false);
  });

  it('4. Master Admin acessa dual-run-plan', async () => {
    const res = await req(app).get('/api/dual-run-plan').set('Authorization', 'Bearer admin');
    expect(res.status).toBe(200);
    expect(res.body.dualRunPlanGenerated).toBe(true);
    expect(res.body.dualRunExecuted).toBe(false);
    expect(res.body.realTrafficDuplicated).toBe(false);
  });

  it('5. Master Admin acessa telemetry-readiness', async () => {
    const res = await req(app).get('/api/telemetry-readiness').set('Authorization', 'Bearer admin');
    expect(res.status).toBe(200);
    expect(res.body.telemetryReadinessGenerated).toBe(true);
    expect(res.body.realRequestCaptured).toBe(false);
    expect(res.body.realResponseCaptured).toBe(false);
  });

  it('6. Master Admin acessa legacy-vs-v2-comparison', async () => {
    const res = await req(app).get('/api/legacy-vs-v2-comparison').set('Authorization', 'Bearer admin');
    expect(res.status).toBe(200);
    expect(res.body.comparisonPlanGenerated).toBe(true);
    expect(res.body.v2HandlerCalled).toBe(false);
  });

  it('7. Master Admin acessa reversible-activation-plan', async () => {
    const res = await req(app).get('/api/reversible-activation-plan').set('Authorization', 'Bearer admin');
    expect(res.status).toBe(200);
    expect(res.body.reversibleActivationPlanGenerated).toBe(true);
    expect(res.body.productionV2Activated).toBe(false);
  });

  it('8. Master Admin acessa observability-matrix', async () => {
    const res = await req(app).get('/api/observability-matrix').set('Authorization', 'Bearer admin');
    expect(res.status).toBe(200);
    expect(res.body.observabilityMatrixGenerated).toBe(true);
    expect(res.body.workersCreated).toBe(false);
  });

  it('9. Master Admin acessa decision-checkpoints', async () => {
    const res = await req(app).get('/api/decision-checkpoints').set('Authorization', 'Bearer admin');
    expect(res.status).toBe(200);
    expect(res.body.decisionCheckpointMatrixGenerated).toBe(true);
    expect(res.body.realAuthorizationGranted).toBe(false);
  });

  it('10. Master Admin acessa rollback-criteria', async () => {
    const res = await req(app).get('/api/rollback-criteria').set('Authorization', 'Bearer admin');
    expect(res.status).toBe(200);
    expect(res.body.rollbackCriteriaGenerated).toBe(true);
    expect(res.body.rollbackExecuted).toBe(false);
  });

  it('11. Master Admin acessa blockers', async () => {
    const res = await req(app).get('/api/blockers').set('Authorization', 'Bearer admin');
    expect(res.status).toBe(200);
    expect(res.body.blockers.length).toBeGreaterThan(0);
  });

  it('12. Master Admin acessa risks', async () => {
    const res = await req(app).get('/api/risks').set('Authorization', 'Bearer admin');
    expect(res.status).toBe(200);
    expect(res.body.risks.length).toBeGreaterThan(0);
  });

  it('13. Master Admin executa validate com error', async () => {
    const res = await req(app).post('/api/validate').set('Authorization', 'Bearer admin').send({ forceExecuteDualRun: true });
    expect(res.status).toBe(200);
    expect(res.body.valid).toBe(false);
    expect(res.body.blockers).toContain('forceExecuteDualRun blocked');
  });

  it('14. Master Admin executa evaluate', async () => {
    const res = await req(app).post('/api/evaluate').set('Authorization', 'Bearer admin').send({});
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    
    expect(res.body.dualRunPlanGenerated).toBe(true);
    expect(res.body.telemetryReadinessGenerated).toBe(true);
    expect(res.body.comparisonPlanGenerated).toBe(true);
    expect(res.body.reversibleActivationPlanGenerated).toBe(true);
    expect(res.body.observabilityMatrixGenerated).toBe(true);
    expect(res.body.decisionCheckpointMatrixGenerated).toBe(true);
    expect(res.body.rollbackCriteriaGenerated).toBe(true);

    expect(res.body.dualRunExecuted).toBe(false);
    expect(res.body.realTrafficDuplicated).toBe(false);
    expect(res.body.realRequestCaptured).toBe(false);
    expect(res.body.realResponseCaptured).toBe(false);
    expect(res.body.productionV2Activated).toBe(false);
    expect(res.body.trafficChanged).toBe(false);
    expect(res.body.routeToV2).toBe(false);
    expect(res.body.routeToLegacy).toBe(true);
    expect(res.body.v2HandlerCalled).toBe(false);
    expect(res.body.appUseModified).toBe(false);
    expect(res.body.middlewareInstalled).toBe(false);
    expect(res.body.tapInstalled).toBe(false);
    expect(res.body.rollbackExecuted).toBe(false);
    expect(res.body.killSwitchInstalled).toBe(false);
    expect(res.body.workersCreated).toBe(false);
    expect(res.body.realSefazCalled).toBe(false);
  });

  it('15. Master Admin executa simulate-decision', async () => {
    const res = await req(app).post('/api/simulate-decision').set('Authorization', 'Bearer admin').send({});
    expect(res.status).toBe(200);
    expect(res.body.decisionSimulated).toBe(true);
    expect(res.body.go).toBe(false);
  });

  it('16. Master Admin acessa report', async () => {
    const res = await req(app).get('/api/report').set('Authorization', 'Bearer admin');
    expect(res.status).toBe(200);
    expect(res.body.message).toContain('O Módulo 19.5 foi encerrado em modo read-only');
    expect(res.body.payloadIncluded).toBe(false);
    expect(res.body.sensitiveDataIncluded).toBe(false);
  });

  it('17. Master Admin acessa audit', async () => {
    const res = await req(app).get('/api/audit').set('Authorization', 'Bearer admin');
    expect(res.status).toBe(200);
    expect(res.body.auditTrails.length).toBeGreaterThan(0);
  });

  it('18. Master Admin acessa health', async () => {
    const res = await req(app).get('/api/health').set('Authorization', 'Bearer admin');
    expect(res.status).toBe(200);
    expect(res.body.productionDualRunDryRunOnly).toBe(true);
    expect(res.body.reversibleActivationTelemetryOnly).toBe(true);
  });

});
