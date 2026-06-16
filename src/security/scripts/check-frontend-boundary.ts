import * as fs from 'fs';
import * as path from 'path';

// Allowed extensions
const FRONTEND_EXTENSIONS = ['.tsx', '.jsx', '.ts', '.js'];

// Folders that represent frontend contexts initially
const FRONTEND_DIRS = [
  'src/components',
  'src/pages',
  'src/hooks',
  'src/ui',
  'src/client',
  'src/views',
];

// Always process React entry files
const ENTRY_FILES = ['src/main.tsx', 'src/App.tsx', 'src/index.tsx', 'src/vite-env.d.ts'];

const PROHIBITED_MODULES = [
  'pg',
  'pg-pool',
  'fs',
  'path',
  'net',
  'tls',
  'dns',
  'child_process',
  'node-forge',
  'xml-crypto',
  '@xmldom/xmldom'
];

const PROHIBITED_PATHS = [
  'infrastructure/postgres',
  'infrastructure/fiscal',
  'infrastructure/payment',
  'security/server',
  'composition/createAppContainer',
  'composition/createServerAppContainer'
];

const PROHIBITED_ENV = [
  'DATABASE_URL',
  'SERVICE_ROLE',
  'SUPABASE_SERVICE_ROLE',
  'PFX_PASSWORD',
  'CERTIFICATE_PASSWORD',
];

let violations = 0;

function walk(dir: string, callback: (filePath: string) => void) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const p = path.join(dir, file);
    if (fs.statSync(p).isDirectory()) {
      walk(p, callback);
    } else {
      callback(p);
    }
  }
}

function checkFile(filePath: string) {
  const isFrontendDir = FRONTEND_DIRS.some(d => filePath.startsWith(d)) || filePath.startsWith('src/frontend-api');
  const isEntryFile = ENTRY_FILES.some(f => filePath === f);
  
  if (!isFrontendDir && !isEntryFile) {
    return;
  }

  if (!FRONTEND_EXTENSIONS.some(ext => filePath.endsWith(ext))) {
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    const isImport = line.includes('import ') || line.includes('require(');
    const usesEnv = line.includes('process.env') || line.includes('import.meta.env');

    if (isImport || usesEnv) {
      PROHIBITED_MODULES.forEach(prohibited => {
        const isExactImportMatch = new RegExp(`['"\`]${prohibited}['"\`]`).test(line);
        if (isImport && isExactImportMatch) {
          logViolation(filePath, index, prohibited, line, 'Módulo Node/Backend direto');
        }
      });

      PROHIBITED_PATHS.forEach(prohibited => {
        if (isImport && line.includes(prohibited)) {
          logViolation(filePath, index, prohibited, line, 'Importação de código exclusivo de servidor (server-only)');
        }
      });

      PROHIBITED_ENV.forEach(prohibited => {
        const isEnvMatch = new RegExp(`\\b${prohibited}\\b`).test(line);
        if (usesEnv && isEnvMatch) {
          logViolation(filePath, index, prohibited, line, 'Uso de variável de ambiente secreta no frontend');
        }
      });
    }
  });
}

function logViolation(filePath: string, index: number, prohibited: string, line: string, context: string) {
  console.error('\n❌ FRONTEND_BACKEND_BOUNDARY_VIOLATION');
  console.error(`- Arquivo: ${filePath}`);
  console.error(`- Linha: ${index + 1}`);
  console.error(`- Contexto: ${context}`);
  console.error(`- Termo proibido: ${prohibited}`);
  console.error(`- Código: ${line.trim()}`);
  console.error(`- Correção sugerida: Mova esta lógica para o backend e faça requisições HTTP do frontend.\n`);
  violations++;
}

function runAudit() {
  console.log('🛡️  Rodando Frontend/Backend Boundary Audit...\n');

  walk('src', checkFile);
  
  // also check root if there are some specific entry points logic that we missed, but just walk src.
  ENTRY_FILES.forEach(file => {
    if (fs.existsSync(file) && !file.startsWith('src/')) {
       checkFile(file);
    }
  });

  if (violations > 0) {
    console.error(`\n❌ Falha na auditoria. Foram encontradas ${violations} violações de fronteira.`);
    process.exit(1);
  } else {
    console.log(`✅ Frontend Boundary Audit passou com sucesso. Código limpo.`);
    process.exit(0);
  }
}

runAudit();
