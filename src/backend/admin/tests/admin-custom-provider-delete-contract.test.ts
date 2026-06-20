import { describe, expect, it } from "vitest";
import * as fs from "fs";
import * as path from "path";

const SERVER_PATH = "server.ts";
const TEST_PATH = "src/backend/admin/tests/admin-custom-provider-delete-contract.test.ts";
const REPORT_PATH = "docs/server-refactor-49.1-AN.md";
const DELETE_ROUTE_MARKER = 'app.delete("/api/admin/custom-providers/:id"';
const DELETE_ROUTE_END_MARKER = "registerAdminCustomProviderMappingQueryRoutes(app, {";

function readProjectFile(relativePath: string): string {
  const filePath = path.resolve(process.cwd(), relativePath);
  expect(fs.existsSync(filePath), `${relativePath} must exist`).toBe(true);
  return fs.readFileSync(filePath, "utf8");
}

function routeBlock(content: string): string {
  const startIndex = content.indexOf(DELETE_ROUTE_MARKER);
  const endIndex = content.indexOf(DELETE_ROUTE_END_MARKER, startIndex + DELETE_ROUTE_MARKER.length);

  expect(startIndex, `${DELETE_ROUTE_MARKER} must exist`).toBeGreaterThan(-1);
  expect(endIndex, `${DELETE_ROUTE_END_MARKER} must follow the DELETE route`).toBeGreaterThan(startIndex);
  return content.slice(startIndex, endIndex);
}

function currentSchemaContent(): string {
  const schemaPaths = ["db.ts", "infrastructure/database/bootstrap.ts"];
  const existingSchemaPaths = schemaPaths.filter((relativePath) =>
    fs.existsSync(path.resolve(process.cwd(), relativePath))
  );

  expect(existingSchemaPaths.length, "current schema definitions must exist").toBeGreaterThan(0);
  return existingSchemaPaths.map(readProjectFile).join("\n");
}

describe("admin custom provider DELETE contract 49.1-AN", () => {
  it("mantém todos os arquivos obrigatórios da etapa", () => {
    readProjectFile(SERVER_PATH);
    readProjectFile(TEST_PATH);
    readProjectFile(REPORT_PATH);
  });

  it("mantém a rota inline, protegida e na posição atual", () => {
    const serverContent = readProjectFile(SERVER_PATH);
    const updateRegistrarIndex = serverContent.indexOf("registerAdminCustomProviderUpdateRoutes(app, {");
    const deleteRouteIndex = serverContent.indexOf(DELETE_ROUTE_MARKER);
    const mappingRegistrarIndex = serverContent.indexOf(DELETE_ROUTE_END_MARKER);
    const block = routeBlock(serverContent);

    expect(updateRegistrarIndex).toBeGreaterThan(-1);
    expect(deleteRouteIndex).toBeGreaterThan(updateRegistrarIndex);
    expect(mappingRegistrarIndex).toBeGreaterThan(deleteRouteIndex);
    expect(block).toContain(
      'app.delete("/api/admin/custom-providers/:id", requireMasterAdmin, async (req: express.Request, res: express.Response): Promise<void> => {'
    );
  });

  it("preserva dependências e limites da rota", () => {
    const block = routeBlock(readProjectFile(SERVER_PATH));

    expect(block).toContain("pgPool");
    expect(block).not.toMatch(/isPostgresActive|dbInMemoryLocal|scheduleSaveLocalFallback/);
    expect(block).not.toMatch(/crypto\.randomUUID|Date\.now|new Date/);
    expect(block).not.toMatch(/\b(?:BEGIN|COMMIT|ROLLBACK)\b/);
    expect(block).not.toMatch(/\b(?:SEFAZ|NFe|NFCe|NFSe|DANFE|CompanyController|certificado|certificate|servi[cç]o externo)\b/i);
  });

  it("preserva SQL, parâmetro e sucesso silencioso para ID inexistente", () => {
    const block = routeBlock(readProjectFile(SERVER_PATH));
    const normalizedBlock = block.replace(/\s+/g, " ");

    expect(normalizedBlock).toContain("DELETE FROM custom_nfse_providers WHERE id = $1");
    expect(normalizedBlock).toContain("const { id } = req.params");
    expect(normalizedBlock).toContain("`, [id])");
    expect(block).not.toContain("rowCount");
    expect(block).not.toMatch(/res\.status\(404\)|if\s*\([^)]*(?:result|deleteResult|queryResult)[^)]*\)/);
  });

  it("preserva respostas sem pgPool, de sucesso e de erro", () => {
    const block = routeBlock(readProjectFile(SERVER_PATH));

    expect(block).toContain("if (!pgPool)");
    expect(block).toContain('res.status(500).json({ error: "Banco de dados não conectado." })');
    expect(block).toContain('res.json({ message: "Provedor removido com sucesso" })');
    expect(block).toContain(
      'res.status(500).json({ error: "Falha ao remover provedor", details: err.message })'
    );
  });

  it("congela as relações destrutivas reais do schema atual", () => {
    const schemaContent = currentSchemaContent();
    const normalizedSchema = schemaContent.replace(/\s+/g, " ");

    expect(normalizedSchema).toMatch(
      /CREATE TABLE IF NOT EXISTS custom_provider_mappings \([^;]*provider_id VARCHAR\(255\) NOT NULL REFERENCES custom_nfse_providers\(id\) ON DELETE CASCADE[^;]*\)/
    );
    expect(normalizedSchema).toMatch(
      /CREATE TABLE IF NOT EXISTS custom_provider_templates \([^;]*provider_id VARCHAR\(255\) NOT NULL REFERENCES custom_nfse_providers\(id\) ON DELETE CASCADE[^;]*\)/
    );
    expect(normalizedSchema).toMatch(
      /CREATE TABLE IF NOT EXISTS custom_provider_logs \([^;]*provider_id VARCHAR\(255\) REFERENCES custom_nfse_providers\(id\) ON DELETE SET NULL[^;]*\)/
    );
  });

  it("impede extração antecipada da rota", () => {
    const serverContent = readProjectFile(SERVER_PATH);
    const modulePath = path.resolve(
      process.cwd(),
      "src/backend/admin/registerAdminCustomProviderDeleteRoutes.ts"
    );

    expect(serverContent).not.toMatch(
      /import\s+\{[^}]*\bregisterAdminCustomProviderDeleteRoutes\b[^}]*\}\s+from/
    );
    expect(serverContent).not.toContain("registerAdminCustomProviderDeleteRoutes(app,");
    expect(fs.existsSync(modulePath)).toBe(false);
  });
});
