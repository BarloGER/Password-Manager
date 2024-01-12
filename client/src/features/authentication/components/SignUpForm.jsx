import { Link } from "react-router-dom";

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
    <section>
      <h1>Registrieren</h1>

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <input
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleChange}
          />
        </div>

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
            type="text"
            placeholder="Passwort"
            value={password}
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            id="confirm_password"
            type="text"
            placeholder="Passwort wiederholen"
            value={confirm_password}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Registrieren</button>

        <p>Bereits registriert?</p>

        <Link to="/">
          <button>SignIn</button>
        </Link>
      </form>
    </section>
  );
};
