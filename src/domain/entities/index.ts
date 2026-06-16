export interface BaseEntity {
  id: string;
  company_id: string;
  created_at: Date;
  updated_at: Date;
  created_by?: string;
  updated_by?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'ARCHIVED' | 'DELETED' | 'PENDING' | 'CLOSED';
}

export interface AuditableEntity extends BaseEntity {
  archived_at?: Date;
  archived_by?: string;
  deleted_at?: Date;
  deleted_by?: string;
  version: number;
}

export interface Company {
  id: string;
  cnpj?: string;
  name: string;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  created_at: Date;
}

export interface User extends BaseEntity {
  email: string;
  role: string;
}

export interface Role extends BaseEntity {
  name: string;
  permissions: string[];
}

export interface Customer extends AuditableEntity {
  name: string;
  tax_id?: string;
  email?: string;
  phone?: string;
}

export interface Product extends AuditableEntity {
  name: string;
  sku?: string;
  price: number;
}

export interface Service extends AuditableEntity {
  name: string;
  price: number;
}

export interface SaleItem {
  id: string;
  sale_id: string;
  product_id?: string;
  service_id?: string;
  qty: number;
  unit_value: number;
  total_value: number;
}

export interface Sale extends AuditableEntity {
  customer_id?: string;
  total_amount: number;
  discount_amount: number;
  items: SaleItem[];
}

export interface Payment extends AuditableEntity {
  amount: number;
  method: 'PIX' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'CASH' | 'TRANSFER' | 'OTHER';
}

export interface PaymentLink {
  id: string;
  payment_id: string;
  sale_id: string;
  assigned_amount: number;
  created_at: Date;
  created_by: string;
}

export interface CashSession extends BaseEntity {
  opened_at: Date;
  closed_at?: Date;
  initial_balance: number;
  final_balance?: number;
}

export interface CashMovement {
  id: string;
  session_id: string;
  type: 'IN' | 'OUT';
  amount: number;
  notes?: string;
  created_at: Date;
  created_by: string;
}

export interface Expense extends AuditableEntity {
  amount: number;
  date: Date;
  category: string;
  description?: string;
}

export interface Attachment extends BaseEntity {
  url: string;
  type: 'RECEIPT' | 'INVOICE' | 'OTHER';
  parent_entity_id: string;
  parent_entity_type: string;
}

export interface SmartCaptureDraft extends AuditableEntity {
  raw_text: string;
  attachment_id?: string;
}

export interface DraftInvoice extends AuditableEntity {
  sale_id: string;
  simulated_taxes: Record<string, number>;
}

export interface AccountantPackage extends BaseEntity {
  period_start: Date;
  period_end: Date;
}

export interface LedgerEntry extends BaseEntity {
  account: string;
  debit: number;
  credit: number;
  reference_id?: string;
}

export interface AuditLog {
  id: string;
  company_id: string;
  entity_type: string;
  entity_id: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'ARCHIVE' | 'LINK' | 'UNLINK';
  previous_state?: string;
  current_state: string;
  user_id: string;
  created_at: Date;
}

export interface PendingItem extends BaseEntity {
  type: 'UNLINKED_PAYMENT' | 'UNPAID_SALE' | 'UNREVIEWED_DRAFT';
  reference_id: string;
  amount?: number;
}
