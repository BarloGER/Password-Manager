export const getUser = async (token) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_KEY}/auth/me`, {
      headers: {
        Authorization: token,
      },
    });

    if (!res.ok) {
      const error = await res.json();
      throw error;
    }

    const data = await res.json();
    return { data };
  } catch (error) {
    return { error };
  }
};

export const loginUser = async (credentials) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_KEY}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!res.ok) {
      const error = await res.json();
      throw error;
    }

    const data = await res.json();
    return { data };
  } catch (error) {
    return error;
  }
};

export const registerUser = async (credentials) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_KEY}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!res.ok) {
      const error = await res.json();
      throw error;
    }

    const data = await res.json();
    return { data };
  } catch (error) {
    return error;
  }
};
