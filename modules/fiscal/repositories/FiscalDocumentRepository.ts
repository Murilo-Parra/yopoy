import { IFiscalDocumentRepository } from "../contracts/IFiscalDocumentRepository";
import { FiscalDocumentDTO, FiscalDocumentCreateRequestDTO, FiscalDocumentUpdateRequestDTO } from "../dto/fiscalDocument.dto";
import { FiscalDocumentType, FiscalDocumentStatus } from "../types/fiscal.types";
import { pgPool, isPostgresActive } from "../../../infrastructure/database";
import { PoolClient } from "pg";

function mapRowToFiscalDocumentDTO(row: any): FiscalDocumentDTO {
  return {
    id: row.id,
    companyId: row.company_id,
    documentType: row.document_type as FiscalDocumentType,
    documentNumber: row.document_number,
    documentSeries: row.document_series,
    status: row.status as FiscalDocumentStatus,
    version: row.version ?? 1,
    xmlContent: row.xml_content,
    createdBy: row.created_by,
    createdAt: row.created_at instanceof Date ? row.created_at.toISOString() : String(row.created_at),
    updatedAt: row.updated_at instanceof Date ? row.updated_at.toISOString() : String(row.updated_at),
  };
}

function getInMemoryList(domainName: string): any[] {
  const globalObj = (global as any);
  if (!globalObj.dbInMemoryLocal || !globalObj.dbInMemoryLocal.global) {
    return [];
  }
  const raw = globalObj.dbInMemoryLocal.global[domainName] || '[]';
  try {
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

export class FiscalDocumentRepository implements IFiscalDocumentRepository {
  async listByCompany(
    companyId: string,
    filters?: { limit?: number; offset?: number; documentType?: string }
  ): Promise<{ documents: FiscalDocumentDTO[]; total: number }> {
    if (!companyId) {
      throw new Error("companyId is required");
    }

    if (isPostgresActive && pgPool) {
      try {
        let queryStr = `SELECT * FROM fiscal_documents WHERE company_id = $1`;
        const params: any[] = [companyId];
        let pIdx = 2;

        if (filters?.documentType) {
          queryStr += ` AND document_type = $${pIdx++}`;
          params.push(filters.documentType);
        }

        const totalQuery = `SELECT COUNT(*) FROM (${queryStr}) as total`;
        const totalRes = await pgPool.query(totalQuery, params);
        const total = parseInt(totalRes.rows[0].count, 10);

        queryStr += ` ORDER BY created_at DESC LIMIT $${pIdx++} OFFSET $${pIdx++}`;
        const limit = filters?.limit ?? 10;
        const offset = filters?.offset ?? 0;
        params.push(limit, offset);

        const res = await pgPool.query(queryStr, params);
        return {
          documents: res.rows.map(mapRowToFiscalDocumentDTO),
          total,
        };
      } catch (err) {
        console.error("Error listing fiscal documents in Postgres:", err);
        return { documents: [], total: 0 };
      }
    } else {
      const list = getInMemoryList('fiscal_documents').filter((d: any) => d.company_id === companyId);
      let filtered = list;

      if (filters?.documentType) {
        filtered = list.filter((d: any) => d.document_type === filters.documentType);
      }

      const sorted = filtered.sort(
        (a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      const limit = filters?.limit ?? 10;
      const offset = filters?.offset ?? 0;
      const paginated = sorted.slice(offset, offset + limit);

      return {
        documents: paginated.map(mapRowToFiscalDocumentDTO),
        total: filtered.length,
      };
    }
  }

  async findById(companyId: string, id: string): Promise<FiscalDocumentDTO | null> {
    if (!companyId) {
      throw new Error("companyId is required");
    }
    if (!id) {
      throw new Error("id is required");
    }

    if (isPostgresActive && pgPool) {
      try {
        const res = await pgPool.query(
          `SELECT * FROM fiscal_documents WHERE company_id = $1 AND id = $2`,
          [companyId, id]
        );
        return res.rows[0] ? mapRowToFiscalDocumentDTO(res.rows[0]) : null;
      } catch (err) {
        console.error("Error obtaining fiscal document by ID in Postgres:", err);
        return null;
      }
    } else {
      const item = getInMemoryList('fiscal_documents').find(
        (d: any) => d.company_id === companyId && d.id === id
      );
      return item ? mapRowToFiscalDocumentDTO(item) : null;
    }
  }

  async create(
    _companyId: string,
    _payload: FiscalDocumentCreateRequestDTO & { createdBy: string; status: string; id?: string }
  ): Promise<FiscalDocumentDTO> {
    throw new Error("Escrita fiscal real desativada na Sprint 4.6. Operação permitida apenas em modo dry-run controlado.");
  }

  async update(
    _companyId: string,
    _id: string,
    _payload: FiscalDocumentUpdateRequestDTO
  ): Promise<FiscalDocumentDTO | null> {
    throw new Error("Escrita fiscal real desativada na Sprint 4.6. Operação permitida apenas em modo dry-run controlado.");
  }

  async delete(_companyId: string, _id: string): Promise<boolean> {
    throw new Error("Escrita fiscal real desativada na Sprint 4.6. Operação permitida apenas em modo dry-run controlado.");
  }

  async testCreateRollbackOnly(
    companyId: string,
    payload: any,
    client: PoolClient
  ): Promise<any> {
    const query = `
      INSERT INTO fiscal_documents (
        company_id, id, document_type, document_number, document_series, status, version, xml_content, created_by
      ) VALUES (
        $1, gen_random_uuid(), $2, $3, $4, $5, 1, $6, $7
      ) RETURNING *;
    `;
    const params = [
      companyId,
      payload.documentType,
      payload.documentNumber,
      payload.documentSeries,
      payload.status || "PENDING",
      payload.xmlContent,
      payload.createdBy || "system"
    ];
    const res = await client.query(query, params);
    return res.rows[0];
  }

  async testUpdateStatusRollbackOnly(
    companyId: string,
    id: string,
    status: string,
    client: PoolClient
  ): Promise<any> {
    const query = `
      UPDATE fiscal_documents
      SET status = $1, updated_at = NOW()
      WHERE company_id = $2 AND id = $3
      RETURNING *;
    `;
    const res = await client.query(query, [status, companyId, id]);
    return res.rows[0];
  }

  async testDeleteRollbackOnly(
    companyId: string,
    id: string,
    client: PoolClient
  ): Promise<boolean> {
    const query = `
      DELETE FROM fiscal_documents
      WHERE company_id = $1 AND id = $2
    `;
    const res = await client.query(query, [companyId, id]);
    return (res.rowCount ?? 0) > 0;
  }

  async sandboxCreate(
    companyId: string,
    payload: any,
    context: any
  ): Promise<any> {
    if (!context.sandbox || context.source !== "fiscal-v2-sandbox") {
      throw new Error("Invalid sandbox context");
    }
    const query = `
      INSERT INTO fiscal_documents (
        company_id, id, document_type, document_number, document_series, status, version, xml_content, created_by
      ) VALUES (
        $1, gen_random_uuid(), $2, $3, $4, $5, 1, $6, $7
      ) RETURNING *;
    `;
    const params = [
      companyId,
      payload.documentType,
      payload.documentNumber,
      payload.documentSeries,
      payload.status || "PENDING",
      payload.xmlContent,
      "fiscal-v2-sandbox"
    ];
    if (isPostgresActive && pgPool) {
      const res = await pgPool.query(query, params);
      return res.rows[0];
    }
    throw new Error("PostgreSQL not active");
  }

  async sandboxUpdateStatus(
    companyId: string,
    id: string,
    status: string,
    context: any
  ): Promise<any> {
    if (!context.sandbox || context.source !== "fiscal-v2-sandbox") {
      throw new Error("Invalid sandbox context");
    }
    const query = `
      UPDATE fiscal_documents
      SET status = $1, updated_at = NOW()
      WHERE company_id = $2 AND id = $3 AND created_by = 'fiscal-v2-sandbox'
      RETURNING *;
    `;
    if (isPostgresActive && pgPool) {
      const res = await pgPool.query(query, [status, companyId, id]);
      return res.rows[0];
    }
    throw new Error("PostgreSQL not active");
  }

  async sandboxDelete(
    companyId: string,
    id: string,
    context: any
  ): Promise<boolean> {
    if (!context.sandbox || context.source !== "fiscal-v2-sandbox") {
      throw new Error("Invalid sandbox context");
    }
    const query = `
      DELETE FROM fiscal_documents
      WHERE company_id = $1 AND id = $2 AND created_by = 'fiscal-v2-sandbox'
    `;
    if (isPostgresActive && pgPool) {
      const res = await pgPool.query(query, [companyId, id]);
      return (res.rowCount ?? 0) > 0;
    }
    throw new Error("PostgreSQL not active");
  }
}
