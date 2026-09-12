import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { menuData, getProductsByCategory } from '../../src/data/menuData';
import { useOrder } from '../../src/context/OrderContext';
import { Producto } from '../../src/types';
import ProductCard from '../../src/components/ProductCard';
import AlertBanner from '../../src/components/AlertBanner';
import HeaderBar from '../../src/components/HeaderBar';
import { colors } from '../../src/styles/theme';

export default function MenuScreen() {
  const { addToOrder, totalItemsCount, subtotal } = useOrder();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [banner, setBanner] = useState<{ type: 'error' | 'success' | 'warning'; message: string } | null>(null);

  const handleAdd = (product: Producto, quantity: number) => {
    const result = addToOrder(product, quantity);
    setBanner({ type: result.success ? 'success' : 'error', message: result.message });
  };

  const filtered = getProductsByCategory(selectedCategory).filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = [
    { key: 'todos', label: 'Todos (15)' },
    { key: 'alimentos', label: '🌮 Alimentos (10)' },
    { key: 'bebidas', label: '🥤 Bebidas (5)' },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <HeaderBar title="Taquería El Mariachi" subtitle="Catálogo de Alimentos y Bebidas" />
      {banner && <AlertBanner type={banner.type} message={banner.message} onClose={() => setBanner(null)} />}

      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} color={colors.textSecondary} />
        <TextInput style={styles.searchInput} placeholder="Buscar platillo o bebida..." placeholderTextColor="#9CA3AF"
          value={searchQuery} onChangeText={setSearchQuery} />
        {searchQuery ? <TouchableOpacity onPress={() => setSearchQuery('')}><Ionicons name="close-circle" size={18} color={colors.textSecondary} /></TouchableOpacity> : null}
      </View>

      <View style={styles.tabs}>
        {categories.map((c) => (
          <TouchableOpacity key={c.key} style={[styles.tab, selectedCategory === c.key && styles.activeTab]}
            onPress={() => setSelectedCategory(c.key)}>
            <Text style={[styles.tabText, selectedCategory === c.key && styles.activeTabText]}>{c.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList data={filtered} keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard product={item} onAdd={handleAdd} onValidationError={(msg) => setBanner({ type: 'warning', message: msg })} />}
        contentContainerStyle={{ paddingBottom: 90 }}
        ListEmptyComponent={<View style={styles.empty}><Ionicons name="fast-food-outline" size={48} color={colors.textSecondary} /><Text style={styles.emptyText}>Sin resultados.</Text></View>}
      />

      {totalItemsCount > 0 && (
        <View style={styles.floatingBar}>
          <View style={{ flex: 1 }}>
            <Text style={styles.floatingCount}>{totalItemsCount} producto(s) en la orden</Text>
            <Text style={styles.floatingSub}>Subtotal: ${subtotal.toFixed(2)}</Text>
          </View>
          <TouchableOpacity style={styles.floatingBtn} onPress={() => router.push('/(tabs)/orden')}>
            <Text style={styles.floatingBtnText}>Ver Orden</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFF" />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', marginHorizontal: 16, marginTop: 10, marginBottom: 8, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12, borderWidth: 1, borderColor: colors.border, gap: 8 },
  searchInput: { flex: 1, fontSize: 14, color: colors.textPrimary },
  tabs: { flexDirection: 'row', marginHorizontal: 16, marginBottom: 8, backgroundColor: '#E5E7EB', borderRadius: 12, padding: 4 },
  tab: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 10 },
  activeTab: { backgroundColor: '#FFF', elevation: 2 },
  tabText: { fontSize: 13, fontWeight: '600', color: colors.textSecondary },
  activeTabText: { color: colors.primary, fontWeight: '700' },
  empty: { alignItems: 'center', paddingVertical: 40 },
  emptyText: { marginTop: 10, fontSize: 14, color: colors.textSecondary },
  floatingBar: { position: 'absolute', bottom: 12, left: 16, right: 16, backgroundColor: colors.primaryDark, borderRadius: 16, paddingVertical: 12, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', elevation: 6 },
  floatingCount: { color: '#FFF', fontSize: 12, opacity: 0.9 },
  floatingSub: { color: '#FFF', fontSize: 16, fontWeight: '800' },
  floatingBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.secondary, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10, gap: 6 },
  floatingBtnText: { color: '#FFF', fontSize: 14, fontWeight: '700' },
});
