import { apiFetch } from "../../../lib/fetch";

export const downloadBackup = async (token) => {
  try {
    const response = await apiFetch(
      `/auth/me/backup`,
      { method: "GET" },
      token
    );

    if (response.error) {
      throw new Error(
        response.error.message || "Es ist ein unbekannter Fehler aufgetreten."
      );
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const downloadBackupDecrypted = async (token) => {
  try {
    const response = await apiFetch(
      `/auth/me/backup/decrypted`,
      { method: "GET" },
      token
    );

    if (response.error) {
      throw new Error(
        response.error.message || "Es ist ein unbekannter Fehler aufgetreten."
      );
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadBackup = async (backupData, token) => {
  try {
    const response = await apiFetch(
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

    if (response.error) {
      throw new Error(
        response.error.message || "Es ist ein unbekannter Fehler aufgetreten."
      );
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};
