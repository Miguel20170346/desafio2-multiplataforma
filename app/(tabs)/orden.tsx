import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useOrder, IVA_RATE } from '../../src/context/OrderContext';
import OrderItemCard from '../../src/components/OrderItemCard';
import AlertBanner from '../../src/components/AlertBanner';
import HeaderBar from '../../src/components/HeaderBar';
import { colors } from '../../src/styles/theme';

export default function OrderScreen() {
  const { orderItems, subtotal, tax, total, totalItemsCount, updateQuantity, removeFromOrder, clearCurrentOrder, confirmOrder } = useOrder();
  const router = useRouter();
  const [banner, setBanner] = useState<{ type: 'error' | 'warning' | 'success' | 'info'; message: string } | null>(null);

  const handleClear = () => {
    if (orderItems.length === 0) return;
    Alert.alert('Vaciar Orden', '¿Eliminar todos los productos de la orden actual?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Vaciar', style: 'destructive', onPress: () => { clearCurrentOrder(); setBanner({ type: 'info', message: 'Orden vaciada.' }); } },
    ]);
  };

  const handleConfirm = () => {
    if (orderItems.length === 0) {
      setBanner({ type: 'warning', message: 'No se puede confirmar una orden vacía. Agregue productos desde el Menú.' });
      return;
    }
    Alert.alert('Confirmar Pedido', `¿Confirmar orden por $${total.toFixed(2)} (IVA 13% incluido)?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sí, Confirmar', onPress: async () => {
        const result = await confirmOrder();
        if (result.success) {
          Alert.alert('¡Orden Confirmada!', result.message, [
            { text: 'Ver Historial', onPress: () => router.push('/(tabs)/historial') },
            { text: 'Aceptar' },
          ]);
        } else {
          setBanner({ type: 'error', message: result.message });
        }
      }},
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <HeaderBar title="Mi Orden Actual" subtitle="Detalle de productos e impuestos" />
      {banner && <AlertBanner type={banner.type} message={banner.message} onClose={() => setBanner(null)} />}

      {orderItems.length === 0 ? (
        <View style={styles.emptyBox}>
          <View style={styles.emptyCircle}><Ionicons name="cart-outline" size={60} color={colors.primary} /></View>
          <Text style={styles.emptyTitle}>Tu orden está vacía</Text>
          <Text style={styles.emptySub}>Explora el catálogo para armar tu pedido.</Text>
          <TouchableOpacity style={styles.exploreBtn} onPress={() => router.push('/(tabs)/menu')}>
            <Ionicons name="restaurant-outline" size={20} color="#FFF" />
            <Text style={styles.exploreTxt}>Ir al Menú</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <View style={styles.orderHeader}>
            <Text style={styles.orderCount}>Productos ({totalItemsCount} unidades)</Text>
            <TouchableOpacity onPress={handleClear} style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Ionicons name="trash-outline" size={16} color={colors.danger} />
              <Text style={{ fontSize: 13, color: colors.danger, fontWeight: '600' }}>Vaciar</Text>
            </TouchableOpacity>
          </View>

          <FlatList data={orderItems} keyExtractor={(i) => i.id}
            renderItem={({ item }) => <OrderItemCard item={item} onUpdateQuantity={updateQuantity} onRemove={removeFromOrder}
              onValidationError={(msg) => setBanner({ type: 'warning', message: msg })} />}
            contentContainerStyle={{ paddingBottom: 10 }} />

          <View style={styles.summary}>
            <Text style={styles.summaryTitle}>Resumen de la Orden</Text>
            <View style={styles.row}><Text style={styles.label}>Subtotal general:</Text><Text style={styles.value}>${subtotal.toFixed(2)}</Text></View>
            <View style={styles.row}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Text style={styles.label}>Impuesto IVA (13%):</Text>
                <Text style={styles.taxBadge}>Tasa fija</Text>
              </View>
              <Text style={styles.value}>${tax.toFixed(2)}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.row}><Text style={styles.totalLabel}>Total a pagar:</Text><Text style={styles.totalValue}>${total.toFixed(2)}</Text></View>
            <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
              <Ionicons name="checkmark-done" size={22} color="#FFF" />
              <Text style={styles.confirmText}>Confirmar Pedido</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 18, paddingVertical: 10 },
  orderCount: { fontSize: 15, fontWeight: '700', color: colors.textPrimary },
  emptyBox: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 30 },
  emptyCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: colors.primaryLight, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  emptyTitle: { fontSize: 22, fontWeight: '800', color: colors.textPrimary },
  emptySub: { fontSize: 14, color: colors.textSecondary, textAlign: 'center', marginTop: 8, marginBottom: 24 },
  exploreBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primary, paddingHorizontal: 24, paddingVertical: 14, borderRadius: 12, gap: 8, elevation: 3 },
  exploreTxt: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  summary: { backgroundColor: '#FFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingHorizontal: 20, paddingTop: 18, paddingBottom: 22, elevation: 8, borderTopWidth: 1, borderColor: colors.border },
  summaryTitle: { fontSize: 16, fontWeight: '700', color: colors.textPrimary, marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 4 },
  label: { fontSize: 14, color: colors.textSecondary },
  value: { fontSize: 15, fontWeight: '600', color: colors.textPrimary },
  taxBadge: { fontSize: 10, fontWeight: '700', color: colors.secondary, backgroundColor: colors.secondaryLight, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 10 },
  totalLabel: { fontSize: 18, fontWeight: '800', color: colors.textPrimary },
  totalValue: { fontSize: 22, fontWeight: '800', color: colors.primary },
  confirmBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primary, paddingVertical: 14, borderRadius: 14, marginTop: 14, gap: 8, elevation: 3 },
  confirmText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
});
