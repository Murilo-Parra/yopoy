import { describe, expect, it } from "vitest";
import * as fs from "fs";
import * as path from "path";

const MODULE_PATH = "src/backend/admin/registerAdminCommissionQueryRoutes.ts";

describe("admin commission query route extraction 49.1-Y", () => {
  function readProjectFile(relativePath: string): string {
    const filePath = path.resolve(process.cwd(), relativePath);
    expect(fs.existsSync(filePath), `${relativePath} must exist`).toBe(true);
    return fs.readFileSync(filePath, "utf8");
  }

  it("mantém todos os arquivos obrigatórios da etapa", () => {
    readProjectFile("server.ts");
    readProjectFile(MODULE_PATH);
    readProjectFile("src/backend/admin/tests/admin-commission-query-routes-wiring.test.ts");
    readProjectFile("docs/server-refactor-49.1-Y.md");
  });

  it("importa e registra o módulo no ponto correto do server.ts", () => {
    const serverContent = readProjectFile("server.ts");

    expect(serverContent).toContain(
      'import { registerAdminCommissionQueryRoutes } from "./src/backend/admin/registerAdminCommissionQueryRoutes";'
    );
    const registrationMatch = serverContent.match(
      /registerAdminCommissionQueryRoutes\(app,\s*\{([\s\S]*?)\n\}\);/
    );
    expect(registrationMatch).not.toBeNull();
    const registrationContent = registrationMatch?.[1] || "";

    expect(registrationContent).toContain("requireMasterAdmin,");
    expect(registrationContent).toContain("getIsPostgresActive: () => isPostgresActive");
    expect(registrationContent).toContain("getPgPool: () => pgPool");
    expect(registrationContent).toContain("dbInMemoryLocal");
    expect(serverContent).not.toMatch(/app\.get\(\s*["']\/api\/admin\/commissions["']/);
    expect(serverContent).toContain('app.post("/api/admin/commissions/:id/pay"');
    expect(serverContent).toContain("registerAdminSupportQueryRoutes(app, {");

    const createAffiliateIndex = serverContent.indexOf('app.post("/api/admin/affiliates/create"');
    const registerIndex = serverContent.indexOf("registerAdminCommissionQueryRoutes(app, {");
    const payCommissionIndex = serverContent.indexOf('app.post("/api/admin/commissions/:id/pay"');
    const supportIndex = serverContent.indexOf("registerAdminSupportQueryRoutes(app, {");

    expect(registerIndex).toBeGreaterThan(createAffiliateIndex);
    expect(payCommissionIndex).toBeGreaterThan(registerIndex);
    expect(supportIndex).toBeGreaterThan(payCommissionIndex);
  });

  it("preserva a consulta PostgreSQL, os joins, a ordenação e o fallback local", () => {
    const routeContent = readProjectFile(MODULE_PATH);

    expect(routeContent).toContain("export function registerAdminCommissionQueryRoutes(");
    expect(routeContent).toContain('/api/admin/commissions');
    expect(routeContent).toContain("dependencies.requireMasterAdmin");
    expect(routeContent).toContain("dependencies.getIsPostgresActive()");
    expect(routeContent).toContain("dependencies.getPgPool()");
    expect(routeContent).toContain("SELECT ac.*, a.name as affiliate_name, a.code as affiliate_code, c.corporate_name as company_name");
    expect(routeContent).toContain("FROM affiliate_commissions ac");
    expect(routeContent).toContain("JOIN affiliates a ON ac.affiliate_id = a.id");
    expect(routeContent).toContain("LEFT JOIN companies c ON ac.company_id = c.id");
    expect(routeContent).toContain("ORDER BY ac.created_at DESC");
    expect(routeContent).toContain('dependencies.dbInMemoryLocal.global["affiliate_commissions"] || "[]"');
    expect(routeContent).toContain('dependencies.dbInMemoryLocal.global["affiliates"] || "[]"');
    expect(routeContent).toContain('dependencies.dbInMemoryLocal.global["companies"] || "[]"');
    expect(routeContent).toContain("affiliates.find((a) => a.id === ac.affiliate_id)");
    expect(routeContent).toContain("companies.find((c) => c.id === ac.company_id)");
    expect(routeContent).toContain('affiliate_name: aff ? aff.name : "Parceiro Avulso"');
    expect(routeContent).toContain('affiliate_code: aff ? aff.code : "N/A"');
    expect(routeContent).toContain('company_name: comp ? comp.corporate_name : "Nova Empresa Premium"');
    expect(routeContent).toContain('res.status(500).json({ error: "Erro ao consultar comissões." })');
    expect(routeContent).toContain("res.json(result)");
  });

  it("usa apenas dependências injetadas e não contém mutações ou domínios proibidos", () => {
    const routeContent = readProjectFile(MODULE_PATH);
    const importLines = routeContent
      .split("\n")
      .filter((line) => line.trimStart().startsWith("import "))
      .join("\n");

    expect(importLines).toContain('from "express"');
    expect(importLines).not.toMatch(/auth/i);
    expect(importLines).not.toContain("requireMasterAdmin");
    expect(importLines).not.toContain("db.ts");
    expect(importLines).not.toContain("pgPool");
    expect(importLines).not.toContain("dbInMemoryLocal");
    expect(importLines).not.toMatch(/fiscal|SEFAZ|NF-e|NFC-e|NFS-e|DANFE|certificat/i);
    expect(routeContent).not.toMatch(/\bapp\.(?:post|put|patch|delete)\s*\(/);
    expect(routeContent).not.toMatch(/\b(?:BEGIN|COMMIT|ROLLBACK)\b/);
    expect(routeContent).not.toMatch(
      /scheduleSaveLocalFallback|crypto\.randomUUID|getSessionFromRequest|SefazConnector|CertificateManager|CompanyController|DANFE|\bNFe\b|\bNFCe\b|\bNFSe\b/
    );
  });

  it("acessa estado mutável somente pelos getters injetados", () => {
    const routeContent = readProjectFile(MODULE_PATH);

    expect(routeContent).not.toMatch(/\bisPostgresActive\b/);
    expect(routeContent).toContain("dependencies.getIsPostgresActive()");
    expect(routeContent).toContain("const pgPool = dependencies.getPgPool();");
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
