import { SecurityCheck } from "../features/security-check/pages/SecurityCheck";
import "../assets/dashboard.css";

const Dashboard = () => {
  return (
    <section className="dashboard">
      <SecurityCheck />
    </section>
  );
};

export default Dashboard;
