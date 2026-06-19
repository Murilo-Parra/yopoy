import { describe, expect, it } from "vitest";
import * as fs from "fs";
import * as path from "path";

const MODULE_PATH = "src/backend/admin/registerAdminAffiliateQueryRoutes.ts";

describe("admin affiliate query route extraction 49.1-W", () => {
  function readProjectFile(relativePath: string): string {
    const filePath = path.resolve(process.cwd(), relativePath);
    expect(fs.existsSync(filePath), `${relativePath} must exist`).toBe(true);
    return fs.readFileSync(filePath, "utf8");
  }

  it("mantém todos os arquivos obrigatórios da etapa", () => {
    readProjectFile("server.ts");
    readProjectFile(MODULE_PATH);
    readProjectFile("src/backend/admin/tests/admin-affiliate-query-routes-wiring.test.ts");
    readProjectFile("docs/server-refactor-49.1-W.md");
  });

  it("importa e registra o módulo no ponto correto do server.ts", () => {
    const serverContent = readProjectFile("server.ts");

    expect(serverContent).toContain(
      'import { registerAdminAffiliateQueryRoutes } from "./src/backend/admin/registerAdminAffiliateQueryRoutes";'
    );
    expect(serverContent).toContain("registerAdminAffiliateQueryRoutes(app, {");
    expect(serverContent).toContain("getIsPostgresActive: () => isPostgresActive");
    expect(serverContent).toContain("getPgPool: () => pgPool");
    expect(serverContent).toContain("dbInMemoryLocal");
    expect(serverContent).not.toMatch(/app\.get\(\s*["']\/api\/admin\/affiliates["']/);

    const createAffiliateIndex = serverContent.indexOf('app.post("/api/admin/affiliates/create"');
    const registerIndex = serverContent.indexOf("registerAdminAffiliateQueryRoutes(app, {");
    const commissionsIndex = serverContent.indexOf('app.get("/api/admin/commissions"');

    expect(registerIndex).toBeGreaterThan(-1);
    expect(createAffiliateIndex).toBeGreaterThan(-1);
    expect(commissionsIndex).toBeGreaterThan(createAffiliateIndex);
    expect(registerIndex).toBeLessThan(createAffiliateIndex);
  });

  it("mantém a rota de afiliados no módulo e preserva a consulta e o fallback", () => {
    const routeContent = readProjectFile(MODULE_PATH);

    expect(routeContent).toContain("export function registerAdminAffiliateQueryRoutes(");
    expect(routeContent).toContain('/api/admin/affiliates');
    expect(routeContent).toContain('dependencies.requireMasterAdmin');
    expect(routeContent).toContain('dependencies.getIsPostgresActive()');
    expect(routeContent).toContain('dependencies.getPgPool()');
    expect(routeContent).toContain('SELECT * FROM affiliates ORDER BY created_at DESC');
    expect(routeContent).toContain('dependencies.dbInMemoryLocal.global["affiliates"] || "[]"');
    expect(routeContent).toContain('res.status(500).json({ error: "Erro ao listar afiliados." })');
    expect(routeContent).toContain('res.json(result)');
  });

  it("não acopla o módulo a rotas de mutação nem a domínios proibidos", () => {
    const routeContent = readProjectFile(MODULE_PATH);
    const importLines = routeContent
      .split("\n")
      .filter((line) => line.trimStart().startsWith("import "))
      .join("\n");

    expect(importLines).toContain('from "express"');
    expect(importLines).not.toContain("src/backend/auth");
    expect(importLines).not.toContain("db.ts");
    expect(importLines).not.toContain("pgPool");
    expect(importLines).not.toContain("dbInMemoryLocal");
    expect(importLines).not.toMatch(/["'][^"']*\/fiscal\//i);
    expect(importLines).not.toMatch(/SefazConnector|CertificateManager|CompanyController|DANFE|\bNFe\b|\bNFCe\b|\bNFSe\b/i);
    expect(routeContent).not.toMatch(/\bapp\.(?:post|put|patch|delete)\s*\(/);
    expect(routeContent).not.toMatch(/scheduleSaveLocalFallback|crypto\.randomUUID|getSessionFromRequest/);
  });

  it("não usa atalhos de tipagem proibidos", () => {
    const routeContent = readProjectFile(MODULE_PATH);
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
});
