import { useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { apiFetch } from "../shared/api";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, logout } = useAuth();
  const [isValidating, setIsValidating] = useState(true);
  const [isSessionValid, setIsSessionValid] = useState(false);

  useEffect(() => {
    const verifySession = async () => {
      if (!isAuthenticated) {
        setIsValidating(false);
        return;
      }

      try {
        const response = await apiFetch("user/me");

        if (response.ok) {
          setIsSessionValid(true);
        } else {
          logout();
          setIsSessionValid(false);
        }
      } catch {
        logout();
        setIsSessionValid(false);
      } finally {
        setIsValidating(false);
      }
    };

    verifySession();
  }, [isAuthenticated, logout]);

  if (isValidating) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <p className="text-gray-500 font-bold">Verificando autenticação...</p>
      </div>
    );
  }

  if (!isAuthenticated || !isSessionValid) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
