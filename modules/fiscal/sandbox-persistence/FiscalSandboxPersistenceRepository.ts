import { randomUUID } from 'crypto';
import { PoolClient } from 'pg';
import * as pgPooler from '../../../infrastructure/database/pgPooler';
import { 
  FiscalSandboxSnapshotRecord, 
  FiscalSandboxSnapshotStatus,
  FiscalSandboxPersistenceResult,
  FiscalSandboxPersistenceReport
} from './FiscalSandboxPersistenceTypes';

export class FiscalSandboxPersistenceRepository {
  
  public async createSnapshot(record: Omit<FiscalSandboxSnapshotRecord, 'id' | 'createdAt'>): Promise<FiscalSandboxPersistenceResult> {
    const id = randomUUID();
    const createdAt = new Date().toISOString();
    const client = await pgPooler.pgPool!.connect();
    
    try {
      const query = `
        INSERT INTO fiscal_v2_sandbox_snapshots (
          id, company_id, user_id, source, route, operation, status,
          safe_shape, metadata, marker, reviewed_at, created_at, expires_at,
          sandbox_only, production_write, simulation_only, activation_blocked,
          payload_included, sensitive_data_included
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19
        ) RETURNING id
      `;

      const values = [
        id,
        record.companyId,
        record.userId || null,
        record.source,
        record.route,
        record.operation,
        record.status,
        JSON.stringify(record.safeShape || {}),
        JSON.stringify(record.metadata || {}),
        'fiscal-v2-sandbox-persistence',
        record.reviewedAt || null,
        createdAt,
        record.expiresAt || null,
        true, // sandbox_only
        false, // production_write
        true, // simulation_only
        true, // activation_blocked
        false, // payload_included
        false  // sensitive_data_included
      ];

      await client.query(query, values);

      return {
        persisted: true,
        recordId: id,
        status: record.status,
        sandboxOnly: true,
        productionWrite: false,
        simulationOnly: true,
        activationBlocked: true,
        payloadIncluded: false,
        sensitiveDataIncluded: false
      };
    } catch (err: any) {
      console.error('[FiscalSandboxPersistenceRepository] Error creating snapshot:', err);
      throw err;
    } finally {
      client.release();
    }
  }

  public async listSnapshots(companyId: string, filters: { status?: string, source?: string } = {}): Promise<FiscalSandboxSnapshotRecord[]> {
    const client = await pgPooler.pgPool!.connect();
    try {
      let query = `SELECT * FROM fiscal_v2_sandbox_snapshots WHERE company_id = $1 AND marker = 'fiscal-v2-sandbox-persistence'`;
      const values: any[] = [companyId];
      
      if (filters.status) {
        values.push(filters.status);
        query += ` AND status = $${values.length}`;
      }
      
      if (filters.source) {
        values.push(filters.source);
        query += ` AND source = $${values.length}`;
      }
      
      query += ` ORDER BY created_at DESC LIMIT 100`;

      const res = await client.query(query, values);
      return res.rows.map(this.mapRowToRecord);
    } finally {
      client.release();
    }
  }

  public async findById(companyId: string, id: string): Promise<FiscalSandboxSnapshotRecord | null> {
    const client = await pgPooler.pgPool!.connect();
    try {
      const query = `SELECT * FROM fiscal_v2_sandbox_snapshots WHERE company_id = $1 AND id = $2 AND marker = 'fiscal-v2-sandbox-persistence'`;
      const res = await client.query(query, [companyId, id]);
      if (res.rows.length === 0) return null;
      return this.mapRowToRecord(res.rows[0]);
    } finally {
      client.release();
    }
  }

  public async updateStatus(companyId: string, id: string, status: string, userId?: string): Promise<boolean> {
    const client = await pgPooler.pgPool!.connect();
    try {
      const now = new Date().toISOString();
      const query = `
        UPDATE fiscal_v2_sandbox_snapshots 
        SET status = $1, reviewed_at = $2, user_id = COALESCE($3, user_id)
        WHERE company_id = $4 AND id = $5 AND marker = 'fiscal-v2-sandbox-persistence'
      `;
      const res = await client.query(query, [status, now, userId || null, companyId, id]);
      return res.rowCount !== null && res.rowCount > 0;
    } finally {
      client.release();
    }
  }

  public async markReviewed(companyId: string, id: string, userId?: string): Promise<boolean> {
    const client = await pgPooler.pgPool!.connect();
    try {
      const now = new Date().toISOString();
      const query = `
        UPDATE fiscal_v2_sandbox_snapshots 
        SET status = $1, reviewed_at = $2, user_id = COALESCE($3, user_id)
        WHERE company_id = $4 AND id = $5 AND marker = 'fiscal-v2-sandbox-persistence'
      `;
      const res = await client.query(query, [FiscalSandboxSnapshotStatus.REVIEWED, now, userId || null, companyId, id]);
      return res.rowCount !== null && res.rowCount > 0;
    } finally {
      client.release();
    }
  }

  public async cleanup(companyId: string, filters: { olderThanDays?: number, status?: string } = {}): Promise<number> {
    const client = await pgPooler.pgPool!.connect();
    try {
      let query = `DELETE FROM fiscal_v2_sandbox_snapshots WHERE company_id = $1 AND marker = 'fiscal-v2-sandbox-persistence'`;
      const values: any[] = [companyId];
      
      if (filters.olderThanDays) {
        values.push(filters.olderThanDays);
        query += ` AND created_at < NOW() - INTERVAL '${values.length} days'`;
      }
      
      if (filters.status) {
        values.push(filters.status);
        query += ` AND status = $${values.length}`;
      }

      const res = await client.query(query, values);
      return res.rowCount || 0;
    } finally {
      client.release();
    }
  }

  public async getReport(companyId: string): Promise<any> {
    const client = await pgPooler.pgPool!.connect();
    try {
      // Basic counts
      const totalsQuery = `
        SELECT status, COUNT(*) as count 
        FROM fiscal_v2_sandbox_snapshots 
        WHERE company_id = $1 AND marker = 'fiscal-v2-sandbox-persistence'
        GROUP BY status
      `;
      const totalsRes = await client.query(totalsQuery, [companyId]);
      
      const sourceQuery = `
        SELECT source, status, COUNT(*) as count 
        FROM fiscal_v2_sandbox_snapshots 
        WHERE company_id = $1 AND marker = 'fiscal-v2-sandbox-persistence'
        GROUP BY source, status
      `;
      const sourceRes = await client.query(sourceQuery, [companyId]);

      return { totals: totalsRes.rows, sources: sourceRes.rows };
    } finally {
      client.release();
    }
  }

  private mapRowToRecord(row: any): FiscalSandboxSnapshotRecord {
    return {
      id: row.id,
      companyId: row.company_id,
      userId: row.user_id,
      source: row.source,
      route: row.route,
      operation: row.operation,
      status: row.status,
      safeShape: row.safe_shape,
      metadata: row.metadata,
      marker: row.marker,
      reviewedAt: row.reviewed_at ? new Date(row.reviewed_at).toISOString() : undefined,
      createdAt: new Date(row.created_at).toISOString(),
      expiresAt: row.expires_at ? new Date(row.expires_at).toISOString() : undefined,
      sandboxOnly: row.sandbox_only,
      productionWrite: row.production_write,
      simulationOnly: row.simulation_only,
      activationBlocked: row.activation_blocked,
      payloadIncluded: row.payload_included,
      sensitiveDataIncluded: row.sensitive_data_included
    };
  }
}
