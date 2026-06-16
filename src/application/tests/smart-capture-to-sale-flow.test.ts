import { createServerAppContainer } from '../../composition/createServerAppContainer';
import { generateUUID as randomUUID } from '../shared';

async function run() {
  console.log('--- TEST: Flow 2 (Capture -> Review -> Sale -> Audit) ---');

  const container = createServerAppContainer('in-memory');
  const useCases = container.useCases;
  const repos = container.repositories;

  const companyId = randomUUID();
  const userId = randomUUID();

  // 1. Capture
  const captureResult = await useCases.createSmartCaptureDraft({ companyId, userId, rawText: '1x Coca 5.00' });
  if (!captureResult.success) throw new Error('Capture failed');
  const draftId = captureResult.data.id;
  console.log('✅ Capture created:', draftId);

  // 2. Review
  const reviewResult = await useCases.reviewSmartCaptureDraft({ companyId, userId, draftId });
  if (!reviewResult.success) throw new Error('Review failed');
  console.log('✅ Capture reviewed');

  // 3. Convert
  const convertResult = await useCases.convertSmartCaptureDraftToSale({ companyId, userId, draftId, totalAmount: 5 });
  if (!convertResult.success) throw new Error('Convert failed');
  console.log('✅ Capture converted to Sale:', convertResult.data.id);

  console.log('--- TEST 2 SUCCESS ---');
}

run().catch(console.error);

