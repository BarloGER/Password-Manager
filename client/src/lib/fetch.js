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
      return { error };
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    return { error };
  }
};

// Axios

// export const apiFetch = async (url, options, token) => {
//   try {
//     const headers = { ...options.headers };
//     if (token) {
//       headers["Authorization"] = token;
//     }

//     const response = await axios({
//       url: API_BASE_URL + url,
//       method: options.method,
//       headers: headers,
//       data: options.body,
//     });

//     return { data: response.data };
//   } catch (error) {
//     if (error.response) {
//       return { error: error.response.data };
//     } else {
//       return { error: error.message };
//     }
//   }
// };
