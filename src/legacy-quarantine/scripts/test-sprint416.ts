import { Request, Response } from "express";
import { ShadowDashboardController } from "./modules/fiscal/api/ShadowDashboardController";

async function runTest() {
  console.log("==================================================");
  console.log("Iniciando Testes da Sprint 4.16 - Painel Shadow");
  console.log("==================================================");

  let successCount = 0;
  let failCount = 0;

  function assert(condition: boolean, msg: string) {
    if (condition) {
      console.log(`[PASS]  ${msg}`);
      successCount++;
    } else {
      console.error(`[FAIL]  ${msg}`);
      failCount++;
    }
  }

  const controller = new ShadowDashboardController();

  // Mock Request with no permissions
  const mockReqUser = {
    query: { limit: "10" } as any,
    user: { id: "user-1", is_master_admin: false, company_id: "test-corp" },
    headers: {}
  } as unknown as Request;

  const resDataUser: any = {};
  const mockResUser = {
    json: (data: any) => { resDataUser.data = data; },
    status: (code: number) => { resDataUser.status = code; return mockResUser; }
  } as unknown as Response;

  await controller.getSummary(mockReqUser, mockResUser);

  assert(
    resDataUser.data?.success === true && resDataUser.data?.data?.totalRuns >= 0,
    "Usuário comum acessando via Master route c/ filtro test-corp aplicado"
  );
  
  // Master Admin Request
  const mockReqMaster = {
    query: { limit: "10" } as any,
    user: { id: "admin-1", is_master_admin: true },
    headers: {}
  } as unknown as Request;

  const resDataMaster: any = {};
  const mockResMaster = {
    json: (data: any) => { resDataMaster.data = data; },
    status: (code: number) => { resDataMaster.status = code; return mockResMaster; }
  } as unknown as Response;

  await controller.getReadiness(mockReqMaster, mockResMaster);

  assert(
    resDataMaster.data?.success === true && resDataMaster.data?.data?.readinessClass !== undefined,
    "Master Admin acessando Readiness route globalmente"
  );

  console.log(`Sucesso: ${successCount}, Falha: ${failCount}`);
}

runTest();
