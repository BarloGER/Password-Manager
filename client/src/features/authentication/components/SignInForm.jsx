import { Link } from "react-router-dom";
import "../assets/auth-forms.css";

export const SignInForm = ({ email, password, handleChange, handleSubmit }) => {
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

        <button className="auth-button auth-submit-button" type="submit">
          Anmelden
        </button>

        <p className="auth-text">Noch nicht registriert?</p>
        <Link to="sign-up">
          <button className="auth-button auth-switch-button">SignUp</button>
        </Link>
      </form>
    </section>
  );
};
