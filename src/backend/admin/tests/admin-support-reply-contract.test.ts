import { describe, expect, it } from "vitest";
import * as fs from "fs";
import * as path from "path";

const SERVER_PATH = "server.ts";
const TEST_PATH = "src/backend/admin/tests/admin-support-reply-contract.test.ts";
const REPORT_PATH = "docs/server-refactor-49.1-AO.md";
const ROUTE_MARKER = 'app.post("/api/admin/support/:id/reply"';
const PREVIOUS_MARKER = "registerAdminSupportQueryRoutes(app, {";
const NEXT_MARKER = "registerAdminAuditLogQueryRoutes(app, {";

function readProjectFile(relativePath: string): string {
  const filePath = path.resolve(process.cwd(), relativePath);
  expect(fs.existsSync(filePath), `${relativePath} must exist`).toBe(true);
  return fs.readFileSync(filePath, "utf8");
}

function supportReplyRouteBlock(serverContent: string): string {
  const startIndex = serverContent.indexOf(ROUTE_MARKER);
  const endIndex = serverContent.indexOf(NEXT_MARKER, startIndex + ROUTE_MARKER.length);

  expect(startIndex, `${ROUTE_MARKER} must exist`).toBeGreaterThan(-1);
  expect(endIndex, `${NEXT_MARKER} must follow ${ROUTE_MARKER}`).toBeGreaterThan(startIndex);
  return serverContent.slice(startIndex, endIndex);
}

describe("admin support reply contract 49.1-AO", () => {
  it("mantém todos os arquivos obrigatórios da etapa", () => {
    readProjectFile(SERVER_PATH);
    readProjectFile(TEST_PATH);
    readProjectFile(REPORT_PATH);
  });

  it("mantém a rota inline, autenticada e na posição atual", () => {
    const serverContent = readProjectFile(SERVER_PATH);
    const supportQueryIndex = serverContent.indexOf(PREVIOUS_MARKER);
    const routeIndex = serverContent.indexOf(ROUTE_MARKER);
    const auditQueryIndex = serverContent.indexOf(NEXT_MARKER);
    const block = supportReplyRouteBlock(serverContent);

    expect(supportQueryIndex, `${PREVIOUS_MARKER} must exist`).toBeGreaterThan(-1);
    expect(routeIndex).toBeGreaterThan(supportQueryIndex);
    expect(auditQueryIndex).toBeGreaterThan(routeIndex);
    expect(block).toContain(
      'app.post("/api/admin/support/:id/reply", requireMasterAdmin, async'
    );
  });

  it("preserva dependências e limites da rota", () => {
    const block = supportReplyRouteBlock(readProjectFile(SERVER_PATH));

    expect(block).toContain("pgPool");
    expect(block).toContain("isPostgresActive");
    expect(block).toContain("dbInMemoryLocal");
    expect(block).toContain("scheduleSaveLocalFallback");
    expect(block).toContain("new Date");
    expect(block).not.toMatch(/Date\.now|crypto\.randomUUID/);
    expect(block).not.toMatch(/\b(?:BEGIN|COMMIT|ROLLBACK)\b/);
    expect(block).not.toMatch(
      /\b(?:fetch|axios|SEFAZ|NFe|NFCe|NFSe|DANFE|CompanyController|certificado|certificate|servi[cç]o externo)\b/i
    );
  });

  it("preserva a validação de entrada real", () => {
    const block = supportReplyRouteBlock(readProjectFile(SERVER_PATH));

    expect(block).toContain("const { message, status } = req.body;");
    expect(block).toContain("if (!message)");
    expect(block).toContain(
      'res.status(400).json({ error: "A mensagem de resposta não pode estar em branco." });'
    );
  });

  it("preserva o read-modify-write PostgreSQL e o formato real da resposta", () => {
    const block = supportReplyRouteBlock(readProjectFile(SERVER_PATH));

    expect(block).toContain("if (isPostgresActive && pgPool)");
    expect(block).toContain(
      'pgPool.query("SELECT * FROM support_tickets WHERE id = $1", [id])'
    );
    expect(block).toContain("const ticket = ticketRes.rows[0];");
    expect(block).toContain("if (ticket)");
    expect(block).toContain("ticket.replies");
    expect(block).toContain("replies.push(replyObj)");
    expect(block).toMatch(
      /const replyObj = \{\s*date: new Date\(\)\.toISOString\(\),\s*sender: 'Suporte Elparrar SaaS',\s*message\s*};/
    );
    expect(block).toContain("UPDATE support_tickets");
    expect(block).toContain("SET status = $1, replies = $2::jsonb");
    expect(block).toContain("WHERE id = $3");
    expect(block).toContain("[status, JSON.stringify(replies), id]");
    expect(block).not.toMatch(/rowCount|res\.status\(404\)/);
  });

  it("preserva o fallback local real", () => {
    const block = supportReplyRouteBlock(readProjectFile(SERVER_PATH));

    expect(block).toContain("dbInMemoryLocal.global['support_tickets']");
    expect(block).toContain("tickets.findIndex");
    expect(block).toContain("st.id === id");
    expect(block).toContain("tickets[idx].replies");
    expect(block).toContain("replies.push(replyObj)");
    expect(block).toContain("tickets[idx].status = status");
    expect(block).toContain("scheduleSaveLocalFallback()");
  });

  it("preserva os payloads HTTP reais", () => {
    const block = supportReplyRouteBlock(readProjectFile(SERVER_PATH));

    expect(block).toContain(
      'res.json({ success: true, message: "Resposta transmitida e status do chamado atualizado comercialmente!" });'
    );
    expect(block).toContain(
      'res.status(500).json({ error: "Erro ao responder chamado." });'
    );
    expect(block).not.toContain("details:");
  });

  it("documenta que o append continua sem proteção concorrente", () => {
    const block = supportReplyRouteBlock(readProjectFile(SERVER_PATH));

    expect(block).toContain("SELECT * FROM support_tickets WHERE id = $1");
    expect(block).toContain("replies.push(replyObj)");
    expect(block).toContain("UPDATE support_tickets");
    expect(block).not.toMatch(/jsonb_(?:insert|set)|replies\s*\|\||FOR\s+UPDATE|\bLOCK\b/i);
    expect(block).not.toMatch(/\b(?:BEGIN|COMMIT|ROLLBACK)\b/);
    expect(block).not.toMatch(/updated_at|\bversion\b/i);
  });

  it("impede a extração antecipada da rota", () => {
    const serverContent = readProjectFile(SERVER_PATH);
    const modulePath = path.resolve(
      process.cwd(),
      "src/backend/admin/registerAdminSupportReplyMutationRoutes.ts"
    );

    expect(serverContent).not.toMatch(
      /import\s+\{[^}]*\bregisterAdminSupportReplyMutationRoutes\b[^}]*\}\s+from/
    );
    expect(serverContent).not.toContain("registerAdminSupportReplyMutationRoutes(app,");
    expect(fs.existsSync(modulePath)).toBe(false);
  });
});
