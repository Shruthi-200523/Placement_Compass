import { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import "../App.css";

const API_URL = `${import.meta.env.VITE_API_URL}/api/dashboard/stats`;

function Dashboard() {
    const [stats, setStats] = useState({
        companies: 0,
        notes: 0,
        totalTasks: 0,
        completedTasks: 0,
        totalCodingQuestions: 0,
        solvedCodingQuestions: 0,
        totalAptitudeQuestions: 0,
        companyProgress: 0
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadDashboardStats = async () => {
            const user = JSON.parse(localStorage.getItem("user"));

            if (!user?.token) {
                setError("User not logged in.");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(API_URL);
                setStats(response.data);
                setError("");
            } catch (err) {
                console.error("Dashboard stats error:", err);
                setError("Unable to load dashboard statistics.");
            } finally {
                setLoading(false);
            }
        };

        loadDashboardStats();
    }, []);

    if (loading) {
        return (
            <div className="dashboard">
                <div className="dashboard-loading">
                    <div className="loading-spinner"></div>
                    <h2>Loading your dashboard...</h2>
                    <p>Preparing your placement progress.</p>
                </div>
            </div>
        );
    }

    const taskPercentage =
        stats.totalTasks > 0
            ? Math.round((stats.completedTasks / stats.totalTasks) * 100)
            : 0;

    const codingPercentage =
        stats.totalCodingQuestions > 0
            ? Math.round(
                (stats.solvedCodingQuestions / stats.totalCodingQuestions) * 100
            )
            : 0;

    return (
        <div className="dashboard">

            {/* Header */}
            <div className="dashboard-header">
                <div>
                    <span className="dashboard-badge">
                        PLACEMENT PREPARATION
                    </span>

                    <h1>Welcome to Placement Compass 👋</h1>

                    <p>
                        Track your preparation, build consistency, and get
                        placement-ready.
                    </p>
                </div>

                <div className="dashboard-overall">
                    <span>Preparation</span>
                    <strong>{stats.companyProgress}%</strong>
                </div>
            </div>

            {error && (
                <div className="dashboard-error">
                    {error}
                </div>
            )}

            {/* Main progress */}
            <div className="dashboard-main-progress">
                <div className="dashboard-progress-header">
                    <div>
                        <h2>Overall Preparation</h2>
                        <p>Your company preparation progress</p>
                    </div>

                    <strong>{stats.companyProgress}%</strong>
                </div>

                <div className="dashboard-progress-bar">
                    <div
                        className="dashboard-progress-fill"
                        style={{
                            width: `${stats.companyProgress}%`
                        }}
                    >
                        {stats.companyProgress > 8
                            ? `${stats.companyProgress}%`
                            : ""}
                    </div>
                </div>
            </div>

            {/* Statistics */}
            <div className="dashboard-stat-grid">

                <div className="dashboard-stat-card">
                    <div className="stat-icon company-icon">🏢</div>
                    <div>
                        <span>Target Companies</span>
                        <strong>{stats.companies}</strong>
                    </div>
                </div>

                <div className="dashboard-stat-card">
                    <div className="stat-icon notes-icon">📝</div>
                    <div>
                        <span>My Notes</span>
                        <strong>{stats.notes}</strong>
                    </div>
                </div>

                <div className="dashboard-stat-card">
                    <div className="stat-icon task-icon">✅</div>
                    <div>
                        <span>Tasks Completed</span>
                        <strong>
                            {stats.completedTasks}
                            <small> / {stats.totalTasks}</small>
                        </strong>
                    </div>
                </div>

                <div className="dashboard-stat-card">
                    <div className="stat-icon coding-icon">💻</div>
                    <div>
                        <span>Coding Solved</span>
                        <strong>
                            {stats.solvedCodingQuestions}
                            <small> / {stats.totalCodingQuestions}</small>
                        </strong>
                    </div>
                </div>

                <div className="dashboard-stat-card">
                    <div className="stat-icon aptitude-icon">🧠</div>
                    <div>
                        <span>Aptitude Questions</span>
                        <strong>{stats.totalAptitudeQuestions}</strong>
                    </div>
                </div>

                <div className="dashboard-stat-card">
                    <div className="stat-icon preparation-icon">🚀</div>
                    <div>
                        <span>Company Preparation</span>
                        <strong>{stats.companyProgress}%</strong>
                    </div>
                </div>

            </div>

            {/* Progress cards */}
            <div className="dashboard-section-title">
                <h2>Your Progress</h2>
                <p>Keep improving every day.</p>
            </div>

            <div className="dashboard-progress-grid">

                <div className="dashboard-mini-card">
                    <div className="mini-card-header">
                        <div>
                            <h3>Planner Tasks</h3>
                            <p>
                                {stats.completedTasks} of{" "}
                                {stats.totalTasks} completed
                            </p>
                        </div>

                        <strong>{taskPercentage}%</strong>
                    </div>

                    <div className="mini-progress">
                        <div
                            style={{
                                width: `${taskPercentage}%`
                            }}
                        ></div>
                    </div>
                </div>

                <div className="dashboard-mini-card">
                    <div className="mini-card-header">
                        <div>
                            <h3>Coding Practice</h3>
                            <p>
                                {stats.solvedCodingQuestions} of{" "}
                                {stats.totalCodingQuestions} solved
                            </p>
                        </div>

                        <strong>{codingPercentage}%</strong>
                    </div>

                    <div className="mini-progress">
                        <div
                            style={{
                                width: `${codingPercentage}%`
                            }}
                        ></div>
                    </div>
                </div>

            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
                <div className="dashboard-section-title">
                    <h2>Quick Actions</h2>
                    <p>Jump directly into your preparation.</p>
                </div>

                <div className="quick-action-grid">

                    <a href="/planner">
                        <span>📅</span>
                        <strong>Plan Your Day</strong>
                        <small>Manage preparation tasks</small>
                    </a>

                    <a href="/coding">
                        <span>💻</span>
                        <strong>Practice Coding</strong>
                        <small>Solve coding questions</small>
                    </a>

                    <a href="/aptitude">
                        <span>🧠</span>
                        <strong>Practice Aptitude</strong>
                        <small>Improve aptitude skills</small>
                    </a>

                    <a href="/notes">
                        <span>📝</span>
                        <strong>My Notes</strong>
                        <small>Review your notes</small>
                    </a>

                    <a href="/company-preparation">
                        <span>🎯</span>
                        <strong>Company Prep</strong>
                        <small>Prepare for target companies</small>
                    </a>

                    <a href="/companies">
                        <span>🏢</span>
                        <strong>Explore Companies</strong>
                        <small>View placement companies</small>
                    </a>

                </div>
            </div>

        </div>
    );
}

export default Dashboard;