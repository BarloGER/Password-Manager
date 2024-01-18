import { useState } from "react";
import { Navigate } from "react-router-dom";
import { SignInForm } from "../features/authentication";
import api from "../lib/apiFacade";

const SignIn = ({
  setToken,
  isAuthenticated,
  loadingAuthRequest,
  setLoadingAuthRequest,
}) => {
  const [{ email, password }, setFormState] = useState({
    email: "",
    password: "",
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
      const data = await api.loginUser({ email, password });
      setToken(data.token);
      setLoadingAuthRequest(false);
      localStorage.setItem("token", data.token);
    } catch (error) {
      setLoadingAuthRequest(false);
      setErrorMessage(error.message);
    }
  };

  if (loadingAuthRequest) return <h1>Loading</h1>;
  if (isAuthenticated) return <Navigate to="/auth/dashboard" />;

  return (
    <SignInForm
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      successMessage={successMessage}
      setSuccessMessage={setSuccessMessage}
      errorMessage={errorMessage}
      setErrorMessage={setErrorMessage}
    />
  );
};

export default SignIn;
