import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authstore"; // Importar Zustand

const PrivateRoute = () => {
  const { user } = useAuthStore(); // Obtener el usuario autenticado

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;