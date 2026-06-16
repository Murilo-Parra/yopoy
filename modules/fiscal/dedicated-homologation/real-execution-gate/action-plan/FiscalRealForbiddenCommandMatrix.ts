export class FiscalRealForbiddenCommandMatrix {
  public static getMatrix() {
    return [
      { command: 'terraform apply', domain: 'IAC_APPLY', forbidden: true, executionAllowed: false, blockerReason: 'Execução real de IaC não permitida nesta fase.' },
      { command: 'pulumi up', domain: 'IAC_APPLY', forbidden: true, executionAllowed: false, blockerReason: 'Execução real de IaC não permitida nesta fase.' },
      { command: 'cloudformation deploy', domain: 'IAC_APPLY', forbidden: true, executionAllowed: false, blockerReason: 'Execução real de IaC não permitida nesta fase.' },
      { command: 'aws cloudformation deploy', domain: 'IAC_APPLY', forbidden: true, executionAllowed: false, blockerReason: 'Execução real de IaC não permitida nesta fase.' },
      { command: 'gcloud deploy', domain: 'IAC_APPLY', forbidden: true, executionAllowed: false, blockerReason: 'Execução real de IaC não permitida nesta fase.' },
      { command: 'az deployment', domain: 'IAC_APPLY', forbidden: true, executionAllowed: false, blockerReason: 'Execução real de IaC não permitida nesta fase.' },
      { command: 'docker run production', domain: 'PRODUCTION_V2', forbidden: true, executionAllowed: false, blockerReason: 'Lançamento de containers produtivos não permitido.' },
      { command: 'kubectl apply', domain: 'PRODUCTION_V2', forbidden: true, executionAllowed: false, blockerReason: 'Aplicação em cluster K8s não permitida.' },
      { command: 'psql CREATE DATABASE', domain: 'DATABASE', forbidden: true, executionAllowed: false, blockerReason: 'Criação de DB real bloqueada.' },
      { command: 'CREATE DATABASE', domain: 'DATABASE', forbidden: true, executionAllowed: false, blockerReason: 'Criação de DB real bloqueada.' },
      { command: 'CREATE USER', domain: 'DATABASE', forbidden: true, executionAllowed: false, blockerReason: 'Criação de DB User bloqueada.' },
      { command: 'INSERT INTO fiscal_documents', domain: 'DATABASE', forbidden: true, executionAllowed: false, blockerReason: 'DML em tabelas fiscais reais bloqueado.' },
      { command: 'UPDATE fiscal_documents', domain: 'DATABASE', forbidden: true, executionAllowed: false, blockerReason: 'DML em tabelas fiscais reais bloqueado.' },
      { command: 'DELETE fiscal_documents', domain: 'DATABASE', forbidden: true, executionAllowed: false, blockerReason: 'DML em tabelas fiscais reais bloqueado.' },
      { command: 'vault kv put', domain: 'SECRET_VAULT', forbidden: true, executionAllowed: false, blockerReason: 'Escrita em Vault real bloqueada.' },
      { command: 'vault write', domain: 'SECRET_VAULT', forbidden: true, executionAllowed: false, blockerReason: 'Escrita em Vault real bloqueada.' },
      { command: 'openssl pkcs12', domain: 'CERTIFICATE', forbidden: true, executionAllowed: false, blockerReason: 'Tratamento de certificado real bloqueado.' },
      { command: 'node-forge', domain: 'CERTIFICATE', forbidden: true, executionAllowed: false, blockerReason: 'Tratamento de certificado real bloqueado.' },
      { command: 'xml-crypto', domain: 'XML_SIGNER', forbidden: true, executionAllowed: false, blockerReason: 'Assinatura XML real bloqueada.' },
      { command: 'sefazConnector.transmit', domain: 'SEFAZ', forbidden: true, executionAllowed: false, blockerReason: 'Chamada à SEFAZ real bloqueada.' },
      { command: 'SefazReal', domain: 'SEFAZ', forbidden: true, executionAllowed: false, blockerReason: 'Chamada à SEFAZ real bloqueada.' },
      { command: 'generate_pdf', domain: 'DANFE', forbidden: true, executionAllowed: false, blockerReason: 'Geração de PDF real bloqueada.' },
      { command: 'PDFKit', domain: 'DANFE', forbidden: true, executionAllowed: false, blockerReason: 'Geração de PDF real bloqueada.' },
      { command: 'Puppeteer', domain: 'DANFE', forbidden: true, executionAllowed: false, blockerReason: 'Geração de PDF real bloqueada.' }
    ];
  }
}
