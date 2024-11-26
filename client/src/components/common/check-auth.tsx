import { Navigate, useLocation } from "react-router-dom";

type RoleCheckProps = {
  isAuthenticated: boolean;
  user: { role: string } | null;
  children: React.ReactNode;
};

export const AdminAuth = ({ isAuthenticated, user, children }: RoleCheckProps) => {
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/unauth-page" replace />;
  }

  return <>{children}</>;
};

export const UserAuth = ({ isAuthenticated, user, children }: RoleCheckProps) => {
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (isAuthenticated && (location.pathname.includes("/login") || location.pathname.includes("/register"))) {
    return <Navigate to="/shop/home" replace />;
  }

  return <>{children}</>;
};
