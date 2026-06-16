/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Tipos referentes ao Auxílio Contábil e de Caixa (Ferramenta 1)
export interface TransactionItem {
  id: string;
  name: string;
  qty: number;
  price: number;
}

export type TransactionCategory =
  | 'Suprimentos'
  | 'Logística'
  | 'Serviços'
  | 'Funcionários'
  | 'Impostos'
  | 'Alimentação'
  | 'Tecnologia'
  | 'Faturamento Misto'
  | 'Outros';

export interface Transaction {
  id: string;
  establishmentName: string;
  amount: number;
  date: string; // Formato YYYY-MM-DD
  category: TransactionCategory;
  items?: TransactionItem[];
  status: 'Confirmado' | 'Pendente';
  notes?: string;
  type?: 'Receita' | 'Despesa';
}

export function isTransactionRevenue(t: Transaction): boolean {
  if (t.type === 'Receita') return true;
  if (t.type === 'Despesa') return false;
  
  const nameLower = t.establishmentName.toLowerCase();
  const notesLower = (t.notes || '').toLowerCase();
  
  // Exclusions: cancellations, estornos or purchases (compra/despesa/cancelamento/estorno)
  if (nameLower.includes('cancelamento') || nameLower.includes('estorno') || notesLower.includes('cancelamento') || notesLower.includes('estorno')) {
    return false;
  }
  
  return (
    nameLower.includes('emissão direta') ||
    nameLower.includes('emissao direta') ||
    nameLower.includes('vendas') ||
    nameLower.includes('receita') ||
    notesLower.includes('entrada manual') ||
    notesLower.includes('recebimento') ||
    notesLower.includes('venda') ||
    notesLower.includes('receita') ||
    notesLower.includes('faturamento') ||
    (t.category === 'Outros' && nameLower.includes('vendas'))
  );
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  salary: number;
  dateHired: string;
  status: 'Ativo' | 'Afastado' | 'Desligado';
  phone?: string;
}

export interface CashRegister {
  balance: number;
  lastUpdated: string;
}

// Tipos referentes ao Controle de Logística (Ferramenta 2)
export interface Product {
  id: string;
  barcode: string; // Código de barras para localização e identificação
  name: string;
  location: string; // Endereço de localização física (ex: Corredor A, Prateleira 3)
  manufactureDate: string; // Data de fabricação (YYYY-MM-DD)
  expirationDate: string; // Data de validade (YYYY-MM-DD)
  batch: string; // Lote
  qty: number; // Quantidade em estoque
  category: string; // Tipo de mercadoria
  price?: number; // Preço unitário da mercadoria
  lowStockThreshold?: number; // Threshold customizado para estoque baixo
  
  // Novos dados comerciais, fiscais e tributários
  internalCode?: string;
  description?: string;
  unit?: string;
  ncm?: string;
  cest?: string;
  gtin?: string; // Global Trade Item Number (pode ser 'SEM GTIN')
  origin?: string; // Origem da mercadoria (Ex: '0' - Nacional...)
  cfopDefault?: string; // CFOP padrão para notas
  cstIcms?: string; // Código de Situação Tributária do ICMS
  csosn?: string; // Código de Situação da Operação no Simples Nacional
  cstPis?: string; // CST do PIS
  cstCofins?: string; // CST do COFINS
  cstIpi?: string; // CST do IPI
}

export interface Task {
  id: string;
  title: string;
  assignerId: string;
  assignerName: string;
  assigneeId: string;
  assigneeName: string;
  status: 'Pendente' | 'Em Andamento' | 'Concluido';
  dateCreated: string;
}

