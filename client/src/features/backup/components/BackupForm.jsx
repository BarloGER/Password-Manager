import "../assets/backup-form.css";

export const BackupForm = ({
  backupData,
  onDownload,
  onUpload,
  onBackupDataChange,
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

      <div className="backup-actions">
        <button onClick={() => navigator.clipboard.writeText(backupData)}>
          Kopieren
        </button>
        <button onClick={() => onDownload(false)}>Backup herunterladen</button>
        <button onClick={() => onDownload(true)}>
          Backup entschlüsselt herunterladen
        </button>
        <button onClick={() => onUpload(false)}>Backup hochladen</button>
      </div>
    </section>
  );
};
