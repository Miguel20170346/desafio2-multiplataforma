import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ItemOrden } from '../types';
import { colors } from '../styles/theme';
import { MAX_QUANTITY } from '../context/OrderContext';

interface OrderItemCardProps {
  item: ItemOrden;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onValidationError: (msg: string) => void;
}

export default function OrderItemCard({ item, onUpdateQuantity, onRemove, onValidationError }: OrderItemCardProps) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.thumb} />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.unit}>Precio: ${item.price.toFixed(2)}</Text>
        <Text style={styles.sub}>Subtotal: <Text style={styles.subVal}>${item.subtotal.toFixed(2)}</Text></Text>
      </View>
      <View style={styles.controls}>
        <View style={styles.qtyBox}>
          <TouchableOpacity onPress={() => item.quantity > 1 ? onUpdateQuantity(item.id, item.quantity - 1) : onRemove(item.id)} style={styles.btn}>
            <Ionicons name={item.quantity === 1 ? 'trash-outline' : 'remove'} size={16} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.qtyText}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => {
            if (item.quantity < MAX_QUANTITY) onUpdateQuantity(item.id, item.quantity + 1);
            else onValidationError(`Máximo ${MAX_QUANTITY} unidades.`);
          }} style={styles.btn}>
            <Ionicons name="add" size={16} color={item.quantity >= MAX_QUANTITY ? colors.border : colors.textPrimary} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => onRemove(item.id)} style={{ marginTop: 8 }}>
          <Ionicons name="close-circle" size={20} color={colors.danger} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 12, marginHorizontal: 16, marginVertical: 6, borderRadius: 14, elevation: 2 },
  thumb: { width: 60, height: 60, borderRadius: 10 },
  info: { flex: 1, marginLeft: 12 },
  name: { fontSize: 15, fontWeight: '700', color: colors.textPrimary },
  unit: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },
  sub: { fontSize: 13, color: colors.textPrimary, marginTop: 3 },
  subVal: { fontWeight: '800', color: colors.primary },
  controls: { alignItems: 'flex-end', marginLeft: 8 },
  qtyBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', borderRadius: 8, borderWidth: 1, borderColor: colors.border },
  btn: { padding: 6 },
  qtyText: { fontSize: 14, fontWeight: '700', paddingHorizontal: 8, color: colors.textPrimary },
});
