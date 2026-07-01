import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const chartSource = () =>
  readFileSync(resolve(__dirname, 'MonthlyFinanceChart.tsx'), 'utf8');

describe('copy local do MonthlyFinanceChart', () => {
  it('mantém o chart como referência visual local sem promessas financeiras oficiais', () => {
    const source = chartSource();
    const dre = ['D', 'R', 'E'].join('');

    expect(source).toMatch(/visual local/i);
    expect(source).toMatch(/referência local/i);
    expect(source).toMatch(/demonstrativo/i);
    expect(source).toMatch(/organização local/i);
    expect(source).toMatch(/sem valor contábil oficial/i);
    expect(source).toMatch(/não substitui contador/i);
    expect(source).toMatch(/sem banco real/i);
    expect(source).toMatch(/sem integração bancária/i);
    expect(source).toMatch(/sem pagamento real/i);

    expect(source).not.toContain(['dados históricos', 'reais'].join(' '));
    expect(source).not.toContain(['integrações contábeis', 'em tempo real'].join(' '));
    expect(source).not.toContain(['pagamentos reais', 'de folhas e impostos'].join(' '));
    expect(source).not.toContain(['Livro', 'Diário'].join(' '));
    expect(source).not.toContain(`${dre} oficial`);
    expect(source).not.toContain(`Tabela do ${dre} Simplificado`);
    expect(source).not.toContain(['Lucro', 'Acumulado'].join(' '));
    expect(source).not.toContain(['Saldo', 'Líquido'].join(' '));
    expect(source).not.toContain(['saldo operacional', 'parcial'].join(' '));
    expect(source).not.toContain(['fluxo de caixa líquido', 'positivo'].join(' '));
    expect(source).not.toContain(['Investigação de Balanço', 'Mensal'].join(' '));
    expect(source).not.toContain(['relatório financeiro', 'oficial'].join(' '));
    expect(source).not.toContain('saldo real');
    expect(source).not.toContain('extrato real');
    expect(source).not.toContain(['Open Finance', 'ativo'].join(' '));
    expect(source).not.toContain(['banco', 'conectado'].join(' '));
    expect(source).not.toContain(['pagamento', 'realizado'].join(' '));
    expect(source).not.toContain(['contabilidade', 'oficial'].join(' '));
    expect(source).not.toContain(['fechamento contábil', 'real'].join(' '));
  });
});
