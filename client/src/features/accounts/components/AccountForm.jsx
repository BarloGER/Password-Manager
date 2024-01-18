import { useState } from "react";
import { Message } from "../../../components/ui/Message";
import { generatePassword } from "../../password-generator";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { FaEye, FaEyeSlash, FaCopy } from "react-icons/fa";
import { CgPassword } from "react-icons/cg";
import "../assets/account-form.css";

export const AccountForm = ({
  searchTerm,
  setSearchTerm,
  displayedAccounts,
  handleFormSubmit,
  newAccount,
  handleInputChange,
  deleteAcc,
  handleEditInputChange,
  cancelEdit,
  handleEditSubmit,
  editingAccount,
  setEditingAccount,
  showPasswordId,
  setShowPasswordId,
  newAccountSuccessMessage,
  setNewAccountSuccessMessage,
  newAccountErrorMessage,
  setNewAccountErrorMessage,
  editAccountSuccessMessage,
  setEditAccountSuccessMessage,
  editAccountErrorMessage,
  setEditAccountErrorMessage,
  messageAccountId,
  setMessageAccountId,
  isEditing,
  setIsEditing,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handlePasswordGeneration = () => {
    const newPassword = generatePassword(12);
    handleInputChange({ target: { name: "password", value: newPassword } });
  };

  const startEditing = (accountId) => {
    setIsEditing(accountId);
    setEditingAccount(accountId);
  };

  const stopEditing = () => {
    setIsEditing(null);
    setEditingAccount(null);
  };

  return (
    <section className="account-container">
      <input
        className="account-search-input"
        type="text"
        placeholder="Account suchen..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="account-cards-container">
        <form
          className="account-card new-account-form"
          onSubmit={handleFormSubmit}
        >
          <input
            type="text"
            name="name"
            placeholder="Account Name"
            value={newAccount.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="username"
            placeholder="Benutzername"
            value={newAccount.username}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newAccount.email}
            onChange={handleInputChange}
          />
          <div className="input-icon-container">
            <input
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              placeholder="Passwort"
              value={newAccount.password}
              onChange={handleInputChange}
            />
            <CgPassword
              className="input-icon-1 cg-password"
              onClick={handlePasswordGeneration}
            />
            {isPasswordVisible ? (
              <FaEyeSlash
                className="input-icon-2 fa-eye"
                onClick={togglePasswordVisibility}
              />
            ) : (
              <FaEye
                className="input-icon-2 fa-eye"
                onClick={togglePasswordVisibility}
              />
            )}
          </div>
          <Message
            successMessage={newAccountSuccessMessage}
            setSuccessMessage={setNewAccountSuccessMessage}
            errorMessage={newAccountErrorMessage}
            setErrorMessage={setNewAccountErrorMessage}
          />
          <button type="submit" className="new-account-form-button">
            Account hinzufügen
          </button>
        </form>
        {displayedAccounts && displayedAccounts.length > 0 ? (
          displayedAccounts.map((account, index) => (
            <form
              className="account-card"
              key={index}
              onSubmit={(e) => {
                handleEditSubmit(e, account._id);
                setMessageAccountId(account._id);
              }}
            >
              <input
                type="text"
                name="name"
                placeholder="Account Name"
                value={account.name}
                onChange={(e) => handleEditInputChange(index, e)}
                readOnly={editingAccount !== account._id}
              />
              <input
                type="text"
                name="username"
                placeholder="Benutzername"
                value={account.username}
                onChange={(e) => handleEditInputChange(index, e)}
                readOnly={editingAccount !== account._id}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={account.email}
                onChange={(e) => handleEditInputChange(index, e)}
              />
              <input
                type={showPasswordId === account._id ? "text" : "password"}
                name="password"
                placeholder="Passwort"
                value={account.password}
                onChange={(e) => handleEditInputChange(index, e)}
              />
              {isEditing === account._id && !editAccountSuccessMessage && (
                <>
                  <button type="button" onClick={stopEditing}>
                    Abbrechen
                  </button>
                  <button type="submit">Aktualisieren</button>
                </>
              )}
              {messageAccountId === account._id && (
                <Message
                  successMessage={editAccountSuccessMessage}
                  setSuccessMessage={setEditAccountSuccessMessage}
                  errorMessage={editAccountErrorMessage}
                  setErrorMessage={setEditAccountErrorMessage}
                />
              )}

              <div className="account-actions">
                {showPasswordId === account._id ? (
                  <FaEyeSlash
                    className="icon"
                    onClick={() => setShowPasswordId(null)}
                  />
                ) : (
                  <FaEye
                    className="icon"
                    onClick={() => setShowPasswordId(account._id)}
                  />
                )}
                <FaCopy
                  className="icon"
                  onClick={() => {
                    navigator.clipboard
                      .writeText(account.password)
                      .then(() => {
                        setEditAccountSuccessMessage("Kopiert");
                      })
                      .catch((err) => {
                        setEditAccountErrorMessage(err);
                      });
                  }}
                />
                <MdModeEdit
                  className="icon"
                  onClick={() => startEditing(account._id)}
                />
                <MdDelete
                  className="icon"
                  onClick={() => deleteAcc(account._id)}
                />
              </div>
            </form>
          ))
        ) : (
          <p className="no-accounts-text">Noch keine Accounts hinzugefügt.</p>
        )}
      </div>
    </section>
  );
};
