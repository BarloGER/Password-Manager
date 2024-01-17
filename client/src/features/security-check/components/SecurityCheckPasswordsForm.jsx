export const SecurityCheckPasswordsForm = ({ securityData }) => {
  if (!securityData) {
    console.log("wait");
    return <p>Laden...</p>;
  }
  return (
    <section className="security-check-password-container">
      <div className="insecure-passwords">
        <h2>Unsichere Passwörter</h2>
        {securityData.insecurePWArr.length > 0 ? (
          <ul>
            {securityData.insecurePWArr.map((accountName, index) => (
              <li key={index}>{accountName}</li>
            ))}
          </ul>
        ) : (
          <p>Keine unsicheren Passwörter gefunden. Gut gemacht!</p>
        )}
      </div>
      <div className="duplicate-passwords">
        <h2>Doppelte Passwörter</h2>
        {securityData.duplicatePWArr.length > 0 ? (
          <ul>
            {securityData.duplicatePWArr.map((accountName, index) => (
              <li key={index}>{accountName}</li>
            ))}
          </ul>
        ) : (
          <p>Keine doppelten Passwörter gefunden. Super!</p>
        )}
      </div>
    </section>
  );
};
