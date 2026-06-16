# Política de Bloqueio da UI Fiscal Legada

## O Perigo
Nos Módulos primitivos do software (fase pré-MVP formal), o aplicativo foi construído puramente para fins de "Pitch" visual. Existiam telas gráficas belissimas (e de grande peso e manutenção) permitindo que o usuário simulasse do zero toda emissão de XML fiscal e Assinatura via Sefaz e emissão de notas.

Com a migração imposta pela Diretrizes de Transição de Arquitetura Limpa, identificamos que manter esse visual fake vivo:
1. Enganaria usuários não-técnicos do time, promovendo acuracidade falsa no estado do App.
2. Cava ganchos para comportamentos perigosos de simular envio fiscal sem a arquitetura robusta de Backend consolidada.

## Bloqueio Anti-Corrupção
Decidimos remover o conteúdo integral dos componentes de `InvoiceTool.tsx`, `NfseTool.tsx`, `NfcePosTool.tsx`. Eles permanecem declarados no projeto, mas seu HTML retorna nativamente uma UI estática estrita contendo a bandeira vermelha: **"Módulo fiscal bloqueado."**

O Backend acompanha essa proteção com seus Handlers do Módulo devolvendo o respectivo payload de erro `FISCAL_ACTION_BLOCKED`.

## Próximos Passos
O Visual rico da tela Fiscal será retornado de volta integralmente **apenas após** conectarmos uma engine Sefaz real homologada num Node/PostgreSQL protegido. A "Quarentena Fiscal" ditará os próximos trâmites para o projeto.
