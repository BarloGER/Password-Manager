import { apiFetch } from "../../../lib/fetch";

export const getUser = async (token) => {
  try {
    const response = await apiFetch(`/auth/me`, { method: "GET" }, token);

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

export const loginUser = async (credentials) => {
  try {
    const response = await apiFetch(`/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

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

export const registerUser = async (credentials) => {
  try {
    const response = await apiFetch(`/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

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

export const editUser = async (updatedData, token) => {
  try {
    const response = await apiFetch(
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

export const deleteUser = async (token) => {
  try {
    const response = await apiFetch(
      `/auth/me`,
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
