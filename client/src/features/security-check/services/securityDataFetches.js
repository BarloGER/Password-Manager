import { apiFetch } from "../../../lib/fetch";

export const getSecurityData = async (token) => {
  try {
    const response = await apiFetch(
      `/auth/me/analyze-passwords`,
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
