import { useState } from "react";
import { Navigate } from "react-router-dom";
import { SignInForm } from "../features/authentication";
import { loginUser } from "../features/authentication";

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

  const handleChange = (e) => {
    setFormState((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoadingAuthRequest(true);
      const { data } = await loginUser({ email, password });
      setToken(data.token);
      setLoadingAuthRequest(false);
      localStorage.setItem("token", data.token);
    } catch (error) {
      setLoadingAuthRequest(false);
      console.log(error);
    }
  };

  if (loadingAuthRequest) return <h1>Loading</h1>;
  if (isAuthenticated) return <Navigate to="/auth/dashboard" />;

  return <SignInForm handleChange={handleChange} handleSubmit={handleSubmit} />;
};

export default SignIn;
