import { describe, expect, it } from "vitest";
import * as fs from "fs";
import * as path from "path";

const MODULE_PATH = "src/backend/admin/registerAdminCustomProviderMutationRoutes.ts";
const TEST_PATH = "src/backend/admin/tests/admin-custom-provider-mutation-routes-wiring.test.ts";
const REPORT_PATH = "docs/server-refactor-49.1-AG.md";

describe("admin custom provider mutation route extraction 49.1-AG", () => {
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

  it("importa, registra e injeta autenticação, pool dinâmico e UUID", () => {
    const serverContent = readProjectFile("server.ts");

    expect(serverContent).toContain(
      'import { registerAdminCustomProviderMutationRoutes } from "./src/backend/admin/registerAdminCustomProviderMutationRoutes";'
    );
    expect(serverContent).toMatch(
      /registerAdminCustomProviderMutationRoutes\(app,\s*\{\s*requireMasterAdmin,\s*getPgPool:\s*\(\)\s*=>\s*pgPool,\s*generateUuid:\s*\(\)\s*=>\s*crypto\.randomUUID\(\)\s*\}\);/
    );
    expect(serverContent).not.toMatch(/app\.post\(\s*["']\/api\/admin\/custom-providers["']/);
  });

  it("preserva as rotas vizinhas e a ordem de registro", () => {
    const serverContent = readProjectFile("server.ts");
    const queryIndex = serverContent.indexOf("registerAdminCustomProviderQueryRoutes(app, {");
    const mutationIndex = serverContent.indexOf("registerAdminCustomProviderMutationRoutes(app, {");
    const putIndex = serverContent.indexOf('app.put("/api/admin/custom-providers/:id"');

    expect(serverContent).toContain("registerAdminCustomProviderQueryRoutes(app, {");
    expect(serverContent).toContain('app.put("/api/admin/custom-providers/:id"');
    expect(serverContent).toContain('app.delete("/api/admin/custom-providers/:id"');
    expect(serverContent).toContain('app.post("/api/admin/custom-providers/:id/mappings"');
    expect(serverContent).toContain('app.post("/api/admin/custom-providers/:id/templates"');
    expect(queryIndex).toBeGreaterThan(-1);
    expect(mutationIndex).toBeGreaterThan(queryIndex);
    expect(putIndex).toBeGreaterThan(mutationIndex);
  });

  it("preserva método, path, validação, pool, SQL, parâmetros e payload", () => {
    const routeContent = readProjectFile(MODULE_PATH);

    expect(routeContent).toContain("export function registerAdminCustomProviderMutationRoutes(");
    expect(routeContent).toContain('app.post("/api/admin/custom-providers"');
    expect(routeContent).toContain("dependencies.requireMasterAdmin");
    expect(routeContent).toContain("const pgPool = dependencies.getPgPool()");
    expect(routeContent).toContain("if (!pgPool)");
    expect(routeContent).toContain('error: "Banco de dados não conectado."');
    expect(routeContent).toContain("if (!name)");
    expect(routeContent).toContain('error: "Nome é obrigatório."');
    expect(routeContent).toContain("const id = dependencies.generateUuid()");
    expect(routeContent).toContain("INSERT INTO custom_nfse_providers (");
    expect(routeContent).toContain("id, name, city, state, ibge_code, production_url, homologation_url, communication_type, authentication_type, active");
    expect(routeContent).toContain("VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)");
    expect(routeContent).toContain("communication_type, authentication_type, active !== false");
    expect(routeContent).toContain('res.status(201).json({ id, message: "Provedor criado com sucesso" })');
    expect(routeContent).toContain('error: "Falha ao criar provedor", details: getErrorDetails(err)');
  });

  it("usa somente app.post e não contém transações ou dependências proibidas", () => {
    const routeContent = readProjectFile(MODULE_PATH);

    expect(routeContent).not.toMatch(/app\.(?:get|put|patch|delete)\s*\(/);
    expect(routeContent).not.toMatch(/\b(?:BEGIN|COMMIT|ROLLBACK)\b/);
    expect(routeContent).not.toMatch(/dbInMemoryLocal|scheduleSaveLocalFallback|getSessionFromRequest|isPostgresActive|SefazConnector|CertificateManager|CompanyController|DANFE|\bNFe\b|\bNFCe\b|\bNFSe\b|certificad/i);
  });

  it("usa interfaces locais e não importa auth ou banco diretamente", () => {
    const routeContent = readProjectFile(MODULE_PATH);
    const importLines = routeContent
      .split("\n")
      .filter((line) => line.trimStart().startsWith("import "))
      .join("\n");
    const importSources = Array.from(
      importLines.matchAll(/from\s+["']([^"']+)["']/g),
      (match) => match[1]
    );

    expect(routeContent).toContain("interface AdminCustomProviderMutationPgPool");
    expect(routeContent).toContain("interface AdminCustomProviderMutationRequestBody");
    expect(routeContent).toContain("getPgPool: () => AdminCustomProviderMutationPgPool | null");
    expect(routeContent).toContain("generateUuid: () => string");
    expect(importSources).toEqual(["express"]);
    expect(importLines).not.toMatch(/auth|pgPool|dbInMemoryLocal/i);
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
