import { describe, expect, it } from "vitest";
import * as fs from "fs";
import * as path from "path";

const ROUTE_MODULE_PATH =
  "src/backend/fiscal/registerSefazEventObservationRoutes.ts";

describe("SEFAZ event observation route extraction 49.1-U", () => {
  function readProjectFile(relativePath: string): string {
    const filePath = path.resolve(process.cwd(), relativePath);
    expect(fs.existsSync(filePath), `${relativePath} must exist`).toBe(true);
    return fs.readFileSync(filePath, "utf8");
  }

  it("mantém todos os arquivos obrigatórios da etapa", () => {
    readProjectFile("server.ts");
    readProjectFile(ROUTE_MODULE_PATH);
    readProjectFile(
      "src/backend/fiscal/tests/sefaz-event-observation-routes-wiring.test.ts"
    );
    readProjectFile("docs/server-refactor-49.1-U.md");
  });

  it("mantém o wiring modular com todas as dependências", () => {
    const serverContent = readProjectFile("server.ts");

    expect(serverContent).toContain(
      'import { registerSefazEventObservationRoutes } from "./src/backend/fiscal/registerSefazEventObservationRoutes";'
    );
    expect(serverContent).toMatch(
      /registerSefazEventObservationRoutes\(app,\s*\{\s*getSessionFromRequest,\s*getPgPool:\s*\(\)\s*=>\s*pgPool,\s*sefazEventAuditService:\s*SefazEventAuditService\s*\}\);/
    );
  });

  it("remove somente os três GETs alvo do server.ts", () => {
    const serverContent = readProjectFile("server.ts");

    expect(serverContent).not.toMatch(
      /app\.get\(\s*["']\/api\/sefaz\/distribuicao["']/
    );
    expect(serverContent).not.toMatch(
      /app\.get\(\s*["']\/api\/sefaz\/event-queue["']/
    );
    expect(serverContent).not.toMatch(
      /app\.get\(\s*["']\/api\/sefaz\/audit-logs["']/
    );
  });

  it("preserva inline todas as rotas SEFAZ sensíveis exigidas", () => {
    const serverContent = readProjectFile("server.ts");
    const preservedRoutes = [
      /app\.post\(\s*["']\/api\/sefaz\/manifest["']/,
      /app\.post\(\s*["']\/api\/sefaz\/distribuicao["']/,
      /app\.get\(\s*["']\/api\/sefaz\/status["']/,
      /app\.post\(\s*["']\/api\/sefaz\/transmit["']/,
      /app\.post\(\s*["']\/api\/sefaz\/cancel["']/,
      /app\.post\(\s*["']\/api\/sefaz\/invalidate["']/,
      /app\.post\(\s*["']\/api\/sefaz\/cce["']/,
      /app\.post\(\s*["']\/api\/sefaz\/query["']/
    ];

    for (const routePattern of preservedRoutes) {
      expect(serverContent).toMatch(routePattern);
    }
  });

  it("registra o módulo no ponto anterior ao GET de status", () => {
    const serverContent = readProjectFile("server.ts");
    const registrationIndex = serverContent.indexOf(
      "registerSefazEventObservationRoutes(app, {"
    );
    const statusIndex = serverContent.search(
      /app\.get\(\s*["']\/api\/sefaz\/status["']/
    );

    expect(registrationIndex).toBeGreaterThan(-1);
    expect(statusIndex).toBeGreaterThan(registrationIndex);
  });

  it("mantém os três paths e a exportação no módulo", () => {
    const routeContent = readProjectFile(ROUTE_MODULE_PATH);

    expect(routeContent).toContain('/api/sefaz/distribuicao');
    expect(routeContent).toContain('/api/sefaz/event-queue');
    expect(routeContent).toContain('/api/sefaz/audit-logs');
    expect(routeContent).toContain(
      "export function registerSefazEventObservationRoutes("
    );
  });

  it("usa autenticação, banco e auditoria somente como dependências injetadas", () => {
    const routeContent = readProjectFile(ROUTE_MODULE_PATH);
    const importLines = routeContent
      .split("\n")
      .filter((line) => line.trimStart().startsWith("import "))
      .join("\n");

    expect(routeContent).toMatch(
      /export interface SefazEventObservationRouteDependencies\s*\{[\s\S]*?getSessionFromRequest:[\s\S]*?getPgPool:\s*\(\)\s*=>\s*SefazEventObservationPgPool\s*\|\s*null;[\s\S]*?sefazEventAuditService:/
    );
    expect(routeContent).toContain("dependencies.getSessionFromRequest(req)");
    expect(routeContent.match(/const pgPool = dependencies\.getPgPool\(\);/g)).toHaveLength(2);
    expect(routeContent).not.toMatch(/^\s*pgPool\s*:/m);
    expect(routeContent).not.toContain("dependencies.pgPool");
    expect(routeContent).toContain(
      "dependencies.sefazEventAuditService.getLogs(session.company_id, 100)"
    );
    expect(importLines).toBe('import type { Express, Request, Response } from "express";');
    expect(importLines).not.toMatch(/auth|(?:^|\/)db(?:\.ts)?|SefazEventAuditService/i);
  });

  it("não usa atalhos de tipagem proibidos", () => {
    const routeContent = readProjectFile(ROUTE_MODULE_PATH);
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

  it("registra somente GETs e não contém domínios proibidos", () => {
    const routeContent = readProjectFile(ROUTE_MODULE_PATH);
    const forbiddenDomains = [
      /SefazConnector/,
      /SefazEventQueue/,
      /DANFE/,
      /\bNFe\b/i,
      /\bNFCe\b/i,
      /\bNFSe\b/i,
      /certific/i,
      /CertificateManager/,
      /CompanyController/
    ];

    expect(routeContent).not.toMatch(/app\.(?:post|put|patch|delete)\s*\(/);
    for (const domainPattern of forbiddenDomains) {
      expect(routeContent).not.toMatch(domainPattern);
    }
  });

  it("preserva mensagens, payloads, SQL, ordenação e limites centrais", () => {
    const routeContent = readProjectFile(ROUTE_MODULE_PATH);

    expect(routeContent.match(/Sessão inválida/g)).toHaveLength(3);
    expect(routeContent.match(/res\.status\(401\)\.json/g)).toHaveLength(3);
    expect(routeContent.match(/res\.status\(500\)\.json/g)).toHaveLength(3);
    expect(routeContent).toContain("res.json(result.rows || []);");
    expect(routeContent).toContain("res.json(logs);");
    expect(routeContent).toContain(
      "const limit = parseInt(req.query.limit as string) || 100;"
    );
    expect(routeContent).toContain(
      "SELECT * FROM sefaz_distribution_documents WHERE company_id = $1 ORDER BY created_at DESC LIMIT $2"
    );
    expect(routeContent).toContain("[session.company_id, limit]");
    expect(routeContent).toContain(
      "SELECT * FROM sefaz_event_queue WHERE company_id = $1 ORDER BY created_at DESC LIMIT 50"
    );
    expect(routeContent).toContain("[session.company_id]");
    expect(routeContent).toContain(
      "getLogs(session.company_id, 100)"
    );
  });
});
