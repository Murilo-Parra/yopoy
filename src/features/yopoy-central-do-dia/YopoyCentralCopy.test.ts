import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const featureFile = (fileName: string) =>
  readFileSync(resolve(__dirname, fileName), 'utf8');

const featureSource = () => [
  featureFile('YopoyCentralDashboard.tsx'),
  featureFile('SmartCard.tsx'),
  featureFile('mockData.ts'),
  featureFile('types.ts'),
  featureFile('taskCanvasStorage.ts'),
].join('\n');

describe('copy local da Mesa Visual', () => {
  it('mantém a Mesa como experiência local, visual e manual do MVP', () => {
    const source = featureSource();

    expect(source).toMatch(/Mesa Visual/i);
    expect(source).toMatch(/local/i);
    expect(source).toMatch(/visual/i);
    expect(source).toMatch(/manual/i);
    expect(source).toMatch(/demonstra/i);
    expect(source).toMatch(/rascunho/i);
    expect(source).toMatch(/pré-nota/i);
    expect(source).toMatch(/sem sincronização externa/i);
    expect(source).toMatch(/sem valor fiscal/i);
    expect(source).toMatch(/não envia dados/i);
    expect(source).toMatch(/nenhum dado saiu do navegador/i);
    expect(source).toMatch(/salva localmente|salvo neste navegador/i);
    expect(source).toMatch(/navegador/i);
    expect(source).toMatch(/organização/i);
    expect(source).toMatch(/conferência|conferir/i);

    const blockedBackendPromises = [
      ['backend', 'real'].join(' '),
      ['servidor', 'real'].join(' '),
      ['sincronização', 'real'].join(' '),
      ['nuvem', 'ativa'].join(' '),
      ['persistência', 'real'].join(' '),
      ['segurança de', 'produção'].join(' '),
      ['dados reais', 'seguros'].join(' '),
    ];

    for (const blockedPromise of blockedBackendPromises) {
      expect(source).not.toContain(blockedPromise);
    }

    const blockedFiscalPromises = [
      ['nota fiscal', 'real'].join(' '),
      ['emissão fiscal', 'real'].join(' '),
      ['NF-e', 'emitida'].join(' '),
      ['NFC-e', 'emitida'].join(' '),
      ['NFS-e', 'emitida'].join(' '),
      ['documento fiscal', 'emitido'].join(' '),
      ['valor fiscal', 'oficial'].join(' '),
      ['DANFE', 'gerado'].join(' '),
      ['XML fiscal', 'gerado'].join(' '),
      ['transmissão SEFAZ', 'realizada'].join(' '),
    ];

    for (const blockedPromise of blockedFiscalPromises) {
      expect(source).not.toContain(blockedPromise);
    }

    const blockedFinancePromises = [
      ['pagamento', 'real'].join(' '),
      ['PIX', 'operacional'].join(' '),
      ['boleto', 'emitido'].join(' '),
      ['banco', 'conectado'].join(' '),
      ['Open Finance', 'ativo'].join(' '),
      ['conciliação bancária', 'real'].join(' '),
      ['contabilidade', 'oficial'].join(' '),
      ['relatório financeiro', 'oficial'].join(' '),
    ];

    for (const blockedPromise of blockedFinancePromises) {
      expect(source).not.toContain(blockedPromise);
    }

    const blockedLogisticsPromises = [
      ['pedido', 'real'].join(' '),
      ['fornecedor', 'integrado'].join(' '),
      ['baixa automática', 'real'].join(' '),
      ['estoque', 'oficial'].join(' '),
      ['frete', 'real'].join(' '),
      ['rastreamento', 'real'].join(' '),
      ['transportadora', 'acionada'].join(' '),
      ['entrega', 'real'].join(' '),
      ['validade', 'automática'].join(' '),
    ];

    for (const blockedPromise of blockedLogisticsPromises) {
      expect(source).not.toContain(blockedPromise);
    }

    const blockedAutomationPromises = [
      ['automação', 'real'].join(' '),
      ['execução', 'automática'].join(' '),
      ['IA', 'executa'].join(' '),
      ['IA', 'envia'].join(' '),
      ['IA', 'paga'].join(' '),
      ['IA', 'emite'].join(' '),
      ['workflow', 'automático'].join(' '),
      ['integração', 'automática'].join(' '),
    ];

    for (const blockedPromise of blockedAutomationPromises) {
      expect(source).not.toContain(blockedPromise);
    }
  });
});
