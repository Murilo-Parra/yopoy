import { describe, expect, it } from "vitest";
import * as fs from "fs";
import * as path from "path";

describe("Company audit log route extraction 49.1-D", () => {
  function readProjectFile(relativePath: string): string {
    const filePath = path.resolve(process.cwd(), relativePath);
    expect(fs.existsSync(filePath), `${relativePath} must exist`).toBe(true);
    return fs.readFileSync(filePath, "utf8");
  }

  it("mantém todos os arquivos obrigatórios da etapa", () => {
    readProjectFile("server.ts");
    readProjectFile("src/backend/audit/registerCompanyAuditLogRoutes.ts");
    readProjectFile("docs/server-refactor-49.1-D.md");
  });

  it("mantém o wiring modular no server.ts", () => {
    const serverContent = readProjectFile("server.ts");

    expect(serverContent).toContain(
      'import { registerCompanyAuditLogRoutes } from "./src/backend/audit/registerCompanyAuditLogRoutes";'
    );
    expect(serverContent).toContain("registerCompanyAuditLogRoutes(app, {");
    expect(serverContent).not.toMatch(
      /app\.get\(\s*["']\/api\/auth\/company-audit-logs["']/
    );
  });

  it("mantém a rota no módulo audit", () => {
    const routeContent = readProjectFile("src/backend/audit/registerCompanyAuditLogRoutes.ts");

    expect(routeContent).toContain("export function registerCompanyAuditLogRoutes(");
    expect(routeContent).toMatch(
      /app\.get\(\s*["']\/api\/auth\/company-audit-logs["']/
    );
  });

  it("não usa atalhos de tipagem proibidos", () => {
    const routeContent = readProjectFile("src/backend/audit/registerCompanyAuditLogRoutes.ts");
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

  it("não acopla imports do módulo audit ao módulo auth", () => {
    const routeContent = readProjectFile("src/backend/audit/registerCompanyAuditLogRoutes.ts");
    const importLines = routeContent
      .split("\n")
      .filter((line) => line.trimStart().startsWith("import "))
      .join("\n");

    expect(importLines).not.toContain("src/backend/auth");
    expect(importLines).not.toContain("../auth");
    expect(importLines).not.toMatch(/["'][^"']*\/auth\//);
  });
});
