import { describe, expect, it } from "vitest";
import * as fs from "fs";
import * as path from "path";

describe("Factory reset route extraction 49.1-B", () => {
  function readProjectFile(relativePath: string): string {
    const filePath = path.resolve(process.cwd(), relativePath);
    expect(fs.existsSync(filePath), `${relativePath} must exist`).toBe(true);
    return fs.readFileSync(filePath, "utf8");
  }

  it("mantém o wiring modular no server.ts", () => {
    const serverContent = readProjectFile("server.ts");

    expect(serverContent).toContain(
      'import { registerFactoryResetRoutes } from "./src/backend/devtools/registerFactoryResetRoutes";'
    );
    expect(serverContent).toContain("registerFactoryResetRoutes(app, {");
    expect(serverContent).toContain("isPostgresActive");
    expect(serverContent).toContain("pgPool");
    expect(serverContent).toContain("dbInMemoryLocal");
    expect(serverContent).toContain("scheduleSaveLocalFallback");

    expect(serverContent).not.toMatch(
      /app\.post\(\s*["']\/api\/system\/factory-reset["']/
    );
    expect(serverContent).not.toContain("DangerousDevToolRequest");
    expect(serverContent).not.toContain("canRunFactoryReset");
  });

  it("mantém a rota no módulo devtools e sem atalhos de tipagem", () => {
    const routeContent = readProjectFile("src/backend/devtools/registerFactoryResetRoutes.ts");

    expect(routeContent).toContain("export function registerFactoryResetRoutes(");
    expect(routeContent).toMatch(
      /app\.post\(\s*["']\/api\/system\/factory-reset["']/
    );
    expect(routeContent).toContain("FACTORY_RESET_FORBIDDEN");
    expect(routeContent).toContain("FACTORY_RESET_MISSING_ADMIN_HASH");
    expect(routeContent).toContain("FACTORY_RESET_FAILED");

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

  it("não acopla o módulo devtools ao módulo auth", () => {
    const routeContent = readProjectFile("src/backend/devtools/registerFactoryResetRoutes.ts");

    expect(routeContent).not.toContain("../auth");
    expect(routeContent).not.toContain("/auth/");
    expect(routeContent).not.toContain("src/backend/auth");
  });
});
