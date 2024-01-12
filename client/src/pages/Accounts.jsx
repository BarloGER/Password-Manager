import { useState, useEffect } from "react";
import { AccountForm } from "../features/accounts";
import api from "../lib/apiFacade";

const Accounts = () => {
  const [accounts, setAccounts] = useState(null);
  const [newAccount, setNewAccount] = useState({
    _id: crypto.randomUUID(),
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [displayedAccounts, setDisplayedAccounts] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingAccount, setEditingAccount] = useState(null);
  const [showPasswordId, setShowPasswordId] = useState(null);
  const token = localStorage.getItem("token");

  const fetchAccounts = async () => {
    const res = await api.getAccounts(token);
    if (res && res.data && res.data.accounts) {
      const sortedAccounts = res.data.accounts.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setAccounts(sortedAccounts);
      setDisplayedAccounts(sortedAccounts);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  useEffect(() => {
    if (accounts) {
      const results = accounts.filter((account) =>
        account.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setDisplayedAccounts(results);
    }
  }, [searchTerm]);

  const handleInputChange = (e) => {
    setNewAccount({ ...newAccount, [e.target.name]: e.target.value });
  };

  const addAccount = async () => {
    const account = { ...newAccount, password: newAccount.password };
    await api.addAccountToUser(account, token);
    fetchAccounts();
    setNewAccount({
      _id: crypto.randomUUID(),
      name: "",
      username: "",
      email: "",
      password: "",
    });
  };

  const deleteAcc = async (accountId) => {
    accounts.find((acc) => acc._id === accountId);
    const confirmation = window.confirm(
      "Willst du deinen Account wirklich löschen?"
    );
    if (confirmation) {
      await api.deleteAccount(accountId, token);
      fetchAccounts();
    }
  };

  const handleEditInputChange = (index, e) => {
    const updatedAccounts = [...accounts];
    updatedAccounts[index][e.target.name] = e.target.value;
    setAccounts(updatedAccounts);
  };

  const cancelEdit = () => {
    setEditingAccount(null);
    setShowPasswordId(null);
  };

  const handleEditSubmit = async (e, accountId) => {
    e.preventDefault();
    const accountToEdit = accounts.find((acc) => acc._id === accountId);
    console.log(accountId);
    console.log(accountToEdit);
    await api.editAccount(accountId, accountToEdit, token);
    setEditingAccount(null);
    fetchAccounts();
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await addAccount();
  };

  return (
    <AccountForm
      handleInputChange={handleInputChange}
      deleteAcc={deleteAcc}
      handleEditInputChange={handleEditInputChange}
      cancelEdit={cancelEdit}
      handleEditSubmit={handleEditSubmit}
      handleFormSubmit={handleFormSubmit}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      displayedAccounts={displayedAccounts}
      newAccount={newAccount}
      editingAccount={editingAccount}
      setEditingAccount={setEditingAccount}
      showPasswordId={showPasswordId}
      setShowPasswordId={setShowPasswordId}
    />
  );
};

export default Accounts;
