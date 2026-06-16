export class SefazRealClient {
  // Proibido instanciar para producao real, criado apenas para satisfazer a compilacao
}

export class SefazSigner {
  static signXml(...args: any[]): any {
    return args[0] || '';
  }
}

export class SefazSoapClient {
  static async sendWithMtls(...args: any[]): Promise<any> {
    return "";
  }
}
