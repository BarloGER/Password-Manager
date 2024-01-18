import { useState } from "react";
import { Navigate } from "react-router-dom";
import { SignUpForm } from "../features/authentication";
import api from "../lib/apiFacade";

const SignUp = ({
  isAuthenticated,
  setToken,
  setIsAuthenticated,
  loadingAuthRequest,
  setLoadingAuthRequest,
}) => {
  const [{ username, email, password, confirm_password }, setFormState] =
    useState({
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormState((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoadingAuthRequest(true);

      if (password !== confirm_password) {
        setErrorMessage("Passwörter stimmen nicht überein.");
        setLoadingAuthRequest(false);
        return;
      }

      const data = await api.registerUser({
        username,
        email,
        password,
      });

      setToken(data.token);
      setIsAuthenticated(true);
      setLoadingAuthRequest(false);
      localStorage.setItem("token", data.token);
    } catch (error) {
      setErrorMessage(error.message);
      setLoadingAuthRequest(false);
    }
  };

  if (isAuthenticated) return <Navigate to="/auth/dashboard" />;

  return (
    <SignUpForm
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      successMessage={successMessage}
      setSuccessMessage={setSuccessMessage}
      errorMessage={errorMessage}
      setErrorMessage={setErrorMessage}
      loadingAuthRequest={loadingAuthRequest}
    />
  );
};

export default SignUp;
