import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { apiFetch } from "../shared/api";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("@MSilvaPizza:isAuthenticated") === "true";
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await apiFetch("user/me");

        if (response.ok) {
          setIsAuthenticated(true);
          localStorage.setItem("@MSilvaPizza:isAuthenticated", "true");
        } else {
          setIsAuthenticated(false);
          localStorage.removeItem("@MSilvaPizza:isAuthenticated");
        }
      } catch {
        setIsAuthenticated(false);
        localStorage.removeItem("@MSilvaPizza:isAuthenticated");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = () => {
    localStorage.setItem("@MSilvaPizza:isAuthenticated", "true");
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      await apiFetch("user/logout", { method: "POST" });
    } catch (err) {
      console.error("Erro ao fazer logout", err);
    }
    localStorage.removeItem("@MSilvaPizza:isAuthenticated");
    setIsAuthenticated(false);
  };

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
