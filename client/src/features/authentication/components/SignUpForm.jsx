import { Link } from "react-router-dom";
import "../assets/auth-forms.css"; // Stelle sicher, dass der Pfad korrekt ist

export const SignUpForm = ({
  handleChange,
  handleSubmit,
  error,
  username,
  email,
  password,
  confirm_password,
}) => {
  return (
    <section className="auth-container">
      <h1 className="auth-title">Registrieren</h1>
      {error && <p className="auth-error">{error}</p>}{" "}
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
        <button className="auth-button auth-submit-button" type="submit">
          Registrieren
        </button>
        <p className="auth-text">Bereits registriert?</p>
        <Link to="/">
          <button className="auth-button auth-switch-button">SignIn</button>
        </Link>
      </form>
    </section>
  );
};
