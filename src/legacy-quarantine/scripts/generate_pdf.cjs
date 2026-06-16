const { jsPDF } = require("jspdf");
const fs = require('fs');

const doc = new jsPDF();
let y = 10;
const addLine = (text) => {
  doc.text(text, 10, y);
  y += 10;
  if (y > 280) {
    doc.addPage();
    y = 10;
  }
};

addLine("======= MANUAL OPERACIONAL - SISTEMA FISCAL =======");
addLine("");
addLine("1. INTRODUÇÃO");
addLine("Este manual descreve a arquitetura e operação do Sistema ERP e Emissor de NFe.");
addLine("");
addLine("2. ASSINATURA DIGITAL E INTEGRAÇÃO SEFAZ");
addLine("A integração ocorre via WebServices oficiais da SEFAZ, realizando transmissão real.");
addLine("O sistema utiliza node-forge e xml-crypto para realizar assinatura XMLDSig (ICP-Brasil).");
addLine("Não há mais mocks de assinatura. O RSA SHA256 é utilizado com certificados A1.");
addLine("");
addLine("3. CONTINGÊNCIA");
addLine("O roteamento fallback verifica indisponibilidade e roteia para SVC-AN ou SVC-RS.");
addLine("Suporte a emissão NFC-e offline homologada.");
addLine("");
addLine("4. AUDITORIA (MULTI-TENANT)");
addLine("Todo documento conta com registros isolados em PostgreSQL/LocalDB por tenant.");
addLine("As ações são guardadas na tabela 'audit_logs' e 'fiscal_documents'.");
addLine("");
addLine("5. EVENTOS SEFAZ");
addLine("O sistema suporta: Autorização, Cancelamento, Carta de Correção e Inutilização.");
addLine("Todos configurados com Webservices SOAP através de TLS 1.2 e Cliente (mTLS).");

const pdfOutput = doc.output();
fs.writeFileSync('MANUAL_OPERACIONAL.pdf', pdfOutput, 'binary');
console.log("PDF generated at MANUAL_OPERACIONAL.pdf");
