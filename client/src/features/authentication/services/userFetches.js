import { apiFetch } from "../../../lib/fetch";

// Funktionen für Benutzer-Interaktionen
export const getUser = async (token) => {
  return apiFetch(`/auth/me`, { method: "GET" }, token);
};

export const loginUser = async (credentials) => {
  return apiFetch(`/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
};

export const registerUser = async (credentials) => {
  return apiFetch(`/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
};

export const editUser = async (updatedData, token) => {
  return apiFetch(
    `/auth/me`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    },
    token
  );
};

export const deleteUser = async (token) => {
  return apiFetch(
    `/auth/me`,
    {
      method: "DELETE",
    },
    token
  );
};
