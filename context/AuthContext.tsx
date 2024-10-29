"use client";

import { AuthContextType } from "@/@types/types";
import { createContext, useState } from "react";

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);

  const updateToken = (t: string) => {
    setToken(t);
    localStorage.setItem("token", t);
  };

  const deleteToken = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, updateToken, deleteToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
