import { useState } from "react";
import { Navigate } from "react-router-dom";
import { registerUser } from "../features/authentication";
import { SignUpForm } from "../features/authentication";

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
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormState((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    setError("");
    try {
      e.preventDefault();
      setLoadingAuthRequest(true);

      if (password !== confirm_password) {
        setError("Passwörter stimmen nicht überein.");
        setLoadingAuthRequest(false);
        return;
      }

      const { data } = await registerUser({
        username,
        email,
        password,
      });

      setToken(data.token);
      setIsAuthenticated(true);
      setLoadingAuthRequest(false);
      localStorage.setItem("token", data.token);
    } catch (error) {
      console.log(error);
      setLoadingAuthRequest(false);
    }
  };

  if (loadingAuthRequest) return <h1>Loading</h1>;
  if (isAuthenticated) return <Navigate to="/auth/dashboard" />;

  return (
    <SignUpForm
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      error={error}
    />
  );
};

export default SignUp;
