// Global Types for the app, fresh and tight

export type UserRole = 'admin' | 'assistant' | 'cashier';

export interface User {
  id: number;
  username: string;
  fullName: string;
  role: UserRole;
  email?: string; // Added optional email 'cause why not?
  createdAt: string;
  updatedAt?: string; // track updates, babe
}

export interface Category {
  id: number;
  name: string;
  description?: string; // optional description to spice it up
  createdAt?: string;
  updatedAt?: string;
}

export interface Brand {
  id: number;
  name: string;
  description?: string; // same here, gotta keep it fresh
  createdAt?: string;
  updatedAt?: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  categoryName?: string;
  brandId: number;
  brandName?: string;
  stockQuantity: number;
  stockThreshold: number;
  price: number;
  createdAt: string;
  updatedAt?: string;
  isActive?: boolean; // for soft delete or active/inactive status
}

export interface Vendor {
  id: number;
  name: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  createdAt?: string;
  updatedAt?: string;
  notes?: string; // extra info about the vendor
}

export interface PurchaseDetail {
  id: number;
  purchaseId: number;
  productId: number;
  productName?: string;
  quantity: number;
  unitPrice: number;
  totalPrice?: number; // convenience field, quantity * unitPrice
}

export interface Purchase {
  id: number;
  vendorId: number;
  vendorName?: string;
  purchaseDate: string;
  userId: number;
  userName?: string;
  totalAmount: number;
  items: PurchaseDetail[];
  status?: 'pending' | 'completed' | 'cancelled'; // keep track of purchase status
  createdAt?: string;
  updatedAt?: string;
}

export interface SaleDetail {
  id: number;
  saleId: number;
  productId: number;
  productName?: string;
  quantity: number;
  unitPrice: number;
  totalPrice?: number; // same convenience field here
}

export interface Sale {
  id: number;
  saleDate: string;
  customerName: string;
  userId: number;
  userName?: string;
  totalAmount: number;
  items: SaleDetail[];
  status?: 'pending' | 'completed' | 'refunded'; // track sales status
  createdAt?: string;
  updatedAt?: string;
}

export interface StockMovement {
  id: number;
  productId: number;
  productName?: string;
  movementType: 'IN' | 'OUT';
  quantity: number;
  movementDate: string;
  userId: number;
  userName?: string;
  reason?: string; // optional reason for movement (like sale, restock)
}

export interface StockAlert {
  id: number;
  productId: number;
  productName?: string;
  stockQuantity: number;
  stockThreshold: number;
  alertDate: string;
  resolved: boolean;
  resolvedAt?: string;
  resolvedByUserId?: number;
  resolvedByUserName?: string;
}

export interface AuditLog {
  id: number;
  userId: number;
  userName?: string;
  action: string;
  timestamp: string;
  details?: string; // extra info on what the hell happened
}

export interface DashboardStats {
  totalProducts: number;
  lowStockCount: number;
  todaySales: number;
  todayPurchases: number;
  recentSales: Sale[];
  recentPurchases: Purchase[];
  stockAlerts: StockAlert[];
}
