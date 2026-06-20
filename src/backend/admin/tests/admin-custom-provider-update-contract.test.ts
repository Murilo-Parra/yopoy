import { describe, expect, it } from "vitest";
import * as fs from "fs";
import * as path from "path";

const SERVER_PATH = "server.ts";
const TEST_PATH = "src/backend/admin/tests/admin-custom-provider-update-contract.test.ts";
const REPORT_PATH = "docs/server-refactor-49.1-AL.md";
const FORBIDDEN_MODULE_PATH = "src/backend/admin/registerAdminCustomProviderUpdateRoutes.ts";

function readProjectFile(relativePath: string): string {
  const filePath = path.resolve(process.cwd(), relativePath);
  expect(fs.existsSync(filePath), `${relativePath} must exist`).toBe(true);
  return fs.readFileSync(filePath, "utf8");
}

function updateRouteBlock(serverContent: string): string {
  const startMarker = 'app.put("/api/admin/custom-providers/:id"';
  const endMarker = 'app.delete("/api/admin/custom-providers/:id"';
  const startIndex = serverContent.indexOf(startMarker);
  const endIndex = serverContent.indexOf(endMarker, startIndex + startMarker.length);

  expect(startIndex, `${startMarker} must exist`).toBeGreaterThan(-1);
  expect(endIndex, `${endMarker} must follow PUT route`).toBeGreaterThan(startIndex);
  return serverContent.slice(startIndex, endIndex);
}

describe("admin custom provider update contract 49.1-AL", () => {
  it("mantém todos os arquivos obrigatórios da etapa", () => {
    readProjectFile(SERVER_PATH);
    readProjectFile(TEST_PATH);
    readProjectFile(REPORT_PATH);
  });

  it("mantém o PUT inline, autenticado e na ordem atual", () => {
    const serverContent = readProjectFile(SERVER_PATH);
    const mutationRegistrarIndex = serverContent.indexOf("registerAdminCustomProviderMutationRoutes(app, {");
    const putIndex = serverContent.indexOf('app.put("/api/admin/custom-providers/:id"');
    const deleteIndex = serverContent.indexOf('app.delete("/api/admin/custom-providers/:id"');
    const block = updateRouteBlock(serverContent);

    expect(mutationRegistrarIndex).toBeGreaterThan(-1);
    expect(putIndex).toBeGreaterThan(mutationRegistrarIndex);
    expect(deleteIndex).toBeGreaterThan(putIndex);
    expect(block).toContain('app.put("/api/admin/custom-providers/:id", requireMasterAdmin');
  });

  it("preserva as dependências e os limites do PUT", () => {
    const block = updateRouteBlock(readProjectFile(SERVER_PATH));
    const forbiddenDependencies = [
      "isPostgresActive",
      "dbInMemoryLocal",
      "scheduleSaveLocalFallback",
      "crypto.randomUUID",
      "Date.now",
      "new Date",
      "BEGIN",
      "COMMIT",
      "ROLLBACK",
      "certificado",
      "certificate",
      "SEFAZ",
      "NFe",
      "NFCe",
      "NFSe",
      "DANFE",
      "CompanyController"
    ];

    expect(block).toContain("pgPool");
    for (const dependency of forbiddenDependencies) {
      expect(block).not.toContain(dependency);
    }
  });

  it("preserva o UPDATE e a ordem exata dos parâmetros", () => {
    const block = updateRouteBlock(readProjectFile(SERVER_PATH));
    const normalizedBlock = block.replace(/\s+/g, " ");
    const sqlFragments = [
      "UPDATE custom_nfse_providers",
      "SET name = $1",
      "city = $2",
      "state = $3",
      "ibge_code = $4",
      "production_url = $5",
      "homologation_url = $6",
      "communication_type = $7",
      "authentication_type = $8",
      "active = $9",
      "updated_at = CURRENT_TIMESTAMP",
      "WHERE id = $10"
    ];

    for (const fragment of sqlFragments) {
      expect(normalizedBlock).toContain(fragment);
    }
    expect(normalizedBlock).toContain(
      "[ name, city, state, ibge_code, production_url, homologation_url, communication_type, authentication_type, active, id ]"
    );
  });

  it("preserva os parâmetros de rota e os nove campos de entrada", () => {
    const block = updateRouteBlock(readProjectFile(SERVER_PATH));
    const normalizedBlock = block.replace(/\s+/g, " ");

    expect(normalizedBlock).toContain("const { id } = req.params");
    expect(normalizedBlock).toContain(
      "const { name, city, state, ibge_code, production_url, homologation_url, communication_type, authentication_type, active } = req.body"
    );
  });

  it("preserva respostas e sucesso silencioso para ID inexistente", () => {
    const block = updateRouteBlock(readProjectFile(SERVER_PATH));
    const normalizedBlock = block.replace(/\s+/g, " ");

    expect(normalizedBlock).toContain("if (!pgPool)");
    expect(normalizedBlock).toContain('res.status(500).json({ error: "Banco de dados não conectado." })');
    expect(normalizedBlock).toContain('res.json({ message: "Provedor atualizado com sucesso" })');
    expect(normalizedBlock).toContain(
      'res.status(500).json({ error: "Falha ao atualizar provedor", details: err.message })'
    );
    expect(block).not.toContain("rowCount");
    expect(block).not.toMatch(/if\s*\([^)]*(?:result|updateResult|queryResult)[^)]*\)/);
  });

  it("impede extração antecipada do PUT", () => {
    const serverContent = readProjectFile(SERVER_PATH);
    const modulePath = path.resolve(process.cwd(), FORBIDDEN_MODULE_PATH);

    expect(serverContent).not.toMatch(
      /import\s+\{[^}]*\bregisterAdminCustomProviderUpdateRoutes\b[^}]*\}\s+from/
    );
    expect(serverContent).not.toContain("registerAdminCustomProviderUpdateRoutes(app,");
    expect(fs.existsSync(modulePath), `${FORBIDDEN_MODULE_PATH} must not exist`).toBe(false);
  });
});
