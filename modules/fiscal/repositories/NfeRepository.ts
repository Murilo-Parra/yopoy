import { INfeRepository } from "../contracts/INfeRepository";
import { NfeDTO, NfeCreateRequestDTO, NfeUpdateStatusRequestDTO } from "../dto/nfe.dto";
import { FiscalDocumentStatus, FiscalEnvironment } from "../types/fiscal.types";
import { pgPool, isPostgresActive } from "../../../infrastructure/database";
import { PoolClient } from "pg";

function mapRowToNfeDTO(row: any): NfeDTO {
  return {
    id: row.id,
    companyId: row.company_id,
    key: row.access_key || "",
    number: row.invoice_number,
    series: row.series,
    status: row.status as FiscalDocumentStatus,
    xmlContent: row.xml_signed || row.xml_original || undefined,
    authorizedXml: row.xml_authorized || undefined,
    protocolNumber: row.protocol_number || undefined,
    totalValue: row.total_value ? Number(row.total_value) : 0,
    customerName: row.customer_id || "CONSUMIDOR",
    customerCnpjCpf: row.customer_id || "",
    environment: FiscalEnvironment.HOMOLOGACAO,
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

export class NfeRepository implements INfeRepository {
  async listByCompany(
    companyId: string,
    filters?: { limit?: number; offset?: number; status?: string }
  ): Promise<{ nfeList: NfeDTO[]; total: number }> {
    if (!companyId) {
      throw new Error("companyId is required");
    }

    if (isPostgresActive && pgPool) {
      try {
        let queryStr = `SELECT * FROM nfe_documents WHERE company_id = $1`;
        const params: any[] = [companyId];
        let pIdx = 2;

        if (filters?.status) {
          queryStr += ` AND status = $${pIdx++}`;
          params.push(filters.status);
        }

        const totalQuery = `SELECT COUNT(*) FROM (${queryStr}) as total`;
        const totalRes = await pgPool.query(totalQuery, params);
        const total = parseInt(totalRes.rows[0].count, 10);

        queryStr += ` ORDER BY issue_date DESC, invoice_number DESC LIMIT $${pIdx++} OFFSET $${pIdx++}`;
        const limit = filters?.limit ?? 10;
        const offset = filters?.offset ?? 0;
        params.push(limit, offset);

        const res = await pgPool.query(queryStr, params);
        return {
          nfeList: res.rows.map(mapRowToNfeDTO),
          total,
        };
      } catch (err) {
        console.error("Error listing NFe documents in Postgres:", err);
        return { nfeList: [], total: 0 };
      }
    } else {
      const list = getInMemoryList('nfe_documents').filter((d: any) => d.company_id === companyId);
      let filtered = list;

      if (filters?.status) {
        filtered = list.filter((d: any) => d.status === filters.status);
      }

      const sorted = filtered.sort((a: any, b: any) => {
        const dateA = a.issue_date || a.created_at || "";
        const dateB = b.issue_date || b.created_at || "";
        return dateB.localeCompare(dateA);
      });

      const limit = filters?.limit ?? 10;
      const offset = filters?.offset ?? 0;
      const paginated = sorted.slice(offset, offset + limit);

      return {
        nfeList: paginated.map(mapRowToNfeDTO),
        total: filtered.length,
      };
    }
  }

  async findById(companyId: string, id: string): Promise<NfeDTO | null> {
    if (!companyId) {
      throw new Error("companyId is required");
    }
    if (!id) {
      throw new Error("id is required");
    }

    if (isPostgresActive && pgPool) {
      try {
        const res = await pgPool.query(
          `SELECT * FROM nfe_documents WHERE company_id = $1 AND id = $2`,
          [companyId, id]
        );
        return res.rows[0] ? mapRowToNfeDTO(res.rows[0]) : null;
      } catch (err) {
        console.error("Error obtaining NFe document by ID in Postgres:", err);
        return null;
      }
    } else {
      const item = getInMemoryList('nfe_documents').find(
        (d: any) => d.company_id === companyId && d.id === id
      );
      return item ? mapRowToNfeDTO(item) : null;
    }
  }

  async create(_companyId: string, _payload: NfeCreateRequestDTO): Promise<NfeDTO> {
    throw new Error("Escrita fiscal real desativada na Sprint 4.6. Operação permitida apenas em modo dry-run controlado.");
  }

  async updateStatus(
    _companyId: string,
    _id: string,
    _status: FiscalDocumentStatus,
    _extraFields?: Pick<NfeUpdateStatusRequestDTO, "authorizedXml" | "protocolNumber" | "errorMessage">
  ): Promise<NfeDTO | null> {
    throw new Error("Escrita fiscal real desativada na Sprint 4.6. Operação permitida apenas em modo dry-run controlado.");
  }

  async testCreateRollbackOnly(
    companyId: string,
    payload: any,
    client: PoolClient
  ): Promise<any> {
    const query = `
      INSERT INTO nfe_documents (
        company_id, id, invoice_number, series, status, total_value, customer_id
      ) VALUES (
        $1, gen_random_uuid(), $2, $3, 'PENDING', $4, $5
      ) RETURNING *;
    `;
    const params = [
      companyId,
      payload.number,
      payload.series,
      payload.totalValue || 0,
      payload.customerCnpjCpf || '99999999999'
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
      UPDATE nfe_documents
      SET status = $1, updated_at = NOW()
      WHERE company_id = $2 AND id = $3
      RETURNING *;
    `;
    const res = await client.query(query, [status, companyId, id]);
    return res.rows[0];
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
      INSERT INTO nfe_documents (
        company_id, id, invoice_number, series, status, total_value, customer_id
      ) VALUES (
        $1, gen_random_uuid(), $2, $3, 'PENDING', $4, 'fiscal-v2-sandbox'
      ) RETURNING *;
    `;
    const params = [
      companyId,
      payload.number,
      payload.series,
      payload.totalValue || 0
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
      UPDATE nfe_documents
      SET status = $1, updated_at = NOW()
      WHERE company_id = $2 AND id = $3 AND customer_id = 'fiscal-v2-sandbox'
      RETURNING *;
    `;
    if (isPostgresActive && pgPool) {
      const res = await pgPool.query(query, [status, companyId, id]);
      return res.rows[0];
    }
    throw new Error("PostgreSQL not active");
  }
}
