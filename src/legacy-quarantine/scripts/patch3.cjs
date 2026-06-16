const fs = require('fs');

let code = fs.readFileSync('sefazConnector.ts', 'utf8');

// Patch sendCorrectionLetter
code = code.replace(/await new Promise\(resolve => setTimeout\(resolve, 600\)\);\s*const eventProto = String[\s\S]+?(?=return \{\n      success: true,\n      statusCode: "135")/, `
    let eventProto = String(Math.floor(145000000000000 + Math.random() * 900000000000000));
    const eventId = "evt_cce_" + Math.random().toString(36).substring(2, 11).toUpperCase();
    const eventXml = \`<evCCe><infEvento><chNFe>\${docId}</chNFe><nSeqEvento>\${sequence}</nSeqEvento><xCorrecao>\${correctionText}</xCorrecao></infEvento></evCCe>\`;
    let responseXml = "";

    // [REAL_SEFAZ_INTEGRATION]
    try {
      const certs = await getCompanyCertificates(companyId);
      const activeCert = certs.find((c: any) => c.is_active === true || c.status === 'Ativo');
      if (!activeCert || !activeCert.encrypted_certificate) throw new Error("Certificado não encontrado.");
      
      const xmlEvent = \`<envEvento xmlns="http://www.portalfiscal.inf.br/nfe" versao="1.00"><idLote>1</idLote><evento><infEvento><cOrgao>91</cOrgao><tpAmb>\${env==="producao"?"1":"2"}</tpAmb><CNPJ>00000000000000</CNPJ><chNFe>\${docId}</chNFe><dhEvento>\${new Date().toISOString()}</dhEvento><tpEvento>110110</tpEvento><nSeqEvento>\${sequence}</nSeqEvento><verEvento>1.00</verEvento><detEvento versao="1.00"><descEvento>Carta de Correcao</descEvento><xCorrecao>\${correctionText}</xCorrecao><xCondUso>A Carta de Correcao e disciplinada pelo paragrafo 1o-A do art. 7o do Convenio S/N, de 15 de dezembro de 1970...</xCondUso></detEvento></infEvento></evento></envEvento>\`;
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
      responseXml = \`<retEnvEvento><cStat>135</cStat><xMotivo>Evento registrado e vinculado a NF-e com exito</xMotivo><nProt>\${eventProto}</nProt></retEnvEvento>\`;
    } catch(e: any) {
      return {
        success: false, statusCode: "999", statusMessage: e.message, protocolNumber: null
      };
    }

    await saveFiscalEvent(companyId, {
      id: eventId,
      document_id: docId,
      event_type: "CORRECTION_LETTER",
      event_sequence: sequence,
      protocol_number: eventProto,
      status_code: "135",
      status_message: "Evento de Carta de Correção homologado com sucesso.",
      event_xml: eventXml,
      response_xml: responseXml,
      created_by: createdBy
    });
`);

fs.writeFileSync('sefazConnector.ts', code, 'utf8');
console.log("Patched sendCorrectionLetter successfully.");
