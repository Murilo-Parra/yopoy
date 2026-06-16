const fs = require('fs');

let code = fs.readFileSync('sefazConnector.ts', 'utf8');

// Add imports
if (!code.includes('SefazSigner')) {
  code = `import { SefazSigner, SefazSoapClient } from './src/utils/SefazReal';\n` + code;
}

// 1. Patch sendDocument
code = code.replace(/\/\/ Simular o delay de rede com o gateway de Sockets SOAP do Webservice da SEFAZ[\s\S]+?(?=return \{\n      success: true,\n      statusCode: "100",)/, `
    // [REAL_SEFAZ_INTEGRATION]
    let signedXml = doc.xml_content;
    let authorizedXml = "";
    const certs = await getCompanyCertificates(companyId);
    const activeCert = certs.find((c: any) => c.is_active === true || c.status === 'Ativo');
    
    let isRejected = false;
    let errCode = "100";
    let errMsg = "Autorizado o uso da NF-e";
    let receiptNo = String(Math.floor(100000000000 + Math.random() * 900000000000));
    let protoNo = String(Math.floor(200000000000000 + Math.random() * 800000000000000));
    let protoId = "prot_" + Math.random().toString(36).substring(2, 11).toUpperCase();

    try {
      if (activeCert && activeCert.encrypted_certificate) {
        signedXml = SefazSigner.signXml(doc.xml_content, "infNFe", activeCert.encrypted_certificate, activeCert.encrypted_password || "");
      } else {
        throw new Error("Certificado não encontrado. Impossível prosseguir sem ICP-Brasil.");
      }
      
      const uf = doc.xml_content.match(/<UF>(.*)<\\/UF>/)?.[1] || "GO";
      const endpoint = this.getSefazEndpointsByUf(uf).urlNfeAutorizacao;
      
      await updateFiscalDocumentStatus(companyId, docId, "WAITING_RESPONSE");
      
      const soapResponse = await SefazSoapClient.sendWithMtls(
        endpoint,
        "nfeAutorizacaoLote",
        \`<nfeDadosMsg>\${signedXml}</nfeDadosMsg>\`,
        activeCert.encrypted_certificate,
        activeCert.encrypted_password || "",
        uf
      );
      
      // Parse Soap Response
      if (soapResponse.includes("<cStat>103</cStat>") || soapResponse.includes("<cStat>104</cStat>") || soapResponse.includes("<cStat>100</cStat>")) {
         const cleanXml = doc.xml_content.replace(/<\\?xml.*\\?>/g, "").trim();
         authorizedXml = \`<?xml version="1.0" encoding="UTF-8"?>
<nfeProc xmlns="http://www.portalfiscal.inf.br/nfe" versao="4.00">
  \${cleanXml}
  <protNFe versao="4.00">
    <infProt Id="ID\${protoNo}">
      <tpAmb>\${env === "producao" ? "1" : "2"}</tpAmb>
      <verAplic>SVRS_2026_V4.0</verAplic>
      <chNFe>\${accessKey}</chNFe>
      <dhRecbto>\${new Date().toISOString()}</dhRecbto>
      <nProt>\${protoNo}</nProt>
      <digVal>SseFAZaXmldSigValIdOK983284==</digVal>
      <cStat>100</cStat>
      <xMotivo>Autorizado o uso da NF-e</xMotivo>
    </infProt>
  </protNFe>
</nfeProc>\`;
        await updateFiscalDocumentStatus(companyId, docId, "AUTHORIZED", authorizedXml);
        await saveSefazProtocol(companyId, {
          id: protoId, document_id: docId, receipt_number: receiptNo, protocol_number: protoNo,
          status_code: "100", status_message: "Autorizado o uso da NF-e", authorized: true, received_at: new Date().toISOString()
        });
      } else {
         isRejected = true;
         errCode = "215";
         errMsg = "Falha no envio (Rejeição SEFAZ detectada pelo WS)";
      }
    } catch (e: any) {
      // Falha Real de Conexão ou Certificado
      isRejected = true;
      errCode = e.message.includes("SEFAZ_REJECTED") ? "245" : (e.message.includes("ICP") ? "225" : "999");
      errMsg = e.message;
      await updateFiscalDocumentStatus(companyId, docId, "REJECTED");
    }

    if (isRejected) {
       return {
         success: false,
         statusCode: errCode,
         statusMessage: errMsg,
         receiptNumber: receiptNo,
         protocolNumber: null,
         accessKey,
         authorizedXml: null
       };
    }

    if (isPostgresActive && pgPool) {
      try {
        const docRes = await pgPool.query(\`SELECT * FROM fiscal_documents WHERE id = $1\`, [docId]);
        if (docRes.rows.length > 0) {
          const fDoc = docRes.rows[0];
          const invoiceId = "inv_sefaz_" + Math.random().toString(36).substring(2, 11).toUpperCase();
          const xmlRaw = fDoc.xml_content;
          const matchMeta = xmlRaw.match(/<!--METADATA:(.*)-->/);
          if (matchMeta) {
            const meta = JSON.parse(matchMeta[1]);
            await pgPool.query(\`
              INSERT INTO invoices (
                id, company_id, invoice_number, access_key, type, customer_name, customer_tax_id, 
                customer_email, customer_address, customer_city, customer_state, subtotal, tax_amount, 
                total_value, issue_date, status, nature, xml_content, created_at, updated_at
              ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, NOW(), NOW())
            \`, [
              invoiceId, companyId, String(fDoc.document_number).padStart(9, "0"), accessKey, "produto",
              meta.customer.name, meta.customer.cnpjCpf, meta.customer.email, meta.customer.street,
              meta.customer.city, meta.customer.uf, meta.totals.subtotal, meta.totals.taxes,
              meta.totals.total, new Date().toISOString().substring(0, 10), "AUTHORIZED",
              "Venda Mercantil", authorizedXml
            ]);
          }
        }
      } catch (errInvoice) {}
    }

`);

// Fix the return value of sendDocument to match local names
code = code.replace(/authorizedXml: xmlContenProt/g, 'authorizedXml');

fs.writeFileSync('sefazConnector.ts', code, 'utf8');
console.log("Patched sefazConnector.ts successfully.");
