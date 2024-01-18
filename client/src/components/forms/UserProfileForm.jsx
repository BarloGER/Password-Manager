import { Message } from "../../components/ui/Message";
import "../../assets/profile.css";

const UserProfileForm = ({
  user,
  handleInputChange,
  handleEditSubmit,
  deleteAccount,
  logOut,
  isEditing,
  setIsEditing,
  editedUser,
  isEditingPassword,
  setIsEditingPassword,
  passwordsMatch,
  setPasswordsMatch,
  handlePasswordChange,
  successMessage,
  setSuccessMessage,
  errorMessage,
  setErrorMessage,
}) => {
  return user ? (
    <div className="profile-container">
      {" "}
      <div className="profile-box">
        {" "}
        <h1>Willkommen zurück, {user.username}</h1>
        <Message
          successMessage={successMessage}
          setSuccessMessage={setSuccessMessage}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
        {isEditing ? (
          <form onSubmit={handleEditSubmit}>
            <div className="profile-data-wrapper">
              <div className="profile-input-wrapper">
                <label>
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={editedUser.email}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className="profile-input-wrapper">
                <label>
                  Username:
                  <input
                    type="text"
                    name="username"
                    value={editedUser.username}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
            </div>

            {isEditingPassword && (
              <div className="profile-data-wrapper">
                <div className="profile-input-wrapper">
                  <label>
                    Neues Passwort:
                    <input
                      type="password"
                      name="password"
                      onChange={handlePasswordChange}
                    />
                  </label>
                </div>
                <div className="profile-input-wrapper">
                  <label>
                    Passwort wiederholen:
                    <input
                      type="password"
                      name="repeatPassword"
                      onChange={handlePasswordChange}
                    />
                  </label>
                </div>
              </div>
            )}

            <div className="profile-button-wrapper">
              <button
                type="button"
                onClick={() => setIsEditingPassword(!isEditingPassword)}
              >
                Passwort bearbeiten
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setIsEditingPassword(false);
                }}
              >
                Abbrechen
              </button>
            </div>
            <button type="submit" disabled={!passwordsMatch}>
              Änderungen speichern
            </button>
          </form>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)}>
              Profil bearbeiten
            </button>
            <button onClick={logOut}>Logout</button>
            <button className="delete-account-button" onClick={deleteAccount}>
              Account löschen
            </button>
          </>
        )}
      </div>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
};

export default UserProfileForm;
