import { IDanfeRepository } from "../contracts/IDanfeRepository";
import { DanfeDTO } from "../dto/danfe.dto";
import { DanfeDocumentType } from "../types/danfe.types";
import { pgPool, isPostgresActive } from "../../../infrastructure/database";
import { PoolClient } from "pg";

function mapRowToDanfeDTO(row: any): DanfeDTO {
  return {
    id: row.id,
    companyId: row.company_id,
    nfeId: row.nfe_id || undefined,
    nfceId: undefined,
    nfseId: undefined,
    pdfPath: row.pdf_path || "",
    fileSize: 0,
    pagesCount: 1,
    documentType: DanfeDocumentType.NFE,
    createdAt: row.generated_at instanceof Date 
      ? row.generated_at.toISOString() 
      : (row.generated_at ? String(row.generated_at) : (row.created_at instanceof Date ? row.created_at.toISOString() : String(row.created_at))),
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

export class DanfeRepository implements IDanfeRepository {
  async listByCompany(
    companyId: string,
    filters?: { limit?: number; offset?: number; documentType?: string }
  ): Promise<{ danfeList: DanfeDTO[]; total: number }> {
    if (!companyId) {
      throw new Error("companyId is required");
    }

    if (isPostgresActive && pgPool) {
      try {
        let queryStr = `SELECT * FROM danfe_documents WHERE company_id = $1`;
        const params: any[] = [companyId];
        let pIdx = 2;

        const totalQuery = `SELECT COUNT(*) FROM (${queryStr}) as total`;
        const totalRes = await pgPool.query(totalQuery, params);
        const total = parseInt(totalRes.rows[0].count, 10);

        queryStr += ` ORDER BY generated_at DESC LIMIT $${pIdx++} OFFSET $${pIdx++}`;
        const limit = filters?.limit ?? 10;
        const offset = filters?.offset ?? 0;
        params.push(limit, offset);

        const res = await pgPool.query(queryStr, params);
        return {
          danfeList: res.rows.map(mapRowToDanfeDTO),
          total,
        };
      } catch (err) {
        console.error("Error listing DANFE documents in Postgres:", err);
        return { danfeList: [], total: 0 };
      }
    } else {
      const list = getInMemoryList('danfe_documents').filter((d: any) => d.company_id === companyId);
      const sorted = list.sort((a: any, b: any) => {
        const dateA = a.generated_at || a.created_at || "";
        const dateB = b.generated_at || b.created_at || "";
        return dateB.localeCompare(dateA);
      });

      const limit = filters?.limit ?? 10;
      const offset = filters?.offset ?? 0;
      const paginated = sorted.slice(offset, offset + limit);

      return {
        danfeList: paginated.map(mapRowToDanfeDTO),
        total: list.length,
      };
    }
  }

  async findById(companyId: string, id: string): Promise<DanfeDTO | null> {
    if (!companyId) {
      throw new Error("companyId is required");
    }
    if (!id) {
      throw new Error("id is required");
    }

    if (isPostgresActive && pgPool) {
      try {
        const res = await pgPool.query(
          `SELECT * FROM danfe_documents WHERE company_id = $1 AND id = $2`,
          [companyId, id]
        );
        return res.rows[0] ? mapRowToDanfeDTO(res.rows[0]) : null;
      } catch (err) {
        console.error("Error obtaining DANFE document by ID in Postgres:", err);
        return null;
      }
    } else {
      const item = getInMemoryList('danfe_documents').find(
        (d: any) => d.company_id === companyId && d.id === id
      );
      return item ? mapRowToDanfeDTO(item) : null;
    }
  }

  async findByNfeId(companyId: string, nfeId: string): Promise<DanfeDTO | null> {
    if (!companyId) {
      throw new Error("companyId is required");
    }
    if (!nfeId) {
      throw new Error("nfeId is required");
    }

    if (isPostgresActive && pgPool) {
      try {
        const res = await pgPool.query(
          `SELECT * FROM danfe_documents WHERE company_id = $1 AND nfe_id = $2 ORDER BY generated_at DESC LIMIT 1`,
          [companyId, nfeId]
        );
        return res.rows[0] ? mapRowToDanfeDTO(res.rows[0]) : null;
      } catch (err) {
        console.error("Error obtaining DANFE document by NFe ID in Postgres:", err);
        return null;
      }
    } else {
      const list = getInMemoryList('danfe_documents').filter(
        (d: any) => d.company_id === companyId && d.nfe_id === nfeId
      );
      if (list.length === 0) return null;
      list.sort((a: any, b: any) => {
        const dateA = a.generated_at || a.created_at || "";
        const dateB = b.generated_at || b.created_at || "";
        return dateB.localeCompare(dateA);
      });
      return mapRowToDanfeDTO(list[0]);
    }
  }

  async save(_companyId: string, _payload: Omit<DanfeDTO, "id" | "companyId" | "createdAt">): Promise<DanfeDTO> {
    throw new Error("Escrita fiscal real desativada na Sprint 4.6. Operação permitida apenas em modo dry-run controlado.");
  }

  async testSaveRollbackOnly(
    companyId: string,
    payload: any,
    client: PoolClient
  ): Promise<any> {
    const query = `
      INSERT INTO danfe_documents (
        company_id, id, nfe_id, pdf_path, generated_at
      ) VALUES (
        $1, gen_random_uuid(), $2, $3, NOW()
      ) RETURNING *;
    `;
    const params = [
      companyId,
      payload.nfeId || null,
      payload.pdfPath || "/tmp/fake.pdf"
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
      INSERT INTO danfe_documents (
        company_id, id, nfe_id, pdf_path, generated_at
      ) VALUES (
        $1, gen_random_uuid(), $2, $3, NOW()
      ) RETURNING *;
    `;
    const params = [
      companyId,
      payload.nfeId || null,
      "sandbox-fiscal-v2"
    ];
    if (isPostgresActive && pgPool) {
      const res = await pgPool.query(query, params);
      return res.rows[0];
    }
    throw new Error("PostgreSQL not active");
  }
}
