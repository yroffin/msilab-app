import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { pocketBaseClient } from '../pocketbase/client';
import type { RecordModel } from "pocketbase";

type AuthContextValue = {
  user: RecordModel | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<RecordModel | null>(pocketBaseClient.authStore.record);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Se resynchronise si le token change (autre onglet, refresh auto...)
    const unsubscribe = pocketBaseClient.authStore.onChange((_token, record) => {
      setUser(record);
    });

    setIsLoading(false);
    return unsubscribe;
  }, []);

  async function login(email: string, password: string) {
    await pocketBaseClient.collection("users").authWithPassword(email, password);
    // authStore.onChange met déjà à jour `user` automatiquement
  }

  function logout() {
    pocketBaseClient.authStore.clear();
  }

  async function register(email: string, password: string, name: string) {
    await pocketBaseClient.collection("users").create({
      email,
      password,
      passwordConfirm: password,
      name,
    });
    // Inscription ne connecte pas automatiquement : on enchaîne avec login
    await login(email, password);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth doit être utilisé dans un <AuthProvider>");
  return ctx;
}