import { RequestContext } from '../backend/shared/RequestContext';

export const devRequestContext: RequestContext = {
  companyId: 'company_demo_001',
  userId: 'user_demo_owner',
  requestId: crypto.randomUUID()
};
