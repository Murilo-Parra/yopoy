import { FiscalSandboxClosureRisk } from './FiscalSandboxClosureTypes';

export class FiscalSandboxClosureRiskRegister {
  public static getRisks(): FiscalSandboxClosureRisk[] {
    return [
      {
        id: 'R-CLOSE-01',
        severity: 'CRITICAL',
        description: 'Interpretação indevida do sandbox como autorização de produção.',
        mitigation: 'Hardcoded final status messages and false flags for real activation in all reports.',
        blockerForRealActivation: false
      },
      {
        id: 'R-CLOSE-02',
        severity: 'HIGH',
        description: 'Dados sandbox insuficientes para inferência produtiva.',
        mitigation: 'Module 6 isolates data capture. Subsequent phases must run load generation and real-data mirroring carefully before true validation.',
        blockerForRealActivation: true
      },
      {
        id: 'R-CLOSE-03',
        severity: 'CRITICAL',
        description: 'Ausência de validação com SEFAZ real.',
        mitigation: 'Expected. Subsystems mimicking Sefaz or validating safe_shape against XSDs must run in homologation first.',
        blockerForRealActivation: true
      },
      {
        id: 'R-CLOSE-04',
        severity: 'MEDIUM',
        description: 'Ausência de assinatura XML real.',
        mitigation: 'We have not verified computational cost of node-forge signatures under load in V2.',
        blockerForRealActivation: true
      },
      {
        id: 'R-CLOSE-05',
        severity: 'MEDIUM',
        description: 'Ausência de geração PDF real.',
        mitigation: 'We have not verified computational cost of PDF generation in V2.',
        blockerForRealActivation: false
      },
      {
        id: 'R-CLOSE-06',
        severity: 'HIGH',
        description: 'Dependência de dados administrativos, não tráfego real.',
        mitigation: 'Traffic interception will be addressed in a future module under heavy proxy controls.',
        blockerForRealActivation: true
      },
      {
        id: 'R-CLOSE-07',
        severity: 'LOW',
        description: 'Necessidade futura de testes de carga.',
        mitigation: 'Replay bridge allows artificial load generation which should be used.',
        blockerForRealActivation: false
      },
      {
        id: 'R-CLOSE-08',
        severity: 'HIGH',
        description: 'Necessidade futura de plano formal de ativação.',
        mitigation: 'Strict documentation must precede any boolean flag toggle for activation.',
        blockerForRealActivation: true
      },
      {
        id: 'R-CLOSE-09',
        severity: 'CRITICAL',
        description: 'Necessidade futura de rollback operacional real.',
        mitigation: 'In case of SEFAZ rejection loop, V2 needs a safe kill-switch to revert to V1 immediately.',
        blockerForRealActivation: true
      },
      {
        id: 'R-CLOSE-10',
        severity: 'CRITICAL',
        description: 'Risco de confundir cleanup sandbox com limpeza produtiva se guardrails forem removidos em fases futuras.',
        mitigation: 'Review and Retention forces `targetTable` validation and exact marker checking.',
        blockerForRealActivation: false
      }
    ];
  }
}
