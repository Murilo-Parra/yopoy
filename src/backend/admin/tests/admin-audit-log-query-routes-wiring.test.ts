import { describe, expect, it } from "vitest";
import * as fs from "fs";
import * as path from "path";

const MODULE_PATH = "src/backend/admin/registerAdminAuditLogQueryRoutes.ts";

describe("admin audit log query route extraction 49.1-Z", () => {
  function readProjectFile(relativePath: string): string {
    const filePath = path.resolve(process.cwd(), relativePath);
    expect(fs.existsSync(filePath), `${relativePath} must exist`).toBe(true);
    return fs.readFileSync(filePath, "utf8");
  }

  it("mantém todos os arquivos obrigatórios da etapa", () => {
    readProjectFile("server.ts");
    readProjectFile(MODULE_PATH);
    readProjectFile("src/backend/admin/tests/admin-audit-log-query-routes-wiring.test.ts");
    readProjectFile("docs/server-refactor-49.1-Z.md");
  });

  it("importa, injeta dependências e registra antes do monitoramento", () => {
    const serverContent = readProjectFile("server.ts");

    expect(serverContent).toContain(
      'import { registerAdminAuditLogQueryRoutes } from "./src/backend/admin/registerAdminAuditLogQueryRoutes";'
    );
    const registrationMatch = serverContent.match(
      /registerAdminAuditLogQueryRoutes\(app,\s*\{([\s\S]*?)\n\}\);/
    );
    expect(registrationMatch).not.toBeNull();
    const registrationContent = registrationMatch?.[1] || "";

    expect(registrationContent).toContain("requireMasterAdmin,");
    expect(registrationContent).toContain("getIsPostgresActive: () => isPostgresActive");
    expect(registrationContent).toContain("getPgPool: () => pgPool");
    expect(registrationContent).toContain("dbInMemoryLocal");
    expect(serverContent).not.toMatch(/app\.get\(\s*["']\/api\/admin\/audit-logs["']/);
    expect(serverContent).toContain("registerAdminSystemMonitoringRoutes(app, {");

    const auditLogIndex = serverContent.indexOf("registerAdminAuditLogQueryRoutes(app, {");
    const monitoringIndex = serverContent.indexOf("registerAdminSystemMonitoringRoutes(app, {");

    expect(auditLogIndex).toBeGreaterThan(-1);
    expect(monitoringIndex).toBeGreaterThan(auditLogIndex);
  });

  it("preserva rota, consultas, limites, fallback e resposta", () => {
    const routeContent = readProjectFile(MODULE_PATH);

    expect(routeContent).toContain("export function registerAdminAuditLogQueryRoutes(");
    expect(routeContent).toContain('app.get("/api/admin/audit-logs"');
    expect(routeContent).toContain("dependencies.requireMasterAdmin");
    expect(routeContent).toContain("dependencies.getIsPostgresActive()");
    expect(routeContent).toContain("dependencies.getPgPool()");
    expect(routeContent).toContain("SELECT * FROM audit_logs ORDER BY timestamp DESC LIMIT 200");
    expect(routeContent).toContain("SELECT * FROM system_logs ORDER BY created_at DESC LIMIT 200");
    expect(routeContent).toContain('dependencies.dbInMemoryLocal.global["audit_logs"] || "[]"');
    expect(routeContent).toContain('dependencies.dbInMemoryLocal.global["system_logs"] || "[]"');
    expect(routeContent.match(/reverse\(\)\.slice\(0, 200\)/g)).toHaveLength(2);
    expect(routeContent).toContain("res.json({ audit_logs, system_logs })");
    expect(routeContent).toContain('res.status(500).json({ error: "Erro interno ao obter logs." })');
  });

  it("preserva o short-circuit e o fallback nos dois estados sem pool utilizável", () => {
    const routeContent = readProjectFile(MODULE_PATH);
    const postgresCheckIndex = routeContent.indexOf("if (dependencies.getIsPostgresActive()) {");
    const pgPoolGetterIndex = routeContent.indexOf("const pgPool = dependencies.getPgPool();");

    expect(postgresCheckIndex).toBeGreaterThan(-1);
    expect(pgPoolGetterIndex).toBeGreaterThan(postgresCheckIndex);
    expect(routeContent.slice(0, postgresCheckIndex)).not.toContain("dependencies.getPgPool()");
    expect(routeContent).toMatch(
      /if \(dependencies\.getIsPostgresActive\(\)\) \{\s*const pgPool = dependencies\.getPgPool\(\);[\s\S]*?if \(pgPool\) \{[\s\S]*?\n\s*\} else \{\s*loadLocalFallback\(\);\s*\n\s*\}\s*\n\s*\} else \{\s*loadLocalFallback\(\);/
    );
    expect(routeContent.match(/loadLocalFallback\(\);/g)).toHaveLength(2);
  });

  it("usa apenas GET e não contém mutações ou domínios proibidos", () => {
    const routeContent = readProjectFile(MODULE_PATH);
    const importLines = routeContent
      .split("\n")
      .filter((line) => line.trimStart().startsWith("import "))
      .join("\n");

    expect(importLines).toContain('from "express"');
    expect(importLines).not.toMatch(/auth/i);
    expect(importLines).not.toContain("requireMasterAdmin");
    expect(importLines).not.toContain("db.ts");
    expect(importLines).not.toContain("pgPool");
    expect(importLines).not.toContain("dbInMemoryLocal");
    expect(routeContent).not.toMatch(/\bapp\.(?:post|put|patch|delete)\s*\(/);
    expect(routeContent).not.toMatch(/\b(?:BEGIN|COMMIT|ROLLBACK)\b/);
    expect(routeContent).not.toMatch(
      /scheduleSaveLocalFallback|crypto\.randomUUID|getSessionFromRequest|fiscal|SEFAZ|DANFE|\bNFe\b|\bNFCe\b|\bNFSe\b|certificat/i
    );
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
