import { describe, expect, it } from "vitest";
import * as fs from "fs";
import * as path from "path";

const MODULE_PATH = "src/backend/admin/registerAdminSupportQueryRoutes.ts";

describe("admin support query route extraction 49.1-X", () => {
  function readProjectFile(relativePath: string): string {
    const filePath = path.resolve(process.cwd(), relativePath);
    expect(fs.existsSync(filePath), `${relativePath} must exist`).toBe(true);
    return fs.readFileSync(filePath, "utf8");
  }

  it("mantém todos os arquivos obrigatórios da etapa", () => {
    readProjectFile("server.ts");
    readProjectFile(MODULE_PATH);
    readProjectFile("src/backend/admin/tests/admin-support-query-routes-wiring.test.ts");
    readProjectFile("docs/server-refactor-49.1-X.md");
  });

  it("importa e registra o módulo no ponto correto do server.ts", () => {
    const serverContent = readProjectFile("server.ts");

    expect(serverContent).toContain(
      'import { registerAdminSupportQueryRoutes } from "./src/backend/admin/registerAdminSupportQueryRoutes";'
    );
    const registrationMatch = serverContent.match(
      /registerAdminSupportQueryRoutes\(app,\s*\{([\s\S]*?)\n\}\);/
    );
    expect(registrationMatch).not.toBeNull();
    const registrationContent = registrationMatch?.[1] || "";

    expect(registrationContent).toContain("requireMasterAdmin,");
    expect(registrationContent).toContain("getIsPostgresActive: () => isPostgresActive");
    expect(registrationContent).toContain("getPgPool: () => pgPool");
    expect(registrationContent).toContain("dbInMemoryLocal");
    expect(serverContent).not.toMatch(/app\.get\(\s*["']\/api\/admin\/support["']/);
    expect(serverContent).toContain('app.post("/api/admin/support/:id/reply"');
    expect(serverContent).toContain('app.get("/api/admin/audit-logs"');

    const payCommissionIndex = serverContent.indexOf('app.post("/api/admin/commissions/:id/pay"');
    const registerIndex = serverContent.indexOf("registerAdminSupportQueryRoutes(app, {");
    const replyIndex = serverContent.indexOf('app.post("/api/admin/support/:id/reply"');
    const auditLogsIndex = serverContent.indexOf('app.get("/api/admin/audit-logs"');

    expect(payCommissionIndex).toBeGreaterThan(-1);
    expect(registerIndex).toBeGreaterThan(payCommissionIndex);
    expect(replyIndex).toBeGreaterThan(registerIndex);
    expect(auditLogsIndex).toBeGreaterThan(replyIndex);
  });

  it("preserva a consulta PostgreSQL, o join, a ordenação e o fallback local", () => {
    const routeContent = readProjectFile(MODULE_PATH);

    expect(routeContent).toContain("export function registerAdminSupportQueryRoutes(");
    expect(routeContent).toContain('/api/admin/support');
    expect(routeContent).toContain("dependencies.requireMasterAdmin");
    expect(routeContent).toContain("dependencies.getIsPostgresActive()");
    expect(routeContent).toContain("dependencies.getPgPool()");
    expect(routeContent).toContain("SELECT st.*, c.corporate_name as company_name");
    expect(routeContent).toContain("FROM support_tickets st");
    expect(routeContent).toContain("LEFT JOIN companies c ON st.company_id = c.id");
    expect(routeContent).toContain("CASE WHEN st.status = 'Aberto' THEN 1 WHEN st.status = 'Em Atendimento' THEN 2 ELSE 3 END");
    expect(routeContent).toContain("st.created_at DESC");
    expect(routeContent).toContain('dependencies.dbInMemoryLocal.global["support_tickets"] || "[]"');
    expect(routeContent).toContain('dependencies.dbInMemoryLocal.global["companies"] || "[]"');
    expect(routeContent).toContain("companies.find((c) => c.id === st.company_id)");
    expect(routeContent).toContain('company_name: comp ? comp.corporate_name : "Não Autenticado"');
    expect(routeContent).toContain('res.status(500).json({ error: "Erro ao listar chamados de suporte." })');
    expect(routeContent).toContain("res.json(result)");
  });

  it("usa dependências injetadas sem acoplamento a mutações ou domínios proibidos", () => {
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
    expect(importLines).not.toMatch(/fiscal|SEFAZ|NF-e|NFC-e|NFS-e|DANFE|certificat/i);
    expect(routeContent).not.toMatch(/\bapp\.(?:post|put|patch|delete)\s*\(/);
    expect(routeContent).not.toMatch(
      /scheduleSaveLocalFallback|crypto\.randomUUID|getSessionFromRequest|SefazConnector|CertificateManager|CompanyController|DANFE|\bNFe\b|\bNFCe\b|\bNFSe\b/
    );
  });

  it("acessa estado mutável somente pelos getters injetados", () => {
    const routeContent = readProjectFile(MODULE_PATH);

    expect(routeContent).not.toMatch(/\bisPostgresActive\b/);
    expect(routeContent).toContain("dependencies.getIsPostgresActive()");
    expect(routeContent).toContain("const pgPool = dependencies.getPgPool();");
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
