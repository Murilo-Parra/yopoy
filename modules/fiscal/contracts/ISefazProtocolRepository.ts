export interface SefazProtocolDTO {
  id: string;
  companyId: string;
  documentId: string;
  protocolNumber: string;
  statusCode: string;
  statusMessage: string;
  xmlReceived: string;
  createdAt: string;
}

export interface ISefazProtocolRepository {
  listByCompany(companyId: string, filters?: { limit?: number; offset?: number }): Promise<{ protocols: SefazProtocolDTO[]; total: number }>;
  save(companyId: string, payload: Omit<SefazProtocolDTO, "id" | "companyId" | "createdAt">): Promise<SefazProtocolDTO>;
  findByDocumentId(companyId: string, documentId: string): Promise<SefazProtocolDTO[]>;
}
