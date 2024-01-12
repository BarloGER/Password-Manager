import {
  getAccounts,
  addAccountToUser,
  editAccount,
  deleteAccount,
} from "../features/accounts";

import {
  getUser,
  loginUser,
  registerUser,
  editUser,
  deleteUser,
} from "../features/authentication";

// Facade function
const api = {
  // Account-methods
  getAccounts: (token) => getAccounts(token),
  addAccountToUser: (account, token) => addAccountToUser(account, token),
  editAccount: (accountId, updatedAccount, token) =>
    editAccount(accountId, updatedAccount, token),
  deleteAccount: (accountId, token) => deleteAccount(accountId, token),

  // User-methods
  getUser: (token) => getUser(token),
  loginUser: (credentials) => loginUser(credentials),
  registerUser: (credentials) => registerUser(credentials),
  editUser: (updatedData, token) => editUser(updatedData, token),
  deleteUser: (token) => deleteUser(token),
};

export default api;
