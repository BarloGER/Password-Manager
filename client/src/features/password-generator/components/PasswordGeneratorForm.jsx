export const PasswordGeneratorForm = ({
  handleGenerate,
  generatedPassword,
  passwordLength,
  setPasswordLength,
}) => {
  return (
    <section className="password-generator">
      <label htmlFor="password-length">Länge</label>
      <input
        id="password-length"
        type="number"
        value={passwordLength}
        onChange={(e) => setPasswordLength(Number(e.target.value))}
      />
      <button onClick={handleGenerate}>Generieren</button>
      <input type="text" value={generatedPassword} readOnly />
      <button onClick={() => navigator.clipboard.writeText(generatedPassword)}>
        Kopieren
      </button>
    </section>
  );
};
