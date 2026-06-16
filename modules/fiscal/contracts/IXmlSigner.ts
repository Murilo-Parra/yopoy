export interface XmlSignatureMetadata {
  signatureMethod: string;
  digestValue: string;
  signatureValue: string;
  certificateIssuer: string;
  notBefore: string;
  notAfter: string;
}

export interface IXmlSigner {
  signXml(xml: string, certificateRef: { certificatePfxBase64: string; passwordDecrypted: string }): Promise<string>;
  validateSignature(xmlSigned: string): Promise<boolean>;
  extractSignatureMetadata(xmlSigned: string): Promise<XmlSignatureMetadata | null>;
}
