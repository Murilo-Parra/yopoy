import { describe, expect, it } from "vitest";
import * as fs from "fs";
import * as path from "path";

const SERVER_PATH = "server.ts";
const TEST_PATH = "src/backend/admin/tests/admin-commission-payment-contract.test.ts";
const REPORT_PATH = "docs/server-refactor-49.1-AP.md";
const ROUTE_MARKER = 'app.post("/api/admin/commissions/:id/pay"';
const PREVIOUS_MARKER = "registerAdminCommissionQueryRoutes(app, {";
const NEXT_MARKER = "registerAdminSupportQueryRoutes(app, {";

function readProjectFile(relativePath: string): string {
  const filePath = path.resolve(process.cwd(), relativePath);
  expect(fs.existsSync(filePath), `${relativePath} must exist`).toBe(true);
  return fs.readFileSync(filePath, "utf8");
}

function commissionPaymentRouteBlock(serverContent: string): string {
  const startIndex = serverContent.indexOf(ROUTE_MARKER);
  const endIndex = serverContent.indexOf(NEXT_MARKER, startIndex + ROUTE_MARKER.length);

  expect(startIndex, `${ROUTE_MARKER} must exist`).toBeGreaterThan(-1);
  expect(endIndex, `${NEXT_MARKER} must follow ${ROUTE_MARKER}`).toBeGreaterThan(startIndex);
  return serverContent.slice(startIndex, endIndex);
}

describe("admin commission payment contract 49.1-AP", () => {
  it("mantém todos os arquivos obrigatórios da etapa", () => {
    readProjectFile(SERVER_PATH);
    readProjectFile(TEST_PATH);
    readProjectFile(REPORT_PATH);
  });

  it("mantém a rota inline, autenticada e na posição atual", () => {
    const serverContent = readProjectFile(SERVER_PATH);
    const commissionQueryIndex = serverContent.indexOf(PREVIOUS_MARKER);
    const routeIndex = serverContent.indexOf(ROUTE_MARKER);
    const supportQueryIndex = serverContent.indexOf(NEXT_MARKER);
    const block = commissionPaymentRouteBlock(serverContent);

    expect(commissionQueryIndex, `${PREVIOUS_MARKER} must exist`).toBeGreaterThan(-1);
    expect(routeIndex).toBeGreaterThan(commissionQueryIndex);
    expect(supportQueryIndex).toBeGreaterThan(routeIndex);
    expect(block).toContain(
      'app.post("/api/admin/commissions/:id/pay", requireMasterAdmin, async'
    );
  });

  it("preserva dependências e limites reais da rota", () => {
    const block = commissionPaymentRouteBlock(readProjectFile(SERVER_PATH));

    expect(block).toContain("pgPool");
    expect(block).toContain("isPostgresActive");
    expect(block).toContain("dbInMemoryLocal");
    expect(block).toContain("scheduleSaveLocalFallback");
    expect(block).not.toMatch(/new Date|Date\.now|crypto\.randomUUID/);
    expect(block).not.toMatch(
      /\b(?:fetch|axios|SEFAZ|NFe|NFCe|NFSe|DANFE|CompanyController|certificado|certificate|servi[cç]o externo)\b/i
    );
  });

  it("congela o risco transacional PostgreSQL atual", () => {
    const block = commissionPaymentRouteBlock(readProjectFile(SERVER_PATH));

    expect(block).toContain('await pgPool.query("BEGIN")');
    expect(block).toContain('await pgPool.query("COMMIT")');
    expect(block).not.toMatch(/\bROLLBACK\b/);
    expect(block).not.toMatch(/pgPool\.connect|\.release\(\)/);
    expect(block).not.toMatch(/FOR\s+UPDATE|FOR\s+SHARE|LOCK\s+TABLE|pg_advisory|updated_at|\bversion\b/i);
  });

  it("preserva o SELECT e os UPDATEs PostgreSQL literais", () => {
    const block = commissionPaymentRouteBlock(readProjectFile(SERVER_PATH));
    const selectIndex = block.indexOf(
      'pgPool.query("SELECT * FROM affiliate_commissions WHERE id = $1", [id])'
    );
    const commissionUpdateIndex = block.indexOf(
      'pgPool.query("UPDATE affiliate_commissions SET status = \'Pago\' WHERE id = $1", [id])'
    );
    const affiliateUpdateIndex = block.indexOf("UPDATE affiliates");
    const commitIndex = block.indexOf('pgPool.query("COMMIT")');

    expect(selectIndex).toBeGreaterThan(-1);
    expect(block).toContain("const comm = commRes.rows[0];");
    expect(block).toContain("if (comm && comm.status !== 'Pago')");
    expect(commissionUpdateIndex).toBeGreaterThan(selectIndex);
    expect(block).toMatch(
      /UPDATE affiliates\s+SET commission_paid = commission_paid \+ \$1, commission_pending = commission_pending - \$1\s+WHERE id = \$2/
    );
    expect(block).toContain("[comm.commission_amount, comm.affiliate_id]");
    expect(affiliateUpdateIndex).toBeGreaterThan(commissionUpdateIndex);
    expect(commitIndex).toBeGreaterThan(affiliateUpdateIndex);
  });

  it("preserva sucesso silencioso para comissão ausente ou já paga", () => {
    const block = commissionPaymentRouteBlock(readProjectFile(SERVER_PATH));

    expect(block).toContain("if (comm && comm.status !== 'Pago')");
    expect(block).not.toMatch(/rowCount|res\.status\(404\)|throw new Error/);
    expect(block.indexOf('await pgPool.query("COMMIT")')).toBeGreaterThan(
      block.indexOf("if (comm && comm.status !== 'Pago')")
    );
  });

  it("preserva o fallback local e seus campos financeiros reais", () => {
    const block = commissionPaymentRouteBlock(readProjectFile(SERVER_PATH));

    expect(block).toContain("dbInMemoryLocal.global['affiliate_commissions']");
    expect(block).toContain("dbInMemoryLocal.global['affiliates']");
    expect(block).toContain("commissions.findIndex");
    expect(block).toContain("ac.id === id");
    expect(block).toContain("if (idx !== -1 && commissions[idx].status !== 'Pago')");
    expect(block).toContain("commissions[idx].status = 'Pago'");
    expect(block).toContain("a.id === commissions[idx].affiliate_id");
    expect(block).toContain("if (affIdx !== -1)");
    expect(block).toContain("const amt = commissions[idx].commission_amount;");
    expect(block).toContain(
      "commission_paid = (affiliates[affIdx].commission_paid || 0.00) + amt"
    );
    expect(block).toContain(
      "commission_pending = Math.max(0, (affiliates[affIdx].commission_pending || 0.00) - amt)"
    );
    expect(block).toContain("JSON.stringify(commissions)");
    expect(block).toContain("JSON.stringify(affiliates)");
    expect(block).toContain("scheduleSaveLocalFallback()");
    expect(block).toMatch(
      /if \(affIdx !== -1\) \{[\s\S]*?\n\s*\}\n\s*dbInMemoryLocal\.global\['affiliate_commissions'\] = JSON\.stringify\(commissions\);\n\s*dbInMemoryLocal\.global\['affiliates'\] = JSON\.stringify\(affiliates\);\n\s*scheduleSaveLocalFallback\(\);/
    );
  });

  it("preserva a persistência local mesmo quando o afiliado não existe", () => {
    const block = commissionPaymentRouteBlock(readProjectFile(SERVER_PATH));
    const affiliateGuardIndex = block.indexOf("if (affIdx !== -1)");
    const commissionsWriteIndex = block.indexOf(
      "dbInMemoryLocal.global['affiliate_commissions'] = JSON.stringify(commissions)"
    );
    const scheduleIndex = block.indexOf("scheduleSaveLocalFallback()");

    expect(affiliateGuardIndex).toBeGreaterThan(-1);
    expect(commissionsWriteIndex).toBeGreaterThan(affiliateGuardIndex);
    expect(scheduleIndex).toBeGreaterThan(commissionsWriteIndex);
  });

  it("preserva os payloads e status HTTP reais", () => {
    const block = commissionPaymentRouteBlock(readProjectFile(SERVER_PATH));

    expect(block).toContain(
      'res.json({ success: true, message: "Comissão quitada e registrada financeiramente com sucesso!" });'
    );
    expect(block).toContain(
      'res.status(500).json({ error: "Erro ao dar baixa em comissão." });'
    );
    expect(block).not.toContain("details:");
    expect(block).not.toMatch(/res\.status\(2\d\d\)/);
  });

  it("impede a extração antecipada da rota", () => {
    const serverContent = readProjectFile(SERVER_PATH);
    const modulePath = path.resolve(
      process.cwd(),
      "src/backend/admin/registerAdminCommissionPaymentMutationRoutes.ts"
    );

    expect(serverContent).not.toMatch(
      /import\s+\{[^}]*\bregisterAdminCommissionPaymentMutationRoutes\b[^}]*\}\s+from/
    );
    expect(serverContent).not.toContain("registerAdminCommissionPaymentMutationRoutes(app,");
    expect(fs.existsSync(modulePath)).toBe(false);
  });
});
