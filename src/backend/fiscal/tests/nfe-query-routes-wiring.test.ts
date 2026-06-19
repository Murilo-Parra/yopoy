import { describe, expect, it } from "vitest";
import * as fs from "fs";
import * as path from "path";

const LIST_PATH = "/api/nfe";
const DETAIL_PATH = "/api/nfe/:id";
const DOWNLOAD_PATH = "/api/nfe/:id/download";

describe("NF-e query route extraction 49.1-N", () => {
  function readProjectFile(relativePath: string): string {
    const filePath = path.resolve(process.cwd(), relativePath);
    expect(fs.existsSync(filePath), `${relativePath} must exist`).toBe(true);
    return fs.readFileSync(filePath, "utf8");
  }

  it("mantém todos os arquivos obrigatórios da etapa", () => {
    readProjectFile("server.ts");
    readProjectFile("src/backend/fiscal/registerNfeQueryRoutes.ts");
    readProjectFile(
      "src/backend/fiscal/tests/nfe-query-routes-wiring.test.ts"
    );
    readProjectFile("docs/server-refactor-49.1-N.md");
  });

  it("mantém o wiring modular no ponto das consultas NF-e", () => {
    const serverContent = readProjectFile("server.ts");

    expect(serverContent).toContain(
      'import { registerNfeQueryRoutes } from "./src/backend/fiscal/registerNfeQueryRoutes";'
    );
    expect(serverContent).toMatch(
      /registerNfeQueryRoutes\(app,\s*\{\s*getSessionFromRequest,\s*getNfeDocuments,\s*getNfeDocumentById,\s*logAudit\s*\}\);/
    );

    const registrationIndex = serverContent.indexOf("registerNfeQueryRoutes(app, {");
    const downloadIndex = serverContent.indexOf(
      'app.get("/api/nfe/:id/download"'
    );
    expect(registrationIndex).toBeGreaterThan(-1);
    expect(downloadIndex).toBeGreaterThan(registrationIndex);
  });

  it("remove as consultas JSON inline e mantém o download inline", () => {
    const serverContent = readProjectFile("server.ts");

    expect(serverContent).not.toMatch(
      /app\.get\(\s*["']\/api\/nfe["']/
    );
    expect(serverContent).not.toMatch(
      /app\.get\(\s*["']\/api\/nfe\/:id["']/
    );
    expect(serverContent).toMatch(
      /app\.get\(\s*["']\/api\/nfe\/:id\/download["']/
    );
  });

  it("mantém somente os dois paths de consulta no módulo", () => {
    const routeContent = readProjectFile(
      "src/backend/fiscal/registerNfeQueryRoutes.ts"
    );

    expect(routeContent).toContain(LIST_PATH);
    expect(routeContent).toContain(DETAIL_PATH);
    expect(routeContent).not.toContain(DOWNLOAD_PATH);
    expect(routeContent).toContain("export function registerNfeQueryRoutes(");
  });

  it("usa as quatro dependências somente por injeção", () => {
    const routeContent = readProjectFile(
      "src/backend/fiscal/registerNfeQueryRoutes.ts"
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
      /export interface NfeQueryRouteDependencies\s*\{[\s\S]*?getSessionFromRequest:[\s\S]*?getNfeDocuments:[\s\S]*?getNfeDocumentById:[\s\S]*?logAudit:/
    );
    expect(routeContent).toContain("dependencies.getSessionFromRequest(req)");
    expect(routeContent).toContain("dependencies.getNfeDocuments(");
    expect(routeContent).toContain("dependencies.getNfeDocumentById(");
    expect(routeContent).toContain("dependencies.logAudit(");
    expect(importSources).toEqual(["express"]);
  });

  it("não usa atalhos de tipagem proibidos", () => {
    const routeContent = readProjectFile(
      "src/backend/fiscal/registerNfeQueryRoutes.ts"
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
      "src/backend/fiscal/registerNfeQueryRoutes.ts"
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

  it("não registra mutações nem respostas de download XML", () => {
    const routeContent = readProjectFile(
      "src/backend/fiscal/registerNfeQueryRoutes.ts"
    );

    expect(routeContent).not.toMatch(/app\.(?:post|put|patch|delete)\s*\(/);
    expect(routeContent).not.toContain("res.set");
    expect(routeContent).not.toContain("Content-Type");
    expect(routeContent).not.toContain("Content-Disposition");
    expect(routeContent).not.toContain("res.send");
  });
});
