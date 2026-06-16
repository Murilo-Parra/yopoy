import { SignedXml } from 'xml-crypto';
import { DOMParser, XMLSerializer } from '@xmldom/xmldom';
import axios from 'axios';
import * as https from 'https';
import * as forge from 'node-forge';

export class SefazSigner {
  /**
   * Assina o XML utilizando o padrão XMLDSig ICP-Brasil (RSA SHA256)
   */
  public static signXml(xml: string, tagToSign: string, certBase64Pfx: string, certPassword: string): string {
    const doc = new DOMParser().parseFromString(xml, 'text/xml');
    const sig = new SignedXml() as any;
    
    // Configura ICP Brasil Canonicalization e Digest SHA256
    sig.signatureAlgorithm = "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256";
    sig.addReference({
      xpath: `//*[local-name(.)='${tagToSign}']`,
      transforms: ["http://www.w3.org/2000/09/xmldsig#enveloped-signature", "http://www.w3.org/TR/2001/REC-xml-c14n-20010315"],
      digestAlgorithm: "http://www.w3.org/2001/04/xmlenc#sha256"
    });

    // Extrair chave privada e certificado público do PFX (utilizando node-forge)
    const p12Der = forge.util.decode64(certBase64Pfx);
    const p12Asn1 = forge.asn1.fromDer(p12Der);
    const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, false, certPassword);
    
    let privateKeyPem = "";
    let certPem = "";

    // Pega as bags (safeContents)
    for (const safeContent of p12.safeContents) {
      for (const safeBag of safeContent.safeBags) {
        if (safeBag.type === forge.pki.oids.keyBag || safeBag.type === forge.pki.oids.pkcs8ShroudedKeyBag) {
          const privateKey = safeBag.type === forge.pki.oids.pkcs8ShroudedKeyBag ? 
            forge.pki.decryptPrivateKeyInfo(safeBag.asn1, certPassword) : safeBag.key;
          if (privateKey) privateKeyPem = forge.pki.privateKeyToPem(privateKey as any);
        } else if (safeBag.type === forge.pki.oids.certBag) {
          certPem = forge.pki.certificateToPem(safeBag.cert!);
        }
      }
    }

    if (!privateKeyPem || !certPem) {
      throw new Error("Não foi possível extrair a chave privada ou certificado público do arquivo PFX.");
    }

    sig.signingKey = Buffer.from(privateKeyPem);
    
    // Adiciona KeyInfo para conter o certificado X509
    sig.keyInfoProvider = {
      getKeyInfo: (key, prefix) => {
        const cleanCert = certPem.replace(/-----BEGIN CERTIFICATE-----/, "").replace(/-----END CERTIFICATE-----/, "").replace(/\n/g, "");
        return `<X509Data><X509Certificate>${cleanCert}</X509Certificate></X509Data>`;
      },
      getKey: () => Buffer.from(certPem)
    };

    sig.computeSignature(xml);
    return sig.getSignedXml();
  }
}

export class SefazSoapClient {
  /**
   * Dispara a requisição SOAP via mTLS com o certificado ICP-Brasil
   */
  public static async sendWithMtls(
    endpoint: string,
    soapAction: string,
    soapBodyXml: string,
    certBase64Pfx: string,
    certPassword: string,
    uf: string
  ): Promise<string> {
    
    // Carregar o PFX como buffer
    const pfxBuffer = Buffer.from(certBase64Pfx, 'base64');
    
    // Configurar o agente HTTPS com TLS 1.2+
    const agent = new https.Agent({
      pfx: pfxBuffer,
      passphrase: certPassword,
      rejectUnauthorized: false, // Em Homologação Sefaz a cadeia frequentemente não é confiada pela raiz comum
      secureProtocol: 'TLSv1_2_method'
    });

    const envelope = `<?xml version="1.0" encoding="utf-8"?>
<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
  <soap12:Header>
    <nfeCabecMsg xmlns="http://www.portalfiscal.inf.br/nfe/wsdl/${soapAction}">
      <cUF>${this.getIbgeByUf(uf)}</cUF>
      <versaoDados>4.00</versaoDados>
    </nfeCabecMsg>
  </soap12:Header>
  <soap12:Body>
    ${soapBodyXml}
  </soap12:Body>
</soap12:Envelope>`;

    try {
      const response = await axios.post(endpoint, envelope, {
        httpsAgent: agent,
        headers: {
          'Content-Type': 'application/soap+xml; charset=utf-8; action="' + soapAction + '"',
          'Accept': 'application/soap+xml'
        },
        timeout: 10000 // 10s para forçar fallback rápido se estiver fora
      });
      return response.data;
    } catch (err: any) {
      if (err.response && err.response.status !== 500 && err.response.status !== 502 && err.response.status !== 503 && err.response.status !== 504) {
        throw new Error(`SEFAZ_REJECTED: ${err.response.status} - ${err.response.data}`);
      }
      
      console.warn(`Serviço autorizador local \${uf} inoperante, tentando contingência SVC-AN / SVC-RS / Offline...`);
      // Roteamento Automático Contingência (SVC-AN / SVC-RS)
      const fallbackEndpoint = endpoint.includes("svrs") ? 
          "https://nfe.svrs.rs.gov.br/ws/NfeAutorizacao/NfeAutorizacao4.asmx" : 
          "https://www.sefazvirtual.fazenda.gov.br/NFeAutorizacao4/NFeAutorizacao4.asmx";
      
      try {
        const responseFallback = await axios.post(fallbackEndpoint, envelope, {
          httpsAgent: agent,
          headers: {
            'Content-Type': 'application/soap+xml; charset=utf-8; action="' + soapAction + '"',
            'Accept': 'application/soap+xml'
          },
          timeout: 15000
        });
        return responseFallback.data;
      } catch (fallbackErr: any) {
        throw new Error(`NETWORK_ERROR: Falha de comunicação com o Webservice SEFAZ e Contingência (${fallbackErr.message}). Mude para offline. 999`);
      }
    }
  }

  private static getIbgeByUf(uf: string): string {
    const map: any = {
      "SP": "35", "RJ": "33", "MG": "31", "RS": "43", "PR": "41", "SC": "42",
      "GO": "52", "DF": "53", "BA": "29", "PE": "26", "CE": "23", "PA": "15"
    };
    return map[uf] || "99";
  }
}
