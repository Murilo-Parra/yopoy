import { Request, Response } from "express";
import { SandboxFiscalController } from "./modules/fiscal/api/SandboxFiscalController";
import { initializeDb } from "./infrastructure/database/bootstrap";
import { pgPool } from "./infrastructure/database";

async function runTests() {
  console.log("==================================================");
  console.log("Iniciando Testes da Sprint 4.10 - HTTP Sandbox Persistence");
  console.log("==================================================");

  let connStr = `postgresql://postgres:zFGu%25k*N%3F9%2Fyv%2Fv@db.jymucotbvrdspjczpkks.supabase.co:6543/postgres?sslmode=require`;
  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("YOUR-PASSWORD")) {
    connStr = process.env.DATABASE_URL;
  }
  process.env.DATABASE_URL = connStr;

  try {
    await initializeDb();
  } catch (e) {
    console.error("Failed to initializeDb:", e);
  }

  if (!pgPool) {
    console.error("No pgPool available. Skipping tests.");
    process.exit(1);
  }

  await pgPool.query("SET app.bypass_rls = 'true'");
  await pgPool.query("INSERT INTO companies (id, corporate_name, cnpj) VALUES ($1, 'Test', '11111111111111') ON CONFLICT DO NOTHING", ["comp-sandbox-test-123"]);

  const controller = new SandboxFiscalController();

  let successCount = 0;
  let failCount = 0;

  function assert(condition: boolean, msg: string) {
    if (condition) {
      console.log(`[PASS] ${msg}`);
      successCount++;
    } else {
      console.error(`[FAIL] ${msg}`);
      failCount++;
    }
  }

  // Helper to create mock req and res
  function createMockContext(session: any, body: any = {}, params: any = {}): { req: Request, res: Response, getResponseBody: () => any, getStatusCode: () => number } {
    const req = {
      session,
      user: null as any,
      body,
      params,
      query: {}
    } as unknown as Request;

    let statusCode = 200;
    let responseBody: any = null;

    const res = {
      status: (code: number) => {
        statusCode = code;
        return res;
      },
      json: (data: any) => {
        responseBody = data;
        return res;
      }
    } as unknown as Response;

    return {
      req,
      res,
      getResponseBody: () => responseBody,
      getStatusCode: () => statusCode
    };
  }

  const validSession = { company_id: "comp-sandbox-test-123", user_id: "user-123" };

  try {
    // Test 1: No auth should fail. We know `extractCompanyId` throws an error.
    const { req: reqNoAuth, res: resNoAuth, getStatusCode: getNoAuthCode } = createMockContext(null);
    await controller.sandboxCreateDocument(reqNoAuth, resNoAuth);
    assert(getNoAuthCode() === 400 || getNoAuthCode() === 401, "Todas as rotas sem sessão devem falhar (extractCompanyId throw 400 em controller ou 401 no middleware)");
    
    // Test 2: POST /api/fiscal-v2/sandbox/documents com sessão válida
    const { req: reqDocs, res: resDocs, getResponseBody: getDocsBody, getStatusCode: getDocsCode } = createMockContext(validSession, {
      documentType: "NFE",
      documentNumber: 123,
      documentSeries: 1,
      xmlContent: "<xml/>"
    });
    await controller.sandboxCreateDocument(reqDocs, resDocs);
    const bodyDocs = getDocsBody();
    assert(getDocsCode() === 200, "POST /api/fiscal-v2/sandbox/documents retornou 200");
    assert(bodyDocs.sandbox === true, "resposta de criação tem sandbox: true");
    assert(bodyDocs.persisted === true, "resposta de criação tem persisted: true");
    assert(bodyDocs.cleanupRequired === true, "resposta de criação tem cleanupRequired: true");
    assert(bodyDocs.createdIds && bodyDocs.createdIds.length > 0, "resposta de criação tem createdIds");

    // Test 3: POST /api/fiscal-v2/sandbox/nfe
    const { req: reqNfe, res: resNfe, getResponseBody: getNfeBody, getStatusCode: getNfeCode } = createMockContext(validSession, {
      number: 123,
      series: 1,
      totalValue: 50,
      customerName: "Test Sandbox",
      customerCnpjCpf: "11111111111",
      xmlContent: "<xml/>"
    });
    await controller.sandboxCreateNfe(reqNfe, resNfe);
    const bodyNfe = getNfeBody();
    assert(getNfeCode() === 200, "POST /api/fiscal-v2/sandbox/nfe retornou 200");

    const createdNfeId = bodyNfe?.createdIds?.[0];

    // Test 4: POST /api/fiscal-v2/sandbox/nfe/:id/status
    if (createdNfeId) {
      const { req: reqStatus, res: resStatus, getStatusCode: getStatusCode } = createMockContext(validSession, { status: "AUTHORIZED" }, { id: createdNfeId });
      await controller.sandboxUpdateNfeStatus(reqStatus, resStatus);
      assert(getStatusCode() === 200, "POST /api/fiscal-v2/sandbox/nfe/:id/status retornou 200");
    } else {
      assert(false, "Falha ao testar update status pois createdNfeId é undefined");
    }

    // Test 5: payload inválido (400)
    const { req: reqInvalid, res: resInvalid, getStatusCode: getInvalidCode } = createMockContext(validSession, {});
    await controller.sandboxCreateNfe(reqInvalid, resInvalid);
    assert(getInvalidCode() === 400, "payload inválido retorna 400");

    // Test 6: Cleanup remove
    const { req: reqCleanup, res: resCleanup, getResponseBody: getCleanupBody, getStatusCode: getCleanupCode } = createMockContext(validSession, {
      source: "fiscal-v2-sandbox"
    });
    await controller.cleanupSandbox(reqCleanup, resCleanup);
    const bodyCleanup = getCleanupBody();
    assert(getCleanupCode() === 200, "POST /api/fiscal-v2/sandbox/cleanup retornou 200");
    assert(bodyCleanup.removedIds && bodyCleanup.removedIds.length >= 2, "cleanup deve retornar removedIds");

    // Confirm DB cleaned
    const checkDb = await pgPool.query("SELECT * FROM nfe_documents WHERE id = $1", [createdNfeId]);
    assert(checkDb.rowCount === 0, "SELECT pós-cleanup deve confirmar remoção");

  } catch (error) {
    console.error("Erro durante os testes:", error);
  }

  console.log("\n==================================================");
  console.log("RESULTADO DOS TESTES HTTP SANDBOX");
  console.log(`Sucessos: ${successCount}`);
  console.log(`Falhas: ${failCount}`);
  console.log("==================================================");

  if (pgPool) {
    await pgPool.end();
  }
}

runTests().catch(console.error);
