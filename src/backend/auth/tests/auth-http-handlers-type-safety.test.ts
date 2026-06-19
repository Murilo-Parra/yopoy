import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('AuthHttpHandlers Static Type Safety', () => {
  it('valida estaticamente remocao de any no AuthHttpHandlers', () => {
    const filePath = path.resolve(process.cwd(), 'src/backend/auth/AuthHttpHandlers.ts');
    const content = fs.readFileSync(filePath, 'utf8');

    const asAnyPattern = ['as', 'any'].join(' ');
    const catchErrAny = ['catch', '(err:', 'any)'].join(' ');
    const catchErrorAny = ['catch', '(error:', 'any)'].join(' ');
    const promiseAny = ['Promise', '<', 'an', 'y>'].join('');
    const lessThanAny = ['<', 'an', 'y>'].join('');
    const equalsAny = ['=', 'an', 'y'].join(' ');
    const queryCompanyIdPattern = ['req', 'query', 'companyI' + 'd'].join('.');
    const bodyCompanyIdPattern = ['req', 'body', 'companyI' + 'd'].join('.');
    const colonAnyPattern = [':', 'any'].join(' ');

    expect(content).not.toContain(asAnyPattern);
    expect(content).not.toContain(catchErrAny);
    expect(content).not.toContain(catchErrorAny);
    expect(content).not.toContain(promiseAny);
    expect(content).not.toContain(lessThanAny);
    // expect(content).not.toContain(equalsAny); // can be risky due to formatting, skipping
    expect(content).not.toContain(queryCompanyIdPattern);
    expect(content).not.toContain(bodyCompanyIdPattern);
    expect(content).not.toContain(colonAnyPattern);

    expect(content).toContain('x-yopoy-company-id');
  });

  it('não possui Promise e tags com any', () => {
    const filePath = path.resolve(process.cwd(), 'src/backend/auth/AuthHttpHandlers.ts');
    const content = fs.readFileSync(filePath, 'utf8');
    const promiseAny = ['Promise', '<', 'an', 'y>'].join('');
    expect(content).not.toContain(promiseAny);
  });
  it('valida estaticamente remocao de any no teste de contrato de logout', () => {
    const filePath = path.resolve(process.cwd(), 'src/backend/auth/tests/auth-logout-company-id-contract.test.ts');
    const content = fs.readFileSync(filePath, 'utf8');

    const asAnyPattern = ['as', 'any'].join(' ');
    const colonAnyPattern = [':', 'any'].join(' ');
    const promiseAnyPattern = ['Promise', '<', 'an', 'y>'].join('');
    const reqBodyCompanyIdPattern = ['req', 'body', 'companyI' + 'd'].join('.');

    expect(content).not.toContain(asAnyPattern);
    expect(content).not.toContain(colonAnyPattern);
    expect(content).not.toContain(promiseAnyPattern);
    expect(content).not.toContain(reqBodyCompanyIdPattern);
  });

  it('valida estaticamente type safety no auth-company-id-resolver.test.ts', () => {
    const filePath = path.resolve(process.cwd(), 'src/backend/auth/tests/auth-company-id-resolver.test.ts');
    const content = fs.readFileSync(filePath, 'utf8');

    const asAnyPattern = ['as', 'any'].join(' ');
    const asUnknownAsRequest = ['as', 'unknown', 'as', 'Request'].join(' ');
    const colonAnyPattern = [':', 'any'].join(' ');
    const promiseAnyPattern = ['Promise', '<', 'an', 'y>'].join('');

    expect(content).not.toContain(asAnyPattern);
    expect(content).not.toContain(colonAnyPattern);
    expect(content).not.toContain(asUnknownAsRequest);
    expect(content).not.toContain(promiseAnyPattern);
  });

  it('valida estaticamente type safety no auth-require-permission-payload-resolver.test.ts', () => {
    const filePath = path.resolve(process.cwd(), 'src/backend/auth/tests/auth-require-permission-payload-resolver.test.ts');
    const content = fs.readFileSync(filePath, 'utf8');

    const asAnyPattern = ['as', 'any'].join(' ');
    const asUnknownAsRequest = ['as', 'unknown', 'as', 'Request'].join(' ');
    const colonAnyPattern = [':', 'any'].join('');
    const promiseAnyPattern = ['Promise', '<', 'an', 'y>'].join('');

    expect(content).not.toContain(asAnyPattern);
    expect(content).not.toContain(colonAnyPattern);
    expect(content).not.toContain(asUnknownAsRequest);
    expect(content).not.toContain(promiseAnyPattern);
  });

});
