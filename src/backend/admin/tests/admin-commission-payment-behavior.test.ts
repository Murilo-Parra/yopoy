import * as fs from "fs";
import * as path from "path";
import ts from "typescript";
import { beforeEach, describe, expect, it, vi } from "vitest";

const SERVER_PATH = "server.ts";
const ROUTE_MARKER = 'app.post("/api/admin/commissions/:id/pay"';
const NEXT_MARKER = "registerAdminSupportQueryRoutes(app, {";
const SUCCESS_PAYLOAD = {
  success: true,
  message: "Comissão quitada e registrada financeiramente com sucesso!"
};
const ERROR_PAYLOAD = { error: "Erro ao dar baixa em comissão." };

type Commission = {
  id: string;
  affiliate_id: string;
  commission_amount: number;
  status: string;
};

type Affiliate = {
  id: string;
  commission_paid?: number;
  commission_pending?: number;
};

type QueryResult = {
  rows: Commission[];
  rowCount?: number;
};

type RouteRequest = { params: { id: string } };

class ControlledResponse {
  statusCode = 200;
  payload: unknown;

  status(code: number): this {
    this.statusCode = code;
    return this;
  }

  json(payload: unknown): this {
    this.payload = payload;
    return this;
  }
}

type RouteHandler = (
  request: RouteRequest,
  response: ControlledResponse
) => Promise<void>;

type Query = (sql: string, params?: readonly unknown[]) => Promise<QueryResult>;
type Connect = () => Promise<{
  query: ReturnType<typeof vi.fn<Query>>;
  release: ReturnType<typeof vi.fn<() => void>>;
}>;

type RouteEnvironment = {
  handler: RouteHandler;
  clientQuery: ReturnType<typeof vi.fn<Query>>;
  poolQuery: ReturnType<typeof vi.fn<Query>>;
  connect: ReturnType<typeof vi.fn<Connect>>;
  release: ReturnType<typeof vi.fn<() => void>>;
  local: { global: Record<string, string> };
  scheduleSaveLocalFallback: ReturnType<typeof vi.fn<() => void>>;
};

function readInlineRouteSource(): string {
  const filePath = path.resolve(process.cwd(), SERVER_PATH);
  expect(fs.existsSync(filePath), `${SERVER_PATH} must exist`).toBe(true);
  const serverSource = fs.readFileSync(filePath, "utf8");
  const startIndex = serverSource.indexOf(ROUTE_MARKER);
  const endIndex = serverSource.indexOf(
    NEXT_MARKER,
    startIndex + ROUTE_MARKER.length
  );

  expect(startIndex, `${ROUTE_MARKER} must exist`).toBeGreaterThan(-1);
  expect(endIndex, `${NEXT_MARKER} must follow route`).toBeGreaterThan(startIndex);
  return serverSource.slice(startIndex, endIndex);
}

function createEnvironment(options: {
  postgresActive: boolean;
  queryImplementation?: Query;
  commissions?: Commission[];
  affiliates?: Affiliate[];
}): RouteEnvironment {
  const handlers: RouteHandler[] = [];
  const app = {
    post(
      routePath: string,
      _middleware: RouteHandler,
      handler: RouteHandler
    ): void {
      expect(routePath).toBe("/api/admin/commissions/:id/pay");
      handlers.push(handler);
    }
  };
  const requireMasterAdmin: RouteHandler = async () => undefined;
  const defaultQuery: Query = async () => ({ rows: [] });
  const clientQuery = vi.fn<Query>(options.queryImplementation ?? defaultQuery);
  const poolQuery = vi.fn<Query>(defaultQuery);
  const release = vi.fn<() => void>();
  const connect = vi.fn<Connect>(async () => ({ query: clientQuery, release }));
  const pgPool = { query: poolQuery, connect };
  const local = {
    global: {
      affiliate_commissions: JSON.stringify(options.commissions ?? []),
      affiliates: JSON.stringify(options.affiliates ?? [])
    }
  };
  const scheduleSaveLocalFallback = vi.fn<() => void>();
  const transpiled = ts.transpileModule(readInlineRouteSource(), {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022
    }
  });

  new Function(
    "app",
    "requireMasterAdmin",
    "isPostgresActive",
    "pgPool",
    "dbInMemoryLocal",
    "scheduleSaveLocalFallback",
    transpiled.outputText
  )(
    app,
    requireMasterAdmin,
    options.postgresActive,
    pgPool,
    local,
    scheduleSaveLocalFallback
  );

  expect(handlers).toHaveLength(1);
  return {
    handler: handlers[0],
    clientQuery,
    poolQuery,
    connect,
    release,
    local,
    scheduleSaveLocalFallback
  };
}

async function invoke(handler: RouteHandler, id = "commission-1") {
  const response = new ControlledResponse();
  await handler({ params: { id } }, response);
  return response;
}

function normalizedSql(query: ReturnType<typeof vi.fn<Query>>): string[] {
  return query.mock.calls.map(([sql]) => sql.replace(/\s+/g, " ").trim());
}

function pendingCommission(overrides: Partial<Commission> = {}): Commission {
  return {
    id: "commission-1",
    affiliate_id: "affiliate-1",
    commission_amount: 125.5,
    status: "Pendente",
    ...overrides
  };
}

describe("admin commission payment behavior 49.1-AS", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("faz o caminho feliz no client dedicado, COMMIT e release", async () => {
    let call = 0;
    const environment = createEnvironment({
      postgresActive: true,
      queryImplementation: async () => {
        call += 1;
        if (call === 2) return { rows: [pendingCommission()] };
        if (call === 4) return { rows: [], rowCount: 1 };
        return { rows: [] };
      }
    });

    const response = await invoke(environment.handler);

    expect(normalizedSql(environment.clientQuery)).toEqual([
      "BEGIN",
      "SELECT * FROM affiliate_commissions WHERE id = $1",
      "UPDATE affiliate_commissions SET status = 'Pago' WHERE id = $1",
      "UPDATE affiliates SET commission_paid = commission_paid + $1, commission_pending = commission_pending - $1 WHERE id = $2",
      "COMMIT"
    ]);
    expect(environment.clientQuery.mock.calls.map(([, params]) => params)).toEqual([
      undefined,
      ["commission-1"],
      ["commission-1"],
      [125.5, "affiliate-1"],
      undefined
    ]);
    expect(environment.connect).toHaveBeenCalledTimes(1);
    expect(environment.poolQuery).not.toHaveBeenCalled();
    expect(environment.release).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(200);
    expect(response.payload).toEqual(SUCCESS_PAYLOAD);
  });

  it("faz ROLLBACK e release para comissão inexistente", async () => {
    const environment = createEnvironment({ postgresActive: true });

    const response = await invoke(environment.handler, "missing");

    expect(normalizedSql(environment.clientQuery)).toEqual([
      "BEGIN",
      "SELECT * FROM affiliate_commissions WHERE id = $1",
      "ROLLBACK"
    ]);
    expect(environment.poolQuery).not.toHaveBeenCalled();
    expect(environment.release).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(404);
    expect(response.payload).toEqual({ error: "Comissão não encontrada." });
  });

  it("faz ROLLBACK e release para comissão já paga", async () => {
    let call = 0;
    const environment = createEnvironment({
      postgresActive: true,
      queryImplementation: async () => {
        call += 1;
        return call === 2
          ? { rows: [pendingCommission({ status: "Pago" })] }
          : { rows: [] };
      }
    });

    const response = await invoke(environment.handler);

    expect(normalizedSql(environment.clientQuery)).toEqual([
      "BEGIN",
      "SELECT * FROM affiliate_commissions WHERE id = $1",
      "ROLLBACK"
    ]);
    expect(environment.release).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(409);
    expect(response.payload).toEqual({ error: "Comissão já foi paga." });
  });

  it("faz ROLLBACK e release quando o afiliado não existe", async () => {
    let call = 0;
    const environment = createEnvironment({
      postgresActive: true,
      queryImplementation: async () => {
        call += 1;
        if (call === 2) {
          return { rows: [pendingCommission({ affiliate_id: "missing-affiliate" })] };
        }
        if (call === 4) return { rows: [], rowCount: 0 };
        return { rows: [] };
      }
    });

    const response = await invoke(environment.handler);

    expect(normalizedSql(environment.clientQuery)).toEqual([
      "BEGIN",
      "SELECT * FROM affiliate_commissions WHERE id = $1",
      "UPDATE affiliate_commissions SET status = 'Pago' WHERE id = $1",
      "UPDATE affiliates SET commission_paid = commission_paid + $1, commission_pending = commission_pending - $1 WHERE id = $2",
      "ROLLBACK"
    ]);
    expect(environment.release).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(404);
    expect(response.payload).toEqual({ error: "Afiliado não encontrado." });
  });

  it("faz ROLLBACK e release em erro inesperado após BEGIN", async () => {
    const expectedError = new Error("select failed");
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => undefined);
    let call = 0;
    const environment = createEnvironment({
      postgresActive: true,
      queryImplementation: async () => {
        call += 1;
        if (call === 2) throw expectedError;
        return { rows: [] };
      }
    });

    const response = await invoke(environment.handler);

    expect(normalizedSql(environment.clientQuery)).toEqual([
      "BEGIN",
      "SELECT * FROM affiliate_commissions WHERE id = $1",
      "ROLLBACK"
    ]);
    expect(environment.poolQuery).not.toHaveBeenCalled();
    expect(environment.release).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(500);
    expect(response.payload).toEqual(ERROR_PAYLOAD);
    expect(response.payload).not.toHaveProperty("details");
    expect(consoleError).toHaveBeenCalledWith("Erro quitar comissão:", expectedError);
  });

  it("não contém chamada de gateway ou API externa", () => {
    expect(readInlineRouteSource()).not.toMatch(
      /\b(?:Pix|boleto|cart[aã]o|Stripe|Mercado Pago|PayPal|PagSeguro|Pagar\.me|Cielo|Asaas|Iugu|OpenPix|Gerencianet|Efi|fetch|axios|http\.request|https\.request|Authorization|Bearer|apiKey|secretKey|webhook)\b/i
    );
  });

  it("mantém a baixa local válida e agenda persistência uma vez", async () => {
    const environment = createEnvironment({
      postgresActive: false,
      commissions: [pendingCommission({ commission_amount: 40 })],
      affiliates: [{
        id: "affiliate-1",
        commission_paid: 10,
        commission_pending: 25
      }]
    });

    const response = await invoke(environment.handler);

    expect(JSON.parse(environment.local.global.affiliate_commissions)[0].status).toBe("Pago");
    expect(JSON.parse(environment.local.global.affiliates)).toEqual([{
      id: "affiliate-1",
      commission_paid: 50,
      commission_pending: 0
    }]);
    expect(environment.scheduleSaveLocalFallback).toHaveBeenCalledTimes(1);
    expect(environment.connect).not.toHaveBeenCalled();
    expect(response.payload).toEqual(SUCCESS_PAYLOAD);
  });

  it.each([
    {
      name: "comissão inexistente",
      commissions: [] satisfies Commission[],
      affiliates: [] satisfies Affiliate[],
      status: 404,
      payload: { error: "Comissão não encontrada." }
    },
    {
      name: "comissão já paga",
      commissions: [pendingCommission({ status: "Pago" })],
      affiliates: [] satisfies Affiliate[],
      status: 409,
      payload: { error: "Comissão já foi paga." }
    },
    {
      name: "afiliado inexistente",
      commissions: [pendingCommission({ affiliate_id: "missing-affiliate" })],
      affiliates: [] satisfies Affiliate[],
      status: 404,
      payload: { error: "Afiliado não encontrado." }
    }
  ])("não retorna sucesso silencioso local para $name", async ({
    commissions,
    affiliates,
    status,
    payload
  }) => {
    const environment = createEnvironment({
      postgresActive: false,
      commissions,
      affiliates
    });
    const originalCommissions = environment.local.global.affiliate_commissions;

    const response = await invoke(environment.handler);

    expect(environment.local.global.affiliate_commissions).toBe(originalCommissions);
    expect(environment.scheduleSaveLocalFallback).not.toHaveBeenCalled();
    expect(response.statusCode).toBe(status);
    expect(response.payload).toEqual(payload);
  });
});
