import { describe, expect, it } from "vitest";
import * as fs from "fs";
import * as path from "path";

const MODULE_PATH = "src/backend/admin/registerAdminCustomProviderTemplateQueryRoutes.ts";
const TEST_PATH = "src/backend/admin/tests/admin-custom-provider-template-query-routes-wiring.test.ts";
const REPORT_PATH = "docs/server-refactor-49.1-AE.md";

describe("admin custom provider template query route extraction 49.1-AE", () => {
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

  it("importa, registra e injeta autenticação e pool dinâmico", () => {
    const serverContent = readProjectFile("server.ts");

    expect(serverContent).toContain(
      'import { registerAdminCustomProviderTemplateQueryRoutes } from "./src/backend/admin/registerAdminCustomProviderTemplateQueryRoutes";'
    );
    expect(serverContent).toMatch(
      /registerAdminCustomProviderTemplateQueryRoutes\(app,\s*\{\s*requireMasterAdmin,\s*getPgPool:\s*\(\)\s*=>\s*pgPool\s*\}\);/
    );
    expect(serverContent).not.toMatch(/app\.get\(\s*["']\/api\/admin\/custom-providers\/:id\/templates["']/);
  });

  it("mantém registros anteriores e o POST inline depois da query", () => {
    const serverContent = readProjectFile("server.ts");
    const registerIndex = serverContent.indexOf("registerAdminCustomProviderTemplateQueryRoutes(app, {");
    const templatesPostIndex = serverContent.indexOf('app.post("/api/admin/custom-providers/:id/templates"');

    expect(serverContent).toContain("registerAdminCustomProviderQueryRoutes(app, {");
    expect(serverContent).toContain("registerAdminCustomProviderMappingQueryRoutes(app, {");
    expect(serverContent).toMatch(/app\.post\(\s*["']\/api\/admin\/custom-providers\/:id\/templates["']/);
    expect(registerIndex).toBeGreaterThan(-1);
    expect(templatesPostIndex).toBeGreaterThan(registerIndex);
  });

  it("preserva método, path, parâmetro, fallback, SQL, payload e erro", () => {
    const routeContent = readProjectFile(MODULE_PATH);

    expect(routeContent).toContain('app.get("/api/admin/custom-providers/:id/templates"');
    expect(routeContent).toContain("dependencies.requireMasterAdmin");
    expect(routeContent).toContain("const pgPool = dependencies.getPgPool()");
    expect(routeContent).toContain("const { id } = req.params");
    expect(routeContent).toContain("res.json([])");
    expect(routeContent).toContain("SELECT * FROM custom_provider_templates WHERE provider_id = $1");
    expect(routeContent).toContain("`, [id])");
    expect(routeContent).toContain("res.json(result.rows)");
    expect(routeContent).toContain('error: "Falha ao listar templates"');
    expect(routeContent).toContain("details: getErrorDetails(err)");
  });

  it("usa somente app.get e não contém transações", () => {
    const routeContent = readProjectFile(MODULE_PATH);

    expect(routeContent).not.toMatch(/app\.(?:post|put|patch|delete)\s*\(/);
    expect(routeContent).not.toMatch(/\b(?:BEGIN|COMMIT|ROLLBACK)\b/);
  });

  it("usa interfaces locais mínimas e não importa dependências diretamente", () => {
    const routeContent = readProjectFile(MODULE_PATH);
    const importLines = routeContent
      .split("\n")
      .filter((line) => line.trimStart().startsWith("import "))
      .join("\n");
    const importSources = Array.from(
      importLines.matchAll(/from\s+["']([^"']+)["']/g),
      (match) => match[1]
    );

    expect(routeContent).toContain("interface AdminCustomProviderTemplateQueryPgResult");
    expect(routeContent).toContain("interface AdminCustomProviderTemplateQueryPgPool");
    expect(routeContent).toContain("getPgPool: () => AdminCustomProviderTemplateQueryPgPool | null");
    expect(importSources).toEqual(["express"]);
    expect(importLines).not.toMatch(/auth/i);
    expect(importLines).not.toMatch(/pgPool/i);
    expect(importLines).not.toMatch(/dbInMemoryLocal/i);
    expect(importSources.some((source) => /(^|\/)db(?:\.ts)?(?:\/|$)/i.test(source))).toBe(false);
  });

  it("não usa tipagens ou dependências proibidas", () => {
    const routeContent = readProjectFile(MODULE_PATH);
    const forbiddenPatterns = [
      /as\s+\x61ny/,
      /Promise\s*<\s*\x61ny\s*>/,
      /\b\x61ny\b/,
      /unknown\s+as\s+Request/,
      /unknown\s+as\s+Response/,
      /dbInMemoryLocal/i,
      /scheduleSaveLocalFallback/i,
      /crypto\.randomUUID/i,
      /getSessionFromRequest/i,
      /isPostgresActive/i,
      /SefazConnector/i,
      /CertificateManager/i,
      /CompanyController/i,
      /DANFE/i,
      /\bNFe\b/i,
      /\bNFCe\b/i,
      /\bNFSe\b/i,
      /certificad/i
    ];

    for (const pattern of forbiddenPatterns) {
      expect(routeContent).not.toMatch(pattern);
    }
  });
});
