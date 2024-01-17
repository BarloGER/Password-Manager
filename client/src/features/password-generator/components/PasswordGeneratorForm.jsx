import "../assets/password-generator-form.css";

export const PasswordGeneratorForm = ({
  handleGenerate,
  generatedPassword,
  passwordLength,
  setPasswordLength,
  includeNumbers,
  setIncludeNumbers,
  includeLowercase,
  setIncludeLowercase,
  includeUppercase,
  setIncludeUppercase,
  includeSymbols,
  setIncludeSymbols,
}) => {
  return (
    <section className="password-generator">
      <h3>Passwort Generator</h3>
      <div className="options-wrapper">
        <div className="password-option">
          <label htmlFor="password-length">Passwortlänge:</label>
          <input
            id="password-length"
            type="number"
            value={passwordLength}
            onChange={(e) => setPasswordLength(Number(e.target.value))}
          />
        </div>
        <div className="checkbox-wrapper">
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
              />{" "}
              Zahlen
            </label>
            <label>
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
              />{" "}
              Kleinbuchstaben
            </label>
          </div>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
              />{" "}
              Großbuchstaben
            </label>
            <label>
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
              />{" "}
              Symbole
            </label>
          </div>
        </div>
        <button className="generate-button" onClick={handleGenerate}>
          Generieren
        </button>
      </div>
      <div className="generated-password-wrapper">
        <input type="text" value={generatedPassword} readOnly />
        <button
          className="copy-button"
          onClick={() => navigator.clipboard.writeText(generatedPassword)}
        >
          Kopieren
        </button>
      </div>
    </section>
  );
};
