# Yopoy — plano de QA e polimento da Central Visual manual

## Objetivo e limites

Este documento planeja o QA visual e manual da primeira implementação da Central Visual e delimita um futuro ciclo de polimento. Ele não autoriza mudanças de estratégia, componentes, backend, banco ou integrações fiscais.

A Central Visual permanece o coração do Yopoy V1/MVP. O fluxo oficial é registrar primeiro, organizar depois, conciliar quando possível, enviar ao contador se o usuário quiser e emitir nota somente no futuro, quando existir capacidade fiscal real e houver confirmação do usuário.

## Status atual

- A etapa 49.0-B entregou a primeira implementação manual da Central Visual, registrada no commit confirmado `55eae6d` (`feat(product): implement manual central visual`).
- A experiência é mobile-first e usa dados locais fictícios e ações locais/mockadas.
- A Central substitui o dashboard antigo como mesa principal de organização pós-login; não deve coexistir com outro dashboard concorrente.
- O estado atual serve para validação visual e manual. Não representa persistência, automação, conciliação automática nem operação fiscal real.
- A etapa 49.0-C é exclusivamente documental: define o que verificar e o que poderá ser polido em uma etapa futura.

## Checklist de QA visual e manual

Registrar cada item como aprovado, reprovado ou bloqueado, com dispositivo, largura da viewport, passos de reprodução e evidência quando houver falha.

### Entrada no app

- [ ] A entrada no app apresenta caminho claro para autenticação e não expõe a Central antes do acesso válido.
- [ ] Após autenticação válida, a navegação conduz ao destino esperado sem tela intermediária ambígua.
- [ ] Erros ou bloqueios de ambiente não são confundidos com falhas visuais da Central.

### Home pós-login

- [ ] A Home pós-login apresenta a Central Visual como experiência principal.
- [ ] O propósito da tela e a próxima ação possível são compreensíveis sem conhecimento prévio do produto.
- [ ] Navegação, títulos e hierarquia visual identificam claramente que o usuário está na Central Visual.

### Ausência de dashboard duplicado

- [ ] Não existe dashboard antigo concorrendo com a Central na Home pós-login.
- [ ] Não há atalhos, blocos ou conteúdos residuais que recriem duas páginas iniciais com a mesma função.
- [ ] Voltar à Home sempre leva a uma única mesa principal de organização.

### Seções da Central Visual

- [ ] Todas as seções previstas aparecem com título, finalidade e hierarquia coerentes.
- [ ] Os cards estão agrupados de forma compreensível e a ordem das seções ajuda a leitura operacional.
- [ ] Não há conteúdo cortado, sobreposto, duplicado ou visualmente desconectado.
- [ ] Estados, prioridades e próximos passos dos cards são distinguíveis sem depender apenas de cor.

### Ações locais/mockadas

- [ ] Toda ação disponível responde visualmente ao comando do usuário.
- [ ] A interface não apresenta ação local/mockada como persistida, automatizada ou concluída em sistema externo.
- [ ] Confirmações, cancelamentos e retornos mantêm o usuário no contexto correto.
- [ ] Recarregar ou reentrar no app não cria expectativa enganosa de persistência.

### Mobile-first

- [ ] A experiência principal é utilizável primeiro em viewport móvel estreita.
- [ ] Textos, cards, botões e alvos de toque permanecem legíveis e acionáveis sem zoom.
- [ ] Não há rolagem horizontal acidental, conteúdo truncado ou controles fora da viewport.
- [ ] A adaptação para larguras maiores preserva hierarquia, leitura e ordem das ações.

### Dados fictícios explícitos

- [ ] Os dados de demonstração são identificados de forma clara e consistente como fictícios.
- [ ] Valores, empresas, pessoas, documentos e situações simuladas não podem ser interpretados como dados reais do usuário.
- [ ] A indicação de dados fictícios continua visível nos pontos em que uma decisão poderia parecer operacional.

### Ausência de emissão fiscal real

- [ ] Nenhuma ação afirma emitir, autorizar, cancelar ou transmitir documento fiscal real.
- [ ] Não há indicação de integração operacional com NF-e, NFC-e, NFS-e, SEFAZ ou certificado A1.
- [ ] Não há XML, DANFE ou status fiscal apresentado como oficial ou autorizado.
- [ ] Referências futuras a nota fiscal deixam explícito que a capacidade está fora do MVP e dependerá de implementação e confirmação do usuário.

## Riscos a observar

### Remoção ampla do dashboard antigo em `App.tsx`

A implementação 49.0-B removeu uma parcela grande do dashboard anterior. O QA deve procurar regressões de entrada, Home pós-login, navegação e conteúdo residual, sem reabrir refatoração nem restaurar um dashboard duplicado por precaução.

### Dependência local de `DATABASE_URL` e ambiente

O acesso local depende da configuração de `DATABASE_URL` e demais variáveis de ambiente aplicáveis. Uma falha de configuração deve ser registrada separadamente de um defeito da Central Visual, incluindo o ambiente usado na reprodução.

### Referência legada do master admin

O master admin ainda usa a referência legada `admin@elparrar.com`. Durante o QA, essa dependência deve ser tratada como risco conhecido, sem alterar autenticação, contrato de acesso ou referência administrativa nesta etapa.

### Cadastro inicial complexo

O cadastro inicial pede informações demais para a primeira entrada. Registrar como backlog a simplificação para dados essenciais da pessoa/usuário, deixando dados da empresa, CNPJ, endereço, fiscal e configurações avançadas para onboarding progressivo dentro da conta. Não transformar o cadastro nesta etapa nem na 49.0-D sem novo escopo explícito.

### Retorno indevido de fiscal real ao MVP

Polimento, textos e ações simuladas não podem reintroduzir promessa ou implementação de emissão fiscal real. NF-e, NFC-e, NFS-e, SEFAZ, certificado A1 operacional, XML/DANFE fiscal real e cancelamento fiscal real permanecem fora do MVP.

## Ajustes permitidos para uma futura etapa 49.0-D

A 49.0-D poderá ser uma etapa estritamente de front-end visual, sem backend, limitada a:

- polimento visual da Central já existente;
- revisão de microcopy, sem alterar contratos ou a estratégia do produto;
- correções de responsividade;
- definição e melhoria de estados vazios;
- maior clareza na identificação de dados fictícios;
- melhoria da organização visual dos cards.

Qualquer implementação futura deve preservar o fluxo manual e os comportamentos existentes. A etapa não deve criar backend, API, persistência, migration, mudança de banco, automação, conciliação automática ou capacidade fiscal real. Alterações no cadastro inicial permanecem somente no backlog até receberem escopo próprio.

## Critério de saída do QA

O QA estará concluído quando o checklist tiver resultado registrado nos ambientes avaliados, os bloqueadores visuais estiverem identificados e os ajustes candidatos estiverem classificados dentro ou fora do escopo da 49.0-D. A aprovação não implica disponibilidade de backend, persistência ou fiscal real.
