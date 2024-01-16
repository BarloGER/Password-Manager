import "../assets/security-check.css";

export const SecurityCheckPasswordsForm = ({ securityData }) => {
  if (
    !securityData ||
    !securityData.insecurePWArr ||
    !securityData.duplicatePWArr
  ) {
    return (
      <section>
        <p>Keine Daten vorhanden.</p>
      </section>
    );
  }

  return (
    <section className="security-check-password-container border">
      <div className="insecure-passwords">
        <h2>Unsichere Passwörter</h2>
        <ul>
          {securityData.insecurePWArr.map((accountName, index) => (
            <li key={index}>{accountName}</li>
          ))}
        </ul>
      </div>
      <div className="duplicate-passwords">
        <h2>Doppelte Passwörter</h2>
        <ul>
          {securityData.duplicatePWArr.map((accountName, index) => (
            <li key={index}>{accountName}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};
