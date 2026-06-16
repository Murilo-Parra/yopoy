# Mapa Atual do Sistema Yopoy ERP

## Visão Geral
O Yopoy ERP apresenta um design modular focado em regras de negócio para pequenas empresas.

## 1. Domain Layer
- **Entidades:** `Company`, `User`, `Role`, `Customer`, `Product`, `Service`, `Sale`, `SaleItem`, `Payment`, `CashSession`, etc.
- Todas definidas através do `BaseEntity` contendo `company_id`.

## 2. Application Layer
- Conjunto de Unidades Funcionais (Use Cases).
- Exemplos: `cash`, `draft-invoices`, `payments`, `sales`, `smart-capture`.
- Isolamento por interfaces de Repositório.

## 3. Backend Presentation Layer
- Onde a entrada web/REST ocorreria (Handlers e Validators). DTOs explícitos criados. Funciona localmente.

## 4. Frontend Layer
- Feita em Vite+React. Encontra-se desorganizada face às mudanças para a "Visão V2 Yopoy". Telas de "Elparrar" ainda figuram.

## 5. Infrastructure Layer
- Todos mapeados atualmente para instâncias `/infrastructure/in-memory`.
- Ausência de mapeamento SQL (Drizzle ORM ou genérico).
