import { useState, useEffect } from "react";
import {
  SecurityCheckInfoForm,
  SecurityCheckPasswordsForm,
  calculateSecurityStatus,
} from "../features/security-check";
import { PasswordGenerator } from "../features/password-generator";
import { Backup } from "../features/backup";
import api from "../lib/apiFacade";
import "../assets/dashboard.css";

const Dashboard = () => {
  const [securityData, setSecurityData] = useState(null);
  const token = localStorage.getItem("token");

  const fetchSecurityData = async () => {
    const response = await api.getSecurityData(token);
    if (response) {
      const data = response;
      setSecurityData(data);
    }
  };

  useEffect(() => {
    fetchSecurityData();
  }, []);

  const calculatedSecurityStatus = securityData
    ? calculateSecurityStatus(securityData)
    : 0;

  return (
    <section>
      <div className="dashboard">
        <SecurityCheckInfoForm
          className="security-info-form"
          securityData={securityData}
          calculatedSecurityStatus={calculatedSecurityStatus}
        />
        <SecurityCheckPasswordsForm
          className="security-passwords-form"
          securityData={securityData}
        />
        <PasswordGenerator className="password-generator" />
        <Backup className="backup" />
      </div>
    </section>
  );
};

export default Dashboard;
