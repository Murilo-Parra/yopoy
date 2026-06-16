import { Request, Response } from "express";
import { FiscalShadowService } from "./modules/fiscal/shadow/FiscalShadowService";
import { FiscalShadowMode, FiscalShadowOperation, Severity } from "./modules/fiscal/shadow/fiscalShadow.types";

async function runTests() {
  console.log("==================================================");
  console.log("Iniciando Testes da Sprint 4.11 - Shadow Comparison");
  console.log("==================================================");

  const shadowService = new FiscalShadowService();
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

  try {
    // Test 1: Shadow compare NFE_CREATE em DRY_RUN_COMPARE
    const res1 = await shadowService.executeComparison({
      companyId: "comp-shadow-123",
      operation: FiscalShadowOperation.NFE_CREATE,
      legacyPayload: { totalValue: 100, password: "secret-password" },
      v2Payload: { totalValue: 100, status: "PENDING", password: "secret-password" },
      mode: FiscalShadowMode.DRY_RUN_COMPARE,
      source: "fiscal-v2-shadow"
    });
    assert(res1.success === true, "Executou NFE_CREATE shadow mode");
    assert(res1.sensitiveFieldsMasked === true, "Dados sensíveis foram mascarados");
    assert(res1.legacyShapeSummary.password === "string", "A senha foi mascarada, mas manteve seu shape de string");
    // differences: "status" present in v2 but not legacy
    assert(res1.differences.some(d => d.field === "status"), "Detectada divergência do campo 'status'");

    // Test 2: Shadow compare NFCE_CREATE missing mandatory legacy field
    const res2 = await shadowService.executeComparison({
      companyId: "comp-shadow-123",
      operation: FiscalShadowOperation.NFCE_CREATE,
      legacyPayload: { authKey: "abc", total: 50 },
      v2Payload: { total: 50 }, // Missing authKey
      mode: FiscalShadowMode.DRY_RUN_COMPARE,
      source: "fiscal-v2-shadow"
    });
    assert(res2.differences.some(d => d.field === "authKey" && d.severity === Severity.HIGH), "Campos legados faltantes geram HIGH severity");

    // Test 3: Shadow compare com erro de validação (exV2 empty)
    const res3 = await shadowService.executeComparison({
      companyId: "comp-shadow-123",
      operation: FiscalShadowOperation.FISCAL_DOCUMENT_CREATE,
      legacyPayload: { id: "1" },
      v2Payload: null,
      mode: FiscalShadowMode.DRY_RUN_COMPARE,
      source: "fiscal-v2-shadow"
    });
    assert(res3.warnings.some(w => w.includes("Falha de validação")), "Falha de Payload V2 empty gerou warning");
    
    // Test 4: Diferença de Tipo
    const res4 = await shadowService.executeComparison({
      companyId: "comp-shadow-123",
      operation: FiscalShadowOperation.DANFE_SAVE,
      legacyPayload: { price: "20.5" },
      v2Payload: { price: 20.5 },
      mode: FiscalShadowMode.DRY_RUN_COMPARE,
      source: "fiscal-v2-shadow"
    });
    assert(res4.differences.some(d => d.field === "price" && d.severity === Severity.MEDIUM), "Divergência de tipos gera MEDIUM severity");

    // Test 5: companyId validations
    let failOnMissingCompany = false;
    try {
      await shadowService.executeComparison({
        companyId: "",
        operation: FiscalShadowOperation.NFE_CREATE,
        legacyPayload: {},
        v2Payload: {},
        mode: FiscalShadowMode.DRY_RUN_COMPARE,
        source: "fiscal-v2-shadow"
      });
    } catch (e: any) {
      failOnMissingCompany = true;
    }
    assert(failOnMissingCompany, "companyId ausente bloqueia execução");
    
  } catch (error) {
    console.error("Erro durante os testes:", error);
  }

  console.log("\n==================================================");
  console.log("RESULTADO DOS TESTES SHADOW COMPARISON");
  console.log(`Sucessos: ${successCount}`);
  console.log(`Falhas: ${failCount}`);
  console.log("==================================================");
}

runTests().catch(console.error);
