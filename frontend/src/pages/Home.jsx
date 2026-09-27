import { Link } from "react-router-dom";
import "../App.css";

function Home() {
    return (
        <div className="home-page">

            {/* =========================
                NAVIGATION
            ========================== */}

            <nav className="home-navbar">

                <div className="home-logo">
                    🧭 <span>Placement Compass</span>
                </div>

                <div className="home-nav-links">

                    <Link to="/login">
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="home-nav-register"
                    >
                        Get Started
                    </Link>

                </div>

            </nav>

            {/* =========================
                HERO SECTION
            ========================== */}

            <section className="home-hero">

                <div className="home-hero-content">

                    <div className="home-badge">
                        🚀 SMART PLACEMENT PREPARATION
                    </div>

                    <h1>
                        Your Career.
                        <br />

                        <span>
                            Your Preparation.
                        </span>

                        <br />

                        Your Success.
                    </h1>

                    <p>
                        Placement Compass helps students organize
                        coding practice, aptitude preparation,
                        company research, study tasks and important
                        notes — all in one place.
                    </p>

                    <div className="home-buttons">

                        <Link to="/register">
                            <button className="home-primary-button">
                                Get Started →
                            </button>
                        </Link>

                        <Link to="/login">
                            <button className="home-secondary-button">
                                Login
                            </button>
                        </Link>

                    </div>

                    <div className="home-trust">

                        <span>
                            ✓ Track Progress
                        </span>

                        <span>
                            ✓ Practice Coding
                        </span>

                        <span>
                            ✓ Prepare Smarter
                        </span>

                    </div>

                </div>

                {/* =========================
                    DASHBOARD PREVIEW
                ========================== */}

                <div className="home-preview">

                    <div className="preview-window">

                        <div className="preview-topbar">

                            <div className="preview-dots">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>

                            <span>
                                Placement Compass
                            </span>

                        </div>

                        <div className="preview-content">

                            <div className="preview-welcome">

                                <div>
                                    <small>
                                        STUDENT DASHBOARD
                                    </small>

                                    <h3>
                                        Welcome back! 👋
                                    </h3>
                                </div>

                                <div className="preview-avatar">
                                    S
                                </div>

                            </div>

                            <div className="preview-stats">

                                <div>
                                    <span>Companies</span>
                                    <strong>6</strong>
                                </div>

                                <div>
                                    <span>Tasks</span>
                                    <strong>12</strong>
                                </div>

                                <div>
                                    <span>Coding</span>
                                    <strong>24</strong>
                                </div>

                            </div>

                            <div className="preview-progress">

                                <div className="preview-progress-heading">

                                    <span>
                                        Preparation Progress
                                    </span>

                                    <strong>
                                        72%
                                    </strong>

                                </div>

                                <div className="preview-progress-bar">

                                    <div></div>

                                </div>

                            </div>

                            <div className="preview-mini-cards">

                                <div>
                                    💻
                                    <span>
                                        Coding Practice
                                    </span>
                                </div>

                                <div>
                                    🧠
                                    <span>
                                        Aptitude
                                    </span>
                                </div>

                                <div>
                                    📅
                                    <span>
                                        Planner
                                    </span>
                                </div>

                                <div>
                                    📝
                                    <span>
                                        Notes
                                    </span>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* =========================
                FEATURES
            ========================== */}

            <section className="home-features">

                <div className="home-section-heading">

                    <span>
                        EVERYTHING YOU NEED
                    </span>

                    <h2>
                        Prepare for placements
                        <br />
                        <strong>without the chaos.</strong>
                    </h2>

                    <p>
                        Keep your preparation organized,
                        measurable and consistent.
                    </p>

                </div>

                <div className="home-feature-grid">

                    <div className="home-feature-card">

                        <div className="feature-icon">
                            💻
                        </div>

                        <h3>
                            Coding Practice
                        </h3>

                        <p>
                            Add coding problems, track solved
                            questions and monitor your progress.
                        </p>

                    </div>

                    <div className="home-feature-card">

                        <div className="feature-icon">
                            🧠
                        </div>

                        <h3>
                            Aptitude Preparation
                        </h3>

                        <p>
                            Practice aptitude questions and
                            prepare for company assessment rounds.
                        </p>

                    </div>

                    <div className="home-feature-card">

                        <div className="feature-icon">
                            🏢
                        </div>

                        <h3>
                            Company Preparation
                        </h3>

                        <p>
                            Organize your preparation based on
                            the companies you want to target.
                        </p>

                    </div>

                    <div className="home-feature-card">

                        <div className="feature-icon">
                            📅
                        </div>

                        <h3>
                            Study Planner
                        </h3>

                        <p>
                            Create daily preparation tasks and
                            track what you have completed.
                        </p>

                    </div>

                    <div className="home-feature-card">

                        <div className="feature-icon">
                            📝
                        </div>

                        <h3>
                            Smart Notes
                        </h3>

                        <p>
                            Store important concepts, formulas,
                            interview tips and revision notes.
                        </p>

                    </div>

                    <div className="home-feature-card">

                        <div className="feature-icon">
                            📊
                        </div>

                        <h3>
                            Progress Dashboard
                        </h3>

                        <p>
                            Get a quick overview of your placement
                            preparation progress.
                        </p>

                    </div>

                </div>

            </section>

            {/* =========================
                CTA
            ========================== */}

            <section className="home-cta">

                <div>

                    <span>
                        READY TO START?
                    </span>

                    <h2>
                        Turn preparation into progress.
                    </h2>

                    <p>
                        Start building your placement preparation
                        system today.
                    </p>

                    <Link to="/register">

                        <button>
                            Create Your Account →
                        </button>

                    </Link>

                </div>

            </section>

            {/* =========================
                FOOTER
            ========================== */}

            <footer className="home-footer">

                <div>
                    🧭 <strong>Placement Compass</strong>
                </div>

                <p>
                    Your personal placement preparation platform.
                </p>

            </footer>

        </div>
    );
}

export default Home;