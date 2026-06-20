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

type RouteRequest = {
  params: { id: string };
};

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

type Query = (
  sql: string,
  params?: readonly unknown[]
) => Promise<QueryResult>;

type RouteEnvironment = {
  handler: RouteHandler;
  query: ReturnType<typeof vi.fn<Query>>;
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
  const query = vi.fn<Query>(options.queryImplementation ?? defaultQuery);
  const pgPool = { query };
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
    query,
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

describe("admin commission payment current behavior 49.1-AR", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("congela o caminho PostgreSQL feliz e sua ordem financeira atual", async () => {
    const commission: Commission = {
      id: "commission-1",
      affiliate_id: "affiliate-1",
      commission_amount: 125.5,
      status: "Pendente"
    };
    let call = 0;
    const environment = createEnvironment({
      postgresActive: true,
      queryImplementation: async () => {
        call += 1;
        return call === 2 ? { rows: [commission] } : { rows: [] };
      }
    });

    const response = await invoke(environment.handler);

    expect(normalizedSql(environment.query)).toEqual([
      "BEGIN",
      "SELECT * FROM affiliate_commissions WHERE id = $1",
      "UPDATE affiliate_commissions SET status = 'Pago' WHERE id = $1",
      "UPDATE affiliates SET commission_paid = commission_paid + $1, commission_pending = commission_pending - $1 WHERE id = $2",
      "COMMIT"
    ]);
    expect(environment.query.mock.calls.map(([, params]) => params)).toEqual([
      undefined,
      ["commission-1"],
      ["commission-1"],
      [125.5, "affiliate-1"],
      undefined
    ]);
    expect(response.statusCode).toBe(200);
    expect(response.payload).toEqual(SUCCESS_PAYLOAD);
  });

  it("congela sucesso silencioso PostgreSQL para comissão inexistente", async () => {
    const environment = createEnvironment({ postgresActive: true });

    const response = await invoke(environment.handler, "missing");

    expect(normalizedSql(environment.query)).toEqual([
      "BEGIN",
      "SELECT * FROM affiliate_commissions WHERE id = $1",
      "COMMIT"
    ]);
    expect(environment.query.mock.calls[1][1]).toEqual(["missing"]);
    expect(response.payload).toEqual(SUCCESS_PAYLOAD);
  });

  it("congela sucesso silencioso PostgreSQL para comissão já paga", async () => {
    let call = 0;
    const environment = createEnvironment({
      postgresActive: true,
      queryImplementation: async () => {
        call += 1;
        return call === 2
          ? {
              rows: [{
                id: "commission-1",
                affiliate_id: "affiliate-1",
                commission_amount: 50,
                status: "Pago"
              }]
            }
          : { rows: [] };
      }
    });

    const response = await invoke(environment.handler);

    expect(normalizedSql(environment.query)).toEqual([
      "BEGIN",
      "SELECT * FROM affiliate_commissions WHERE id = $1",
      "COMMIT"
    ]);
    expect(response.payload).toEqual(SUCCESS_PAYLOAD);
  });

  it("congela erro 500 sem ROLLBACK após falha no meio da suposta transação", async () => {
    const expectedError = new Error("affiliate update failed");
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => undefined);
    let call = 0;
    const environment = createEnvironment({
      postgresActive: true,
      queryImplementation: async () => {
        call += 1;
        if (call === 2) {
          return {
            rows: [{
              id: "commission-1",
              affiliate_id: "affiliate-1",
              commission_amount: 80,
              status: "Pendente"
            }]
          };
        }
        if (call === 4) {
          throw expectedError;
        }
        return { rows: [] };
      }
    });

    const response = await invoke(environment.handler);

    expect(normalizedSql(environment.query)).toEqual([
      "BEGIN",
      "SELECT * FROM affiliate_commissions WHERE id = $1",
      "UPDATE affiliate_commissions SET status = 'Pago' WHERE id = $1",
      "UPDATE affiliates SET commission_paid = commission_paid + $1, commission_pending = commission_pending - $1 WHERE id = $2"
    ]);
    expect(normalizedSql(environment.query)).not.toContain("ROLLBACK");
    expect(response.statusCode).toBe(500);
    expect(response.payload).toEqual(ERROR_PAYLOAD);
    expect(consoleError).toHaveBeenCalledWith("Erro quitar comissão:", expectedError);
  });

  it("congela sucesso PostgreSQL sem verificar rowCount do afiliado", async () => {
    let call = 0;
    const environment = createEnvironment({
      postgresActive: true,
      queryImplementation: async () => {
        call += 1;
        if (call === 2) {
          return {
            rows: [{
              id: "commission-1",
              affiliate_id: "missing-affiliate",
              commission_amount: 30,
              status: "Pendente"
            }]
          };
        }
        return call === 4 ? { rows: [], rowCount: 0 } : { rows: [] };
      }
    });

    const response = await invoke(environment.handler);

    expect(normalizedSql(environment.query).at(-1)).toBe("COMMIT");
    expect(environment.query.mock.calls[3][1]).toEqual([30, "missing-affiliate"]);
    expect(response.payload).toEqual(SUCCESS_PAYLOAD);
  });

  it("congela pagamento local pendente e agenda persistência uma vez", async () => {
    const environment = createEnvironment({
      postgresActive: false,
      commissions: [{
        id: "commission-1",
        affiliate_id: "affiliate-1",
        commission_amount: 40,
        status: "Pendente"
      }],
      affiliates: [{
        id: "affiliate-1",
        commission_paid: 10,
        commission_pending: 25
      }]
    });

    const response = await invoke(environment.handler);

    expect(JSON.parse(environment.local.global.affiliate_commissions)).toEqual([{
      id: "commission-1",
      affiliate_id: "affiliate-1",
      commission_amount: 40,
      status: "Pago"
    }]);
    expect(JSON.parse(environment.local.global.affiliates)).toEqual([{
      id: "affiliate-1",
      commission_paid: 50,
      commission_pending: 0
    }]);
    expect(environment.scheduleSaveLocalFallback).toHaveBeenCalledTimes(1);
    expect(environment.query).not.toHaveBeenCalled();
    expect(response.payload).toEqual(SUCCESS_PAYLOAD);
  });

  it.each([
    {
      name: "inexistente",
      commissions: [] satisfies Commission[]
    },
    {
      name: "já paga",
      commissions: [{
        id: "commission-1",
        affiliate_id: "affiliate-1",
        commission_amount: 40,
        status: "Pago"
      }] satisfies Commission[]
    }
  ])("congela sucesso local para comissão $name sem agendar persistência", async ({ commissions }) => {
    const environment = createEnvironment({
      postgresActive: false,
      commissions,
      affiliates: []
    });
    const originalCommissions = environment.local.global.affiliate_commissions;

    const response = await invoke(environment.handler);

    expect(environment.local.global.affiliate_commissions).toBe(originalCommissions);
    expect(environment.scheduleSaveLocalFallback).not.toHaveBeenCalled();
    expect(response.payload).toEqual(SUCCESS_PAYLOAD);
  });

  it("congela baixa local mesmo sem afiliado e ainda agenda persistência", async () => {
    const environment = createEnvironment({
      postgresActive: false,
      commissions: [{
        id: "commission-1",
        affiliate_id: "missing-affiliate",
        commission_amount: 70,
        status: "Pendente"
      }],
      affiliates: []
    });

    const response = await invoke(environment.handler);

    expect(JSON.parse(environment.local.global.affiliate_commissions)[0].status).toBe("Pago");
    expect(JSON.parse(environment.local.global.affiliates)).toEqual([]);
    expect(environment.scheduleSaveLocalFallback).toHaveBeenCalledTimes(1);
    expect(response.payload).toEqual(SUCCESS_PAYLOAD);
  });
});
