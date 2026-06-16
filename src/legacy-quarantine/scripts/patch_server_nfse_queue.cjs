const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

if (!code.includes('NfseQueueManager')) {
  code = `import { NfseQueueManager } from './src/utils/nfse/NfseQueueManager';\n` + code;
}

code = code.replace(/async function bootstrapServer\(\) \{/, `async function bootstrapServer() {
  // Start Event Monitor for NFSE (Retry / Circuit Breaker)
  setInterval(() => {
    NfseQueueManager.processQueue();
  }, 30000); // 30s
`);

fs.writeFileSync('server.ts', code, 'utf8');
console.log("Patched server.ts with NfseQueueManager");
