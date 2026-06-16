export class FiscalMockSefazCommunicator {
  public static simulateSefazCall(scenario: string) {
    return {
      simulatedResponseAt: new Date().toISOString(),
      scenario,
      realSefazCalled: false as false,
      status: 'MOCKED_SUCCESS',
      protocol: 'MOCK-PROT-123456789',
      message: 'This is a simulated SEFAZ response. No actual network request was made.',
      networkOpened: false as false
    };
  }
}
