import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  country: string;
  inStock: boolean;
}

export interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export const getProducts = () => api.get('/products').then((res) => res.data.data as Product[]);

export const getProductById = (id: number) =>
  api.get(`/products/${id}`).then((res) => res.data.data as Product);

export const createProduct = (product: Omit<Product, 'id'>) =>
  api.post('/products', product).then((res) => res.data.data as Product);

export const deleteProduct = (id: number) =>
  api.delete(`/products/${id}`).then((res) => res.data.data as Product);

export const createMessage = (message: { name: string; email: string; message: string }) =>
  api.post('/contact', message).then((res) => res.data.data as Message);

export const getMessages = () =>
  api.get('/contact').then((res) => res.data.data as Message[]);
