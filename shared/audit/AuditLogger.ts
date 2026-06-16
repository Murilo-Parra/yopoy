import { AuditLevel, AuditCategory, AuditMetadata } from "./audit.types";
import { AuditEvent } from "./AuditEvent";
import { AuditSink } from "./AuditSink";

export class AuditLogger {
  private static sink: AuditSink | null = null;

  /**
   * Register a dynamic audit sink for persistent storage
   */
  public static setSink(sink: AuditSink): void {
    this.sink = sink;
  }

  /**
   * Clear any registered audit sink
   */
  public static clearSink(): void {
    this.sink = null;
  }

  /**
   * Log an event at INFO level
   */
  public static async info(
    category: AuditCategory,
    action: string,
    message: string,
    details?: any,
    metadata?: AuditMetadata
  ): Promise<void> {
    const event = new AuditEvent(AuditLevel.INFO, category, action, message, details, metadata);
    await this.processEvent(event);
  }

  /**
   * Log an event at WARN level
   */
  public static async warn(
    category: AuditCategory,
    action: string,
    message: string,
    details?: any,
    metadata?: AuditMetadata
  ): Promise<void> {
    const event = new AuditEvent(AuditLevel.WARN, category, action, message, details, metadata);
    await this.processEvent(event);
  }

  /**
   * Log an event at ERROR level
   */
  public static async error(
    category: AuditCategory,
    action: string,
    message: string,
    details?: any,
    metadata?: AuditMetadata
  ): Promise<void> {
    const event = new AuditEvent(AuditLevel.ERROR, category, action, message, details, metadata);
    await this.processEvent(event);
  }

  /**
   * Log a security event
   */
  public static async security(
    action: string,
    message: string,
    details?: any,
    metadata?: AuditMetadata
  ): Promise<void> {
    const event = new AuditEvent(AuditLevel.SECURITY, AuditCategory.SECURITY, action, message, details, metadata);
    await this.processEvent(event);
  }

  /**
   * Log a database event
   */
  public static async database(
    action: string,
    message: string,
    details?: any,
    metadata?: AuditMetadata
  ): Promise<void> {
    await this.info(AuditCategory.DATABASE, action, message, details, metadata);
  }

  /**
   * Log a fiscal event
   */
  public static async fiscal(
    action: string,
    message: string,
    details?: any,
    metadata?: AuditMetadata
  ): Promise<void> {
    await this.info(AuditCategory.FISCAL, action, message, details, metadata);
  }

  /**
   * Log an authentication event
   */
  public static async auth(
    action: string,
    message: string,
    details?: any,
    metadata?: AuditMetadata
  ): Promise<void> {
    await this.info(AuditCategory.AUTH, action, message, details, metadata);
  }

  /**
   * Log a tenant event
   */
  public static async tenant(
    action: string,
    message: string,
    details?: any,
    metadata?: AuditMetadata
  ): Promise<void> {
    await this.info(AuditCategory.TENANT, action, message, details, metadata);
  }

  /**
   * Log a system event
   */
  public static async system(
    action: string,
    message: string,
    details?: any,
    metadata?: AuditMetadata
  ): Promise<void> {
    await this.info(AuditCategory.SYSTEM, action, message, details, metadata);
  }

  /**
   * Internal processor for AuditEvents.
   * This handles console output and delegates to the registered sink.
   */
  private static async processEvent(event: AuditEvent): Promise<void> {
    const obj = event.toObject();
    
    // 1. Maintain standard console logging for local visibility
    const consoleMsg = `[AUDIT] [${obj.level}] [${obj.category}] [${obj.action}] - ${obj.message} ${obj.details ? JSON.stringify(obj.details) : ''}`;
    if (obj.level === AuditLevel.ERROR) {
      console.error(consoleMsg);
    } else if (obj.level === AuditLevel.WARN || obj.level === AuditLevel.SECURITY) {
      console.warn(consoleMsg);
    } else {
      console.log(consoleMsg);
    }

    // 2. Delegate persistence to the configured sink
    if (this.sink) {
      try {
        await this.sink.write(event);
      } catch (err) {
        console.error("[AuditLogger] Dynamic AuditSink write failed:", err);
      }
    }
  }
}
