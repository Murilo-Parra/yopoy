export class FiscalMockXmlSigner {
  public static simulateSignature() {
    return {
      simulatedSignatureAt: new Date().toISOString(),
      xmlSigned: false as false,
      realXmlSigned: false as false,
      status: 'MOCKED_SIGNATURE',
      digestValue: 'dummydigestvalue1234567890=',
      signatureValue: 'dummysignaturevalue1234567890=',
      message: 'This is a simulated XML signature. No xml-crypto or real keys were used.'
    };
  }
}
