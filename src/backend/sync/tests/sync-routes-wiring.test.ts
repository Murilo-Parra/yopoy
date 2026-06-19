import { describe, expect, it } from "vitest";
import * as fs from "fs";
import * as path from "path";

const MODULE_PATH = "src/backend/sync/registerSyncRoutes.ts";

describe("sync route extraction 49.1-S", () => {
  function readProjectFile(relativePath: string): string {
    const filePath = path.resolve(process.cwd(), relativePath);
    expect(fs.existsSync(filePath), `${relativePath} must exist`).toBe(true);
    return fs.readFileSync(filePath, "utf8");
  }

  it("mantém todos os arquivos obrigatórios da etapa", () => {
    readProjectFile("server.ts");
    readProjectFile(MODULE_PATH);
    readProjectFile("src/backend/sync/tests/sync-routes-wiring.test.ts");
    readProjectFile("docs/server-refactor-49.1-S.md");
  });

  it("importa, registra e injeta somente as três dependências de sync", () => {
    const serverContent = readProjectFile("server.ts");

    expect(serverContent).toContain(
      'import { registerSyncRoutes } from "./src/backend/sync/registerSyncRoutes";'
    );
    expect(serverContent).toMatch(
      /registerSyncRoutes\(app,\s*\{\s*getSessionFromRequest,\s*saveSyncKey,\s*loadSyncData\s*\}\);/
    );
  });

  it("remove os dois handlers inline do server", () => {
    const serverContent = readProjectFile("server.ts");

    expect(serverContent).not.toMatch(/app\.post\(\s*["']\/api\/sync\/save["']/);
    expect(serverContent).not.toMatch(/app\.get\(\s*["']\/api\/sync\/load["']/);
  });

  it("preserva audit log inline e a ordem original de registro", () => {
    const serverContent = readProjectFile("server.ts");
    const syncIndex = serverContent.indexOf("registerSyncRoutes(app, {");
    const auditIndex = serverContent.indexOf('app.post("/api/audit/log"');

    expect(syncIndex).toBeGreaterThan(-1);
    expect(auditIndex).toBeGreaterThan(syncIndex);
  });

  it("exporta e registra somente POST save e GET load", () => {
    const routeContent = readProjectFile(MODULE_PATH);

    expect(routeContent).toContain("export function registerSyncRoutes(");
    expect(routeContent).toMatch(/app\.post\(\s*["']\/api\/sync\/save["']/);
    expect(routeContent).toMatch(/app\.get\(\s*["']\/api\/sync\/load["']/);
    expect(routeContent).not.toMatch(/app\.(?:put|patch|delete)\s*\(/);
  });

  it("recebe sessão e persistência somente por injeção", () => {
    const routeContent = readProjectFile(MODULE_PATH);
    const importLines = routeContent
      .split("\n")
      .filter((line) => line.trimStart().startsWith("import "))
      .join("\n");
    const importSources = Array.from(
      importLines.matchAll(/from\s+["']([^"']+)["']/g),
      (match) => match[1]
    );

    expect(routeContent).toMatch(/export interface SyncRouteDependencies\s*\{/);
    expect(routeContent).toContain("getSessionFromRequest:");
    expect(routeContent).toContain("saveSyncKey:");
    expect(routeContent).toContain("loadSyncData:");
    expect(routeContent).toContain("dependencies.getSessionFromRequest(req)");
    expect(routeContent).toContain("dependencies.saveSyncKey(identifier, key, value)");
    expect(routeContent).toContain("dependencies.loadSyncData(identifier)");
    expect(importSources).toEqual(["express"]);
    expect(importLines).not.toMatch(/auth/i);
    expect(importLines).not.toMatch(/getSessionFromRequest|saveSyncKey|loadSyncData/);
    expect(
      importSources.some((source) => /(^|\/)db(?:\.ts)?(?:\/|$)/i.test(source))
    ).toBe(false);
  });

  it("preserva fallback, payloads, mensagens e status codes", () => {
    const routeContent = readProjectFile(MODULE_PATH);

    expect(routeContent.match(/"guest"/g)).toHaveLength(2);
    expect(routeContent).toContain("const { key, value } = req.body");
    expect(routeContent).toContain('res.status(400).json({ error: "Chave inválida." })');
    expect(routeContent).toContain("res.json({ success: true })");
    expect(routeContent).toContain("res.json(data)");
    expect(routeContent).toContain('console.error("Erro ao salvar sincronia de dados:", err)');
    expect(routeContent).toContain('console.error("Erro ao carregar sincronia de dados:", err)');
    expect(routeContent.match(/res\.status\(500\)\.json\(\{ error: getErrorMessage\(err\) \|\| "Erro interno de sincronia" \}\)/g)).toHaveLength(2);
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

  it("não acopla o módulo a domínios proibidos", () => {
    const routeContent = readProjectFile(MODULE_PATH);
    const forbiddenPatterns = [
      /pgPool/i,
      /dbInMemoryLocal/i,
      /logAudit/i,
      /fiscal/i,
      /SEFAZ/i,
      /NF-e/i,
      /NFC-e/i,
      /NFS-e/i,
      /requireMasterAdmin/i,
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
