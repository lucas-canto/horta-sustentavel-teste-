import { AuthContext } from "@/context/auth-context";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedLoggedRoute({ children }: ProtectedRouteProps) {
  const { userId } = useContext(AuthContext);

  // Aguarda até que o userId seja definido (undefined significa ainda carregando)
  if (userId === undefined) {
    return null; // ou algum <Loading /> se quiser mostrar spinner
  }

  if (!userId) {
    // Usuário não logado, redireciona para "/"
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export function ProtectedBaseRoute({ children }: ProtectedRouteProps) {
  const { userId } = useContext(AuthContext);

  if (userId === undefined) {
    return null; // aguardando carregar
  }

  if (!userId) {
    // Usuário não logado, redireciona para "/login"
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}