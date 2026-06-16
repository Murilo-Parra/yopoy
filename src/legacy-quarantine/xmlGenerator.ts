/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Interface para dados de entrada para geração do XML
export interface XmlGenerationInput {
  documentType: 'NF-e' | 'NFC-e' | 'NFS-e' | 'CT-e' | 'MDF-e';
  documentNumber: number;
  documentSeries: number;
  natureOfOperation?: string;
  
  // 1. Emitente (Empresa)
  company: {
    cnpj?: string;
    corporateName?: string;
    tradeName?: string;
    stateRegistration?: string; // IE
    municipalRegistration?: string; // IM
    crt?: string; // Código de Regime Tributário
    taxRegime?: string;
    phone?: string;
    email?: string;
    address: {
      street?: string;
      number?: string;
      complement?: string;
      neighborhood?: string;
      city?: string;
      stateUf?: string;
      cep?: string;
      ibgeCode?: string;
    };
  };

  // 2. Destinatário (Cliente)
  customer: {
    cnpjCpf?: string;
    name?: string;
    email?: string;
    phone?: string;
    stateRegistration?: string; // IE se houver
    addressDefault?: boolean;
    address: {
      street?: string;
      number?: string;
      complement?: string;
      neighborhood?: string;
      city?: string;
      stateUf?: string;
      cep?: string;
      ibgeCode?: string;
    };
  };

  // 3. Itens (Produtos / Serviços)
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    unitPrice: number;
    discount?: number;
    unity?: string;
    ncm?: string;
    cfop?: string;
    cstIcms?: string;
    csosn?: string;
    cstPis?: string;
    cstCofins?: string;
    cstIpi?: string;
    cest?: string;
  }>;

  // 4. Transporte (Contexto logístico opcional ou vazio)
  transport?: {
    modality: '0' | '1' | '2' | '9'; // 0-Contratação por conta do Remetente, 1-Destinatário, etc.
    carrierCnpjCpf?: string;
    carrierName?: string;
    carrierIe?: string;
    carrierAddress?: string;
    vehiclePlate?: string;
    vehicleUf?: string;
    volumesWeightLiquid?: number;
    volumesWeightGross?: number;
    volumesQuantity?: number;
  };

  // 5. Forma de Pagamento e Crédito
  payment?: {
    indicator: '0' | '1' | '2'; // 0-Pagamento à Vista, 1-A prazo, 2-Outros
    means: '01' | '02' | '03' | '15' | '99'; // 01-Dinheiro, 02-Cheque, 03-Cartão Crédito, 15-Boleto, 99-Outros
    amount: number;
  };

  additionalInfo?: string;
}

/**
 * XmlValidator - Validador Fiscal Rígido
 * Retorna uma lista de strings contendo mensagens claras e profissionais de erro caso o XML apresente inconformidades estruturais.
 */
export class XmlValidator {
  static validate(input: XmlGenerationInput): string[] {
    const errors: string[] = [];

    // Validar Documento Geral
    if (!input.documentType) {
      errors.push("Tipo de documento fiscal (NF-e, NFC-e, etc.) é obrigatório");
    }
    if (!input.documentNumber || input.documentNumber <= 0) {
      errors.push("Número sequencial do documento fiscal é obrigatório e deve ser maior que zero");
    }
    if (!input.documentSeries || input.documentSeries <= 0) {
      errors.push("Série do documento fiscal é obrigatória e deve ser maior que zero");
    }

    // Validar Emitente (Empresa)
    const co = input.company;
    if (!co) {
      errors.push("Informações do emitente da nota fiscal não foram encontradas");
    } else {
      if (!co.cnpj || co.cnpj.replace(/\D/g, '').length === 0) {
        errors.push("CNPJ do emitente não informado");
      } else if (co.cnpj.replace(/\D/g, '').length !== 14) {
        errors.push("CNPJ do emitente inválido ou com digitação incorreta");
      }

      if (!co.corporateName || !co.corporateName.trim()) {
        errors.push("Razão Social do emitente não informada");
      }

      const addr = co.address;
      if (!addr) {
        errors.push("Endereço fiscal do emitente não informado");
      } else {
        if (!addr.street || !addr.street.trim()) errors.push("Logradouro (Rua) do emitente não informado");
        if (!addr.number || !addr.number.trim()) errors.push("Número do endereço do emitente não informado");
        if (!addr.neighborhood || !addr.neighborhood.trim()) errors.push("Bairro do endereço do emitente não informado");
        if (!addr.city || !addr.city.trim()) errors.push("Cidade do emitente não informada");
        if (!addr.stateUf || addr.stateUf.length !== 2) errors.push("UF do emitente inválida ou não informada");
        if (!addr.cep || addr.cep.replace(/\D/g, '').length !== 8) errors.push("CEP do emitente inválido ou ausente");
      }

      // NF-e e NFC-e exigem Inscrição Estadual (IE)
      if (['NF-e', 'NFC-e', 'CT-e', 'MDF-e'].includes(input.documentType) && (!co.stateRegistration || !co.stateRegistration.trim())) {
        errors.push("Inscrição Estadual (IE) do emitente é obrigatória para este documento de produto/transporte");
      }
      
      // NFS-e exige Inscrição Municipal (IM)
      if (input.documentType === 'NFS-e' && (!co.municipalRegistration || !co.municipalRegistration.trim())) {
        errors.push("Inscrição Municipal (IM) do emitente é obrigatória para emissão de nota municipal de serviço (NFS-e)");
      }
    }

    // Validar Destinatário (Cliente) - MDF-e e NFC-e rápida às vezes admitem simplificações, mas mantemos o rigor
    const cu = input.customer;
    if (!cu && input.documentType !== 'MDF-e') {
      errors.push("Dados do destinatário (cliente) não informados");
    } else if (cu) {
      if (!cu.cnpjCpf || cu.cnpjCpf.replace(/\D/g, '').length === 0) {
        if (input.documentType !== 'NFC-e') {
          errors.push("CNPJ/CPF do destinatário não informado");
        }
      } else {
        const cleanDoc = cu.cnpjCpf.replace(/\D/g, '');
        if (cleanDoc.length !== 11 && cleanDoc.length !== 14) {
          errors.push("Documento (CPF/CNPJ) do destinatário inválido ou incorreto");
        }
      }

      if (!cu.name || !cu.name.trim()) {
        errors.push("Razão Social ou Nome do destinatário não informado");
      }

      const caddr = cu.address;
      if (!caddr && input.documentType !== 'NFC-e') {
        errors.push("Cliente sem endereço definido");
      } else if (caddr) {
        if (!caddr.street || !caddr.street.trim()) errors.push("Logradouro (Rua) do destinatário não informado");
        if (!caddr.number || !caddr.number.trim()) errors.push("Número do endereço do destinatário não informado");
        if (!caddr.city || !caddr.city.trim()) errors.push("Cidade do destinatário não informada");
        if (!caddr.stateUf || caddr.stateUf.length !== 2) errors.push("UF do destinatário inválida ou não informada");
      }
    }

    // Validar Itens (Produtos)
    if (!input.items || input.items.length === 0) {
      errors.push("O documento fiscal deve conter pelo menos um item (produto ou serviço)");
    } else {
      input.items.forEach((item, index) => {
        const num = index + 1;
        if (!item.name || !item.name.trim()) {
          errors.push(`Item #${num}: Nome do produto ou serviço não informado`);
        }
        if (item.quantity <= 0) {
          errors.push(`Item #${num} (${item.name || 'Sem nome'}): Quantidade obrigatória e deve ser maior que zero`);
        }
        if (item.unitPrice <= 0) {
          errors.push(`Item #${num} (${item.name || 'Sem nome'}): Preço unitário deve ser maior que zero`);
        }

        // Se for NF-e, NFC-e, exigir validação tributária estrita
        if (['NF-e', 'NFC-e'].includes(input.documentType)) {
          if (!item.ncm || item.ncm.replace(/\D/g, '').length === 0) {
            errors.push(`Item #${num} (${item.name || 'Sem nome'}): NCM inválido ou ausente`);
          } else {
            const cleanNcm = item.ncm.replace(/\D/g, '');
            if (cleanNcm.length !== 8) {
              errors.push(`Item #${num} (${item.name || 'Sem nome'}): NCM '${item.ncm}' inválido (deve conter exatamente 8 dígitos decimais)`);
            }
          }

          if (!item.cfop || item.cfop.replace(/\D/g, '').length === 0) {
            errors.push(`Item #${num} (${item.name || 'Sem nome'}): CFOP obrigatório`);
          } else {
            const cleanCfop = item.cfop.replace(/\D/g, '');
            if (cleanCfop.length !== 4) {
              errors.push(`Item #${num} (${item.name || 'Sem nome'}): CFOP '${item.cfop}' incorreto (deve conter exatamente 4 dígitos decimais)`);
            }
          }

          // Regime normal exige CST de ICMS, Simples Nacional exige CSOSN
          const regime = co?.taxRegime || co?.crt || 'Simples Nacional';
          const isSimples = regime.toLowerCase().includes('simples') || co?.crt === '1';
          
          if (isSimples) {
            if (!item.csosn || !item.csosn.trim()) {
              errors.push(`Item #${num} (${item.name || 'Sem nome'}): Produto sem tributação (CSOSN obrigatório para regime Simples Nacional)`);
            }
          } else {
            if (!item.cstIcms || !item.cstIcms.trim()) {
              errors.push(`Item #${num} (${item.name || 'Sem nome'}): Produto sem tributação (CST de ICMS obrigatório para regime de Lucro Real ou Presumido)`);
            }
          }
        }
      });
    }

    return errors;
  }
}

/**
 * XmlGenerator - Arquitetura modular altamente isolada por responsabilidade
 * Composto por submódulos construtores estruturados para montagem limpa e sem redundância de XML fiscais brasileiros.
 */
export const XmlGenerator = {
  // 1. Construtor de Emitente (Emit)
  company_builder: (co: XmlGenerationInput['company'], docType: string): string => {
    return `    <emit>
      <CNPJ>${(co.cnpj || '').replace(/\D/g, '')}</CNPJ>
      <xNome>${escapeXml(co.corporateName || '')}</xNome>
      <xFant>${escapeXml(co.tradeName || co.corporateName || '')}</xFant>
      <enderEmit>
        <xLgr>${escapeXml(co.address?.street || '')}</xLgr>
        <nro>${escapeXml(co.address?.number || '')}</nro>
        ${co.address?.complement ? `<xCpl>${escapeXml(co.address?.complement)}</xCpl>` : ''}
        <xBairro>${escapeXml(co.address?.neighborhood || '')}</xBairro>
        <cMun>${co.address?.ibgeCode || '5208707'}</cMun>
        <xMun>${escapeXml(co.address?.city || '')}</xMun>
        <UF>${co.address?.stateUf || 'GO'}</UF>
        <CEP>${(co.address?.cep || '').replace(/\D/g, '')}</CEP>
        <cPais>1058</cPais>
        <xPais>BRASIL</xPais>
        ${co.phone ? `<fone>${co.phone.replace(/\D/g, '')}</fone>` : ''}
      </enderEmit>
      <IE>${(co.stateRegistration || '').replace(/\D/g, '')}</IE>
      ${co.municipalRegistration ? `<IM>${co.municipalRegistration}</IM>` : ''}
      <CRT>${co.crt || '1'}</CRT>
    </emit>`;
  },

  // 2. Construtor de Destinatário (Dest)
  customer_builder: (cu: XmlGenerationInput['customer'], docType: string): string => {
    if (!cu) return '';
    const cleanDoc = (cu.cnpjCpf || '').replace(/\D/g, '');
    const isCnpj = cleanDoc.length === 14;
    const docTag = isCnpj ? 'CNPJ' : 'CPF';
    
    return `    <dest>
      <${docTag}>${cleanDoc}</${docTag}>
      <xNome>${escapeXml(cu.name || '')}</xNome>
      <enderDest>
        <xLgr>${escapeXml(cu.address?.street || '')}</xLgr>
        <nro>${escapeXml(cu.address?.number || '')}</nro>
        ${cu.address?.complement ? `<xCpl>${escapeXml(cu.address?.complement)}</xCpl>` : ''}
        <xBairro>${escapeXml(cu.address?.neighborhood || '')}</xBairro>
        <cMun>${cu.address?.ibgeCode || '9999999'}</cMun>
        <xMun>${escapeXml(cu.address?.city || '')}</xMun>
        <UF>${cu.address?.stateUf || 'GO'}</UF>
        <CEP>${(cu.address?.cep || '').replace(/\D/g, '')}</CEP>
        <cPais>1058</cPais>
        <xPais>BRASIL</xPais>
        ${cu.phone ? `<fone>${cu.phone.replace(/\D/g, '')}</fone>` : ''}
      </enderDest>
      <indIEDest>9</indIEDest>
      ${cu.stateRegistration ? `<IE>${cu.stateRegistration.replace(/\D/g, '')}</IE>` : ''}
      ${cu.email ? `<email>${escapeXml(cu.email)}</email>` : ''}
    </dest>`;
  },

  // 3. Construtor de Tributos por Item
  tax_builder: (item: XmlGenerationInput['items'][0], isSimples: boolean): string => {
    let icmsXml = '';
    
    if (isSimples) {
      icmsXml = `        <ICMS>
          <ICMSSN151> <!-- Exemplo genérico Simples Nacional -->
            <orig>0</orig>
            <CSOSN>${item.csosn || '102'}</CSOSN>
          </ICMSSN151>
        </ICMS>`;
    } else {
      icmsXml = `        <ICMS>
          <ICMS00> <!-- Lucro Presumido / Real padrão CST 00 -->
            <orig>0</orig>
            <CST>${item.cstIcms || '00'}</CST>
            <modBC>3</modBC>
            <vBC>${(item.quantity * item.unitPrice).toFixed(2)}</vBC>
            <pICMS>18.00</pICMS>
            <vICMS>${(item.quantity * item.unitPrice * 0.18).toFixed(2)}</vICMS>
          </ICMS00>
        </ICMS>`;
    }

    return `      <imposto>
${icmsXml}
        <PIS>
          <PISAliq>
            <CST>${item.cstPis || '01'}</CST>
            <vBC>${(item.quantity * item.unitPrice).toFixed(2)}</vBC>
            <pPIS>1.65</pPIS>
            <vPIS>${(item.quantity * item.unitPrice * 0.0165).toFixed(2)}</vPIS>
          </PISAliq>
        </PIS>
        <COFINS>
          <COFINSAliq>
            <CST>${item.cstCofins || '01'}</CST>
            <vBC>${(item.quantity * item.unitPrice).toFixed(2)}</vBC>
            <pCOFINS>7.60</pCOFINS>
            <vCOFINS>${(item.quantity * item.unitPrice * 0.076).toFixed(2)}</vCOFINS>
          </COFINSAliq>
        </COFINS>
      </imposto>`;
  },

  // 4. Construtor de Produtos (Det & Prod)
  product_builder: (items: XmlGenerationInput['items'], isSimples: boolean): string => {
    return items.map((item, index) => {
      const discount = item.discount || 0;
      const totalProd = item.quantity * item.unitPrice;
      const netValue = totalProd - discount;

      return `    <det nItem="${index + 1}">
      <prod>
        <cProd>${item.id}</cProd>
        <cEAN>${item.cest ? 'SEM GTIN' : 'SEM GTIN'}</cEAN>
        <xProd>${escapeXml(item.name)}</xProd>
        <NCM>${(item.ncm || '').replace(/\D/g, '')}</NCM>
        ${item.cest ? `<CEST>${item.cest.replace(/\D/g, '')}</CEST>` : ''}
        <CFOP>${item.cfop || '5102'}</CFOP>
        <uCom>${escapeXml(item.unity || 'UN')}</uCom>
        <qCom>${item.quantity.toFixed(4)}</qCom>
        <vUnCom>${item.unitPrice.toFixed(10)}</vUnCom>
        <vProd>${totalProd.toFixed(2)}</vProd>
        <cEANTrib>SEM GTIN</cEANTrib>
        <uTrib>${escapeXml(item.unity || 'UN')}</uTrib>
        <qTrib>${item.quantity.toFixed(4)}</qTrib>
        <vUnTrib>${item.unitPrice.toFixed(10)}</vUnTrib>
        ${discount > 0 ? `<vDesc>${discount.toFixed(2)}</vDesc>` : ''}
        <indTot>1</indTot>
      </prod>
${XmlGenerator.tax_builder(item, isSimples)}
    </det>`;
    }).join('\n');
  },

  // 5. Construtor de Totais Geras (Total)
  totals_builder: (items: XmlGenerationInput['items'], isSimples: boolean): string => {
    const totalProd = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    const totalDiscount = items.reduce((sum, item) => sum + (item.discount || 0), 0);
    
    // Simular alguns impostos de forma determinística
    const icmsBase = totalProd;
    const icmsTotal = isSimples ? 0 : totalProd * 0.18;
    const pisTotal = totalProd * 0.0165;
    const cofinsTotal = totalProd * 0.076;
    const totalNfe = totalProd - totalDiscount + icmsTotal;

    return `    <total>
      <ICMSTot>
        <vBC>${icmsBase.toFixed(2)}</vBC>
        <vICMS>${icmsTotal.toFixed(2)}</vICMS>
        <vICMSDeson>0.00</vICMSDeson>
        <vFCP>0.00</vFCP>
        <vBCST>0.00</vBCST>
        <vST>0.00</vST>
        <vFCPST>0.00</vFCPST>
        <vFCPSTRet>0.00</vFCPSTRet>
        <vProd>${totalProd.toFixed(2)}</vProd>
        <vFrete>0.00</vFrete>
        <vSeg>0.00</vSeg>
        <vDesc>${totalDiscount.toFixed(2)}</vDesc>
        <vII>0.00</vII>
        <vIPI>0.00</vIPI>
        <vIPIDevol>0.00</vIPIDevol>
        <vPIS>${pisTotal.toFixed(2)}</vPIS>
        <vCOFINS>${cofinsTotal.toFixed(2)}</vCOFINS>
        <vOutro>0.00</vOutro>
        <vNF>${totalNfe.toFixed(2)}</vNF>
      </ICMSTot>
    </total>`;
  },

  // 6. Construtor de Transporte / Fretes
  transport_builder: (trans?: XmlGenerationInput['transport']): string => {
    if (!trans) {
      return `    <transp>
      <modFrete>9</modFrete> <!-- Sem Frete Padrão -->
    </transp>`;
    }
    return `    <transp>
      <modFrete>${trans.modality || '9'}</modFrete>
      ${trans.carrierName ? `      <transporta>
        ${trans.carrierCnpjCpf ? `<CNPJ>${trans.carrierCnpjCpf.replace(/\D/g, '')}</CNPJ>` : ''}
        <xNome>${escapeXml(trans.carrierName)}</xNome>
        ${trans.carrierIe ? `<IE>${trans.carrierIe.replace(/\D/g, '')}</IE>` : ''}
        ${trans.carrierAddress ? `<xEnder>${escapeXml(trans.carrierAddress)}</xEnder>` : ''}
      </transporta>` : ''}
      ${trans.vehiclePlate ? `      <veicTransp>
        <placa>${escapeXml(trans.vehiclePlate.toUpperCase())}</placa>
        <UF>${trans.vehicleUf || 'GO'}</UF>
      </veicTransp>` : ''}
      ${trans.volumesQuantity ? `      <vol>
        <qVol>${trans.volumesQuantity}</qVol>
        <esp>VOLUMES</esp>
        ${trans.volumesWeightLiquid ? `<pesoL>${trans.volumesWeightLiquid.toFixed(3)}</pesoL>` : ''}
        ${trans.volumesWeightGross ? `<pesoB>${trans.volumesWeightGross.toFixed(3)}</pesoB>` : ''}
      </vol>` : ''}
    </transp>`;
  },

  // 7. Construtor de Condições de Pagamento
  payment_builder: (pay?: XmlGenerationInput['payment'], totalVal: number = 0): string => {
    const defaultAmount = pay?.amount || totalVal;
    const payMode = pay?.means || '01'; // 01-Dinheiro
    const payInd = pay?.indicator || '0';

    return `    <pag>
      <detPag>
        <indPag>${payInd}</indPag>
        <tPag>${payMode}</tPag>
        <vPag>${defaultAmount.toFixed(2)}</vPag>
      </detPag>
    </pag>`;
  },

  // 8. Serializador Final XML coordenando as etapas estruturantes
  xml_serializer: (input: XmlGenerationInput): string => {
    const isSimples = (input.company?.taxRegime || '').toLowerCase().includes('simples') || input.company?.crt === '1';
    
    const now = new Date();
    const formattedDate = now.toISOString().replace(/\.\d+Z$/, '-03:00'); // Fuso horário aproximado de Brasília

    // Diferenciar a estrutura com base no tipo de documento fiscal
    if (input.documentType === 'NFS-e') {
      // Nota Fiscal de Serviço - Layout Abrasf Simplificado de Homologação estruturado
      return `<?xml version="1.0" encoding="UTF-8"?>
<EnviarLoteRpsEnvio xmlns="http://www.abrasf.org.br/nfse.xsd">
  <LoteRps Id="lote_${input.documentNumber}" versao="2.03">
    <NumeroLote>${input.documentNumber}</NumeroLote>
    <Cnpj>${(input.company.cnpj || '').replace(/\D/g, '')}</Cnpj>
    <InscricaoMunicipal>${escapeXml(input.company.municipalRegistration || '')}</InscricaoMunicipal>
    <QuantidadeRps>1</QuantidadeRps>
    <ListaRps>
      <Rps>
        <InfDeclaracaoPrestacaoServico Id="rps_${input.documentNumber}">
          <Rps>
            <IdentificacaoRps>
              <Numero>${input.documentNumber}</Numero>
              <Serie>${input.documentSeries}</Serie>
              <Tipo>1</Tipo>
            </IdentificacaoRps>
            <DataEmissao>${formattedDate.substring(0, 10)}</DataEmissao>
            <Status>1</Status>
          </Rps>
          <Competencia>${formattedDate.substring(0, 10)}</Competencia>
          <Servico>
            <Valores>
              <ValorServicos>${input.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0).toFixed(2)}</ValorServicos>
              <ValorDeducoes>0.00</ValorDeducoes>
              <ValorPis>0.00</ValorPis>
              <ValorCofins>0.00</ValorCofins>
              <ValorInss>0.00</ValorInss>
              <ValorIr>0.00</ValorIr>
              <ValorCsll>0.00</ValorCsll>
              <OutrasRetencoes>0.00</OutrasRetencoes>
              <DescontoIncondicionado>${input.items.reduce((sum, item) => sum + (item.discount || 0), 0).toFixed(2)}</DescontoIncondicionado>
            </Valores>
            <ItemListaServico>${input.items[0]?.ncm || '14.01'}</ItemListaServico>
            <CodigoTributacaoMunicipio>${input.items[0]?.cest || '9999'}</CodigoTributacaoMunicipio>
            <Discriminacao>${input.items.map(item => `${item.name} (Qtde: ${item.quantity})`).join('; ')}</Discriminacao>
            <CodigoMunicipio>${input.company.address?.ibgeCode || '5208707'}</CodigoMunicipio>
            <ExigibilidadeISS>1</ExigibilidadeISS>
            <MunicipioIncidencia>${input.company.address?.ibgeCode || '5208707'}</MunicipioIncidencia>
          </Servico>
          <Prestador>
            <Cnpj>${(input.company.cnpj || '').replace(/\D/g, '')}</Cnpj>
            <InscricaoMunicipal>${escapeXml(input.company.municipalRegistration || '')}</InscricaoMunicipal>
          </Prestador>
          <Tomador>
            <IdentificacaoTomador>
              <CpfCnpj>
                <Cnpj>${(input.customer.cnpjCpf || '').replace(/\D/g, '')}</Cnpj>
              </CpfCnpj>
            </IdentificacaoTomador>
            <RazaoSocial>${escapeXml(input.customer.name || '')}</RazaoSocial>
            <Endereco>
              <Endereco>${escapeXml(input.customer.address?.street || '')}</Endereco>
              <Numero>${escapeXml(input.customer.address?.number || '')}</Numero>
              <Bairro>${escapeXml(input.customer.address?.neighborhood || '')}</Bairro>
              <CodigoMunicipio>${input.customer.address?.ibgeCode || '9999999'}</CodigoMunicipio>
              <Uf>${input.customer.address?.stateUf || 'GO'}</Uf>
              <Cep>${(input.customer.address?.cep || '').replace(/\D/g, '')}</Cep>
            </Endereco>
            ${input.customer.email ? `<Contato><Email>${escapeXml(input.customer.email)}</Email></Contato>` : ''}
          </Tomador>
        </InfDeclaracaoPrestacaoServico>
      </Rps>
    </ListaRps>
  </LoteRps>
</EnviarLoteRpsEnvio>`;
    }

    if (input.documentType === 'CT-e') {
      // Conhecimento de Transporte Eletrônico CTE v4.00
      return `<?xml version="1.0" encoding="UTF-8"?>
<CTe xmlns="http://www.portalfiscal.inf.br/cte">
  <infCte versao="4.00" Id="CTe352606${(input.company.cnpj || '').replace(/\D/g, '')}5700100000${input.documentNumber}1000000010">
    <ide>
      <cUF>35</cUF>
      <cCT>00000010</cCT>
      <CFOP>5351</CFOP>
      <natOp>${escapeXml(input.natureOfOperation || 'Prestacao de Servico de Transporte')}</natOp>
      <mod>57</mod>
      <serie>${input.documentSeries}</serie>
      <nCT>${input.documentNumber}</nCT>
      <dhEmi>${formattedDate}</dhEmi>
      <tpImp>1</tpImp>
      <tpEmis>1</tpEmis>
      <cDV>0</cDV>
      <tpAmb>2</tpAmb>
      <tpCte>0</tpCte>
      <procEmi>0</procEmi>
      <verProc>Elparrar ERP v3.0</verProc>
    </ide>
    <compl>
      <xObs>Transporte interestadual sob regime tributário normal ou simples</xObs>
    </compl>
    <emit>
      <CNPJ>${(input.company.cnpj || '').replace(/\D/g, '')}</CNPJ>
      <IE>${(input.company.stateRegistration || '').replace(/\D/g, '')}</IE>
      <xNome>${escapeXml(input.company.corporateName || '')}</xNome>
      <enderEmit>
        <xLgr>${escapeXml(input.company.address?.street || '')}</xLgr>
        <nro>${escapeXml(input.company.address?.number || '')}</nro>
        <xBairro>${escapeXml(input.company.address?.neighborhood || '')}</xBairro>
        <cMun>${input.company.address?.ibgeCode || '5208707'}</cMun>
        <xMun>${escapeXml(input.company.address?.city || '')}</xMun>
        <UF>${input.company.address?.stateUf || 'GO'}</UF>
        <CEP>${(input.company.address?.cep || '').replace(/\D/g, '')}</CEP>
      </enderEmit>
    </emit>
    <rem>
      <CNPJ>${(input.customer.cnpjCpf || '').replace(/\D/g, '')}</CNPJ>
      <xNome>${escapeXml(input.customer.name || '')}</xNome>
      <enderReme>
        <xLgr>${escapeXml(input.customer.address?.street || '')}</xLgr>
        <nro>${escapeXml(input.customer.address?.number || '')}</nro>
        <xBairro>${escapeXml(input.customer.address?.neighborhood || '')}</xBairro>
        <cMun>${input.customer.address?.ibgeCode || '9999999'}</cMun>
        <xMun>${escapeXml(input.customer.address?.city || '')}</xMun>
        <UF>${input.customer.address?.stateUf || 'GO'}</UF>
      </enderReme>
    </rem>
    <vPrest>
      <vTPrest>${input.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0).toFixed(2)}</vTPrest>
      <vRec>${input.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0).toFixed(2)}</vRec>
    </vPrest>
  </infCte>
</CTe>`;
    }

    if (input.documentType === 'MDF-e') {
      // Manifesto de Carga MDFe v3.00
      return `<?xml version="1.0" encoding="UTF-8"?>
<MDFe xmlns="http://www.portalfiscal.inf.br/mdfe">
  <infMDFe versao="3.00" Id="MDF352606${(input.company.cnpj || '').replace(/\D/g, '')}5800100000${input.documentNumber}1000000010">
    <ide>
      <cUF>35</cUF>
      <tpAmb>2</tpAmb>
      <tpEmit>1</tpEmit>
      <mod>58</mod>
      <serie>${input.documentSeries}</serie>
      <nMDF>${input.documentNumber}</nMDF>
      <dhEmi>${formattedDate}</dhEmi>
      <tpEmis>1</tpEmis>
      <procEmi>0</procEmi>
      <verProc>Elparrar ERP v3.0</verProc>
      <UFIni>${input.company.address?.stateUf || 'GO'}</UFIni>
      <UFFim>${input.customer?.address?.stateUf || 'SP'}</UFFim>
    </ide>
    <emit>
      <CNPJ>${(input.company.cnpj || '').replace(/\D/g, '')}</CNPJ>
      <IE>${(input.company.stateRegistration || '').replace(/\D/g, '')}</IE>
      <xNome>${escapeXml(input.company.corporateName || '')}</xNome>
    </emit>
    <infDoc>
      <infMunDescarga>
        <cMunDescarga>${input.customer?.address?.ibgeCode || '3550308'}</cMunDescarga>
        <xMunDescarga>${escapeXml(input.customer?.address?.city || 'São Paulo')}</xMunDescarga>
      </infMunDescarga>
    </infDoc>
  </infMDFe>
</MDFe>`;
    }

    // NF-e e NFC-e Utilizam o Layout Clássico do SEFAZ / Portal Fiscal
    const accessKey = generateSimulatedAccessKey(input.company.cnpj || '', input.documentNumber, input.documentSeries, formattedDate);
    const codeTag = input.documentType === 'NFC-e' ? '65' : '55';

    let nfeXml = `<?xml version="1.0" encoding="UTF-8"?>
<NFe xmlns="http://www.portalfiscal.inf.br/nfe">
  <infNFe versao="4.00" Id="NFe${accessKey}">
    <ide>
      <cUF>35</cUF>
      <cNF>17452618</cNF>
      <natOp>${escapeXml(input.natureOfOperation || 'Venda de Mercadoria')}</natOp>
      <mod>${codeTag}</mod>
      <serie>${input.documentSeries}</serie>
      <nNF>${input.documentNumber}</nNF>
      <dhEmi>${formattedDate}</dhEmi>
      <tpNF>1</tpNF>
      <idDest>1</idDest>
      <cMunFG>${input.company.address?.ibgeCode || '5208707'}</cMunFG>
      <tpImp>1</tpImp>
      <tpEmis>1</tpEmis>
      <cDV>${accessKey.slice(-1)}</cDV>
      <tpAmb>2</tpAmb>
      <finNFe>1</finNFe>
      <indFinal>1</indFinal>
      <indPres>1</indPres>
      <procEmi>0</procEmi>
      <verProc>Elparrar ERP v3.0</verProc>
    </ide>
${XmlGenerator.company_builder(input.company, input.documentType)}
${XmlGenerator.customer_builder(input.customer, input.documentType)}
${XmlGenerator.product_builder(input.items, isSimples)}
${XmlGenerator.totals_builder(input.items, isSimples)}
${XmlGenerator.transport_builder(input.transport)}
${XmlGenerator.payment_builder(input.payment, input.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0))}
    <infAdic>
      <infCpl>${escapeXml(input.additionalInfo || 'Empresa participante do Simples Nacional ou Regime Normal. Geração de XML preparada para validação integral de integradores SEFAZ.')}</infCpl>
    </infAdic>
  </infNFe>
</NFe>`;

    return nfeXml;
  }
};

// Funções de Utilidade Interna
function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

function generateSimulatedAccessKey(cnpj: string, number: number, series: number, dateStr: string): string {
  const cleanCnpj = cnpj.replace(/\D/g, '');
  const paddedCnpj = cleanCnpj.padEnd(14, '0').slice(0, 14);
  const paddedNum = String(number).padStart(9, '0');
  const paddedSeries = String(series).padStart(3, '0');
  
  // Extrair data (YYMM)
  let yymm = '2606';
  try {
    const d = new Date(dateStr);
    const yy = String(d.getFullYear()).slice(-2);
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    yymm = yy + mm;
  } catch (e) {}

  const keyWithoutDV = `35${yymm}${paddedCnpj}55${paddedSeries}${paddedNum}100010203`;
  
  // DV de mentira baseado na soma
  let sum = 0;
  for (let i = 0; i < keyWithoutDV.length; i++) {
    sum += parseInt(keyWithoutDV.charAt(i), 10);
  }
  const dv = sum % 10;
  
  return keyWithoutDV + dv;
}
