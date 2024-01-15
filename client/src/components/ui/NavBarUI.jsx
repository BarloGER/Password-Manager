import { NavLink } from "react-router-dom";
import "../../assets/navbar.css";

const NavBarUI = () => {
  return (
    <nav className="navbar">
      <NavLink to="/auth/dashboard">Dashboard</NavLink>
      <NavLink to="/auth/accounts">Accounts</NavLink>
      <NavLink to="/auth/profile">Profile</NavLink>
    </nav>
  );
};

export default NavBarUI;
