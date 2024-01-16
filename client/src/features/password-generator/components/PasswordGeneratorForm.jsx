import "../assets/password-generator-form.css";

export const PasswordGeneratorForm = ({
  handleGenerate,
  generatedPassword,
  passwordLength,
  setPasswordLength,
}) => {
  return (
    <section className="password-generator">
      <h3>Passwort Generator</h3>
      <div className="password-length-wrapper">
        <input
          id="password-length"
          type="number"
          value={passwordLength}
          onChange={(e) => setPasswordLength(Number(e.target.value))}
        />
        <button onClick={handleGenerate}>Generieren</button>
      </div>
      <div className="generated-password-wrapper">
        <input type="text" value={generatedPassword} readOnly />
        <button
          onClick={() => navigator.clipboard.writeText(generatedPassword)}
        >
          Kopieren
        </button>
      </div>
    </section>
  );
};
