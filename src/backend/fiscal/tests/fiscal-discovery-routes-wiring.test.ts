import { describe, expect, it } from "vitest";
import * as fs from "fs";
import * as path from "path";

const EXTRACTED_PATHS = ["/api/fiscal/discover"] as const;

describe("Fiscal discovery route extraction 49.1-H", () => {
  function readProjectFile(relativePath: string): string {
    const filePath = path.resolve(process.cwd(), relativePath);
    expect(fs.existsSync(filePath), `${relativePath} must exist`).toBe(true);
    return fs.readFileSync(filePath, "utf8");
  }

  it("mantém todos os arquivos obrigatórios da etapa", () => {
    readProjectFile("server.ts");
    readProjectFile("src/backend/fiscal/registerFiscalDiscoveryRoutes.ts");
    readProjectFile("src/backend/fiscal/tests/fiscal-discovery-routes-wiring.test.ts");
    readProjectFile("docs/server-refactor-49.1-H.md");
  });

  it("mantém o wiring modular no server.ts sem a rota inline", () => {
    const serverContent = readProjectFile("server.ts");

    expect(serverContent).toContain(
      'import { registerFiscalDiscoveryRoutes } from "./src/backend/fiscal/registerFiscalDiscoveryRoutes";'
    );
    expect(serverContent).toContain("registerFiscalDiscoveryRoutes(app);");

    for (const extractedPath of EXTRACTED_PATHS) {
      const escapedPath = extractedPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      expect(serverContent).not.toMatch(
        new RegExp(`app\\.post\\(\\s*["']${escapedPath}["']`)
      );
    }
  });

  it("mantém explicitamente todos os paths extraídos no módulo fiscal", () => {
    const routeContent = readProjectFile(
      "src/backend/fiscal/registerFiscalDiscoveryRoutes.ts"
    );

    expect(routeContent).toContain("export function registerFiscalDiscoveryRoutes(");
    expect(routeContent).toContain("FiscalProviderResolver");

    for (const extractedPath of EXTRACTED_PATHS) {
      expect(routeContent).toContain(extractedPath);
    }
  });

  it("não usa atalhos de tipagem proibidos", () => {
    const routeContent = readProjectFile(
      "src/backend/fiscal/registerFiscalDiscoveryRoutes.ts"
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

  it("não acopla o módulo fiscal discovery a domínios proibidos", () => {
    const routeContent = readProjectFile(
      "src/backend/fiscal/registerFiscalDiscoveryRoutes.ts"
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
      /static/i
    ];

    for (const pattern of forbiddenImportPatterns) {
      expect(importLines).not.toMatch(pattern);
    }
  });
});
