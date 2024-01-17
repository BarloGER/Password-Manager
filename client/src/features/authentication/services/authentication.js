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
        const data = await api.getUser(token);
        setUser(data);
        setIsAuthenticated(true);
      } catch (error) {
        console.log("Auth-Fehler:", error);
        const errorStatus =
          error.status || (error.response && error.response.status);
        if (errorStatus === 401 || errorStatus === 403) {
          localStorage.removeItem("token");
          setToken(null);
        }
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
