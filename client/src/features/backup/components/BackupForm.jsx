import { Message } from "../../../components/ui/Message";
import { LoadingSpinner } from "../../../components/ui/LoadingSpinner";
import "../assets/backup-form.css";

export const BackupForm = ({
  backupData,
  onDownload,
  onUpload,
  onBackupDataChange,
  successMessage,
  setSuccessMessage,
  errorMessage,
  setErrorMessage,
  isDownloading,
  isDownloadingDecrypted,
  isUploading,
}) => {
  return (
    <section className="backup">
      <h2>Backup-Verwaltung</h2>
      <textarea
        className="backup-textarea"
        value={backupData}
        onChange={(e) => onBackupDataChange(e.target.value)}
        placeholder="Backup-Daten werden hier angezeigt..."
        rows="10"
      />
      <Message
        successMessage={successMessage}
        setSuccessMessage={setSuccessMessage}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />

      <div className="backup-actions">
        <button
          onClick={() => {
            navigator.clipboard
              .writeText(backupData)
              .then(() => {
                setSuccessMessage("Kopiert");
              })
              .catch((err) => {
                setErrorMessage(err);
              });
          }}
        >
          Kopieren
        </button>
        <button onClick={() => onDownload(false)}>
          Backup herunterladen {isDownloading && <LoadingSpinner />}
        </button>
        <button onClick={() => onDownload(true)}>
          Backup entschlüsselt herunterladen{" "}
          {isDownloadingDecrypted && <LoadingSpinner />}
        </button>
        <button onClick={() => onUpload(false)}>
          Backup hochladen {isUploading && <LoadingSpinner />}
        </button>
      </div>
    </section>
  );
};
