import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Producto } from '../types';
import { colors } from '../styles/theme';
import { MAX_QUANTITY } from '../context/OrderContext';

interface ProductCardProps {
  product: Producto;
  onAdd: (product: Producto, quantity: number) => void;
  onValidationError: (message: string) => void;
}

export default function ProductCard({ product, onAdd, onValidationError }: ProductCardProps) {
  const [quantity, setQuantity] = useState('1');

  const handleAdd = () => {
    const num = parseInt(quantity, 10);
    if (!quantity || isNaN(num) || num <= 0) {
      onValidationError('Debe seleccionar al menos 1 unidad.');
      setQuantity('1');
      return;
    }
    if (num > MAX_QUANTITY) {
      onValidationError(`Máximo ${MAX_QUANTITY} unidades por producto.`);
      return;
    }
    onAdd(product, num);
    setQuantity('1');
  };

  const numQty = parseInt(quantity, 10) || 0;

  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.badgeRow}>
          <View style={[styles.badge, { backgroundColor: product.category === 'alimentos' ? colors.primaryLight : colors.secondaryLight }]}>
            <Text style={[styles.badgeText, { color: product.category === 'alimentos' ? colors.primaryDark : colors.secondary }]}>
              {product.category === 'alimentos' ? '🌮 Platillo' : '🥤 Bebida'}
            </Text>
          </View>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        </View>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.desc} numberOfLines={2}>{product.description}</Text>
        <View style={styles.actionRow}>
          <View style={styles.qtyBox}>
            <TouchableOpacity style={styles.qtyBtn} onPress={() => numQty > 1 && setQuantity(String(numQty - 1))}>
              <Ionicons name="remove" size={18} color={numQty <= 1 ? colors.border : colors.textPrimary} />
            </TouchableOpacity>
            <TextInput style={styles.qtyInput} keyboardType="number-pad" value={quantity}
              onChangeText={(t) => setQuantity(t.replace(/[^0-9]/g, ''))} maxLength={2} />
            <TouchableOpacity style={styles.qtyBtn} onPress={() => {
              if (numQty < MAX_QUANTITY) setQuantity(String(numQty + 1));
              else onValidationError(`Límite máximo: ${MAX_QUANTITY} unidades.`);
            }}>
              <Ionicons name="add" size={18} color={numQty >= MAX_QUANTITY ? colors.border : colors.textPrimary} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
            <Ionicons name="cart" size={18} color="#FFF" />
            <Text style={styles.addText}>Agregar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFF', borderRadius: 16, marginHorizontal: 16, marginVertical: 8, elevation: 3, overflow: 'hidden' },
  image: { width: '100%', height: 160 },
  content: { padding: 16 },
  badgeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  badgeText: { fontSize: 12, fontWeight: '700' },
  price: { fontSize: 20, fontWeight: '800', color: colors.primary },
  name: { fontSize: 17, fontWeight: '700', color: colors.textPrimary, marginBottom: 4 },
  desc: { fontSize: 13, color: colors.textSecondary, lineHeight: 18, marginBottom: 14 },
  actionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  qtyBox: { flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: colors.border, borderRadius: 10, backgroundColor: '#F9FAFB' },
  qtyBtn: { paddingHorizontal: 10, paddingVertical: 8 },
  qtyInput: { width: 38, textAlign: 'center', fontSize: 16, fontWeight: '700', color: colors.textPrimary },
  addBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primary, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10, gap: 6 },
  addText: { color: '#FFF', fontSize: 15, fontWeight: '700' },
});
