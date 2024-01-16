import { useState } from "react";
import { BackupForm } from "./BackupForm";
import api from "../../../lib/apiFacade";

export const Backup = () => {
  const [backupData, setBackupData] = useState("");
  const token = localStorage.getItem("token");

  const handleDownload = async (decrypted = false) => {
    try {
      const data = decrypted
        ? await api.downloadBackupDecrypted(token)
        : await api.downloadBackup(token);
      setBackupData(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Fehler beim Herunterladen des Backups:", error);
      // Hier könntest du eine Benachrichtigung anzeigen
    }
  };

  const handleUpload = async () => {
    try {
      await api.uploadBackup(backupData, token);
      // Hier könntest du eine Benachrichtigung anzeigen, dass das Backup erfolgreich hochgeladen wurde
    } catch (error) {
      console.error("Fehler beim Hochladen des Backups:", error);
      // Hier könntest du eine Benachrichtigung anzeigen
    }
  };

  return (
    <BackupForm
      backupData={backupData}
      onDownload={handleDownload}
      onUpload={handleUpload}
      onBackupDataChange={setBackupData}
    />
  );
};
