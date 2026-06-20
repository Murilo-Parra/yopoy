import { describe, expect, it } from "vitest";
import * as fs from "fs";
import * as path from "path";

const MODULE_PATH = "src/backend/admin/registerAdminAffiliateMutationRoutes.ts";
const TEST_PATH = "src/backend/admin/tests/admin-affiliate-mutation-routes-wiring.test.ts";
const REPORT_PATH = "docs/server-refactor-49.1-AA.md";

describe("admin affiliate mutation route extraction 49.1-AA", () => {
  function readProjectFile(relativePath: string): string {
    const filePath = path.resolve(process.cwd(), relativePath);
    expect(fs.existsSync(filePath), `${relativePath} must exist`).toBe(true);
    return fs.readFileSync(filePath, "utf8");
  }

  it("mantém todos os arquivos obrigatórios da etapa", () => {
    readProjectFile("server.ts");
    readProjectFile(MODULE_PATH);
    readProjectFile(TEST_PATH);
    readProjectFile(REPORT_PATH);
  });

  it("importa, registra e injeta o módulo no ponto correto do server.ts", () => {
    const serverContent = readProjectFile("server.ts");

    expect(serverContent).toContain(
      'import { registerAdminAffiliateMutationRoutes } from "./src/backend/admin/registerAdminAffiliateMutationRoutes";'
    );
    expect(serverContent).toContain("registerAdminAffiliateMutationRoutes(app, {");
    expect(serverContent).toContain("requireMasterAdmin,");
    expect(serverContent).toContain("getIsPostgresActive: () => isPostgresActive");
    expect(serverContent).toContain("getPgPool: () => pgPool");
    expect(serverContent).toContain("dbInMemoryLocal,");
    expect(serverContent).toContain("scheduleSaveLocalFallback");
    expect(serverContent).not.toMatch(/app\.post\(\s*["']\/api\/admin\/affiliates\/create["']/);
    expect(serverContent).toContain("registerAdminAffiliateQueryRoutes(app, {");
    expect(serverContent).toContain("registerAdminCommissionQueryRoutes(app, {");

    const affiliateQueryIndex = serverContent.indexOf("registerAdminAffiliateQueryRoutes(app, {");
    const affiliateMutationIndex = serverContent.indexOf("registerAdminAffiliateMutationRoutes(app, {");
    const commissionQueryIndex = serverContent.indexOf("registerAdminCommissionQueryRoutes(app, {");

    expect(affiliateQueryIndex).toBeGreaterThan(-1);
    expect(affiliateMutationIndex).toBeGreaterThan(affiliateQueryIndex);
    expect(commissionQueryIndex).toBeGreaterThan(affiliateMutationIndex);
  });

  it("preserva contrato, validação, SQL e fallback central", () => {
    const routeContent = readProjectFile(MODULE_PATH);

    expect(routeContent).toContain("export function registerAdminAffiliateMutationRoutes(");
    expect(routeContent).toContain('app.post("/api/admin/affiliates/create"');
    expect(routeContent).toContain("dependencies.requireMasterAdmin");
    expect(routeContent).toContain("if (!name || !email || !code)");
    expect(routeContent).toContain("Nome, e-mail e código exclusivo de afiliado são obrigatórios.");
    expect(routeContent).toContain("INSERT INTO affiliates (id, name, email, code, commission_rate, discount_rate)");
    expect(routeContent).toContain("VALUES ($1, $2, $3, $4, $5, $6)");
    expect(routeContent).toContain("dependencies.getIsPostgresActive()");
    expect(routeContent).toContain("dependencies.getPgPool()");
    expect(routeContent).toContain("dependencies.dbInMemoryLocal.global['affiliates'] || '[]'");
    expect(routeContent).toContain("dependencies.scheduleSaveLocalFallback()");
    expect(routeContent).toContain("'aff_' + Date.now()");
    expect(routeContent).toContain("new Date().toISOString()");
    expect(routeContent).toContain("Parceiro Afiliado registrado estrategicamente com sucesso!");
    expect(routeContent).toContain("Erro ao criar parceiro. Verique se código já existe.");

    const fallbackIndex = routeContent.indexOf("} else {");
    const scheduleIndex = routeContent.indexOf("dependencies.scheduleSaveLocalFallback()");
    const successIndex = routeContent.indexOf("res.json({ success: true");
    expect(scheduleIndex).toBeGreaterThan(fallbackIndex);
    expect(scheduleIndex).toBeLessThan(successIndex);
  });

  it("limita o módulo a POST e evita domínios e acoplamentos proibidos", () => {
    const routeContent = readProjectFile(MODULE_PATH);
    const importLines = routeContent
      .split("\n")
      .filter((line) => line.trimStart().startsWith("import "))
      .join("\n");

    expect(routeContent).not.toMatch(/\bapp\.(?:get|put|patch|delete)\s*\(/);
    expect(routeContent).not.toMatch(/\b(?:BEGIN|COMMIT|ROLLBACK)\b/);
    expect(routeContent).not.toMatch(/getSessionFromRequest|crypto\.randomUUID|SefazConnector|CertificateManager|CompanyController|DANFE|\bNFe\b|\bNFCe\b|\bNFSe\b|certificados/i);
    expect(importLines).toContain('from "express"');
    expect(importLines).not.toMatch(/auth|db\.ts|pgPool|dbInMemoryLocal/i);
  });

  it("não usa atalhos de tipagem proibidos", () => {
    const routeContent = readProjectFile(MODULE_PATH);
    const forbiddenPatterns = [
      /as\s+\x61ny/,
      /Promise\s*<\s*\x61ny\s*>/,
      /\b\x61ny\b/,
      /unknown\s+as\s+Request/,
      /unknown\s+as\s+Response/
    ];

    for (const pattern of forbiddenPatterns) {
      expect(routeContent).not.toMatch(pattern);
    }
  });
});
