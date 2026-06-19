import { describe, expect, it } from "vitest";
import * as fs from "fs";
import * as path from "path";

const EXTRACTED_PATH = "/api/fiscal/documents/validate-payload";

describe("Fiscal validation route extraction 49.1-I", () => {
  function readProjectFile(relativePath: string): string {
    const filePath = path.resolve(process.cwd(), relativePath);
    expect(fs.existsSync(filePath), `${relativePath} must exist`).toBe(true);
    return fs.readFileSync(filePath, "utf8");
  }

  it("mantém todos os arquivos obrigatórios da etapa", () => {
    readProjectFile("server.ts");
    readProjectFile("src/backend/fiscal/registerFiscalValidationRoutes.ts");
    readProjectFile("src/backend/fiscal/tests/fiscal-validation-routes-wiring.test.ts");
    readProjectFile("docs/server-refactor-49.1-I.md");
  });

  it("mantém o wiring modular no server.ts sem a rota inline", () => {
    const serverContent = readProjectFile("server.ts");
    const escapedPath = EXTRACTED_PATH.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    expect(serverContent).toContain(
      'import { registerFiscalValidationRoutes } from "./src/backend/fiscal/registerFiscalValidationRoutes";'
    );
    expect(serverContent).toContain("registerFiscalValidationRoutes(app);");
    expect(serverContent).not.toMatch(
      new RegExp(`app\\.post\\(\\s*["']${escapedPath}["']`)
    );
  });

  it("mantém o path, a exportação e o XmlValidator no módulo fiscal", () => {
    const routeContent = readProjectFile(
      "src/backend/fiscal/registerFiscalValidationRoutes.ts"
    );

    expect(routeContent).toContain(EXTRACTED_PATH);
    expect(routeContent).toContain("export function registerFiscalValidationRoutes(");
    expect(routeContent).toContain("XmlValidator");
  });

  it("não usa atalhos de tipagem proibidos", () => {
    const routeContent = readProjectFile(
      "src/backend/fiscal/registerFiscalValidationRoutes.ts"
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

  it("não acopla o módulo fiscal validation a domínios proibidos", () => {
    const routeContent = readProjectFile(
      "src/backend/fiscal/registerFiscalValidationRoutes.ts"
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
