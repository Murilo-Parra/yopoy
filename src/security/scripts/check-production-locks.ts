import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const LOCKED_KEYS = [
  'YOPOY_PRODUCTION_V2_ENABLED',
  'PRODUCTION_V2',
  'SEFAZ_REAL_ENABLED',
  'SEFAZ_PRODUCTION',
  'NFE_PRODUCTION',
  'NFCE_PRODUCTION',
  'NFSE_PRODUCTION',
  'PAYMENT_GATEWAY_LIVE',
  'GATEWAY_LIVE',
  'ASAAS_LIVE',
  'STRIPE_LIVE',
  'MERCADO_PAGO_LIVE'
];

const ALLOWED_VALUES = [
  'false',
  'sandbox',
  'mock',
  'dry-run',
  'disabled'
];

let lockViolations = 0;

function walk(dir: string, callback: (filePath: string) => void) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const p = path.join(dir, file);
    if (
      file === 'node_modules' ||
      file === 'modules' ||
      file === 'dist' ||
      file === '.git' ||
      file === 'coverage' ||
      file === '.vite' ||
      p.includes('src/security/scripts') ||
      p.includes('src/security/tests')
    ) {
      continue;
    }
    if (fs.statSync(p).isDirectory()) {
      walk(p, callback);
    } else {
      callback(p);
    }
  }
}

function checkLocksInFile(filePath: string) {
  // Only scan text files
  if (/\.(png|jpg|jpeg|gif|ico|pdf|zip|gz|tar|pfx|p12|woff|woff2|eot|ttf)$/i.test(filePath)) {
    return;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) {
      return;
    }

    LOCKED_KEYS.forEach(key => {
      // Look for key = value or key : value or KEY=value inside JSON, .env, ts, js, etc.
      const matchRegex = new RegExp(`\\b${key}\\b\\s*[:=]\\s*['"\`]?([a-zA-Z0-9_\-]+)['"\`]?`, 'i');
      const match = trimmed.match(matchRegex);
      if (match) {
        const val = match[1].toLowerCase();
        if (!ALLOWED_VALUES.includes(val)) {
          console.error(`\n❌ PRODUCTION_LOCK_VIOLATION`);
          console.error(`- Arquivo: ${filePath}`);
          console.error(`- Linha: ${index + 1}`);
          console.error(`- Risco: Ativação indevida de ambiente de produção, SEFAZ real ou Gateway de pagamento real`);
          console.error(`- Chave detectada: ${key}`);
          console.error(`- Valor proibido: ${match[1]}`);
          console.error(`- Código: ${trimmed}`);
          console.error(`- Coreção sugerida: Mantenha apenas valores simulados/sandbox: ${ALLOWED_VALUES.join(', ')}.`);
          lockViolations++;
        }
      }
    });
  });
}

function runProductionLocksAudit() {
  console.log('🛡️  Rodando Production/SEFAZ/Payment Lock Scanner...\n');
  
  walk('.', checkLocksInFile);

  if (lockViolations > 0) {
    console.error(`\n❌ Falha na auditoria de travas de produção. Foram encontradas ${lockViolations} violações.`);
    process.exit(1);
  } else {
    console.log(`✅ Production Locks audit passou com sucesso. Produção, SEFAZ real e gateway real continuam bloqueados.`);
    process.exit(0);
  }
}

// Only run if executing directly
if (process.argv[1] && fs.realpathSync(process.argv[1]) === fs.realpathSync(__filename)) {
  runProductionLocksAudit();
}

export { runProductionLocksAudit, LOCKED_KEYS, ALLOWED_VALUES };
