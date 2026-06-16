export class AuthError extends Error {
  constructor(public readonly code: string, message: string) {
    super(message);
    this.name = 'AuthError';
    Object.setPrototypeOf(this, AuthError.prototype);
  }
}

export class AuthInvalidCredentialsError extends AuthError {
  constructor() {
    super('AUTH_INVALID_CREDENTIALS', 'Credenciais inválidas.');
  }
}

export class AuthUserLockedError extends AuthError {
  constructor(message = 'Usuário bloqueado temporariamente.') {
    super('AUTH_USER_LOCKED', message);
  }
}

export class AuthUserDisabledError extends AuthError {
  constructor() {
    super('AUTH_USER_DISABLED', 'Conta de usuário desativada.');
  }
}

export class AuthMembershipNotFoundError extends AuthError {
  constructor() {
    super('AUTH_MEMBERSHIP_NOT_FOUND', 'Vínculo do usuário com a empresa não localizado.');
  }
}

export class AuthSessionInvalidError extends AuthError {
  constructor() {
    super('AUTH_SESSION_INVALID', 'Sessão inválida ou não encontrada.');
  }
}

export class AuthSessionExpiredError extends AuthError {
  constructor() {
    super('AUTH_SESSION_EXPIRED', 'Sessão expirada.');
  }
}

export class AuthPermissionDeniedError extends AuthError {
  constructor() {
    super('AUTH_PERMISSION_DENIED', 'Acesso negado. Permissão insuficiente.');
  }
}

export class AuthValidationError extends AuthError {
  constructor(message: string) {
    super('AUTH_VALIDATION_ERROR', message);
  }
}
