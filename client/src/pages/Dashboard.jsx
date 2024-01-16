import { SecurityCheck } from "../features/security-check";
import { PasswordGenerator } from "../features/password-generator";
import { Backup } from "../features/backup";
import "../assets/dashboard.css";

const Dashboard = () => {
  return (
    <section className="dashboard">
      <SecurityCheck />
      <PasswordGenerator />
      <Backup />
    </section>
  );
};

export default Dashboard;
