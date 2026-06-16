# Mapa de Riscos Legais e Fiscais (Yopoy)

🚨 **AVISO: Esta auditoria não substitui contador nem advogado. O relatório aponta pontos que exigem validação profissional externa.** 🚨

## Avaliação de Conformidade

### 1. Dados e Privacidade
- **LGPD / Proteção de Dados:** Coleta passiva atual de e-mail e CPF `Customer`. O sistema precisará armazenar logs em conformidade total no DB cloud, e termos de serviço expostos ao User.
- **Classificação:** *Pendente de validação jurídica* e *Risco de privacidade*.

### 2. Termos de Uso / Política / Contrato
- **Classificação:** *Pendente de validação jurídica*. Não existem os contratos e click-wraps (Aceites eletrônicos) desenhados no app.

### 3. Emissões Fiscais (NF-e, NFC-e, NFS-e)
- **Status:** **BLOQUEADO ATIVAMENTE NA API (HTTP 403 FISCAL_ACTION_BLOCKED)**.
- Qualquer tentativa de burlar a infraestrutura e gerar arquivo XML em nome de usuário geraria responsabilidade penal e fiscal em escalão severo ou fraude. 
- Distinções de Rascunho, Captura, Compra, Livro Caixa estão mitigadas pela separação feita no domínio de *SmartCaptureDraft* e *DraftInvoice* isentas da validade formal. 
- **Classificação:** *Risco fiscal*. O uso de endpoints que chamem gateway / assinatura necessitarão ser amplamente revistos com validação contábil formal de Certificado Digital (A1 PKCS#12) no banco AWS / Firebase. 

### 4. Riscos Envolvendo Armazenamento de Comprovantes
- É necessário validar a extensão até onde o App é um "Depositário Fiél" e armazenamento em Nuvem do certificado/XML.
- Tratamento de Recibos não Fiscais X Notas Fiscais precisa ser UI-clara, caso contrário entra em *Risco Fiscal / Sonegação por Confusão Acidental*.
- **Classificação:** *Pendente de validação contábil.*

Garantir os Mocks Ativos em Handlers como impedimentos finais evitam *qualquer* tipo de incidente produtivo agora.
