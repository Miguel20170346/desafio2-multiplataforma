import React from 'react';
import { Stack } from 'expo-router';
import { AuthProvider, useAuth } from '../src/context/AuthContext';
import { OrderProvider } from '../src/context/OrderContext';

function RootLayoutNav() {
  const { isAuthenticated } = useAuth();

  return (
    <OrderProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="index" />
        ) : (
          <Stack.Screen name="(tabs)" />
        )}
      </Stack>
    </OrderProvider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
