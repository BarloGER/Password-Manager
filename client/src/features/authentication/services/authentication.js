import { useState, useEffect } from "react";
import api from "../../../lib/apiFacade";

export const useAuth = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loadingAuthRequest, setLoadingAuthRequest] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const validateToken = async () => {
      try {
        setLoadingAuthRequest(true);
        const { data, error } = await api.getUser(token);
        if (error) throw error;
        setUser(data);
        setIsAuthenticated(true);
      } catch (error) {
        if (error.status === 401 || error.status === 403) {
          localStorage.removeItem("token");
          console.log("auth error");
          setToken(null);
        }
        console.log(error);
      } finally {
        setLoadingAuthRequest(false);
      }
    };
    token && validateToken();
  }, [token]);

  return {
    token,
    setToken,
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser,
    loadingAuthRequest,
    setLoadingAuthRequest,
  };
};
