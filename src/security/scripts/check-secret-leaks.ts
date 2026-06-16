import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const FORBIDDEN_FILE_PATS = [
  /\.env$/,
  /\.env\.local$/,
  /\.env\.production$/,
  /\.pfx$/,
  /\.pem$/,
  /\.key$/,
  /\.crt$/,
  /\.cer$/,
  /\.p12$/
];

const SIGNATURES = [
  'DATABASE_URL',
  'SUPABASE_SERVICE_ROLE',
  'service_role',
  'SECRET_KEY',
  'JWT_SECRET',
  'PRIVATE_KEY',
  'BEGIN PRIVATE KEY',
  'BEGIN RSA PRIVATE KEY',
  'PFX_PASSWORD',
  'CERTIFICATE_PASSWORD',
  'ASAAS_API_KEY',
  'STRIPE_SECRET',
  'MERCADO_PAGO_ACCESS_TOKEN',
  'SEFAZ_CERT',
  'NFE_CERT',
  'NFSE_PASSWORD'
];

let leaksCount = 0;

function getTrackedFiles(): string[] {
  try {
    const stdout = execSync('git ls-files', { encoding: 'utf8' });
    return stdout.split('\n').map(f => f.trim()).filter(f => f && f.length > 0);
  } catch (err) {
    // Fallback if git is not initialized or fails in some environments
    console.warn('⚠️  Subprocess "git" failed. Scanning all files in "src" directory instead.');
    const filesList: string[] = [];
    function walk(dir: string) {
      if (!fs.existsSync(dir)) return;
      const list = fs.readdirSync(dir);
      for (const item of list) {
        const fullPath = path.join(dir, item);
        if (
          item === 'node_modules' ||
          item === 'modules' ||
          item === 'dist' ||
          item === '.git' ||
          item === 'coverage' ||
          item === '.vite' ||
          (item.startsWith('.env') && item !== '.env.example')
        ) continue;
        if (fs.statSync(fullPath).isDirectory()) {
          walk(fullPath);
        } else {
          filesList.push(fullPath);
        }
      }
    }
    walk('.');
    return filesList;
  }
}

function maskSecret(text: string): string {
  // Mask URLs with credentials
  let masked = text.replace(/(postgresql?:\/\/)([^:]+):([^@]+)(@)/g, '$1***:***$4');
  
  // Mask generic private key pieces or long suspicious strings
  for (const sig of SIGNATURES) {
    const regex = new RegExp(`(${sig}\\s*[:=]\\s*['"\`])[^'"\`]{4,}(['"\`])`, 'gi');
    masked = masked.replace(regex, '$1****$2');
  }

  // Mask other potential keys
  masked = masked.replace(/(sk_live_[a-zA-Z0-9]{3,})/g, 'sk_live_****');
  masked = masked.replace(/(sk_test_[a-zA-Z0-9]{3,})/g, 'sk_test_****');

  return masked;
}

function runSecretsAudit() {
  console.log('🛡️  Rodando Secret Leak Scanner...\n');

  const files = getTrackedFiles();
  
  for (const file of files) {
    const filename = path.basename(file);
    
    // 1. Check for forbidden files committed in repository
    const isForbiddenFile = FORBIDDEN_FILE_PATS.some(regex => regex.test(file));
    if (isForbiddenFile) {
      console.error(`\n❌ SECRET_LEAK_DETECTED`);
      console.error(`- Arquivo proibido COMMITADO encontrado: ${file}`);
      console.error(`- Risco: Arquivos de variáveis de ambiente ou chaves criptográficas não podem ser versionados.`);
      console.error(`- Correção sugerida: Adicione "${filename}" ao seu .gitignore e remova de git usando "git rm --cached".`);
      leaksCount++;
      continue;
    }

    // Skip scanning binaries, package-lock, doc structures, and the scan/test suite itself
    if (
      file.includes('node_modules') ||
      file.includes('modules/') ||
      file.includes('dist/') ||
      file.includes('coverage/') ||
      file.includes('package-lock.json') ||
      file.includes('docs/') ||
      file.endsWith('.env.example') ||
      file.includes('src/legacy-quarantine/') ||
      file.includes('src/security/tests/') ||
      file.includes('src/security/scripts/check-secret-leaks.ts')
    ) {
      continue;
    }

    // Skip binary files by checking extension roughly
    if (/\.(png|jpg|jpeg|gif|ico|pdf|zip|gz|tar|pfx|p12|woff|woff2|eot|ttf)$/i.test(file)) {
      continue;
    }

    if (!fs.existsSync(file)) {
      continue;
    }

    // Read and scan file
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      // Avoid comments or imports of signatures
      const trimmed = line.trim();
      if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*') || trimmed.startsWith('import ')) {
        return;
      }

      // Check for raw connection strings
      if (/postgresql?:\/\/[a-zA-Z0-9_\-]+:[^@\s]+@[a-zA-Z0-9_\-\.]+/.test(line)) {
        // Double check it's not a placeholder
        if (!line.includes('[YOUR-PASSWORD]') && !line.includes('<password>') && !line.includes('YOUR_PASSWORD')) {
          console.error(`\n❌ SECRET_LEAK_DETECTED`);
          console.error(`- Arquivo: ${file}`);
          console.error(`- Linha: ${index + 1}`);
          console.error(`- Risco: String de conexão PostgreSQL crua com credenciais`);
          console.error(`- Código (Mascarado): ${maskSecret(trimmed)}`);
          console.error(`- Correção sugerida: Use variáveis de ambiente (process.env.DATABASE_URL) para injetar credenciais de banco.`);
          leaksCount++;
        }
      }

      // Check for hardcoded signatures assignments
      for (const sig of SIGNATURES) {
        // Watch for sig = "something" or sig : "something" (where something is not variable, placeholder, env, or too short)
        const assignmentRegex = new RegExp(`\\b${sig}\\b\\s*[:=]\\s*(['"\`])([^'"\`]+)\\1`, 'i');
        const match = trimmed.match(assignmentRegex);
        if (match) {
          const value = match[2];
          
          // Placeholders of variables we want to ignore
          const isPlaceholder = 
            value.startsWith('process.env.') ||
            value.startsWith('import.meta.env.') ||
            /^[A-Z0-9_]+$/.test(value) || // like DB_HOST, PG_URL (all uppercase might be an env mapping reference)
            value.includes('YOUR-') ||
            value.includes('YOUR_') ||
            value === '' ||
            value === '*' ||
            value === 'mock' ||
            value === 'sandbox' ||
            value.length < 5;

          if (!isPlaceholder) {
            console.error(`\n❌ SECRET_LEAK_DETECTED`);
            console.error(`- Arquivo: ${file}`);
            console.error(`- Linha: ${index + 1}`);
            console.error(`- Risco: Atribuição literal/hardcoded de dado sensível para "${sig}"`);
            console.error(`- Código (Mascarado): ${maskSecret(trimmed)}`);
            console.error(`- Correção sugerida: Externalize esta chave secreta para variáveis no arquivo .env.local.`);
            leaksCount++;
          }
        }
      }

      // Explicit check for begins private keys as a safety measure
      if (trimmed.includes('BEGIN PRIVATE KEY') || trimmed.includes('BEGIN RSA PRIVATE KEY')) {
        console.error(`\n❌ SECRET_LEAK_DETECTED`);
        console.error(`- Arquivo: ${file}`);
        console.error(`- Linha: ${index + 1}`);
        console.error(`- Risco: Chave privada detectada direta no código`);
        console.error(`- Código (Mascarado): ${maskSecret(trimmed)}`);
        console.error(`- Correção sugerida: Nunca amarra chaves privadas no código. Injete-as de forma externa.`);
        leaksCount++;
      }
    });
  }

  if (leaksCount > 0) {
    console.error(`\n❌ Falha na auditoria de segredos. Foram encontradas ${leaksCount} violações.`);
    process.exit(1);
  } else {
    console.log(`✅ Secret Scanner passou com sucesso. Nenhum segredo vazando.`);
    process.exit(0);
  }
}

// Only run if executing directly
if (process.argv[1] && fs.realpathSync(process.argv[1]) === fs.realpathSync(__filename)) {
  runSecretsAudit();
}

export { runSecretsAudit, SIGNATURES, FORBIDDEN_FILE_PATS, maskSecret };
