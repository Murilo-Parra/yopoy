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

import fiscalRouteTransitionClosureRoutes from '../modules/fiscal/api/fiscalRouteTransitionClosure.routes';
import { FiscalRouteTransitionClosureValidator } from '../modules/fiscal/dedicated-homologation/route-transition/closure';

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

  app.use('/api/fiscal-v2/dedicated-homologation/route-transition/closure', fiscalRouteTransitionClosureRoutes);
  
  return app;
};

describe('Fiscal Route Transition Closure 23.7', () => {
  const unauthApp = createTestApp('unauthenticated');
  const userApp = createTestApp('Comum', false);
  const adminApp = createTestApp('Administrador', true);

  it('1. Acesso sem autenticação retorna 401', async () => {
    const res = await request(unauthApp).get('/api/fiscal-v2/dedicated-homologation/route-transition/closure/policy');
    expect(res.status).toBe(401);
  });

  it('2. Usuário comum sem permissão retorna 403', async () => {
    const res = await request(userApp).get('/api/fiscal-v2/dedicated-homologation/route-transition/closure/policy');
    expect(res.status).toBe(403);
  });

  it('3. Master Admin acessa policy', async () => {
    const res = await request(adminApp).get('/api/fiscal-v2/dedicated-homologation/route-transition/closure/policy');
    expect(res.status).toBe(200);
    expect(res.body.realRouteTransitionExecuted).toBe(false);
  });

  it('4. Master Admin acessa closure-inventory', async () => {
    const res = await request(adminApp).get('/api/fiscal-v2/dedicated-homologation/route-transition/closure/closure-inventory');
    expect(res.status).toBe(200);
    expect(res.body.routeToV2).toBe(false);
    expect(res.body.routeToLegacy).toBe(true);
  });

  it('5. Master Admin acessa final-checklist', async () => {
    const res = await request(adminApp).get('/api/fiscal-v2/dedicated-homologation/route-transition/closure/final-checklist');
    expect(res.status).toBe(200);
    expect(res.body.trafficChanged).toBe(false);
    expect(res.body.appUseModified).toBe(false);
    expect(res.body.routerUseModified).toBe(false);
  });

  it('6. Master Admin acessa evidence-package', async () => {
    const res = await request(adminApp).get('/api/fiscal-v2/dedicated-homologation/route-transition/closure/evidence-package');
    expect(res.status).toBe(200);
    expect(res.body.payloadIncluded).toBe(false);
    expect(res.body.sensitiveDataIncluded).toBe(false);
  });

  it('7. Master Admin acessa production-handoff', async () => {
    const res = await request(adminApp).get('/api/fiscal-v2/dedicated-homologation/route-transition/closure/production-handoff');
    expect(res.status).toBe(200);
    expect(res.body.realRouteTransitionApproved).toBe(false);
    expect(res.body.productionV2Activated).toBe(false);
  });

  it('8. Master Admin acessa post-closure-roadmap', async () => {
     const res = await request(adminApp).get('/api/fiscal-v2/dedicated-homologation/route-transition/closure/post-closure-roadmap');
     expect(res.status).toBe(200);
     expect(res.body.approvedForRealRouteTransition).toBe(false);
  });

  it('9. Master Admin acessa final-blockers', async () => {
       const res = await request(adminApp).get('/api/fiscal-v2/dedicated-homologation/route-transition/closure/final-blockers');
       expect(res.status).toBe(200);
       expect(res.body.blockers.length).toBeGreaterThan(0);
  });

  it('10. Master Admin acessa final-risks', async () => {
      const res = await request(adminApp).get('/api/fiscal-v2/dedicated-homologation/route-transition/closure/final-risks');
      expect(res.status).toBe(200);
      expect(res.body.risks.length).toBeGreaterThan(0);
  });

  it('11. Master Admin executa validate', async () => {
      const res = await request(adminApp).post('/api/fiscal-v2/dedicated-homologation/route-transition/closure/validate').send({});
      expect(res.status).toBe(200);
      expect(res.body.valid).toBe(true);
  });

  it('12. Master Admin executa evaluate', async () => {
       const res = await request(adminApp).post('/api/fiscal-v2/dedicated-homologation/route-transition/closure/evaluate').send({});
       expect(res.status).toBe(200);
       expect(res.body.realRouteTransitionApproved).toBe(false);
       expect(res.body.realRouteTransitionExecuted).toBe(false);
  });
  
  it('13. Master Admin executa simulate-decision', async () => {
        const res = await request(adminApp).post('/api/fiscal-v2/dedicated-homologation/route-transition/closure/simulate-decision').send({});
        expect(res.status).toBe(200);
        expect(res.body.decisionSimulated).toBe(true);
        expect(res.body.go).toBe(false);
  });

  it('14. Master Admin acessa report', async () => {
       const res = await request(adminApp).get('/api/fiscal-v2/dedicated-homologation/route-transition/closure/report');
       expect(res.status).toBe(200);
       expect(res.body.message).toContain('O Módulo 23.7 foi encerrado');
  });

  it('Validator bloqueia actions reais (seleção)', () => {
      expect(FiscalRouteTransitionClosureValidator.validate({ metadata: { code: 'app.use(' } }).valid).toBe(false);
      expect(FiscalRouteTransitionClosureValidator.validate({ forceApproveRealRouteTransition: true }).valid).toBe(false);
      expect(FiscalRouteTransitionClosureValidator.validate({ metadata: { action: 'approveRouteTransition' } }).valid).toBe(false);
  });

});
