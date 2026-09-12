import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Producto, ItemOrden, Orden, ResultadoOperacion } from '../types';

const STORAGE_KEY = '@restaurante_ordenes_historial';
export const IVA_RATE = 0.13;
export const MAX_QUANTITY = 20;

interface OrderContextType {
  orderItems: ItemOrden[];
  orderHistory: Orden[];
  isLoadingHistory: boolean;
  subtotal: number;
  tax: number;
  total: number;
  totalItemsCount: number;
  addToOrder: (product: Producto, quantity: number) => ResultadoOperacion;
  updateQuantity: (productId: string, newQuantity: number) => ResultadoOperacion;
  removeFromOrder: (productId: string) => void;
  clearCurrentOrder: () => void;
  confirmOrder: () => Promise<ResultadoOperacion>;
  clearHistory: () => Promise<ResultadoOperacion>;
  loadOrderHistory: () => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orderItems, setOrderItems] = useState<ItemOrden[]>([]);
  const [orderHistory, setOrderHistory] = useState<Orden[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);

  useEffect(() => { loadOrderHistory(); }, []);

  const loadOrderHistory = async (): Promise<void> => {
    try {
      setIsLoadingHistory(true);
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: Orden[] = JSON.parse(stored);
        setOrderHistory(parsed.sort((a, b) => b.timestamp - a.timestamp));
      }
    } catch (error) {
      console.error('Error al cargar historial:', error);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const saveHistory = async (history: Orden[]): Promise<void> => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    setOrderHistory(history);
  };

  const addToOrder = (product: Producto, quantity: number): ResultadoOperacion => {
    if (!product || !product.id || !product.name) {
      return { success: false, message: 'Producto no válido.' };
    }
    if (isNaN(product.price) || product.price <= 0) {
      return { success: false, message: 'El precio debe ser mayor a $0.' };
    }
    if (!Number.isInteger(quantity) || quantity <= 0) {
      return { success: false, message: 'La cantidad debe ser un entero mayor a 0.' };
    }

    const existingIdx = orderItems.findIndex((i) => i.id === product.id);
    const currentQty = existingIdx >= 0 ? orderItems[existingIdx].quantity : 0;

    if (currentQty + quantity > MAX_QUANTITY) {
      return { success: false, message: `Máximo ${MAX_QUANTITY} unidades por producto (tienes ${currentQty}).` };
    }

    let updated: ItemOrden[];
    if (existingIdx >= 0) {
      updated = [...orderItems];
      const newQty = updated[existingIdx].quantity + quantity;
      updated[existingIdx] = { ...updated[existingIdx], quantity: newQty, subtotal: parseFloat((newQty * product.price).toFixed(2)) };
    } else {
      const newItem: ItemOrden = {
        id: product.id, name: product.name, category: product.category,
        price: product.price, image: product.image, quantity,
        subtotal: parseFloat((quantity * product.price).toFixed(2)),
      };
      updated = [...orderItems, newItem];
    }
    setOrderItems(updated);
    return { success: true, message: `¡${quantity} unidad(es) de "${product.name}" agregadas!` };
  };

  const updateQuantity = (productId: string, newQty: number): ResultadoOperacion => {
    if (!Number.isInteger(newQty) || newQty < 1) return { success: false, message: 'La cantidad debe ser >= 1.' };
    if (newQty > MAX_QUANTITY) return { success: false, message: `Máximo ${MAX_QUANTITY} unidades.` };
    setOrderItems((prev) => prev.map((item) =>
      item.id === productId ? { ...item, quantity: newQty, subtotal: parseFloat((newQty * item.price).toFixed(2)) } : item
    ));
    return { success: true, message: '' };
  };

  const removeFromOrder = (productId: string) => setOrderItems((prev) => prev.filter((i) => i.id !== productId));
  const clearCurrentOrder = () => setOrderItems([]);

  const subtotal = parseFloat(orderItems.reduce((sum, i) => sum + i.subtotal, 0).toFixed(2));
  const tax = parseFloat((subtotal * IVA_RATE).toFixed(2));
  const total = parseFloat((subtotal + tax).toFixed(2));
  const totalItemsCount = orderItems.reduce((sum, i) => sum + i.quantity, 0);

  const confirmOrder = async (): Promise<ResultadoOperacion> => {
    if (orderItems.length === 0) {
      return { success: false, message: 'No se puede confirmar una orden vacía.' };
    }
    const now = new Date();
    const formattedDate = now.toLocaleDateString('es-SV', { day: '2-digit', month: 'short', year: 'numeric' })
      + ' ' + now.toLocaleTimeString('es-SV', { hour: '2-digit', minute: '2-digit', hour12: true });

    const newOrder: Orden = {
      id: 'ORD-' + Date.now(), timestamp: Date.now(), date: now.toISOString(),
      formattedDate, items: [...orderItems], subtotal, tax, total, totalUnits: totalItemsCount,
    };

    const updatedHistory = [newOrder, ...orderHistory];
    await saveHistory(updatedHistory);
    setOrderItems([]);
    return { success: true, message: `Orden confirmada por $${total.toFixed(2)}.`, order: newOrder };
  };

  const clearHistory = async (): Promise<ResultadoOperacion> => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    setOrderHistory([]);
    return { success: true, message: 'Historial eliminado.' };
  };

  return (
    <OrderContext.Provider value={{
      orderItems, orderHistory, isLoadingHistory, subtotal, tax, total, totalItemsCount,
      addToOrder, updateQuantity, removeFromOrder, clearCurrentOrder, confirmOrder, clearHistory, loadOrderHistory,
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrder debe usarse dentro de OrderProvider');
  return context;
};
