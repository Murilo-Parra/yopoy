# Frontend/Backend Boundary

## O que o React pode fazer
- Renderizar tela
- Mostrar formulário
- Validar UX simples
- Chamar API
- Mostrar feedback

## O que o React não pode fazer
- Acessar banco
- Guardar segredo
- Decidir role
- Decidir company_id
- Decidir plano
- Decidir fiscal
- Decidir permissão
- Chamar SEFAZ
- Chamar gateway
- Manipular certificado

## O que o backend deve fazer
- Validar auth
- Validar permissão
- Validar tenant
- Validar payload
- Chamar use cases
- Registrar auditoria
- Controlar banco
- Controlar fiscal
- Controlar gateway

## O que nunca pode ir para o bundle do navegador
- Dependências Node como `fs`, `path`, `net`, `tls`, `dns`, `child_process`
- Conexões ao banco (ex: `pg`, `pg-pool`)
- Lógicas de criptografia severa como `node-forge`, `xml-crypto`
- Variáveis de ambiente secretas (ex: `DATABASE_URL`, `SERVICE_ROLE`, senhas, certificados)
