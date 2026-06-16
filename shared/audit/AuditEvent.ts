import { AuditLevel, AuditCategory, AuditMetadata, IAuditEvent } from "./audit.types";

export class AuditEvent implements IAuditEvent {
  public id: string;
  public level: AuditLevel;
  public category: AuditCategory;
  public action: string;
  public message: string;
  public details?: any;
  public metadata?: AuditMetadata;
  public timestamp: string;

  constructor(
    level: AuditLevel,
    category: AuditCategory,
    action: string,
    message: string,
    details?: any,
    metadata?: AuditMetadata
  ) {
    this.id = 'evt_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    this.level = level;
    this.category = category;
    this.action = action;
    this.message = message;
    this.details = details;
    this.metadata = {
      timestamp: new Date().toISOString(),
      ...metadata
    };
    this.timestamp = this.metadata.timestamp || new Date().toISOString();
  }

  public toObject(): IAuditEvent {
    return {
      id: this.id,
      level: this.level,
      category: this.category,
      action: this.action,
      message: this.message,
      details: this.details,
      metadata: this.metadata,
      timestamp: this.timestamp
    };
  }
}
