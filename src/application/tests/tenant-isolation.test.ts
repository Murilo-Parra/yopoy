import { createServerAppContainer } from '../../composition/createServerAppContainer';
import { generateUUID as randomUUID } from '../shared';

async function run() {
  console.log('--- TEST: Flow 5 (Tenant Isolation) ---');

  const container = createServerAppContainer('in-memory');
  const useCases = container.useCases;
  const repos = container.repositories;

  const companyA = randomUUID();
  const companyB = randomUUID();
  const userId = randomUUID();

  // Company A creates sale
  await useCases.createSale({ companyId: companyA, userId });

  // Try to list by company B
  const salesB = await repos.saleRepo.listByCompany(companyB);
  if (salesB.length > 0) throw new Error('Isolaton failed');
  
  console.log('✅ List sales in Company B returned 0 (Expected 0)');
  console.log('--- TEST 5 SUCCESS ---');
}

run().catch(console.error);

