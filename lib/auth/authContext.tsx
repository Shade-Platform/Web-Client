"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { verifyToken } from "./verifyToken";

type User = {
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await fetch("http://localhost:8080/auth/me/", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.ok) {
            const data = await res.json();
            const user = await fetch(`http://localhost:8080/users/${data.userID}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            if (user.ok) {
              const userData = await user.json();
              setUser({
                name: userData.name,
                email: userData.email,
              });
            } else {
              setUser(null);
            }
          } else {
            setUser(null);
          }
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    }
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}