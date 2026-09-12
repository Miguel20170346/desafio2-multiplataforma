import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useOrder } from '../../src/context/OrderContext';
import { Orden } from '../../src/types';
import HeaderBar from '../../src/components/HeaderBar';
import AlertBanner from '../../src/components/AlertBanner';
import { colors } from '../../src/styles/theme';

export default function HistoryScreen() {
  const { orderHistory, isLoadingHistory, clearHistory, loadOrderHistory } = useOrder();
  const router = useRouter();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [banner, setBanner] = useState<{ type: 'info'; message: string } | null>(null);

  const handleClearHistory = () => {
    if (orderHistory.length === 0) return;
    Alert.alert('Limpiar Historial', '¿Eliminar todas las órdenes guardadas en AsyncStorage?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar Todo', style: 'destructive', onPress: async () => {
        const r = await clearHistory();
        if (r.success) setBanner({ type: 'info', message: r.message });
      }},
    ]);
  };

  const renderOrder = ({ item, index }: { item: Orden; index: number }) => {
    const isExpanded = expandedId === item.id;
    return (
      <View style={styles.card}>
        <TouchableOpacity style={styles.cardHeader} onPress={() => setExpandedId(isExpanded ? null : item.id)}>
          <View style={styles.headerLeft}>
            <View style={styles.numBadge}><Text style={styles.numText}>#{orderHistory.length - index}</Text></View>
            <View>
              <Text style={styles.orderId}>Orden {item.id}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 }}>
                <Ionicons name="calendar-outline" size={13} color={colors.textSecondary} />
                <Text style={styles.dateText}>{item.formattedDate}</Text>
              </View>
            </View>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.orderTotal}>${item.total.toFixed(2)}</Text>
            <Ionicons name={isExpanded ? 'chevron-up' : 'chevron-down'} size={18} color={colors.textSecondary} />
          </View>
        </TouchableOpacity>

        <View style={styles.briefRow}>
          <Text style={styles.briefText}>{item.totalUnits} unidad(es) • {item.items.length} producto(s)</Text>
          <Text style={styles.taxBrief}>IVA (13%): ${item.tax.toFixed(2)}</Text>
        </View>

        {isExpanded && (
          <View style={{ marginTop: 8 }}>
            <View style={styles.divider} />
            <Text style={styles.prodTitle}>Productos:</Text>
            {item.items.map((prod, idx) => (
              <View key={`${item.id}-${prod.id}-${idx}`} style={styles.prodRow}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, gap: 6 }}>
                  <Text style={styles.prodQty}>{prod.quantity}x</Text>
                  <Text style={styles.prodName} numberOfLines={1}>{prod.name}</Text>
                </View>
                <Text style={styles.prodSub}>${prod.subtotal.toFixed(2)}</Text>
              </View>
            ))}
            <View style={styles.divider} />
            <View style={styles.accRow}><Text style={styles.accLabel}>Subtotal:</Text><Text style={styles.accValue}>${item.subtotal.toFixed(2)}</Text></View>
            <View style={styles.accRow}><Text style={styles.accLabel}>IVA (13%):</Text><Text style={styles.accValue}>${item.tax.toFixed(2)}</Text></View>
            <View style={[styles.accRow, styles.accTotalRow]}>
              <Text style={styles.accTotalLabel}>Total Pagado:</Text>
              <Text style={styles.accTotalValue}>${item.total.toFixed(2)}</Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <HeaderBar title="Historial de Compras" subtitle="Órdenes guardadas en AsyncStorage" />
      {banner && <AlertBanner type={banner.type} message={banner.message} onClose={() => setBanner(null)} />}

      {isLoadingHistory ? (
        <View style={styles.center}><ActivityIndicator size="large" color={colors.primary} /><Text style={styles.loadText}>Cargando historial...</Text></View>
      ) : orderHistory.length === 0 ? (
        <View style={styles.center}>
          <View style={styles.emptyCircle}><Ionicons name="receipt-outline" size={60} color={colors.secondary} /></View>
          <Text style={styles.emptyTitle}>Sin compras registradas</Text>
          <Text style={styles.emptySub}>Confirma pedidos para verlos aquí ordenados del más reciente al más antiguo.</Text>
          <TouchableOpacity style={styles.shopBtn} onPress={() => router.push('/(tabs)/menu')}>
            <Ionicons name="restaurant-outline" size={20} color="#FFF" />
            <Text style={styles.shopText}>Explorar Menú</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <View style={styles.histHeader}>
            <Text style={styles.histCount}>{orderHistory.length} orden(es) confirmada(s)</Text>
            <TouchableOpacity onPress={handleClearHistory} style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Ionicons name="trash-outline" size={15} color={colors.danger} />
              <Text style={{ fontSize: 13, color: colors.danger, fontWeight: '600' }}>Borrar</Text>
            </TouchableOpacity>
          </View>
          <FlatList data={orderHistory} keyExtractor={(i) => i.id} renderItem={renderOrder}
            contentContainerStyle={{ paddingBottom: 24 }} refreshing={isLoadingHistory} onRefresh={loadOrderHistory} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 30 },
  loadText: { marginTop: 12, fontSize: 14, color: colors.textSecondary },
  emptyCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: colors.secondaryLight, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  emptyTitle: { fontSize: 22, fontWeight: '800', color: colors.textPrimary },
  emptySub: { fontSize: 14, color: colors.textSecondary, textAlign: 'center', marginTop: 8, marginBottom: 24, lineHeight: 20 },
  shopBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.secondary, paddingHorizontal: 24, paddingVertical: 14, borderRadius: 12, gap: 8, elevation: 3 },
  shopText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  histHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 18, paddingVertical: 12 },
  histCount: { fontSize: 14, fontWeight: '700', color: colors.textSecondary, textTransform: 'uppercase' },
  card: { backgroundColor: '#FFF', borderRadius: 16, marginHorizontal: 16, marginVertical: 7, padding: 14, elevation: 2, borderWidth: 1, borderColor: colors.border },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  numBadge: { backgroundColor: colors.primaryLight, paddingHorizontal: 8, paddingVertical: 5, borderRadius: 8, marginRight: 10 },
  numText: { color: colors.primaryDark, fontWeight: '800', fontSize: 13 },
  orderId: { fontSize: 14, fontWeight: '700', color: colors.textPrimary },
  dateText: { fontSize: 12, color: colors.textSecondary },
  orderTotal: { fontSize: 17, fontWeight: '800', color: colors.primary },
  briefRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, paddingTop: 8, borderTopWidth: 1, borderTopColor: '#F3F4F6' },
  briefText: { fontSize: 12, color: colors.textSecondary },
  taxBrief: { fontSize: 12, fontWeight: '600', color: colors.secondary },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 8 },
  prodTitle: { fontSize: 13, fontWeight: '700', color: colors.textPrimary, marginBottom: 6 },
  prodRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 3 },
  prodQty: { fontSize: 12, fontWeight: '700', color: colors.primary, backgroundColor: colors.primaryLight, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  prodName: { fontSize: 13, color: colors.textPrimary, flex: 1 },
  prodSub: { fontSize: 13, fontWeight: '600', color: colors.textPrimary },
  accRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 2 },
  accLabel: { fontSize: 13, color: colors.textSecondary },
  accValue: { fontSize: 13, color: colors.textPrimary },
  accTotalRow: { marginTop: 4, paddingTop: 4, borderTopWidth: 1, borderTopColor: colors.border },
  accTotalLabel: { fontSize: 15, fontWeight: '800', color: colors.textPrimary },
  accTotalValue: { fontSize: 16, fontWeight: '800', color: colors.primary },
});
