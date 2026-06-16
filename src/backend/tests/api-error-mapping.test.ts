import { RequestContext } from '../shared/RequestContext';
import { createServerAppContainer } from '../../composition/createServerAppContainer';
import { randomUUID } from 'crypto';

async function run() {
  console.log('--- TEST: API Error Mapping and Fiscal Block ---');

  const container = createServerAppContainer('in-memory');
  const handlers = container.handlers.draftInvoices;

  const context: RequestContext = {
    companyId: randomUUID(),
    userId: randomUUID(),
    requestId: randomUUID()
  };

  const fakeDraftId = randomUUID();

  // Test SEFAZ block
  const blockRes = await handlers.handleAttemptRealFiscalEmission(context, fakeDraftId);
  if (blockRes.statusCode !== 403 || blockRes.body.success !== false || (blockRes.body as any).error.code !== 'FISCAL_ACTION_BLOCKED') {
    throw new Error('Fiscal block failed');
  }
  console.log('✅ Fiscal Action Blocked successfully (403 returned)');

  // Test 404 mapping
  const createRes = await handlers.handleCreateDraftFromSale(context, { saleId: randomUUID() });
  if (createRes.statusCode !== 404 || (createRes.body as any).error.code !== 'NOT_FOUND') {
    throw new Error('Error mapping failed for NOT_FOUND');
  }
  console.log('✅ Error Mapping NOT_FOUND successfully (404 returned)');
}

run().catch(console.error);

