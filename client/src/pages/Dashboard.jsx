import { Link } from "react-router-dom";
import "../assets/dashboard.css";

const Dashboard = () => {
  return (
    <section className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="dashboard-cards">
        <Link to="/auth/profile" className="dashboard-card">
          <button>Profil</button>
        </Link>
        <Link to="/auth/accounts" className="dashboard-card">
          <button>Accounts</button>
        </Link>
        <Link to="/auth/notes" className="dashboard-card">
          <button>Notizen</button>
        </Link>
        <Link to="/auth/generator" className="dashboard-card">
          <button>Passwort Generator</button>
        </Link>
      </div>
    </section>
  );
};

export default Dashboard;
