import { describe, expect, it } from "vitest";
import * as fs from "fs";
import * as path from "path";

const SERVER_PATH = "server.ts";
const MODULE_PATH = "src/backend/admin/registerAdminCustomProviderUpdateRoutes.ts";
const TEST_PATH = "src/backend/admin/tests/admin-custom-provider-update-contract.test.ts";
const REPORT_PATH = "docs/server-refactor-49.1-AM.md";

function readProjectFile(relativePath: string): string {
  const filePath = path.resolve(process.cwd(), relativePath);
  expect(fs.existsSync(filePath), `${relativePath} must exist`).toBe(true);
  return fs.readFileSync(filePath, "utf8");
}

describe("admin custom provider update contract 49.1-AM", () => {
  it("mantém todos os arquivos obrigatórios da etapa", () => {
    readProjectFile(SERVER_PATH);
    readProjectFile(MODULE_PATH);
    readProjectFile(TEST_PATH);
    readProjectFile(REPORT_PATH);
  });

  it("registra o módulo e impede o retorno do PUT inline", () => {
    const serverContent = readProjectFile(SERVER_PATH);

    expect(serverContent).toContain(
      'import { registerAdminCustomProviderUpdateRoutes } from "./src/backend/admin/registerAdminCustomProviderUpdateRoutes";'
    );
    expect(serverContent).toContain("registerAdminCustomProviderUpdateRoutes(app, {");
    expect(serverContent).not.toContain('app.put("/api/admin/custom-providers/:id"');
  });

  it("preserva o UPDATE e a ordem exata dos parâmetros", () => {
    const routeContent = readProjectFile(MODULE_PATH);
    const normalizedContent = routeContent.replace(/\s+/g, " ");
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
      expect(normalizedContent).toContain(fragment);
    }
    expect(normalizedContent).toContain(
      "[ name, city, state, ibge_code, production_url, homologation_url, communication_type, authentication_type, active, id ]"
    );
  });

  it("preserva parâmetros de entrada, ausência de fallback e ausência de transação", () => {
    const routeContent = readProjectFile(MODULE_PATH);
    const normalizedContent = routeContent.replace(/\s+/g, " ");

    expect(normalizedContent).toContain("const { id } = req.params");
    expect(normalizedContent).toContain(
      "const { name, city, state, ibge_code, production_url, homologation_url, communication_type, authentication_type, active }: AdminCustomProviderUpdateRequestBody = req.body"
    );
    expect(routeContent).not.toMatch(/isPostgresActive|dbInMemoryLocal|scheduleSaveLocalFallback/);
    expect(routeContent).not.toMatch(/\b(?:BEGIN|COMMIT|ROLLBACK)\b/);
  });

  it("preserva respostas e sucesso silencioso para ID inexistente", () => {
    const routeContent = readProjectFile(MODULE_PATH);

    expect(routeContent).toContain("if (!pgPool)");
    expect(routeContent).toContain('res.status(500).json({ error: "Banco de dados não conectado." })');
    expect(routeContent).toContain('res.json({ message: "Provedor atualizado com sucesso" })');
    expect(routeContent).toContain(
      'res.status(500).json({ error: "Falha ao atualizar provedor", details: getErrorDetails(err) })'
    );
    expect(routeContent).not.toContain("rowCount");
    expect(routeContent).not.toMatch(/if\s*\([^)]*(?:result|updateResult|queryResult)[^)]*\)/);
  });
});
