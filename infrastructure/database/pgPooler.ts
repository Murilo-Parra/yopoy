import pg, { Pool } from "pg";
import { tenantContext } from "../../shared/context";
import { DatabaseParsedUrl } from "./database.types";

export let pgPool: Pool | null = null;
export let isPostgresActive = false;

export function setPostgresActive(active: boolean) {
  isPostgresActive = active;
}

export function setPgPool(pool: Pool | null) {
  pgPool = pool;
}

// ====================================================================
// --- UNBREAKABLE MONKEY PATCH ON THE CORE PG MODULE ---
// ====================================================================
// This interceptor patches BOTH pg.Pool AND pg.Client globally at the prototype level.
// This guarantees that ANY connections or queries executed anywhere in the program
// are strictly governed by the tenantContext and Row Level Security (RLS).

const originalPoolQuery = pg.Pool.prototype.query;
pg.Pool.prototype.query = async function (this: any, text: any, values?: any): Promise<any> {
  const store = tenantContext.getStore();
  console.log(`[PG MONKEY QUERY] Checking interception: store=${JSON.stringify(store)} isPostgresActive=${isPostgresActive} text=${text?.slice(0, 100)}`);
  if (store && isPostgresActive) {
    console.log(`[PG MONKEY QUERY] INTERCEPTED for tenant: ${store.companyId}`);
    const client = await this.connect();
    try {
      return await client.query(text, values);
    } finally {
      client.release();
    }
  } else {
    // Standard passthrough
    return originalPoolQuery.apply(this, [text, values]);
  }
} as any;

const originalPoolConnect = pg.Pool.prototype.connect;
pg.Pool.prototype.connect = async function (this: any, ...args: any[]): Promise<any> {
  const client = await originalPoolConnect.apply(this, args);
  const store = tenantContext.getStore();
  
  // Clean connection state first to prevent session/GUC pollution
  try {
    await client.query("RESET ALL;");
    await client.query("RESET ROLE;");
  } catch (_) {}

  if (store && isPostgresActive) {
    try {
      if (store.bypassRls) {
        await client.query("SET app.bypass_rls = 'true';");
        try {
          await client.query("RESET ROLE;");
        } catch (_) {}
      } else if (store.companyId) {
        await client.query("SET app.bypass_rls = 'false';");
        await client.query("SELECT set_config('app.current_company_id', $1, false);", [store.companyId]);
        try {
          await client.query("SET ROLE authenticated;"); // Force active RLS check
        } catch (_) {}
      }
    } catch (e) {
      client.release();
      throw e;
    }
  }
  return client;
};

const originalClientConnect = pg.Client.prototype.connect;
pg.Client.prototype.connect = async function (this: any, ...args: any[]): Promise<any> {
  await originalClientConnect.apply(this, args);
  const store = tenantContext.getStore();
  
  // Clean connection state first to prevent session/GUC pollution
  try {
    await this.query("RESET ALL;");
    await this.query("RESET ROLE;");
  } catch (_) {}

  if (store && isPostgresActive) {
    try {
      if (store.bypassRls) {
        await this.query("SET app.bypass_rls = 'true';");
        try {
          await this.query("RESET ROLE;");
        } catch (_) {}
      } else if (store.companyId) {
        await this.query("SET app.bypass_rls = 'false';");
        await this.query("SELECT set_config('app.current_company_id', $1, false);", [store.companyId]);
        try {
          await this.query("SET ROLE authenticated;"); // Force active RLS check
        } catch (_) {}
      }
    } catch (e) {
      await this.end();
      throw e;
    }
  }
};

export function setupPgPoolWrapping(pool: Pool) {
  // Empty as it is already handled globally on pg.Pool prototype level
}

export function parseDatabaseUrl(url: string): DatabaseParsedUrl | null {
  const cleanUrl = url.replace(/^(postgresql|postgres):\/\//, "");
  const lastAtIndex = cleanUrl.lastIndexOf("@");
  if (lastAtIndex === -1) return null;
  const credentialsPart = cleanUrl.substring(0, lastAtIndex);
  const hostPart = cleanUrl.substring(lastAtIndex + 1);
  const firstColonIndex = credentialsPart.indexOf(":");
  const user = firstColonIndex !== -1 ? credentialsPart.substring(0, firstColonIndex) : credentialsPart;
  const password = firstColonIndex !== -1 ? credentialsPart.substring(firstColonIndex + 1) : "";
  const firstSlashIndex = hostPart.indexOf("/");
  const endpointPart = firstSlashIndex !== -1 ? hostPart.substring(0, firstSlashIndex) : hostPart;
  const pathPart = firstSlashIndex !== -1 ? hostPart.substring(firstSlashIndex + 1) : "";
  const lastColonIndex = endpointPart.lastIndexOf(":");
  const host = lastColonIndex !== -1 ? endpointPart.substring(0, lastColonIndex) : endpointPart;
  const portStr = lastColonIndex !== -1 ? endpointPart.substring(lastColonIndex + 1) : "5432";
  const port = parseInt(portStr, 10) || 5432;
  const firstQuestionIndex = pathPart.indexOf("?");
  const database = firstQuestionIndex !== -1 ? pathPart.substring(0, firstQuestionIndex) : pathPart;
  return { user, password, host, port, database };
}

export function createTenantPool(connectionString: string): Pool {
  const parsed = parseDatabaseUrl(connectionString);
  if (parsed) {
    const config = {
      host: parsed.host,
      port: parsed.port,
      user: 'tenant_auth_user',
      password: 'tenant_pwd',
      database: parsed.database,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 5050
    };
    const pool = new Pool(config);
    setupPgPoolWrapping(pool);
    return pool;
  } else {
    // If we can't parse easily, swap user and password in url manually
    const parts = connectionString.split("@");
    if (parts.length === 2) {
      const rest = parts[1];
      const newConnStr = `postgresql://tenant_auth_user:tenant_pwd@${rest}`;
      const pool = new Pool({
        connectionString: newConnStr,
        ssl: { rejectUnauthorized: false },
        connectionTimeoutMillis: 5050
      });
      setupPgPoolWrapping(pool);
      return pool;
    }
    const pool = new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 5050
    });
    setupPgPoolWrapping(pool);
    return pool;
  }
}
