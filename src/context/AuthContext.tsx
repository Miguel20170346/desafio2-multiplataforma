import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Usuario, ResultadoOperacion } from '../types';

const CREDENCIALES: Usuario[] = [
  { username: 'admin', password: '123', name: 'Administrador' },
  { username: 'cliente', password: '123', name: 'Cliente Frecuente' },
  { username: 'udb', password: '2026', name: 'Estudiante UDB' },
];

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: { username: string; name: string } | null;
  login: (username: string, password: string) => ResultadoOperacion;
  logout: () => void;
  availableUsers: Usuario[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<{ username: string; name: string } | null>(null);

  const login = (username: string, password: string): ResultadoOperacion => {
    const cleanUser = (username || '').trim();
    const cleanPass = (password || '').trim();

    if (!cleanUser || !cleanPass) {
      return { success: false, message: 'Todos los campos son obligatorios.' };
    }

    const found = CREDENCIALES.find(
      (c) => c.username.toLowerCase() === cleanUser.toLowerCase() && c.password === cleanPass
    );

    if (found) {
      setCurrentUser({ username: found.username, name: found.name });
      return { success: true, message: 'Bienvenido' };
    }
    return { success: false, message: 'Credenciales inválidas. Verifique usuario y contraseña.' };
  };

  const logout = () => setCurrentUser(null);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!currentUser, currentUser, login, logout, availableUsers: CREDENCIALES }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return context;
};
