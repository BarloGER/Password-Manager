import { apiFetch } from "../../../lib/fetch";

export const downloadBackup = async (token) => {
  return apiFetch(`/auth/me/backup`, { method: "GET" }, token);
};

export const downloadBackupDecrypted = async (token) => {
  return apiFetch(`/auth/me/backup/decrypted`, { method: "GET" }, token);
};

export const uploadBackup = async (backupData, token) => {
  return apiFetch(
    `/auth/me/backup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ backup: backupData }),
    },
    token
  );
};
