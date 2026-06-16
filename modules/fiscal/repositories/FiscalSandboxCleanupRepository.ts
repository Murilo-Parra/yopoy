import { pgPool, isPostgresActive } from "../../../infrastructure/database";
import { FiscalSandboxCleanupResult } from "../types/fiscalSandbox.types";

export class FiscalSandboxCleanupRepository {
  async cleanupBySandboxSource(companyId: string, source: string): Promise<FiscalSandboxCleanupResult> {
    if (!isPostgresActive || !pgPool) {
      throw new Error("PostgreSQL not active");
    }
    
    if (source !== "fiscal-v2-sandbox") {
      throw new Error("Invalid sandbox source for cleanup");
    }

    let deletedCount = 0;
    const deletedIds: string[] = [];

    // Delete isolated sandbox records using safe patterns and proper sandbox markers
    
    // 1. sefaz_protocols (status_message = 'fiscal-v2-sandbox')
    const sefazRes = await pgPool.query(
      `DELETE FROM sefaz_protocols WHERE company_id = $1 AND status_message = $2 RETURNING id`,
      [companyId, source]
    );
    deletedCount += sefazRes.rowCount || 0;
    deletedIds.push(...sefazRes.rows.map(r => r.id));

    // 2. danfe_documents (pdf_path = 'sandbox-fiscal-v2')
    const danfeRes = await pgPool.query(
      `DELETE FROM danfe_documents WHERE company_id = $1 AND pdf_path = $2 RETURNING id`,
      [companyId, "sandbox-fiscal-v2"]
    );
    deletedCount += danfeRes.rowCount || 0;
    deletedIds.push(...danfeRes.rows.map(r => r.id));

    // 3. nfce_documents (payment_method = 'fiscal-v2-sandbox')
    const nfceRes = await pgPool.query(
      `DELETE FROM nfce_documents WHERE company_id = $1 AND payment_method = $2 RETURNING id`,
      [companyId, source]
    );
    deletedCount += nfceRes.rowCount || 0;
    deletedIds.push(...nfceRes.rows.map(r => r.id));

    // 4. nfe_documents (customer_id = 'fiscal-v2-sandbox')
    const nfeRes = await pgPool.query(
      `DELETE FROM nfe_documents WHERE company_id = $1 AND customer_id = $2 RETURNING id`,
      [companyId, source]
    );
    deletedCount += nfeRes.rowCount || 0;
    deletedIds.push(...nfeRes.rows.map(r => r.id));

    // 5. fiscal_documents (created_by = 'fiscal-v2-sandbox')
    const fiscalRes = await pgPool.query(
      `DELETE FROM fiscal_documents WHERE company_id = $1 AND created_by = $2 RETURNING id`,
      [companyId, source]
    );
    deletedCount += fiscalRes.rowCount || 0;
    deletedIds.push(...fiscalRes.rows.map(r => r.id));

    return {
      success: true,
      deletedCount,
      deletedIds
    };
  }

  async cleanupByCreatedIds(companyId: string, createdIds: string[]): Promise<FiscalSandboxCleanupResult> {
    if (!isPostgresActive || !pgPool) {
      throw new Error("PostgreSQL not active");
    }

    if (!createdIds || createdIds.length === 0) {
      return { success: true, deletedCount: 0, deletedIds: [] };
    }

    let deletedCount = 0;
    const deletedIdsResult: string[] = [];
    const source = "fiscal-v2-sandbox";

    for (const id of createdIds) {
      // Loop is fine since it's just for sandbox usage
      // Try to delete from each table safely matching ID, company_id and source mark

      const sefazRes = await pgPool.query(`DELETE FROM sefaz_protocols WHERE id = $1 AND company_id = $2 AND status_message = $3 RETURNING id`, [id, companyId, source]);
      if (sefazRes.rowCount) { deletedCount++; deletedIdsResult.push(id); continue; }

      const danfeRes = await pgPool.query(`DELETE FROM danfe_documents WHERE id = $1 AND company_id = $2 AND pdf_path = $3 RETURNING id`, [id, companyId, "sandbox-fiscal-v2"]);
      if (danfeRes.rowCount) { deletedCount++; deletedIdsResult.push(id); continue; }

      const nfceRes = await pgPool.query(`DELETE FROM nfce_documents WHERE id = $1 AND company_id = $2 AND payment_method = $3 RETURNING id`, [id, companyId, source]);
      if (nfceRes.rowCount) { deletedCount++; deletedIdsResult.push(id); continue; }

      const nfeRes = await pgPool.query(`DELETE FROM nfe_documents WHERE id = $1 AND company_id = $2 AND customer_id = $3 RETURNING id`, [id, companyId, source]);
      if (nfeRes.rowCount) { deletedCount++; deletedIdsResult.push(id); continue; }

      const fiscalRes = await pgPool.query(`DELETE FROM fiscal_documents WHERE id = $1 AND company_id = $2 AND created_by = $3 RETURNING id`, [id, companyId, source]);
      if (fiscalRes.rowCount) { deletedCount++; deletedIdsResult.push(id); continue; }
    }

    return {
      success: true,
      deletedCount,
      deletedIds: deletedIdsResult
    };
  }
}
