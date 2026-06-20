import { describe, expect, it } from "vitest";
import * as fs from "fs";
import * as path from "path";

const SERVER_PATH = "server.ts";
const MODULE_PATH = "src/backend/admin/registerAdminCustomProviderUpdateRoutes.ts";
const TEST_PATH = "src/backend/admin/tests/admin-custom-provider-update-routes-wiring.test.ts";
const REPORT_PATH = "docs/server-refactor-49.1-AM.md";

function readProjectFile(relativePath: string): string {
  const filePath = path.resolve(process.cwd(), relativePath);
  expect(fs.existsSync(filePath), `${relativePath} must exist`).toBe(true);
  return fs.readFileSync(filePath, "utf8");
}

describe("admin custom provider update route extraction 49.1-AM", () => {
  it("mantém todos os arquivos obrigatórios da etapa", () => {
    readProjectFile(SERVER_PATH);
    readProjectFile(MODULE_PATH);
    readProjectFile(TEST_PATH);
    readProjectFile(REPORT_PATH);
  });

  it("importa, registra e injeta autenticação e pool dinâmico", () => {
    const serverContent = readProjectFile(SERVER_PATH);

    expect(serverContent).toContain(
      'import { registerAdminCustomProviderUpdateRoutes } from "./src/backend/admin/registerAdminCustomProviderUpdateRoutes";'
    );
    expect(serverContent).toMatch(
      /registerAdminCustomProviderUpdateRoutes\(app,\s*\{\s*requireMasterAdmin,\s*getPgPool:\s*\(\)\s*=>\s*pgPool\s*\}\);/
    );
    expect(serverContent).not.toContain('app.put("/api/admin/custom-providers/:id"');
  });

  it("preserva rotas vizinhas e a posição do registro", () => {
    const serverContent = readProjectFile(SERVER_PATH);
    const createIndex = serverContent.indexOf("registerAdminCustomProviderMutationRoutes(app, {");
    const updateIndex = serverContent.indexOf("registerAdminCustomProviderUpdateRoutes(app, {");
    const deleteIndex = serverContent.indexOf('app.delete("/api/admin/custom-providers/:id"');

    expect(serverContent).toContain("registerAdminCustomProviderMutationRoutes(app, {");
    expect(serverContent).toContain('app.delete("/api/admin/custom-providers/:id"');
    expect(serverContent).toContain('app.post("/api/admin/support/:id/reply"');
    expect(serverContent).toContain('app.post("/api/admin/commissions/:id/pay"');
    expect(createIndex).toBeGreaterThan(-1);
    expect(updateIndex).toBeGreaterThan(createIndex);
    expect(deleteIndex).toBeGreaterThan(updateIndex);
  });

  it("preserva método, path, entradas, pool, SQL, parâmetros e respostas", () => {
    const routeContent = readProjectFile(MODULE_PATH);
    const normalizedContent = routeContent.replace(/\s+/g, " ");

    expect(routeContent).toContain("export function registerAdminCustomProviderUpdateRoutes(");
    expect(routeContent).toContain('app.put("/api/admin/custom-providers/:id"');
    expect(routeContent).toContain("dependencies.requireMasterAdmin");
    expect(routeContent).toContain("const pgPool = dependencies.getPgPool()");
    expect(routeContent).toContain("if (!pgPool)");
    expect(normalizedContent).toContain("const { id } = req.params");
    expect(normalizedContent).toContain("= req.body");
    expect(normalizedContent).toContain("UPDATE custom_nfse_providers SET name = $1");
    expect(normalizedContent).toContain("city = $2, state = $3, ibge_code = $4");
    expect(normalizedContent).toContain("production_url = $5, homologation_url = $6");
    expect(normalizedContent).toContain("communication_type = $7, authentication_type = $8, active = $9");
    expect(normalizedContent).toContain("updated_at = CURRENT_TIMESTAMP WHERE id = $10");
    expect(normalizedContent).toContain(
      "[ name, city, state, ibge_code, production_url, homologation_url, communication_type, authentication_type, active, id ]"
    );
    expect(routeContent).toContain('res.status(500).json({ error: "Banco de dados não conectado." })');
    expect(routeContent).toContain('res.json({ message: "Provedor atualizado com sucesso" })');
    expect(routeContent).toContain('error: "Falha ao atualizar provedor", details: getErrorDetails(err)');
    expect(routeContent).not.toContain("rowCount");
  });

  it("usa somente app.put e não contém transações ou dependências proibidas", () => {
    const routeContent = readProjectFile(MODULE_PATH);

    expect(routeContent).not.toMatch(/app\.(?:get|post|patch|delete)\s*\(/);
    expect(routeContent).not.toMatch(/\b(?:BEGIN|COMMIT|ROLLBACK)\b/);
    expect(routeContent).not.toMatch(/dbInMemoryLocal|scheduleSaveLocalFallback|crypto\.randomUUID|getSessionFromRequest|isPostgresActive|SefazConnector|CertificateManager|CompanyController|DANFE|\bNFe\b|\bNFCe\b|\bNFSe\b|certificad/i);
  });

  it("usa interfaces locais e não importa auth, banco, pool ou crypto diretamente", () => {
    const routeContent = readProjectFile(MODULE_PATH);
    const importLines = routeContent
      .split("\n")
      .filter((line) => line.trimStart().startsWith("import "))
      .join("\n");
    const importSources = Array.from(
      importLines.matchAll(/from\s+["']([^"']+)["']/g),
      (match) => match[1]
    );

    expect(routeContent).toContain("interface AdminCustomProviderUpdatePgPool");
    expect(routeContent).toContain("interface AdminCustomProviderUpdateRequestBody");
    expect(routeContent).toContain("getPgPool: () => AdminCustomProviderUpdatePgPool | null");
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
