import { describe, expect, it } from "vitest";
import * as fs from "fs";
import * as path from "path";

const LIST_PATH = "/api/fiscal/documents";
const DETAIL_PATH = "/api/fiscal/documents/:id";

describe("Fiscal document query route extraction 49.1-J", () => {
  function readProjectFile(relativePath: string): string {
    const filePath = path.resolve(process.cwd(), relativePath);
    expect(fs.existsSync(filePath), `${relativePath} must exist`).toBe(true);
    return fs.readFileSync(filePath, "utf8");
  }

  it("mantém todos os arquivos obrigatórios da etapa", () => {
    readProjectFile("server.ts");
    readProjectFile("src/backend/fiscal/registerFiscalDocumentQueryRoutes.ts");
    readProjectFile(
      "src/backend/fiscal/tests/fiscal-document-query-routes-wiring.test.ts"
    );
    readProjectFile("docs/server-refactor-49.1-J.md");
  });

  it("mantém o wiring modular no server.ts com todas as dependências", () => {
    const serverContent = readProjectFile("server.ts");

    expect(serverContent).toContain(
      'import { registerFiscalDocumentQueryRoutes } from "./src/backend/fiscal/registerFiscalDocumentQueryRoutes";'
    );
    expect(serverContent).toMatch(
      /registerFiscalDocumentQueryRoutes\(app,\s*\{[\s\S]*?getSessionFromRequest[\s\S]*?getFiscalDocuments[\s\S]*?getFiscalDocumentById[\s\S]*?\}\);/
    );
  });

  it("remove as duas rotas GET inline do server.ts", () => {
    const serverContent = readProjectFile("server.ts");

    expect(serverContent).not.toMatch(
      /app\.get\(\s*["']\/api\/fiscal\/documents["']/
    );
    expect(serverContent).not.toMatch(
      /app\.get\(\s*["']\/api\/fiscal\/documents\/:id["']/
    );
  });

  it("mantém os paths, a exportação e as dependências no módulo fiscal", () => {
    const routeContent = readProjectFile(
      "src/backend/fiscal/registerFiscalDocumentQueryRoutes.ts"
    );

    expect(routeContent).toContain(LIST_PATH);
    expect(routeContent).toContain(DETAIL_PATH);
    expect(routeContent).toContain("export function registerFiscalDocumentQueryRoutes(");
    expect(routeContent).toContain("getSessionFromRequest");
    expect(routeContent).toContain("getFiscalDocuments");
    expect(routeContent).toContain("getFiscalDocumentById");
  });

  it("não usa atalhos de tipagem proibidos", () => {
    const routeContent = readProjectFile(
      "src/backend/fiscal/registerFiscalDocumentQueryRoutes.ts"
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

  it("não acopla o módulo a domínios proibidos", () => {
    const routeContent = readProjectFile(
      "src/backend/fiscal/registerFiscalDocumentQueryRoutes.ts"
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

    const forbiddenImportPatterns = [
      /pgPool/i,
      /dbInMemoryLocal/i,
      /SefazConnector/i,
      /DANFE/i,
      /NFe/i,
      /NFCe/i,
      /CertificateManager/i,
      /CompanyController/i,
      /Gemini/i,
      /Factory.?Reset/i,
      /audit/i,
      /static.?PDF/i
    ];

    for (const pattern of forbiddenImportPatterns) {
      expect(importLines).not.toMatch(pattern);
    }
  });
});
