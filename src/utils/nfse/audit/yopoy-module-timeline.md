# Linha do Tempo dos Módulos Yopoy

- **Fase Inicial (Protótipos):** Construção da UX visual sem regras de governança de dados. Adição de simulações de PDF (Boleto/DANFE). Entregas: Mocks, Componentes React pesados. Riscos altos de acoplamento gerados. Nomes confusos.
- **Fase Módulos Fiscais (POC):** Ferramentas de geração de XML falsas e manipulação em tela. Adição massiva de Mocks e classes como `SefazReal`. Riscos extremos fiscais não-regulados.
- **Série 47.0 (Saneamento de Conceito):** Reconhecimento do risco. Definição estrita das bordas. Adoção da separação entre Rascunho (Draft) e Dado Fiscal (Sale/Invoice). Governança de isolamento.
- **Série 47.1 (Domain Layer):** Implementação real de TypeScripts orientados a Domínio, sem lógica de DB. Repositórios em memória estabelecidos. Use-Cases estabelecidos. Base de negócio madura.
- **Série 47.2 (API Boundary):** Mapeamento do Domain Layer em DTOs, Handlers, RequestContext. Simulação de ambiente servidor. Implantação de Testes `.ts` que provaram a eficácia do Isolamento `company_id`.

**Status Atual:** Transição de backend MOCK in-memory para BD.
