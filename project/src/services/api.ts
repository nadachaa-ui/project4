import axios from 'axios';
import {
  User,
  Category,
  Brand,
  Product,
  DashboardStats,
} from '../types';

// Axios instance
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: { 'Content-Type': 'application/json' },
});

// Intercept requests to attach auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const auth = {
  login: async (username: string, password: string): Promise<User> => {
    const response = await api.post('/auth/login/', { username, password });
    const { user, token } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  },

  register: async (
    username: string,
    password: string,
    fullName: string,
    role: 'admin' | 'assistant' | 'cashier'
  ): Promise<User> => {
    const response = await api.post('/auth/register/', {
      username,
      password,
      fullName,
      role,
    });
    return response.data.user;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

// Products
export const products = {
  getAll: async (): Promise<Product[]> => {
    const response = await api.get('/products/');
    return response.data;
  },

  getById: async (id: number): Promise<Product> => {
    const response = await api.get(`/products/${id}/`);
    return response.data;
  },

  create: async (product: Omit<Product, 'id' | 'createdAt'>): Promise<Product> => {
    const response = await api.post('/products/', product);
    return response.data;
  },

  update: async (id: number, product: Partial<Product>): Promise<Product> => {
    const response = await api.put(`/products/${id}/`, product);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/products/${id}/`);
  },
};

// Categories
export const categories = {
  getAll: async (): Promise<Category[]> => {
    const response = await api.get('/categories/');
    return response.data;
  },

  create: async (category: Omit<Category, 'id'>): Promise<Category> => {
    const response = await api.post('/categories/', category);
    return response.data;
  },

  update: async (id: number, category: Partial<Category>): Promise<Category> => {
    const response = await api.put(`/categories/${id}/`, category);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/categories/${id}/`);
  },
};

// Brands
export const brands = {
  getAll: async (): Promise<Brand[]> => {
    const response = await api.get('/brands/');
    return response.data;
  },

  create: async (brand: Omit<Brand, 'id'>): Promise<Brand> => {
    const response = await api.post('/brands/', brand);
    return response.data;
  },

  update: async (id: number, brand: Partial<Brand>): Promise<Brand> => {
    const response = await api.put(`/brands/${id}/`, brand);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/brands/${id}/`);
  },
};

// Dashboard
export const dashboard = {
  getStats: async (): Promise<DashboardStats> => {
    const response = await api.get('/dashboard/stats/');
    return response.data;
  },
};

// Export grouped services
const apiService = {
  auth,
  products,
  categories,
  brands,
  dashboard,
};

export default apiService;
