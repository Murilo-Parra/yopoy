import { describe, expect, it } from "vitest";
import * as fs from "fs";
import * as path from "path";

const ROUTE_PATH = "/api/nfse/query";
const MODULE_PATH = "src/backend/nfse/registerNfseQueryRoutes.ts";

describe("NFS-e query route extraction 49.1-Q", () => {
  function readProjectFile(relativePath: string): string {
    const filePath = path.resolve(process.cwd(), relativePath);
    expect(fs.existsSync(filePath), `${relativePath} must exist`).toBe(true);
    return fs.readFileSync(filePath, "utf8");
  }

  it("mantém todos os arquivos obrigatórios da etapa", () => {
    readProjectFile("server.ts");
    readProjectFile(MODULE_PATH);
    readProjectFile("src/backend/nfse/tests/nfse-query-routes-wiring.test.ts");
    readProjectFile("docs/server-refactor-49.1-Q.md");
  });

  it("importa, registra e injeta somente a sessão", () => {
    const serverContent = readProjectFile("server.ts");

    expect(serverContent).toContain(
      'import { registerNfseQueryRoutes } from "./src/backend/nfse/registerNfseQueryRoutes";'
    );
    expect(serverContent).toMatch(
      /registerNfseQueryRoutes\(app,\s*\{\s*getSessionFromRequest\s*\}\);/
    );
    expect(serverContent).not.toMatch(
      /app\.get\(\s*["']\/api\/nfse\/query["']/
    );
  });

  it("preserva a ordem relativa entre as rotas SEFAZ adjacentes", () => {
    const serverContent = readProjectFile("server.ts");
    const auditIndex = serverContent.indexOf('app.get("/api/sefaz/audit-logs"');
    const nfseIndex = serverContent.indexOf("registerNfseQueryRoutes(app, {");
    const statusIndex = serverContent.indexOf('app.get("/api/sefaz/status"');

    expect(auditIndex).toBeGreaterThan(-1);
    expect(nfseIndex).toBeGreaterThan(auditIndex);
    expect(statusIndex).toBeGreaterThan(nfseIndex);
  });

  it("exporta e registra somente o GET NFS-e previsto", () => {
    const routeContent = readProjectFile(MODULE_PATH);

    expect(routeContent).toContain(ROUTE_PATH);
    expect(routeContent).toContain("export function registerNfseQueryRoutes(");
    expect(routeContent).not.toMatch(/app\.(?:post|put|patch|delete)\s*\(/);
  });

  it("recebe getSessionFromRequest somente por injeção", () => {
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
      /export interface NfseQueryRouteDependencies\s*\{\s*getSessionFromRequest:/
    );
    expect(routeContent).toContain("dependencies.getSessionFromRequest(req)");
    expect(importSources).toEqual(["express"]);
  });

  it("preserva autenticação, resposta simulada e mensagens", () => {
    const routeContent = readProjectFile(MODULE_PATH);

    expect(routeContent).toContain('res.status(401).json({ error: "Sessão inválida" })');
    expect(routeContent).toContain(
      '<ConsultarNfseResposta><Sucesso>Consultado real via ${type}</Sucesso></ConsultarNfseResposta>'
    );
    expect(routeContent).toContain(
      'res.json({ success: true, message: "Consulta executada com sucesso.", xml: simulatedXmlResponse })'
    );
    expect(routeContent).toContain("res.status(500).json({ error:");
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

  it("não acopla a rota a banco, auth ou domínios fiscais proibidos", () => {
    const routeContent = readProjectFile(MODULE_PATH);
    const importLines = routeContent
      .split("\n")
      .filter((line) => line.trimStart().startsWith("import "))
      .join("\n");
    const importSources = Array.from(
      importLines.matchAll(/from\s+["']([^"']+)["']/g),
      (match) => match[1]
    );

    expect(importLines).not.toMatch(/auth/i);
    expect(
      importSources.some((source) => /(^|\/)db(?:\.ts)?(?:\/|$)/i.test(source))
    ).toBe(false);

    const forbiddenPatterns = [
      /pgPool/i,
      /dbInMemoryLocal/i,
      /logAudit/i,
      /SefazConnector/i,
      /CertificateManager/i,
      /CompanyController/i,
      /DANFE/i,
      /\bNFe\b/i,
      /\bNFCe\b/i
    ];

    for (const pattern of forbiddenPatterns) {
      expect(routeContent).not.toMatch(pattern);
    }
  });
});
