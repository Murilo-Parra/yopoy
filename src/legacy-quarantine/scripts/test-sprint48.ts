import { FiscalTransactionRunner } from "./modules/fiscal/repositories/FiscalTransactionRunner";
import { FiscalDocumentRepository } from "./modules/fiscal/repositories/FiscalDocumentRepository";
import { NfeRepository } from "./modules/fiscal/repositories/NfeRepository";
import { NfceRepository } from "./modules/fiscal/repositories/NfceRepository";
import { DanfeRepository } from "./modules/fiscal/repositories/DanfeRepository";
import { SefazProtocolRepository } from "./modules/fiscal/repositories/SefazProtocolRepository";
import { pgPool } from "./infrastructure/database";
import { initializeDb } from "./infrastructure/database/bootstrap";

async function runTests() {
  console.log("==================================================");
  console.log("Iniciando Testes da Sprint 4.8 - DML com Rollback");
  console.log("==================================================");

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

  let connStr = `postgresql://postgres:zFGu%25k*N%3F9%2Fyv%2Fv@db.jymucotbvrdspjczpkks.supabase.co:6543/postgres?sslmode=require`;
  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("YOUR-PASSWORD")) {
    connStr = process.env.DATABASE_URL;
  }
  process.env.DATABASE_URL = connStr;

  // Make sure DB is running
  try {
    await initializeDb();
  } catch (e) {
    console.error("Failed to initializeDb:", e);
  }
  
  if (!pgPool) {
    console.error("No pgPool available. Skipping tests.");
    process.exit(1);
  }


  const transactionRunner = new FiscalTransactionRunner();
  const docRepo = new FiscalDocumentRepository() as any;
  const nfeRepo = new NfeRepository() as any;
  const nfceRepo = new NfceRepository() as any;
  const danfeRepo = new DanfeRepository() as any;
  const sefazRepo = new SefazProtocolRepository() as any;

  const companyId = "comp-rollback-test-" + Date.now();

  // Test 1: FiscalTransactionRunner execution and rollback
  let createdDocId: string | null = null;
  try {
    await transactionRunner.runRollbackOnly("test_doc_create", async (client) => {
      await client.query("SET app.bypass_rls = 'true'");
      await client.query("INSERT INTO companies (id, corporate_name, cnpj) VALUES ($1, 'Test', '11111111111111')", [companyId]);

      const res = await docRepo.testCreateRollbackOnly(
        companyId,
        { documentType: "NFE", documentNumber: 1, documentSeries: 1, xmlContent: "<xml/>" },
        client
      );
      assert(res != null, "testCreateRollbackOnly inserted row inside transaction");
      createdDocId = res.id;
      
      const doc = await client.query("SELECT * FROM fiscal_documents WHERE id = $1", [createdDocId]);
      assert(doc.rowCount === 1, "testCreateRollbackOnly is visible inside transaction");
      
      return res;
    });
  } catch (err) {
    console.error("Error running transaction:", err);
  }

  assert(createdDocId !== null, "document ID was safely captured from callback");
  
  // Verify it was rolled back
  const checkRollback = await pgPool.query("SELECT * FROM fiscal_documents WHERE id = $1", [createdDocId]);
  assert(checkRollback.rowCount === 0, "testCreateRollbackOnly was correctly rolled back!");

  // Test 2: Exception handling rollback
  let exceptionDocId: string | null = null;
  try {
    await transactionRunner.runRollbackOnly("test_exception_rollback", async (client) => {
      await client.query("SET app.bypass_rls = 'true'");
      await client.query("INSERT INTO companies (id, corporate_name, cnpj) VALUES ($1, 'Test', '11111111111111')", [companyId]);

      const res = await docRepo.testCreateRollbackOnly(
        companyId,
        { documentType: "NFE", documentNumber: 2, documentSeries: 1, xmlContent: "<xml/>" },
        client
      );
      exceptionDocId = res.id;
      throw new Error("Simulated failure inside transaction");
    });
  } catch (err: any) {
    assert(err.message === "Simulated failure inside transaction", "Transaction threw the expected error");
  }

  const checkFailRollback = await pgPool.query("SELECT * FROM fiscal_documents WHERE id = $1", [exceptionDocId]);
  assert(checkFailRollback.rowCount === 0, "testCreateRollbackOnly was correctly rolled back on exception!");

  // Test NFe
  let nfeId: string | null = null;
  await transactionRunner.runRollbackOnly("test_nfe_create_update", async (client) => {
    await client.query("SET app.bypass_rls = 'true'");
    await client.query("INSERT INTO companies (id, corporate_name, cnpj) VALUES ($1, 'Test', '11111111111111')", [companyId]);

    const res = await nfeRepo.testCreateRollbackOnly(companyId, { number: 123, series: 1 }, client);
    assert(res.status === "PENDING", "NFe testCreateRollbackOnly created with PENDING");
    nfeId = res.id;

    const res2 = await nfeRepo.testUpdateStatusRollbackOnly(companyId, nfeId, "AUTHORIZED", client);
    assert(res2.status === "AUTHORIZED", "NFe testUpdateStatusRollbackOnly updated to AUTHORIZED");
  });

  const checkNfe = await pgPool.query("SELECT * FROM nfe_documents WHERE id = $1", [nfeId]);
  assert(checkNfe.rowCount === 0, "Nfe operations were rolled back");

  // Test NFCe
  let nfceId: string | null = null;
  await transactionRunner.runRollbackOnly("test_nfce", async (client) => {
    await client.query("SET app.bypass_rls = 'true'");
    await client.query("INSERT INTO companies (id, corporate_name, cnpj) VALUES ($1, 'Test', '11111111111111') ON CONFLICT DO NOTHING", [companyId]);

    const res = await nfceRepo.testCreateRollbackOnly(companyId, { number: 999, series: 1 }, client);
    assert(res.status === "PENDING", "NFCe testCreateRollbackOnly created");
    nfceId = res.id;

    const res2 = await nfceRepo.testCancelRollbackOnly(companyId, nfceId, {}, client);
    assert(res2.status === "CANCELLED", "NFCe testCancelRollbackOnly cancelled");
  });
  const checkNfce = await pgPool.query("SELECT * FROM nfce_documents WHERE id = $1", [nfceId]);
  assert(checkNfce.rowCount === 0, "NFCe operations were rolled back");

  // Test DANFE
  let danfeId: string | null = null;
  await transactionRunner.runRollbackOnly("test_danfe", async (client) => {
    await client.query("SET app.bypass_rls = 'true'");
    await client.query("INSERT INTO companies (id, corporate_name, cnpj) VALUES ($1, 'Test', '11111111111111') ON CONFLICT DO NOTHING", [companyId]);
    
    const res = await danfeRepo.testSaveRollbackOnly(companyId, { pdfPath: "/fake/path" }, client);
    assert(res.id != null, "DANFE testSaveRollbackOnly created");
    danfeId = res.id;
  });
  const checkDanfe = await pgPool.query("SELECT * FROM danfe_documents WHERE id = $1", [danfeId]);
  assert(checkDanfe.rowCount === 0, "DANFE operations were rolled back");

  // Test SEFAZ Protocol
  let sefazId: string | null = null;
  await transactionRunner.runRollbackOnly("test_sefaz", async (client) => {
    await client.query("SET app.bypass_rls = 'true'");
    await client.query("INSERT INTO companies (id, corporate_name, cnpj) VALUES ($1, 'Test', '11111111111111') ON CONFLICT DO NOTHING", [companyId]);
    
    const res = await sefazRepo.testSaveRollbackOnly(companyId, { protocolNumber: "999888" }, client);
    assert(res.id != null, "SEFAZ protocol testSaveRollbackOnly created");
    sefazId = res.id;
  });
  const checkSefaz = await pgPool.query("SELECT * FROM sefaz_protocols WHERE id = $1", [sefazId]);
  assert(checkSefaz.rowCount === 0, "SEFAZ protocol operations were rolled back");

  console.log("\n==================================================");
  console.log("RESULTADO DOS TESTES SPRINT 4.8");
  console.log(`Sucessos: ${successCount}`);
  console.log(`Falhas: ${failCount}`);
  console.log("==================================================");

  if (pgPool) {
    await pgPool.end();
  }

  if (failCount > 0) process.exit(1);
}

runTests().catch(console.error);
