import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const logisticsSource = () =>
  readFileSync(resolve(__dirname, 'LogisticsTool.tsx'), 'utf8');

describe('copy local do LogisticsTool', () => {
  it('mantém o módulo como apoio local de estoque sem promessas operacionais', () => {
    const source = logisticsSource();

    expect(source).toMatch(/apoio local de estoque/i);
    expect(source).toMatch(/organização local/i);
    expect(source).toMatch(/visual local/i);
    expect(source).toMatch(/registro interno/i);
    expect(source).toMatch(/referência local/i);
    expect(source).toMatch(/rascunho local/i);
    expect(source).toMatch(/fornecedor fictício/i);
    expect(source).toMatch(/sem integração com fornecedor/i);
    expect(source).toMatch(/sem pedido real/i);
    expect(source).toMatch(/sem baixa automática real/i);
    expect(source).toMatch(/sem frete real/i);
    expect(source).toMatch(/sem rastreamento real/i);
    expect(source).toMatch(/sem documento fiscal/i);
    expect(source).toMatch(/sem emissão fiscal/i);
    expect(source).toMatch(/não emite nota/i);
    expect(source).toMatch(/não transmite dados fiscais/i);
    expect(source).toMatch(/não possui valor fiscal/i);

    const blockedOldCopy = [
      ['BANCO DE DADOS', 'DE ESTOQUE GERAL'].join(' '),
      ['Dar Baixa', 'Lote'].join(' '),
      ['Fidelidade', 'Fiscal'].join(' '),
      ['Instrução logística', 'recebida'].join(' '),
      ['Múltiplos centros', 'de distribuição'].join(' '),
      ['Rastreamento, edição', 'profunda'].join(' '),
      ['Monitoramento de Baixo', 'Estoque Crítico'].join(' '),
      ['alertas preditivos', 'de validade'].join(' '),
      ['Mensagem de', 'cotação'].join(' '),
      ['fluxo de', 'compras'].join(' '),
      ['conclusão do', 'pedido'].join(' '),
      ['Solicitamos uma', 'proposta'].join(' '),
      ['Fornecedor', 'Credenciado'].join(' '),
      ['E-mail', 'Comercial'].join(' '),
      ['Notas', 'Comerciais'].join(' '),
      ['Enviar', 'WhatsApp'].join(' '),
      ['Enviar por', 'E-mail'].join(' '),
      ['VIGÊNCIA FISCAL', 'ATIVA'].join(' '),
    ];

    for (const blockedCopy of blockedOldCopy) {
      expect(source).not.toContain(blockedCopy);
    }

    const blockedPromises = [
      ['pedido real', 'enviado'].join(' '),
      ['fornecedor', 'integrado'].join(' '),
      ['compra real', 'enviada'].join(' '),
      ['baixa automática', 'realizada'].join(' '),
      ['estoque oficial', 'atualizado'].join(' '),
      ['frete real', 'calculado'].join(' '),
      ['rastreamento real', 'ativo'].join(' '),
      ['transportadora', 'acionada'].join(' '),
      ['documento fiscal', 'emitido'].join(' '),
      ['nota fiscal', 'emitida'].join(' '),
      ['emissão fiscal', 'realizada'].join(' '),
      ['NF-e', 'emitida'].join(' '),
      ['DANFE', 'gerado'].join(' '),
      ['XML fiscal', 'gerado'].join(' '),
    ];

    for (const blockedPromise of blockedPromises) {
      expect(source).not.toContain(blockedPromise);
    }
  });
});
