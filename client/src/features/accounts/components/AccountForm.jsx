import "../assets/account-form.css";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";

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
}) => {
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
            required
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
          <input
            type="text"
            name="password"
            placeholder="Password"
            value={newAccount.password}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Account hinzufügen</button>
        </form>
        {displayedAccounts && displayedAccounts.length > 0 ? (
          displayedAccounts.map((account, index) => (
            <div className="account-card" key={index}>
              {editingAccount === account._id ? (
                <form onSubmit={(e) => handleEditSubmit(e, account._id)}>
                  <input
                    type="text"
                    name="name"
                    value={account.name}
                    onChange={(e) => handleEditInputChange(index, e)}
                  />
                  <input
                    type="text"
                    name="username"
                    value={account.username}
                    onChange={(e) => handleEditInputChange(index, e)}
                  />
                  <input
                    type="email"
                    name="email"
                    value={account.email}
                    onChange={(e) => handleEditInputChange(index, e)}
                  />
                  <input
                    type={showPasswordId === account._id ? "text" : "password"}
                    name="password"
                    value={account.password}
                    onChange={(e) => handleEditInputChange(index, e)}
                  />
                  <button type="button" onClick={cancelEdit}>
                    Abbrechen
                  </button>
                  <button type="submit">Aktualisieren</button>
                </form>
              ) : (
                <div className="account-info">
                  <p>{`Name: ${account.name}`}</p>
                  <p>{`Benutzername: ${account.username}`}</p>
                  <p>{`Email: ${account.email}`}</p>
                  <p>
                    Password:{" "}
                    <span className="password">
                      {showPasswordId === account._id
                        ? account.password
                        : "••••••••"}
                    </span>
                  </p>
                </div>
              )}

              <div className="account-actions">
                <FaEye
                  className="icon"
                  onClick={() =>
                    setShowPasswordId(
                      showPasswordId === account._id ? null : account._id
                    )
                  }
                />
                <MdModeEdit
                  className="icon"
                  onClick={() =>
                    setEditingAccount(
                      editingAccount === account._id ? null : account._id
                    )
                  }
                />
                <MdDelete
                  className="icon"
                  onClick={() => deleteAcc(account._id)}
                />
              </div>
            </div>
          ))
        ) : (
          <p className="no-accounts-text">Noch keine Accounts hinzugefügt.</p>
        )}
      </div>
    </section>
  );
};
