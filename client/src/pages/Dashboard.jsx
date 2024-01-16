import { SecurityCheck } from "../features/security-check";
import { PasswordGenerator } from "../features/password-generator";
import "../assets/dashboard.css";

const Dashboard = () => {
  return (
    <section className="dashboard">
      <SecurityCheck />
      <PasswordGenerator />
    </section>
  );
};

export default Dashboard;
