export class FiscalShadowMirrorTelemetryAggregator {
  private static events: any[] = [];
  private static totalSyntheticEvents = 0;
  private static totalBlocked = 0;
  private static totalAccepted = 0;
  private static byRoute: Record<string, number> = {};
  private static byEventType: Record<string, number> = {};
  private static byStatus: Record<string, number> = {};

  public static addEvent(event: any, status: string, allowed: boolean) {
    this.totalSyntheticEvents++;
    if (allowed) this.totalAccepted++;
    else this.totalBlocked++;

    this.byRoute[event.routeId] = (this.byRoute[event.routeId] || 0) + 1;
    this.byEventType[event.eventType] = (this.byEventType[event.eventType] || 0) + 1;
    this.byStatus[status] = (this.byStatus[status] || 0) + 1;

    this.events.push({ ...event, status, allowed, timestamp: new Date().toISOString() });
    if (this.events.length > 100) this.events.shift();
  }

  public static getStats() {
    return {
      totalSyntheticEvents: this.totalSyntheticEvents,
      totalBlocked: this.totalBlocked,
      totalAccepted: this.totalAccepted,
      byRoute: this.byRoute,
      byEventType: this.byEventType,
      byStatus: this.byStatus
    };
  }

  public static getEvents() {
      return this.events;
  }
}
