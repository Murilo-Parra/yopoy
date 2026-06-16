const fs = require('fs');

let code = fs.readFileSync('sefazConnector.ts', 'utf8');

// Patch checkServiceStatus
code = code.replace(/\/\/ Simular uma requisição SOAP HTTP Real à SEFAZ correspondente[\s\S]+?(?=return \{)/, `
    // [REAL_SEFAZ_INTEGRATION]
    let isOnline = false;
    let fallbackMessage = "Servidor Offline ou Timeout";
    let status = 108;
    
    try {
      // Usando chamada HTTP pura (não SOAP completo) para testar se a porta está aberta respondendo
      // Uma solicitação GET real no endpoint WSDL pode ser suficiente para verificar
      await import('axios').then(axios => axios.default.head(config.urlStatus + "?wsdl", { timeout: 8000 }));
      isOnline = true;
      status = 107;
      fallbackMessage = "Servico em Operacao (SEFAZ Autorizadora Ativa)";
    } catch (e: any) {
      // Se retornar erro TLS ou Autorização 403, a SEFAZ está online e bloqueando sem certificado (o que é normal)
      if (e.message.includes('certificates') || e.message.includes('socket') || e.message.includes('tls') || e.response?.status === 403 || e.response?.status === 500) {
        isOnline = true; // Porta respondeu com TLS!
        status = 107;
        fallbackMessage = "Servico em Operacao (SEFAZ Autorizadora Ativa)";
      }
    }
    const responseTime = Date.now() - start;

`);

fs.writeFileSync('sefazConnector.ts', code, 'utf8');
console.log("Patched checkServiceStatus successfully.");
