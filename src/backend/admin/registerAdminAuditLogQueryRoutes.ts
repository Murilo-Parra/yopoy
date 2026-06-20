import type { Express, Request, RequestHandler, Response } from "express";

interface AdminAuditLogQueryPgResult {
  rows: Record<string, unknown>[];
}

interface AdminAuditLogQueryPgPool {
  query(queryText: string): Promise<AdminAuditLogQueryPgResult>;
}

interface AdminAuditLogQueryInMemoryDb {
  global: Record<string, string | undefined>;
}

export interface AdminAuditLogQueryRouteDependencies {
  requireMasterAdmin: RequestHandler;
  getIsPostgresActive: () => boolean;
  getPgPool: () => AdminAuditLogQueryPgPool | null;
  dbInMemoryLocal: AdminAuditLogQueryInMemoryDb;
}

export function registerAdminAuditLogQueryRoutes(
  app: Pick<Express, "get">,
  dependencies: AdminAuditLogQueryRouteDependencies
): void {
  app.get("/api/admin/audit-logs", dependencies.requireMasterAdmin, async (req: Request, res: Response): Promise<void> => {
    try {
      let audit_logs: Record<string, unknown>[] = [];
      let system_logs: Record<string, unknown>[] = [];
      const loadLocalFallback = (): void => {
        const rawAud = dependencies.dbInMemoryLocal.global["audit_logs"] || "[]";
        try { audit_logs = JSON.parse(rawAud); } catch (e) {}
        audit_logs = audit_logs.reverse().slice(0, 200);

        const rawSys = dependencies.dbInMemoryLocal.global["system_logs"] || "[]";
        try { system_logs = JSON.parse(rawSys); } catch (e) {}
        system_logs = system_logs.reverse().slice(0, 200);
      };

      if (dependencies.getIsPostgresActive()) {
        const pgPool = dependencies.getPgPool();

        if (pgPool) {
          const auds = await pgPool.query("SELECT * FROM audit_logs ORDER BY timestamp DESC LIMIT 200");
          audit_logs = auds.rows;

          const sys = await pgPool.query("SELECT * FROM system_logs ORDER BY created_at DESC LIMIT 200");
          system_logs = sys.rows;
        } else {
          loadLocalFallback();
        }
      } else {
        loadLocalFallback();
      }

      res.json({ audit_logs, system_logs });
    } catch (err) {
      console.error("Erro ao puxar logs de auditoria:", err);
      res.status(500).json({ error: "Erro interno ao obter logs." });
    }
  });
}
