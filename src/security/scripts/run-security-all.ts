import { execSync } from 'child_process';

const SECURITY_CHECKS = [
  { name: 'Frontend/Backend Boundary Audit', cmd: 'npx tsx src/security/scripts/check-frontend-boundary.ts' },
  { name: 'Secret Leak Scanner', cmd: 'npx tsx src/security/scripts/check-secret-leaks.ts' },
  { name: 'Production Locks Audit', cmd: 'npx tsx src/security/scripts/check-production-locks.ts' },
  { name: 'RLS Schema Gate', cmd: 'npx tsx src/security/scripts/check-rls-schema.ts' },
  { name: 'Dependency Audit Gate', cmd: 'npx tsx src/security/scripts/check-dependency-audit.ts' }
];

function runAllSecurityGates() {
  console.log('================================================================');
  console.log('🛡️  INICIANDO YOPOY SECURITY GATE COMPLETO...');
  console.log('================================================================\n');

  for (const check of SECURITY_CHECKS) {
    console.log(`\n▶️ Executando check: ${check.name} (${check.cmd})...`);
    console.log('----------------------------------------------------------------');
    try {
      execSync(check.cmd, { stdio: 'inherit' });
      console.log(`✔️  PASS: ${check.name}`);
    } catch (err) {
      console.error(`\n❌ FAILED: ${check.name} falhou.`);
      console.log('\n================================================================');
      console.error('❌ Yopoy Security Gate failed.');
      console.log('================================================================');
      process.exit(1);
    }
  }

  console.log('\n================================================================');
  console.log('✅ Yopoy Security Gate passed.');
  console.log('================================================================');
  process.exit(0);
}

runAllSecurityGates();
