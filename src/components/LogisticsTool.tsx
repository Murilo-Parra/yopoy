/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Scan, 
  MapPin, 
  Calendar, 
  AlertTriangle, 
  Box, 
  Layers, 
  Plus, 
  Trash2, 
  Clock, 
  Search, 
  Check, 
  RefreshCw,
  PlusCircle,
  MinusCircle,
  HelpCircle,
  FileSpreadsheet,
  X,
  Download,
  FileText,
  Pencil,
  CheckCircle2,
  ChevronDown,
  CheckSquare,
  Sliders,
  ShoppingCart,
  DollarSign,
  Phone,
  Mail,
  MessageSquare,
  Copy,
  ExternalLink,
  User,
  Info,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { Product, Employee, Task, Transaction } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { exportProductsCSV, exportProductsPDF } from '../utils/exportUtils';
import StockDistributionChart from './StockDistributionChart';

export interface Supplier {
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  notes: string;
}

export function getSupplierForProduct(product: Product): Supplier {
  const cat = product.category || '';
  if (cat.includes('Laticínios')) {
    return {
      name: 'Vigor Provedores de Laticínios Ltda.',
      contactPerson: 'Carlos Alberto (Representante)',
      phone: '+55 11 98124-5544',
      email: 'pedidos.laticinios@vigorcentral.com.br',
      notes: 'Entrega ágil em até 48h. Mínimo de 100 unidades por pedido.'
    };
  }
  if (cat.includes('Grãos')) {
    return {
      name: 'Cerealista Vale do Sol Ltda.',
      contactPerson: 'Marcos Ferreira (Gerente)',
      phone: '+55 41 99188-7766',
      email: 'vendas@cerealistavaledosol.com.br',
      notes: 'Pedidos fechados às sextas-feiras. Faturado em 30 dias.'
    };
  }
  if (cat.includes('Molhos') || cat.includes('Conservas')) {
    return {
      name: 'Liza Alimentos Atacadista S/A',
      contactPerson: 'Juliana Mendes (Vendas Corporativas)',
      phone: '+55 11 97412-3366',
      email: 'atendimento@lizaalimentos.com.br',
      notes: 'Descontos de 15% acima de R$ 1.500,00 em faturamento de molhos.'
    };
  }
  if (cat.includes('Bebidas')) {
    return {
      name: 'Mega Distribuidora de Bebidas Ltda.',
      contactPerson: 'Fernando Lima (Logística comercial)',
      phone: '+55 11 96541-8899',
      email: 'comercial@megabebidas.com.br',
      notes: 'Isenção de frete para entregas regionais às terças e quintas.'
    };
  }
  if (cat.includes('Frios') || cat.includes('Carnes')) {
    return {
      name: 'Frigorífico Estrela Alimentos S/A',
      contactPerson: 'Sandra Rocha (Responsável Direto)',
      phone: '+55 19 98877-4433',
      email: 'pedidos@frigorificocentral.com.br',
      notes: 'Cadeia de frio certificada. Pedidos mínimos de 80kg.'
    };
  }
  // Default fallback (e.g. Mercearia, Limpeza, etc.)
  return {
    name: 'Distribuidora de Alimentos Brasil Co.',
    contactPerson: 'Paula Souza (Faturamento & Atacado)',
    phone: '+55 11 97063-2211',
    email: 'vendas.atacado@alimentosbrasil.com.br',
    notes: 'Fornecedor geral de mercearia seca e embalagens.'
  };
}

interface LogisticsToolProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  theme: 'light' | 'dark';
  employees: Employee[];
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  transactions?: Transaction[];
  setTransactions?: React.Dispatch<React.SetStateAction<Transaction[]>>;
  userPlan?: string;
}

export default function LogisticsTool({ 
  products, 
  setProducts, 
  theme, 
  employees, 
  tasks, 
  setTasks,
  transactions,
  setTransactions,
  userPlan = 'media'
}: LogisticsToolProps) {
  // Estado para aba ativa na logística
  const [activeLogisticsTab, setActiveLogisticsTab] = useState<'inventory' | 'alerts'>('inventory');

  // Estado para busca/input de código de barras
  const [barcodeInput, setBarcodeInput] = useState('');
  const [scannedProduct, setScannedProduct] = useState<Product | null>(null);
  const [scanningActive, setScanningActive] = useState(false);
  const [scanMessage, setScanMessage] = useState<string | null>(null);

  // Estado para encaminhar alertas como tarefas para funcionários
  const [forwardingAlertTask, setForwardingAlertTask] = useState<{
    type: 'expiring' | 'expired' | 'low_stock';
    product: Product;
    title: string;
  } | null>(null);

  const [forwardSuccessMessage, setForwardSuccessMessage] = useState<string | null>(null);

  // Estados de Filtro/Pesquisa Geral
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [lowStockThreshold, setLowStockThreshold] = useState<number>(() => {
    const saved = localStorage.getItem('biz_simulated_low_stock_threshold');
    if (saved) {
      const parsed = parseInt(saved, 10);
      if (!isNaN(parsed)) return parsed;
    }
    return 10;
  });

  useEffect(() => {
    localStorage.setItem('biz_simulated_low_stock_threshold', lowStockThreshold.toString());
  }, [lowStockThreshold]);

  // Estados para edição direta de quantidade na tabela
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editingQtyValue, setEditingQtyValue] = useState<string>('');

  // Estado de seleção de itens na tabela de estoque de produtos
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [isExportSelectedDropdownOpen, setIsExportSelectedDropdownOpen] = useState(false);
  const [isInventoryModalOpen, setIsInventoryModalOpen] = useState(false);

  const handleSaveDirectQty = (prodId: string) => {
    const val = parseInt(editingQtyValue, 10);
    if (!isNaN(val) && val >= 0) {
      setProducts(prev => prev.map(p => {
        if (p.id === prodId) {
          const updated = { ...p, qty: val };
          if (scannedProduct && scannedProduct.id === prodId) {
            setScannedProduct(updated);
          }
          return updated;
        }
        return p;
      }));
    }
    setEditingProductId(null);
  };

  // Formulário para Cadastro de Novo Lote de Mercadoria
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newBarcode, setNewBarcode] = useState('');
  const [newName, setNewName] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newManufacture, setNewManufacture] = useState('2026-01-01');
  const [newExpiration, setNewExpiration] = useState('2026-06-05'); // Próximo de vencer de mentira
  const [newBatch, setNewBatch] = useState('');
  const [newQty, setNewQty] = useState('');
  const [newCategory, setNewCategory] = useState('Laticínios');

  const [addModalTab, setAddModalTab] = useState<'comercial' | 'fiscal' | 'tributaria'>('comercial');
  const [editModalTab, setEditModalTab] = useState<'comercial' | 'fiscal' | 'tributaria'>('comercial');

  // Novos campos fiscais para adição
  const [newInternalCode, setNewInternalCode] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newUnit, setNewUnit] = useState('UN');
  const [newNcm, setNewNcm] = useState('');
  const [newCest, setNewCest] = useState('');
  const [newGtin, setNewGtin] = useState('');
  const [newOrigin, setNewOrigin] = useState('0');
  const [newCfopDefault, setNewCfopDefault] = useState('5102');
  const [newCstIcms, setNewCstIcms] = useState('00');
  const [newCsosn, setNewCsosn] = useState('102');
  const [newCstPis, setNewCstPis] = useState('01');
  const [newCstCofins, setNewCstCofins] = useState('01');
  const [newCstIpi, setNewCstIpi] = useState('99');
  const [newPrice, setNewPrice] = useState('');

  // Estados para Edição Multi-campos de Produto
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editName, setEditName] = useState('');
  const [editBarcode, setEditBarcode] = useState('');
  const [editBatch, setEditBatch] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [editCategory, setEditCategory] = useState('Laticínios');
  const [editManufacture, setEditManufacture] = useState('');
  const [editExpiration, setEditExpiration] = useState('');
  const [editQty, setEditQty] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editLowStockThreshold, setEditLowStockThreshold] = useState('');

  // Novos campos fiscais para edição
  const [editInternalCode, setEditInternalCode] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editUnit, setEditUnit] = useState('UN');
  const [editNcm, setEditNcm] = useState('');
  const [editCest, setEditCest] = useState('');
  const [editGtin, setEditGtin] = useState('');
  const [editOrigin, setEditOrigin] = useState('0');
  const [editCfopDefault, setEditCfopDefault] = useState('5102');
  const [editCstIcms, setEditCstIcms] = useState('00');
  const [editCsosn, setEditCsosn] = useState('102');
  const [editCstPis, setEditCstPis] = useState('01');
  const [editCstCofins, setEditCstCofins] = useState('01');
  const [editCstIpi, setEditCstIpi] = useState('99');

  const logFiscalAlteration = async (action: string, details: string) => {
    try {
      const token = localStorage.getItem('biz_token');
      await fetch('/api/audit/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ action, details })
      });
    } catch (e) {
      console.warn("Falha ao registrar auditoria fiscal no servidor:", e);
    }
  };

  const validateFiscalFields = (ncm: string, cest: string, gtin: string): string | null => {
    if (ncm) {
      const cleanNcm = ncm.replace(/\D/g, '');
      if (cleanNcm.length !== 8) {
        return 'O código NCM (Nomenclatura Comum do Mercosul) deve conter exatamente 8 dígitos numéricos.';
      }
    }
    
    if (cest) {
      const cleanCest = cest.replace(/\D/g, '');
      if (cleanCest.length !== 7) {
        return 'O código CEST (Código Especificador da Substituição Tributária) deve conter exatamente 7 dígitos numéricos.';
      }
    }
    
    if (gtin) {
      const cleanGtin = gtin.trim().toUpperCase();
      if (cleanGtin !== 'SEM GTIN') {
        const numericGtin = cleanGtin.replace(/\D/g, '');
        if (cleanGtin.includes(' ') || numericGtin.length !== cleanGtin.length || ![8, 12, 13, 14].includes(numericGtin.length)) {
          return 'O código GTIN/EAN deve ser preenchido como "SEM GTIN" ou conter exatamente 8, 12, 13 ou 14 dígitos numéricos.';
        }
      }
    }
    
    return null;
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setEditName(product.name);
    setEditBarcode(product.barcode);
    setEditBatch(product.batch);
    setEditLocation(product.location);
    setEditCategory(product.category);
    setEditManufacture(product.manufactureDate);
    setEditExpiration(product.expirationDate);
    setEditQty(product.qty.toString());
    setEditPrice(product.price !== undefined ? product.price.toString() : '');
    setEditLowStockThreshold(product.lowStockThreshold !== undefined ? product.lowStockThreshold.toString() : '');
    
    setEditInternalCode(product.internalCode || '');
    setEditDescription(product.description || '');
    setEditUnit(product.unit || 'UN');
    setEditNcm(product.ncm || '');
    setEditCest(product.cest || '');
    setEditGtin(product.gtin || '');
    setEditOrigin(product.origin || '0');
    setEditCfopDefault(product.cfopDefault || '5102');
    setEditCstIcms(product.cstIcms || '00');
    setEditCsosn(product.csosn || '102');
    setEditCstPis(product.cstPis || '01');
    setEditCstCofins(product.cstCofins || '01');
    setEditCstIpi(product.cstIpi || '99');
    
    setIsEditModalOpen(true);
  };

  const handleUpdateProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const validationError = validateFiscalFields(editNcm, editCest, editGtin);
    if (validationError) {
      alert(validationError);
      return;
    }

    const updatedQty = parseInt(editQty, 10);
    const updatedPrice = editPrice ? parseFloat(editPrice) : undefined;
    const updatedThreshold = editLowStockThreshold ? parseInt(editLowStockThreshold, 10) : undefined;

    const changes: string[] = [];
    if (editingProduct.name !== editName) changes.push(`Nome: "${editingProduct.name}" -> "${editName}"`);
    if (editingProduct.ncm !== editNcm) changes.push(`NCM: "${editingProduct.ncm || ''}" -> "${editNcm}"`);
    if (editingProduct.cest !== editCest) changes.push(`CEST: "${editingProduct.cest || ''}" -> "${editCest}"`);
    if (editingProduct.gtin !== editGtin) changes.push(`GTIN: "${editingProduct.gtin || ''}" -> "${editGtin}"`);
    if (editingProduct.origin !== editOrigin) changes.push(`Origem: "${editingProduct.origin || ''}" -> "${editOrigin}"`);
    if (editingProduct.cfopDefault !== editCfopDefault) changes.push(`CFOP: "${editingProduct.cfopDefault || ''}" -> "${editCfopDefault}"`);
    if (editingProduct.cstIcms !== editCstIcms) changes.push(`CST ICMS: "${editingProduct.cstIcms || ''}" -> "${editCstIcms}"`);
    if (editingProduct.csosn !== editCsosn) changes.push(`CSOSN: "${editingProduct.csosn || ''}" -> "${editCsosn}"`);
    if (editingProduct.cstPis !== editCstPis) changes.push(`CST PIS: "${editingProduct.cstPis || ''}" -> "${editCstPis}"`);
    if (editingProduct.cstCofins !== editCstCofins) changes.push(`CST COFINS: "${editingProduct.cstCofins || ''}" -> "${editCstCofins}"`);
    if (editingProduct.cstIpi !== editCstIpi) changes.push(`CST IPI: "${editingProduct.cstIpi || ''}" -> "${editCstIpi}"`);
    if (editingProduct.price !== updatedPrice) changes.push(`Preço: "${editingProduct.price || '0'}" -> "${updatedPrice || '0'}"`);

    setProducts(prev => prev.map(p => {
      if (p.id === editingProduct.id) {
        const updated: Product = {
          ...p,
          name: editName,
          barcode: editBarcode,
          batch: editBatch,
          location: editLocation,
          category: editCategory,
          manufactureDate: editManufacture,
          expirationDate: editExpiration,
          qty: isNaN(updatedQty) ? p.qty : updatedQty,
          price: (updatedPrice !== undefined && !isNaN(updatedPrice)) ? updatedPrice : undefined,
          lowStockThreshold: (updatedThreshold !== undefined && !isNaN(updatedThreshold)) ? updatedThreshold : undefined,
          
          internalCode: editInternalCode,
          description: editDescription,
          unit: editUnit,
          ncm: editNcm,
          cest: editCest,
          gtin: editGtin,
          origin: editOrigin,
          cfopDefault: editCfopDefault,
          cstIcms: editCstIcms,
          csosn: editCsosn,
          cstPis: editCstPis,
          cstCofins: editCstCofins,
          cstIpi: editCstIpi
        };

        if (scannedProduct && scannedProduct.id === p.id) {
          setScannedProduct(updated);
        }
        return updated;
      }
      return p;
    }));

    if (changes.length > 0) {
      logFiscalAlteration("ALTERACAO_FISCAL_PRODUTOS", `Modificação fiscal para o produto "${editName}" (ID: ${editingProduct.id}): ${changes.join(' | ')}`);
    }

    setIsEditModalOpen(false);
    setEditingProduct(null);
  };

  // Estados para contato direto com fornecedores de suprimentos (Sem simulação de compra)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactProduct, setContactProduct] = useState<Product | null>(null);
  const [draftMessage, setDraftMessage] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const openContactModal = (product: Product) => {
    setContactProduct(product);
    const supplier = getSupplierForProduct(product);
    const threshold = product.lowStockThreshold !== undefined ? product.lowStockThreshold : lowStockThreshold;
    const missingAmount = Math.max(50, Math.ceil((threshold - product.qty) / 10) * 10);
    
    // Proposta de mensagem profissional pré-definida em português
    const msg = `Olá, ${supplier.contactPerson}!\n\n` +
      `Gostaria de solicitar uma cotação para reposição imediata do produto "${product.name}" (Lote: ${product.batch}).\n` +
      `Atualmente o nível de estoque deste lote cadastrado no nosso almoxarifado é crítico (${product.qty} unidades, abaixo do limite recomendável de ${threshold} un).\n\n` +
      `Solicitamos uma proposta comercial para o fornecimento de um lote de reposição de aproximadamente ${missingAmount} unidades.\n\n` +
      `Ficamos no aguardo de sua confirmação de preço e prazo de entrega para conclusão do pedido.\n\n` +
      `Atenciosamente,\n` +
      `Gerência Geral - Controle Operacional Integrado`;
      
    setDraftMessage(msg);
    setIsCopied(false);
    setIsContactModalOpen(true);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(draftMessage);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2500);
  };

  // Base de tempo definida pelo sistema: 2026-05-31
  const REFERENCE_DATE = useMemo(() => new Date('2026-05-31'), []);

  // Alerta de validade: 1 semana antes (<= 7 dias de diferença de validade do produto)
  const checkIsExpiringInOneWeek = (expirationStr: string): boolean => {
    const expDate = new Date(expirationStr);
    const timeDiff = expDate.getTime() - REFERENCE_DATE.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    // Entre 0 e 7 dias quer dizer que está vencendo em até 1 semana
    return daysDiff >= 0 && daysDiff <= 7;
  };

  // Alerta de validade: produto já vencido
  const checkIsExpired = (expirationStr: string): boolean => {
    const expDate = new Date(expirationStr);
    const timeDiff = expDate.getTime() - REFERENCE_DATE.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff < 0;
  };

  const checkIsLowStock = (p: Product): boolean => {
    const threshold = p.lowStockThreshold !== undefined ? p.lowStockThreshold : lowStockThreshold;
    return p.qty < threshold;
  };

  // Coleta produtos em perigo de vencimento (vencidos ou em até 7 dias) - Otimizado com useMemo!
  const expiringProducts = useMemo(() => {
    return products.filter(p => checkIsExpiringInOneWeek(p.expirationDate));
  }, [products]);

  const expiredProducts = useMemo(() => {
    return products.filter(p => checkIsExpired(p.expirationDate));
  }, [products]);

  const lowStockProducts = useMemo(() => {
    return products.filter(checkIsLowStock);
  }, [products, lowStockThreshold]);

  // Simular escaneamento automático de código de barras selecionado de forma rápida
  const handleSimulateScan = (barcode: string) => {
    setScanningActive(true);
    setBarcodeInput(barcode);
    setScanMessage(null);

    setTimeout(() => {
      const match = products.find(p => p.barcode === barcode);
      if (match) {
        setScannedProduct(match);
        setScanMessage(`Produto escaneado: ${match.name}`);
      } else {
        setScannedProduct(null);
        setScanMessage('Código de barras escaneado, mas produto não cadastrado no banco logístico.');
      }
      setScanningActive(false);
    }, 1200);
  };

  // Buscar por digitação manual de código de barras
  const handleManualSearchBarcode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!barcodeInput) return;

    setScanningActive(true);
    setScanMessage(null);

    setTimeout(() => {
      const match = products.find(p => p.barcode === barcodeInput.trim());
      if (match) {
        setScannedProduct(match);
      } else {
        setScannedProduct(null);
        setScanMessage('Código de barras não localizado. Verifique se o código está correto ou cadastre o item.');
      }
      setScanningActive(false);
    }, 600);
  };

  const handleConfirmForwardTask = (emp: Employee) => {
    if (!forwardingAlertTask) return;

    const newTask: Task = {
      id: `task-alert-${Date.now()}`,
      title: forwardingAlertTask.title,
      assignerId: 'admin',
      assignerName: 'Gerente Geral (Você)',
      assigneeId: emp.id,
      assigneeName: emp.name,
      status: 'Pendente',
      dateCreated: new Date().toLocaleDateString('pt-BR')
    };

    setTasks(prev => [newTask, ...prev]);

    // Simular resposta automática no chat do organograma
    const savedMsg = localStorage.getItem('biz_simulated_messages');
    let messages = [];
    if (savedMsg) {
      try { messages = JSON.parse(savedMsg); } catch (e) { console.error(e); }
    }
    const customMsg = {
      id: `msg-simulated-${Date.now()}`,
      senderId: emp.id,
      senderName: emp.name,
      receiverId: 'admin',
      text: `Instrução logística recebida! Vi que você encaminhou a tarefa de alerta do produto ${forwardingAlertTask.product.name} (Lote: ${forwardingAlertTask.product.batch}). Vou resolvê-la agora mesmo no setor ${forwardingAlertTask.product.location}!`,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };
    messages.push(customMsg);
    localStorage.setItem('biz_simulated_messages', JSON.stringify(messages));

    // Ativar feedback visual de sucesso na tela
    setForwardSuccessMessage(`A tarefa foi gerada e encaminhada com sucesso para ${emp.name}!`);

    setTimeout(() => {
      setForwardSuccessMessage(null);
      setForwardingAlertTask(null);
    }, 4500);
  };

  // Cadastrar Novo Produto na Logística
  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBarcode || !newName || !newLocation || !newBatch || !newQty) return;

    // Validar campos fiscais
    const validationError = validateFiscalFields(newNcm, newCest, newGtin);
    if (validationError) {
      alert(validationError);
      return;
    }

    // Verificar se o código de barras já existe
    const exists = products.some(p => p.barcode === newBarcode);
    if (exists) {
      alert('Aviso: Já existe um lote registrado com este mesmo código de barras. Registre um lote diferente ou remova o estoque anterior.');
      return;
    }

    const priceNum = newPrice ? parseFloat(newPrice) : 0.00;

    const newProd: Product = {
      id: 'prod_' + Date.now(),
      barcode: newBarcode.trim(),
      name: newName,
      location: newLocation,
      manufactureDate: newManufacture,
      expirationDate: newExpiration,
      batch: newBatch,
      qty: parseInt(newQty) || 0,
      category: newCategory,
      price: isNaN(priceNum) ? undefined : priceNum,
      
      // Mapeamento dos campos fiscais
      internalCode: newInternalCode || ('INT-' + Math.floor(Math.random() * 90000 + 10000)),
      description: newDescription,
      unit: newUnit,
      ncm: newNcm,
      cest: newCest,
      gtin: newGtin,
      origin: newOrigin,
      cfopDefault: newCfopDefault,
      cstIcms: newCstIcms,
      csosn: newCsosn,
      cstPis: newCstPis,
      cstCofins: newCstCofins,
      cstIpi: newCstIpi
    };

    setProducts(prev => [newProd, ...prev]);
    
    // Auto scale para o produto escaneado
    setScannedProduct(newProd);
    setBarcodeInput(newProd.barcode);

    // Auditoria para adição fiscal de produto
    logFiscalAlteration("CADASTRO_FISCAL_PRODUTO", `Cadastrado novo produto para emissão fiscal: "${newProd.name}" (ID: ${newProd.id}), NCM: ${newProd.ncm || 'N/A'}, GTIN: ${newProd.gtin || 'N/A'}`);

    // Reset formulário
    setNewBarcode('');
    setNewName('');
    setNewLocation('');
    setNewBatch('');
    setNewQty('');
    setNewPrice('');
    setNewInternalCode('');
    setNewDescription('');
    setNewUnit('UN');
    setNewNcm('');
    setNewCest('');
    setNewGtin('');
    setNewOrigin('0');
    setNewCfopDefault('5102');
    setNewCstIcms('00');
    setNewCsosn('102');
    setNewCstPis('01');
    setNewCstCofins('01');
    setNewCstIpi('99');
    setIsAddProductOpen(false);
  };

  // Ajustar quantidade de estoque diretamente
  const handleUpdateStockQty = (prodId: string, amount: number) => {
    setProducts(prev => prev.map(p => {
      if (p.id === prodId) {
        const nextQty = Math.max(0, p.qty + amount);
        const updated = { ...p, qty: nextQty };
        if (scannedProduct && scannedProduct.id === prodId) {
          setScannedProduct(updated);
        }
        return updated;
      }
      return p;
    }));
  };

  // Excluir Lote/Produto do Estoque
  const handleDeleteProduct = (prodId: string) => {
    if (confirm('Tem certeza que deseja dar baixa total de estoque deste lote de mercadoria?')) {
      setProducts(prev => prev.filter(p => p.id !== prodId));
      if (scannedProduct && scannedProduct.id === prodId) {
        setScannedProduct(null);
        setBarcodeInput('');
      }
    }
  };

  // Filtro de lista de estoque geral
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.barcode.includes(searchQuery) ||
                          p.batch.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'todas' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const uniqueCategories = Array.from(new Set(products.map(p => p.category)));

  return (
    <div id="logistics-module-root" className="space-y-6">
      
      {userPlan !== 'media' && userPlan !== 'corporativo' ? (
        <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-[#222228] p-10 bg-slate-50 dark:bg-[#111114]">
          <div className="absolute inset-0 z-10 bg-white/60 dark:bg-[#111114]/80 backdrop-blur-[6px] flex flex-col items-center justify-center p-6 text-center">
            <div className="p-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-4">
              <Box className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Monitoramento Inteligente de Estoque
            </h3>
            <p className={`max-w-md text-sm mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
              Múltiplos centros de distribuição, alertas preditivos de validade e baixa de estoque disponíveis exclusivamente no Plano Premium.
            </p>
            <span className={`text-xs font-bold uppercase tracking-widest mb-4 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`}>
              Disponível apenas no Plano Premium
            </span>
            <button
              onClick={() => {
                const url = new URL(window.location.href);
                url.pathname = '/';
                window.location.href = url.toString();
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-md"
            >
              Fazer Upgrade
            </button>
          </div>
          
          <div className="opacity-40 pointer-events-none select-none" aria-hidden="true">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
              <div className={`border rounded-2xl p-5 ${theme === 'dark' ? 'bg-[#1c1c24] border-red-950/45' : 'bg-amber-50/50 border-amber-250'}`}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 rounded-md bg-amber-500/20"></div>
                  <div className="h-4 w-32 bg-amber-500/20 rounded"></div>
                  <div className="h-4 w-12 bg-amber-500/20 rounded ml-auto"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-16 w-full bg-amber-500/10 rounded-xl"></div>
                  <div className="h-16 w-full bg-amber-500/10 rounded-xl"></div>
                </div>
              </div>
              <div className={`border rounded-2xl p-5 ${theme === 'dark' ? 'bg-[#1c1c24] border-red-950/45' : 'bg-red-50/50 border-red-250'}`}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 rounded-md bg-red-500/20"></div>
                  <div className="h-4 w-32 bg-red-500/20 rounded"></div>
                  <div className="h-4 w-12 bg-red-500/20 rounded ml-auto"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-16 w-full bg-red-500/10 rounded-xl"></div>
                </div>
              </div>
              <div className={`border rounded-2xl p-5 ${theme === 'dark' ? 'bg-[#1c1c24] border-[#222228]' : 'bg-slate-50 border-slate-200'}`}>
                 <div className="h-full w-full bg-slate-200 dark:bg-slate-800 rounded-xl min-h-[150px]"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Seletor de Sub-Abas de Logística */}
          <div className="flex border-b border-slate-200 dark:border-[#222228] pb-px mb-6 items-center justify-between">
            <div className="flex gap-2">
              <button
                type="button"
                id="btn-subtab-inventory"
                onClick={() => setActiveLogisticsTab('inventory')}
                className={`relative py-3 px-4 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2 ${
                  activeLogisticsTab === 'inventory'
                    ? 'text-indigo-600 dark:text-indigo-400 font-extrabold border-b-2 border-indigo-600 dark:border-indigo-400'
                    : 'text-slate-500 hover:text-slate-800 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                <span>Inventário & Terminal</span>
              </button>

              <button
                type="button"
                id="btn-subtab-alerts"
                onClick={() => setActiveLogisticsTab('alerts')}
                className={`relative py-3 px-4 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2 ${
                  activeLogisticsTab === 'alerts'
                    ? 'text-indigo-600 dark:text-indigo-400 font-extrabold border-b-2 border-indigo-600 dark:border-indigo-400'
                    : 'text-slate-500 hover:text-slate-800 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                <span>Alertas & Validade</span>
                {(expiringProducts.length > 0 || expiredProducts.length > 0 || lowStockProducts.length > 0) && (
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                )}
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-[10px] text-slate-400 dark:text-gray-500 font-mono">
              <span>REF DIA: 31/05/2026</span>
            </div>
          </div>

          {activeLogisticsTab === 'alerts' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Alertas de Vencimento de Validade em 1 Semana */}
        <div id="expiration-alerts-box" className={`border rounded-2xl p-5 shadow-sm transition-all duration-200 ${
          theme === 'dark' ? 'bg-[#1c1c24] border-red-950/45' : 'bg-amber-50/50 border-amber-250'
        }`}>
          <div className="flex items-center gap-2 text-rose-500 mb-3">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 text-amber-500 animate-pulse" />
            <h3 className={`text-sm font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-amber-400' : 'text-amber-800'}`}>Alertas de Vencimento (Próximos 7 dias)</h3>
            <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full font-semibold ml-auto ${
              theme === 'dark' ? 'bg-amber-950 text-amber-300' : 'bg-amber-100 text-amber-800 border border-amber-200'
            }`}>
              {expiringProducts.length} itens detectados
            </span>
          </div>
          
          {expiringProducts.length === 0 ? (
            <p className={`text-xs italic ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Ótimo! Nenhum lote comercial expira na próxima semana.</p>
          ) : (
            <div className="space-y-2 max-h-[170px] overflow-y-auto pr-1">
              {expiringProducts.map(p => {
                const daysLeft = Math.ceil((new Date(p.expirationDate).getTime() - REFERENCE_DATE.getTime()) / (1000 * 3600 * 24));
                const isEditingThis = editingProductId === p.id;
                return (
                  <div 
                    key={p.id} 
                    onClick={() => {
                      if (!isEditingThis) {
                        setForwardingAlertTask({
                          type: 'expiring',
                          product: p,
                          title: `Conferir lote do produto ${p.name} (Lote: ${p.batch}) com validade crítica em ${p.expirationDate} no setor ${p.location}`
                        });
                      }
                    }}
                    title="Clique para encaminhar este alerta como uma tarefa a ser resolvida por um funcionário"
                    className={`border rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 hover:bg-opacity-80 cursor-pointer transition-all hover:ring-2 hover:ring-indigo-500/85 active:scale-98 ${
                      theme === 'dark' 
                        ? 'bg-amber-950/20 border-amber-900/40 hover:bg-amber-950/30' 
                        : 'bg-white border-amber-200 hover:bg-slate-50 shadow-xs'
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <strong 
                          onClick={(e) => { e.stopPropagation(); openEditModal(p); }}
                          className={`text-xs font-semibold cursor-pointer hover:underline hover:text-indigo-400 ${theme === 'dark' ? 'text-amber-300' : 'text-amber-900'}`}
                          title="Clique para editar este produto"
                        >
                          {p.name}
                        </strong>
                        <span className={`font-mono text-[9px] px-1.5 py-0.2 rounded ${theme === 'dark' ? 'bg-amber-900 text-amber-200' : 'bg-amber-50 border border-amber-200 text-amber-700'}`}>Lote: {p.batch}</span>
                      </div>
                      <p className={`text-[10px] mt-1 flex items-center gap-1.5 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                        <MapPin className="w-3 h-3 text-gray-500" /> Loc: {p.location} • <Calendar className="w-3 h-3 text-gray-500" /> Expira em: <span className={`font-mono font-bold ${theme === 'dark' ? 'text-amber-200' : 'text-amber-700'}`}>{p.expirationDate}</span> ({daysLeft} {daysLeft === 1 ? 'dia' : 'dias'})
                      </p>
                      
                      {/* Qtd do Produto com Mudança Direta */}
                      <div className="mt-2 flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                        {isEditingThis ? (
                          <div className="flex items-center gap-1.5 animate-fade-in">
                            <span className={`text-[10px] font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>Qtd:</span>
                            <input
                              type="number"
                              min="0"
                              value={editingQtyValue}
                              onChange={(e) => setEditingQtyValue(e.target.value)}
                              onKeyDown={(ev) => {
                                if (ev.key === 'Enter') {
                                  handleSaveDirectQty(p.id);
                                } else if (ev.key === 'Escape') {
                                  setEditingProductId(null);
                                }
                              }}
                              className={`w-14 rounded-lg px-2 py-0.5 text-xs text-center font-bold font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-none border ${
                                theme === 'dark' ? 'bg-[#16161a] border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-850'
                              }`}
                              autoFocus
                            />
                            <button
                              id={`btn-confirm-alert-qty-${p.id}`}
                              onClick={() => handleSaveDirectQty(p.id)}
                              className="p-1 rounded bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer transition-colors"
                              title="Confirmar"
                            >
                              <Check className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => setEditingProductId(null)}
                              className={`p-1 rounded border cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800 ${
                                theme === 'dark' ? 'border-[#33333c] text-gray-400' : 'border-slate-200 text-slate-500'
                              }`}
                              title="Cancelar"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-[10.5px]">
                            <span className={theme === 'dark' ? 'text-amber-200/90' : 'text-slate-600'}>Qtd em Estoque:</span>
                            <strong className={`font-mono text-xs font-bold ${theme === 'dark' ? 'text-amber-300' : 'text-amber-900'}`}>{p.qty} un</strong>
                            <button
                              id={`btn-edit-alert-qty-${p.id}`}
                              onClick={() => {
                                setEditingProductId(p.id);
                                setEditingQtyValue(p.qty.toString());
                              }}
                              className="p-0.5 rounded text-slate-400 hover:text-indigo-550 dark:text-gray-500 dark:hover:text-indigo-400 transition-colors cursor-pointer hover:bg-slate-100/50 dark:hover:bg-slate-800/50"
                              title="Editar quantidade"
                            >
                              <Pencil className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap md:flex-nowrap" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => openEditModal(p)}
                        className={`text-[10px] font-bold px-2 py-1.5 rounded-lg transition-colors border cursor-pointer flex items-center gap-1 ${
                          theme === 'dark' 
                            ? 'bg-slate-800 hover:bg-slate-700 text-gray-300 border-slate-705' 
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                        }`}
                        title="Editar todos os campos"
                      >
                        <Pencil className="w-3 h-3" />
                        Editar
                      </button>
                      <button
                        id={`btn-locate-alert-${p.id}`}
                        onClick={() => handleSimulateScan(p.barcode)}
                        className={`text-[10px] font-bold px-2.5 py-1.5 rounded-lg transition-colors border cursor-pointer ${
                          theme === 'dark' 
                            ? 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border-amber-500/30' 
                            : 'bg-amber-600 hover:bg-amber-700 text-white border-amber-600'
                        }`}
                      >
                        Localizar
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Produtos Já Vencidos */}
        <div id="expired-products-box" className={`border rounded-2xl p-5 shadow-sm transition-all duration-200 ${
          theme === 'dark' ? 'bg-[#1c1c24] border-red-950/45' : 'bg-red-50/50 border-red-250'
        }`}>
          <div className="flex items-center gap-2 text-rose-500 mb-3">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 text-red-500 animate-pulse" />
            <h3 className={`text-sm font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-red-400' : 'text-red-800'}`}>Lotes de Estoque Vencidos</h3>
            <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full font-semibold ml-auto ${
              theme === 'dark' ? 'bg-red-950/80 text-red-300' : 'bg-red-100 text-red-800 border border-red-200'
            }`}>
              {expiredProducts.length} lotes críticos
            </span>
          </div>

          {expiredProducts.length === 0 ? (
            <p className={`text-xs italic ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Parabéns! Não existem mercadorias com validade vencida registradas.</p>
          ) : (
            <div className="space-y-2 max-h-[170px] overflow-y-auto pr-1">
              {expiredProducts.map(p => {
                return (
                  <div 
                    key={p.id} 
                    onClick={() => {
                      setForwardingAlertTask({
                        type: 'expired',
                        product: p,
                        title: `Retirar do estoque o lote VENCIDO de ${p.name} (Lote: ${p.batch}) no setor ${p.location} imediatamente`
                      });
                    }}
                    title="Clique para encaminhar este alerta como uma tarefa a ser resolvida por um funcionário"
                    className={`border rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 hover:bg-opacity-80 cursor-pointer transition-all hover:ring-2 hover:ring-indigo-500/85 active:scale-98 ${
                      theme === 'dark' 
                        ? 'bg-red-950/20 border-red-900/40 hover:bg-red-950/30' 
                        : 'bg-white border-red-200 hover:bg-slate-50 shadow-xs'
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <strong 
                          onClick={(e) => { e.stopPropagation(); openEditModal(p); }}
                          className={`text-xs font-bold cursor-pointer hover:underline hover:text-indigo-400 ${theme === 'dark' ? 'text-red-300' : 'text-red-900'}`}
                          title="Clique para editar este produto"
                        >
                          {p.name}
                        </strong>
                        <span className={`font-mono text-[9px] px-1.5 py-0.2 rounded ${theme === 'dark' ? 'bg-red-900 text-red-200' : 'bg-red-50 border border-red-200 text-red-700'}`}>Lote: {p.batch}</span>
                      </div>
                      <p className={`text-[10px] mt-1 flex items-center gap-1.5 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                        <MapPin className="w-3 h-3 text-gray-500" /> Loc: {p.location} • <Calendar className="w-3 h-3 text-gray-500" /> Validade: <span className={`font-mono font-bold ${theme === 'dark' ? 'text-red-400' : 'text-red-700'}`}>{p.expirationDate} (VENCIDO)</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap md:flex-nowrap" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => openEditModal(p)}
                        className={`text-[10px] font-bold px-2 py-1.5 rounded-lg transition-colors border cursor-pointer flex items-center gap-1 ${
                          theme === 'dark' 
                            ? 'bg-slate-800 hover:bg-slate-700 text-gray-300 border-slate-705' 
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                        }`}
                        title="Editar todos os campos"
                      >
                        <Pencil className="w-3 h-3" />
                        Editar
                      </button>
                      <button
                        id={`btn-locate-expired-${p.id}`}
                        onClick={() => handleSimulateScan(p.barcode)}
                        className={`text-[10px] font-bold px-2.5 py-1.5 rounded-lg transition-colors border cursor-pointer ${
                          theme === 'dark' 
                            ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400 border-red-500/30' 
                            : 'bg-red-600 hover:bg-red-700 text-white border-red-650'
                        }`}
                      >
                        Localizar
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
          )}

      {/* Tabela de Produtos com Baixo Estoque */}
      {activeLogisticsTab === 'alerts' && (
      <div id="low-stock-products-monitoring" className={`border rounded-2xl p-5 shadow-sm transition-all duration-200 ${
        theme === 'dark' ? 'bg-[#111114] border-[#222228]' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4 mb-4 dark:border-[#222228] border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-500/10 rounded-xl flex items-center justify-center">
              <Box className="w-5 h-5 text-amber-500 animate-pulse" />
            </div>
            <div>
              <h3 className={`text-sm font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-amber-400' : 'text-slate-800'}`}>
                Monitoramento de Baixo Estoque Crítico
              </h3>
              <p className={`text-xs mt-0.5 ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`}>
                Lotes ativos com quantidades abaixo do limite de <strong className="text-indigo-500 dark:text-indigo-400 font-extrabold">{lowStockThreshold} un.</strong>
              </p>
            </div>
          </div>
          <span className={`font-mono text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1.5 ${
            lowStockProducts.length === 0 
              ? 'bg-emerald-500/10 text-emerald-500' 
              : 'bg-amber-500/10 text-amber-500 animate-pulse'
          }`}>
            <AlertTriangle className="w-3.5 h-3.5" />
            {lowStockProducts.length} lotes em alerta
          </span>
        </div>

        {lowStockProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Check className="w-5 h-5" />
            </div>
            <p className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-450' : 'text-slate-600'}`}>
              Excelente! Todos os produtos estão com níveis saudáveis de estoque (acima do limite mínimo).
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border dark:border-[#222228] border-slate-150">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className={`text-[10px] uppercase font-bold tracking-wider border-b font-mono ${
                  theme === 'dark' ? 'bg-[#16161a] text-gray-400 border-[#222228]' : 'bg-slate-50 text-slate-500 border-slate-150'
                }`}>
                  <th className="py-3 px-4">Lote / Produto</th>
                  <th className="py-3 px-4">Categoria</th>
                  <th className="py-3 px-4">Código de Barras</th>
                  <th className="py-3 px-4">Localização</th>
                  <th className="py-3 px-4 text-center">Nível Mínimo</th>
                  <th className="py-3 px-4 text-center">Estoque Atual (Editar)</th>
                  <th className="py-3 px-4 text-right">Ação Corretiva</th>
                </tr>
              </thead>
              <tbody className={`divide-y text-xs ${theme === 'dark' ? 'divide-[#222228]' : 'divide-slate-150'}`}>
                {lowStockProducts.map(p => {
                  const isEditingThis = editingProductId === p.id;
                  return (
                    <tr 
                      key={p.id} 
                      className={`transition-colors ${
                        theme === 'dark' 
                          ? 'hover:bg-[#16161a]/60 text-slate-300' 
                          : 'hover:bg-slate-50/50 text-slate-705'
                      }`}
                    >
                      <td className="py-2.5 px-4">
                        <div className="flex items-center gap-1.5">
                          <div 
                            onClick={() => openContactModal(p)}
                            className="font-semibold cursor-pointer hover:underline hover:text-emerald-500 text-slate-800 dark:text-gray-200"
                            title="Clique para entrar em contato com o fornecedor deste lote"
                          >
                            {p.name}
                          </div>
                          <button
                            onClick={() => openEditModal(p)}
                            className="p-1 text-slate-400 hover:text-indigo-500 cursor-pointer"
                            title="Editar todos os campos"
                          >
                            <Pencil className="w-2.5 h-2.5" />
                          </button>
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded border ${
                            theme === 'dark' ? 'bg-[#1c1c21] text-amber-400/90 border-[#222228]' : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}>
                            LOTE: {p.batch}
                          </span>
                        </div>
                      </td>
                      <td className="py-2.5 px-4 font-medium text-[11px]">{p.category}</td>
                      <td className="py-2.5 px-4 font-mono text-[10px] text-gray-400 dark:text-gray-550">{p.barcode}</td>
                      <td className="py-2.5 px-4 font-medium font-mono text-[11px]">{p.location}</td>
                      <td className="py-2.5 px-4 text-center">
                        <span className="font-mono font-semibold text-xs text-indigo-550 dark:text-indigo-400">
                          {p.lowStockThreshold !== undefined ? p.lowStockThreshold : lowStockThreshold} un.
                        </span>
                      </td>
                      
                      {/* Célula de edição direta */}
                      <td className="py-2.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-1" onClick={(e) => e.stopPropagation()}>
                          {isEditingThis ? (
                            <div className="flex items-center gap-1.5 animate-fade-in">
                              <input
                                type="number"
                                min="0"
                                value={editingQtyValue}
                                onChange={(e) => setEditingQtyValue(e.target.value)}
                                onKeyDown={(ev) => {
                                  if (ev.key === 'Enter') {
                                    handleSaveDirectQty(p.id);
                                  } else if (ev.key === 'Escape') {
                                    setEditingProductId(null);
                                  }
                                }}
                                className={`w-14 rounded-lg px-2 py-0.5 text-xs text-center font-bold font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none border ${
                                  theme === 'dark' ? 'bg-[#16161a] border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-850'
                                }`}
                                autoFocus
                              />
                              <button
                                id={`btn-confirm-lowstock-qty-${p.id}`}
                                onClick={() => handleSaveDirectQty(p.id)}
                                className="p-1 rounded bg-amber-600 hover:bg-amber-700 text-white cursor-pointer transition-colors"
                                title="Confirmar"
                              >
                                <Check className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setEditingProductId(null)}
                                className={`p-1 rounded border cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800 ${
                                  theme === 'dark' ? 'border-[#33333c] text-gray-400' : 'border-slate-200 text-slate-500'
                                }`}
                                title="Cancelar"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 justify-center">
                              {/* Botão de ajuste rápido -5 */}
                              <button
                                onClick={() => handleUpdateStockQty(p.id, -5)}
                                className="p-0.5 rounded text-gray-450 hover:text-red-500 hover:bg-slate-100/80 dark:hover:bg-slate-800"
                                title="Reduzir 5 unidades"
                              >
                                <MinusCircle className="w-3.5 h-3.5" />
                              </button>

                              <strong className="font-mono text-xs text-amber-600 dark:text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded-lg min-w-[45px] text-center">
                                {p.qty} un
                              </strong>

                              {/* Botão de ajuste rápido +5 */}
                              <button
                                onClick={() => handleUpdateStockQty(p.id, 5)}
                                className="p-0.5 rounded text-gray-450 hover:text-emerald-500 hover:bg-slate-100/80 dark:hover:bg-slate-800"
                                title="Adicionar 5 unidades"
                              >
                                <PlusCircle className="w-3.5 h-3.5" />
                              </button>

                              <button
                                id={`btn-edit-lowstock-qty-${p.id}`}
                                onClick={() => {
                                  setEditingProductId(p.id);
                                  setEditingQtyValue(p.qty.toString());
                                }}
                                className="p-0.5 rounded text-slate-400 hover:text-indigo-500 dark:text-gray-500 dark:hover:text-indigo-400 transition-colors cursor-pointer hover:bg-slate-100/50 dark:hover:bg-slate-800/50"
                                title="Digitar quantidade manualmente"
                              >
                                <Pencil className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Ação corretiva */}
                      <td className="py-2 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5 flex-wrap">
                          <button
                            id={`btn-contact-supplier-${p.id}`}
                            onClick={() => openContactModal(p)}
                            className={`text-[10px] font-bold px-2 py-1 rounded-lg transition-colors border cursor-pointer flex items-center gap-1 hover:scale-[1.02] active:scale-[0.98] ${
                              theme === 'dark' 
                                ? 'bg-[#052e16] hover:bg-[#14532d] text-emerald-400 border-emerald-500/30' 
                                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200 shadow-3xs'
                            }`}
                            title="Entrar em contato direto com o fornecedor deste produto"
                          >
                            <Phone className="w-3.5 h-3.5 text-emerald-500" />
                            Contatar Fornecedor
                          </button>
                          <button
                            onClick={() => handleSimulateScan(p.barcode)}
                            className={`text-[10px] font-bold px-2 py-1 rounded-lg transition-colors border cursor-pointer ${
                              theme === 'dark' 
                                ? 'bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border-indigo-500/20' 
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-250 shadow-3xs'
                            }`}
                            title="Localizar no mapa / scanner"
                          >
                            Localizar
                          </button>
                          <button
                            onClick={() => {
                              setForwardingAlertTask({
                                type: 'low_stock',
                                product: p,
                                title: `Repor estoque de ${p.name} (Lote: ${p.batch}, Setor: ${p.location}). Quantidade atual: ${p.qty} un (Mínimo: ${p.lowStockThreshold !== undefined ? p.lowStockThreshold : lowStockThreshold} un).`
                              });
                            }}
                            className="text-[10px] font-bold px-2 py-1 rounded-lg transition-colors cursor-pointer text-white bg-amber-600 hover:bg-amber-700"
                            title="Enviar tarefa de reposição aos funcionários"
                          >
                            Solicitar Reposição
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      )}
      </>
      )}

      {/* Grade de Layout: Scanner na Esquerda, Banco de Dados do Estoque na Direita */}
      {(activeLogisticsTab === 'inventory' || (userPlan !== 'media' && userPlan !== 'corporativo')) && (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* COLUNA 1: LEITOR DE CÓDIGO DE BARRAS INTELIGENTE */}
        <div className="lg:col-span-5 space-y-5">
          <div className={`border p-5 rounded-2xl shadow-sm transition-all duration-200 ${
            theme === 'dark' ? 'bg-[#111114] border-[#222228]' : 'bg-white border-slate-200/90 shadow-xs'
          }`}>
            <div className={`flex items-center justify-between border-b pb-3 mb-4 ${
              theme === 'dark' ? 'border-[#222228]' : 'border-slate-100'
            }`}>
              <h3 className={`text-sm font-semibold uppercase tracking-wider flex items-center gap-2 ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`}>
                <Scan className="w-4 h-4 text-emerald-500" />
                Terminal Leitor de Código
              </h3>
              <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold font-mono ${
                theme === 'dark' ? 'bg-emerald-950 text-emerald-400' : 'bg-emerald-50 border border-emerald-200 text-emerald-700'
              }`}>
                CONEXÃO OPERACIONAL
              </span>
            </div>

            {/* Mock do Visor do Scanner de Laser */}
            <div className={`relative h-44 rounded-xl border flex flex-col items-center justify-center overflow-hidden p-4 transition-all ${
              theme === 'dark' ? 'bg-[#070709] border-[#222228]' : 'bg-slate-950/95 border-slate-300'
            }`}>
              
              {/* Linha vermelha de scanning */}
              {scanningActive && (
                <div className="absolute left-[5%] right-[5%] h-0.5 bg-red-500 shadow-[0_0_12px_rgba(239,68,68,1)] animate-scanline"></div>
              )}

              {scanningActive ? (
                <div className="text-center space-y-2 z-10">
                  <RefreshCw className="w-8 h-8 text-emerald-500 animate-spin mx-auto" />
                  <p className="text-xs text-gray-300 font-mono tracking-widest">DECODIFICANDO CÓDIGO...</p>
                </div>
              ) : scannedProduct ? (
                <div className="text-center space-y-1.5 z-10 w-full px-2">
                  <div className="bg-emerald-950 text-emerald-400 font-mono text-[9px] py-1 px-3 rounded inline-block">
                    CÓD: {scannedProduct.barcode}
                  </div>
                  <h4 className="font-bold text-gray-150 text-sm truncate">{scannedProduct.name}</h4>
                  <p className="text-[11px] text-gray-400 font-mono">Lote: {scannedProduct.batch} &bull; Endereço: {scannedProduct.location}</p>
                  <p className="text-[10px] text-gray-500">Fabricação: {scannedProduct.manufactureDate} &bull; Qtd: {scannedProduct.qty} unidades</p>
                </div>
              ) : (
                <div className="text-center space-y-2 z-10">
                  <Scan className="w-10 h-10 text-[#334155] mx-auto animate-pulse" />
                  <p className="text-xs text-gray-400 tracking-wider">AGUARDANDO LEITURA DE CÓDIGO</p>
                  <p className="text-[10px] text-gray-500 max-w-[240px] leading-relaxed mx-auto">
                    Digite o código de barras, simule o scan clicando nas mercadorias ou use o leitor de busca.
                  </p>
                </div>
              )}
            </div>

            {/* Input e bar de busca para código */}
            <form onSubmit={handleManualSearchBarcode} className="mt-4 flex gap-2">
              <input
                id="input-barcode-scan"
                type="text"
                placeholder="Ex de Código: 7891000100101"
                value={barcodeInput}
                onChange={(e) => setBarcodeInput(e.target.value)}
                className={`flex-1 rounded-xl px-3 py-2 text-xs font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all ${
                  theme === 'dark' 
                    ? 'bg-[#16161a] border-[#222228] text-slate-250 placeholder-gray-650' 
                    : 'bg-white border-slate-250 text-slate-800 placeholder-slate-400 shadow-xs'
                }`}
              />
              <button
                id="btn-confirmar-scan"
                type="submit"
                disabled={scanningActive}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition flex items-center gap-1 cursor-pointer font-sans"
              >
                <Search className="w-4 h-4" />
                Validar
              </button>
            </form>

            {scanMessage && (
              <p className={`mt-3 text-xs p-2.5 rounded-lg border font-mono ${
                theme === 'dark' 
                  ? 'text-gray-400 bg-gray-900/50 border-[#222228]' 
                  : 'text-slate-650 bg-slate-50 border-slate-200'
              }`}>
                {scanMessage}
              </p>
            )}

            {/* painel de Detalhes do Produto Selecionado */}
            {scannedProduct && (
              <div className={`mt-5 pt-4 border-t space-y-4 ${theme === 'dark' ? 'border-[#222228]' : 'border-slate-150'}`}>
                <div className={`p-4 rounded-xl border text-xs space-y-3 ${
                  theme === 'dark' ? 'bg-[#16161a] border-[#222228]' : 'bg-slate-50/50 border-slate-200'
                }`}>
                  <div className={`flex items-center justify-between border-b pb-2 ${theme === 'dark' ? 'border-[#222228]' : 'border-slate-150'}`}>
                    <span className={`text-[10px] font-bold uppercase ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`}>Localização Física</span>
                    <span className={`border font-semibold px-2 py-0.5 rounded text-[9px] uppercase tracking-wide ${
                      theme === 'dark' 
                        ? 'bg-emerald-950/70 border-emerald-900 text-emerald-400' 
                        : 'bg-emerald-50 border-emerald-250 text-emerald-700'
                    }`}>
                      ESTADO CORRETO
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-[#1e293b]' : 'bg-sky-50'}`}>
                      <MapPin className={`w-5 h-5 ${theme === 'dark' ? 'text-sky-400' : 'text-sky-600'}`} />
                    </div>
                    <div>
                      <p className={theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}>Setorizador de Prateleira:</p>
                      <p className={`font-bold text-sm font-mono mt-0.5 ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>{scannedProduct.location}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className={`p-2.5 rounded-lg border ${theme === 'dark' ? 'bg-[#111114] border-[#222228]' : 'bg-white border-slate-200'}`}>
                      <p className={theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}>Fabricação</p>
                      <p className={`font-semibold font-mono mt-0.5 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-705'}`}>{scannedProduct.manufactureDate}</p>
                    </div>
                    <div className={`p-2.5 rounded-lg border ${theme === 'dark' ? 'bg-[#111114] border-[#222228]' : 'bg-white border-slate-200'}`}>
                      <p className={theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}>Vencimento</p>
                      <p className={`font-semibold font-mono mt-0.5 ${
                        checkIsExpired(scannedProduct.expirationDate) ? (theme === 'dark' ? 'text-red-400' : 'text-red-650 font-bold') :
                        checkIsExpiringInOneWeek(scannedProduct.expirationDate) ? (theme === 'dark' ? 'text-amber-400' : 'text-amber-600 font-bold') : (theme === 'dark' ? 'text-slate-300' : 'text-slate-700')
                      }`}>
                        {scannedProduct.expirationDate}
                      </p>
                    </div>
                  </div>

                  {/* Controle rápido de Ajuste e Baixa do estoque do produto escaneado */}
                  <div className={`flex items-center justify-between pt-3 border-t ${theme === 'dark' ? 'border-[#222228]' : 'border-slate-150'}`}>
                    <div>
                      <p className={theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}>Qtd de Lote</p>
                      <p className={`font-bold text-base font-mono mt-0.5 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{scannedProduct.qty} un.</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        id="btn-sub-qty"
                        onClick={() => handleUpdateStockQty(scannedProduct.id, -10)}
                        title="Subtrair 10 unidades"
                        className={`p-1 rounded-full hover:bg-red-500/10 transition-colors cursor-pointer ${theme === 'dark' ? 'text-gray-400 hover:text-red-400' : 'text-slate-400 hover:text-red-600'}`}
                      >
                        <MinusCircle className="w-5 h-5" />
                      </button>
                      <button
                        id="btn-add-qty"
                        onClick={() => handleUpdateStockQty(scannedProduct.id, 10)}
                        title="Adicionar 10 unidades"
                        className={`p-1 rounded-full hover:bg-emerald-500/10 transition-colors cursor-pointer ${theme === 'dark' ? 'text-gray-400 hover:text-emerald-400' : 'text-slate-400 hover:text-emerald-600'}`}
                      >
                        <PlusCircle className="w-5 h-5" />
                      </button>
                      <span className={`w-px h-5 mx-1 ${theme === 'dark' ? 'bg-[#222228]' : 'bg-slate-200'}`}></span>
                      <button
                        id="btn-trash-scanned"
                        onClick={() => handleDeleteProduct(scannedProduct.id)}
                        className={`p-1.5 rounded-lg hover:bg-red-500/10 transition-colors cursor-pointer ${theme === 'dark' ? 'text-red-400 hover:text-red-600' : 'text-red-600 hover:text-red-800'}`}
                        title="Zerar lote"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        id="btn-edit-scanned-product"
                        onClick={() => openEditModal(scannedProduct)}
                        className={`p-1.5 rounded-lg hover:bg-indigo-500/10 transition-colors cursor-pointer ${theme === 'dark' ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-800'}`}
                        title="Editar Lote Completo"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>

          {/* Distribuição de Estoque por Categoria (Gráfico de Rosca) */}
          <StockDistributionChart products={products} theme={theme} />
        </div>

        {/* COLUNA 2: BANCO DE DADOS DE ESTOQUE GERAL */}
        <div className="lg:col-span-7 space-y-5">
          <div className={`border p-5 rounded-2xl shadow-sm transition-all duration-200 ${
            theme === 'dark' ? 'bg-[#111114] border-[#222228]' : 'bg-white border-slate-200/90 shadow-xs'
          }`}>
            <div className={`flex flex-wrap items-center justify-between gap-4 border-b pb-4 mb-4 ${theme === 'dark' ? 'border-[#222228]' : 'border-slate-100'}`}>
              <div>
                <h3 className={`text-base font-bold ${theme === 'dark' ? 'text-gray-200' : 'text-slate-800'}`}>Inventário de Produtos por Lote</h3>
                <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`}>
                  Exibindo e rastreando {filteredProducts.length} lotes de mercadorias em estoque físico.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <button
                    id="btn-export-selected"
                    onClick={() => setIsExportSelectedDropdownOpen(!isExportSelectedDropdownOpen)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border flex items-center gap-1.5 cursor-pointer transition-colors ${
                      selectedProductIds.length === 0
                        ? 'opacity-60 cursor-not-allowed border-gray-300 text-gray-450 bg-gray-100 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-600'
                        : theme === 'dark'
                          ? 'border-indigo-900/60 bg-indigo-950/30 text-indigo-350 hover:bg-indigo-950/50 hover:border-indigo-800'
                          : 'border-indigo-150 bg-indigo-50/75 text-indigo-750 hover:bg-indigo-50/90 hover:border-indigo-200 shadow-xs'
                    }`}
                    disabled={selectedProductIds.length === 0}
                    title="Exportar apenas os lotes de produtos selecionados por checkbox"
                  >
                    <CheckSquare className="w-3.5 h-3.5 text-indigo-500" />
                    Exportar Selecionados{selectedProductIds.length > 0 && ` (${selectedProductIds.length})`}
                    <ChevronDown className="w-3.5 h-3.5 text-indigo-500" />
                  </button>
                  {isExportSelectedDropdownOpen && selectedProductIds.length > 0 && (
                    <div className={`absolute right-0 mt-2 w-48 rounded-xl overflow-hidden shadow-lg z-30 border transition-all ${
                      theme === 'dark' ? 'bg-[#16161a] border-[#222228]' : 'bg-white border-slate-200'
                    }`}>
                      <button
                        type="button"
                        onClick={() => {
                          const selectedList = products.filter(p => selectedProductIds.includes(p.id));
                          exportProductsCSV(selectedList);
                          setIsExportSelectedDropdownOpen(false);
                        }}
                        className={`w-full text-left py-2 px-4 text-xs font-semibold flex items-center gap-2 transition-colors ${
                          theme === 'dark' ? 'text-gray-300 hover:bg-[#222228]' : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <Download className="w-3.5 h-3.5 text-slate-500" />
                        Exportar para CSV
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const selectedList = products.filter(p => selectedProductIds.includes(p.id));
                          exportProductsPDF(selectedList);
                          setIsExportSelectedDropdownOpen(false);
                        }}
                        className={`w-full text-left py-2 px-4 text-xs font-semibold flex items-center gap-2 transition-colors border-t ${
                          theme === 'dark' ? 'text-gray-300 hover:bg-[#222228] border-[#222228]' : 'text-slate-700 hover:bg-slate-50 border-slate-100'
                        }`}
                      >
                        <FileText className="w-3.5 h-3.5 text-rose-500" />
                        Exportar para PDF
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedProductIds([]);
                          setIsExportSelectedDropdownOpen(false);
                        }}
                        className={`w-full text-left py-2 px-4 text-xs font-semibold flex items-center gap-2 transition-colors border-t text-amber-600 dark:text-amber-550 hover:bg-amber-500/10 ${
                          theme === 'dark' ? 'border-[#222228]' : 'border-slate-100'
                        }`}
                      >
                        <X className="w-3.5 h-3.5" />
                        Limpar Seleção
                      </button>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => exportProductsCSV(filteredProducts)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border flex items-center gap-1 cursor-pointer transition-colors ${
                    theme === 'dark' 
                      ? 'border-gray-800 bg-gray-900 text-gray-300 hover:bg-gray-800' 
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                  title="Exportar lista em CSV / Excel"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  CSV
                </button>
                <button
                  onClick={() => exportProductsPDF(filteredProducts)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border flex items-center gap-1 cursor-pointer transition-colors ${
                    theme === 'dark' 
                      ? 'border-rose-950/40 bg-rose-950/10 text-rose-400 hover:bg-rose-950/20' 
                      : 'border-rose-100 bg-rose-50/50 text-rose-700 hover:bg-rose-50'
                  }`}
                  title="Exportar relatório em PDF"
                >
                  <FileText className="w-3.5 h-3.5 text-rose-500" />
                  PDF
                </button>
                <button
                  id="btn-cadastrar-lote"
                  onClick={() => setIsAddProductOpen(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  Cadastrar Lote
                </button>
                <button
                  type="button"
                  onClick={() => setIsInventoryModalOpen(true)}
                  title="Expandir Inventário por Lote"
                  className={`p-2 rounded-xl border transition-all active:scale-95 cursor-pointer flex items-center justify-center ${
                    theme === 'dark' 
                      ? 'bg-[#15151d] hover:bg-[#1a1a24] text-emerald-400 border-[#2b2b35]' 
                      : 'bg-slate-50 hover:bg-slate-100 text-indigo-700 border-slate-200 shadow-xs'
                  }`}
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Barra de Filtro de Categoria e Pesquisa por código/nome */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">
                  <Search className="w-4 h-4" />
                </span>
                <input
                  id="input-inventario-search"
                  type="text"
                  placeholder="Pesquisar por nome, lote ou código de barras..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full rounded-xl py-2 pl-9 pr-4 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all ${
                    theme === 'dark' 
                      ? 'bg-[#16161a] border-[#222228] text-slate-200 placeholder-gray-600' 
                      : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 shadow-xs'
                  }`}
                />
              </div>

              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={`w-full rounded-xl py-2 px-3 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all ${
                    theme === 'dark' 
                      ? 'bg-[#16161a] border-[#222228] text-slate-300' 
                      : 'bg-slate-50 border-slate-250 text-slate-700 shadow-xs'
                  }`}
                >
                  <option value="todas">Todas as categorias de mercadorias</option>
                  {uniqueCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Threshold de baixo estoque global */}
              <div className="flex items-center gap-2">
                <div className={`flex items-center gap-1.5 px-3 py-1.5 w-full justify-between rounded-xl border ${
                  theme === 'dark' 
                    ? 'bg-[#16161a] border-[#222228]' 
                    : 'bg-slate-50 border-slate-200 shadow-xs'
                }`}>
                  <span className={`text-[11px] font-semibold whitespace-nowrap flex items-center gap-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                    Estoque Baixo:
                  </span>
                  <div className="flex items-center gap-1.5">
                    <select
                      id="select-low-stock-threshold"
                      value={[5, 10, 20, 50].includes(lowStockThreshold) ? lowStockThreshold.toString() : 'custom'}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val !== 'custom') {
                          setLowStockThreshold(parseInt(val, 10));
                        } else {
                          setLowStockThreshold(15);
                        }
                      }}
                      className={`text-xs font-bold focus:outline-none bg-transparent cursor-pointer ${
                        theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                      }`}
                    >
                      <option value="5" className={theme === 'dark' ? 'bg-[#1c1c24] text-slate-300' : 'bg-white'}>&lt; 5 un.</option>
                      <option value="10" className={theme === 'dark' ? 'bg-[#1c1c24] text-slate-300' : 'bg-white'}>&lt; 10 un.</option>
                      <option value="20" className={theme === 'dark' ? 'bg-[#1c1c24] text-slate-300' : 'bg-white'}>&lt; 20 un.</option>
                      <option value="50" className={theme === 'dark' ? 'bg-[#1c1c24] text-slate-300' : 'bg-white'}>&lt; 50 un.</option>
                      <option value="custom" className={theme === 'dark' ? 'bg-[#1c1c24] text-slate-300' : 'bg-white'}>Outro...</option>
                    </select>

                    {/* Mostra o campo customizado se não for um dos valores fixos */}
                    {![5, 10, 20, 50].includes(lowStockThreshold) && (
                      <input
                        id="input-low-stock-threshold-custom"
                        type="number"
                        min="1"
                        max="200"
                        value={lowStockThreshold}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 15);
                          setLowStockThreshold(isNaN(val) ? 0 : Math.max(1, val));
                        }}
                        className={`w-12 rounded-lg px-1.5 py-0.5 text-xs text-center font-bold font-mono focus:ring-1 focus:ring-emerald-500 focus:outline-none border ${
                          theme === 'dark'
                            ? 'bg-[#111114] border-slate-700 text-white'
                            : 'bg-white border-slate-250 text-slate-800 shadow-xs'
                        }`}
                        title="Informe o limite mínimo personalizado"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Listagem de Produtos de Inventário */}
            {filteredProducts.length === 0 ? (
              <div className="p-10 text-center">
                <Box className="w-12 h-12 text-gray-650 mx-auto mb-3" />
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`}>
                  Nenhum produto cadastrado.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Barra de Seleção Ativa */}
                {selectedProductIds.length > 0 && (
                  <div className={`p-4 rounded-2xl text-xs flex flex-wrap items-center justify-between gap-3 ${
                    theme === 'dark' ? 'bg-indigo-950/20 border border-indigo-900/40' : 'bg-indigo-50/50 border border-indigo-150'
                  }`}>
                    <div className="flex items-center gap-2">
                      <CheckSquare className="w-4 h-4 text-indigo-500 dark:text-indigo-400 animate-pulse" />
                      <span className={`font-semibold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>
                        Atualmente com <strong className="text-indigo-650 dark:text-indigo-400 font-extrabold">{selectedProductIds.length}</strong> {selectedProductIds.length === 1 ? 'lote selecionado' : 'lotes selecionados'}.
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const selectedList = products.filter(p => selectedProductIds.includes(p.id));
                          exportProductsCSV(selectedList);
                        }}
                        className={`py-1.5 px-3 rounded-xl text-[11px] font-bold border font-sans cursor-pointer transition-colors ${
                          theme === 'dark' 
                            ? 'border-gray-800 bg-gray-900 text-gray-300 hover:bg-gray-800' 
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        Exportar CSV Selecionados
                      </button>
                      <button
                        onClick={() => {
                          const selectedList = products.filter(p => selectedProductIds.includes(p.id));
                          exportProductsPDF(selectedList);
                        }}
                        className={`py-1.5 px-3 rounded-xl text-[11px] font-bold border font-sans cursor-pointer transition-colors ${
                          theme === 'dark' 
                            ? 'border-rose-950/40 bg-rose-950/10 text-rose-400 hover:bg-rose-950/20' 
                            : 'border-rose-100 bg-rose-50/50 text-rose-700 hover:bg-rose-50'
                        }`}
                      >
                        Exportar PDF Selecionados
                      </button>
                      <button
                        onClick={() => setSelectedProductIds([])}
                        className={`py-1.5 px-2.5 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                          theme === 'dark' ? 'text-gray-400 hover:text-gray-100' : 'text-gray-400 hover:text-slate-800'
                        }`}
                      >
                        <X className="w-3.5 h-3.5" />
                        Limpar Seleção
                      </button>
                    </div>
                  </div>
                )}

                <div className="overflow-x-auto">
                  <table id="table-products" className="w-full text-left border-collapse">
                    <thead>
                      <tr className={`uppercase text-[10px] tracking-wider font-semibold border-b ${
                        theme === 'dark' ? 'bg-[#16161a] text-gray-500 border-[#222228]' : 'bg-slate-50 text-slate-500 border-slate-200'
                      }`}>
                        <th className="py-2.5 px-4 w-10 text-center">
                          <input
                            id="checkbox-select-all-products"
                            type="checkbox"
                            checked={filteredProducts.length > 0 && filteredProducts.every(p => selectedProductIds.includes(p.id))}
                            onChange={(e) => {
                              if (e.target.checked) {
                                const toAdd = filteredProducts.map(p => p.id);
                                setSelectedProductIds(prev => Array.from(new Set([...prev, ...toAdd])));
                              } else {
                                const toRemove = filteredProducts.map(p => p.id);
                                setSelectedProductIds(prev => prev.filter(id => !toRemove.includes(id)));
                              }
                            }}
                            className="rounded border-slate-300 text-indigo-650 focus:ring-indigo-500 cursor-pointer"
                          />
                        </th>
                        <th className="py-2.5 px-4">Lote / Nome</th>
                        <th className="py-2.5 px-4 font-mono text-[9px]">Cód Item</th>
                        <th className="py-2.5 px-4">Localização Map</th>
                        <th className="py-2.5 px-4">Vencimento</th>
                        <th className="py-2.5 px-4 text-center">Qtd</th>
                        <th className="py-2.5 px-4 text-right">Ação</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y text-xs ${theme === 'dark' ? 'divide-[#222228]' : 'divide-slate-150'}`}>
                      {filteredProducts.map(p => {
                        const expired = checkIsExpired(p.expirationDate);
                        const expiringSoon = checkIsExpiringInOneWeek(p.expirationDate);

                        return (
                          <tr 
                            key={p.id} 
                            className={`transition-colors cursor-pointer ${
                              theme === 'dark' 
                                ? `hover:bg-[#16161a]/60 ${scannedProduct && scannedProduct.id === p.id ? 'bg-emerald-950/20 border-l-2 border-l-emerald-500' : ''}` 
                                : `hover:bg-slate-50 ${scannedProduct && scannedProduct.id === p.id ? 'bg-emerald-50/70 border-l-2 border-l-emerald-600' : ''}`
                            }`}
                            onClick={() => handleSimulateScan(p.barcode)}
                          >
                            <td className="py-3 px-4 w-10 text-center" onClick={(e) => e.stopPropagation()}>
                              <input
                                type="checkbox"
                                id={`checkbox-select-product-${p.id}`}
                                checked={selectedProductIds.includes(p.id)}
                                onChange={(e) => {
                                  const checked = e.target.checked;
                                  if (checked) {
                                    setSelectedProductIds(prev => [...prev, p.id]);
                                  } else {
                                    setSelectedProductIds(prev => prev.filter(id => id !== p.id));
                                  }
                                }}
                                className="rounded border-slate-300 text-indigo-650 focus:ring-indigo-500 cursor-pointer"
                              />
                            </td>
                            <td className="py-3 px-4">
                              <div>
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <p 
                                    onClick={(e) => { e.stopPropagation(); openEditModal(p); }}
                                    className={`font-semibold cursor-pointer hover:underline hover:text-indigo-500 ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}
                                    title="Clique para editar este produto"
                                  >
                                    {p.name}
                                  </p>
                                  <button
                                    onClick={(e) => { e.stopPropagation(); openEditModal(p); }}
                                    className="text-slate-400 hover:text-indigo-500 p-0.5 rounded transition-colors cursor-pointer"
                                    title="Editar todos os campos"
                                  >
                                    <Pencil className="w-3 h-3" />
                                  </button>
                                  {p.price !== undefined && (
                                    <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-bold ${
                                      theme === 'dark' ? 'bg-cyan-950 text-cyan-300' : 'bg-cyan-50 border border-cyan-200 text-cyan-850'
                                    }`}>
                                      R$ {p.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                  <span className={`text-[9px] font-mono px-1 py-0.2 rounded border ${
                                    theme === 'dark' ? 'bg-[#1c1c21] text-gray-400 border-[#222228]' : 'bg-slate-100/80 text-slate-600 border-slate-200'
                                  }`}>
                                    LOTE: {p.batch}
                                  </span>
                                  <span className={`text-[10px] font-medium ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`}>({p.category})</span>
                                </div>
                              </div>
                            </td>
                          <td className={`py-3 px-4 font-mono text-[10px] ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>{p.barcode}</td>
                          <td className={`py-3 px-4 font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>{p.location}</td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center gap-1 font-mono font-medium px-2 py-0.5 rounded ${
                              expired ? (theme === 'dark' ? 'bg-red-950/50 text-red-400 font-semibold' : 'bg-red-50 text-red-700 font-semibold border border-red-150') :
                              expiringSoon ? (theme === 'dark' ? 'bg-amber-950/50 text-amber-400 font-semibold' : 'bg-amber-50 text-amber-700 font-semibold border border-amber-150') : 
                              (theme === 'dark' ? 'bg-[#1c1c21] text-gray-300' : 'bg-slate-50 text-slate-600 border border-slate-200')
                            }`}>
                              {p.expirationDate}
                              {expiringSoon && <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping"></span>}
                              {expired && <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                            {editingProductId === p.id ? (
                              <div className="flex items-center justify-center gap-1.5 min-w-[120px] mx-auto animate-fade-in">
                                <input
                                  id={`input-direct-qty-${p.id}`}
                                  type="number"
                                  min="0"
                                  value={editingQtyValue}
                                  onChange={(e) => setEditingQtyValue(e.target.value)}
                                  onKeyDown={(ev) => {
                                    if (ev.key === 'Enter') {
                                      handleSaveDirectQty(p.id);
                                    } else if (ev.key === 'Escape') {
                                      setEditingProductId(null);
                                    }
                                  }}
                                  className={`w-16 rounded-lg px-2 py-1 text-xs text-center font-bold font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none border ${
                                    theme === 'dark'
                                      ? 'bg-[#16161a] border-slate-700 text-white'
                                      : 'bg-white border-slate-300 text-slate-850'
                                  }`}
                                  autoFocus
                                />
                                <button
                                  id={`btn-confirm-direct-qty-${p.id}`}
                                  onClick={() => handleSaveDirectQty(p.id)}
                                  className="p-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer transition-colors"
                                  title="Confirmar atualização"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => setEditingProductId(null)}
                                  className={`p-1 rounded border cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800 ${
                                    theme === 'dark' ? 'border-[#222228] text-gray-400' : 'border-slate-200 text-slate-500'
                                  }`}
                                  title="Cancelar"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center justify-center gap-1.5 animate-fade-in">
                                {checkIsLowStock(p) && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setForwardingAlertTask({
                                        type: 'low_stock',
                                        product: p,
                                        title: `Repor estoque baixo de ${p.name} (Lote: ${p.batch}) no setor ${p.location}. Quantidade atual: ${p.qty} un (Abaixo do limite de ${p.lowStockThreshold !== undefined ? p.lowStockThreshold : lowStockThreshold} un).`
                                      });
                                    }}
                                    className="p-1 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 transition-all cursor-pointer animate-pulse flex items-center justify-center border border-amber-500/10"
                                    title={`Estoque crítico! Menos de ${p.lowStockThreshold !== undefined ? p.lowStockThreshold : lowStockThreshold} unidades. Clique para encaminhar como tarefa aos funcionários.`}
                                  >
                                    <AlertTriangle className="w-3.5 h-3.5" />
                                  </button>
                                )}
                                <motion.span
                                  key={p.qty}
                                  initial={{ scale: 1.4, color: checkIsLowStock(p) ? '#f59e0b' : '#10b981' }}
                                  animate={{ 
                                    scale: 1, 
                                    color: checkIsLowStock(p) 
                                      ? (theme === 'dark' ? '#fbbf24' : '#d97706') 
                                      : (theme === 'dark' ? '#e2e8f0' : '#1e293b') 
                                  }}
                                  transition={{ type: 'spring', stiffness: 350, damping: 12 }}
                                  className={`inline-block font-bold font-mono text-center ${
                                    checkIsLowStock(p) 
                                      ? 'text-amber-600 dark:text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded-lg' 
                                      : theme === 'dark' ? 'text-slate-200' : 'text-slate-800'
                                  }`}
                                >
                                  {p.qty}
                                </motion.span>
                                <button
                                  id={`btn-edit-direct-qty-${p.id}`}
                                  onClick={() => {
                                    setEditingProductId(p.id);
                                    setEditingQtyValue(p.qty.toString());
                                  }}
                                  className={`p-1 rounded text-slate-400 hover:text-emerald-500 dark:text-gray-500 dark:hover:text-emerald-400 transition-colors cursor-pointer hover:bg-gray-50 dark:hover:bg-[#16161a]`}
                                  title="Editar quantidade diretamente"
                                >
                                  <Pencil className="w-3 h-3" />
                                </button>
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                id={`btn-table-sub-${p.id}`}
                                onClick={() => handleUpdateStockQty(p.id, -10)}
                                className={`p-1 rounded-lg hover:bg-red-500/10 cursor-pointer ${theme === 'dark' ? 'text-gray-400 hover:text-red-400' : 'text-slate-405 hover:text-red-500'}`}
                                title="Subtrair 10"
                              >
                                <MinusCircle className="w-4 h-4" />
                              </button>
                              <button
                                id={`btn-table-add-${p.id}`}
                                onClick={() => handleUpdateStockQty(p.id, 10)}
                                className={`p-1 rounded-lg hover:bg-emerald-500/10 cursor-pointer ${theme === 'dark' ? 'text-gray-400 hover:text-emerald-400' : 'text-slate-405 hover:text-emerald-600'}`}
                                title="Somar 10"
                              >
                                <PlusCircle className="w-4 h-4" />
                              </button>
                              <button
                                id={`btn-table-del-${p.id}`}
                                onClick={() => handleDeleteProduct(p.id)}
                                className={`p-1 rounded-lg hover:bg-red-500/10 cursor-pointer ${theme === 'dark' ? 'text-gray-400 hover:text-red-500' : 'text-slate-405 hover:text-red-655'}`}
                                title="Zerar Lote"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              </div>
            )}
          </div>
        </div>

      </div>
      )}

      {/* MODAL: CADASTRO DE NOVO LOTE NO ESTOQUE */}
      {isAddProductOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border ${
              theme === 'dark' ? 'bg-[#111114] border-[#222228]' : 'bg-white border-slate-200'
            }`}
          >
            <div className={`p-5 border-b flex items-center justify-between ${
              theme === 'dark' ? 'border-[#222228] bg-[#16161a]' : 'border-slate-100 bg-slate-50'
            }`}>
              <h4 className={`font-bold flex items-center gap-2 ${theme === 'dark' ? 'text-gray-200' : 'text-slate-850'}`}>
                <Box className="w-5 h-5 text-emerald-500" />
                Cadastrar Lote / Mercadoria (Fidelidade Fiscal)
              </h4>
              <button onClick={() => setIsAddProductOpen(false)} className={`hover:opacity-80 transition-opacity cursor-pointer ${theme === 'dark' ? 'text-gray-400' : 'text-slate-400 hover:text-slate-650'}`}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Abas do Formulário */}
            <div className="flex border-b border-gray-200 dark:border-gray-800 text-xs font-semibold bg-gray-50/50 dark:bg-[#16161a]">
              <button
                type="button"
                onClick={() => setAddModalTab('comercial')}
                className={`flex-1 py-3 text-center border-b-2 transition-all cursor-pointer ${
                  addModalTab === 'comercial'
                    ? 'border-emerald-500 text-emerald-600 dark:text-emerald-450 bg-white/20'
                    : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                Dados Comerciais
              </button>
              <button
                type="button"
                onClick={() => setAddModalTab('fiscal')}
                className={`flex-1 py-3 text-center border-b-2 transition-all cursor-pointer ${
                  addModalTab === 'fiscal'
                    ? 'border-emerald-500 text-emerald-600 dark:text-emerald-450 bg-white/20'
                    : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                Dados Fiscais
              </button>
              <button
                type="button"
                onClick={() => setAddModalTab('tributaria')}
                className={`flex-1 py-3 text-center border-b-2 transition-all cursor-pointer ${
                  addModalTab === 'tributaria'
                    ? 'border-emerald-500 text-emerald-600 dark:text-emerald-450 bg-white/20'
                    : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                Tributação
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="p-5 space-y-4 max-h-[72vh] overflow-y-auto">
              
              {addModalTab === 'comercial' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                      <label className={`block text-[11px] font-semibold uppercase mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Nome do Produto *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Leite Condensado Integral 395g"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className={`w-full rounded-lg p-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all ${
                          theme === 'dark' 
                            ? 'bg-[#16161a] border-[#222228] text-slate-100 placeholder-gray-600' 
                            : 'bg-white border-slate-250 text-slate-800 placeholder-slate-450'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-[11px] font-semibold uppercase mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Cód Interno (SKU)</label>
                      <input
                        type="text"
                        placeholder="Auto-gerar se vazio"
                        value={newInternalCode}
                        onChange={(e) => setNewInternalCode(e.target.value)}
                        className={`w-full rounded-lg p-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono transition-all ${
                          theme === 'dark' 
                            ? 'bg-[#16161a] border-[#222228] text-slate-100 placeholder-gray-600' 
                            : 'bg-white border-slate-250 text-slate-800 placeholder-slate-450'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-[11px] font-semibold uppercase mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Unidade Comercial</label>
                      <select
                        value={newUnit}
                        onChange={(e) => setNewUnit(e.target.value)}
                        className={`w-full rounded-lg p-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all ${
                          theme === 'dark' 
                            ? 'bg-[#16161a] border-[#222228] text-slate-100' 
                            : 'bg-white border-slate-250 text-slate-800'
                        }`}
                      >
                        <option value="UN">UN - Unidade</option>
                        <option value="KG">KG - Quilograma</option>
                        <option value="G">G - Grama</option>
                        <option value="L">L - Litro</option>
                        <option value="ML">ML - Mililitro</option>
                        <option value="CX">CX - Caixa</option>
                        <option value="FD">FD - Fardo</option>
                        <option value="PCT">PCT - Pacote</option>
                        <option value="KIT">KIT - Kit</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={`block text-[11px] font-semibold uppercase mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Descrição Detalhada</label>
                    <textarea
                      placeholder="Características, peso, marca ou observações comerciais..."
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      rows={2}
                      className={`w-full rounded-lg p-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none transition-all ${
                        theme === 'dark' 
                          ? 'bg-[#16161a] border-[#222228] text-slate-100 placeholder-gray-600' 
                          : 'bg-white border-slate-250 text-slate-800 placeholder-slate-450'
                      }`}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={`block text-[11px] font-semibold uppercase mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Cód de Barras (EAN) *</label>
                      <input
                        type="text"
                        required
                        maxLength={14}
                        placeholder="Apenas números"
                        value={newBarcode}
                        onChange={(e) => setNewBarcode(e.target.value.replace(/\D/g, ''))}
                        className={`w-full rounded-lg p-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono transition-all ${
                          theme === 'dark' 
                            ? 'bg-[#16161a] border-[#222228] text-slate-100 placeholder-gray-600' 
                            : 'bg-white border-slate-250 text-slate-800 placeholder-slate-450'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-[11px] font-semibold uppercase mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Identificador Lote *</label>
                      <input
                        type="text"
                        required
                        placeholder="LT-XXX-YY"
                        value={newBatch}
                        onChange={(e) => setNewBatch(e.target.value)}
                        className={`w-full rounded-lg p-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono transition-all ${
                          theme === 'dark' 
                            ? 'bg-[#16161a] border-[#222228] text-slate-100 placeholder-gray-600' 
                            : 'bg-white border-slate-250 text-slate-800 placeholder-slate-450'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={`block text-[11px] font-semibold uppercase mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Setor / Endereço *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Corredor B - Prateleira 4"
                        value={newLocation}
                        onChange={(e) => setNewLocation(e.target.value)}
                        className={`w-full rounded-lg p-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all ${
                          theme === 'dark' 
                            ? 'bg-[#16161a] border-[#222228] text-slate-100 placeholder-gray-600' 
                            : 'bg-white border-slate-250 text-slate-800 placeholder-slate-450'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-[11px] font-semibold uppercase mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Categoria *</label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className={`w-full rounded-lg p-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all ${
                          theme === 'dark' 
                            ? 'bg-[#16161a] border-[#222228] text-slate-100' 
                            : 'bg-white border-slate-250 text-slate-800'
                        }`}
                      >
                        <option value="Laticínios">Laticínios</option>
                        <option value="Mercearia">Mercearia</option>
                        <option value="Grãos">Grãos</option>
                        <option value="Bebidas">Bebidas</option>
                        <option value="Frios / Carnes">Frios / Carnes</option>
                        <option value="Massas">Massas</option>
                        <option value="Molhos / Conservas">Molhos / Conservas</option>
                        <option value="Limpeza">Limpeza</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={`block text-[11px] font-semibold uppercase mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Fabricação *</label>
                      <input
                        type="date"
                        required
                        value={newManufacture}
                        onChange={(e) => setNewManufacture(e.target.value)}
                        className={`w-full rounded-lg p-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono transition-all ${
                          theme === 'dark' 
                            ? 'bg-[#16161a] border-[#222228] text-slate-100' 
                            : 'bg-white border-slate-250 text-slate-800'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-[11px] font-semibold uppercase mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Vencimento / Validade *</label>
                      <input
                        type="date"
                        required
                        value={newExpiration}
                        onChange={(e) => setNewExpiration(e.target.value)}
                        className={`w-full rounded-lg p-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono transition-all ${
                          theme === 'dark' 
                            ? 'bg-[#16161a] border-[#222228] text-slate-100' 
                            : 'bg-white border-slate-250 text-slate-800'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={`block text-[11px] font-semibold uppercase mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Qtd Entrada *</label>
                      <input
                        type="number"
                        required
                        placeholder="Ex: 150"
                        value={newQty}
                        onChange={(e) => setNewQty(e.target.value)}
                        className={`w-full rounded-lg p-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono transition-all ${
                          theme === 'dark' 
                            ? 'bg-[#16161a] border-[#222228] text-slate-100 placeholder-gray-600' 
                            : 'bg-white border-slate-250 text-slate-800 placeholder-slate-450'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-[11px] font-semibold uppercase mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Preço Unitário (R$)</label>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="Ex: 12.50"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        className={`w-full rounded-lg p-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono transition-all ${
                          theme === 'dark' 
                            ? 'bg-[#16161a] border-[#222228] text-slate-100 placeholder-gray-600' 
                            : 'bg-white border-slate-250 text-slate-800 placeholder-slate-450'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              )}

              {addModalTab === 'fiscal' && (
                <div className="space-y-4">
                  <div>
                    <label className={`block text-[11px] font-semibold uppercase mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Código NCM (8 dígitos)</label>
                    <input
                      type="text"
                      maxLength={8}
                      placeholder="Ex: 19019020 (Sem pontuação)"
                      value={newNcm}
                      onChange={(e) => setNewNcm(e.target.value.replace(/\D/g, ''))}
                      className={`w-full rounded-lg p-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono transition-all ${
                        theme === 'dark' 
                          ? 'bg-[#16161a] border-[#222228] text-slate-100 placeholder-gray-600' 
                          : 'bg-white border-slate-250 text-slate-800 placeholder-slate-450'
                      }`}
                    />
                    <p className="text-[10px] text-gray-500 mt-1">Classificação Fiscal de acordo com a Nomenclatura Comum do Mercosul.</p>
                  </div>

                  <div>
                    <label className={`block text-[11px] font-semibold uppercase mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Código CEST (7 dígitos)</label>
                    <input
                      type="text"
                      maxLength={7}
                      placeholder="Ex: 1700800"
                      value={newCest}
                      onChange={(e) => setNewCest(e.target.value.replace(/\D/g, ''))}
                      className={`w-full rounded-lg p-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono transition-all ${
                        theme === 'dark' 
                          ? 'bg-[#16161a] border-[#222228] text-slate-100 placeholder-gray-600' 
                          : 'bg-white border-slate-250 text-slate-800 placeholder-slate-450'
                      }`}
                    />
                    <p className="text-[10px] text-gray-500 mt-1">Código Especificador da Substituição Tributária.</p>
                  </div>

                  <div>
                    <label className={`block text-[11px] font-semibold uppercase mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>EAN / GTIN do Item</label>
                    <input
                      type="text"
                      placeholder="Ex: 7891000100101 ou 'SEM GTIN'"
                      value={newGtin}
                      onChange={(e) => setNewGtin(e.target.value)}
                      className={`w-full rounded-lg p-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono transition-all ${
                        theme === 'dark' 
                          ? 'bg-[#16161a] border-[#222228] text-slate-100 placeholder-gray-600' 
                          : 'bg-white border-slate-250 text-slate-800 placeholder-slate-450'
                      }`}
                    />
                    <p className="text-[10px] text-gray-500 mt-1">Código de barras global de identificação correspondente.</p>
                  </div>

                  <div>
                    <label className={`block text-[11px] font-semibold uppercase mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Origem da Mercadoria (Origem ICMS)</label>
                    <select
                      value={newOrigin}
                      onChange={(e) => setNewOrigin(e.target.value)}
                      className={`w-full rounded-lg p-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all ${
                        theme === 'dark' 
                          ? 'bg-[#16161a] border-[#222228] text-slate-100' 
                          : 'bg-white border-slate-250 text-slate-800'
                      }`}
                    >
                      <option value="0">0 - Nacional, exceto as indicadas em outros códigos</option>
                      <option value="1">1 - Estrangeira - Importação direta</option>
                      <option value="2">2 - Estrangeira - Adquirida no mercado interno</option>
                      <option value="3">3 - Nacional, conteúdo de importação superior a 40%</option>
                      <option value="4">4 - Nacional, produção c/ processo produtivo básico</option>
                      <option value="5">5 - Nacional, conteúdo de importação inferior/igual 40%</option>
                      <option value="6">6 - Estrangeira - Importação direta, sem similar nacional</option>
                      <option value="7">7 - Estrangeira - Mercado interno, sem similar nacional</option>
                      <option value="8">8 - Nacional, conteúdo de importação superior a 70%</option>
                    </select>
                  </div>
                </div>
              )}

              {addModalTab === 'tributaria' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={`block text-[11px] font-semibold uppercase mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>CFOP Padrão de Saída</label>
                      <select
                        value={newCfopDefault}
                        onChange={(e) => setNewCfopDefault(e.target.value)}
                        className={`w-full rounded-lg p-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all ${
                          theme === 'dark' 
                            ? 'bg-[#16161a] border-[#222228] text-slate-100' 
                            : 'bg-white border-slate-250 text-slate-800'
                        }`}
                      >
                        <option value="5102">5102 - Venda de Mercadoria (Estadual)</option>
                        <option value="5405">5405 - Venda c/ Substituição Tributária (Estadual)</option>
                        <option value="6102">6102 - Venda de Mercadoria (Interestadual)</option>
                        <option value="5101">5101 - Venda de Produção do Estab.</option>
                        <option value="6101">6101 - Venda de Produção (Interestadual)</option>
                      </select>
                    </div>
                    <div>
                      <label className={`block text-[11px] font-semibold uppercase mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>CST ICMS (Regime Normal)</label>
                      <select
                        value={newCstIcms}
                        onChange={(e) => setNewCstIcms(e.target.value)}
                        className={`w-full rounded-lg p-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all ${
                          theme === 'dark' 
                            ? 'bg-[#16161a] border-[#222228] text-slate-100' 
                            : 'bg-white border-slate-250 text-slate-800'
                        }`}
                      >
                        <option value="00">00 - Tributada integralmente</option>
                        <option value="10">10 - Tributada e c/ cobrança de ICMS por ST</option>
                        <option value="20">20 - Com redução de base de cálculo</option>
                        <option value="30">30 - Isenta ou não tributada e c/ ST</option>
                        <option value="40">40 - Isenta</option>
                        <option value="50">50 - Não tributada</option>
                        <option value="60">60 - ICMS cobrado anteriormente por ST</option>
                        <option value="90">90 - Outras tributações</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={`block text-[11px] font-semibold uppercase mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>CSOSN (Simples Nacional)</label>
                      <select
                        value={newCsosn}
                        onChange={(e) => setNewCsosn(e.target.value)}
                        className={`w-full rounded-lg p-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all ${
                          theme === 'dark' 
                            ? 'bg-[#16161a] border-[#222228] text-slate-100' 
                            : 'bg-white border-slate-250 text-slate-800'
                        }`}
                      >
                        <option value="101">101 - Com permissão de crédito</option>
                        <option value="102">102 - Sem permissão de crédito</option>
                        <option value="103">103 - Isenção de ICMS para faixa</option>
                        <option value="201">201 - Com crédito e c/ cobrança por ST</option>
                        <option value="202">202 - Sem crédito e c/ cobrança por ST</option>
                        <option value="300">300 - Imune de impostos</option>
                        <option value="400">400 - Não tributada pelo Simples</option>
                        <option value="500">500 - Tributada anteriormente por ST</option>
                        <option value="900">900 - Outras hipóteses</option>
                      </select>
                    </div>
                    <div>
                      <label className={`block text-[11px] font-semibold uppercase mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>CST IPI</label>
                      <select
                        value={newCstIpi}
                        onChange={(e) => setNewCstIpi(e.target.value)}
                        className={`w-full rounded-lg p-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all ${
                          theme === 'dark' 
                            ? 'bg-[#16161a] border-[#222228] text-slate-100' 
                            : 'bg-white border-slate-250 text-slate-800'
                        }`}
                      >
                        <option value="99">99 - Outras Saídas / Não tributável</option>
                        <option value="50">50 - Saída Tributada</option>
                        <option value="51">51 - Saída por Alíquota Zero</option>
                        <option value="52">52 - Saída Isenta</option>
                        <option value="53">53 - Saída Não-Tributada</option>
                        <option value="54">54 - Saída Imune</option>
                        <option value="55">55 - Saída com Suspensão</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={`block text-[11px] font-semibold uppercase mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>CST PIS</label>
                      <select
                        value={newCstPis}
                        onChange={(e) => setNewCstPis(e.target.value)}
                        className={`w-full rounded-lg p-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all ${
                          theme === 'dark' 
                            ? 'bg-[#16161a] border-[#222228] text-slate-100' 
                            : 'bg-white border-slate-250 text-slate-800'
                        }`}
                      >
                        <option value="01">01 - Operaç Tributável (Alíquota Básica)</option>
                        <option value="02">02 - Operaç Tributável (Aliq Diferenciada)</option>
                        <option value="04">04 - Operaç Sujeita ao Regime Monofásico</option>
                        <option value="06">06 - Operaç Tributável (Alíquota Zero)</option>
                        <option value="07">07 - Operação Isenta do Imposto</option>
                        <option value="08">08 - Operação Sem Incidência</option>
                        <option value="09">09 - Operação com Suspensão</option>
                        <option value="49">49 - Outras Saídas</option>
                        <option value="99">99 - Outras Operações</option>
                      </select>
                    </div>
                    <div>
                      <label className={`block text-[11px] font-semibold uppercase mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>CST COFINS</label>
                      <select
                        value={newCstCofins}
                        onChange={(e) => setNewCstCofins(e.target.value)}
                        className={`w-full rounded-lg p-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all ${
                          theme === 'dark' 
                            ? 'bg-[#16161a] border-[#222228] text-slate-100' 
                            : 'bg-white border-slate-250 text-slate-800'
                        }`}
                      >
                        <option value="01">01 - Operaç Tributável (Alíquota Básica)</option>
                        <option value="02">02 - Operaç Tributável (Aliq Diferenciada)</option>
                        <option value="04">04 - Operaç Sujeita ao Regime Monofásico</option>
                        <option value="06">06 - Operaç Tributável (Alíquota Zero)</option>
                        <option value="07">07 - Operação Isenta do Imposto</option>
                        <option value="08">08 - Operação Sem Incidência</option>
                        <option value="09">09 - Operação com Suspensão</option>
                        <option value="49">49 - Outras Saídas</option>
                        <option value="99">99 - Outras Operações</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className={`w-1/2 rounded-xl py-2.5 px-4 text-xs font-semibold uppercase tracking-wider transition-colors border cursor-pointer ${
                    theme === 'dark' 
                      ? 'bg-[#16161a] border-[#222228] text-gray-400 hover:bg-[#1c1c21]' 
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-2.5 px-4 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Registrar Lote
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* MODAL: EDIÇÃO DE LOTE / PRODUTO EXISTENTE */}
      {isEditModalOpen && editingProduct && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border ${
              theme === 'dark' ? 'bg-[#111114] border-[#222228]' : 'bg-white border-slate-200'
            }`}
          >
            <div className={`p-5 border-b flex items-center justify-between ${
              theme === 'dark' ? 'border-[#222228] bg-[#16161a]' : 'border-slate-100 bg-slate-50'
            }`}>
              <h4 className={`font-bold flex items-center gap-2 ${theme === 'dark' ? 'text-gray-200' : 'text-slate-850'}`}>
                <Pencil className="w-5 h-5 text-indigo-500" />
                Editar Lote / Mercadoria (Fidelidade Fiscal)
              </h4>
              <button onClick={() => setIsEditModalOpen(false)} className={`hover:opacity-80 transition-opacity cursor-pointer ${theme === 'dark' ? 'text-gray-400' : 'text-slate-400 hover:text-slate-650'}`}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Abas do Formulário de Edição */}
            <div className="flex border-b border-gray-200 dark:border-gray-800 text-xs font-semibold bg-gray-50/50 dark:bg-[#16161a]">
              <button
                type="button"
                onClick={() => setEditModalTab('comercial')}
                className={`flex-1 py-3 text-center border-b-2 transition-all cursor-pointer ${
                  editModalTab === 'comercial'
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 bg-white/20'
                    : 'border-transparent text-gray-500 hover:text-gray-950 dark:hover:text-gray-100'
                }`}
              >
                Dados Comerciais
              </button>
              <button
                type="button"
                onClick={() => setEditModalTab('fiscal')}
                className={`flex-1 py-3 text-center border-b-2 transition-all cursor-pointer ${
                  editModalTab === 'fiscal'
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 bg-white/20'
                    : 'border-transparent text-gray-500 hover:text-gray-950 dark:hover:text-gray-100'
                }`}
              >
                Dados Fiscais
              </button>
              <button
                type="button"
                onClick={() => setEditModalTab('tributaria')}
                className={`flex-1 py-3 text-center border-b-2 transition-all cursor-pointer ${
                  editModalTab === 'tributaria'
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 bg-white/20'
                    : 'border-transparent text-gray-500 hover:text-gray-950 dark:hover:text-gray-100'
                }`}
              >
                Tributação
              </button>
            </div>

            <form onSubmit={handleUpdateProductSubmit} className="p-5 space-y-4 max-h-[72vh] overflow-y-auto">
              
              {editModalTab === 'comercial' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                      <label className={`block text-[11px] font-semibold uppercase mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Nome do Produto *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Leite Integral Vigor"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className={`w-full rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all ${
                          theme === 'dark' 
                            ? 'bg-[#16161a] border-[#222228] text-slate-100 placeholder-gray-600' 
                            : 'bg-white border-slate-250 text-slate-800 placeholder-slate-450'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-[11px] font-semibold uppercase mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Cód Interno (SKU)</label>
                      <input
                        type="text"
                        placeholder="Auto-gerar se vazio"
                        value={editInternalCode}
                        onChange={(e) => setEditInternalCode(e.target.value)}
                        className={`w-full rounded-lg p-2 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono transition-all ${
                          theme === 'dark' 
                            ? 'bg-[#16161a] border-[#222228] text-slate-100 placeholder-gray-600' 
                            : 'bg-white border-slate-250 text-slate-800 placeholder-slate-450'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-[11px] font-semibold uppercase mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Unidade Comercial</label>
                      <select
                        value={editUnit}
                        onChange={(e) => setEditUnit(e.target.value)}
                        className={`w-full rounded-lg p-2 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all ${
                          theme === 'dark' 
                            ? 'bg-[#16161a] border-[#222228] text-slate-100' 
                            : 'bg-white border-slate-250 text-slate-800'
                        }`}
                      >
                        <option value="UN">UN - Unidade</option>
                        <option value="KG">KG - Quilograma</option>
                        <option value="G">G - Grama</option>
                        <option value="L">L - Litro</option>
                        <option value="ML">ML - Mililitro</option>
                        <option value="CX">CX - Caixa</option>
                        <option value="FD">FD - Fardo</option>
                        <option value="PCT">PCT - Pacote</option>
                        <option value="KIT">KIT - Kit</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={`block text-[11px] font-semibold uppercase mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Descrição Detalhada</label>
                    <textarea
                      placeholder="Características adicionais comerciais..."
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      rows={2}
                      className={`w-full rounded-lg p-2 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none transition-all ${
                        theme === 'dark' 
                          ? 'bg-[#16161a] border-[#222228] text-slate-100 placeholder-gray-600' 
                          : 'bg-white border-slate-250 text-slate-800 placeholder-slate-450'
                      }`}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={`block text-[11px] font-semibold uppercase mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Cód de Barras (EAN) *</label>
                      <input
                        type="text"
                        required
                        maxLength={14}
                        placeholder="789..."
                        value={editBarcode}
                        onChange={(e) => setEditBarcode(e.target.value.replace(/\D/g, ''))}
                        className={`w-full rounded-lg p-2 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono transition-all ${
                          theme === 'dark' 
                            ? 'bg-[#16161a] border-[#222228] text-slate-100 placeholder-gray-600' 
                            : 'bg-white border-slate-250 text-slate-800 placeholder-slate-450'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-[11px] font-semibold uppercase mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Lote ID *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: LT-244-VIG"
                        value={editBatch}
                        onChange={(e) => setEditBatch(e.target.value)}
                        className={`w-full rounded-lg p-2 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono transition-all ${
                          theme === 'dark' 
                            ? 'bg-[#16161a] border-[#222228] text-slate-100 placeholder-gray-600' 
                            : 'bg-white border-slate-250 text-slate-800 placeholder-slate-450'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={`block text-[11px] font-semibold uppercase mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Setor / Endereço *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Corredor B - Prateleira 4"
                        value={editLocation}
                        onChange={(e) => setEditLocation(e.target.value)}
                        className={`w-full rounded-lg p-2 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all ${
                          theme === 'dark' 
                            ? 'bg-[#16161a] border-[#222228] text-slate-100 placeholder-gray-600' 
                            : 'bg-white border-slate-250 text-slate-800 placeholder-slate-450'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-[11px] font-semibold uppercase mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Categoria *</label>
                      <select
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value)}
                        className={`w-full rounded-lg p-2 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all ${
                          theme === 'dark' 
                            ? 'bg-[#16161a] border-[#222228] text-slate-100' 
                            : 'bg-white border-slate-250 text-slate-800'
                        }`}
                      >
                        <option value="Laticínios">Laticínios</option>
                        <option value="Mercearia">Mercearia</option>
                        <option value="Grãos">Grãos</option>
                        <option value="Bebidas">Bebidas</option>
                        <option value="Frios / Carnes">Frios / Carnes</option>
                        <option value="Massas">Massas</option>
                        <option value="Molhos / Conservas">Molhos / Conservas</option>
                        <option value="Limpeza">Limpeza</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={`block text-[11px] font-semibold uppercase mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Fabricação *</label>
                      <input
                        type="date"
                        required
                        value={editManufacture}
                        onChange={(e) => setEditManufacture(e.target.value)}
                        className={`w-full rounded-lg p-2 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono transition-all ${
                          theme === 'dark' 
                            ? 'bg-[#16161a] border-[#222228] text-slate-100' 
                            : 'bg-white border-slate-250 text-slate-800'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-[11px] font-semibold uppercase mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Validade *</label>
                      <input
                        type="date"
                        required
                        value={editExpiration}
                        onChange={(e) => setEditExpiration(e.target.value)}
                        className={`w-full rounded-lg p-2 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono transition-all ${
                          theme === 'dark' 
                            ? 'bg-[#16161a] border-[#222228] text-slate-100' 
                            : 'bg-white border-slate-250 text-slate-800'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={`block text-[11px] font-semibold uppercase mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Quantidade Atual *</label>
                      <input
                        type="number"
                        required
                        min="0"
                        placeholder="Ex: 150"
                        value={editQty}
                        onChange={(e) => setEditQty(e.target.value)}
                        className={`w-full rounded-lg p-2 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono transition-all ${
                          theme === 'dark' 
                            ? 'bg-[#16161a] border-[#222228] text-slate-100 placeholder-gray-600' 
                            : 'bg-white border-slate-250 text-slate-800 placeholder-slate-450'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-[11px] font-semibold uppercase mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Preço Unitário (R$)</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="Ex: 5.90"
                        value={editPrice}
                        onChange={(e) => setEditPrice(e.target.value)}
                        className={`w-full rounded-lg p-2 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono transition-all ${
                          theme === 'dark' 
                            ? 'bg-[#16161a] border-[#222228] text-slate-100 placeholder-gray-600' 
                            : 'bg-white border-slate-250 text-slate-800 placeholder-slate-450'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-[11px] font-semibold uppercase mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Limite Mínimo de Estoque</label>
                    <input
                      type="number"
                      min="0"
                      placeholder={`Padrão Atual: ${lowStockThreshold} un.`}
                      value={editLowStockThreshold}
                      disabled={userPlan !== 'media' && userPlan !== 'corporativo'}
                      onChange={(e) => setEditLowStockThreshold(e.target.value)}
                      className={`w-full rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono transition-all ${
                        theme === 'dark' 
                          ? 'bg-[#16161a] border-[#222228] text-slate-100 placeholder-gray-600' 
                          : 'bg-white border-slate-250 text-slate-800 placeholder-slate-450'
                      } ${userPlan !== 'media' && userPlan !== 'corporativo' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    />
                    <p className={`text-[10px] mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`}>
                      {userPlan !== 'media' && userPlan !== 'corporativo' 
                         ? 'Níveis de alertas individuais disponíveis apenas no Plano Premium.'
                         : `Deixe vazio para usar a configuração geral (${lowStockThreshold} un.).`}
                    </p>
                  </div>
                </div>
              )}

              {editModalTab === 'fiscal' && (
                <div className="space-y-4">
                  <div>
                    <label className={`block text-[11px] font-semibold uppercase mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Código NCM (8 dígitos)</label>
                    <input
                      type="text"
                      maxLength={8}
                      placeholder="Ex: 19019020"
                      value={editNcm}
                      onChange={(e) => setEditNcm(e.target.value.replace(/\D/g, ''))}
                      className={`w-full rounded-lg p-2 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono transition-all ${
                        theme === 'dark' 
                          ? 'bg-[#16161a] border-[#222228] text-slate-100 placeholder-gray-600' 
                          : 'bg-white border-slate-250 text-slate-800 placeholder-slate-450'
                      }`}
                    />
                    <p className="text-[10px] text-gray-500 mt-1">Classificação Fiscal da Nomenclatura Comum do Mercosul.</p>
                  </div>

                  <div>
                    <label className={`block text-[11px] font-semibold uppercase mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Código CEST (7 dígitos)</label>
                    <input
                      type="text"
                      maxLength={7}
                      placeholder="Ex: 1700800"
                      value={editCest}
                      onChange={(e) => setEditCest(e.target.value.replace(/\D/g, ''))}
                      className={`w-full rounded-lg p-2 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono transition-all ${
                        theme === 'dark' 
                          ? 'bg-[#16161a] border-[#222228] text-slate-100 placeholder-gray-600' 
                          : 'bg-white border-slate-250 text-slate-800 placeholder-slate-450'
                      }`}
                    />
                    <p className="text-[10px] text-gray-500 mt-1">Código Especificador da Substituição Tributária.</p>
                  </div>

                  <div>
                    <label className={`block text-[11px] font-semibold uppercase mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>GTIN / EAN do Item</label>
                    <input
                      type="text"
                      placeholder="Ex: 7891000100101 ou 'SEM GTIN'"
                      value={editGtin}
                      onChange={(e) => setEditGtin(e.target.value)}
                      className={`w-full rounded-lg p-2 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono transition-all ${
                        theme === 'dark' 
                          ? 'bg-[#16161a] border-[#222228] text-slate-100 placeholder-gray-600' 
                          : 'bg-white border-slate-250 text-slate-800 placeholder-slate-450'
                      }`}
                    />
                    <p className="text-[10px] text-gray-500 mt-1">Código de barras global ou literal "SEM GTIN".</p>
                  </div>

                  <div>
                    <label className={`block text-[11px] font-semibold uppercase mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Origem da Mercadoria (Origem ICMS)</label>
                    <select
                      value={editOrigin}
                      onChange={(e) => setEditOrigin(e.target.value)}
                      className={`w-full rounded-lg p-2 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all ${
                        theme === 'dark' 
                          ? 'bg-[#16161a] border-[#222228] text-slate-100' 
                          : 'bg-white border-slate-250 text-slate-800'
                      }`}
                    >
                      <option value="0">0 - Nacional, exceto as indicadas em outros códigos</option>
                      <option value="1">1 - Estrangeira - Importação direta</option>
                      <option value="2">2 - Estrangeira - Adquirida no mercado interno</option>
                      <option value="3">3 - Nacional, conteúdo de importação superior a 40%</option>
                      <option value="4">4 - Nacional, produção c/ processo produtivo básico</option>
                      <option value="5">5 - Nacional, conteúdo de importação inferior/igual 40%</option>
                      <option value="6">6 - Estrangeira - Importação direta, sem similar nacional</option>
                      <option value="7">7 - Estrangeira - Mercado interno, sem similar nacional</option>
                      <option value="8">8 - Nacional, conteúdo de importação superior a 70%</option>
                    </select>
                  </div>
                </div>
              )}

              {editModalTab === 'tributaria' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={`block text-[11px] font-semibold uppercase mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>CFOP Padrão de Saída</label>
                      <select
                        value={editCfopDefault}
                        onChange={(e) => setEditCfopDefault(e.target.value)}
                        className={`w-full rounded-lg p-2 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all ${
                          theme === 'dark' 
                            ? 'bg-[#16161a] border-[#222228] text-slate-100' 
                            : 'bg-white border-slate-250 text-slate-800'
                        }`}
                      >
                        <option value="5102">5102 - Venda de Mercadoria (Estadual)</option>
                        <option value="5405">5405 - Venda c/ Substituição Tributária (Estadual)</option>
                        <option value="6102">6102 - Venda de Mercadoria (Interestadual)</option>
                        <option value="5101">5101 - Venda de Produção do Estab.</option>
                        <option value="6101">6101 - Venda de Produção (Interestadual)</option>
                      </select>
                    </div>
                    <div>
                      <label className={`block text-[11px] font-semibold uppercase mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>CST ICMS (Regime Normal)</label>
                      <select
                        value={editCstIcms}
                        onChange={(e) => setEditCstIcms(e.target.value)}
                        className={`w-full rounded-lg p-2 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all ${
                          theme === 'dark' 
                            ? 'bg-[#16161a] border-[#222228] text-slate-100' 
                            : 'bg-white border-slate-250 text-slate-800'
                        }`}
                      >
                        <option value="00">00 - Tributada integralmente</option>
                        <option value="10">10 - Tributada e c/ cobrança de ICMS por ST</option>
                        <option value="20">20 - Com redução de base de cálculo</option>
                        <option value="30">30 - Isenta ou não tributada e c/ ST</option>
                        <option value="40">40 - Isenta</option>
                        <option value="50">50 - Não tributada</option>
                        <option value="60">60 - ICMS cobrado anteriormente por ST</option>
                        <option value="90">90 - Outras tributações</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={`block text-[11px] font-semibold uppercase mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>CSOSN (Simples Nacional)</label>
                      <select
                        value={editCsosn}
                        onChange={(e) => setEditCsosn(e.target.value)}
                        className={`w-full rounded-lg p-2 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all ${
                          theme === 'dark' 
                            ? 'bg-[#16161a] border-[#222228] text-slate-100' 
                            : 'bg-white border-slate-250 text-slate-800'
                        }`}
                      >
                        <option value="101">101 - Com permissão de crédito</option>
                        <option value="102">102 - Sem permissão de crédito</option>
                        <option value="103">103 - Isenção de ICMS para faixa</option>
                        <option value="201">201 - Com crédito e c/ cobrança por ST</option>
                        <option value="202">202 - Sem crédito e c/ cobrança por ST</option>
                        <option value="300">300 - Imune de impostos</option>
                        <option value="400">400 - Não tributada pelo Simples</option>
                        <option value="500">500 - Tributada anteriormente por ST</option>
                        <option value="900">900 - Outras hipóteses</option>
                      </select>
                    </div>
                    <div>
                      <label className={`block text-[11px] font-semibold uppercase mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>CST IPI</label>
                      <select
                        value={editCstIpi}
                        onChange={(e) => setEditCstIpi(e.target.value)}
                        className={`w-full rounded-lg p-2 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all ${
                          theme === 'dark' 
                            ? 'bg-[#16161a] border-[#222228] text-slate-100' 
                            : 'bg-white border-slate-250 text-slate-800'
                        }`}
                      >
                        <option value="99">99 - Outras Saídas / Não tributável</option>
                        <option value="50">50 - Saída Tributada</option>
                        <option value="51">51 - Saída por Alíquota Zero</option>
                        <option value="52">52 - Saída Isenta</option>
                        <option value="53">53 - Saída Não-Tributada</option>
                        <option value="54">54 - Saída Imune</option>
                        <option value="55">55 - Saída com Suspensão</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={`block text-[11px] font-semibold uppercase mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>CST PIS</label>
                      <select
                        value={editCstPis}
                        onChange={(e) => setEditCstPis(e.target.value)}
                        className={`w-full rounded-lg p-2 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all ${
                          theme === 'dark' 
                            ? 'bg-[#16161a] border-[#222228] text-slate-100' 
                            : 'bg-white border-slate-250 text-slate-800'
                        }`}
                      >
                        <option value="01">01 - Operaç Tributável (Alíquota Básica)</option>
                        <option value="02">02 - Operaç Tributável (Aliq Diferenciada)</option>
                        <option value="04">04 - Operaç Sujeita ao Regime Monofásico</option>
                        <option value="06">06 - Operaç Tributável (Alíquota Zero)</option>
                        <option value="07">07 - Operação Isenta do Imposto</option>
                        <option value="08">08 - Operação Sem Incidência</option>
                        <option value="09">09 - Operação com Suspensão</option>
                        <option value="49">49 - Outras Saídas</option>
                        <option value="99">99 - Outras Operações</option>
                      </select>
                    </div>
                    <div>
                      <label className={`block text-[11px] font-semibold uppercase mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>CST COFINS</label>
                      <select
                        value={editCstCofins}
                        onChange={(e) => setEditCstCofins(e.target.value)}
                        className={`w-full rounded-lg p-2 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all ${
                          theme === 'dark' 
                            ? 'bg-[#16161a] border-[#222228] text-slate-100' 
                            : 'bg-white border-slate-250 text-slate-800'
                        }`}
                      >
                        <option value="01">01 - Operaç Tributável (Alíquota Básica)</option>
                        <option value="02">02 - Operaç Tributável (Aliq Diferenciada)</option>
                        <option value="04">04 - Operaç Sujeita ao Regime Monofásico</option>
                        <option value="06">06 - Operaç Tributável (Alíquota Zero)</option>
                        <option value="07">07 - Operação Isenta do Imposto</option>
                        <option value="08">08 - Operação Sem Incidência</option>
                        <option value="09">09 - Operação com Suspensão</option>
                        <option value="49">49 - Outras Saídas</option>
                        <option value="99">99 - Outras Operações</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className={`w-1/2 rounded-xl py-2.5 px-4 text-xs font-semibold uppercase tracking-wider transition-colors border cursor-pointer ${
                    theme === 'dark' 
                      ? 'bg-[#16161a] border-[#222228] text-gray-400 hover:bg-[#1c1c21]' 
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-2.5 px-4 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* MODAL DE ENCAMINHAMENTO DE ALERTA COMO TAREFA */}
      {forwardingAlertTask && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`rounded-2xl shadow-xl w-full max-w-md overflow-hidden border transition-all ${
              theme === 'dark' ? 'bg-[#111114] border-[#222228]' : 'bg-white border-slate-200 shadow-lg'
            }`}
          >
            <div className={`p-5 border-b flex items-center justify-between ${
              theme === 'dark' ? 'border-[#222228] bg-[#16161a]' : 'border-slate-100 bg-slate-50'
            }`}>
              <h4 className={`font-bold flex items-center gap-2 ${theme === 'dark' ? 'text-gray-200' : 'text-slate-850'}`}>
                <Plus className="w-4 h-4 text-indigo-500 animate-pulse" />
                Encaminhar Alerta como Tarefa
              </h4>
              <button 
                onClick={() => {
                  if (!forwardSuccessMessage) {
                    setForwardingAlertTask(null);
                  }
                }}
                disabled={!!forwardSuccessMessage}
                className={`p-1.5 rounded-lg hover:bg-gray-250 dark:hover:bg-slate-800 transition-colors cursor-pointer ${
                  theme === 'dark' ? 'text-gray-400' : 'text-slate-400'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              {forwardSuccessMessage ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto scale-110">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h5 className={`font-bold text-sm ${theme === 'dark' ? 'text-slate-100' : 'text-slate-850'}`}>
                    Tarefa Encaminhada!
                  </h5>
                  <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} leading-relaxed`}>
                    {forwardSuccessMessage}
                  </p>
                  <p className="text-[10px] text-indigo-550 dark:text-indigo-400 font-bold animate-pulse font-mono">
                    Retornando ao painel logístico...
                  </p>
                </div>
              ) : (
                <>
                  <div className={`p-3 rounded-lg text-xs leading-relaxed space-y-1 ${
                    theme === 'dark' ? 'bg-[#16161a] border border-[#222228]' : 'bg-slate-50 border border-slate-200'
                  }`}>
                    <span className="text-[10px] text-indigo-550 font-bold uppercase block font-mono">Instrução de Serviço</span>
                    <p className={`font-bold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-850'}`}>
                      {forwardingAlertTask.title}
                    </p>
                    <div className="pt-2 text-[10px] text-gray-500 font-mono flex items-center gap-2">
                      <span className="bg-emerald-100/15 text-emerald-600 px-1.5 py-0.2 rounded font-mono font-semibold">Lote: {forwardingAlertTask.product.batch}</span>
                      <span>&bull;</span>
                      <span className="text-gray-450">Setor: {forwardingAlertTask.product.location}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className={`block text-xs font-semibold uppercase ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                      Selecione um Colaborador Ativo:
                    </label>
                    <div className="grid grid-cols-1 gap-2 max-h-[240px] overflow-y-auto pr-1">
                      {employees.filter(e => e.status === 'Ativo').map((emp) => (
                        <button
                          key={emp.id}
                          onClick={() => handleConfirmForwardTask(emp)}
                          className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between cursor-pointer group ${
                            theme === 'dark' 
                              ? 'bg-[#16161a]/60 border-[#222228] hover:border-indigo-500 hover:bg-indigo-500/5' 
                              : 'bg-white border-slate-200 hover:border-indigo-400 hover:bg-slate-50/50 shadow-xs'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 flex items-center justify-center font-extrabold text-xs uppercase font-sans">
                              {emp.name.split(' ')[0].substring(0, 2)}
                            </div>
                            <div>
                              <p className={`text-xs font-bold leading-none ${theme === 'dark' ? 'text-gray-200' : 'text-slate-850'}`}>
                                {emp.name}
                              </p>
                              <p className="text-[10px] text-gray-400 mt-1 uppercase font-semibold font-mono">
                                {emp.role}
                              </p>
                            </div>
                          </div>
                          <span className="text-[10px] text-indigo-600 font-extrabold opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                            Atribuir &rarr;
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* MODAL: CONTATO DIRETO COM FORNECEDOR */}
      {isContactModalOpen && contactProduct && (() => {
        const supplier = getSupplierForProduct(contactProduct);
        const phoneClean = supplier.phone.replace(/[^\d+]/g, '');
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneClean}&text=${encodeURIComponent(draftMessage)}`;
        const emailUrl = `mailto:${supplier.email}?subject=Pedido de Reposição - ${encodeURIComponent(contactProduct.name)}&body=${encodeURIComponent(draftMessage)}`;

        return (
          <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border ${
                theme === 'dark' ? 'bg-[#111114] border-[#222228] text-slate-100' : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              {/* Cabeçalho */}
              <div className={`p-5 border-b flex items-center justify-between ${
                theme === 'dark' ? 'border-[#222228] bg-[#16161a]' : 'border-slate-100 bg-slate-50'
              }`}>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-emerald-500/10 rounded-lg text-emerald-500">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className={`font-bold text-sm uppercase tracking-wide ${theme === 'dark' ? 'text-gray-200' : 'text-slate-800'}`}>
                      Entrar em Contato com Fornecedor
                    </h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">Faturamento & reposição automatizada de suprimentos</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setIsContactModalOpen(false);
                    setContactProduct(null);
                  }} 
                  className={`hover:opacity-80 transition-opacity cursor-pointer ${theme === 'dark' ? 'text-gray-400' : 'text-slate-400 hover:text-slate-650'}`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
                
                {/* Alerta de Produto Crítico */}
                <div className={`p-4 rounded-xl border flex gap-3 ${
                  theme === 'dark' ? 'bg-[#16161a] border-amber-950/40' : 'bg-amber-50/50 border-amber-200'
                }`}>
                  <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <p className={`font-bold ${theme === 'dark' ? 'text-amber-400' : 'text-amber-900'}`}>Estoque Abaixo do Limite Mínimo</p>
                    <p className={`mt-1 font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                      {contactProduct.name} possui apenas <strong className="font-mono text-amber-600 dark:text-amber-400">{contactProduct.qty}un</strong> em estoque (mínimo desejável: {contactProduct.lowStockThreshold !== undefined ? contactProduct.lowStockThreshold : lowStockThreshold}un).
                    </p>
                  </div>
                </div>

                {/* Cartão Corporativo do Fornecedor */}
                <div className={`p-4 rounded-xl border space-y-3 relative overflow-hidden ${
                  theme === 'dark' ? 'bg-[#18181f] border-[#25252f]' : 'bg-slate-50 border-slate-150'
                }`}>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full -mr-6 -mt-6"></div>
                  
                  <div>
                    <span className="text-[9px] font-extrabold uppercase font-mono tracking-widest text-[#6366f1] dark:text-[#818cf8] block">Fornecedor Credenciado</span>
                    <h5 className={`font-extrabold text-sm mt-0.5 ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{supplier.name}</h5>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs border-t border-dashed dark:border-[#25252f] border-slate-200">
                    <div className="space-y-1.5Packed">
                      <div className="flex items-center gap-1.5 text-gray-450">
                        <User className="w-3.5 h-3.5 text-gray-400" />
                        <span className="font-semibold text-[11px] uppercase">Contato</span>
                      </div>
                      <p className={`font-bold ${theme === 'dark' ? 'text-gray-250' : 'text-slate-700'}`}>{supplier.contactPerson}</p>
                    </div>

                    <div className="space-y-1.5Packed font-mono">
                      <div className="flex items-center gap-1.5 text-gray-450">
                        <Phone className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="font-semibold text-[11px] uppercase">WhatsApp / Cel</span>
                      </div>
                      <p className={`font-bold ${theme === 'dark' ? 'text-gray-250' : 'text-slate-700'}`}>{supplier.phone}</p>
                    </div>

                    <div className="space-y-1.5Packed md:col-span-2">
                      <div className="flex items-center gap-1.5 text-gray-450">
                        <Mail className="w-3.5 h-3.5 text-indigo-400" />
                        <span className="font-semibold text-[11px] uppercase">E-mail Comercial</span>
                      </div>
                      <p className={`font-mono font-medium ${theme === 'dark' ? 'text-gray-250' : 'text-slate-700'}`}>{supplier.email}</p>
                    </div>
                  </div>

                  {/* Condições comerciais e Observações */}
                  <div className={`p-2.5 rounded-lg text-[10px] flex gap-2 items-start ${
                    theme === 'dark' ? 'bg-[#111114] text-gray-400' : 'bg-white text-slate-500 border border-slate-100'
                  }`}>
                    <Info className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-gray-400 dark:text-gray-300">Notas Comerciais:</strong>
                      <span>{supplier.notes}</span>
                    </div>
                  </div>
                </div>

                {/* Editor de Mensagem Pré-definida */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className={`block text-[11px] font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                      Mensagem de cotação / pedido
                    </label>
                    <span className="text-[10px] text-gray-400 italic">Você pode editar a minuta abaixo antes de enviar</span>
                  </div>
                  <textarea
                    rows={6}
                    value={draftMessage}
                    onChange={(e) => setDraftMessage(e.target.value)}
                    className={`w-full rounded-xl p-3 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all resize-none shadow-3xs leading-relaxed ${
                      theme === 'dark' 
                        ? 'bg-[#16161a] border-[#222228] text-slate-200 focus:border-emerald-600' 
                        : 'bg-white border-slate-200 text-slate-700 focus:border-emerald-500'
                    }`}
                  />
                </div>

                {/* Botões de Ação para Contato */}
                <div className="pt-2 grid grid-cols-1 md:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={handleCopyMessage}
                    className={`rounded-xl py-2.5 px-3 text-xs font-semibold transition-all border cursor-pointer flex items-center justify-center gap-1.5 hover:scale-[1.01] active:scale-[0.99] ${
                      isCopied 
                        ? (theme === 'dark' ? 'bg-emerald-950/40 border-emerald-500 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-700')
                        : (theme === 'dark' ? 'bg-[#16161a] border-[#222228] text-gray-300 hover:bg-[#1a1a20]' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-150')
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-500" />
                        Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-indigo-500" />
                        Copiar Mensagem
                      </>
                    )}
                  </button>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl py-2.5 px-3 text-xs font-bold transition-all shadow-md shadow-[#25D366]/10 cursor-pointer flex items-center justify-center gap-1.5 hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <MessageSquare className="w-4 h-4 text-white" />
                    Enviar WhatsApp
                  </a>

                  <a
                    href={emailUrl}
                    className="bg-[#4f46e5] hover:bg-[#4338ca] text-white rounded-xl py-2.5 px-3 text-xs font-bold transition-all shadow-md shadow-[#4f46e5]/10 cursor-pointer flex items-center justify-center gap-1.5 hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <Mail className="w-4 h-4 text-white" />
                    Enviar por E-mail
                  </a>
                </div>

                {/* Info Note */}
                <p className="text-[10px] text-gray-400 text-center italic pt-1">
                  Os botões acima abrirão novos canais de comunicação com dados estruturados para acelerar seu fluxo de compras.
                </p>

              </div>
            </motion.div>
          </div>
        );
      })()}

      {/* MODAL GIGANTE EXPANDIDO: INVENTÁRIO PRODUTOS POR LOTE */}
      <AnimatePresence>
        {isInventoryModalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[999] flex items-center justify-center p-2 sm:p-4 animate-fade-in">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`w-full max-w-7xl h-[92vh] rounded-3xl border shadow-2xl overflow-hidden flex flex-col ${
                theme === 'dark' ? 'bg-[#0f0f12] text-slate-100 border-[#22222c]' : 'bg-white text-slate-800 border-slate-200'
              }`}
            >
              {/* Cabeçalho */}
              <div className={`p-5 border-b flex items-center justify-between flex-shrink-0 ${
                theme === 'dark' ? 'border-[#22222c] bg-[#141419]' : 'border-slate-100 bg-slate-50'
              }`}>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-emerald-500/15 rounded-2xl text-emerald-500">
                    <Layers className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-black text-sm sm:text-base uppercase tracking-wider flex items-center gap-2">
                      Painel Expandido: Inventário de Lotes
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        theme === 'dark' ? 'bg-emerald-950 text-emerald-400' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      }`}>
                        VIGÊNCIA FISCAL ATIVA
                      </span>
                    </h3>
                    <p className="text-[11px] text-gray-400">Rastreamento, edição profunda, perdas e auditoria de estoques integrados por endereçamento físico.</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setIsInventoryModalOpen(false);
                    }}
                    className={`p-2 rounded-xl border hover:scale-95 active:scale-90 transition-all text-gray-400 cursor-pointer flex items-center gap-1.5 ${
                      theme === 'dark' ? 'hover:bg-[#1a1a24] border-slate-800' : 'hover:bg-slate-100 border-slate-205'
                    }`}
                  >
                    <Minimize2 className="w-4 h-4" />
                    <span className="text-xs font-bold font-sans hidden sm:inline">Recolher</span>
                  </button>
                </div>
              </div>

              {/* Corpo com scroll */}
              <div className="p-4 sm:p-6 overflow-y-auto flex-grow space-y-6">
                
                {/* 4 Cards de Métricas Rápidas */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-[#141419]/50 border-slate-850' : 'bg-slate-50 border-slate-200'}`}>
                    <span className="text-[9px] font-black uppercase text-gray-500 tracking-wider">Total de Lotes</span>
                    <span className={`block text-xl font-black font-mono mt-1 ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                      {products.length}
                    </span>
                  </div>
                  <div className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-[#141419]/50 border-slate-850' : 'bg-slate-50 border-slate-200'}`}>
                    <span className="text-[9px] font-black uppercase text-gray-500 tracking-wider">Total Divisões / Itens</span>
                    <span className="block text-xl font-black font-mono text-emerald-500 mt-1">
                      {products.reduce((acc, curr) => acc + curr.qty, 0).toLocaleString('pt-BR')} un.
                    </span>
                  </div>
                  <div className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-[#141419]/50 border-slate-850' : 'bg-slate-50 border-slate-200'}`}>
                    <span className="text-[9px] font-black uppercase text-red-500 tracking-wider">Lotes Vencidos</span>
                    <span className="block text-xl font-black font-mono text-red-500 mt-1">
                      {products.filter(p => checkIsExpired(p.expirationDate)).length}
                    </span>
                  </div>
                  <div className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-[#141419]/50 border-slate-850' : 'bg-slate-50 border-slate-200'}`}>
                    <span className="text-[9px] font-black uppercase text-amber-500 tracking-wider">Atenção Próximos 7d</span>
                    <span className="block text-xl font-black font-mono text-amber-500 mt-1">
                      {products.filter(p => checkIsExpiringInOneWeek(p.expirationDate)).length}
                    </span>
                  </div>
                </div>

                {/* Filtros e Barra de Ações Rápidas */}
                <div className={`p-4 rounded-2xl border flex flex-col lg:flex-row items-center justify-between gap-4 ${
                  theme === 'dark' ? 'bg-[#111115] border-[#222228]' : 'bg-slate-55 border-slate-150'
                }`}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full lg:max-w-4xl">
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-gray-500">
                        <Search className="w-4 h-4" />
                      </span>
                      <input
                        type="text"
                        placeholder="Pesquisar por nome, lote ou código..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`w-full rounded-xl py-2 pl-9 pr-4 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all ${
                          theme === 'dark' 
                            ? 'bg-[#16161a] border-[#222228] text-slate-200 placeholder-gray-650' 
                            : 'bg-white border-slate-200 text-slate-800 placeholder-slate-400 shadow-xs'
                        }`}
                      />
                    </div>

                    <div>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className={`w-full rounded-xl py-2 px-3 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none border transition-all ${
                          theme === 'dark' 
                            ? 'bg-[#16161a] border-[#222228] text-slate-300' 
                            : 'bg-white border-slate-200 text-slate-700 shadow-xs'
                        }`}
                      >
                        <option value="todas">Todas as categorias de mercadorias</option>
                        {uniqueCategories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className={`flex items-center gap-1.5 px-3 py-1.5 w-full justify-between rounded-xl border ${
                        theme === 'dark' ? 'bg-[#16161a] border-[#222228]' : 'bg-white border-slate-200 shadow-xs'
                      }`}>
                        <span className={`text-[11px] font-semibold whitespace-nowrap flex items-center gap-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                          Estoque Baixo:
                        </span>
                        <div className="flex items-center gap-1.5">
                          <select
                            value={[5, 10, 20, 50].includes(lowStockThreshold) ? lowStockThreshold.toString() : 'custom'}
                            onChange={(e) => {
                              const val = e.target.value;
                              if (val !== 'custom') {
                                setLowStockThreshold(parseInt(val, 10));
                              } else {
                                setLowStockThreshold(15);
                              }
                            }}
                            className={`text-xs font-bold focus:outline-none bg-transparent cursor-pointer ${
                              theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                            }`}
                          >
                            <option value="5" className={theme === 'dark' ? 'bg-[#1c1c24] text-slate-300' : 'bg-white'}>&lt; 5 un.</option>
                            <option value="10" className={theme === 'dark' ? 'bg-[#1c1c24] text-slate-300' : 'bg-white'}>&lt; 10 un.</option>
                            <option value="20" className={theme === 'dark' ? 'bg-[#1c1c24] text-slate-300' : 'bg-white'}>&lt; 20 un.</option>
                            <option value="50" className={theme === 'dark' ? 'bg-[#1c1c24] text-slate-300' : 'bg-white'}>&lt; 50 un.</option>
                            <option value="custom" className={theme === 'dark' ? 'bg-[#1c1c24] text-slate-300' : 'bg-white'}>Outro...</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Botões de Ação Geral (CSV, PDF, Cadastrar) */}
                  <div className="flex items-center gap-2 flex-wrap justify-end">
                    <button
                      onClick={() => exportProductsCSV(filteredProducts)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border flex items-center gap-1 cursor-pointer transition-colors ${
                        theme === 'dark' 
                          ? 'border-gray-800 bg-gray-900 text-gray-300 hover:bg-gray-800' 
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Download className="w-3.5 h-3.5 text-slate-500" />
                      Exportar CSV ({filteredProducts.length})
                    </button>
                    <button
                      onClick={() => exportProductsPDF(filteredProducts)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border flex items-center gap-1 cursor-pointer transition-colors ${
                        theme === 'dark' 
                          ? 'border-rose-950/40 bg-rose-950/10 text-rose-400 hover:bg-rose-955/10' 
                          : 'border-rose-100 bg-rose-50/50 text-rose-700 hover:bg-rose-50'
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5 text-rose-500" />
                      Imprimir PDF
                    </button>
                    <button
                      onClick={() => {
                        setIsAddProductOpen(true);
                      }}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      Cadastrar Lote
                    </button>
                  </div>
                </div>

                {/* Seleções Ativas Multi-lote */}
                {selectedProductIds.length > 0 && (
                  <div className={`p-4 rounded-2xl text-xs flex flex-wrap items-center justify-between gap-3 ${
                    theme === 'dark' ? 'bg-indigo-950/20 border border-indigo-900/40' : 'bg-indigo-50/50 border border-indigo-150'
                  }`}>
                    <div className="flex items-center gap-2">
                      <CheckSquare className="w-4 h-4 text-indigo-505 dark:text-indigo-400 animate-pulse" />
                      <span className={`font-semibold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>
                        Você selecionou <strong className="text-indigo-650 dark:text-indigo-400 font-extrabold">{selectedProductIds.length}</strong> lotes.
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const selectedList = products.filter(p => selectedProductIds.includes(p.id));
                          exportProductsCSV(selectedList);
                        }}
                        className={`py-1.5 px-3 rounded-xl text-[11px] font-bold border cursor-pointer transition-colors ${
                          theme === 'dark' ? 'border-gray-800 bg-gray-900 text-gray-300' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        Exportar CSV Selecionados
                      </button>
                      <button
                        onClick={() => {
                          const selectedList = products.filter(p => selectedProductIds.includes(p.id));
                          exportProductsPDF(selectedList);
                        }}
                        className={`py-1.5 px-3 rounded-xl text-[11px] font-bold border cursor-pointer transition-colors ${
                          theme === 'dark' ? 'border-rose-955/40 bg-rose-955/10 text-rose-400' : 'border-rose-100 bg-rose-50/50 text-rose-700 hover:bg-rose-50'
                        }`}
                      >
                        Exportar PDF Selecionados
                      </button>
                      <button
                        onClick={() => setSelectedProductIds([])}
                        className="py-1.5 px-2.5 rounded-xl text-[11px] font-bold text-gray-400 hover:text-gray-100 flex items-center gap-1"
                      >
                        <X className="w-3.5 h-3.5" />
                        Limpar Seleção
                      </button>
                    </div>
                  </div>
                )}

                {/* Tabela de Produtos */}
                <div className={`border rounded-2xl overflow-hidden shadow-xs ${
                  theme === 'dark' ? 'bg-[#141419]/30 border-[#222228]' : 'bg-white border-slate-200/80 shadow-xs'
                }`}>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className={`uppercase text-[10px] tracking-wider font-semibold border-b ${
                          theme === 'dark' ? 'bg-[#16161a] text-gray-500 border-[#222228]' : 'bg-slate-50 text-slate-500 border-slate-200'
                        }`}>
                          <th className="py-3 px-4 w-10 text-center">
                            <input
                              type="checkbox"
                              checked={filteredProducts.length > 0 && filteredProducts.every(p => selectedProductIds.includes(p.id))}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  const toAdd = filteredProducts.map(p => p.id);
                                  setSelectedProductIds(prev => Array.from(new Set([...prev, ...toAdd])));
                                } else {
                                  const toRemove = filteredProducts.map(p => p.id);
                                  setSelectedProductIds(prev => prev.filter(id => !toRemove.includes(id)));
                                }
                              }}
                              className="rounded border-slate-300 text-indigo-650 focus:ring-indigo-500 cursor-pointer"
                            />
                          </th>
                          <th className="py-3 px-4">Produto (Clique para Editar)</th>
                          <th className="py-3 px-4 font-mono text-[9px]">Código EAN / Barras</th>
                          <th className="py-3 px-4">Localização Map / Setor</th>
                          <th className="py-3 px-4">Vencimento Lote</th>
                          <th className="py-3 px-4 text-center">Unidades Físicas</th>
                          <th className="py-3 px-4 text-right">Ação Rápida de Estoque</th>
                        </tr>
                      </thead>
                      <tbody className={`divide-y text-xs ${theme === 'dark' ? 'divide-[#222228]' : 'divide-slate-150'}`}>
                        {filteredProducts.map(p => {
                          const expired = checkIsExpired(p.expirationDate);
                          const expiringSoon = checkIsExpiringInOneWeek(p.expirationDate);

                          return (
                            <tr key={p.id} className={theme === 'dark' ? 'hover:bg-[#16161a]/60' : 'hover:bg-slate-50'}>
                              <td className="py-3 px-4 w-10 text-center">
                                <input
                                  type="checkbox"
                                  checked={selectedProductIds.includes(p.id)}
                                  onChange={(e) => {
                                    const checked = e.target.checked;
                                    if (checked) {
                                      setSelectedProductIds(prev => [...prev, p.id]);
                                    } else {
                                      setSelectedProductIds(prev => prev.filter(id => id !== p.id));
                                    }
                                  }}
                                  className="rounded border-slate-300 text-indigo-650 focus:ring-indigo-500 cursor-pointer"
                                />
                              </td>
                              <td className="py-3 px-4">
                                <div>
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <p
                                      onClick={() => openEditModal(p)}
                                      className={`font-semibold cursor-pointer hover:underline hover:text-indigo-500 ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}
                                    >
                                      {p.name}
                                    </p>
                                    <button
                                      onClick={() => openEditModal(p)}
                                      className="text-slate-400 hover:text-indigo-500 p-0.5 rounded transition-colors cursor-pointer"
                                    >
                                      <Pencil className="w-3 h-3" />
                                    </button>
                                    {p.price !== undefined && (
                                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-bold ${
                                        theme === 'dark' ? 'bg-cyan-950 text-cyan-300' : 'bg-cyan-50 border border-cyan-200 text-cyan-850'
                                      }`}>
                                        R$ {p.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-1.5 mt-0.5">
                                    <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded border ${
                                      theme === 'dark' ? 'bg-[#1c1c21] text-gray-400 border-[#222228]' : 'bg-slate-100/80 text-slate-600 border-slate-200'
                                    }`}>
                                      LOTE: {p.batch}
                                    </span>
                                    <span className="text-[10px] text-gray-400">({p.category})</span>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-4 font-mono text-gray-450">{p.barcode}</td>
                              <td className="py-3 px-4 font-medium text-slate-500">{p.location}</td>
                              <td className="py-3 px-4">
                                <span className={`inline-flex items-center gap-1 font-mono font-medium px-2 py-0.5 rounded ${
                                  expired ? (theme === 'dark' ? 'bg-red-955/50 text-red-400 font-semibold' : 'bg-red-50 text-red-700 font-semibold border border-red-150') :
                                  expiringSoon ? (theme === 'dark' ? 'bg-amber-955/50 text-amber-400 font-semibold' : 'bg-amber-50 text-amber-705 font-semibold border border-amber-150') : 
                                  (theme === 'dark' ? 'bg-[#1c1c21] text-gray-300' : 'bg-slate-50 text-slate-600 border border-slate-200')
                                }`}>
                                  {p.expirationDate}
                                  {expiringSoon && <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping"></span>}
                                  {expired && <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-center">
                                {editingProductId === p.id ? (
                                  <div className="flex items-center justify-center gap-1.5 min-w-[120px] mx-auto">
                                    <input
                                      type="number"
                                      min="0"
                                      value={editingQtyValue}
                                      onChange={(e) => setEditingQtyValue(e.target.value)}
                                      onKeyDown={(ev) => {
                                        if (ev.key === 'Enter') {
                                          handleSaveDirectQty(p.id);
                                        } else if (ev.key === 'Escape') {
                                          setEditingProductId(null);
                                        }
                                      }}
                                      className={`w-16 rounded-lg px-2 py-1 text-xs text-center font-bold font-mono focus:ring-2 focus:ring-emerald-500 border ${
                                        theme === 'dark' ? 'bg-[#16161a] border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-850'
                                      }`}
                                      autoFocus
                                    />
                                    <button
                                      onClick={() => handleSaveDirectQty(p.id)}
                                      className="p-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                                    >
                                      <Check className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => setEditingProductId(null)}
                                      className="p-1 rounded border text-gray-400"
                                    >
                                      <X className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                ) : (
                                  <div className="flex items-center justify-center gap-1.5">
                                    {checkIsLowStock(p) && (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setForwardingAlertTask({
                                            type: 'low_stock',
                                            product: p,
                                            title: `Repor estoque de ${p.name} (Lote: ${p.batch}).`
                                          });
                                        }}
                                        className="p-1 rounded bg-amber-500/10 text-amber-505 animate-pulse border border-amber-500/10"
                                      >
                                        <AlertTriangle className="w-3.5 h-3.5" />
                                      </button>
                                    )}
                                    <span className={`font-bold font-mono ${checkIsLowStock(p) ? 'text-amber-550' : ''}`}>
                                      {p.qty}
                                    </span>
                                    <button
                                      onClick={() => {
                                        setEditingProductId(p.id);
                                        setEditingQtyValue(p.qty.toString());
                                      }}
                                      className="p-1 rounded text-slate-400 hover:text-emerald-500"
                                    >
                                      <Pencil className="w-3 h-3" />
                                    </button>
                                  </div>
                                )}
                              </td>
                              <td className="py-3 px-4 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    onClick={() => handleUpdateStockQty(p.id, -10)}
                                    className={`p-1 rounded-lg hover:bg-red-500/10 ${theme === 'dark' ? 'text-gray-450 hover:text-red-400' : 'text-slate-405 hover:text-red-500'}`}
                                    title="Subtrair 10"
                                  >
                                    <MinusCircle className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleUpdateStockQty(p.id, 10)}
                                    className={`p-1 rounded-lg hover:bg-emerald-500/10 ${theme === 'dark' ? 'text-gray-450 hover:text-emerald-400' : 'text-slate-405 hover:text-emerald-600'}`}
                                    title="Somar 10"
                                  >
                                    <PlusCircle className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteProduct(p.id)}
                                    className={`p-1 rounded-lg hover:bg-red-500/10 ${theme === 'dark' ? 'text-gray-450 hover:text-red-450' : 'text-slate-405 hover:text-red-655'}`}
                                    title="Dar Baixa Lote"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Rodapé */}
              <div className={`p-4 border-t flex justify-between items-center ${
                theme === 'dark' ? 'border-[#22222c] bg-[#141419]' : 'border-slate-100 bg-slate-50'
              }`}>
                <span className="text-xs text-gray-400 font-medium">Ref. Data: 01/06/2026 (UTC)</span>
                <button
                  onClick={() => setIsInventoryModalOpen(false)}
                  className="py-2.5 px-5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  Fechar Painel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
