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
    <>
      <h1>Accounts</h1>
      <input
        type="text"
        placeholder="Account suchen..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {displayedAccounts && displayedAccounts.length > 0 ? (
        displayedAccounts.map((account, index) => (
          <div key={index}>
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
                  Cancel
                </button>
                <button type="submit">Update Account</button>
              </form>
            ) : (
              <>
                <p>{`Name: ${account.name}`}</p>
                <p>{`Username: ${account.username}`}</p>
                <p>{`Email: ${account.email}`}</p>
                <p>
                  Password:{" "}
                  {showPasswordId === account._id
                    ? account.password
                    : account.password.replace(/./g, "*")}
                </p>
                <button
                  onClick={() =>
                    setShowPasswordId(
                      showPasswordId === account._id ? null : account._id
                    )
                  }
                >
                  {showPasswordId === account._id
                    ? "Passwort verbergen"
                    : "Passwort anzeigen"}
                </button>
                <button
                  onClick={() => {
                    setEditingAccount(
                      editingAccount === account._id ? null : account._id
                    );
                    if (editingAccount !== account._id)
                      setShowPasswordId(account._id);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => deleteAcc(account._id)}>Löschen</button>
              </>
            )}
          </div>
        ))
      ) : (
        <p>Noch keine Accounts hinzugefügt.</p>
      )}
      <form onSubmit={handleFormSubmit}>
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
          placeholder="Username"
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
    </>
  );
};
