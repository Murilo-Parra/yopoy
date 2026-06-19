import { describe, expect, it } from "vitest";
import * as fs from "fs";
import * as path from "path";

const MODULE_PATH = "src/backend/admin/registerAdminSystemMonitoringRoutes.ts";

describe("admin system monitoring route extraction 49.1-R", () => {
  function readProjectFile(relativePath: string): string {
    const filePath = path.resolve(process.cwd(), relativePath);
    expect(fs.existsSync(filePath), `${relativePath} must exist`).toBe(true);
    return fs.readFileSync(filePath, "utf8");
  }

  it("mantém todos os arquivos obrigatórios da etapa", () => {
    readProjectFile("server.ts");
    readProjectFile(MODULE_PATH);
    readProjectFile("src/backend/admin/tests/admin-system-monitoring-routes-wiring.test.ts");
    readProjectFile("docs/server-refactor-49.1-R.md");
  });

  it("importa, registra e injeta as dependências preservando o valor dinâmico", () => {
    const serverContent = readProjectFile("server.ts");

    expect(serverContent).toContain(
      'import { registerAdminSystemMonitoringRoutes } from "./src/backend/admin/registerAdminSystemMonitoringRoutes";'
    );
    expect(serverContent).toMatch(
      /registerAdminSystemMonitoringRoutes\(app,\s*\{\s*requireMasterAdmin,\s*getIsPostgresActive:\s*\(\)\s*=>\s*isPostgresActive\s*\}\);/
    );
    expect(serverContent).not.toMatch(
      /app\.get\(\s*["']\/api\/admin\/system["']/
    );
  });

  it("preserva a ordem entre audit logs, monitoramento e custom providers", () => {
    const serverContent = readProjectFile("server.ts");
    const auditLogsIndex = serverContent.indexOf('app.get("/api/admin/audit-logs"');
    const monitoringIndex = serverContent.indexOf("registerAdminSystemMonitoringRoutes(app, {");
    const customProvidersIndex = serverContent.indexOf('app.get("/api/admin/custom-providers"');

    expect(auditLogsIndex).toBeGreaterThan(-1);
    expect(monitoringIndex).toBeGreaterThan(auditLogsIndex);
    expect(customProvidersIndex).toBeGreaterThan(monitoringIndex);
  });

  it("mantém as rotas custom providers inline", () => {
    const serverContent = readProjectFile("server.ts");

    expect(serverContent).toMatch(/app\.get\(\s*["']\/api\/admin\/custom-providers["']/);
    expect(serverContent).toMatch(/app\.post\(\s*["']\/api\/admin\/custom-providers["']/);
    expect(serverContent).toMatch(/app\.put\(\s*["']\/api\/admin\/custom-providers\/:id["']/);
    expect(serverContent).toMatch(/app\.delete\(\s*["']\/api\/admin\/custom-providers\/:id["']/);
  });

  it("exporta e registra somente o GET de monitoramento previsto", () => {
    const routeContent = readProjectFile(MODULE_PATH);

    expect(routeContent).toContain("/api/admin/system");
    expect(routeContent).toContain("export function registerAdminSystemMonitoringRoutes(");
    expect(routeContent).not.toMatch(/app\.(?:post|put|patch|delete)\s*\(/);
  });

  it("recebe autenticação e estado do Postgres somente por injeção", () => {
    const routeContent = readProjectFile(MODULE_PATH);
    const importLines = routeContent
      .split("\n")
      .filter((line) => line.trimStart().startsWith("import "))
      .join("\n");
    const importSources = Array.from(
      importLines.matchAll(/from\s+["']([^"']+)["']/g),
      (match) => match[1]
    );

    expect(routeContent).toMatch(
      /export interface AdminSystemMonitoringRouteDependencies\s*\{\s*requireMasterAdmin:\s*RequestHandler;\s*getIsPostgresActive:\s*\(\)\s*=>\s*boolean;/
    );
    expect(routeContent).toContain("dependencies.requireMasterAdmin");
    expect(routeContent).toContain("dependencies.getIsPostgresActive()");
    expect(importSources).toEqual(["express"]);
    expect(importLines).not.toMatch(/auth/i);
  });

  it("preserva payload, métricas, ambiente e resposta de erro", () => {
    const routeContent = readProjectFile(MODULE_PATH);

    expect(routeContent).toContain("const memory = process.memoryUsage()");
    expect(routeContent).toContain('!!(process.env.DATABASE_URL || "").includes("supabase")');
    expect(routeContent).toContain("uptime: process.uptime()");
    expect(routeContent).toContain("memoryUsedMB: Math.round(memory.heapUsed / 1024 / 1024)");
    expect(routeContent).toContain("memoryTotalMB: Math.round(memory.heapTotal / 1024 / 1024)");
    expect(routeContent).toContain("responseTimeEstMs: Math.floor(Math.random() * 8) + 2");
    expect(routeContent).toContain("scheduledTasks: [");
    expect(routeContent).toContain('res.status(500).json({ error: "Erro no monitoramento do sistema" })');
  });

  it("não usa tipagens proibidas", () => {
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

  it("não acopla a rota a dependências ou domínios proibidos", () => {
    const routeContent = readProjectFile(MODULE_PATH);
    const importLines = routeContent
      .split("\n")
      .filter((line) => line.trimStart().startsWith("import "))
      .join("\n");
    const importSources = Array.from(
      importLines.matchAll(/from\s+["']([^"']+)["']/g),
      (match) => match[1]
    );

    expect(
      importSources.some((source) => /(^|\/)db(?:\.ts)?(?:\/|$)/i.test(source))
    ).toBe(false);

    const forbiddenPatterns = [
      /pgPool/i,
      /dbInMemoryLocal/i,
      /logAudit/i,
      /getSessionFromRequest/i,
      /SefazConnector/i,
      /CertificateManager/i,
      /CompanyController/i,
      /DANFE/i,
      /\bNFe\b/i,
      /\bNFCe\b/i,
      /\bNFSe\b/i,
      /certificad/i
    ];

    for (const pattern of forbiddenPatterns) {
      expect(routeContent).not.toMatch(pattern);
    }
  });
});
