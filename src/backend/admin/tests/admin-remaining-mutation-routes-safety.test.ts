import { describe, expect, it } from "vitest";
import * as fs from "fs";
import * as path from "path";

const SERVER_PATH = "server.ts";
const TEST_PATH = "src/backend/admin/tests/admin-remaining-mutation-routes-safety.test.ts";
const REPORT_PATH = "docs/server-refactor-49.1-AH.md";

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

describe("admin remaining mutation routes safety 49.1-AH", () => {
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
      "registerAdminCustomProviderMappingQueryRoutes",
      "registerAdminCustomProviderTemplateQueryRoutes",
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

  it("mantém as seis mutações restantes inline", () => {
    const serverContent = readProjectFile(SERVER_PATH);
    const inlineRoutes = [
      'app.post("/api/admin/commissions/:id/pay"',
      'app.post("/api/admin/support/:id/reply"',
      'app.put("/api/admin/custom-providers/:id"',
      'app.delete("/api/admin/custom-providers/:id"',
      'app.post("/api/admin/custom-providers/:id/mappings"',
      'app.post("/api/admin/custom-providers/:id/templates"'
    ];

    for (const route of inlineRoutes) {
      expect(serverContent).toContain(route);
    }
  });

  it("impede que rotas já extraídas voltem a ficar inline", () => {
    const serverContent = readProjectFile(SERVER_PATH);

    expect(serverContent).not.toContain('app.get("/api/admin/custom-providers"');
    expect(serverContent).not.toContain('app.post("/api/admin/custom-providers"');
    expect(serverContent).not.toContain('app.get("/api/admin/custom-providers/:id/mappings"');
    expect(serverContent).not.toContain('app.get("/api/admin/custom-providers/:id/templates"');
  });

  it("preserva a ordem do bloco de custom providers", () => {
    const serverContent = readProjectFile(SERVER_PATH);
    const orderedMarkers = [
      "registerAdminCustomProviderQueryRoutes(app, {",
      "registerAdminCustomProviderMutationRoutes(app, {",
      'app.put("/api/admin/custom-providers/:id"',
      'app.delete("/api/admin/custom-providers/:id"',
      "registerAdminCustomProviderMappingQueryRoutes(app, {",
      'app.post("/api/admin/custom-providers/:id/mappings"',
      "registerAdminCustomProviderTemplateQueryRoutes(app, {",
      'app.post("/api/admin/custom-providers/:id/templates"'
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

    expect(block).toContain('pgPool.query("BEGIN")');
    expect(block).toContain('pgPool.query("COMMIT")');
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

  it("marca os riscos SQL de cada mutação de custom provider", () => {
    const serverContent = readProjectFile(SERVER_PATH);
    const updateBlock = routeBlock(
      serverContent,
      'app.put("/api/admin/custom-providers/:id"',
      'app.delete("/api/admin/custom-providers/:id"'
    );
    const deleteBlock = routeBlock(
      serverContent,
      'app.delete("/api/admin/custom-providers/:id"',
      "registerAdminCustomProviderMappingQueryRoutes(app, {"
    );
    const mappingBlock = routeBlock(
      serverContent,
      'app.post("/api/admin/custom-providers/:id/mappings"',
      "registerAdminCustomProviderTemplateQueryRoutes(app, {"
    );
    const templateBlock = routeBlock(
      serverContent,
      'app.post("/api/admin/custom-providers/:id/templates"',
      "registerStaticPdfRoutes(app);"
    );

    expect(updateBlock).toContain("UPDATE custom_nfse_providers");
    expect(deleteBlock).toContain("DELETE FROM custom_nfse_providers");
    expect(mappingBlock).toContain("INSERT INTO custom_provider_mappings");
    expect(templateBlock).toContain("INSERT INTO custom_provider_templates");
  });

  it("impede a criação antecipada de novos registradores de mutação", () => {
    const serverContent = readProjectFile(SERVER_PATH);
    const forbiddenRegistrars = [
      "registerAdminCommissionPaymentMutationRoutes",
      "registerAdminSupportReplyMutationRoutes",
      "registerAdminCustomProviderUpdateRoutes",
      "registerAdminCustomProviderDeleteRoutes",
      "registerAdminCustomProviderMappingMutationRoutes",
      "registerAdminCustomProviderTemplateMutationRoutes"
    ];

    for (const registrar of forbiddenRegistrars) {
      expect(serverContent).not.toMatch(new RegExp(`import\\s+\\{[^}]*\\b${registrar}\\b[^}]*\\}\\s+from`));
    }
  });
});
