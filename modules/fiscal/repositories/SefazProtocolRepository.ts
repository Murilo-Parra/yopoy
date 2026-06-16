import { ISefazProtocolRepository, SefazProtocolDTO } from "../contracts/ISefazProtocolRepository";
import { pgPool, isPostgresActive } from "../../../infrastructure/database";
import { PoolClient } from "pg";

function mapRowToSefazProtocolDTO(row: any): SefazProtocolDTO {
  return {
    id: row.id,
    companyId: row.company_id,
    documentId: row.document_id,
    protocolNumber: row.protocol_number || "",
    statusCode: row.status_code || "",
    statusMessage: row.status_message || "",
    xmlReceived: "",
    createdAt: row.created_at instanceof Date ? row.created_at.toISOString() : String(row.created_at),
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

export class SefazProtocolRepository implements ISefazProtocolRepository {
  async listByCompany(
    companyId: string,
    filters?: { limit?: number; offset?: number }
  ): Promise<{ protocols: SefazProtocolDTO[]; total: number }> {
    if (!companyId) {
      throw new Error("companyId is required");
    }

    if (isPostgresActive && pgPool) {
      try {
        let queryStr = `SELECT * FROM sefaz_protocols WHERE company_id = $1`;
        const params: any[] = [companyId];
        let pIdx = 2;

        const totalQuery = `SELECT COUNT(*) FROM (${queryStr}) as total`;
        const totalRes = await pgPool.query(totalQuery, params);
        const total = parseInt(totalRes.rows[0].count, 10);

        queryStr += ` ORDER BY created_at DESC LIMIT $${pIdx++} OFFSET $${pIdx++}`;
        const limit = filters?.limit ?? 10;
        const offset = filters?.offset ?? 0;
        params.push(limit, offset);

        const res = await pgPool.query(queryStr, params);
        return {
          protocols: res.rows.map(mapRowToSefazProtocolDTO),
          total,
        };
      } catch (err) {
        console.error("Error listing SEFAZ protocol documents in Postgres:", err);
        return { protocols: [], total: 0 };
      }
    } else {
      const list = getInMemoryList('sefaz_protocols').filter((d: any) => d.company_id === companyId);
      const sorted = list.sort((a: any, b: any) => {
        const dateA = a.created_at || "";
        const dateB = b.created_at || "";
        return dateB.localeCompare(dateA);
      });

      const limit = filters?.limit ?? 10;
      const offset = filters?.offset ?? 0;
      const paginated = sorted.slice(offset, offset + limit);

      return {
        protocols: paginated.map(mapRowToSefazProtocolDTO),
        total: list.length,
      };
    }
  }

  async findByDocumentId(companyId: string, documentId: string): Promise<SefazProtocolDTO[]> {
    if (!companyId) {
      throw new Error("companyId is required");
    }
    if (!documentId) {
      throw new Error("documentId is required");
    }

    if (isPostgresActive && pgPool) {
      try {
        const res = await pgPool.query(
          `SELECT * FROM sefaz_protocols WHERE company_id = $1 AND document_id = $2 ORDER BY created_at DESC`,
          [companyId, documentId]
        );
        return res.rows.map(mapRowToSefazProtocolDTO);
      } catch (err) {
        console.error("Error obtaining SEFAZ protocols by document ID in Postgres:", err);
        return [];
      }
    } else {
      const list = getInMemoryList('sefaz_protocols').filter(
        (d: any) => d.company_id === companyId && d.document_id === documentId
      );
      const sorted = list.sort((a: any, b: any) => {
        const dateA = a.created_at || "";
        const dateB = b.created_at || "";
        return dateB.localeCompare(dateA);
      });
      return sorted.map(mapRowToSefazProtocolDTO);
    }
  }

  async save(_companyId: string, _payload: Omit<SefazProtocolDTO, "id" | "companyId" | "createdAt">): Promise<SefazProtocolDTO> {
    throw new Error("Escrita fiscal real desativada na Sprint 4.6. Operação permitida apenas em modo dry-run controlado.");
  }

  async testSaveRollbackOnly(
    companyId: string,
    payload: any,
    client: PoolClient
  ): Promise<any> {
    const query = `
      INSERT INTO sefaz_protocols (
        company_id, id, document_id, protocol_number, status_code, status_message
      ) VALUES (
        $1, gen_random_uuid(), $2, $3, $4, $5
      ) RETURNING *;
    `;
    const params = [
      companyId,
      payload.documentId || null,
      payload.protocolNumber || "123",
      payload.statusCode || "100",
      payload.statusMessage || "Autorizado"
    ];
    const res = await client.query(query, params);
    return res.rows[0];
  }

  async sandboxSave(
    companyId: string,
    payload: any,
    context: any
  ): Promise<any> {
    if (!context.sandbox || context.source !== "fiscal-v2-sandbox") {
      throw new Error("Invalid sandbox context");
    }
    const query = `
      INSERT INTO sefaz_protocols (
        company_id, id, document_id, protocol_number, status_code, status_message
      ) VALUES (
        $1, gen_random_uuid(), $2, $3, $4, $5
      ) RETURNING *;
    `;
    const params = [
      companyId,
      payload.documentId || null,
      payload.protocolNumber || "123",
      payload.statusCode || "100",
      "fiscal-v2-sandbox"
    ];
    if (isPostgresActive && pgPool) {
      const res = await pgPool.query(query, params);
      return res.rows[0];
    }
    throw new Error("PostgreSQL not active");
  }
}
