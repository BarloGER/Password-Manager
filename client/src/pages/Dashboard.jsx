import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <h1>Dashboard</h1>
      <Link to="/auth/accounts">
        <button>Accounts</button>
      </Link>
      <Link to="/auth/profile">
        <button>Profil</button>
      </Link>
    </>
  );
};

export default Dashboard;
