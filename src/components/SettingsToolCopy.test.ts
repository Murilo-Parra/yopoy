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

describe('copy de usuários locais do SettingsTool', () => {
  it('explica que usuários, senhas e permissões são locais e demonstrativos', () => {
    const source = settingsSource();

    expect(source).toMatch(/usuários locais/i);
    expect(source).toMatch(/permissões locais/i);
    expect(source).toMatch(/controle demonstrativo/i);
    expect(source).toMatch(/dados são salvos neste navegador|salvos neste navegador/i);
    expect(source).toMatch(/não substituem? autenticação real/i);
    expect(source).toMatch(/não é segurança de produção|não.*segurança de produção/i);
    expect(source).toMatch(/não usar senhas reais/i);
    expect(source).toMatch(/senhas locais demonstrativas/i);
    expect(source).toMatch(/perfis locais/i);
  });

  it('não promete IAM, credenciais seguras ou segurança de produção', () => {
    const source = settingsSource();

    expect(source).not.toMatch(/IAM empresarial/i);
    expect(source).not.toMatch(/autenticação segura/i);
    expect(source).not.toMatch(/senha protegida/i);
    expect(source).not.toMatch(/credenciais seguras/i);
    expect(source).not.toMatch(/controle empresarial completo/i);
    expect(source).not.toMatch(/acesso seguro/i);
  });

  it('oculta visualmente a senha local sem prometer proteção operacional', () => {
    const source = settingsSource();

    expect(source).toMatch(/Senha local demonstrativa[\s\S]*type="password"/i);
    expect(source).toMatch(/Senha local demonstrativa ocultada visualmente/i);
    expect(source).toMatch(/Dado local demonstrativo ocultado na tela/i);
    expect(source).not.toMatch(/>\{user\.password\}<\/td>/i);
    expect(source).not.toMatch(/senha protegida|credencial segura|autenticação real por usuário local/i);
  });
});

describe('labels internos de permissões do SettingsTool', () => {
  it('usa os nomes atuais do App para módulos e permissões locais', () => {
    const source = settingsSource();

    expect(source).toMatch(/Painel de Controle/i);
    expect(source).toMatch(/Organização local/i);
    expect(source).toMatch(/Apoio de estoque/i);
    expect(source).toMatch(/Pré-notas/i);
    expect(source).toMatch(/Apoio avançado/i);
    expect(source).toMatch(/Orientação local/i);
    expect(source).toMatch(/Ajustes locais/i);
  });

  it('não reutiliza labels antigos como nomes principais de permissões', () => {
    const source = settingsSource();

    expect(source).not.toMatch(/Módulo Contábil/i);
    expect(source).not.toMatch(/Logística & Estoque/i);
    expect(source).not.toMatch(/Hierarquia & Tarefas/i);
    expect(source).not.toMatch(/Orientação Inteligente IA/i);
    expect(source).not.toMatch(/Configurações Globais/i);
    expect(source).not.toMatch(/Painel KPI/i);
    expect(source).not.toMatch(/Advisor IA/i);
    expect(source).not.toMatch(/Configs/i);
  });
});

describe('placeholders sensíveis do SettingsTool', () => {
  it('orienta uso fictício/local para senhas, certificado e dados empresariais', () => {
    const source = settingsSource();

    expect(source).toMatch(/senha fictícia/i);
    expect(source).toMatch(/não envie certificado real/i);
    expect(source).toMatch(/dados fictícios/i);
    expect(source).toMatch(/referência local demonstrativa/i);
    expect(source).toMatch(/simulação local/i);
    expect(source).toMatch(/sem uso real/i);
    expect(source).toMatch(/sem uso operacional/i);
    expect(source).toMatch(/Informações societárias e valores são apenas referência local demonstrativa/i);
  });

  it('não mantém exemplos sensíveis com aparência de dado real', () => {
    const source = settingsSource();
    const blockedExamples = [
      ['carlos', '123'].join(''),
      ['senha', 'referencia', 'mvp'].join('_'),
      ['pfx', 'pass', 'private'].join('_'),
      ['48', '174', '526/0001-85'].join('.'),
    ];

    for (const blockedExample of blockedExamples) {
      expect(source).not.toContain(blockedExample);
    }
  });
});
