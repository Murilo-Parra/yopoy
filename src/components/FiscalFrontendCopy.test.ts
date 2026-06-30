import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const componentSource = (fileName: string) =>
  readFileSync(resolve(__dirname, fileName), 'utf8');

describe('coerência fiscal textual do frontend MVP', () => {
  it('landing page não promete emissão fiscal real', () => {
    const source = componentSource('ElparrarLandingPage.tsx');

    expect(source).not.toMatch(/emita notas fiscais|SEFAZ|NF-e|NFC-e|NFS-e/i);
    expect(source).toMatch(/pré-notas internas/i);
    expect(source).toMatch(/sem valor fiscal/i);
    expect(source).toMatch(/contador/i);
  });

  it('settings trata fiscal como preparação futura sem ativação real', () => {
    const source = componentSource('SettingsTool.tsx');

    expect(source).not.toMatch(/Sincronizar SEFAZ|Testar Conectividade|envio SEFAZ|Simulador avançado de notas fiscais/i);
    expect(source).not.toMatch(/emissão oficial|transmissão SEFAZ ativa|certificado operacional|DANFE oficial|cancelamento fiscal real|faturamento real automático/i);
    expect(source).not.toMatch(/armazenamento seguro|auditoria em tempo real|ISO\/IEC 27001 Cryptography Check/i);
    expect(source).toMatch(/preparação futura/i);
    expect(source).toMatch(/não disponível no MVP/i);
    expect(source).toMatch(/não operacional no MVP/i);
    expect(source).toMatch(/sem transmissão fiscal/i);
    expect(source).toMatch(/sem valor fiscal/i);
    expect(source).toMatch(/trilha local|checklist local/i);
    expect(source).toMatch(/somente dados internos|dados internos/i);
  });

  it('DANFE legado vira espelho demonstrativo de pré-nota', () => {
    const source = componentSource('DanfeTool.tsx');

    expect(source).not.toMatch(/Representação gráfica oficial|NF-e autorizada|Requer autorização SEFAZ|Consulta Pública|DANFE AUXILIAR/i);
    expect(source).toMatch(/Prévia interna de pré-nota/i);
    expect(source).toMatch(/SEM VALOR FISCAL/i);
    expect(source).toMatch(/uso demonstrativo|não emitida/i);
  });

  it('emissor legado não usa CTA de transmissão/autorização real', () => {
    const source = componentSource('NfeEmissorTool.tsx');

    expect(source).not.toMatch(/Emissor Completo de NF-e|Validar, Assinar e Transmitir|Console Sincronizador SEFAZ|Autorizado o uso da NF-e|homologada pela SEFAZ/i);
    expect(source).toMatch(/Pré-nota Interna/i);
    expect(source).toMatch(/rascunho interno sem valor fiscal/i);
    expect(source).toMatch(/Emissão real não disponível no MVP/i);
    expect(source).toMatch(/contador/i);
  });
});
