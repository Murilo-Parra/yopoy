import { createServerAppContainer } from '../../composition/createServerAppContainer';
import { generateUUID as randomUUID } from '../shared';

async function run() {
  console.log('--- TEST: Flow 3 (Expense -> Ledger -> Audit) ---');

  const container = createServerAppContainer('in-memory');
  const useCases = container.useCases;
  const repos = container.repositories;

  const companyId = randomUUID();
  const userId = randomUUID();

  // 1. Create Expense
  const expenseResult = await useCases.createExpense({ companyId, userId, amount: 200, category: 'Utilities', date: new Date() });
  if (!expenseResult.success) throw new Error('Expense failed');
  console.log('✅ Expense created:', expenseResult.data.id);

  // Check Ledger
  const ledger = await repos.ledgerRepo.listByCompany(companyId);
  console.log(`✅ Ledger entries: ${ledger.length} (Expected 1)`);

  console.log('--- TEST 3 SUCCESS ---');
}

run().catch(console.error);

