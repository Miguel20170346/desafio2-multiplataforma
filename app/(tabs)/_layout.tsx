import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../src/styles/theme';
import { useOrder } from '../../src/context/OrderContext';

export default function TabsLayout() {
  const { totalItemsCount } = useOrder();

  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.textSecondary,
      tabBarStyle: { backgroundColor: '#FFF', borderTopColor: colors.border, height: 60, paddingBottom: 8, paddingTop: 6 },
      tabBarLabelStyle: { fontSize: 12, fontWeight: '700' },
    }}>
      <Tabs.Screen name="menu" options={{
        tabBarLabel: 'Catálogo',
        tabBarIcon: ({ color, size, focused }) => <Ionicons name={focused ? 'restaurant' : 'restaurant-outline'} size={size} color={color} />,
      }} />
      <Tabs.Screen name="orden" options={{
        tabBarLabel: 'Mi Orden',
        tabBarBadge: totalItemsCount > 0 ? totalItemsCount : undefined,
        tabBarBadgeStyle: { backgroundColor: colors.primary, color: '#FFF', fontSize: 11, fontWeight: '800' },
        tabBarIcon: ({ color, size, focused }) => <Ionicons name={focused ? 'cart' : 'cart-outline'} size={size} color={color} />,
      }} />
      <Tabs.Screen name="historial" options={{
        tabBarLabel: 'Historial',
        tabBarIcon: ({ color, size, focused }) => <Ionicons name={focused ? 'receipt' : 'receipt-outline'} size={size} color={color} />,
      }} />
    </Tabs>
  );
}
