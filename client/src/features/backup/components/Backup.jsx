import { useState } from "react";
import { BackupForm } from "./BackupForm";
import api from "../../../lib/apiFacade";

export const Backup = () => {
  const [backupData, setBackupData] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloadingDecrypted, setIsDownloadingDecrypted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const token = localStorage.getItem("token");

  const handleDownload = async (decrypted = false) => {
    try {
      if (decrypted) {
        setIsDownloadingDecrypted(true);
      } else {
        setIsDownloading(true);
      }

      const data = decrypted
        ? await api.downloadBackupDecrypted(token)
        : await api.downloadBackup(token);
      setBackupData(JSON.stringify(data, null, 2));

      if (data.message) {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsDownloadingDecrypted(false);
      setIsDownloading(false);
    }
  };

  const handleUpload = async () => {
    try {
      setIsUploading(true);
      const data = await api.uploadBackup(backupData, token);

      if (data.message) {
        setSuccessMessage(data.message);
        setBackupData("");
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsUploading(false);
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
      isDownloading={isDownloading}
      isDownloadingDecrypted={isDownloadingDecrypted}
      isUploading={isUploading}
    />
  );
};
