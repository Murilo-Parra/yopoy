import { describe, expect, it } from "vitest";
import * as fs from "fs";
import * as path from "path";

const DOWNLOAD_PATH = "/api/nfe/:id/download";

describe("NF-e download route extraction 49.1-O", () => {
  function readProjectFile(relativePath: string): string {
    const filePath = path.resolve(process.cwd(), relativePath);
    expect(fs.existsSync(filePath), `${relativePath} must exist`).toBe(true);
    return fs.readFileSync(filePath, "utf8");
  }

  it("mantém todos os arquivos obrigatórios da etapa", () => {
    readProjectFile("server.ts");
    readProjectFile("src/backend/fiscal/registerNfeDownloadRoutes.ts");
    readProjectFile(
      "src/backend/fiscal/tests/nfe-download-routes-wiring.test.ts"
    );
    readProjectFile("docs/server-refactor-49.1-O.md");
  });

  it("faz o wiring com somente as três dependências previstas", () => {
    const serverContent = readProjectFile("server.ts");

    expect(serverContent).toContain(
      'import { registerNfeDownloadRoutes } from "./src/backend/fiscal/registerNfeDownloadRoutes";'
    );
    expect(serverContent).toMatch(
      /registerNfeDownloadRoutes\(app,\s*\{\s*getSessionFromRequest,\s*getNfeDocumentById,\s*logAudit\s*\}\);/
    );
  });

  it("remove o download inline e preserva as rotas NF-e fora do escopo", () => {
    const serverContent = readProjectFile("server.ts");

    expect(serverContent).not.toMatch(
      /app\.get\(\s*["']\/api\/nfe\/:id\/download["']/
    );
    expect(serverContent).toContain("registerNfeQueryRoutes(app, {");
    expect(serverContent).toMatch(/app\.post\(\s*["']\/api\/nfe["']/);
    expect(serverContent).toMatch(
      /app\.post\(\s*["']\/api\/nfe\/:id\/status["']/
    );
  });

  it("preserva a ordem de registro existente no server", () => {
    const serverContent = readProjectFile("server.ts");
    const queryIndex = serverContent.indexOf("registerNfeQueryRoutes(app, {");
    const createIndex = serverContent.indexOf('app.post("/api/nfe"');
    const statusIndex = serverContent.indexOf('app.post("/api/nfe/:id/status"');
    const downloadIndex = serverContent.indexOf(
      "registerNfeDownloadRoutes(app, {"
    );

    expect(queryIndex).toBeGreaterThan(-1);
    expect(createIndex).toBeGreaterThan(queryIndex);
    expect(statusIndex).toBeGreaterThan(createIndex);
    expect(downloadIndex).toBeGreaterThan(statusIndex);
  });

  it("registra somente o GET de download no módulo", () => {
    const routeContent = readProjectFile(
      "src/backend/fiscal/registerNfeDownloadRoutes.ts"
    );

    expect(routeContent).toContain(DOWNLOAD_PATH);
    expect(routeContent).toContain("export function registerNfeDownloadRoutes(");
    expect(routeContent).not.toMatch(
      /app\.get\(\s*["']\/api\/nfe["']/
    );
    expect(routeContent).not.toMatch(
      /app\.get\(\s*["']\/api\/nfe\/:id["']/
    );
    expect(routeContent).not.toMatch(/app\.(?:post|put|patch|delete)\s*\(/);
    expect(routeContent).not.toMatch(
      /app\.post\(\s*["']\/api\/nfe(?:\/:id\/status)?["']/
    );
  });

  it("usa sessão, consulta e auditoria somente por injeção", () => {
    const routeContent = readProjectFile(
      "src/backend/fiscal/registerNfeDownloadRoutes.ts"
    );
    const importLines = routeContent
      .split("\n")
      .filter((line) => line.trimStart().startsWith("import "))
      .join("\n");
    const importSources = Array.from(
      importLines.matchAll(/from\s+["']([^"']+)["']/g),
      (match) => match[1]
    );

    expect(routeContent).toMatch(
      /export interface NfeDownloadRouteDependencies\s*\{[\s\S]*?getSessionFromRequest:[\s\S]*?getNfeDocumentById:[\s\S]*?logAudit:/
    );
    expect(routeContent).toContain("dependencies.getSessionFromRequest(req)");
    expect(routeContent).toContain("dependencies.getNfeDocumentById(");
    expect(routeContent).toContain("dependencies.logAudit(");
    expect(importSources).toEqual(["express"]);
  });

  it("preserva seleção do XML, headers e envio do arquivo", () => {
    const routeContent = readProjectFile(
      "src/backend/fiscal/registerNfeDownloadRoutes.ts"
    );

    expect(routeContent).toMatch(
      /doc\.xml_authorized\s*\|\|\s*doc\.xml_signed\s*\|\|\s*doc\.xml_original/
    );
    expect(routeContent).toContain('res.set("Content-Type", "application/xml")');
    expect(routeContent).toContain('res.set("Content-Disposition"');
    expect(routeContent).toContain("res.send(xmlContent)");
  });

  it("não usa atalhos de tipagem proibidos", () => {
    const routeContent = readProjectFile(
      "src/backend/fiscal/registerNfeDownloadRoutes.ts"
    );
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

  it("não acopla o módulo aos domínios proibidos", () => {
    const routeContent = readProjectFile(
      "src/backend/fiscal/registerNfeDownloadRoutes.ts"
    );
    const importLines = routeContent
      .split("\n")
      .filter((line) => line.trimStart().startsWith("import "))
      .join("\n");
    const importSources = Array.from(
      importLines.matchAll(/from\s+["']([^"']+)["']/g),
      (match) => match[1]
    );

    expect(importLines).not.toContain("src/backend/auth");
    expect(importLines).not.toContain("../auth");
    expect(importLines).not.toMatch(/["'][^"']*\/auth\//);
    expect(
      importSources.some((source) => /(^|\/)db(?:\.ts)?(?:\/|$)/i.test(source))
    ).toBe(false);

    const forbiddenPatterns = [
      /pgPool/i,
      /dbInMemoryLocal/i,
      /SefazConnector/i,
      /SefazEventQueue/i,
      /SefazEventAuditService/i,
      /DANFE/i,
      /NFCe/i,
      /NFSe/i,
      /CertificateManager/i,
      /CompanyController/i,
      /Gemini/i,
      /Factory.?Reset/i,
      /static.?PDF/i
    ];

    for (const pattern of forbiddenPatterns) {
      expect(routeContent).not.toMatch(pattern);
    }
  });
});
