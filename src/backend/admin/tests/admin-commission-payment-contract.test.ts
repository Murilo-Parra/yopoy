import { describe, expect, it } from "vitest";
import * as fs from "fs";
import * as path from "path";

const SERVER_PATH = "server.ts";
const TEST_PATH = "src/backend/admin/tests/admin-commission-payment-contract.test.ts";
const REPORT_PATH = "docs/server-refactor-49.1-AS.md";
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

describe("admin commission payment contract 49.1-AS", () => {
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

    expect(commissionQueryIndex).toBeGreaterThan(-1);
    expect(routeIndex).toBeGreaterThan(commissionQueryIndex);
    expect(supportQueryIndex).toBeGreaterThan(routeIndex);
    expect(block).toContain(
      'app.post("/api/admin/commissions/:id/pay", requireMasterAdmin, async'
    );
  });

  it("usa um client dedicado em toda a transação PostgreSQL", () => {
    const block = commissionPaymentRouteBlock(readProjectFile(SERVER_PATH));
    const connectIndex = block.indexOf("const client = await pgPool.connect()");
    const beginIndex = block.indexOf('await client.query("BEGIN")');
    const selectIndex = block.indexOf(
      'client.query("SELECT * FROM affiliate_commissions WHERE id = $1", [id])'
    );
    const commissionUpdateIndex = block.indexOf(
      'client.query("UPDATE affiliate_commissions SET status = \'Pago\' WHERE id = $1", [id])'
    );
    const affiliateUpdateIndex = block.indexOf("const affiliateUpdate = await client.query");
    const commitIndex = block.indexOf('await client.query("COMMIT")');
    const releaseIndex = block.indexOf("client.release()");

    expect(connectIndex).toBeGreaterThan(-1);
    expect(beginIndex).toBeGreaterThan(connectIndex);
    expect(selectIndex).toBeGreaterThan(beginIndex);
    expect(commissionUpdateIndex).toBeGreaterThan(selectIndex);
    expect(affiliateUpdateIndex).toBeGreaterThan(commissionUpdateIndex);
    expect(commitIndex).toBeGreaterThan(affiliateUpdateIndex);
    expect(releaseIndex).toBeGreaterThan(commitIndex);
    expect(block).not.toMatch(/pgPool\.query\s*\(/);
  });

  it("faz ROLLBACK, release no finally e valida rowCount do afiliado", () => {
    const block = commissionPaymentRouteBlock(readProjectFile(SERVER_PATH));

    expect(block).toContain('await client.query("ROLLBACK")');
    expect(block).toContain("if (affiliateUpdate.rowCount === 0)");
    expect(block).toMatch(/finally\s*\{\s*client\.release\(\);\s*\}/);
  });

  it("trata comissão inexistente, já paga e afiliado inexistente", () => {
    const block = commissionPaymentRouteBlock(readProjectFile(SERVER_PATH));

    expect(block).toContain("if (!comm)");
    expect(block).toContain("if (comm.status === 'Pago')");
    expect(block).toContain('res.status(404).json({ error: "Comissão não encontrada." })');
    expect(block).toContain('res.status(409).json({ error: "Comissão já foi paga." })');
    expect(block).toContain('res.status(404).json({ error: "Afiliado não encontrado." })');
  });

  it("preserva somente a baixa interna e o payload de sucesso", () => {
    const block = commissionPaymentRouteBlock(readProjectFile(SERVER_PATH));

    expect(block).toContain("affiliate_commissions");
    expect(block).toContain("affiliates");
    expect(block).toContain("commission_paid");
    expect(block).toContain("commission_pending");
    expect(block).toContain(
      'res.json({ success: true, message: "Comissão quitada e registrada financeiramente com sucesso!" });'
    );
    expect(block).toContain(
      'res.status(500).json({ error: "Erro ao dar baixa em comissão." });'
    );
    expect(block).not.toContain("details:");
  });

  it("não adiciona gateway, API financeira ou chamada externa", () => {
    const block = commissionPaymentRouteBlock(readProjectFile(SERVER_PATH));

    expect(block).not.toMatch(
      /\b(?:Pix|boleto|cart[aã]o|Stripe|Mercado Pago|PayPal|PagSeguro|Pagar\.me|Cielo|Asaas|Iugu|OpenPix|Gerencianet|Efi|fetch|axios|http\.request|https\.request|Authorization|Bearer|apiKey|secretKey|webhook)\b/i
    );
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
