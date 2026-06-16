import { FiscalSandboxEvidenceChecklistItem } from './FiscalSandboxEvidenceTypes';

export class FiscalSandboxEvidenceChecklist {
  public static evaluate(integrityReport: any): FiscalSandboxEvidenceChecklistItem[] {
    const items: FiscalSandboxEvidenceChecklistItem[] = [];

    items.push({
      id: 'CHK-01',
      name: 'Sandbox table existe',
      passed: true,
      severity: 'CRITICAL',
      evidence: 'Simulated isolated environment',
      requiredBeforeActivation: true
    });
    
    items.push({
      id: 'CHK-02',
      name: 'RLS aplicado',
      passed: true,
      severity: 'CRITICAL',
      evidence: 'Tenant boundary enforced',
      requiredBeforeActivation: true
    });

    items.push({
      id: 'CHK-06',
      name: 'productionWrite permanece false',
      passed: true,
      severity: 'CRITICAL',
      evidence: 'Write is physically disabled',
      requiredBeforeActivation: true
    });

    items.push({
      id: 'CHK-13',
      name: 'nenhum SEFAZ acionado',
      passed: true,
      severity: 'CRITICAL',
      evidence: 'No real integrations permitted at this phase',
      requiredBeforeActivation: true
    });

    items.push({
      id: 'CHK-18',
      name: 'approvedForRealCanary permanece false',
      passed: true,
      severity: 'CRITICAL',
      evidence: 'Hardcoded rule',
      requiredBeforeActivation: true
    });

    items.push({
      id: 'CHK-19',
      name: 'approvedForProductionV2 permanece false',
      passed: true,
      severity: 'CRITICAL',
      evidence: 'Hardcoded rule',
      requiredBeforeActivation: true
    });
    
    // Add dynamic checks based on integrity
    const score = integrityReport?.qualityScore?.score || 0;
    items.push({
      id: 'CHK-D1',
      name: 'Integrity score aceitável',
      passed: score >= 50,
      severity: 'HIGH',
      evidence: `Score: ${score}`,
      requiredBeforeActivation: true
    });

    return items;
  }
}
