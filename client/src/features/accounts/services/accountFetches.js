export const getAccounts = async (token) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_KEY}/auth/me/accounts`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return { data };
    } else {
      const errorData = await response.json();
      return errorData;
    }
  } catch (error) {
    return error;
  }
};

export const addAccountToUser = async (account, token) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_KEY}/auth/me/accounts`,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ account }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      return { data };
    } else {
      const errorData = await response.json();
      return errorData;
    }
  } catch (error) {
    return error;
  }
};

export const editAccount = async (accountId, updatedAccount, token) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_KEY}/auth/me/accounts/${accountId}`,
      {
        method: "PUT",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ updatedAccount }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      return { data };
    } else {
      const errorData = await response.json();
      throw errorData;
    }
  } catch (error) {
    return error;
  }
};

export const deleteAccount = async (accountId, token) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_KEY}/auth/me/accounts/${accountId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return { data };
    } else {
      const errorData = await response.json();
      return errorData;
    }
  } catch (error) {
    return error;
  }
};
