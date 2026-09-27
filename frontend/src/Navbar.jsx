import { Link } from "react-router-dom";
import "../App.css";

function Navbar() {

  return (

    <nav className="navbar">

      <div className="navbar-logo">

        <Link to="/dashboard">
          🧭 Placement Compass
        </Link>

      </div>

      <div className="navbar-links">

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/companies">
          Companies
        </Link>

        <Link to="/company-preparation">
          Preparation
        </Link>

        <Link to="/aptitude">
          Aptitude
        </Link>

        <Link to="/coding">
          Coding
        </Link>

        <Link to="/planner">
          Planner
        </Link>

        <Link to="/notes">
          Notes
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;