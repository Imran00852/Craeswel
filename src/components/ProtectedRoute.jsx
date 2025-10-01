import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children, redirect = "/login", admin }) => {
  if (!admin) {
    return <Navigate to={redirect} />;
  }
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
