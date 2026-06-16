import { describe, it, expect } from 'vitest';

describe('Dependency Audit Gate Unit Tests', () => {
  const evaluateAuditJson = (jsonPayload: string) => {
    try {
      const auditData = JSON.parse(jsonPayload);
      let low = 0;
      let moderate = 0;
      let high = 0;
      let critical = 0;

      if (auditData.metadata && auditData.metadata.vulnerabilities) {
        const v = auditData.metadata.vulnerabilities;
        low = v.low || 0;
        moderate = v.moderate || 0;
        high = v.high || 0;
        critical = v.critical || 0;
      }

      if (auditData.vulnerabilities) {
        Object.keys(auditData.vulnerabilities).forEach((pkgName) => {
          const entry = auditData.vulnerabilities[pkgName];
          if (entry.severity === 'low') low++;
          else if (entry.severity === 'moderate') moderate++;
          else if (entry.severity === 'high') high++;
          else if (entry.severity === 'critical') critical++;
        });
      }

      return {
        low,
        moderate,
        high,
        critical,
        failed: high > 0 || critical > 0
      };
    } catch {
      throw new Error('Parse error');
    }
  };

  it('should pass if there are only low or moderate vulnerabilities', () => {
    const mockPayload = JSON.stringify({
      metadata: {
        vulnerabilities: {
          low: 3,
          moderate: 1,
          high: 0,
          critical: 0,
          total: 4
        }
      }
    });

    const result = evaluateAuditJson(mockPayload);
    expect(result.failed).toBe(false);
    expect(result.low).toBe(3);
    expect(result.moderate).toBe(1);
    expect(result.high).toBe(0);
    expect(result.critical).toBe(0);
  });

  it('should fail if there is any high or critical vulnerability', () => {
    const mockPayload = JSON.stringify({
      metadata: {
        vulnerabilities: {
          low: 1,
          moderate: 0,
          high: 1,
          critical: 0,
          total: 2
        }
      }
    });

    const result = evaluateAuditJson(mockPayload);
    expect(result.failed).toBe(true);
    expect(result.high).toBe(1);
  });

  it('should support flat list parser of packages vulnerabilities', () => {
    const mockPayload = JSON.stringify({
      vulnerabilities: {
        'mock-package-a': { severity: 'high', range: '>=1.0.0' },
        'mock-package-b': { severity: 'low', range: '>=2.0.0' },
        'mock-package-c': { severity: 'critical', range: '>=3.0.0' }
      }
    });

    const result = evaluateAuditJson(mockPayload);
    expect(result.failed).toBe(true);
    expect(result.low).toBe(1);
    expect(result.high).toBe(1);
    expect(result.critical).toBe(1);
  });
});
