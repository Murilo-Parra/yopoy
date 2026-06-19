import { describe, expect, it } from "vitest";
import * as fs from "fs";
import * as path from "path";

const PROTOCOLS_PATH = "/api/sefaz/protocols";
const EVENTS_PATH = "/api/sefaz/events";
const DOCUMENT_EVENTS_PATH = "/api/sefaz/events/:docId";

describe("SEFAZ query route extraction 49.1-L", () => {
  function readProjectFile(relativePath: string): string {
    const filePath = path.resolve(process.cwd(), relativePath);
    expect(fs.existsSync(filePath), `${relativePath} must exist`).toBe(true);
    return fs.readFileSync(filePath, "utf8");
  }

  it("mantém todos os arquivos obrigatórios da etapa", () => {
    readProjectFile("server.ts");
    readProjectFile("src/backend/fiscal/registerSefazQueryRoutes.ts");
    readProjectFile("src/backend/fiscal/tests/sefaz-query-routes-wiring.test.ts");
    readProjectFile("docs/server-refactor-49.1-L.md");
  });

  it("mantém o wiring modular no server.ts com todas as dependências", () => {
    const serverContent = readProjectFile("server.ts");

    expect(serverContent).toContain(
      'import { registerSefazQueryRoutes } from "./src/backend/fiscal/registerSefazQueryRoutes";'
    );
    expect(serverContent).toMatch(
      /registerSefazQueryRoutes\(app,\s*\{\s*getSessionFromRequest,\s*getSefazProtocols,\s*getFiscalEvents\s*\}\);/
    );
  });

  it("remove as três rotas GET inline do server.ts", () => {
    const serverContent = readProjectFile("server.ts");
    const inlineRoutePatterns = [
      /app\.get\(\s*["']\/api\/sefaz\/protocols["']/,
      /app\.get\(\s*["']\/api\/sefaz\/events["']/,
      /app\.get\(\s*["']\/api\/sefaz\/events\/:docId["']/
    ];

    for (const pattern of inlineRoutePatterns) {
      expect(serverContent).not.toMatch(pattern);
    }
  });

  it("mantém os paths, a exportação e somente as dependências injetadas", () => {
    const routeContent = readProjectFile(
      "src/backend/fiscal/registerSefazQueryRoutes.ts"
    );

    expect(routeContent).toContain(PROTOCOLS_PATH);
    expect(routeContent).toContain(EVENTS_PATH);
    expect(routeContent).toContain(DOCUMENT_EVENTS_PATH);
    expect(routeContent).toContain("export function registerSefazQueryRoutes(");
    expect(routeContent).toMatch(
      /export interface SefazQueryRouteDependencies\s*\{[\s\S]*?getSessionFromRequest:[\s\S]*?getSefazProtocols:[\s\S]*?getFiscalEvents:/
    );
    expect(routeContent).toContain("dependencies.getSessionFromRequest(req)");
    expect(routeContent).toContain("dependencies.getSefazProtocols(session.company_id)");
    expect(routeContent).toContain("dependencies.getFiscalEvents(session.company_id)");
    expect(routeContent).toContain(
      "dependencies.getFiscalEvents(session.company_id, docId)"
    );
  });

  it("não usa atalhos de tipagem proibidos", () => {
    const routeContent = readProjectFile(
      "src/backend/fiscal/registerSefazQueryRoutes.ts"
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
      "src/backend/fiscal/registerSefazQueryRoutes.ts"
    );
    const importLines = routeContent
      .split("\n")
      .filter((line) => line.trimStart().startsWith("import "))
      .join("\n");
    const importSources = Array.from(
      importLines.matchAll(/from\s+["']([^"']+)["']/g),
      (match) => match[1]
    );

    expect(importSources).toEqual(["express"]);
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
      /SefazEventQueue/i,
      /SefazEventAuditService/i,
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

  it("registra somente rotas GET", () => {
    const routeContent = readProjectFile(
      "src/backend/fiscal/registerSefazQueryRoutes.ts"
    );

    expect(routeContent).not.toMatch(/app\.(?:post|put|patch|delete)\s*\(/);
  });
});
