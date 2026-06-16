export class FiscalRealChangeWindowCalendar {
  public static getCalendar() {
    return [
      {
        id: 'CW-REAL-01',
        label: 'Provisionamento Base Dedicado',
        environment: 'Homologação Dedicada',
        plannedDurationMinutes: 120,
        requiredApprovals: ['Tech Lead Infraestrutura', 'CISO'],
        realWindowOpened: false,
        executionStarted: false,
        autoScheduled: false,
        productionTrafficAffected: false,
        activationBlocked: true
      },
      {
        id: 'CW-REAL-02',
        label: 'Carga de Certificados e Secrets',
        environment: 'Homologação Dedicada',
        plannedDurationMinutes: 60,
        requiredApprovals: ['CISO', 'Diretor Jurídico'],
        realWindowOpened: false,
        executionStarted: false,
        autoScheduled: false,
        productionTrafficAffected: false,
        activationBlocked: true
      }
    ];
  }
}
