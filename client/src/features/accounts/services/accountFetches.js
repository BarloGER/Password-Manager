import { apiFetch } from "../../../lib/fetch";

// Funktionen für Account-Interaktionen
export const getAccounts = async (token) => {
  return apiFetch(`/auth/me/accounts`, { method: "GET" }, token);
};

export const addAccountToUser = async (account, token) => {
  return apiFetch(
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
};

export const editAccount = async (accountId, updatedAccount, token) => {
  return apiFetch(
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
};

export const deleteAccount = async (accountId, token) => {
  return apiFetch(
    `/auth/me/accounts/${accountId}`,
    {
      method: "DELETE",
    },
    token
  );
};
