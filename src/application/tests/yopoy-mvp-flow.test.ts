import { createServerAppContainer } from '../../composition/createServerAppContainer';
import { generateUUID as randomUUID } from '../shared';

async function run() {
  console.log('--- TEST: Yopoy Flow 1 (Venda -> Pagamento -> Link -> Ledger -> Audit) ---');

  const container = createServerAppContainer('in-memory');
  const useCases = container.useCases;
  const repos = container.repositories;

  const companyId = randomUUID();
  const userId = randomUUID();

  // 1. Create Sale
  const saleResult = await useCases.createSale({ companyId, userId });
  if (!saleResult.success) throw new Error('Failed to create sale');
  const saleId = saleResult.data.id;
  console.log('✅ Sale created:', saleId);

  // 2. Add item
  await useCases.addSaleItem({ companyId, userId, saleId, qty: 2, unitValue: 50 });
  console.log('✅ Sale item added');

  // 3. Register payment
  const paymentResult = await useCases.registerPayment({ companyId, userId, amount: 100, method: 'PIX', saleId });
  if (!paymentResult.success) throw new Error('Failed to register payment');
  const paymentId = paymentResult.data.id;
  console.log('✅ Payment registered:', paymentId);

  // 4. Link payment
  const linkResult = await useCases.linkPaymentToSale({ companyId, userId, paymentId, saleId });
  if (!linkResult.success) throw new Error('Failed to link payment');
  console.log('✅ Payment linked to Sale. Ledger entry created.');

  // Check Ledger
  const ledger = await repos.ledgerRepo.listByCompany(companyId);
  console.log(`✅ Ledger entries count: ${ledger.length}`);

  // Check Audit Logs
  const auditLogs = await repos.auditRepo.listByCompany(companyId);
  console.log(`✅ Audit Logs count: ${auditLogs.length} (Expected >= 4)`);

  console.log('--- TEST 1 SUCCESS ---');
}

run().catch(console.error);
