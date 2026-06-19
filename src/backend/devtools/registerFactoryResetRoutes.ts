import type { Express, Request, Response } from "express";
import fs from "fs";
import path from "path";
import type { Pool } from "pg";
import { canRunFactoryReset } from "../security/DangerousDevToolsGuard";
import type { DangerousDevToolRequest } from "../security/DangerousDevToolsGuard";

export interface FactoryResetRouteDependencies {
  isPostgresActive: boolean;
  pgPool: Pool | null | undefined;
  dbInMemoryLocal: {
    global: Record<string, unknown>;
    user_data: Record<string, unknown>;
  };
  scheduleSaveLocalFallback: () => void;
}

interface CountQueryRow {
  count: string | number;
}

export function registerFactoryResetRoutes(
  app: Pick<Express, "post">,
  dependencies: FactoryResetRouteDependencies
): void {
  const { isPostgresActive, pgPool, dbInMemoryLocal, scheduleSaveLocalFallback } = dependencies;

  app.post("/api/system/factory-reset", async (req: Request, res: Response) => {
    try {
      const guardRequest: DangerousDevToolRequest = {
        nodeEnv: process.env.NODE_ENV,
        enabledFlag: process.env.YOPOY_ENABLE_FACTORY_RESET,
        expectedToken: process.env.YOPOY_FACTORY_RESET_TOKEN,
        providedToken: typeof req.headers["x-yopoy-dev-reset-token"] === "string"
          ? req.headers["x-yopoy-dev-reset-token"]
          : undefined
      };

      if (!canRunFactoryReset(guardRequest)) {
        return res.status(403).json({ success: false, error: "FACTORY_RESET_FORBIDDEN" });
      }

      const adminHash = process.env.YOPOY_FACTORY_RESET_ADMIN_PASSWORD_HASH;
      if (!adminHash) {
        return res.status(403).json({ success: false, error: "FACTORY_RESET_MISSING_ADMIN_HASH" });
      }

      let tablesCleaned = 0;
      let recordsRemoved = 0;
      if (isPostgresActive && pgPool) {
        const client = await pgPool.connect();
        try {
          await client.query("BEGIN");
          const tablesToClean = [
            "sefaz_event_logs", "sefaz_event_queue", "fiscal_events", "danfe_documents",
            "nfe_documents", "nfce_documents", "sefaz_protocols", "signed_documents",
            "fiscal_documents", "certificates", "audit_logs", "tasks", "transactions",
            "employees", "products", "nfse_documents", "nfse_services", "nfse_settings",
            "nfse_issnet_logs", "nfse_webiss_logs", "nfse_betha_logs", "nfse_ipm_logs",
            "nfse_dsf_logs", "nfse_simpliss_logs", "users", "companies"
          ];
          for (const table of tablesToClean) {
            try {
              const countRes = await client.query<CountQueryRow>(`SELECT COUNT(*) as count FROM ${table}`);
              const count = parseInt(String(countRes.rows[0].count), 10);
              recordsRemoved += count;
              await client.query(`TRUNCATE TABLE ${table} CASCADE`);
              tablesCleaned++;
            } catch {
              // ignore table-specific cleanup failure
            }
          }

          // Insert master admin
          await client.query(`
          INSERT INTO companies (id, corporate_name, trade_name, cnpj, created_at)
          VALUES ('comp_admin_master', 'ELPARRAR ERP ADMINISTRADORA', 'ERP Master Console', '00.000.000/0001-99', NOW())
        `);
          await client.query(`
          INSERT INTO users (id, company_id, name, login, password_hash, is_admin, role, active, created_at)
          VALUES ('usr_master_admin', 'comp_admin_master', 'Master Administrator', 'admin@elparrar.com', $1, true, 'Proprietário', true, NOW())
        `, [adminHash]);
          await client.query("COMMIT");
        } catch (err) {
          await client.query("ROLLBACK");
          console.error(err);
        } finally {
          client.release();
        }
      } else {
        // In-memory / Fallback wipe
        dbInMemoryLocal.global = {};
        dbInMemoryLocal.user_data = {};
        scheduleSaveLocalFallback();
      }

      let filesRemoved = 0;
      const filesToDelete = ["RELATORIO_EVENTOS_SEFAZ.pdf", "RELATORIO_NFSE_INTEGRACAO.pdf", "XML_ENVIO.xml", "XML_RETORNO.xml", "persistent_db.json"];
      for (const f of filesToDelete) {
        if (fs.existsSync(path.join(process.cwd(), f))) {
          fs.unlinkSync(path.join(process.cwd(), f));
          filesRemoved++;
        }
      }

      return res.json({
        success: true,
        report: {
          tablesCleaned,
          recordsRemoved,
          filesRemoved,
          status: "O sistema está vazio aguardando novo Setup."
        }
      });

    } catch (err) {
      console.error("Factory reset failed:", err);
      return res.status(500).json({
        success: false,
        error: "FACTORY_RESET_FAILED"
      });
    }
  });
}
