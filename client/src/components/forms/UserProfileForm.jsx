import { useState } from "react";
import { Message } from "../../components/ui/Message";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";
import { generatePassword } from "../../features/password-generator";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { CgPassword } from "react-icons/cg";
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
  setEditedUser,
  isEditingPassword,
  setIsEditingPassword,
  passwordsMatch,
  setPasswordsMatch,
  handlePasswordChange,
  successMessage,
  setSuccessMessage,
  errorMessage,
  setErrorMessage,
  isLoading,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handlePasswordGeneration = () => {
    const newPassword = generatePassword(12);
    setEditedUser({ ...editedUser, password: newPassword });
  };

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
                    <div className="input-icon-container">
                      <input
                        type={isPasswordVisible ? "text" : "password"}
                        name="password"
                        value={editedUser.password}
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
                  </label>
                </div>
                <div className="profile-input-wrapper">
                  <label>
                    Passwort wiederholen:
                    <input
                      type={isPasswordVisible ? "text" : "password"}
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
                className="abort-button"
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setIsEditingPassword(false);
                  setEditedUser({
                    email: user.email,
                    username: user.username,
                    password: "",
                  });
                }}
              >
                Abbrechen
              </button>
            </div>
            <button type="submit" className="submit-button">
              Änderungen speichern {isLoading && <LoadingSpinner />}
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
