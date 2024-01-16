export const calculateSecurityStatus = (data) => {
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
