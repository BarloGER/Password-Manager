import { Link } from "react-router-dom";

export const SignInForm = ({ email, password, handleChange, handleSubmit }) => {
  return (
    <section>
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <input
              id="email"
              type="email"
              placeholder="E-Mail Adresse"
              value={email}
              onBlur={handleChange}
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              id="password"
              type="password"
              placeholder="Passwort"
              value={password}
              onChange={handleChange}
              onBlur={handleChange}
            />
          </div>
        </div>
        <div>
          <button type="submit">Anmelden</button>
        </div>

        <p>Noch nicht registriert?</p>
        <Link to="sign-up">
          <button>SignUp</button>
        </Link>
      </form>
    </section>
  );
};
