import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '../src/context/AuthContext';
import { colors } from '../src/styles/theme';
import AlertBanner from '../src/components/AlertBanner';

export default function LoginScreen() {
  const { login, availableUsers } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError('');
    const result = login(username, password);
    if (result.success) {
      router.replace('/(tabs)/menu');
    } else {
      setError(result.message);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <Ionicons name="restaurant" size={44} color="#FFF" />
          </View>
          <Text style={styles.title}>Taquería El Mariachi</Text>
          <Text style={styles.subtitle}>Sabor y Tradición Mexicana</Text>
          <View style={styles.badge}><Text style={styles.badgeText}>Segundo Desafío Práctico - DPSCII</Text></View>
        </View>

        <View style={styles.card}>
          <Text style={styles.formTitle}>Iniciar Sesión</Text>
          <Text style={styles.formSub}>Ingrese sus credenciales locales para acceder</Text>

          {error ? <AlertBanner type="error" message={error} onClose={() => setError('')} /> : null}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Usuario</Text>
            <View style={styles.inputBox}>
              <Ionicons name="person-outline" size={20} color={colors.textSecondary} />
              <TextInput style={styles.input} placeholder="Ej. admin" placeholderTextColor="#9CA3AF"
                value={username} onChangeText={(t) => { setUsername(t); setError(''); }} autoCapitalize="none" />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Contraseña</Text>
            <View style={styles.inputBox}>
              <Ionicons name="lock-closed-outline" size={20} color={colors.textSecondary} />
              <TextInput style={styles.input} placeholder="Ingrese contraseña" placeholderTextColor="#9CA3AF"
                value={password} onChangeText={(t) => { setPassword(t); setError(''); }}
                secureTextEntry={!showPass} autoCapitalize="none" />
              <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                <Ionicons name={showPass ? 'eye-off-outline' : 'eye-outline'} size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Ionicons name="log-in-outline" size={22} color="#FFF" />
            <Text style={styles.loginText}>Entrar al Menú</Text>
          </TouchableOpacity>

          <View style={styles.quickSection}>
            <Text style={styles.quickTitle}>Credenciales de prueba:</Text>
            <View style={styles.quickRow}>
              {availableUsers.map((u) => (
                <TouchableOpacity key={u.username} style={styles.quickChip}
                  onPress={() => { setUsername(u.username); setPassword(u.password); setError(''); }}>
                  <Ionicons name="key-outline" size={14} color={colors.primary} />
                  <Text style={styles.quickText}>{u.username} / {u.password}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  scroll: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  header: { alignItems: 'center', marginBottom: 24 },
  iconCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', elevation: 6, marginBottom: 12 },
  title: { fontSize: 26, fontWeight: '800', color: colors.primaryDark, textAlign: 'center' },
  subtitle: { fontSize: 14, color: colors.textSecondary, marginTop: 4 },
  badge: { backgroundColor: colors.secondaryLight, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, marginTop: 10 },
  badgeText: { fontSize: 12, fontWeight: '700', color: colors.secondary },
  card: { backgroundColor: '#FFF', borderRadius: 20, padding: 22, elevation: 4 },
  formTitle: { fontSize: 20, fontWeight: '700', color: colors.textPrimary },
  formSub: { fontSize: 13, color: colors.textSecondary, marginTop: 4, marginBottom: 16 },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', color: colors.textPrimary, marginBottom: 6 },
  inputBox: { flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: colors.border, borderRadius: 12, backgroundColor: '#FAFAFA', paddingHorizontal: 12, gap: 8 },
  input: { flex: 1, paddingVertical: 12, fontSize: 15, color: colors.textPrimary },
  loginBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primary, paddingVertical: 14, borderRadius: 12, marginTop: 8, gap: 8, elevation: 3 },
  loginText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  quickSection: { marginTop: 24, paddingTop: 16, borderTopWidth: 1, borderTopColor: colors.border },
  quickTitle: { fontSize: 12, fontWeight: '600', color: colors.textSecondary, marginBottom: 8, textAlign: 'center' },
  quickRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8 },
  quickChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primaryLight, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, gap: 4 },
  quickText: { fontSize: 12, fontWeight: '700', color: colors.primaryDark },
});
