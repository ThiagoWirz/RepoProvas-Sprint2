import { createContext, useState } from "react";

interface IAuthContext {
  token: string | null;
  signIn: (token: string) => void;
  signOut: () => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);

interface Props {
  children: React.ReactNode;
}

const LOCAL_STORAGE_KEY = "repoprovas-token";
const persistedToken = localStorage.getItem(LOCAL_STORAGE_KEY);

export function AuthProvider({ children }: Props) {
  const [token, setToken] = useState<string | null>(persistedToken);

  function signIn(token: string) {
    setToken(token);
    localStorage.setItem(LOCAL_STORAGE_KEY, token);
  }

  function signOut() {
    setToken(null);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }

  return (
    <AuthContext.Provider value={{ token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
