import { AppContainer } from '../composition/types';
import { RequestContext } from '../backend/shared/RequestContext';
import { YopoyFrontendClient } from './YopoyFrontendClient';

export function createYopoyFrontendClient(container: AppContainer, context: RequestContext): YopoyFrontendClient {
  return new YopoyFrontendClient(container, context);
}
