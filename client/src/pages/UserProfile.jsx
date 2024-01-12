import { useState, useEffect } from "react";
import UserProfileForm from "../components/forms/UserProfileForm";
import api from "../lib/apiFacade";

// ToDo: Seperate pw edit from editing user

const UserProfile = ({ user, setIsAuthenticated }) => {
  const token = localStorage.getItem("token");
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    email: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      setEditedUser({ email: user.email, username: user.username });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await api.editUser(editedUser, token);
    setIsEditing(false);
  };

  const deleteAccount = async () => {
    const confirmation = window.confirm(
      "Willst du deinen Account wirklich löschen?"
    );
    if (confirmation) {
      await api.deleteUser(token);
      localStorage.removeItem("token");
      setIsAuthenticated(false);
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
      editedUser={editedUser}
    />
  );
};

export default UserProfile;
