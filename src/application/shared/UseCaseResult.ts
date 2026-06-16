import { ApplicationError } from './ApplicationError';

export type UseCaseResult<T = void> = {
  success: boolean;
  data?: T;
  error?: ApplicationError;
};

export function success<T>(data: T): UseCaseResult<T> {
  return { success: true, data };
}

export function failure<T = void>(error: ApplicationError): UseCaseResult<T> {
  return { success: false, error };
}
