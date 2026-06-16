import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const REQUIRED_TABLES = [
  'companies',
  'users',
  'sales',
  'sale_items',
  'payments',
  'memberships',
  'auth_sessions',
  'auth_audit_logs',
  'password_reset_tokens'
];

let rlsErrors = 0;

function runRlsSchemaAudit() {
  console.log('🛡️  Rodando RLS Schema Static Gate...\n');

  const schemasDir = path.join('src', 'infrastructure', 'postgres', 'schema', 'local');
  if (!fs.existsSync(schemasDir)) {
    console.error(`\n❌ RLS_SCHEMA_GATE_FAILED`);
    console.error(`- Risco: Diretório de esquemas "${schemasDir}" não encontrado!`);
    process.exit(1);
  }

  const sqlFiles = fs.readdirSync(schemasDir).filter(f => f.endsWith('.sql'));
  let sqlContent = '';
  for (const file of sqlFiles) {
    sqlContent += fs.readFileSync(path.join(schemasDir, file), 'utf8') + '\n';
  }

  // 1. Verify "ALTER TABLE ... ENABLE ROW LEVEL SECURITY" for all required tables
  REQUIRED_TABLES.forEach(table => {
    const enableRegex = new RegExp(`ALTER\\s+TABLE\\s+${table}\\s+ENABLE\\s+ROW\\s+LEVEL\\s+SECURITY`, 'i');
    if (!enableRegex.test(sqlContent)) {
      console.error(`\n❌ RLS_SCHEMA_GATE_FAILED`);
      console.error(`- Detalhe: Tabela "${table}" não possui instrução de ENABLE ROW LEVEL SECURITY.`);
      console.error(`- Correção sugerida: Adicione "ALTER TABLE ${table} ENABLE ROW LEVEL SECURITY;" no seu arquivo SQL de esquema.`);
      rlsErrors++;
    }
  });

  // 2. Verify "ALTER TABLE ... FORCE ROW LEVEL SECURITY" for all required tables
  REQUIRED_TABLES.forEach(table => {
    const forceRegex = new RegExp(`ALTER\\s+TABLE\\s+${table}\\s+FORCE\\s+ROW\\s+LEVEL\\s+SECURITY`, 'i');
    if (!forceRegex.test(sqlContent)) {
      console.error(`\n❌ RLS_SCHEMA_GATE_FAILED`);
      console.error(`- Detalhe: Tabela "${table}" não possui instrução de FORCE ROW LEVEL SECURITY.`);
      console.error(`- Correção sugerida: Adicione "ALTER TABLE ${table} FORCE ROW LEVEL SECURITY;" no seu arquivo SQL de esquema.`);
      rlsErrors++;
    }
  });

  // 3. Verify policies for companies table (isolated by id, has USING & WITH CHECK)
  const hasUsingAndCheckCompanies = 
    sqlContent.toLowerCase().includes('using') &&
    sqlContent.toLowerCase().includes('with check') &&
    /companies/i.test(sqlContent);

  if (!hasUsingAndCheckCompanies) {
    console.error(`\n❌ RLS_SCHEMA_GATE_FAILED`);
    console.error(`- Detalhe: Políticas de segurança para a tabela "companies" não foram identificadas ou estão incompletas.`);
    rlsErrors++;
  }

  // 4. Verify policies for other required tables (isolated by company_id, has USING & WITH CHECK)
  REQUIRED_TABLES.filter(t => t !== 'companies').forEach(table => {
    const tableInDynamicBlockRegex = new RegExp(`'${table}'`, 'i');
    const isInDynamicLoop = tableInDynamicBlockRegex.test(sqlContent);

    const hasExplicitPolicy = new RegExp(`CREATE\\s+POLICY\\s+\\w+\\s+ON\\s+${table}`, 'i').test(sqlContent);
    const tableSqlSegment = sqlContent.split(new RegExp(`CREATE\\s+POLICY\\s+\\w+\\s+ON\\s+${table}`, 'i'))[1] || '';
    const hasUsingAndCheckExplicit = tableSqlSegment.toLowerCase().includes('using') && tableSqlSegment.toLowerCase().includes('with check');

    if (!isInDynamicLoop && !(hasExplicitPolicy && hasUsingAndCheckExplicit)) {
      console.error(`\n❌ RLS_SCHEMA_GATE_FAILED`);
      console.error(`- Detalhe: Tabela "${table}" não possui políticas de RLS válidas (USING e WITH CHECK) configuradas.`);
      rlsErrors++;
    }
  });

  if (rlsErrors > 0) {
    console.error(`\n❌ Falha na validação das regras estáticas de RLS. Foram encontradas ${rlsErrors} inconsistências.`);
    process.exit(1);
  } else {
    console.log(`✅ RLS Schema Static Gate passou com sucesso. RLS habilitado e forçado para todas as tabelas sensíveis.`);
    process.exit(0);
  }
}

// Only run if executing directly
if (process.argv[1] && fs.realpathSync(process.argv[1]) === fs.realpathSync(__filename)) {
  runRlsSchemaAudit();
}

export { runRlsSchemaAudit };
