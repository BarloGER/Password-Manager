import { Link } from "react-router-dom";
import { Message } from "../../../components/ui/Message";
import { LoadingSpinner } from "../../../components/ui/LoadingSpinner";
import "../assets/auth-forms.css";

export const SignInForm = ({
  email,
  password,
  handleChange,
  handleSubmit,
  successMessage,
  setSuccessMessage,
  errorMessage,
  setErrorMessage,
  loadingAuthRequest,
}) => {
  return (
    <section className="auth-container">
      <h3 className="auth-title">Anmelden</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            className="auth-input"
            id="email"
            type="email"
            placeholder="E-Mail Adresse"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            className="auth-input"
            id="password"
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={handleChange}
          />
        </div>

        <Message
          successMessage={successMessage}
          setSuccessMessage={setSuccessMessage}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />

        <button className="auth-button auth-submit-button" type="submit">
          Anmelden {loadingAuthRequest && <LoadingSpinner />}
        </button>

        <p className="auth-text">Noch nicht registriert?</p>
        <Link to="sign-up">
          <button className="auth-button auth-switch-button">SignUp</button>
        </Link>
      </form>
    </section>
  );
};
