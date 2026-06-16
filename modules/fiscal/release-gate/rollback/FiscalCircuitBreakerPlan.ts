export class FiscalCircuitBreakerPlan {
  public static getCircuitBreakers(): any[] {
    const defaultFlags = {
      installableNow: false as false,
      circuitBreakerInstalled: false as false,
      requiresTelemetry: true as true,
      requiresManualApproval: true as true
    };

    return [
      { id: 'CB-01', name: 'Latency budget breaker', thresholds: 'P99 > 500ms', ...defaultFlags },
      { id: 'CB-02', name: 'SEFAZ error rate breaker', thresholds: 'Error Rate > 5%', ...defaultFlags },
      { id: 'CB-03', name: 'XML signing failure breaker', thresholds: 'Failure Rate > 1%', ...defaultFlags },
      { id: 'CB-04', name: 'PDF generation failure breaker', thresholds: 'Failure Rate > 2%', ...defaultFlags },
      { id: 'CB-05', name: 'Database write failure breaker', thresholds: 'Failure Rate > 0%', ...defaultFlags },
      { id: 'CB-06', name: 'Rollback-on-blocker breaker', thresholds: 'Internal Blocker Detected', ...defaultFlags },
      { id: 'CB-07', name: 'Tenant-specific breaker', thresholds: 'Tenant Errors > Limit', ...defaultFlags },
      { id: 'CB-08', name: 'Global kill breaker', thresholds: 'Manual switch', ...defaultFlags }
    ];
  }
}
