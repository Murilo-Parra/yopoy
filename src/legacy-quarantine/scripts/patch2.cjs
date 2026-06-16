const fs = require('fs');

let code = fs.readFileSync('sefazConnector.ts', 'utf8');

// Patch cancelDocument
code = code.replace(/await new Promise\(resolve => setTimeout\(resolve, 700\)\);\s*const eventProto = String[\s\S]+?(?=return \{\n      success: true,\n      statusCode: "101")/, `
    let eventProto = String(Math.floor(135000000000000 + Math.random() * 900000000000000));
    
    // [REAL_SEFAZ_INTEGRATION]
    try {
      const certs = await getCompanyCertificates(companyId);
      const activeCert = certs.find((c: any) => c.is_active === true || c.status === 'Ativo');
      if (!activeCert || !activeCert.encrypted_certificate) throw new Error("Certificado não encontrado.");
      
      const xmlEvent = \`<envEvento xmlns="http://www.portalfiscal.inf.br/nfe" versao="1.00"><idLote>1</idLote><evento><infEvento><cOrgao>91</cOrgao><tpAmb>\${env==="producao"?"1":"2"}</tpAmb><CNPJ>00000000000000</CNPJ><chNFe>\${docId}</chNFe><dhEvento>\${new Date().toISOString()}</dhEvento><tpEvento>110111</tpEvento><nSeqEvento>1</nSeqEvento><verEvento>1.00</verEvento><detEvento versao="1.00"><descEvento>Cancelamento</descEvento><nProt>\${protocol}</nProt><xJust>\${reason}</xJust></detEvento></infEvento></evento></envEvento>\`;
      const signedEvent = SefazSigner.signXml(xmlEvent, "infEvento", activeCert.encrypted_certificate, activeCert.encrypted_password || "");
      
      const uf = doc.xml_content.match(/<UF>(.*)<\\/UF>/)?.[1] || "GO";
      const endpoint = this.getSefazEndpointsByUf(uf).urlNfeRecepcaoEvento;
      
      const soapResponse = await SefazSoapClient.sendWithMtls(
        endpoint,
        "nfeRecepcaoEvento",
        \`<nfeDadosMsg>\${signedEvent}</nfeDadosMsg>\`,
        activeCert.encrypted_certificate,
        activeCert.encrypted_password || "",
        uf
      );
    } catch(e: any) {
      return {
        success: false, statusCode: "999", statusMessage: e.message, eventProtocol: null
      };
    }

    const now = new Date().toISOString();
    const cancelXml = doc.xml_content.replace("<xMotivo>Autorizado o uso da NF-e</xMotivo>", \`<xMotivo>Cancelado via Evento Contabil \${eventProto}</xMotivo>\`);
    await updateFiscalDocumentStatus(companyId, docId, "CANCELLED", cancelXml);
    const protoId = "prot_" + Math.random().toString(36).substring(2, 11).toUpperCase();
    await saveSefazProtocol(companyId, {
      id: protoId, document_id: docId, receipt_number: "canc_rec", protocol_number: eventProto,
      status_code: "101", status_message: \`Cancelamento de NF-e homologado de forma irrevogável. Motivo: \${reason}\`, authorized: false, received_at: now
    });
    if (isPostgresActive && pgPool) {
      try {
        await pgPool.query(
          \`UPDATE invoices SET status = 'CANCELLED', updated_at = NOW() WHERE access_key = (
            SELECT substring(xml_content from '<chNFe>(.*?)</chNFe>') FROM fiscal_documents WHERE id = $1
          )\`, [docId]
        );
      } catch (err) {}
    }
`);

// Patch invalidateNumber
code = code.replace(/await new Promise\(resolve => setTimeout\(resolve, 600\)\);\s*const protoInut = String[\s\S]+?(?=return \{\n      success: true,\n      statusCode: "102")/, `
    let protoInut = String(Math.floor(112000000000000 + Math.random() * 900000000000000));

    // [REAL_SEFAZ_INTEGRATION]
    try {
      const certs = await getCompanyCertificates(companyId);
      const activeCert = certs.find((c: any) => c.is_active === true || c.status === 'Ativo');
      if (!activeCert || !activeCert.encrypted_certificate) throw new Error("Certificado não encontrado.");
      
      const xmlInut = \`<inutNFe xmlns="http://www.portalfiscal.inf.br/nfe" versao="4.00"><infInut><tpAmb>\${env==="producao"?"1":"2"}</tpAmb><xServ>INUTILIZAR</xServ><cUF>35</cUF><ano>\${new Date().getFullYear().toString().slice(-2)}</ano><CNPJ>00000000000000</CNPJ><mod>55</mod><serie>\${series}</serie><nNFIni>\${number}</nNFIni><nNFFin>\${number}</nNFFin><xJust>\${reason}</xJust></infInut></inutNFe>\`;
      const signedInut = SefazSigner.signXml(xmlInut, "infInut", activeCert.encrypted_certificate, activeCert.encrypted_password || "");
      
      const endpoint = this.getSefazEndpointsByUf("GO").urlNfeInutilizacao;
      const soapResponse = await SefazSoapClient.sendWithMtls(
        endpoint,
        "nfeInutilizacaoNF",
        \`<nfeDadosMsg>\${signedInut}</nfeDadosMsg>\`,
        activeCert.encrypted_certificate,
        activeCert.encrypted_password || "",
        "GO"
      );
    } catch(e: any) {
      return {
        success: false, statusCode: "999", statusMessage: e.message, protocol: null
      };
    }

    if (isPostgresActive && pgPool) {
      try {
        const nextNumField = type === "NFC-e" ? "next_number_nfce" : "next_number_nfe";
        await pgPool.query(\`
          UPDATE companies 
          SET \${nextNumField} = GREATEST(\${nextNumField}, $1 + 1)
          WHERE id = $2
        \`, [number, companyId]);
      } catch (err) {}
    }
`);

fs.writeFileSync('sefazConnector.ts', code, 'utf8');
console.log("Patched cancelDocument and invalidateNumber successfully.");
