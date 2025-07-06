"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type User = {
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      login(token);

    }
    checkAuth();
  }, []);

  const login = async (token: string) => {
    localStorage.setItem("token", token);
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/auth/me/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Invalid token");
      const data = await res.json();
      const userRes = await fetch(`http://localhost:8080/users/${data.userID}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!userRes.ok) throw new Error("User fetch failed");
      const userData = await userRes.json();
      setUser({
        name: userData.name,
        email: userData.email,
      });
    } catch {
      setUser(null);
      localStorage.removeItem("token");
    }
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}