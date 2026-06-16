import * as pgPooler from '../../../infrastructure/database/pgPooler';

export class FiscalSandboxIntegrityReadModel {
  
  public async getCountsByStatus(companyId: string): Promise<Record<string, number>> {
    const client = await pgPooler.pgPool!.connect();
    try {
      const query = `
        SELECT status, COUNT(*) as count
        FROM fiscal_v2_sandbox_snapshots
        WHERE company_id = $1 AND marker = 'fiscal-v2-sandbox-persistence'
        GROUP BY status
      `;
      const res = await client.query(query, [companyId]);
      const counts: Record<string, number> = {};
      res.rows.forEach(r => { counts[r.status] = parseInt(r.count, 10); });
      return counts;
    } finally {
      client.release();
    }
  }

  public async getCountsBySource(companyId: string): Promise<Record<string, number>> {
    const client = await pgPooler.pgPool!.connect();
    try {
      const query = `
        SELECT source, COUNT(*) as count
        FROM fiscal_v2_sandbox_snapshots
        WHERE company_id = $1 AND marker = 'fiscal-v2-sandbox-persistence'
        GROUP BY source
      `;
      const res = await client.query(query, [companyId]);
      const counts: Record<string, number> = {};
      res.rows.forEach(r => { counts[r.source] = parseInt(r.count, 10); });
      return counts;
    } finally {
      client.release();
    }
  }

  public async getCountsByRoute(companyId: string): Promise<Record<string, number>> {
    const client = await pgPooler.pgPool!.connect();
    try {
      const query = `
        SELECT route, COUNT(*) as count
        FROM fiscal_v2_sandbox_snapshots
        WHERE company_id = $1 AND marker = 'fiscal-v2-sandbox-persistence'
        GROUP BY route
      `;
      const res = await client.query(query, [companyId]);
      const counts: Record<string, number> = {};
      res.rows.forEach(r => { counts[r.route] = parseInt(r.count, 10); });
      return counts;
    } finally {
      client.release();
    }
  }

  public async getExpiredCandidates(companyId: string, ttlDays: number = 7): Promise<any[]> {
    const client = await pgPooler.pgPool!.connect();
    try {
      const query = `
        SELECT id, created_at, status, source, route
        FROM fiscal_v2_sandbox_snapshots
        WHERE company_id = $1 
          AND marker = 'fiscal-v2-sandbox-persistence'
          AND created_at < NOW() - INTERVAL '${ttlDays} days'
          AND status != 'RETAIN_FOR_ANALYSIS'
      `;
      const res = await client.query(query, [companyId]);
      return res.rows;
    } finally {
      client.release();
    }
  }

  public async getDuplicateCandidates(companyId: string): Promise<any[]> {
    const client = await pgPooler.pgPool!.connect();
    try {
      // Find snapshots with the exact same payload_hash
      const query = `
        SELECT payload_hash, COUNT(*) as copies, array_agg(id) as ids
        FROM fiscal_v2_sandbox_snapshots
        WHERE company_id = $1 AND marker = 'fiscal-v2-sandbox-persistence'
          AND payload_hash IS NOT NULL
        GROUP BY payload_hash
        HAVING COUNT(*) > 1
      `;
      const res = await client.query(query, [companyId]);
      return res.rows.map(row => ({
        payloadHash: row.payload_hash,
        copies: parseInt(row.copies, 10),
        ids: row.ids
      }));
    } finally {
      client.release();
    }
  }

  public async getIncompleteCandidates(companyId: string): Promise<any[]> {
    const client = await pgPooler.pgPool!.connect();
    try {
      const query = `
        SELECT id, safe_shape, status, source
        FROM fiscal_v2_sandbox_snapshots
        WHERE company_id = $1 
          AND marker = 'fiscal-v2-sandbox-persistence'
          AND (
            safe_shape IS NULL 
            OR safe_shape::text = '{}'
          )
      `;
      const res = await client.query(query, [companyId]);
      return res.rows;
    } finally {
      client.release();
    }
  }

  public async getTotalSnapshots(companyId: string): Promise<number> {
    const client = await pgPooler.pgPool!.connect();
    try {
      const query = `
        SELECT COUNT(*) as count
        FROM fiscal_v2_sandbox_snapshots
        WHERE company_id = $1 AND marker = 'fiscal-v2-sandbox-persistence'
      `;
      const res = await client.query(query, [companyId]);
      return parseInt(res.rows[0].count, 10);
    } finally {
      client.release();
    }
  }
}
