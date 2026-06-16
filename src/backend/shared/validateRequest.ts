export type ValidationResult<T> = {
  success: boolean;
  data?: T;
  errors?: Record<string, string>;
};

export function validateRequired(obj: any, fields: string[]): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const field of fields) {
    if (obj[field] === undefined || obj[field] === null || obj[field] === '') {
      errors[field] = 'This field is required';
    }
  }
  return errors;
}
