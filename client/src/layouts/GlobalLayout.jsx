import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const GlobalLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default GlobalLayout;
