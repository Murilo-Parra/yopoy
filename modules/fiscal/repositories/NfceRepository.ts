import { INfceRepository } from "../contracts/INfceRepository";
import { NfceDTO, NfceCreateRequestDTO, NfceCancelRequestDTO } from "../dto/nfce.dto";
import { FiscalDocumentStatus, FiscalEnvironment } from "../types/fiscal.types";
import { pgPool, isPostgresActive } from "../../../infrastructure/database";
import { PoolClient } from "pg";

function mapRowToNfceDTO(row: any): NfceDTO {
  return {
    id: row.id,
    companyId: row.company_id,
    key: row.access_key || "",
    number: row.number,
    series: row.series,
    status: row.status as FiscalDocumentStatus,
    xmlContent: row.xml_signed || undefined,
    authorizedXml: row.xml_authorized || undefined,
    protocolNumber: row.protocol_number || undefined,
    totalValue: row.total_value ? Number(row.total_value) : 0,
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

export class NfceRepository implements INfceRepository {
  async listByCompany(
    companyId: string,
    filters?: { limit?: number; offset?: number; status?: string }
  ): Promise<{ nfceList: NfceDTO[]; total: number }> {
    if (!companyId) {
      throw new Error("companyId is required");
    }

    if (isPostgresActive && pgPool) {
      try {
        let queryStr = `SELECT * FROM nfce_documents WHERE company_id = $1`;
        const params: any[] = [companyId];
        let pIdx = 2;

        if (filters?.status) {
          queryStr += ` AND status = $${pIdx++}`;
          params.push(filters.status);
        }

        const totalQuery = `SELECT COUNT(*) FROM (${queryStr}) as total`;
        const totalRes = await pgPool.query(totalQuery, params);
        const total = parseInt(totalRes.rows[0].count, 10);

        queryStr += ` ORDER BY issued_at DESC, number DESC LIMIT $${pIdx++} OFFSET $${pIdx++}`;
        const limit = filters?.limit ?? 10;
        const offset = filters?.offset ?? 0;
        params.push(limit, offset);

        const res = await pgPool.query(queryStr, params);
        return {
          nfceList: res.rows.map(mapRowToNfceDTO),
          total,
        };
      } catch (err) {
        console.error("Error listing NFCe documents in Postgres:", err);
        return { nfceList: [], total: 0 };
      }
    } else {
      const list = getInMemoryList('nfce_documents').filter((d: any) => d.company_id === companyId);
      let filtered = list;

      if (filters?.status) {
        filtered = list.filter((d: any) => d.status === filters.status);
      }

      const sorted = filtered.sort((a: any, b: any) => {
        const dateA = a.issued_at || a.created_at || "";
        const dateB = b.issued_at || b.created_at || "";
        return dateB.localeCompare(dateA);
      });

      const limit = filters?.limit ?? 10;
      const offset = filters?.offset ?? 0;
      const paginated = sorted.slice(offset, offset + limit);

      return {
        nfceList: paginated.map(mapRowToNfceDTO),
        total: filtered.length,
      };
    }
  }

  async findById(companyId: string, id: string): Promise<NfceDTO | null> {
    if (!companyId) {
      throw new Error("companyId is required");
    }
    if (!id) {
      throw new Error("id is required");
    }

    if (isPostgresActive && pgPool) {
      try {
        const res = await pgPool.query(
          `SELECT * FROM nfce_documents WHERE company_id = $1 AND id = $2`,
          [companyId, id]
        );
        return res.rows[0] ? mapRowToNfceDTO(res.rows[0]) : null;
      } catch (err) {
        console.error("Error obtaining NFCe document by ID in Postgres:", err);
        return null;
      }
    } else {
      const item = getInMemoryList('nfce_documents').find(
        (d: any) => d.company_id === companyId && d.id === id
      );
      return item ? mapRowToNfceDTO(item) : null;
    }
  }

  async create(_companyId: string, _payload: NfceCreateRequestDTO): Promise<NfceDTO> {
    throw new Error("Escrita fiscal real desativada na Sprint 4.6. Operação permitida apenas em modo dry-run controlado.");
  }

  async cancel(_companyId: string, _id: string, _payload: NfceCancelRequestDTO): Promise<NfceDTO | null> {
    throw new Error("Escrita fiscal real desativada na Sprint 4.6. Operação permitida apenas em modo dry-run controlado.");
  }

  async sync(_companyId: string, _payloads: NfceCreateRequestDTO[]): Promise<NfceDTO[]> {
    throw new Error("Escrita fiscal real desativada na Sprint 4.6. Operação permitida apenas em modo dry-run controlado.");
  }

  async testCreateRollbackOnly(
    companyId: string,
    payload: any,
    client: PoolClient
  ): Promise<any> {
    const query = `
      INSERT INTO nfce_documents (
        company_id, id, number, series, status, total_value, payment_method
      ) VALUES (
        $1, gen_random_uuid(), $2, $3, 'PENDING', $4, 'CASH'
      ) RETURNING *;
    `;
    const params = [
      companyId,
      payload.number,
      payload.series,
      payload.totalValue || 0
    ];
    const res = await client.query(query, params);
    return res.rows[0];
  }

  async testCancelRollbackOnly(
    companyId: string,
    id: string,
    payload: any,
    client: PoolClient
  ): Promise<any> {
    const query = `
      UPDATE nfce_documents
      SET status = 'CANCELLED', updated_at = NOW()
      WHERE company_id = $1 AND id = $2
      RETURNING *;
    `;
    const res = await client.query(query, [companyId, id]);
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
      INSERT INTO nfce_documents (
        company_id, id, number, series, status, total_value, payment_method
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

  async sandboxCancel(
    companyId: string,
    id: string,
    payload: any,
    context: any
  ): Promise<any> {
    if (!context.sandbox || context.source !== "fiscal-v2-sandbox") {
      throw new Error("Invalid sandbox context");
    }
    const query = `
      UPDATE nfce_documents
      SET status = 'CANCELLED', updated_at = NOW()
      WHERE company_id = $1 AND id = $2 AND payment_method = 'fiscal-v2-sandbox'
      RETURNING *;
    `;
    if (isPostgresActive && pgPool) {
      const res = await pgPool.query(query, [companyId, id]);
      return res.rows[0];
    }
    throw new Error("PostgreSQL not active");
  }
}
