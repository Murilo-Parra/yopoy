import { createServerAppContainer } from '../../composition/createServerAppContainer';
import { generateUUID as randomUUID } from '../shared';

async function run() {
  console.log('--- TEST: Flow 4 (Payment Without Sale -> Pending -> Link) ---');

  const container = createServerAppContainer('in-memory');
  const useCases = container.useCases;
  const repos = container.repositories;

  const companyId = randomUUID();
  const userId = randomUUID();

  // 1. Payment created with no sale attached
  const paymentResult = await useCases.registerPayment({ companyId, userId, amount: 50, method: 'PIX' });
  if (!paymentResult.success) throw new Error('Payment failed');
  console.log('✅ Orphan Payment Registered');

  // Should have generated 1 pending item
  const pending = await repos.pendingRepo.listByCompany(companyId);
  if (pending.length !== 1) throw new Error('Pending item missing');
  console.log('✅ Pending item generated:', pending[0].id);

  // 2. Later, a sale is created
  const saleResult = await useCases.createSale({ companyId, userId });
  if (!saleResult.success) throw new Error();

  // 3. User links them
  const linkResult = await useCases.linkPaymentToSale({ companyId, userId, paymentId: paymentResult.data.id, saleId: saleResult.data.id });
  if (!linkResult.success) throw new Error();
  console.log('✅ Link established later');

  // 4. Resolve the pending item
  const resolveResult = await useCases.resolvePendingItem({ companyId, userId, itemId: pending[0].id });
  if (!resolveResult.success) throw new Error();
  console.log('✅ Pending item marked as CLOSED');

  console.log('--- TEST 4 SUCCESS ---');
}

run().catch(console.error);

