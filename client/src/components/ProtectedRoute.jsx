import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    if (userRole === "admin") {
      return <Navigate to="/admin-dashboard" replace />;
    }
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute; 