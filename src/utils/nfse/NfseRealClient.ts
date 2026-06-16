import { SefazSigner } from '../SefazReal';
import axios from 'axios';
import * as https from 'https';
import { getCompanyCertificates } from '../../../db';

export class NfseRealClient {
  public static async getActiveCertificate(companyId: string) {
    const certs = await getCompanyCertificates(companyId);
    const activeCert = certs.find((c: any) => c.is_active === true || c.status === 'Ativo');
    if (!activeCert || !activeCert.encrypted_certificate) {
      throw new Error("Certificado ativo ICP-Brasil não encontrado para a empresa.");
    }
    return activeCert;
  }

  public static async signXml(xml: string, tagToSign: string, companyId: string): Promise<string> {
    const cert = await this.getActiveCertificate(companyId);
    return SefazSigner.signXml(xml, tagToSign, cert.encrypted_certificate, (cert.encrypted_password || ""));
  }

  public static async sendWithMtls(
    endpoint: string,
    soapAction: string,
    soapBodyXml: string,
    companyId: string
  ): Promise<string> {
    const cert = await this.getActiveCertificate(companyId);

    const pfxBuffer = Buffer.from(cert.encrypted_certificate, 'base64');
    const agent = new https.Agent({
      pfx: pfxBuffer,
      passphrase: cert.encrypted_password || "",
      rejectUnauthorized: false,
      secureProtocol: 'TLSv1_2_method'
    });

    try {
      const response = await axios.post(endpoint, soapBodyXml, {
        httpsAgent: agent,
        headers: {
          'Content-Type': soapAction ? `application/soap+xml; charset=utf-8; action="${soapAction}"` : 'text/xml; charset=utf-8',
          'Accept': '*/*, application/soap+xml'
        },
        timeout: 15000
      });
      return typeof response.data === 'string' ? response.data : JSON.stringify(response.data);
    } catch (err: any) {
      if (err.response) {
        throw new Error(`NFSE_WS_REJECTED: ${err.response.status} - ${typeof err.response.data === 'string' ? err.response.data.substring(0, 200) : JSON.stringify(err.response.data)}`);
      }
      throw new Error(`NETWORK_ERROR: Falha de comunicação com o Webservice NFS-e (${err.message})`);
    }
  }
}
