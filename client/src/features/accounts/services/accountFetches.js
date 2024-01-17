import { apiFetch } from "../../../lib/fetch";

// Funktionen für Account-Interaktionen
export const getAccounts = async (token) => {
  try {
    const response = await apiFetch(
      `/auth/me/accounts`,
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

export const addAccountToUser = async (account, token) => {
  try {
    const response = await apiFetch(
      `/auth/me/accounts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ account }),
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

export const editAccount = async (accountId, updatedAccount, token) => {
  try {
    const response = await apiFetch(
      `/auth/me/accounts/${accountId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ updatedAccount }),
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

export const deleteAccount = async (accountId, token) => {
  try {
    const response = await apiFetch(
      `/auth/me/accounts/${accountId}`,
      {
        method: "DELETE",
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
