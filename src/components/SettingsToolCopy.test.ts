import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const settingsSource = () =>
  readFileSync(resolve(__dirname, 'SettingsTool.tsx'), 'utf8');

describe('copy de backup e reset local do SettingsTool', () => {
  it('explica que backup, importação e reset são locais e sensíveis', () => {
    const source = settingsSource();

    expect(source).toMatch(/backup local/i);
    expect(source).toMatch(/arquivo local/i);
    expect(source).toMatch(/importação local/i);
    expect(source).toMatch(/restauração local/i);
    expect(source).toMatch(/substitui dados locais/i);
    expect(source).toMatch(/apaga dados locais/i);
    expect(source).toMatch(/ação sensível/i);
    expect(source).toMatch(/ação destrutiva/i);
    expect(source).toMatch(/exporte um backup local/i);
    expect(source).toMatch(/não sincroniza com servidor/i);
    expect(source).toMatch(/não é backup em nuvem/i);
  });

  it('não promete recuperação, nuvem ou restauração sem risco', () => {
    const source = settingsSource();

    expect(source).not.toMatch(/backup em nuvem (ativo|automático|disponível)/i);
    expect(source).not.toMatch(/sincronização automática/i);
    expect(source).not.toMatch(/restauração segura/i);
    expect(source).not.toMatch(/recuperar dados apagados/i);
    expect(source).not.toMatch(/reset sem risco/i);
    expect(source).not.toMatch(/backup seguro/i);
  });
});
