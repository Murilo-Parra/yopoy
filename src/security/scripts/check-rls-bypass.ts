import * as fs from 'fs';
import * as path from 'path';

const FORBIDDEN_PATTERNS = [
  { label: 'SET row_security', regex: /SET\s+row_security/i },
  { label: 'row_security = off', regex: /row_security\s*=\s*['" ]*off/i },
  { label: 'BYPASSRLS', regex: /BYPASSRLS/i },
  { label: 'DISABLE ROW LEVEL SECURITY', regex: /DISABLE\s+ROW\s+LEVEL\s+SECURITY/i }
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
  // Always skip checking this file itself to avoid matching its own constants
  if (filePath.endsWith('check-rls-bypass.ts')) {
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    FORBIDDEN_PATTERNS.forEach(pattern => {
      if (pattern.regex.test(line)) {
        console.error(`\n❌ RLS_BYPASS_FORBIDDEN`);
        console.error(`- Arquivo: ${filePath}`);
        console.error(`- Linha: ${index + 1}`);
        console.error(`- Termo proibido: ${pattern.label}`);
        console.error(`- Código: ${line.trim()}`);
        console.error(`- Correção sugerida: O Yopoy proíbe qualquer bypass de RLS no código-fonte.\n`);
        violations++;
      }
    });
  });
}

function runBypassAudit() {
  console.log('🛡️  Rodando RLS Bypass Static Scanner...\n');

  walk('src', checkFile);

  if (violations > 0) {
    console.error(`\n❌ Falha na auditoria de bypass de RLS. Foram encontradas ${violations} violações.`);
    process.exit(1);
  } else {
    console.log(`✅ RLS Bypass Static Scanner passou com sucesso. Zero bypasses detectados.`);
    process.exit(0);
  }
}

runBypassAudit();
