import { Link, useLocation, useNavigate } from "react-router-dom";
import "../App.css";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <nav className="navbar">

            {/* Logo */}
            <div className="navbar-logo">
                <Link to="/dashboard">
                    <span className="navbar-logo-icon">🧭</span>
                    <span>Placement Compass</span>
                </Link>
            </div>

            {/* Navigation */}
            <div className="navbar-links">

                {user && (
                    <>
                        <Link
                            to="/dashboard"
                            className={isActive("/dashboard") ? "active" : ""}
                        >
                            Dashboard
                        </Link>

                        <Link
                            to="/companies"
                            className={isActive("/companies") ? "active" : ""}
                        >
                            Companies
                        </Link>

                        <Link
                            to="/company-preparation"
                            className={
                                isActive("/company-preparation")
                                    ? "active"
                                    : ""
                            }
                        >
                            Preparation
                        </Link>

                        <Link
                            to="/aptitude"
                            className={isActive("/aptitude") ? "active" : ""}
                        >
                            Aptitude
                        </Link>

                        <Link
                            to="/coding"
                            className={isActive("/coding") ? "active" : ""}
                        >
                            Coding
                        </Link>

                        <Link
                            to="/planner"
                            className={isActive("/planner") ? "active" : ""}
                        >
                            Planner
                        </Link>

                        <Link
                            to="/notes"
                            className={isActive("/notes") ? "active" : ""}
                        >
                            Notes
                        </Link>

                        <button
                            className="logout-btn"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </>
                )}

                {!user && (
                    <>
                        <Link
                            to="/login"
                            className={isActive("/login") ? "active" : ""}
                        >
                            Login
                        </Link>

                        <Link
                            to="/register"
                            className={isActive("/register") ? "active" : ""}
                        >
                            Register
                        </Link>
                    </>
                )}

            </div>
        </nav>
    );
}

export default Navbar;