import { describe, expect, it } from "vitest";
import * as fs from "fs";
import * as path from "path";

const SERVER_PATH = "server.ts";
const MODULE_PATH = "src/backend/admin/registerAdminCustomProviderMappingMutationRoutes.ts";
const TEST_PATH = "src/backend/admin/tests/admin-custom-provider-mapping-mutation-routes-wiring.test.ts";
const REMAINING_GUARD_PATH = "src/backend/admin/tests/admin-remaining-mutation-routes-safety.test.ts";
const REPORT_PATH = "docs/server-refactor-49.1-AI.md";

function readProjectFile(relativePath: string): string {
  const filePath = path.resolve(process.cwd(), relativePath);
  expect(fs.existsSync(filePath), `${relativePath} must exist`).toBe(true);
  return fs.readFileSync(filePath, "utf8");
}

describe("admin custom provider mapping mutation route extraction 49.1-AI", () => {
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
      'import { registerAdminCustomProviderMappingMutationRoutes } from "./src/backend/admin/registerAdminCustomProviderMappingMutationRoutes";'
    );
    expect(serverContent).toMatch(
      /registerAdminCustomProviderMappingMutationRoutes\(app,\s*\{\s*requireMasterAdmin,\s*getPgPool:\s*\(\)\s*=>\s*pgPool,\s*generateUuid:\s*\(\)\s*=>\s*crypto\.randomUUID\(\)\s*\}\);/
    );
    expect(serverContent).not.toMatch(/app\.post\(\s*["']\/api\/admin\/custom-providers\/:id\/mappings["']/);
  });

  it("preserva rotas vizinhas e a ordem do registro", () => {
    const serverContent = readProjectFile(SERVER_PATH);
    const mappingQueryIndex = serverContent.indexOf("registerAdminCustomProviderMappingQueryRoutes(app, {");
    const mappingMutationIndex = serverContent.indexOf("registerAdminCustomProviderMappingMutationRoutes(app, {");
    const templateQueryIndex = serverContent.indexOf("registerAdminCustomProviderTemplateQueryRoutes(app, {");

    expect(serverContent).toContain('app.put("/api/admin/custom-providers/:id"');
    expect(serverContent).toContain('app.delete("/api/admin/custom-providers/:id"');
    expect(serverContent).toContain('app.post("/api/admin/custom-providers/:id/templates"');
    expect(mappingQueryIndex).toBeGreaterThan(-1);
    expect(mappingMutationIndex).toBeGreaterThan(mappingQueryIndex);
    expect(templateQueryIndex).toBeGreaterThan(mappingMutationIndex);
  });

  it("preserva método, path, entrada, fallback, UUID, SQL, defaults e respostas", () => {
    const routeContent = readProjectFile(MODULE_PATH);

    expect(routeContent).toContain("export function registerAdminCustomProviderMappingMutationRoutes(");
    expect(routeContent).toContain('app.post("/api/admin/custom-providers/:id/mappings"');
    expect(routeContent).toContain("dependencies.requireMasterAdmin");
    expect(routeContent).toContain("const pgPool = dependencies.getPgPool()");
    expect(routeContent).toContain("if (!pgPool)");
    expect(routeContent).toContain('res.status(500).json({ error: "Banco de dados não conectado." })');
    expect(routeContent).toContain("const { id } = req.params");
    expect(routeContent).toContain("req.body");
    expect(routeContent).toContain("const mappingId = dependencies.generateUuid()");
    expect(routeContent).toContain("INSERT INTO custom_provider_mappings (");
    expect(routeContent).toContain("id, provider_id, local_field, provider_field, required, data_type");
    expect(routeContent).toContain("VALUES ($1, $2, $3, $4, $5, $6)");
    expect(routeContent).toContain("[mappingId, id, local_field, provider_field, required || false, data_type || 'string']");
    expect(routeContent).toContain('res.status(201).json({ id: mappingId, message: "Mapeamento criado com sucesso" })');
    expect(routeContent).toContain('error: "Falha ao criar mapeamento", details: getErrorDetails(err)');
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

    expect(routeContent).toContain("interface AdminCustomProviderMappingMutationPgPool");
    expect(routeContent).toContain("interface AdminCustomProviderMappingMutationRequestBody");
    expect(routeContent).toContain("getPgPool: () => AdminCustomProviderMappingMutationPgPool | null");
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
