import { describe, expect, it } from "vitest";
import * as fs from "fs";
import * as path from "path";

const LIST_PATH = "/api/nfce";
const DASHBOARD_PATH = "/api/nfce/dashboard";
const DETAIL_PATH = "/api/nfce/:id";

describe("NFC-e query route extraction 49.1-T", () => {
  function readProjectFile(relativePath: string): string {
    const filePath = path.resolve(process.cwd(), relativePath);
    expect(fs.existsSync(filePath), `${relativePath} must exist`).toBe(true);
    return fs.readFileSync(filePath, "utf8");
  }

  it("mantém todos os arquivos obrigatórios da etapa", () => {
    readProjectFile("server.ts");
    readProjectFile("src/backend/fiscal/registerNfceQueryRoutes.ts");
    readProjectFile("src/backend/fiscal/tests/nfce-query-routes-wiring.test.ts");
    readProjectFile("docs/server-refactor-49.1-T.md");
  });

  it("mantém o wiring modular com as quatro dependências", () => {
    const serverContent = readProjectFile("server.ts");

    expect(serverContent).toContain(
      'import { registerNfceQueryRoutes } from "./src/backend/fiscal/registerNfceQueryRoutes";'
    );
    expect(serverContent).toMatch(
      /registerNfceQueryRoutes\(app,\s*\{\s*getSessionFromRequest,\s*getNfceDocuments,\s*getNfceDocumentById,\s*logAudit\s*\}\);/
    );
  });

  it("remove as consultas inline e mantém os três POST inline", () => {
    const serverContent = readProjectFile("server.ts");

    expect(serverContent).not.toMatch(/app\.get\(\s*["']\/api\/nfce["']/);
    expect(serverContent).not.toMatch(/app\.get\(\s*["']\/api\/nfce\/dashboard["']/);
    expect(serverContent).not.toMatch(/app\.get\(\s*["']\/api\/nfce\/:id["']/);
    expect(serverContent).toMatch(/app\.post\(\s*["']\/api\/nfce["']/);
    expect(serverContent).toMatch(/app\.post\(\s*["']\/api\/nfce\/:id\/cancel["']/);
    expect(serverContent).toMatch(/app\.post\(\s*["']\/api\/nfce\/sync["']/);
  });

  it("registra as consultas antes do POST de emissão", () => {
    const serverContent = readProjectFile("server.ts");
    const registrationIndex = serverContent.indexOf("registerNfceQueryRoutes(app, {");
    const postIndex = serverContent.indexOf('app.post("/api/nfce"');

    expect(registrationIndex).toBeGreaterThan(-1);
    expect(postIndex).toBeGreaterThan(registrationIndex);
  });

  it("mantém os três paths na ordem segura e exporta o registrador", () => {
    const routeContent = readProjectFile("src/backend/fiscal/registerNfceQueryRoutes.ts");
    const listIndex = routeContent.indexOf(`app.get("${LIST_PATH}"`);
    const dashboardIndex = routeContent.indexOf(`app.get("${DASHBOARD_PATH}"`);
    const detailIndex = routeContent.indexOf(`app.get("${DETAIL_PATH}"`);

    expect(listIndex).toBeGreaterThan(-1);
    expect(dashboardIndex).toBeGreaterThan(listIndex);
    expect(detailIndex).toBeGreaterThan(dashboardIndex);
    expect(routeContent).toContain("export function registerNfceQueryRoutes(");
  });

  it("usa as dependências somente por injeção", () => {
    const routeContent = readProjectFile("src/backend/fiscal/registerNfceQueryRoutes.ts");
    const importLines = routeContent
      .split("\n")
      .filter((line) => line.trimStart().startsWith("import "))
      .join("\n");
    const importSources = Array.from(
      importLines.matchAll(/from\s+["']([^"']+)["']/g),
      (match) => match[1]
    );

    expect(routeContent).toMatch(
      /export interface NfceQueryRouteDependencies\s*\{[\s\S]*?getSessionFromRequest:[\s\S]*?getNfceDocuments:[\s\S]*?getNfceDocumentById:[\s\S]*?logAudit:/
    );
    expect(routeContent).toContain("dependencies.getSessionFromRequest(req)");
    expect(routeContent).toContain("dependencies.getNfceDocuments(");
    expect(routeContent).toContain("dependencies.getNfceDocumentById(");
    expect(routeContent).toContain("dependencies.logAudit(");
    expect(importSources).toEqual(["express"]);
  });

  it("não usa atalhos de tipagem proibidos", () => {
    const routeContent = readProjectFile("src/backend/fiscal/registerNfceQueryRoutes.ts");
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

  it("não acopla o módulo a domínios proibidos", () => {
    const routeContent = readProjectFile("src/backend/fiscal/registerNfceQueryRoutes.ts");
    const importLines = routeContent
      .split("\n")
      .filter((line) => line.trimStart().startsWith("import "))
      .join("\n");
    const importSources = Array.from(
      importLines.matchAll(/from\s+["']([^"']+)["']/g),
      (match) => match[1]
    );

    expect(importLines).not.toMatch(/auth/i);
    expect(importSources.some((source) => /(^|\/)db(?:\.ts)?(?:\/|$)/i.test(source))).toBe(false);

    const forbiddenPatterns = [
      /pgPool/i,
      /dbInMemoryLocal/i,
      /SefazConnector/i,
      /DANFE/i,
      /\bNFe\b/i,
      /\bNFSe\b/i,
      /CertificateManager/i,
      /certificados/i,
      /CompanyController/i
    ];

    for (const pattern of forbiddenPatterns) {
      expect(routeContent).not.toMatch(pattern);
    }
  });

  it("registra somente GET e preserva métricas e auditoria centrais", () => {
    const routeContent = readProjectFile("src/backend/fiscal/registerNfceQueryRoutes.ts");

    expect(routeContent).not.toMatch(/app\.(?:post|put|patch|delete)\s*\(/);
    expect(routeContent).toContain("CONSULTA_NFCE_LISTA");
    expect(routeContent).toContain("Consultou lista de NFC-e com filtros:");
    expect(routeContent).toContain("JSON.stringify(req.query)");

    for (const field of ["salesCount", "revenue", "avgTicket", "productsSold", "period"]) {
      expect(routeContent).toContain(field);
    }
    expect(routeContent).toContain("d.status !== 'REJECTED'");
    expect(routeContent).toContain("for (let i = 14; i >= 0; i--)");
    expect(routeContent).toContain("dailyMap[dStr].revenue");
    expect(routeContent).toContain("dailyMap[dStr].count");
  });
});
