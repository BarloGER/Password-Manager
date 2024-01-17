import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const ProtectedRoutes = ({ isAuthenticated, loadingAuthRequest }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!loadingAuthRequest && !isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? <Outlet /> : <h1>Loading...</h1>;
};

export default ProtectedRoutes;
