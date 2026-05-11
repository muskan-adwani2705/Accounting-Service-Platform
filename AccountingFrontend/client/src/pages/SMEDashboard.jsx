import { Link } from "react-router-dom";
import Recommendations from "../components/Recommendations";

const SMEDashboard = () => {
  return (
    <div>
      <h2>SME Dashboard</h2>
      <Link to="/sme/search">🔍 Search Accountants</Link>
      <Link to="/sme/shortlist">⭐ My Shortlist</Link>
      <Recommendations />
    </div>
  );
};
export default SMEDashboard;
