import { describe, expect, it } from "vitest";
import * as fs from "fs";
import * as path from "path";

describe("Static PDF route extraction 49.1-E", () => {
  function readProjectFile(relativePath: string): string {
    const filePath = path.resolve(process.cwd(), relativePath);
    expect(fs.existsSync(filePath), `${relativePath} must exist`).toBe(true);
    return fs.readFileSync(filePath, "utf8");
  }

  it("mantém todos os arquivos obrigatórios da etapa", () => {
    readProjectFile("server.ts");
    readProjectFile("src/backend/static/registerStaticPdfRoutes.ts");
    readProjectFile("src/backend/static/tests/static-pdf-routes-wiring.test.ts");
    readProjectFile("docs/server-refactor-49.1-E.md");
  });

  it("mantém o wiring modular no server.ts sem rotas PDF inline", () => {
    const serverContent = readProjectFile("server.ts");

    expect(serverContent).toContain(
      'import { registerStaticPdfRoutes } from "./src/backend/static/registerStaticPdfRoutes";'
    );
    expect(serverContent).toContain("registerStaticPdfRoutes(app);");

    const inlineRoutePatterns = [
      /app\.get\(\s*["']\/manual\.pdf["']/,
      /app\.get\(\s*["']\/relatorio-eventos\.pdf["']/,
      /app\.get\(\s*["']\/relatorio-nfse\.pdf["']/
    ];

    for (const pattern of inlineRoutePatterns) {
      expect(serverContent).not.toMatch(pattern);
    }
  });

  it("mantém as três rotas no módulo static", () => {
    const routeContent = readProjectFile("src/backend/static/registerStaticPdfRoutes.ts");

    expect(routeContent).toContain("export function registerStaticPdfRoutes(");
    expect(routeContent).toMatch(/app\.get\(\s*["']\/manual\.pdf["']/);
    expect(routeContent).toMatch(/app\.get\(\s*["']\/relatorio-eventos\.pdf["']/);
    expect(routeContent).toMatch(/app\.get\(\s*["']\/relatorio-nfse\.pdf["']/);
  });

  it("não usa atalhos de tipagem proibidos", () => {
    const routeContent = readProjectFile("src/backend/static/registerStaticPdfRoutes.ts");
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

  it("não acopla imports do módulo static a domínios proibidos", () => {
    const routeContent = readProjectFile("src/backend/static/registerStaticPdfRoutes.ts");
    const importLines = routeContent
      .split("\n")
      .filter((line) => line.trimStart().startsWith("import "))
      .join("\n");

    expect(importLines).not.toContain("src/backend/auth");
    expect(importLines).not.toContain("../auth");
    expect(importLines).not.toMatch(/["'][^"']*\/auth\//);
    expect(importLines).not.toMatch(/(?:^|\/)db(?:\.ts)?["']/im);
    expect(importLines).not.toMatch(/fiscal/i);
    expect(importLines).not.toMatch(/gemini/i);
    expect(importLines).not.toMatch(/factory.?reset/i);
  });
});
