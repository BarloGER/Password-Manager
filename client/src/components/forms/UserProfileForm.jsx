const UserProfileForm = ({
  user,
  handleInputChange,
  handleEditSubmit,
  deleteAccount,
  logOut,
  isEditing,
  setIsEditing,
  editedUser,
}) => {
  console.log(user);
  return user ? (
    <div>
      <h1>Willkommen zurück, {user.username}</h1>
      {isEditing ? (
        <form onSubmit={handleEditSubmit}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={editedUser.email}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={editedUser.username}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={editedUser.password}
              onChange={handleInputChange}
              required
            />
          </label>
          <button type="submit">Änderungen speichern</button>
        </form>
      ) : (
        <>
          <button onClick={() => setIsEditing(true)}>Profil bearbeiten</button>
          <button onClick={logOut}>Logout</button>
          <button onClick={deleteAccount}>Account löschen</button>
        </>
      )}
    </div>
  ) : (
    <h1>Loading</h1>
  );
};

export default UserProfileForm;
