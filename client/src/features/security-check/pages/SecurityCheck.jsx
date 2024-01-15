import { useState, useEffect } from "react";
import api from "../../../lib/apiFacade";

import { SecurityCheckInfoForm } from "../components/SecurityCheckInfoForm";
import { SecurityCheckPasswordsForm } from "../components/SecurityCheckPasswordsForm";

export const SecurityCheck = () => {
  const [securityData, setSecurityData] = useState(null);
  const token = localStorage.getItem("token");

  const fetchSecurityData = async () => {
    const res = await api.getSecurityData(token);
    if (res && res.data) {
      const data = res.data;
      setSecurityData(data);
    }
  };

  useEffect(() => {
    fetchSecurityData();
  }, []);

  const calculateSecurityStatus = (data) => {
    const {
      accountsTotal,
      securePasswords,
      insecurePasswords,
      duplicatePasswords,
    } = data;

    if (accountsTotal === 0) {
      return 0;
    }

    const secureScore = (securePasswords / accountsTotal) * 100;
    const insecurePenalty = (insecurePasswords / accountsTotal) * 50;
    const duplicatePenalty = (duplicatePasswords / accountsTotal) * 25;

    let securityStatus = secureScore - insecurePenalty - duplicatePenalty;

    securityStatus = Math.max(0, securityStatus);
    securityStatus = Math.min(100, securityStatus);

    return Math.round(securityStatus);
  };

  const calculatedSecurityStatus = securityData
    ? calculateSecurityStatus(securityData)
    : 0;

  return (
    <>
      <SecurityCheckInfoForm
        securityData={securityData}
        calculatedSecurityStatus={calculatedSecurityStatus}
      />
      <SecurityCheckPasswordsForm securityData={securityData} />
    </>
  );
};
