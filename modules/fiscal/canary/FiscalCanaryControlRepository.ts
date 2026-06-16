import { FiscalCanaryControlRecord, FiscalCanaryControlFilters, FiscalCanaryControlPersistenceResult } from "./FiscalCanaryControlTypes";
import { pgPool } from "../../../infrastructure/database/pgPooler";

export class FiscalCanaryControlRepository {
  public async saveRecord(record: FiscalCanaryControlRecord): Promise<FiscalCanaryControlPersistenceResult> {
    try {
      if (!pgPool) {
        return { success: false, persisted: false, skippedReason: "Sem conexão com banco" };
      }

      await pgPool.query(`
        INSERT INTO canary_control_records 
          (id, company_id, user_id, action, route, operation, risk_level, status, mode, simulation_only, activation_blocked, reason, metadata, created_by, created_at)
        VALUES 
          ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      `, [
        record.id, record.companyId || null, record.userId || null, record.action, record.route, record.operation, record.riskLevel,
        record.status, record.mode, record.simulationOnly, record.activationBlocked, record.reason, record.metadata,
        record.createdBy || null, record.createdAt
      ]);

      return { success: true, persisted: true, recordId: record.id };
    } catch (e: any) {
      console.warn("FiscalCanaryControlRepository.saveRecord falhou (pode ser ausência da tabela em dev):", e.message);
      return { success: false, persisted: false, skippedReason: e.message };
    }
  }

  public async listRecords(filters: FiscalCanaryControlFilters): Promise<FiscalCanaryControlRecord[]> {
    if (!pgPool) return [];

    try {
      let query = "SELECT * FROM canary_control_records WHERE 1=1";
      const values: any[] = [];
      let i = 1;

      if (filters.companyId) {
        query += ` AND company_id = $${i}`;
        values.push(filters.companyId);
        i++;
      }
      if (filters.route) {
        query += ` AND route = $${i}`;
        values.push(filters.route);
        i++;
      }
      if (filters.operation) {
        query += ` AND operation = $${i}`;
        values.push(filters.operation);
        i++;
      }
      if (filters.status) {
        query += ` AND status = $${i}`;
        values.push(filters.status);
        i++;
      }
      if (filters.mode) {
        query += ` AND mode = $${i}`;
        values.push(filters.mode);
        i++;
      }

      query += " ORDER BY created_at DESC";

      if (filters.limit) {
        query += ` LIMIT $${i}`;
        values.push(filters.limit);
        i++;
      }

      if (filters.offset) {
        query += ` OFFSET $${i}`;
        values.push(filters.offset);
        i++;
      }

      const res = await pgPool.query(query, values);
      return res.rows.map(row => ({
        id: row.id,
        companyId: row.company_id,
        userId: row.user_id,
        action: row.action,
        route: row.route,
        operation: row.operation,
        riskLevel: row.risk_level,
        status: row.status,
        mode: row.mode,
        simulationOnly: row.simulation_only,
        activationBlocked: row.activation_blocked,
        reason: row.reason,
        metadata: row.metadata,
        createdBy: row.created_by,
        createdAt: row.created_at,
        expiresAt: row.expires_at,
        revokedAt: row.revoked_at
      }));
    } catch (e: any) {
      console.warn("FiscalCanaryControlRepository.listRecords falhou:", e.message);
      return [];
    }
  }
}
