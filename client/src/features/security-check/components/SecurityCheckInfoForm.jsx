import { SecurityCheckStatusCircle } from "./SecurityCheckStatusCircle";
import "../assets/security-check.css";

export const SecurityCheckInfoForm = ({
  securityData,
  calculatedSecurityStatus,
}) => {
  return (
    <section className="security-check-info-container">
      {securityData ? (
        <div className="security-info">
          <h2>Sicherheitsinfos</h2>
          <div className="security-info-wrapper">
            <p>Anzahl Accounts: {securityData.accountsTotal}</p>
            <p>Anzahl sicherer Passwörter: {securityData.securePasswords}</p>
            <p>
              Anzahl unsicherer Passwörter: {securityData.insecurePasswords}
            </p>
            <p>
              Anzahl doppelter Passwörter: {securityData.duplicatePasswords}
            </p>
            <p>Sicherheitsstatus: {calculatedSecurityStatus}%</p>
          </div>
          <SecurityCheckStatusCircle
            securityStatus={calculatedSecurityStatus}
          />
        </div>
      ) : (
        <div className="security-info">
          <h2>Sicherheitsinfos</h2>
          <div className="security-info-wrapper">
            <p>Anzahl Accounts: 0</p>
            <p>Anzahl sicherer 0</p>
            <p>Anzahl unsicherer 0</p>
            <p>Anzahl doppelter 0</p>
            <p>Sicherheitsstatus: 0</p>
            <p>Noch keine Accounts angelegt</p>
          </div>
          <SecurityCheckStatusCircle securityStatus={0} />
        </div>
      )}
    </section>
  );
};
