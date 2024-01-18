import { Link } from "react-router-dom";
import { Message } from "../../../components/ui/Message";
import { LoadingSpinner } from "../../../components/ui/LoadingSpinner";
import "../assets/auth-forms.css";

export const SignUpForm = ({
  handleChange,
  handleSubmit,
  username,
  email,
  password,
  confirm_password,
  successMessage,
  setSuccessMessage,
  errorMessage,
  setErrorMessage,
  loadingAuthRequest,
}) => {
  return (
    <section className="auth-container">
      <h1 className="auth-title">Registrieren</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            className="auth-input"
            id="username"
            type="text"
            placeholder="Benutzername"
            value={username}
            onChange={handleChange}
          />
        </div>
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
        <div>
          <input
            className="auth-input"
            id="confirm_password"
            type="password"
            placeholder="Passwort wiederholen"
            value={confirm_password}
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
          Registrieren {loadingAuthRequest && <LoadingSpinner />}
        </button>

        <p className="auth-text">Bereits registriert?</p>

        <Link to="/">
          <button className="auth-button auth-switch-button">SignIn</button>
        </Link>
      </form>
    </section>
  );
};
