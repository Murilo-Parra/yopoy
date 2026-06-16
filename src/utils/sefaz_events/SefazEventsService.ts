import { SefazSigner, SefazSoapClient } from '../SefazReal';
import { getCompanyCertificates } from '../../../db';

export class SefazEventsService {
  
  private static getEventoCode(type: string): string {
    switch(type) {
      case 'CIENCIA': return '210210';
      case 'CONFIRMACAO': return '210200';
      case 'DESCONHECIMENTO': return '210220';
      case 'NAO_REALIZADA': return '210240';
      case 'CANCELAMENTO': return '110111';
      case 'CCE': return '110110';
      default: return '210210';
    }
  }

  /**
   * Envia evento de Manifestação do Destinatário (AN)
   */
  public static async sendManifestacao(
    companyId: string, 
    cnpj: string, // CNPJ da empresa logada que esta manifestando
    chaveNfe: string,
    tipoManifestacao: 'CIENCIA' | 'CONFIRMACAO' | 'DESCONHECIMENTO' | 'NAO_REALIZADA',
    justificativa?: string
  ): Promise<{ success: boolean; proto?: string; message?: string }> {
    try {
      const certs = await getCompanyCertificates(companyId);
      const activeCert = certs.find((c: any) => c.is_active === true || c.status === 'Ativo');
      if (!activeCert || !activeCert.encrypted_certificate) throw new Error("Certificado não encontrado.");

      const isProduction = true; // Manifestação deve ser preferencialmente PRD ou config do emitente
      const env = isProduction ? "1" : "2";

      const tpEvento = this.getEventoCode(tipoManifestacao);
      const tz = new Date().toISOString(); 
      
      let detEvento = `<descEvento>${this.getDescricaoManifestacao(tipoManifestacao)}</descEvento>`;
      if (tipoManifestacao === 'NAO_REALIZADA' && justificativa) {
         detEvento += `<xJust>${justificativa}</xJust>`;
      }

      const xmlEvent = `<envEvento xmlns="http://www.portalfiscal.inf.br/nfe" versao="1.00">
  <idLote>1</idLote>
  <evento>
    <infEvento><cOrgao>91</cOrgao><tpAmb>${env}</tpAmb>
    <CNPJ>${cnpj}</CNPJ><chNFe>${chaveNfe}</chNFe>
    <dhEvento>${tz}</dhEvento><tpEvento>${tpEvento}</tpEvento>
    <nSeqEvento>1</nSeqEvento><verEvento>1.00</verEvento>
    <detEvento versao="1.00">${detEvento}</detEvento>
    </infEvento>
  </evento>
</envEvento>`.replace(/\\r?\\n/g, '');

      const signedEvent = SefazSigner.signXml(xmlEvent, "infEvento", activeCert.encrypted_certificate, activeCert.encrypted_password || "");
      
      const endpoint = "https://www1.nfe.fazenda.gov.br/NFeRecepcaoEvento4/NFeRecepcaoEvento4.asmx"; // Webservice de Eventos da AN
      
      const soapResponse = await SefazSoapClient.sendWithMtls(
        endpoint,
        "nfeRecepcaoEvento",
        `<nfeDadosMsg>${signedEvent}</nfeDadosMsg>`,
        activeCert.encrypted_certificate,
        activeCert.encrypted_password || "",
        "AN"
      );

      // Parse proto from XML
      const matchProto = soapResponse.match(/<nProt>(.*?)<\/nProt>/);
      const matchMotivo = soapResponse.match(/<xMotivo>(.*?)<\/xMotivo>/);
      const matchStat = soapResponse.match(/<cStat>(.*?)<\/cStat>/);

      const stat = matchStat ? matchStat[1] : '';
      
      if (stat === '135' || stat === '136') {
        return { success: true, proto: matchProto ? matchProto[1] : '', message: matchMotivo ? matchMotivo[1] : 'Evento registrado' };
      } else {
        return { success: false, message: matchMotivo ? matchMotivo[1] : 'Rejeitado pela SEFAZ' };
      }

    } catch (e: any) {
      return { success: false, message: e.message };
    }
  }

  private static getDescricaoManifestacao(tipo: string) {
    if (tipo === 'CIENCIA') return 'Ciencia da Operacao';
    if (tipo === 'CONFIRMACAO') return 'Confirmacao da Operacao';
    if (tipo === 'DESCONHECIMENTO') return 'Desconhecimento da Operacao';
    return 'Operacao nao Realizada';
  }

  /**
   * Distribuição de DFe (Consulta Notas Fiscais emitidas contra o CNPJ)
   */
  public static async distribuicaoDFe(
    companyId: string,
    cnpj: string,
    uf: string,
    ultNSU: string = "000000000000000"
  ): Promise<{ success: boolean; data?: any; message?: string }> {
    try {
      const certs = await getCompanyCertificates(companyId);
      const activeCert = certs.find((c: any) => c.is_active === true || c.status === 'Ativo');
      if (!activeCert || !activeCert.encrypted_certificate) throw new Error("Certificado não encontrado.");

      const env = "1"; // Distribuicao eh so producao
      const ibgeCode = this.getIbgeCode(uf);

      const xmlBody = `<distDFeInt xmlns="http://www.portalfiscal.inf.br/nfe" versao="1.01">
  <tpAmb>${env}</tpAmb>
  <cUFAutor>${ibgeCode}</cUFAutor>
  <CNPJ>${cnpj}</CNPJ>
  <distNSU>
     <ultNSU>${ultNSU}</ultNSU>
  </distNSU>
</distDFeInt>`.replace(/\\r?\\n/g, '');

      // ConsultaNFeDest is AN 
      const endpoint = "https://www1.nfe.fazenda.gov.br/NFeDistribuicaoDFe/NFeDistribuicaoDFe.asmx";

      const soapResponse = await SefazSoapClient.sendWithMtls(
        endpoint,
        "nfeDistDFeInteresse",
        `<nfeDadosMsg>${xmlBody}</nfeDadosMsg>`,
        activeCert.encrypted_certificate,
        activeCert.encrypted_password || "",
        "AN"
      );

      // Parse NSU response and docs
      return { success: true, data: soapResponse };
    } catch (e: any) {
      return { success: false, message: e.message };
    }
  }

  private static getIbgeCode(uf: string): string {
    const map: any = {
      "SP": "35", "RJ": "33", "MG": "31", "RS": "43", "PR": "41", "SC": "42",
      "GO": "52", "DF": "53", "BA": "29", "PE": "26", "CE": "23", "PA": "15"
    };
    return map[uf] || "35";
  }

  /**
   * Consulta o Cadastro de um Contribuinte na SEFAZ (CadConsultaCadastro)
   */
  public static async consultaCadastro(
    companyId: string, 
    uf: string, 
    cnpjConsulta: string
  ): Promise<{ success: boolean; data?: any; message?: string }> {
    try {
      const certs = await getCompanyCertificates(companyId);
      const activeCert = certs.find((c: any) => c.is_active === true || c.status === 'Ativo');
      if (!activeCert || !activeCert.encrypted_certificate) throw new Error("Certificado não encontrado.");

      const xmlBody = `<ConsCad xmlns="http://www.portalfiscal.inf.br/nfe" versao="2.00">
  <infCons>
    <xServ>CONS-CAD</xServ>
    <UF>${uf}</UF>
    <CNPJ>${cnpjConsulta}</CNPJ>
  </infCons>
</ConsCad>`.replace(/\r?\n/g, '');

      // Endpoint de ConsultaCadastro depende do estado. Como fallback, SVRS atende vários.
      const endpoint = uf === "SP" ? "https://nfe.fazenda.sp.gov.br/ws/cadconsultacadastro4.asmx" : "https://cad.svrs.rs.gov.br/ws/cadconsultacadastro/cadconsultacadastro4.asmx";

      const soapResponse = await SefazSoapClient.sendWithMtls(
        endpoint,
        "consultaCadastro",
        `<nfeDadosMsg>${xmlBody}</nfeDadosMsg>`,
        activeCert.encrypted_certificate,
        activeCert.encrypted_password || "",
        uf
      );

      return { success: true, data: soapResponse };
    } catch(e: any) {
      return { success: false, message: e.message };
    }
  }
}

