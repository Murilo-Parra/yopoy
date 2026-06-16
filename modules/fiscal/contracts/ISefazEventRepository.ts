import { SefazEventQueueStatus } from "../types/sefaz.types";

export interface SefazEventEnqueueDTO {
  documentId: string;
  eventType: string;
  payload: string;
}

export interface SefazEventItemDTO {
  id: string;
  companyId: string;
  documentId: string;
  eventType: string;
  status: SefazEventQueueStatus;
  payload: string;
  attempts: number;
  lastAttemptAt?: string;
  errorMessage?: string;
  createdAt: string;
}

export interface SefazEventLogDTO {
  id: string;
  companyId: string;
  eventId: string;
  action: string;
  details: string;
  createdAt: string;
}

export interface ISefazEventRepository {
  enqueue(companyId: string, payload: SefazEventEnqueueDTO): Promise<SefazEventItemDTO>;
  listQueue(companyId: string, filters?: { status?: SefazEventQueueStatus; limit?: number; offset?: number }): Promise<{ items: SefazEventItemDTO[]; total: number }>;
  updateStatus(companyId: string, eventId: string, status: SefazEventQueueStatus, extra?: { attempts?: number; errorMessage?: string }): Promise<SefazEventItemDTO | null>;
  listLogs(companyId: string, filters?: { limit?: number; offset?: number }): Promise<{ logs: SefazEventLogDTO[]; total: number }>;
}
