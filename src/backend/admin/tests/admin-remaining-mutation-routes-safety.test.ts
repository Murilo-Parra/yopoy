import { describe, expect, it } from "vitest";
import * as fs from "fs";
import * as path from "path";

const SERVER_PATH = "server.ts";
const TEST_PATH = "src/backend/admin/tests/admin-remaining-mutation-routes-safety.test.ts";
const REPORT_PATH = "docs/server-refactor-49.1-AN.md";

function readProjectFile(relativePath: string): string {
  const filePath = path.resolve(process.cwd(), relativePath);
  expect(fs.existsSync(filePath), `${relativePath} must exist`).toBe(true);
  return fs.readFileSync(filePath, "utf8");
}

function routeBlock(content: string, startMarker: string, endMarker: string): string {
  const startIndex = content.indexOf(startMarker);
  const endIndex = content.indexOf(endMarker, startIndex + startMarker.length);

  expect(startIndex, `${startMarker} must exist`).toBeGreaterThan(-1);
  expect(endIndex, `${endMarker} must follow ${startMarker}`).toBeGreaterThan(startIndex);
  return content.slice(startIndex, endIndex);
}

describe("admin remaining mutation routes safety 49.1-AN", () => {
  it("mantém todos os arquivos obrigatórios da etapa", () => {
    readProjectFile(SERVER_PATH);
    readProjectFile(TEST_PATH);
    readProjectFile(REPORT_PATH);
  });

  it("mantém importados e registrados os registradores admin já extraídos", () => {
    const serverContent = readProjectFile(SERVER_PATH);
    const registrars = [
      "registerAdminCustomProviderQueryRoutes",
      "registerAdminCustomProviderMutationRoutes",
      "registerAdminCustomProviderUpdateRoutes",
      "registerAdminCustomProviderMappingQueryRoutes",
      "registerAdminCustomProviderMappingMutationRoutes",
      "registerAdminCustomProviderTemplateQueryRoutes",
      "registerAdminCustomProviderTemplateMutationRoutes",
      "registerAdminAffiliateQueryRoutes",
      "registerAdminAffiliateMutationRoutes",
      "registerAdminCommissionQueryRoutes",
      "registerAdminSupportQueryRoutes",
      "registerAdminAuditLogQueryRoutes",
      "registerAdminSystemMonitoringRoutes"
    ];

    for (const registrar of registrars) {
      expect(serverContent).toContain(`import { ${registrar} } from `);
      expect(serverContent).toContain(`${registrar}(app, {`);
    }
  });

  it("mantém as três mutações restantes inline", () => {
    const serverContent = readProjectFile(SERVER_PATH);
    const inlineRoutes = [
      'app.post("/api/admin/commissions/:id/pay"',
      'app.post("/api/admin/support/:id/reply"',
      'app.delete("/api/admin/custom-providers/:id"'
    ];

    for (const route of inlineRoutes) {
      expect(serverContent).toContain(route);
    }
  });

  it("impede que rotas já extraídas voltem a ficar inline", () => {
    const serverContent = readProjectFile(SERVER_PATH);

    expect(serverContent).not.toContain('app.get("/api/admin/custom-providers"');
    expect(serverContent).not.toContain('app.post("/api/admin/custom-providers"');
    expect(serverContent).not.toContain('app.put("/api/admin/custom-providers/:id"');
    expect(serverContent).not.toContain('app.get("/api/admin/custom-providers/:id/mappings"');
    expect(serverContent).not.toContain('app.post("/api/admin/custom-providers/:id/mappings"');
    expect(serverContent).not.toContain('app.get("/api/admin/custom-providers/:id/templates"');
    expect(serverContent).not.toContain('app.post("/api/admin/custom-providers/:id/templates"');
  });

  it("preserva a ordem do bloco de custom providers", () => {
    const serverContent = readProjectFile(SERVER_PATH);
    const orderedMarkers = [
      "registerAdminCustomProviderQueryRoutes(app, {",
      "registerAdminCustomProviderMutationRoutes(app, {",
      "registerAdminCustomProviderUpdateRoutes(app, {",
      'app.delete("/api/admin/custom-providers/:id"',
      "registerAdminCustomProviderMappingQueryRoutes(app, {",
      "registerAdminCustomProviderMappingMutationRoutes(app, {",
      "registerAdminCustomProviderTemplateQueryRoutes(app, {",
      "registerAdminCustomProviderTemplateMutationRoutes(app, {"
    ];
    const indexes = orderedMarkers.map((marker) => serverContent.indexOf(marker));

    indexes.forEach((index, position) => {
      expect(index, `${orderedMarkers[position]} must exist`).toBeGreaterThan(-1);
      if (position > 0) {
        expect(index).toBeGreaterThan(indexes[position - 1]);
      }
    });
  });

  it("marca os riscos da quitação de comissão dentro da própria rota", () => {
    const serverContent = readProjectFile(SERVER_PATH);
    const block = routeBlock(
      serverContent,
      'app.post("/api/admin/commissions/:id/pay"',
      "registerAdminSupportQueryRoutes(app, {"
    );

    expect(block).toContain("pgPool.connect()");
    expect(block).toContain('client.query("BEGIN")');
    expect(block).toContain('client.query("COMMIT")');
    expect(block).toContain('client.query("ROLLBACK")');
    expect(block).toContain("client.release()");
    expect(block).not.toMatch(/pgPool\.query\s*\(/);
    expect(block).toContain("affiliate_commissions");
    expect(block).toContain("affiliates");
    expect(block).toContain("scheduleSaveLocalFallback");
  });

  it("marca os riscos da resposta de suporte dentro da própria rota", () => {
    const serverContent = readProjectFile(SERVER_PATH);
    const block = routeBlock(
      serverContent,
      'app.post("/api/admin/support/:id/reply"',
      "registerAdminAuditLogQueryRoutes(app, {"
    );

    expect(block).toContain("support_tickets");
    expect(block).toContain("replies");
    expect(block).toContain("scheduleSaveLocalFallback");
  });

  it("mantém o risco do DELETE inline e o UPDATE no módulo extraído", () => {
    const serverContent = readProjectFile(SERVER_PATH);
    const updateModule = readProjectFile("src/backend/admin/registerAdminCustomProviderUpdateRoutes.ts");
    const deleteBlock = routeBlock(
      serverContent,
      'app.delete("/api/admin/custom-providers/:id"',
      "registerAdminCustomProviderMappingQueryRoutes(app, {"
    );
    expect(updateModule).toContain("UPDATE custom_nfse_providers");
    expect(deleteBlock).toContain("DELETE FROM custom_nfse_providers");
  });

  it("impede a criação antecipada de novos registradores de mutação", () => {
    const serverContent = readProjectFile(SERVER_PATH);
    const forbiddenRegistrars = [
      {
        name: "registerAdminCommissionPaymentMutationRoutes",
        file: "src/backend/admin/registerAdminCommissionPaymentMutationRoutes.ts"
      },
      {
        name: "registerAdminSupportReplyMutationRoutes",
        file: "src/backend/admin/registerAdminSupportReplyMutationRoutes.ts"
      },
      {
        name: "registerAdminCustomProviderDeleteRoutes",
        file: "src/backend/admin/registerAdminCustomProviderDeleteRoutes.ts"
      }
    ];

    for (const registrar of forbiddenRegistrars) {
      expect(serverContent).not.toMatch(
        new RegExp(`import\\s+\\{[^}]*\\b${registrar.name}\\b[^}]*\\}\\s+from`)
      );
      expect(serverContent).not.toContain(`${registrar.name}(app,`);
      expect(fs.existsSync(path.resolve(process.cwd(), registrar.file))).toBe(false);
    }
  });
});
