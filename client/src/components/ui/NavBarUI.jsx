import { NavLink } from "react-router-dom";

const NavBarUI = () => {
  return (
    <>
      <NavLink to="/auth/dashboard">Dashboard</NavLink>
      <NavLink to="/auth/accounts">Accounts</NavLink>
      <NavLink to="/auth/profile">Profile</NavLink>
    </>
  );
};

export default NavBarUI;
