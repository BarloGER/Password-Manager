// import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_KEY;

export const apiFetch = async (url, options, token) => {
  try {
    const headers = new Headers(options.headers || {});
    if (token) {
      headers.append("Authorization", token);
    }

    const response = await fetch(API_BASE_URL + url, { ...options, headers });
    if (!response.ok) {
      const error = await response.json();
      return { error }; // Zurückgeben des Fehlers anstelle des Werfens
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    return { error }; // Zurückgeben des Netzwerkfehlers
  }
};

// Axios

// export const apiFetch = async (url, options, token) => {
//   try {
//     const headers = options.headers || {};
//     if (token) {
//       headers["Authorization"] = token;
//     }

//     const response = await axios({
//       method: options.method,
//       url: API_BASE_URL + url,
//       headers: headers,
//       data: options.body,
//     });

//     return { data: response.data };
//   } catch (error) {
//     return { error: error.response ? error.response.data : error.message };
//   }
// };
