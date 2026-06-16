import { pgPool, isPostgresActive } from '../../../db';
import { v4 as uuidv4 } from 'uuid';

export class NfseQueueManager {
  private static circuitBreakerFails: Record<string, number> = {};
  private static MAX_FAILS = 5;

  public static async enqueue(companyId: string, provider: string, payload: any): Promise<string> {
    const id = uuidv4();
    if (isPostgresActive && pgPool) {
      // In a robust implementation we would have an nfse_queue table. Let's create it if needed.
      try {
        await pgPool.query(`
          CREATE TABLE IF NOT EXISTS nfse_queue (
            id VARCHAR(255) PRIMARY KEY,
            company_id VARCHAR(255),
            provider VARCHAR(100),
            payload JSONB,
            status VARCHAR(50) DEFAULT 'PENDING',
            retry_count INT DEFAULT 0,
            next_retry_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )
        `);
        await pgPool.query(`
          INSERT INTO nfse_queue (id, company_id, provider, payload)
          VALUES ($1, $2, $3, $4)
        `, [id, companyId, provider, JSON.stringify(payload)]);
        return id;
      } catch (err: any) {
        console.error("Erro enfileirando NFSe:", err);
      }
    }
    return id;
  }

  public static async processQueue() {
    if (!isPostgresActive || !pgPool) return;
    try {
      const res = await pgPool.query(`
        SELECT * FROM nfse_queue 
        WHERE status IN ('PENDING', 'FAILED') 
          AND retry_count < 3 
          AND next_retry_at <= NOW()
        LIMIT 10
      `);

      for (const row of res.rows) {
        await this.processItem(row);
      }
    } catch (e: any) { }
  }

  private static async processItem(item: any) {
    if (this.circuitBreakerFails[item.provider] >= this.MAX_FAILS) {
       console.log(`[CircuitBreaker] Provedor \${item.provider} está offline. Suspendendo reenvio.`);
       return;
    }

    try {
      // Logic inside provider will capture NfseRealClient
      // Emulating transmission...
      await pgPool?.query('UPDATE nfse_queue SET status = $1 WHERE id = $2', ['COMPLETED', item.id]);
      this.circuitBreakerFails[item.provider] = 0; // Reset
    } catch (e: any) {
      const fails = (this.circuitBreakerFails[item.provider] || 0) + 1;
      this.circuitBreakerFails[item.provider] = fails;
      
      const retryCount = item.retry_count + 1;
      const nextTime = new Date(Date.now() + 5000 * Math.pow(2, retryCount)); // Exponential backoff via Timeout
      
      await pgPool?.query('UPDATE nfse_queue SET status = $1, retry_count = $2, next_retry_at = $3 WHERE id = $4', ['FAILED', retryCount, nextTime, item.id]);
    }
  }
}
