// Interfaces TypeScript para la aplicación del Restaurante Mexicano
// Segundo Desafío Práctico - DPSCII - UDB

export interface Producto {
  id: string;
  name: string;
  category: 'alimentos' | 'bebidas';
  price: number;
  description: string;
  image: string;
}

export interface ItemOrden {
  id: string;
  name: string;
  category: 'alimentos' | 'bebidas';
  price: number;
  image: string;
  quantity: number;
  subtotal: number;
}

export interface Orden {
  id: string;
  timestamp: number;
  date: string;
  formattedDate: string;
  items: ItemOrden[];
  subtotal: number;
  tax: number;
  total: number;
  totalUnits: number;
}

export interface Usuario {
  username: string;
  password: string;
  name: string;
}

export interface ResultadoOperacion {
  success: boolean;
  message: string;
  order?: Orden;
}
