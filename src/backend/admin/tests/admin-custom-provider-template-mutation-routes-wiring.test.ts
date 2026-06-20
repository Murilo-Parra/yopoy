import { describe, expect, it } from "vitest";
import * as fs from "fs";
import * as path from "path";

const SERVER_PATH = "server.ts";
const MODULE_PATH = "src/backend/admin/registerAdminCustomProviderTemplateMutationRoutes.ts";
const TEST_PATH = "src/backend/admin/tests/admin-custom-provider-template-mutation-routes-wiring.test.ts";
const REMAINING_GUARD_PATH = "src/backend/admin/tests/admin-remaining-mutation-routes-safety.test.ts";
const REPORT_PATH = "docs/server-refactor-49.1-AJ.md";

function readProjectFile(relativePath: string): string {
  const filePath = path.resolve(process.cwd(), relativePath);
  expect(fs.existsSync(filePath), `${relativePath} must exist`).toBe(true);
  return fs.readFileSync(filePath, "utf8");
}

describe("admin custom provider template mutation route extraction 49.1-AJ", () => {
  it("mantém todos os arquivos obrigatórios da etapa", () => {
    readProjectFile(SERVER_PATH);
    readProjectFile(MODULE_PATH);
    readProjectFile(TEST_PATH);
    readProjectFile(REMAINING_GUARD_PATH);
    readProjectFile(REPORT_PATH);
  });

  it("importa, registra e injeta autenticação, pool dinâmico e UUID", () => {
    const serverContent = readProjectFile(SERVER_PATH);

    expect(serverContent).toContain(
      'import { registerAdminCustomProviderTemplateMutationRoutes } from "./src/backend/admin/registerAdminCustomProviderTemplateMutationRoutes";'
    );
    expect(serverContent).toMatch(
      /registerAdminCustomProviderTemplateMutationRoutes\(app,\s*\{\s*requireMasterAdmin,\s*getPgPool:\s*\(\)\s*=>\s*pgPool,\s*generateUuid:\s*\(\)\s*=>\s*crypto\.randomUUID\(\)\s*\}\);/
    );
    expect(serverContent).not.toMatch(/app\.post\(\s*["']\/api\/admin\/custom-providers\/:id\/templates["']/);
  });

  it("preserva rotas vizinhas e registra a mutação depois da query de templates", () => {
    const serverContent = readProjectFile(SERVER_PATH);
    const templateQueryIndex = serverContent.indexOf("registerAdminCustomProviderTemplateQueryRoutes(app, {");
    const templateMutationIndex = serverContent.indexOf("registerAdminCustomProviderTemplateMutationRoutes(app, {");

    expect(serverContent).toContain("registerAdminCustomProviderTemplateQueryRoutes(app, {");
    expect(serverContent).toContain("registerAdminCustomProviderMappingMutationRoutes(app, {");
    expect(serverContent).toContain('app.put("/api/admin/custom-providers/:id"');
    expect(serverContent).toContain('app.delete("/api/admin/custom-providers/:id"');
    expect(templateQueryIndex).toBeGreaterThan(-1);
    expect(templateMutationIndex).toBeGreaterThan(templateQueryIndex);
  });

  it("preserva método, path, entrada, fallback, UUID, SQL, defaults e respostas", () => {
    const routeContent = readProjectFile(MODULE_PATH);

    expect(routeContent).toContain("export function registerAdminCustomProviderTemplateMutationRoutes(");
    expect(routeContent).toContain('app.post("/api/admin/custom-providers/:id/templates"');
    expect(routeContent).toContain("dependencies.requireMasterAdmin");
    expect(routeContent).toContain("const pgPool = dependencies.getPgPool()");
    expect(routeContent).toContain("if (!pgPool)");
    expect(routeContent).toContain('res.status(500).json({ error: "Banco de dados não conectado." })');
    expect(routeContent).toContain("const { id } = req.params");
    expect(routeContent).toContain("req.body");
    expect(routeContent).toContain("const templateId = dependencies.generateUuid()");
    expect(routeContent).toContain("INSERT INTO custom_provider_templates (");
    expect(routeContent).toContain("id, provider_id, template_name, template_xml, version");
    expect(routeContent).toContain("VALUES ($1, $2, $3, $4, $5)");
    expect(routeContent).toContain("[templateId, id, template_name, template_xml, version || '1.0']");
    expect(routeContent).toContain('res.status(201).json({ id: templateId, message: "Template criado com sucesso" })');
    expect(routeContent).toContain('error: "Falha ao criar template", details: getErrorDetails(err)');
  });

  it("usa somente app.post e não contém transações ou dependências proibidas", () => {
    const routeContent = readProjectFile(MODULE_PATH);

    expect(routeContent).not.toMatch(/app\.(?:get|put|patch|delete)\s*\(/);
    expect(routeContent).not.toMatch(/\b(?:BEGIN|COMMIT|ROLLBACK)\b/);
    expect(routeContent).not.toMatch(/dbInMemoryLocal|scheduleSaveLocalFallback|getSessionFromRequest|isPostgresActive|SefazConnector|CertificateManager|CompanyController|DANFE|\bNFe\b|\bNFCe\b|\bNFSe\b|certificad/i);
  });

  it("usa interfaces locais e não importa dependências diretamente", () => {
    const routeContent = readProjectFile(MODULE_PATH);
    const importLines = routeContent
      .split("\n")
      .filter((line) => line.trimStart().startsWith("import "))
      .join("\n");
    const importSources = Array.from(
      importLines.matchAll(/from\s+["']([^"']+)["']/g),
      (match) => match[1]
    );

    expect(routeContent).toContain("interface AdminCustomProviderTemplateMutationPgPool");
    expect(routeContent).toContain("interface AdminCustomProviderTemplateMutationRequestBody");
    expect(routeContent).toContain("getPgPool: () => AdminCustomProviderTemplateMutationPgPool | null");
    expect(routeContent).toContain("generateUuid: () => string");
    expect(importSources).toEqual(["express"]);
    expect(importLines).not.toMatch(/auth|pgPool|dbInMemoryLocal|crypto/i);
    expect(importSources.some((source) => /(^|\/)db(?:\.ts)?(?:\/|$)/i.test(source))).toBe(false);
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
