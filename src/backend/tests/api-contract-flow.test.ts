import { createServerAppContainer } from '../../composition/createServerAppContainer';
import { randomUUID } from 'crypto';

async function run() {
  console.log('--- TEST: API Contract Flow ---');

  const container = createServerAppContainer('in-memory');
  const salesHandlers = container.handlers.sales;
  const payHandlers = container.handlers.payments;

  const context = {
    companyId: randomUUID(),
    userId: randomUUID(),
    requestId: randomUUID()
  };

  // 1. POST createSale
  const createSaleRes = await salesHandlers.handleCreateSale(context, {});
  if (createSaleRes.statusCode !== 201) throw new Error('API CreateSale Failed');
  const saleId = createSaleRes.body.success ? (createSaleRes.body.data as any).id : null;
  console.log('✅ API POST /sales:', saleId);

  // 2. POST registerPayment
  const createPayRes = await payHandlers.handleRegisterPayment(context, { amount: 100, method: 'PIX' });
  if (createPayRes.statusCode !== 201) throw new Error('API RegisterPayment Failed');
  const payId = createPayRes.body.success ? (createPayRes.body.data as any).id : null;
  console.log('✅ API POST /payments:', payId);

  // 3. POST linkPaymentToSale
  const linkRes = await payHandlers.handleLinkToSale(context, payId!, { saleId });
  if (linkRes.statusCode !== 200) throw new Error(`API LinkPayment Failed: ${JSON.stringify(linkRes.body)}`);
  console.log('✅ API POST /payments/:id/link-sale');

  // Check Isolation
  const contextOther = { companyId: randomUUID(), userId: randomUUID(), requestId: randomUUID() };
  const getSaleRes = await salesHandlers.handleGetSale(contextOther, saleId!);
  if (getSaleRes.statusCode !== 404) throw new Error('Tenant isolation failed in API');
  console.log('✅ Tenant Isolation: 404 returned for other company');
}

run().catch(console.error);
