import type { Express, Request, Response } from "express";
import type { Pool } from "pg";

interface CompanyAuditSession {
  company_id: string;
}

interface CompanyAuditLog {
  company_id: string;
  created_at: string;
  [key: string]: unknown;
}

interface CompanyAuditLogRow {
  [key: string]: unknown;
}

export interface CompanyAuditLogRouteDependencies {
  readonly isPostgresActive: boolean;
  readonly pgPool: Pool | null | undefined;
  dbInMemoryLocal: {
    global: Record<string, string | undefined>;
  };
  getSessionFromRequest: (req: Request) => Promise<CompanyAuditSession | null>;
}

export function registerCompanyAuditLogRoutes(
  app: Pick<Express, "get">,
  dependencies: CompanyAuditLogRouteDependencies
): void {
  app.get("/api/auth/company-audit-logs", async (req: Request, res: Response): Promise<void> => {
    try {
      const session = await dependencies.getSessionFromRequest(req);
      if (!session) {
        res.status(401).json({ error: "Sessão expirada ou Token inválido." });
        return;
      }

      if (dependencies.isPostgresActive && dependencies.pgPool) {
        const q = `
        SELECT a.*, COALESCE(u.name, 'Ação do Sistema') as user_name 
        FROM audit_logs a
        LEFT JOIN users u ON a.user_id = u.id
        WHERE a.company_id = $1 
        ORDER BY a.created_at DESC 
        LIMIT 50
      `;
        const result = await dependencies.pgPool.query<CompanyAuditLogRow>(q, [session.company_id]);
        res.json({ success: true, logs: result.rows });
      } else {
        const logsRaw = dependencies.dbInMemoryLocal.global['audit_logs'] || '[]';
        try {
          const logs = JSON.parse(logsRaw) as CompanyAuditLog[];
          const filtered = logs
            .filter((l: CompanyAuditLog) => l.company_id === session.company_id)
            .sort((a: CompanyAuditLog, b: CompanyAuditLog) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
            .slice(0, 50);
          res.json({ success: true, logs: filtered });
        } catch {
          res.json({ success: true, logs: [] });
        }
      }
    } catch (err: unknown) {
      console.error("Erro ao carregar auditoria da empresa:", err);
      res.status(500).json({ error: "Falha ao obter logs de auditoria." });
    }
  });
}
