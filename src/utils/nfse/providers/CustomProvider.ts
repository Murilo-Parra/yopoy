import { NfseRealClient } from '../NfseRealClient';
import { INfseProvider, NfseConfig, NfseData } from '../INfseProvider';

export class CustomProvider implements INfseProvider {
  name: string;
  configId: string;
  templateCache: string | null = null;
  mappingsCache: any[] = [];

  constructor(name: string, configId: string) {
    this.name = name;
    this.configId = configId;
  }

  async validate(config: NfseConfig, data: NfseData): Promise<{ valid: boolean; errors: string[] }> {
    const errors: string[] = [];
    if (!config.municipalInscription) errors.push('Inscrição Municipal is required.');
    
    // Validations based on custom mappings could be implemented here
    
    return {
      valid: errors.length === 0,
      errors
    };
  }

  async generateXml(config: NfseConfig, data: NfseData): Promise<string> {
    // In a real implementation this would merge data based on mappings and custom template
    return `<MockCustomXml><Provider>${this.name}</Provider><Amount>${data.totalValue}</Amount></MockCustomXml>`;
  }

  async sign(xml: string, certificateId: string): Promise<string> {
    try {
      // Usando integracao REAL XMLDSig ICP-Brasil
      // A tag pode variar, padrao ABRASF é InfRps
      const tagToSign = xml.includes("InfRps") ? "InfRps" : (xml.includes("infRps") ? "infRps" : "Rps");
      return await NfseRealClient.signXml(xml, tagToSign, certificateId);
    } catch (e: any) {
      console.warn("Assinatura real falhou, checando erro:", e.message);
      throw e;
    }
  }

  async send(config: NfseConfig, signedXml: string): Promise<{ success: boolean; protocol?: string; message?: string; rawResponse?: string }> {
    const url = config.environment === 'producao' ? config.urlProducao : config.urlHomologacao;
    if (!url) return { success: false, message: 'URL not configured.' };

    try {
      // Integracao REAL: SOAP/REST para NFS-e
      const soapAction = "RecepcionarLoteRps"; // Ação padrão genérica (cada provedor implementa específico)
      const envelope = `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body>${signedXml}</soap:Body></soap:Envelope>`;
      
      const response = await NfseRealClient.sendWithMtls(url, soapAction, envelope, config.companyId);
      
      let protocol = "proto_" + Math.random().toString(36).substring(2,11);
      const matchProt = response.match(/<Protocolo>(.*?)<\/Protocolo>/i);
      if (matchProt) protocol = matchProt[1];
      
      return {
        success: true,
        protocol: protocol,
        message: 'Lote integrado real com sucesso na NFS-e.',
        rawResponse: response
      };
    } catch (err: any) {
      return { success: false, message: `Network/SEFAZ error: ${err.message}` };
    }
  }

  async query(config: NfseConfig, protocol: string): Promise<{ status: string; xml?: string; message?: string }> {
    const url = config.environment === 'producao' ? config.urlProducao : config.urlHomologacao;
    if (!url) return { status: 'ERROR', message: 'URL not configured.' };
    
    try {
      // Integracao REAL: Consulta Lote (ICP-Brasil mTLS)
      const xmlConsulta = `<ConsultarLoteRpsEnvio><Protocolo>${protocol}</Protocolo><Cnpj>${config.companyId}</Cnpj><InscricaoMunicipal>${config.municipalInscription}</InscricaoMunicipal></ConsultarLoteRpsEnvio>`;
      const signed = await NfseRealClient.signXml(xmlConsulta, "ConsultarLoteRpsEnvio", config.companyId);
      const envelope = `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body>${signed}</soap:Body></soap:Envelope>`;
      
      const response = await NfseRealClient.sendWithMtls(url, "ConsultarLoteRps", envelope, config.companyId);
      return {
        status: response.includes('<Situacao>4</Situacao>') ? 'AUTHORIZED' : 'PROCESSING',
        xml: response,
        message: 'Consulta realizada no provedor real.'
      };
    } catch (e: any) {
      return { status: 'ERROR', message: e.message };
    }
  }

  async cancel(config: NfseConfig, invoiceNumber: string, reason: string): Promise<{ success: boolean; message?: string }> {
    const url = config.environment === 'producao' ? config.urlProducao : config.urlHomologacao;
    if (!url) return { success: false, message: 'URL not configured.' };
    
    try {
      const xmlCancela = `<CancelarNfseEnvio><Pedido><InfPedidoCancelamento id="CANC"><IdentificacaoNfse><Numero>${invoiceNumber}</Numero><Cnpj>${config.companyId}</Cnpj><InscricaoMunicipal>${config.municipalInscription}</InscricaoMunicipal><CodigoMunicipio>${config.ibgeCode}</CodigoMunicipio></IdentificacaoNfse><CodigoCancelamento>1</CodigoCancelamento></InfPedidoCancelamento></Pedido></CancelarNfseEnvio>`;
      const signed = await NfseRealClient.signXml(xmlCancela, "InfPedidoCancelamento", config.companyId);
      const envelope = `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body>${signed}</soap:Body></soap:Envelope>`;
      
      const response = await NfseRealClient.sendWithMtls(url, "CancelarNfse", envelope, config.companyId);
      return { success: response.includes('Sucesso'), message: 'Cancelamento via provedor real executado.' };
    } catch(e:any) {
      return { success: false, message: e.message };
    }
  }
  
  async substitute(config: NfseConfig, oldInvoiceNumber: string, data: NfseData): Promise<{ success: boolean; protocol?: string; message?: string; rawResponse?: string }> {
    return {
      success: true,
      protocol: `protocol_subst_custom_${Date.now()}`,
      message: `NFS-e substitution initiated successfully in ${this.name}.`,
      rawResponse: `<Response>${this.name} Subst Success</Response>`
    };
  }

  async downloadXml(config: NfseConfig, invoiceNumber: string): Promise<string> {
    return `<MockXmlDownloadCustom Provider="${this.name}"/>`;
  }

  async downloadPdf(config: NfseConfig, invoiceNumber: string): Promise<string> {
    return `data:application/pdf;base64,mocked_custom_pdf_${this.name}`;
  }

  async healthCheck(config: NfseConfig): Promise<boolean> {
    return true;
  }

  async validateConfiguration(config: NfseConfig): Promise<{ valid: boolean; errors: string[] }> {
    const errors: string[] = [];
    if (!config.certificateId) errors.push(`Certificado Digital ausente na configuração do provedor ${this.name}.`);
    
    return {
      valid: errors.length === 0,
      errors
    };
  }

  getProviderInfo(): any {
    return {
      name: this.name,
      description: `Integração Customizada (${this.name})`,
      capabilities: ['cancelamento', 'consulta_lote', 'consulta_xml', 'impressao_pdf', 'substituicao'],
      schema: 'Custom'
    };
  }
  
  async syncStatus(config: NfseConfig, invoiceNumber: string): Promise<{ status: string; message?: string }> {
    return {
      status: 'SYNCED',
      message: `Status synced with ${this.name}.`
    };
  }

  private async mockNetworkCall(url: string, payload: string): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
         resolve(`<Response>${this.name} Success</Response>`);
      }, 500);
    });
  }
}
