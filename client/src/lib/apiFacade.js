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

import {
  downloadBackup,
  downloadBackupDecrypted,
  uploadBackup,
} from "../features/backup";

import { getSecurityData } from "../features/security-check";

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

  // Backup-methods
  downloadBackup: (token) => downloadBackup(token),
  downloadBackupDecrypted: (token) => downloadBackupDecrypted(token),
  uploadBackup: (backupData, token) => uploadBackup(backupData, token),

  // Security-methods
  getSecurityData: (token) => getSecurityData(token),
};

export default api;
