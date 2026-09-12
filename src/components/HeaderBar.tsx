import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/theme';
import { useAuth } from '../context/AuthContext';

export default function HeaderBar({ title, subtitle }: { title: string; subtitle?: string }) {
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert('Cerrar Sesión', '¿Desea salir del sistema?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Cerrar Sesión', style: 'destructive', onPress: logout },
    ]);
  };

  return (
    <View style={styles.header}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      {currentUser && (
        <View style={styles.userSection}>
          <View style={styles.userBadge}>
            <Ionicons name="person-circle" size={18} color={colors.primary} />
            <Text style={styles.userName}>{currentUser.username}</Text>
          </View>
          <TouchableOpacity onPress={handleLogout} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Ionicons name="log-out-outline" size={22} color={colors.danger} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: { backgroundColor: '#FFF', paddingHorizontal: 16, paddingTop: 12, paddingBottom: 14, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: colors.border },
  title: { fontSize: 20, fontWeight: '800', color: colors.primary },
  subtitle: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  userSection: { flexDirection: 'row', alignItems: 'center', marginLeft: 8, gap: 8 },
  userBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primaryLight, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 14, gap: 4 },
  userName: { fontSize: 12, fontWeight: '700', color: colors.primaryDark },
});
