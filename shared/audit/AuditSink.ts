import { AuditEvent } from "./AuditEvent";

export interface AuditSink {
  write(event: AuditEvent): Promise<void>;
}
