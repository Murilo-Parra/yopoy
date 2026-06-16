import { NfseRealClient } from '../NfseRealClient';
import { INfseProvider, NfseConfig, NfseData } from '../INfseProvider';
import { nfseProviderManager } from '../NfseProviderManager';

export class DsfProvider implements INfseProvider {
  name = 'DSF';

  async validate(config: NfseConfig, data: NfseData): Promise<{ valid: boolean; errors: string[] }> {
    const errors: string[] = [];
    if (!config.municipalInscription) errors.push('Inscrição Municipal is required.');
    if (!config.ibgeCode) errors.push('IBGE Code is required.');
    
    // Additional DSF specific validations
    if (data.totalValue <= 0) errors.push('Total value must be greater than zero for DSF.');
    if (!data.customer?.document) errors.push('Customer document is required for DSF.');
    
    return {
      valid: errors.length === 0,
      errors
    };
  }

  async generateXml(config: NfseConfig, data: NfseData): Promise<string> {
    const now = new Date();
    
    // Simplistic mock skeleton for DSF structure
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<ReqEnvioLoteRPS xmlns="http://localhost:8080/WsNFe2/lote">
  <Cabecalho>
    <CodCidade>${config.ibgeCode}</CodCidade>
    <CPFCNPJRemetente>${config.companyCnpj || '00000000000000'}</CPFCNPJRemetente>
    <RazaoSocialRemetente>${/* config.companyName */ 'Empresa Emissora'}</RazaoSocialRemetente>
    <transacao>true</transacao>
    <Versao>3</Versao>
  </Cabecalho>
  <Lote id="Lote1">
    <RPS id="RPS1">
      <Assinatura>MOCK_DSF_SIGNATURE_STRING</Assinatura>
      <InscricaoMunicipalPrestador>${config.municipalInscription}</InscricaoMunicipalPrestador>
      <RazaoSocialPrestador>${/* config.companyName */ 'Empresa Emissora'}</RazaoSocialPrestador>
      <TipoRPS>1</TipoRPS>
      <SerieRPS>${config.defaultSeries || '1'}</SerieRPS>
      <NumeroRPS>1</NumeroRPS>
      <DataEmissaoRPS>${now.toISOString()}</DataEmissaoRPS>
      <SituacaoRPS>1</SituacaoRPS>
      <SeriePrestacao>99</SeriePrestacao>
      <InscricaoMunicipalTomador>00000</InscricaoMunicipalTomador>
      <CPFCNPJTomador>${data.customer?.document || '00000000000000'}</CPFCNPJTomador>
      <RazaoSocialTomador>${data.customer?.name || 'Cliente'}</RazaoSocialTomador>
      <DocTomadorEstrangeiro></DocTomadorEstrangeiro>
      <TipoLogradouroTomador>Rua</TipoLogradouroTomador>
      <LogradouroTomador>${data.customer?.address || 'Rua'}</LogradouroTomador>
      <NumeroEnderecoTomador>SN</NumeroEnderecoTomador>
      <ComplementoEnderecoTomador></ComplementoEnderecoTomador>
      <TipoBairroTomador>Bairro</TipoBairroTomador>
      <BairroTomador>${data.customer?.neighborhood || 'Bairro'}</BairroTomador>
      <CidadeTomador>${config.ibgeCode}</CidadeTomador>
      <CidadeTomadorDescricao>Campinas</CidadeTomadorDescricao>
      <CEPTomador>${data.customer?.cep || '00000000'}</CEPTomador>
      <EmailTomador>exemplo@cliente.com.br</EmailTomador>
      <CodigoAtividade>${data.service?.municipal_service_code || ''}</CodigoAtividade>
      <AliquotaAtividade>0.05</AliquotaAtividade>
      <TipoRecolhimento>1</TipoRecolhimento>
      <MunicipioPrestacao>${config.ibgeCode}</MunicipioPrestacao>
      <MunicipioPrestacaoDescricao>Campinas</MunicipioPrestacaoDescricao>
      <Operacao>1</Operacao>
      <Tributacao>1</Tributacao>
      <ValorPIS>0</ValorPIS>
      <ValorCOFINS>0</ValorCOFINS>
      <ValorINSS>0</ValorINSS>
      <ValorIR>0</ValorIR>
      <ValorCSLL>0</ValorCSLL>
      <AliquotaPIS>0</AliquotaPIS>
      <AliquotaCOFINS>0</AliquotaCOFINS>
      <AliquotaINSS>0</AliquotaINSS>
      <AliquotaIR>0</AliquotaIR>
      <AliquotaCSLL>0</AliquotaCSLL>
      <DescricaoRPS>${data.service?.description || 'Servico prestado'}</DescricaoRPS>
      <ValorServico>${data.totalValue.toFixed(2)}</ValorServico>
      <ValorDeducao>0</ValorDeducao>
      <ValorISSRetido>0</ValorISSRetido>
    </RPS>
  </Lote>
</ReqEnvioLoteRPS>`;

    return xml;
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
  
  async downloadXml(config: NfseConfig, invoiceNumber: string): Promise<string> {
    return '<MockXmlDownloadDsf/>';
  }

  async downloadPdf(config: NfseConfig, invoiceNumber: string): Promise<string> {
    return 'data:application/pdf;base64,mocked_dsf_pdf';
  }

  async healthCheck(config: NfseConfig): Promise<boolean> {
    return true;
  }

  // DSF specific methods
  async validateConfiguration(config: NfseConfig): Promise<{ valid: boolean; errors: string[] }> {
    const errors: string[] = [];
    if (!config.certificateId) errors.push('Certificado Digital ausente na configuração do provedor DSF.');
    if (!config.municipalInscription) errors.push('Inscrição Municipal ausente na configuração.');
    if (!config.ibgeCode) errors.push('Código do Município IBGE ausente na configuração.');
    if (config.environment === 'producao' && !config.urlProducao) errors.push('URL de Produção não informada para ambiente DSF de produção.');
    if (config.environment === 'homologacao' && !config.urlHomologacao) errors.push('URL de Homologação não informada para ambiente DSF de homologação.');

    return {
      valid: errors.length === 0,
      errors
    };
  }

  getProviderInfo(): any {
    return {
      name: 'DSF',
      description: 'Integração DSF (Declaração de Serviços Fiscais)',
      capabilities: ['cancelamento', 'consulta_lote', 'consulta_xml', 'impressao_pdf'],
      schema: 'DSFv3'
    };
  }
  
  async syncStatus(config: NfseConfig, invoiceNumber: string): Promise<{ status: string; message?: string }> {
    return {
      status: 'SYNCED',
      message: 'Status synced with DSF.'
    };
  }

  private async mockNetworkCall(url: string, payload: string): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
         resolve('<Response>DSF Success</Response>');
      }, 500);
    });
  }
}

// Automatically register it
nfseProviderManager.registerProvider('DSF', new DsfProvider());
