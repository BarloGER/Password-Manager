import { SecurityCheckStatusCircle } from "./SecurityCheckStatusCircle";

export const SecurityCheckInfoForm = ({
  securityData,
  calculatedSecurityStatus,
}) => {
  console.log(securityData);
  return (
    <section className="dashboard">
      {securityData ? (
        <div className="security-info">
          <h2>Sicherheitsinfos</h2>
          <p>Anzahl Accounts: {securityData.accountsTotal}</p>
          <p>Anzahl sicherer Passwörter: {securityData.securePasswords}</p>
          <p>Anzahl unsicherer Passwörter: {securityData.insecurePasswords}</p>
          <p>Anzahl doppelter Passwörter: {securityData.duplicatePasswords}</p>
          <p>Sicherheitsstatus: {calculatedSecurityStatus}%</p>
          <SecurityCheckStatusCircle
            securityStatus={calculatedSecurityStatus}
          />
        </div>
      ) : (
        <div className="security-info">
          <h2>Sicherheitsinfos</h2>
          <p>Anzahl Accounts: Noch keine Accounts angelegt</p>
          <p>Anzahl sicherer Passwörter: Noch keine Accounts angelegt</p>
          <p>Anzahl unsicherer Passwörter: Noch keine Accounts angelegt</p>
          <p>Anzahl doppelter Passwörter: Noch keine Accounts angelegt</p>
          <p>Sicherheitsstatus: Noch keine Accounts angelegt</p>
          <SecurityCheckStatusCircle securityStatus={0} />
        </div>
      )}
    </section>
  );
};
