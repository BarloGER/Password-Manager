import { apiFetch } from "../../../lib/fetch";

export const getSecurityData = async (token) => {
  return apiFetch(`/auth/me/analyze-passwords`, { method: "GET" }, token);
};
