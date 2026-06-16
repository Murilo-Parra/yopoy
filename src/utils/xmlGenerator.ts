export class XmlGenerator {
  static generateNfseXml(data: any): string {
    return 'FISCAL_ACTION_BLOCKED: Ação fiscal real bloqueada. O Yopoy ainda não está em modo de homologação ou produção fiscal autorizada.';
  }
  static generateNfeXml(data: any): string {
    return 'FISCAL_ACTION_BLOCKED';
  }
  static generateNfceXml(data: any): string {
    return 'FISCAL_ACTION_BLOCKED';
  }
  static xml_serializer(node: any): string {
    return 'FISCAL_ACTION_BLOCKED';
  }
}

export class XmlValidator {
  static validate(xml: any): string[] {
    return [];
  }
}
