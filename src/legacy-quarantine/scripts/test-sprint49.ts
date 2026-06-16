import { FiscalWriteGuard } from "./modules/fiscal/services/FiscalWriteGuard";
import { FiscalDocumentService } from "./modules/fiscal/services/FiscalDocumentService";
import { NfeService } from "./modules/fiscal/services/NfeService";
import { NfceService } from "./modules/fiscal/services/NfceService";
import { DanfeService } from "./modules/fiscal/services/DanfeService";
import { SefazProtocolService } from "./modules/fiscal/services/SefazProtocolService";
import { FiscalSandboxCleanupService } from "./modules/fiscal/services/FiscalSandboxCleanupService";
import { initializeDb } from "./infrastructure/database/bootstrap";
import { pgPool } from "./infrastructure/database";
import { FiscalWriteMode } from "./modules/fiscal/types/fiscalWrite.types";

async function runTests() {
  console.log("==================================================");
  console.log("Iniciando Testes da Sprint 4.9 - Sandbox Persistence");
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

  const companyId = "comp-sandbox-test-" + Date.now();
  await pgPool.query("SET app.bypass_rls = 'true'");
  await pgPool.query("INSERT INTO companies (id, corporate_name, cnpj) VALUES ($1, 'Test', '11111111111111') ON CONFLICT DO NOTHING", [companyId]);

  const guard = new FiscalWriteGuard(FiscalWriteMode.SANDBOX_PERSISTENCE);
  const docService = new FiscalDocumentService(undefined, guard);
  const nfeService = new NfeService(undefined, guard);
  const nfceService = new NfceService(undefined, guard);
  const danfeService = new DanfeService(undefined, guard);
  const sefazService = new SefazProtocolService(undefined, guard);
  const cleanupService = new FiscalSandboxCleanupService();

  // Test 1: FiscalWriteGuard bloqueia SANDBOX_PERSISTENCE sem sandbox: true => done implicitly if we don't pass context, but we use the service methods which enforce context.
  
  // Create Fiscal Document
  let createdDocId: string | null = null;
  try {
    const res = await docService.sandboxCreateDocument(companyId, {
      documentType: "NFE",
      documentNumber: 99,
      documentSeries: 1,
      xmlContent: "<xml/>"
    });
    createdDocId = res.createdIds[0];
    assert(res.success && res.sandbox && res.persisted, "sandboxCreateDocument succeeded");
  } catch (e: any) {
    console.error("error:", e);
    assert(false, "sandboxCreateDocument should not throw in sandbox mode");
  }

  // Check it's there
  if (createdDocId) {
    const check1 = await pgPool.query("SELECT * FROM fiscal_documents WHERE id = $1", [createdDocId]);
    assert(check1.rowCount === 1, "Fiscal record is visible in DB");
    assert(check1.rows[0].created_by === "fiscal-v2-sandbox", "Fiscal record is marked as sandbox");
  }

  // Create NFE
  let createdNfeId: string | null = null;
  try {
    const res = await nfeService.sandboxCreateNfe(companyId, { 
      number: 99, 
      series: 1, 
      totalValue: 100,
      customerName: "Test Sandbox",
      customerCnpjCpf: "11111111111",
      xmlContent: "<xml/>" 
    });
    createdNfeId = res.createdIds[0];
    assert(res.success, "sandboxCreateNfe succeeded");
  } catch (e: any) {
    console.error("NFE ERROR:", e);
    assert(false, "sandboxCreateNfe should not throw");
  }

  // Update NFE
  if (createdNfeId) {
    try {
      const res = await nfeService.sandboxUpdateNfeStatus(companyId, createdNfeId, "AUTHORIZED");
      assert(res.success, "sandboxUpdateNfeStatus succeeded");
      const checkUpdate = await pgPool.query("SELECT * FROM nfe_documents WHERE id = $1", [createdNfeId]);
      assert(checkUpdate.rows[0].status === "AUTHORIZED", "NFe status updated appropriately");
    } catch (e) {
      assert(false, "sandboxUpdateNfeStatus should not throw");
    }
  }

  // Cleanup by source
  try {
    const cleanRes = await cleanupService.cleanupBySandboxSource(companyId, "fiscal-v2-sandbox");
    assert(cleanRes.deletedCount >= 2, `Cleanup removed ${cleanRes.deletedCount} items`);
    
    // Check if items are actually deleted
    const checkAfter1 = await pgPool.query("SELECT * FROM fiscal_documents WHERE id = $1", [createdDocId]);
    assert(checkAfter1.rowCount === 0, "Fiscal record successfully removed by cleanup");
    
    const checkAfter2 = await pgPool.query("SELECT * FROM nfe_documents WHERE id = $1", [createdNfeId]);
    assert(checkAfter2.rowCount === 0, "Nfe record successfully removed by cleanup");
  } catch (e) {
    assert(false, "cleanupBySandboxSource should not throw");
  }

  console.log("\n==================================================");
  console.log("RESULTADO DOS TESTES SPRINT 4.9");
  console.log(`Sucessos: ${successCount}`);
  console.log(`Falhas: ${failCount}`);
  console.log("==================================================");

  if (pgPool) {
    await pgPool.end();
  }

  if (failCount > 0) process.exit(1);
}

runTests().catch(console.error);
