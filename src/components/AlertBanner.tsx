import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/theme';

interface AlertBannerProps {
  type?: 'error' | 'warning' | 'success' | 'info';
  message: string;
  onClose?: () => void;
}

export default function AlertBanner({ type = 'error', message, onClose }: AlertBannerProps) {
  if (!message) return null;

  const config = {
    error:   { bg: '#FEE2E2', text: '#991B1B', icon: 'alert-circle' as const, iconColor: colors.danger },
    warning: { bg: '#FEF3C7', text: '#92400E', icon: 'warning' as const, iconColor: colors.warning },
    success: { bg: '#D1FAE5', text: '#065F46', icon: 'checkmark-circle' as const, iconColor: colors.success },
    info:    { bg: '#DBEAFE', text: '#1E40AF', icon: 'information-circle' as const, iconColor: '#2563EB' },
  };
  const c = config[type];

  return (
    <View style={[styles.container, { backgroundColor: c.bg }]}>
      <Ionicons name={c.icon} size={22} color={c.iconColor} style={styles.icon} />
      <Text style={[styles.message, { color: c.text }]}>{message}</Text>
      {onClose && (
        <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name="close" size={18} color={c.text} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 12, borderRadius: 10, marginVertical: 8, marginHorizontal: 16, elevation: 2 },
  icon: { marginRight: 10 },
  message: { flex: 1, fontSize: 14, fontWeight: '500', lineHeight: 18 },
});
