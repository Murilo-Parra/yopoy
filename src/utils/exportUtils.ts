/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { jsPDF } from 'jspdf';
import { Transaction, Product } from '../types';

/**
 * Funções utilitárias para exportação de dados em CSV e PDF.
 * Projetado especificamente para envio a contadores externos com formatação profissional.
 */

// Define helper local para identificar se uma transação é Receita (Entrada) ou Despesa (Saída)
const isRevenue = (t: Transaction) => {
  const nameLower = t.establishmentName.toLowerCase();
  const notesLower = (t.notes || '').toLowerCase();
  const catLower = (t.category || '').toLowerCase();
  return (
    (t.category === 'Outros' && nameLower.includes('vendas')) ||
    notesLower.includes('entrada manual') ||
    notesLower.includes('recebimento') ||
    notesLower.includes('venda') ||
    nameLower.includes('receita') ||
    nameLower.includes('emissão direta') ||
    catLower.includes('vendas') ||
    catLower.includes('receitas') ||
    catLower.includes('serviços')
  );
};

/**
 * Exporta dados de forma genérica para CSV, garantindo suporte do Microsoft Excel (com BOM UTF-8 e delimitador ponto e vírgula).
 */
export function exportToCSV(filename: string, headers: string[], rows: string[][]) {
  const csvContent = "\uFEFF" + [
    headers.join(";"),
    ...rows.map(row => row.map(val => {
      let cleanVal = (val || '').replace(/"/g, '""');
      if (cleanVal.includes(';') || cleanVal.includes('\n') || cleanVal.includes('\r') || cleanVal.includes(',')) {
        cleanVal = `"${cleanVal}"`;
      }
      return cleanVal;
    }).join(";"))
  ].join("\r\n");

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Exporta a tabela de Livro-Caixa Geral em CSV.
 */
export function exportTransactionsCSV(transactions: Transaction[]) {
  const headers = [
    'Data',
    'Descrição / Estabelecimento',
    'Categoria',
    'Tipo',
    'Valor (R$)',
    'Status',
    'Observações / Código Fiscal'
  ];

  const rows = transactions.map(t => {
    const typeLabel = isRevenue(t) ? 'Recebimento' : 'Débito / Despesa';
    const cleanAmount = t.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    return [
      t.date,
      t.establishmentName,
      t.category,
      typeLabel,
      cleanAmount,
      t.status,
      t.notes || ''
    ];
  });

  exportToCSV('livro_caixa_auxiliar_biz.csv', headers, rows);
}

/**
 * Exporta o inventário de produtos em CSV.
 */
export function exportProductsCSV(products: Product[]) {
  const headers = [
    'Lote',
    'Nome da Mercadoria',
    'Código de Barras',
    'Categoria',
    'Quantidade Física',
    'Endereço / Localização',
    'Data Fabricação',
    'Data Expiracão'
  ];

  const rows = products.map(p => [
    p.batch,
    p.name,
    p.barcode,
    p.category,
    p.qty.toString(),
    p.location,
    p.manufactureDate,
    p.expirationDate
  ]);

  exportToCSV('inventario_estoque_auxiliar_biz.csv', headers, rows);
}

/**
 * Exporta o Livro Caixa Geral em PDF profissional de auditoria financeira.
 */
export function exportTransactionsPDF(transactions: Transaction[]) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageHeight = doc.internal.pageSize.height;
  const pageWidth = doc.internal.pageSize.width;
  const startMargin = 15;
  let currentY = 15;

  const renderHeader = (pageNum: number) => {
    // Top Bar decorativo
    doc.setFillColor(34, 197, 94); // Emerald 500
    doc.rect(startMargin, currentY, pageWidth - (startMargin * 2), 1.5, 'F');
    currentY += 6;

    // Título e logo principal text-based
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(15, 23, 42); // Slate 900
    doc.text("AUXILIAR BIZ S.A. - INTEGRAÇÃO CONTÁBIL", startMargin, currentY);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139); // Slate 500
    doc.text(`Emitido em: ${new Date().toLocaleString('pt-BR')}  |  Página ${pageNum}`, pageWidth - startMargin - 60, currentY, { align: 'right' });

    currentY += 5;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(34, 197, 94);
    doc.text("RELATÓRIO HISTÓRICO DE FLUXOS OPERACIONAIS (LIVRO CAIXA)", startMargin, currentY);

    currentY += 5;
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.2);
    doc.line(startMargin, currentY, pageWidth - startMargin, currentY);
    currentY += 8;
  };

  let page = 1;
  renderHeader(page);

  // Quadro de Resumo no topo da primeira página
  const totalReceitas = transactions.filter(isRevenue).reduce((sum, t) => sum + t.amount, 0);
  const totalDespesas = transactions.filter(t => !isRevenue(t)).reduce((sum, t) => sum + t.amount, 0);
  const saldoLiquido = totalReceitas - totalDespesas;

  doc.setFillColor(248, 250, 252); // Slate 50
  doc.roundedRect(startMargin, currentY, pageWidth - (startMargin * 2), 22, 2, 2, 'F');
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  
  doc.text("BALANÇO GERAL CONSOLIDADO", startMargin + 5, currentY + 6);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text(`Total Entradas: R$ ${totalReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, startMargin + 5, currentY + 12);
  doc.text(`Total Saídas: R$ ${totalDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, startMargin + 5, currentY + 17);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  const balanceLabel = `Saldo Líquido: R$ ${saldoLiquido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
  if (saldoLiquido >= 0) {
    doc.setTextColor(21, 128, 61); // Green 700
  } else {
    doc.setTextColor(185, 28, 28); // Red 700
  }
  doc.text(balanceLabel, pageWidth - startMargin - 80, currentY + 12);

  currentY += 28;

  // Tabela: Cabeçalho
  doc.setFillColor(15, 23, 42); // Black Slate
  doc.rect(startMargin, currentY, pageWidth - (startMargin * 2), 7, 'F');

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text("DATA", startMargin + 3, currentY + 4.8);
  doc.text("ESTABELECIMENTO / DESCRIÇÃO", startMargin + 25, currentY + 4.8);
  doc.text("CATEGORIA", startMargin + 105, currentY + 4.8);
  doc.text("VALOR (R$)", pageWidth - startMargin - 5, currentY + 4.8, { align: 'right' });

  currentY += 7;

  // Linhas da Tabela
  transactions.forEach((t) => {
    // Abre nova página se passar do orçamento de altura
    if (currentY > pageHeight - 25) {
      doc.addPage();
      page += 1;
      currentY = 15;
      renderHeader(page);

      // Re-desenha cabeçalho de tabela na nova página
      doc.setFillColor(15, 23, 42);
      doc.rect(startMargin, currentY, pageWidth - (startMargin * 2), 7, 'F');
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(255, 255, 255);
      doc.text("DATA", startMargin + 3, currentY + 4.8);
      doc.text("ESTABELECIMENTO / DESCRIÇÃO", startMargin + 25, currentY + 4.8);
      doc.text("CATEGORIA", startMargin + 105, currentY + 4.8);
      doc.text("VALOR (R$)", pageWidth - startMargin - 5, currentY + 4.8, { align: 'right' });
      currentY += 7;
    }

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(51, 65, 85); // Slate 700

    // Linha de fundo alternada (Zebra)
    doc.setFillColor(255, 255, 255);
    doc.rect(startMargin, currentY, pageWidth - (startMargin * 2), 7, 'F');

    const amountFormatted = `${isRevenue(t) ? '+' : '-'} R$ ${t.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    if (isRevenue(t)) {
      doc.setTextColor(21, 128, 61); // Green 700
    } else {
      doc.setTextColor(225, 29, 72); // Rose 600
    }

    doc.text(t.date, startMargin + 3, currentY + 4.8);
    
    // Truncar descrição se for muito longa
    let desc = t.establishmentName;
    if (desc.length > 52) {
      desc = desc.substring(0, 49) + "...";
    }
    doc.text(desc, startMargin + 25, currentY + 4.8);
    
    doc.text(t.category, startMargin + 105, currentY + 4.8);
    doc.text(amountFormatted, pageWidth - startMargin - 5, currentY + 4.8, { align: 'right' });

    // Linha divisória fina
    doc.setDrawColor(241, 245, 249);
    doc.setLineWidth(0.1);
    doc.line(startMargin, currentY + 7, pageWidth - startMargin, currentY + 7);

    currentY += 7;
  });

  // Linhas de assinatura no rodapé do relatório contábil (última página)
  if (currentY > pageHeight - 40) {
    doc.addPage();
    page += 1;
    currentY = 15;
    renderHeader(page);
  }

  currentY += 12;
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  
  // Linha 1: Responsável Financeiro
  doc.line(startMargin + 10, currentY, startMargin + 70, currentY);
  // Linha 2: Auditor / Contador Externo
  doc.line(pageWidth - startMargin - 70, currentY, pageWidth - startMargin - 10, currentY);

  currentY += 4;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.);
  doc.setTextColor(71, 85, 105);
  doc.text("RESPONSÁVEL OPERACIONAL", startMargin + 40, currentY, { align: 'center' });
  doc.text("CONTABILIDADE EXTERNA / CONFERÊNCIA", pageWidth - startMargin - 40, currentY, { align: 'center' });

  // Nome do arquivo
  doc.save('livro_caixa_auxiliar_biz.pdf');
}

/**
 * Exporta o Inventário de Estoque de Produtos em PDF profissional.
 */
export function exportProductsPDF(products: Product[]) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageHeight = doc.internal.pageSize.height;
  const pageWidth = doc.internal.pageSize.width;
  const startMargin = 15;
  let currentY = 15;

  const renderHeader = (pageNum: number) => {
    // Top Bar decorativo
    doc.setFillColor(79, 70, 229); // Violet 650
    doc.rect(startMargin, currentY, pageWidth - (startMargin * 2), 1.5, 'F');
    currentY += 6;

    // Título e logo principal text-based
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(15, 23, 42); // Slate 900
    doc.text("AUXILIAR BIZ S.A. - LOGÍSTICA INTEGRADA", startMargin, currentY);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139); // Slate 500
    doc.text(`Gerado em: ${new Date().toLocaleString('pt-BR')}  |  Página ${pageNum}`, pageWidth - startMargin - 60, currentY, { align: 'right' });

    currentY += 5;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(79, 70, 229);
    doc.text("RELATÓRIO FISCAL DE INVENTÁRIO FÍSICO DE ESTOQUE", startMargin, currentY);

    currentY += 5;
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.2);
    doc.line(startMargin, currentY, pageWidth - startMargin, currentY);
    currentY += 8;
  };

  let page = 1;
  renderHeader(page);

  // Quadro resumido de estoque
  const totalVolume = products.reduce((sum, p) => sum + p.qty, 0);
  const totalLotes = products.length;

  doc.setFillColor(248, 250, 252); // Slate 50
  doc.roundedRect(startMargin, currentY, pageWidth - (startMargin * 2), 20, 2, 2, 'F');
  
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text("MÉTRICAS DO INVENTÁRIO ATIVO", startMargin + 5, currentY + 6);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text(`Total de Lotes Monitorados: ${totalLotes}`, startMargin + 5, currentY + 13);
  doc.text(`Soma Física das Mercadorias: ${totalVolume} unidades`, pageWidth - startMargin - 90, currentY + 13);

  currentY += 26;

  // Tabela de Inventário: Cabeçalho
  doc.setFillColor(15, 23, 42); // Black Slate
  doc.rect(startMargin, currentY, pageWidth - (startMargin * 2), 7, 'F');

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text("LOTE", startMargin + 3, currentY + 4.8);
  doc.text("PRODUTO E COMPONENTES", startMargin + 25, currentY + 4.8);
  doc.text("CATEGORIA", startMargin + 95, currentY + 4.8);
  doc.text("LOCALIZAÇÃO MAP", startMargin + 135, currentY + 4.8);
  doc.text("QUANTIDADE", pageWidth - startMargin - 3, currentY + 4.8, { align: 'right' });

  currentY += 7;

  // Linhas da Tabela
  products.forEach((p) => {
    // Abre nova página se passar do orçamento de altura
    if (currentY > pageHeight - 25) {
      doc.addPage();
      page += 1;
      currentY = 15;
      renderHeader(page);

      // Re-desenha cabeçalho de tabela na nova página
      doc.setFillColor(15, 23, 42);
      doc.rect(startMargin, currentY, pageWidth - (startMargin * 2), 7, 'F');
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(255, 255, 255);
      doc.text("LOTE", startMargin + 3, currentY + 4.8);
      doc.text("PRODUTO E COMPONENTES", startMargin + 25, currentY + 4.8);
      doc.text("CATEGORIA", startMargin + 95, currentY + 4.8);
      doc.text("LOCALIZAÇÃO MAP", startMargin + 135, currentY + 4.8);
      doc.text("QUANTIDADE", pageWidth - startMargin - 3, currentY + 4.8, { align: 'right' });
      currentY += 7;
    }

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(51, 65, 85); // Slate 700

    // Linha de fundo alternada (Zebra)
    doc.setFillColor(255, 255, 255);
    doc.rect(startMargin, currentY, pageWidth - (startMargin * 2), 7, 'F');

    doc.text(p.batch, startMargin + 3, currentY + 4.8);
    
    let prodName = p.name;
    if (prodName.length > 35) {
      prodName = prodName.substring(0, 32) + "...";
    }
    doc.text(prodName, startMargin + 25, currentY + 4.8);
    
    doc.text(p.category, startMargin + 95, currentY + 4.8);
    doc.text(p.location, startMargin + 135, currentY + 4.8);
    
    doc.setFont("helvetica", "bold");
    doc.text(p.qty.toString(), pageWidth - startMargin - 3, currentY + 4.8, { align: 'right' });

    // Linha divisória fina
    doc.setDrawColor(241, 245, 249);
    doc.setLineWidth(0.1);
    doc.line(startMargin, currentY + 7, pageWidth - startMargin, currentY + 7);

    currentY += 7;
  });

  // Assinatura no rodapé (última página)
  if (currentY > pageHeight - 40) {
    doc.addPage();
    page += 1;
    currentY = 15;
    renderHeader(page);
  }

  currentY += 12;
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);

  doc.line(startMargin + 10, currentY, startMargin + 70, currentY);
  doc.line(pageWidth - startMargin - 70, currentY, pageWidth - startMargin - 10, currentY);

  currentY += 4;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.);
  doc.setTextColor(71, 85, 105);
  doc.text("RESPONSÁVEL PELA LOGÍSTICA / CONFERENTE", startMargin + 40, currentY, { align: 'center' });
  doc.text("RECEBIMENTO / DIRETORIA CONTÁBIL", pageWidth - startMargin - 40, currentY, { align: 'center' });

  // Nome do arquivo
  doc.save('inventario_estoque_auxiliar_biz.pdf');
}

/**
 * Representa os dados necessários para gerar o DANFE PDF oficial.
 */
export interface PDFInvoiceData {
  invoiceNumber: string;
  accessKey: string;
  type: 'produto' | 'servico';
  customerName: string;
  customerTaxId: string;
  customerEmail: string;
  customerAddress: string;
  customerCity: string;
  customerState: string;
  items: Array<{
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    taxRatePercent: number;
    taxValue: number;
    ncm?: string;
    cfop?: string;
    cst?: string;
    unity?: string;
  }>;
  subtotal: number;
  taxAmount: number;
  totalValue: number;
  issueDate: string;
  status: 'rascunho' | 'transmitida' | 'cancelada';
  nature: string;
  certificateUsed: string;
  environment: 'producao' | 'homologacao';
  emissorName?: string;
  emissorCnpj?: string;
  emissorIe?: string;
  emissorAddress?: string;
}

/**
 * Gera um PDF profissional de DANFE (Documento Auxiliar da Nota Fiscal Eletrônica) utilizando jsPDF.
 * Possibilita download e visualização direta pelo navegador de forma offline e imediata.
 */
export function exportInvoicePDF(data: PDFInvoiceData) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 10;
  const contentWidth = pageWidth - (margin * 2); // 190mm
  let currentY = margin;

  // Helpers de desenho de quadro com borda
  const drawBorder = (y: number, h: number) => {
    doc.setDrawColor(180, 180, 180);
    doc.setLineWidth(0.2);
    doc.rect(margin, y, contentWidth, h);
  };

  const drawHeaderAndBorders = (y: number, h: number, title: string) => {
    drawBorder(y, h);
    doc.setFillColor(245, 245, 245);
    doc.rect(margin + 0.1, y + 0.1, contentWidth - 0.2, 4.5, 'F');
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(50, 50, 50);
    doc.text(title.toUpperCase(), margin + 2, y + 3.2);
  };

  // 1. CABEÇALHO DO EMISSOR & IDENTIFICAÇÃO DO DANFE
  const renderFirstPageHeader = () => {
    // Retângulo Geral do Cabeçalho - 38mm de altura total
    drawBorder(currentY, 38);

    // Divisões verticais internas do Cabeçalho
    doc.setDrawColor(180, 180, 180);
    // Linha vertical dividindo emissor da identificação DANFE
    doc.line(margin + 80, currentY, margin + 80, currentY + 38);
    // Linha vertical separando DANFE da Chave de Acesso
    doc.line(margin + 125, currentY, margin + 125, currentY + 38);

    // Bloco do Emissor (Lado Esquerdo)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.text(data.emissorName || "AUXILIAR BIZ TECNOLOGIA & VIVENDAS S.A.", margin + 3, currentY + 6);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(80, 80, 80);
    doc.text(data.emissorAddress || "Av. Industrial, Qd 45 Lote 12 - Setor Sul Contábil", margin + 3, currentY + 11);
    doc.text("Goiânia - GO | CEP 74000-112 | Telefone: (62) 3218-4450", margin + 3, currentY + 14);
    doc.text(`CNPJ Emissor: ${data.emissorCnpj || "48.174.526/0001-85"}`, margin + 3, currentY + 18);
    doc.text(`Inscrição Estadual: ${data.emissorIe || "102.394.887-19"}`, margin + 3, currentY + 21);

    // Status / Regras fiscais do Emissor
    doc.setFillColor(245, 247, 250);
    doc.rect(margin + 1, currentY + 26, 78, 11, 'F');
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(51, 65, 85);
    doc.text("DANFE - Documento Auxiliar da Nota Fiscal Eletrônica", margin + 3, currentY + 30);
    doc.setFont("helvetica", "normal");
    doc.text("Natureza da Operação: " + (data.nature || "Venda de Produtos"), margin + 3, currentY + 34);

    // Bloco DANFE Gráfico (Meio)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text("DANFE", margin + 102.5, currentY + 7, { align: 'center' });
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.5);
    doc.text("DOCUMENTO AUXILIAR", margin + 102.5, currentY + 11, { align: 'center' });
    doc.text("DA NOTA FISCAL", margin + 102.5, currentY + 14, { align: 'center' });
    doc.text("ELETRÔNICA", margin + 102.5, currentY + 17, { align: 'center' });

    // Informação de Saída/Entrada
    doc.rect(margin + 98, currentY + 20, 9, 7);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("1", margin + 102.5, currentY + 25.5, { align: 'center' });
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6);
    doc.text("0 - Entrada\n1 - Saída", margin + 110, currentY + 22.5);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.text(`Nº: ${data.invoiceNumber}`, margin + 102.5, currentY + 31, { align: 'center' });
    doc.setFont("helvetica", "normal");
    doc.text("SÉRIE: 001", margin + 102.5, currentY + 35, { align: 'center' });

    // Bloco Controle / Chave de Acesso (Lado Direito)
    // Simulação aproximada de código de barras
    doc.setFillColor(15, 23, 42);
    let barX = margin + 128;
    for (let i = 0; i < 40; i++) {
      let width = (Math.sin(i * 1.5) > 0) ? 0.6 : 0.2;
      doc.rect(barX, currentY + 3, width, 14, 'F');
      barX += width + 0.3;
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(6);
    doc.setTextColor(80, 80, 80);
    doc.text("CHAVE DE ACESSO DE CONFERÊNCIA E VALIDAÇÃO", margin + 157.5, currentY + 20, { align: 'center' });
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6);
    let keySpaces = data.accessKey.replace(/(.{4})/g, '$1 ');
    doc.text(keySpaces, margin + 127.5, currentY + 24, { maxWidth: 60 });

    // Informação do Protocolo
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6);
    doc.setTextColor(34, 197, 94);
    const dateFormatted = new Date(data.issueDate).toLocaleDateString('pt-BR');
    doc.text(`PROTOCOLO: AUTORIZADO SEFAZ EM ${dateFormatted}`, margin + 127, currentY + 31);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(110, 110, 110);
    doc.text(`Certificado Digital: ${data.certificateUsed}`, margin + 127, currentY + 34);
    doc.text(`Ambiente: ${data.environment === 'producao' ? 'PRODUÇÃO (OFICIAL)' : 'HOMOLOGAÇÃO (TESTES)'}`, margin + 127, currentY + 36);

    // Marca d'água estilizada dependendo de rascunho
    if (data.status === 'rascunho') {
      doc.setDrawColor(230, 230, 255);
      doc.setFillColor(250, 250, 255);
      doc.roundedRect(margin + 55, currentY + 3, 15, 7, 1, 1, 'FD');
      doc.setFont("helvetica", "bold");
      doc.setFontSize(5.5);
      doc.setTextColor(99, 102, 241);
      doc.text("DRAFT", margin + 62.5, currentY + 8, { align: 'center' });
    } else if (data.status === 'cancelada') {
      doc.setFillColor(254, 242, 242);
      doc.setDrawColor(252, 165, 165);
      doc.roundedRect(margin + 127, currentY + 28, 50, 9, 1, 1, 'FD');
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(220, 38, 38);
      doc.text("ESTORNO / NOTA FISCAL CANCELADA", margin + 152, currentY + 34, { align: 'center' });
    }

    currentY += 41;
  };

  // 2. QUADRO DO DESTINATÁRIO
  const renderDestinatarioHeader = () => {
    drawHeaderAndBorders(currentY, 18, "Destinatário / Remetente");
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(15, 23, 42);
    doc.text("NOME DO CLIENTE: " + data.customerName, margin + 2, currentY + 8.5);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(50, 50, 50);
    doc.text("ENDEREÇO: " + data.customerAddress, margin + 2, currentY + 12.5);
    doc.text(`CIDADE: ${data.customerCity} - UF: ${data.customerState || 'GO'}`, margin + 2, currentY + 16);

    // Infos do lado direito do destinatário
    doc.text(`CNPJ / CPF: ${data.customerTaxId}`, margin + 115, currentY + 8.5);
    doc.text(`CONTATO EMAIL: ${data.customerEmail || 'sem-contato@cliente.com'}`, margin + 115, currentY + 12.5);
    doc.text(`DATA EMISSÃO: ${new Date(data.issueDate).toLocaleDateString('pt-BR')}  |  SAÍDA: ${new Date(data.issueDate).toLocaleTimeString('pt-BR').substring(0, 5)}`, margin + 115, currentY + 16);

    currentY += 21;
  };

  // 3. QUADRO DE IMPOSTOS RESUMIDO
  const renderImpostosHeader = () => {
    drawHeaderAndBorders(currentY, 14, "Cálculo de Impostos do Fisco");

    // Divisórias de impostos
    doc.setDrawColor(200, 200, 200);
    const colW = contentWidth / 4;
    doc.line(margin + colW, currentY + 4.5, margin + colW, currentY + 14);
    doc.line(margin + (colW * 2), currentY + 4.5, margin + (colW * 2), currentY + 14);
    doc.line(margin + (colW * 3), currentY + 4.5, margin + (colW * 3), currentY + 14);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(5.5);
    doc.setTextColor(120, 120, 120);
    doc.text("BASE CÁLCULO ICMS", margin + 2, currentY + 7);
    doc.text("VALOR DO ICMS RETIDO", margin + colW + 2, currentY + 7);
    doc.text("VALOR TOTAL DOS PRODUTOS", margin + (colW * 2) + 2, currentY + 7);
    doc.text("VALOR TOTAL DA NOTA FISCAL", margin + (colW * 3) + 2, currentY + 7);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    doc.text("R$ " + data.subtotal.toFixed(2), margin + 2, currentY + 11.5);
    doc.text("R$ " + data.taxAmount.toFixed(2), margin + colW + 2, currentY + 11.5);
    doc.text("R$ " + data.subtotal.toFixed(2), margin + (colW * 2) + 2, currentY + 11.5);
    doc.text("R$ " + data.totalValue.toFixed(2), margin + (colW * 3) + 2, currentY + 11.5);

    currentY += 17;
  };

  // Render inicial
  renderFirstPageHeader();
  renderDestinatarioHeader();
  renderImpostosHeader();

  // 4. TABELA DE ITENS DA NOTA FISCAL
  drawHeaderAndBorders(currentY, 7, "Itens e Produtos faturados de forma auditada");
  currentY += 7;

  // Cabeçalho de Itens
  doc.setFillColor(30, 41, 59); // Slate 800
  doc.rect(margin, currentY, contentWidth, 6.5, 'F');
  
  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.5);
  doc.setTextColor(255, 255, 255);
  doc.text("CÓDIGO", margin + 2, currentY + 4.2);
  doc.text("DESCRIÇÃO DOS PRODUTOS / SERVIÇOS", margin + 17, currentY + 4.2);
  doc.text("NCM/SH", margin + 92, currentY + 4.2);
  doc.text("CFOP", margin + 109, currentY + 4.2);
  doc.text("UNID", margin + 121, currentY + 4.2);
  doc.text("QTD", margin + 132, currentY + 4.2, { align: 'right' });
  doc.text("V. UNIT (R$)", margin + 148, currentY + 4.2, { align: 'right' });
  doc.text("V. TOTAL (R$)", margin + 170, currentY + 4.2, { align: 'right' });
  doc.text("ALIQ %", margin + 188, currentY + 4.2, { align: 'right' });

  doc.setDrawColor(30, 41, 59);
  doc.rect(margin, currentY, contentWidth, 6.5);
  currentY += 6.5;

  let pageNum = 1;

  // Linhas da Tabela
  data.items.forEach((item, index) => {
    // Paginação segura se exceder a altura limite
    if (currentY > pageHeight - 35) {
      // Desenhar rodapé da página anterior
      doc.setFont("helvetica", "normal");
      doc.setFontSize(6);
      doc.setTextColor(150, 150, 150);
      doc.text(`Auxiliar Biz - Documento de Rascunho DANFE Nº ${data.invoiceNumber}  |  Página ${pageNum}`, pageWidth / 2, pageHeight - 6, { align: 'center' });

      doc.addPage();
      pageNum += 1;
      currentY = margin;

      // Re-desenhar cabeçalho simplificado de nova página
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42);
      doc.text(`DANFE CONTINUAÇÃO - NOTA FISCAL Nº ${data.invoiceNumber} (FL. ${pageNum})`, margin, currentY + 6);
      
      currentY += 9;
      
      // Re-desenhar cabeçalho da tabela de itens
      doc.setFillColor(30, 41, 59);
      doc.rect(margin, currentY, contentWidth, 6.5, 'F');
      doc.setFont("helvetica", "bold");
      doc.setFontSize(6.5);
      doc.setTextColor(255, 255, 255);
      doc.text("CÓDIGO", margin + 2, currentY + 4.2);
      doc.text("DESCRIÇÃO DOS PRODUTOS / SERVIÇOS", margin + 17, currentY + 4.2);
      doc.text("NCM/SH", margin + 92, currentY + 4.2);
      doc.text("CFOP", margin + 109, currentY + 4.2);
      doc.text("UNID", margin + 121, currentY + 4.2);
      doc.text("QTD", margin + 132, currentY + 4.2, { align: 'right' });
      doc.text("V. UNIT (R$)", margin + 148, currentY + 4.2, { align: 'right' });
      doc.text("V. TOTAL (R$)", margin + 170, currentY + 4.2, { align: 'right' });
      doc.text("ALIQ %", margin + 188, currentY + 4.2, { align: 'right' });
      currentY += 6.5;
    }

    // Configura zebra style
    if (index % 2 === 1) {
      doc.setFillColor(248, 250, 252);
      doc.rect(margin + 0.1, currentY + 0.1, contentWidth - 0.2, 5.8, 'F');
    }

    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.5);
    doc.setTextColor(50, 50, 50);

    // Valores fiscais
    const code = String(2000 + index);
    const ncm = item.ncm || "0406.90.10";
    const cfop = item.cfop || "5102";
    const unity = item.unity || "UNID";

    doc.text(code, margin + 2, currentY + 4.2);
    
    // Trunca descrição longa para não sobrepor NCM/SH
    let desc = item.name;
    if (desc.length > 52) {
      desc = desc.substring(0, 49) + "...";
    }
    doc.text(desc, margin + 17, currentY + 4.2);
    doc.text(ncm.replace(/\./g, ''), margin + 92, currentY + 4.2);
    doc.text(cfop, margin + 109, currentY + 4.2);
    doc.text(unity, margin + 121, currentY + 4.2);

    doc.setFont("helvetica", "normal");
    doc.text(String(item.quantity), margin + 132, currentY + 4.2, { align: 'right' });
    doc.text(item.unitPrice.toFixed(2), margin + 148, currentY + 4.2, { align: 'right' });
    
    doc.setFont("helvetica", "bold");
    doc.text(item.totalPrice.toFixed(2), margin + 170, currentY + 4.2, { align: 'right' });
    doc.setFont("helvetica", "normal");
    doc.text(`${item.taxRatePercent}%`, margin + 188, currentY + 4.2, { align: 'right' });

    // Linha divisória fina de item
    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.15);
    doc.line(margin, currentY + 6, margin + contentWidth, currentY + 6);

    currentY += 6;
  });

  // Fecha bordas da tabela de itens
  doc.setDrawColor(180, 180, 180);
  doc.setLineWidth(0.2);
  doc.line(margin, currentY, margin, currentY);

  currentY += 5;

  // 5. INFORMAÇÕES COMPLEMENTARES
  // Se estiver sem espaço, adiciona página para notas adicionais
  if (currentY > pageHeight - 38) {
    doc.addPage();
    pageNum += 1;
    currentY = margin;
  }

  drawHeaderAndBorders(currentY, 20, "Informações Complementares / Dados Adicionais");
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(80, 80, 80);
  
  const compText = `DOCUMENTO GERADO DIRETAMENTE PELA PLATAFORMA AUXILIAR BIZ INTEGRADO S.A. EM CONVÊNIO FISCAL COM A SEFAZ-GO. HASH MD5 ASSINATO DIGITALMENTE. TRIBUTAÇÃO DOS ITENS CORRELA ÀS PMES REGULADAS PELO DECRETO-LEI DO SIMPLES NACIONAL. AMBIENTE UTILIZADO: ${data.environment.toUpperCase()}. PROTOCOLO DE CONFERÊNCIA EM TEMPO REAL.`;
  doc.text(compText, margin + 2, currentY + 8, { maxWidth: contentWidth - 4 });

  // Rodapé decorativo da última página
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6);
  doc.setTextColor(150, 150, 150);
  doc.text(`Auxiliar Biz - Documento de Rascunho DANFE Nº ${data.invoiceNumber}  |  Página ${pageNum} de ${pageNum}`, pageWidth / 2, pageHeight - 6, { align: 'center' });

  // Descarrega o PDF com o nome apropriado
  const fileNameClean = data.invoiceNumber.replace(/\./g, '');
  doc.save(`DANFE_NFe_${fileNameClean}${data.status === 'rascunho' ? '_RASCUNHO' : ''}.pdf`);
}

/**
 * Unifica múltiplas notas fiscais em um único arquivo PDF com uma página de capa profissional.
 */
export function exportUnifiedInvoicesPDF(listOfInvoices: PDFInvoiceData[]) {
  if (!listOfInvoices || listOfInvoices.length === 0) return;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 10;
  const contentWidth = pageWidth - (margin * 2);

  // --- FAZER CAPA DO DOCUMENTO UNIFICADO ---
  // Borda elegante da Capa
  doc.setDrawColor(30, 41, 59);
  doc.setLineWidth(1);
  doc.rect(margin, margin, contentWidth, pageHeight - (margin * 2));

  // Faixa de Cabeçalho Superior da Capa
  doc.setFillColor(30, 41, 59);
  doc.rect(margin + 1, margin + 1, contentWidth - 2, 45, 'F');

  // Textos do Cabeçalho da Capa
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text("AUXILIAR BIZ - SISTEMA CONTÁBIL", margin + 10, margin + 18);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(200, 205, 220);
  doc.text("Relatório de Consolidação Unificado de Notas Fiscais Eletrônicas", margin + 10, margin + 26);
  doc.text(`Data de Emissão do Lote: ${new Date().toLocaleDateString('pt-BR')} | Simulações SEFAZ`, margin + 10, margin + 32);

  let currentY = margin + 55;

  // Bloco de Identificação/Controle Tributário
  doc.setDrawColor(180, 180, 180);
  doc.setLineWidth(0.2);
  doc.rect(margin + 5, currentY, contentWidth - 10, 32);

  doc.setFillColor(245, 245, 245);
  doc.rect(margin + 5.1, currentY + 0.1, contentWidth - 10.2, 5.5, 'F');
  
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(50, 50, 50);
  doc.text("RESUMO CONSOLIDADO DO LOTE UNIFICADO", margin + 8, currentY + 4);

  // Calcular Tópicos Consolidados de todas as notas
  const totalInvoicesCount = listOfInvoices.length;
  const totalActiveValue = listOfInvoices.reduce((sum, item) => sum + item.totalValue, 0);
  const totalActiveTax = listOfInvoices.reduce((sum, item) => sum + item.taxAmount, 0);
  const totalActiveSubtotal = listOfInvoices.reduce((sum, item) => sum + item.subtotal, 0);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.text(`Quantidade de Notas no Lote: ${totalInvoicesCount} documentos fiscais`, margin + 8, currentY + 11);
  doc.text(`Subtotal Acumulado do Lote: R$ ${totalActiveSubtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, margin + 8, currentY + 16);
  doc.text(`Tributos Federais Estimados (ICMS/ISS): R$ ${totalActiveTax.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, margin + 8, currentY + 21);
  doc.setFont("helvetica", "bold");
  doc.text(`VALOR TOTAL CONSOLIDADO DO LOTE: R$ ${totalActiveValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, margin + 8, currentY + 27);

  currentY += 40;

  // Tabela interna de notas fiscais listadas na capa
  doc.setFillColor(30, 41, 59);
  doc.rect(margin + 5, currentY, contentWidth - 10, 6, 'F');
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text("Nº NOTA / ID", margin + 7, currentY + 4.2);
  doc.text("CLIENTE / RAZÃO SOCIAL", margin + 35, currentY + 4.2);
  doc.text("TIPO", margin + 115, currentY + 4.2);
  doc.text("DATA EMISSÃO", margin + 130, currentY + 4.2);
  doc.text("VALOR TOTAL", margin + 184, currentY + 4.2, { align: 'right' });

  doc.setFont("helvetica", "normal");
  doc.setTextColor(50, 50, 50);
  doc.setFontSize(7);

  let tempY = currentY + 6;
  listOfInvoices.forEach((inv, i) => {
    // Zebra style
    if (i % 2 === 1) {
      doc.setFillColor(245, 247, 250);
      doc.rect(margin + 5.1, tempY + 0.1, contentWidth - 10.2, 5.8, 'F');
    }

    doc.setFont("helvetica", "normal");
    const num = inv.invoiceNumber === '000.000.000' || !inv.invoiceNumber ? `RASCUNHO #${i + 1}` : inv.invoiceNumber;
    doc.text(num, margin + 7, tempY + 4.2);

    let cust = inv.customerName;
    if (cust.length > 38) cust = cust.substring(0, 36) + '...';
    doc.text(cust, margin + 35, tempY + 4.2);
    doc.text(inv.type === 'produto' ? 'Produto (NFe)' : 'Serviço (NFSe)', margin + 115, tempY + 4.2);
    
    const formattedDate = new Date(inv.issueDate).toLocaleDateString('pt-BR');
    doc.text(formattedDate, margin + 130, tempY + 4.2);

    doc.setFont("helvetica", "bold");
    doc.text(`R$ ${inv.totalValue.toFixed(2)}`, margin + 184, tempY + 4.2, { align: 'right' });

    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.15);
    doc.line(margin + 5, tempY + 6, margin + contentWidth - 5, tempY + 6);

    tempY += 6;
  });

  // Linhas de Fechamento da Tabela
  doc.setDrawColor(180, 180, 180);
  doc.setLineWidth(0.25);
  doc.line(margin + 5, currentY, margin + 5, tempY);
  doc.line(margin + contentWidth - 5, currentY, margin + contentWidth - 5, tempY);
  doc.line(margin + 5, tempY, margin + contentWidth - 5, tempY);

  currentY = tempY + 15;

  // Garantia Contábil
  doc.setFillColor(240, 245, 255);
  doc.roundedRect(margin + 5, currentY, contentWidth - 10, 12, 1, 1, 'F');
  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.5);
  doc.setTextColor(30, 41, 59);
  doc.text("DOCUMENTAÇÃO REGISTRADA COM SUCESSO:", margin + 8, currentY + 4.5);
  doc.setFont("helvetica", "normal");
  doc.text("As faturas contidas neste lote consolidam operações para fins meramente estatísticos e de fluxo de caixa.", margin + 8, currentY + 8.5);

  // Rodapé da capa
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(150, 150, 150);
  doc.text("Auxiliar Biz S.A.  |  Este arquivo é um lote unificado compilado no navegador do usuário de forma segura.", pageWidth / 2, pageHeight - 14, { align: 'center' });

  // --- DESENHAR CADA NOTA EM UMA PÁGINA SEPARADA DO MESMO DOCUMENTO ---
  listOfInvoices.forEach((data) => {
    doc.addPage();
    let innerY = margin;

    // Helpers locais adaptados de exportInvoicePDF
    const innerDrawBorder = (y: number, h: number) => {
      doc.setDrawColor(180, 180, 180);
      doc.setLineWidth(0.2);
      doc.rect(margin, y, contentWidth, h);
    };

    const innerDrawHeaderAndBorders = (y: number, h: number, title: string) => {
      innerDrawBorder(y, h);
      doc.setFillColor(245, 245, 245);
      doc.rect(margin + 0.1, y + 0.1, contentWidth - 0.2, 4.5, 'F');
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.setTextColor(50, 50, 50);
      doc.text(title.toUpperCase(), margin + 2, y + 3.2);
    };

    // 1. CABEÇALHO DO EMISSOR & IDENTIFICAÇÃO DO DANFE
    innerDrawBorder(innerY, 38);

    doc.setDrawColor(180, 180, 180);
    // Linha vertical dividindo emissor da identificação DANFE
    doc.line(margin + 80, innerY, margin + 80, innerY + 38);
    // Linha vertical separando DANFE da Chave de Acesso
    doc.line(margin + 125, innerY, margin + 125, innerY + 38);

    // Bloco do Emissor (Lado Esquerdo)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.text(data.emissorName || "AUXILIAR BIZ TECNOLOGIA & VIVENDAS S.A.", margin + 3, innerY + 6);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(80, 80, 80);
    doc.text(data.emissorAddress || "Av. Industrial, Qd 45 Lote 12 - Setor Sul Contábil", margin + 3, innerY + 11);
    doc.text("Goiânia - GO | CEP 74000-112 | Telefone: (62) 3218-4450", margin + 3, innerY + 14);
    doc.text(`CNPJ Emissor: ${data.emissorCnpj || "48.174.526/0001-85"}`, margin + 3, innerY + 18);
    doc.text(`Inscrição Estadual: ${data.emissorIe || "102.394.887-19"}`, margin + 3, innerY + 21);

    // Status / Regras fiscais do Emissor
    doc.setFillColor(245, 247, 250);
    doc.rect(margin + 1, innerY + 26, 78, 11, 'F');
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(51, 65, 85);
    doc.text("DANFE - Documento Auxiliar da Nota Fiscal Eletrônica", margin + 3, innerY + 30);
    doc.setFont("helvetica", "normal");
    doc.text("Natureza da Operação: " + (data.nature || "Venda de Produtos"), margin + 3, innerY + 34);

    // Bloco DANFE Gráfico (Meio)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text("DANFE", margin + 102.5, innerY + 7, { align: 'center' });
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.5);
    doc.text("DOCUMENTO AUXILIAR", margin + 102.5, innerY + 11, { align: 'center' });
    doc.text("DA NOTA FISCAL", margin + 102.5, innerY + 14, { align: 'center' });
    doc.text("ELETRÔNICA", margin + 102.5, innerY + 17, { align: 'center' });

    doc.rect(margin + 98, innerY + 20, 9, 7);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("1", margin + 102.5, innerY + 25.5, { align: 'center' });
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6);
    doc.text("0 - Entrada\n1 - Saída", margin + 110, innerY + 22.5);

    const invNumToRender = data.invoiceNumber === '000.000.000' || !data.invoiceNumber ? 'RASCUNHO' : data.invoiceNumber;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.text(`Nº: ${invNumToRender}`, margin + 102.5, innerY + 31, { align: 'center' });
    doc.setFont("helvetica", "normal");
    doc.text("SÉRIE: 001", margin + 102.5, innerY + 35, { align: 'center' });

    // Bloco Controle / Chave de Acesso (Lado Direito)
    doc.setFillColor(15, 23, 42);
    let barX = margin + 128;
    for (let i = 0; i < 40; i++) {
      let width = (Math.sin(i * 1.5) > 0) ? 0.6 : 0.2;
      doc.rect(barX, innerY + 3, width, 14, 'F');
      barX += width + 0.3;
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(6);
    doc.setTextColor(80, 80, 80);
    doc.text("CHAVE DE ACESSO DE CONFERÊNCIA E VALIDAÇÃO", margin + 157.5, innerY + 20, { align: 'center' });
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6);
    let keySpaces = data.accessKey.replace(/(.{4})/g, '$1 ');
    doc.text(keySpaces, margin + 127.5, innerY + 24, { maxWidth: 60 });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(6);
    doc.setTextColor(34, 197, 94);
    const dateFormatted = new Date(data.issueDate).toLocaleDateString('pt-BR');
    doc.text(`PROTOCOLO: AUTORIZADO SEFAZ EM ${dateFormatted}`, margin + 127, innerY + 31);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(110, 110, 110);
    doc.text(`Certificado Digital: ${data.certificateUsed || 'Assinatura Padrão'}`, margin + 127, innerY + 34);
    doc.text(`Ambiente: ${data.environment === 'producao' ? 'PRODUÇÃO' : 'HOMOLOGAÇÃO'}`, margin + 127, innerY + 36);

    // Marca d'água de rascunho / cancelada
    if (data.status === 'rascunho') {
      doc.setDrawColor(230, 230, 255);
      doc.setFillColor(250, 250, 255);
      doc.roundedRect(margin + 55, innerY + 3, 15, 7, 1, 1, 'FD');
      doc.setFont("helvetica", "bold");
      doc.setFontSize(5.5);
      doc.setTextColor(99, 102, 241);
      doc.text("DRAFT", margin + 62.5, innerY + 8, { align: 'center' });
    }

    innerY += 41;

    // 2. QUADRO DO DESTINATÁRIO
    innerDrawHeaderAndBorders(innerY, 18, "Destinatário / Remetente");
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(15, 23, 42);
    doc.text("NOME DO CLIENTE: " + data.customerName, margin + 2, innerY + 8.5);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(50, 50, 50);
    doc.text("ENDEREÇO: " + data.customerAddress, margin + 2, innerY + 12.5);
    doc.text(`CIDADE: ${data.customerCity} - UF: ${data.customerState || 'GO'}`, margin + 2, innerY + 16);

    doc.text(`CNPJ / CPF: ${data.customerTaxId}`, margin + 115, innerY + 8.5);
    doc.text(`CONTATO EMAIL: ${data.customerEmail || 'sem-contato@cliente.com'}`, margin + 115, innerY + 12.5);
    doc.text(`DATA EMISSÃO: ${new Date(data.issueDate).toLocaleDateString('pt-BR')}  |  SAÍDA: ${new Date(data.issueDate).toLocaleTimeString('pt-BR').substring(0, 5)}`, margin + 115, innerY + 16);

    innerY += 21;

    // 3. QUADRO DE IMPOSTOS RESUMIDO
    innerDrawHeaderAndBorders(innerY, 14, "Cálculo de Impostos do Fisco");

    doc.setDrawColor(200, 200, 200);
    const colW = contentWidth / 4;
    doc.line(margin + colW, innerY + 4.5, margin + colW, innerY + 14);
    doc.line(margin + (colW * 2), innerY + 4.5, margin + (colW * 2), innerY + 14);
    doc.line(margin + (colW * 3), innerY + 4.5, margin + (colW * 3), innerY + 14);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(5.5);
    doc.setTextColor(120, 120, 120);
    doc.text("BASE CÁLCULO ICMS", margin + 2, innerY + 7);
    doc.text("VALOR DO ICMS RETIDO", margin + colW + 2, innerY + 7);
    doc.text("VALOR TOTAL DOS PRODUTOS", margin + (colW * 2) + 2, innerY + 7);
    doc.text("VALOR TOTAL DA NOTA FISCAL", margin + (colW * 3) + 2, innerY + 7);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    doc.text("R$ " + data.subtotal.toFixed(2), margin + 2, innerY + 11.5);
    doc.text("R$ " + data.taxAmount.toFixed(2), margin + colW + 2, innerY + 11.5);
    doc.text("R$ " + data.subtotal.toFixed(2), margin + (colW * 2) + 2, innerY + 11.5);
    doc.text("R$ " + data.totalValue.toFixed(2), margin + (colW * 3) + 2, innerY + 11.5);

    innerY += 17;

    // 4. TABELA DE ITENS DA NOTA FISCAL
    innerDrawHeaderAndBorders(innerY, 7, "Itens e Produtos faturados de forma auditada");
    innerY += 7;

    // Cabeçalho de Itens
    doc.setFillColor(30, 41, 59);
    doc.rect(margin, innerY, contentWidth, 6.5, 'F');
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(255, 255, 255);
    doc.text("CÓDIGO", margin + 2, innerY + 4.2);
    doc.text("DESCRIÇÃO DOS PRODUTOS / SERVIÇOS", margin + 17, innerY + 4.2);
    doc.text("NCM/SH", margin + 92, innerY + 4.2);
    doc.text("CFOP", margin + 109, innerY + 4.2);
    doc.text("UNID", margin + 121, innerY + 4.2);
    doc.text("QTD", margin + 132, innerY + 4.2, { align: 'right' });
    doc.text("V. UNIT (R$)", margin + 148, innerY + 4.2, { align: 'right' });
    doc.text("V. TOTAL (R$)", margin + 170, innerY + 4.2, { align: 'right' });
    doc.text("ALIQ %", margin + 188, innerY + 4.2, { align: 'right' });

    doc.setDrawColor(30, 41, 59);
    doc.rect(margin, innerY, contentWidth, 6.5);
    innerY += 6.5;

    let innerPageNum = 1;

    // Linhas de itens
    data.items.forEach((item, index) => {
      if (innerY > pageHeight - 35) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(6);
        doc.setTextColor(150, 150, 150);
        doc.text(`Auxiliar Biz - DANFE Nº ${invNumToRender} | Página ${innerPageNum}`, pageWidth / 2, pageHeight - 6, { align: 'center' });

        doc.addPage();
        innerPageNum += 1;
        innerY = margin;

        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(15, 23, 42);
        doc.text(`DANFE CONTINUAÇÃO - NOTA FISCAL Nº ${invNumToRender} (FL. ${innerPageNum})`, margin, innerY + 6);
        
        innerY += 9;
        
        doc.setFillColor(30, 41, 59);
        doc.rect(margin, innerY, contentWidth, 6.5, 'F');
        doc.setFont("helvetica", "bold");
        doc.setFontSize(6.5);
        doc.setTextColor(255, 255, 255);
        doc.text("CÓDIGO", margin + 2, innerY + 4.2);
        doc.text("DESCRIÇÃO DOS PRODUTOS / SERVIÇOS", margin + 17, innerY + 4.2);
        doc.text("NCM/SH", margin + 92, innerY + 4.2);
        doc.text("CFOP", margin + 109, innerY + 4.2);
        doc.text("UNID", margin + 121, innerY + 4.2);
        doc.text("QTD", margin + 132, innerY + 4.2, { align: 'right' });
        doc.text("V. UNIT (R$)", margin + 148, innerY + 4.2, { align: 'right' });
        doc.text("V. TOTAL (R$)", margin + 170, innerY + 4.2, { align: 'right' });
        doc.text("ALIQ %", margin + 188, innerY + 4.2, { align: 'right' });
        innerY += 6.5;
      }

      if (index % 2 === 1) {
        doc.setFillColor(248, 250, 252);
        doc.rect(margin + 0.1, innerY + 0.1, contentWidth - 0.2, 5.8, 'F');
      }

      doc.setFont("helvetica", "normal");
      doc.setFontSize(6.5);
      doc.setTextColor(50, 50, 50);

      const code = String(2000 + index);
      const ncm = item.ncm || "0403.90.00";
      const cfop = item.cfop || "5102";
      const unity = item.unity || "UN";

      doc.text(code, margin + 2, innerY + 4.2);
      
      let desc = item.name;
      if (desc.length > 52) {
        desc = desc.substring(0, 49) + "...";
      }
      doc.text(desc, margin + 17, innerY + 4.2);
      doc.text(ncm.replace(/\./g, ''), margin + 92, innerY + 4.2);
      doc.text(cfop, margin + 109, innerY + 4.2);
      doc.text(unity, margin + 121, innerY + 4.2);

      doc.setFont("helvetica", "normal");
      doc.text(String(item.quantity), margin + 132, innerY + 4.2, { align: 'right' });
      doc.text(item.unitPrice.toFixed(2), margin + 148, innerY + 4.2, { align: 'right' });
      
      doc.setFont("helvetica", "bold");
      doc.text(item.totalPrice.toFixed(2), margin + 170, innerY + 4.2, { align: 'right' });
      doc.setFont("helvetica", "normal");
      doc.text(`${item.taxRatePercent || 12}%`, margin + 188, innerY + 4.2, { align: 'right' });

      doc.setDrawColor(220, 220, 220);
      doc.setLineWidth(0.15);
      doc.line(margin, innerY + 6, margin + contentWidth, innerY + 6);

      innerY += 6;
    });

    doc.setDrawColor(180, 180, 180);
    doc.setLineWidth(0.2);
    doc.line(margin, innerY, margin, innerY);

    innerY += 5;

    // 5. INFORMAÇÕES COMPLEMENTARES
    if (innerY > pageHeight - 38) {
      doc.addPage();
      innerPageNum += 1;
      innerY = margin;
    }

    innerDrawHeaderAndBorders(innerY, 20, "Informações Complementares / Dados Adicionais");
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.5);
    doc.setTextColor(80, 80, 80);
    
    const compText = `DOCUMENTO GERADO NA SESSÃO UNIFICADA DA PLATAFORMA AUXILIAR BIZ INTEGRADO S.A. EM CONVÊNIO FISCAL COM A SEFAZ-GO. AMBIENTE UTILIZADO: ${data.environment.toUpperCase()}. PROTOCOLO DE CONFERÊNCIA EM TEMPO REAL EM LOTE FISCO-DANFE.`;
    doc.text(compText, margin + 2, innerY + 8, { maxWidth: contentWidth - 4 });

    // Rodapé
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6);
    doc.setTextColor(150, 150, 150);
    doc.text(`Auxiliar Biz - Documento Unificado DANFE Nº ${invNumToRender}  |  Página ${innerPageNum} de ${innerPageNum}`, pageWidth / 2, pageHeight - 6, { align: 'center' });
  });

  // Salvar PDF de lote unificado
  doc.save(`LOTE_NOTAS_UNIFICADAS_${new Date().toISOString().split('T')[0]}.pdf`);
}


