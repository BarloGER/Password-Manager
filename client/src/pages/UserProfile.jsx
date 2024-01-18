import { useState, useEffect } from "react";
import UserProfileForm from "../components/forms/UserProfileForm";
import api from "../lib/apiFacade";

const UserProfile = ({ user, setIsAuthenticated }) => {
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [editedUser, setEditedUser] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    if (user) {
      setEditedUser({
        email: user.email,
        username: user.username,
        password: "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (editedUser.password !== editedUser.repeatPassword) {
      setErrorMessage("Die Passwörter stimmen nicht überein.");
      setPasswordsMatch(false);
      return;
    }

    setErrorMessage("");
    setPasswordsMatch(true);
    setIsLoading(true);

    try {
      const userData = { ...editedUser };
      delete userData.repeatPassword;

      const data = await api.editUser(userData, token);
      if (data.message) {
        setSuccessMessage(data.message);
        setIsEditing(false);
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAccount = async () => {
    try {
      const confirmation = window.confirm(
        "Willst du deinen Account wirklich löschen?"
      );
      if (confirmation) {
        const data = await api.deleteUser(token);
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setSuccessMessage(data.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <UserProfileForm
      user={user}
      handleInputChange={handleInputChange}
      handleEditSubmit={handleEditSubmit}
      deleteAccount={deleteAccount}
      logOut={logOut}
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      isEditingPassword={isEditingPassword}
      setIsEditingPassword={setIsEditingPassword}
      passwordsMatch={passwordsMatch}
      setPasswordsMatch={setPasswordsMatch}
      handlePasswordChange={handlePasswordChange}
      editedUser={editedUser}
      setEditedUser={setEditedUser}
      successMessage={successMessage}
      setSuccessMessage={setSuccessMessage}
      errorMessage={errorMessage}
      setErrorMessage={setErrorMessage}
      isLoading={isLoading}
    />
  );
};

export default UserProfile;
