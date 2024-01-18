import { useState } from "react";
import { BackupForm } from "./BackupForm";
import api from "../../../lib/apiFacade";

export const Backup = () => {
  const [backupData, setBackupData] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const token = localStorage.getItem("token");

  const handleDownload = async (decrypted = false) => {
    try {
      const data = decrypted
        ? await api.downloadBackupDecrypted(token)
        : await api.downloadBackup(token);
      setBackupData(JSON.stringify(data, null, 2));

      if (data.message) {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleUpload = async () => {
    try {
      const data = await api.uploadBackup(backupData, token);

      if (data.message) {
        setSuccessMessage(data.message);
        setBackupData("");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <BackupForm
      backupData={backupData}
      onDownload={handleDownload}
      onUpload={handleUpload}
      onBackupDataChange={setBackupData}
      successMessage={successMessage}
      setSuccessMessage={setSuccessMessage}
      errorMessage={errorMessage}
      setErrorMessage={setErrorMessage}
    />
  );
};
