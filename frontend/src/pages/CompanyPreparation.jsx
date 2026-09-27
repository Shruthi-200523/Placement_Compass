import { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import "../App.css";

const API_URL = "http://localhost:8080/api/company-preparation";

const emptyForm = {
    companyName: "",
    role: "",
    packageOffered: "",
    requiredSkills: "",
    aptitudeTopics: "",
    technicalTopics: "",
    codingTopics: "",
    interviewQuestions: "",
    progress: 0
};

function CompanyPreparation() {
    const [preparations, setPreparations] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.userId;

    /* ================================
       LOAD DATA
    ================================= */

    const loadPreparations = async () => {
        if (!userId) {
            setError("Please login first.");
            return;
        }

        try {
            const response = await axios.get(API_URL);

            setPreparations(response.data);
            setError("");
        } catch (err) {
            console.error("Load preparations error:", err);
            setError("Unable to load company preparation data.");
        }
    };

    useEffect(() => {
        loadPreparations();
    }, [userId]);

    /* ================================
       FORM
    ================================= */

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));
    };

    const resetForm = () => {
        setFormData(emptyForm);
        setEditingId(null);
        setShowForm(false);
    };

    const openAddForm = () => {
        setEditingId(null);
        setFormData(emptyForm);
        setShowForm(true);
        setError("");
        setMessage("");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    /* ================================
       ADD / UPDATE
    ================================= */

    const savePreparation = async (event) => {
        event.preventDefault();

        if (!userId) {
            setError("Please login first.");
            return;
        }

        if (
            !formData.companyName.trim() ||
            !formData.role.trim()
        ) {
            setError("Company name and role are required.");
            return;
        }

        try {
            if (editingId) {
                await axios.put(
                    `${API_URL}/${editingId}`,
                    {
                        ...formData,
                        progress: Number(formData.progress)
                    }
                );

                setMessage(
                    "Company preparation updated successfully!"
                );
            } else {
                await axios.post(
                    API_URL,
                    {
                        ...formData,
                        progress: 0
                    }
                );

                setMessage(
                    "Company preparation added successfully!"
                );
            }

            resetForm();
            setError("");

            await loadPreparations();

        } catch (err) {
            console.error("Save preparation error:", err);

            setError(
                editingId
                    ? "Unable to update company preparation."
                    : "Unable to add company preparation."
            );
        }
    };

    /* ================================
       EDIT
    ================================= */

    const handleEdit = (company) => {
        setEditingId(company.id);

        setFormData({
            companyName: company.companyName || "",
            role: company.role || "",
            packageOffered: company.packageOffered || "",
            requiredSkills: company.requiredSkills || "",
            aptitudeTopics: company.aptitudeTopics || "",
            technicalTopics: company.technicalTopics || "",
            codingTopics: company.codingTopics || "",
            interviewQuestions: company.interviewQuestions || "",
            progress: company.progress || 0
        });

        setShowForm(true);
        setSelectedCompany(null);

        setError("");
        setMessage("");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    /* ================================
       TOPIC HELPERS
    ================================= */

    const getTopics = (value) => {
        if (!value) {
            return [];
        }

        return value
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);
    };

    const getInterviewQuestions = (value) => {
        if (!value) {
            return [];
        }

        return value
            .split("|")
            .map((item) => item.trim())
            .filter(Boolean);
    };

    /* ================================
       PROGRESS
    ================================= */

    const updateProgress = async (id, progress) => {
        try {
            const preparation = preparations.find(
                (item) => item.id === id
            );

            if (!preparation) {
                return;
            }

            await axios.put(
                `${API_URL}/${id}`,
                {
                    ...preparation,
                    progress: Number(progress)
                }
            );

            setPreparations((previous) =>
                previous.map((item) =>
                    item.id === id
                        ? {
                            ...item,
                            progress: Number(progress)
                        }
                        : item
                )
            );

            setSelectedCompany((previous) =>
                previous?.id === id
                    ? {
                        ...previous,
                        progress: Number(progress)
                    }
                    : previous
            );

            setMessage(
                "Progress updated successfully!"
            );

            setError("");

        } catch (err) {
            console.error(
                "Update progress error:",
                err
            );

            setError(
                "Unable to update preparation progress."
            );
        }
    };

    /* ================================
       DELETE
    ================================= */

    const deletePreparation = async (id) => {
        if (
            !window.confirm(
                "Delete this company preparation?"
            )
        ) {
            return;
        }

        try {
            await axios.delete(
                `${API_URL}/${id}`
            );

            setPreparations((previous) =>
                previous.filter(
                    (item) => item.id !== id
                )
            );

            setSelectedCompany(null);

            setMessage(
                "Preparation deleted successfully!"
            );

            setError("");

        } catch (err) {
            console.error(
                "Delete preparation error:",
                err
            );

            setError(
                "Unable to delete company preparation."
            );
        }
    };

    /* ================================
       LOGIN CHECK
    ================================= */

    if (!userId) {
        return (
            <div className="company-preparation-page">
                <div className="preparation-login-message">
                    <div className="preparation-login-icon">
                        🔐
                    </div>

                    <h1>Company Preparation</h1>

                    <p>
                        Please login to access your
                        company preparation data.
                    </p>
                </div>
            </div>
        );
    }

    /* ================================
       DETAILS VIEW
    ================================= */

    if (selectedCompany) {
        return (
            <div className="company-preparation-page">

                <div className="preparation-detail-top">

                    <button
                        className="preparation-back-button"
                        onClick={() =>
                            setSelectedCompany(null)
                        }
                    >
                        ← Back to Companies
                    </button>

                    <div className="preparation-detail-actions-top">

                        <button
                            className="preparation-edit-button"
                            onClick={() =>
                                handleEdit(selectedCompany)
                            }
                        >
                            ✏️ Edit
                        </button>

                        <button
                            className="preparation-delete-button"
                            onClick={() =>
                                deletePreparation(
                                    selectedCompany.id
                                )
                            }
                        >
                            🗑️ Delete
                        </button>

                    </div>

                </div>

                <div className="preparation-detail-header">

                    <div className="preparation-company-symbol">
                        {selectedCompany.companyName
                            ?.charAt(0)
                            ?.toUpperCase()}
                    </div>

                    <div className="preparation-detail-heading">

                        <span>
                            COMPANY PREPARATION
                        </span>

                        <h1>
                            {selectedCompany.companyName}
                        </h1>

                        <p>
                            {selectedCompany.role}
                        </p>

                        {selectedCompany.packageOffered && (
                            <strong>
                                💰 {selectedCompany.packageOffered}
                            </strong>
                        )}

                    </div>

                    <div className="preparation-detail-progress">

                        <span>
                            Preparation
                        </span>

                        <strong>
                            {selectedCompany.progress}%
                        </strong>

                    </div>

                </div>

                {/* Progress */}

                <div className="preparation-progress-card">

                    <div className="preparation-progress-header">

                        <div>
                            <h2>
                                Preparation Progress
                            </h2>

                            <p>
                                Keep improving your
                                company readiness.
                            </p>
                        </div>

                        <strong>
                            {selectedCompany.progress}%
                        </strong>

                    </div>

                    <div className="preparation-large-progress">

                        <div
                            style={{
                                width: `${selectedCompany.progress}%`
                            }}
                        >
                            {selectedCompany.progress > 8
                                ? `${selectedCompany.progress}%`
                                : ""}
                        </div>

                    </div>

                    <input
                        className="preparation-range"
                        type="range"
                        min="0"
                        max="100"
                        value={selectedCompany.progress}
                        onChange={(event) => {
                            const value =
                                Number(event.target.value);

                            setSelectedCompany({
                                ...selectedCompany,
                                progress: value
                            });
                        }}
                        onMouseUp={() =>
                            updateProgress(
                                selectedCompany.id,
                                selectedCompany.progress
                            )
                        }
                        onTouchEnd={() =>
                            updateProgress(
                                selectedCompany.id,
                                selectedCompany.progress
                            )
                        }
                    />

                </div>

                {/* Topics */}

                <div className="preparation-detail-grid">

                    <section className="preparation-topic-card">

                        <div className="topic-card-heading">
                            <span>🛠️</span>
                            <h2>Required Skills</h2>
                        </div>

                        <div className="topic-chip-list">

                            {getTopics(
                                selectedCompany.requiredSkills
                            ).map((skill, index) => (
                                <span key={index}>
                                    {skill}
                                </span>
                            ))}

                        </div>

                    </section>

                    <section className="preparation-topic-card">

                        <div className="topic-card-heading">
                            <span>🧮</span>
                            <h2>Aptitude Topics</h2>
                        </div>

                        <ul className="preparation-topic-list">

                            {getTopics(
                                selectedCompany.aptitudeTopics
                            ).map((topic, index) => (
                                <li key={index}>
                                    {topic}
                                </li>
                            ))}

                        </ul>

                    </section>

                    <section className="preparation-topic-card">

                        <div className="topic-card-heading">
                            <span>💻</span>
                            <h2>Technical Topics</h2>
                        </div>

                        <ul className="preparation-topic-list">

                            {getTopics(
                                selectedCompany.technicalTopics
                            ).map((topic, index) => (
                                <li key={index}>
                                    {topic}
                                </li>
                            ))}

                        </ul>

                    </section>

                    <section className="preparation-topic-card">

                        <div className="topic-card-heading">
                            <span>⌨️</span>
                            <h2>Coding Topics</h2>
                        </div>

                        <ul className="preparation-topic-list">

                            {getTopics(
                                selectedCompany.codingTopics
                            ).map((topic, index) => (
                                <li key={index}>
                                    {topic}
                                </li>
                            ))}

                        </ul>

                    </section>

                    <section className="preparation-topic-card preparation-interview-card">

                        <div className="topic-card-heading">
                            <span>🎤</span>
                            <h2>Interview Questions</h2>
                        </div>

                        <ol className="preparation-question-list">

                            {getInterviewQuestions(
                                selectedCompany.interviewQuestions
                            ).map((question, index) => (
                                <li key={index}>
                                    {question}
                                </li>
                            ))}

                        </ol>

                    </section>

                </div>

            </div>
        );
    }

    /* ================================
       MAIN PAGE
    ================================= */

    return (
        <div className="company-preparation-page">

            {/* Header */}

            <div className="preparation-page-header">

                <div>

                    <span className="preparation-badge">
                        PLACEMENT STRATEGY
                    </span>

                    <h1>
                        🎯 Company Preparation
                    </h1>

                    <p>
                        Build a focused preparation roadmap
                        for every company you target.
                    </p>

                </div>

                <div className="preparation-company-count">

                    <strong>
                        {preparations.length}
                    </strong>

                    <span>
                        Target Companies
                    </span>

                </div>

            </div>

            {/* Messages */}

            {error && (
                <div className="preparation-error">
                    ⚠️ {error}
                </div>
            )}

            {message && (
                <div className="preparation-success">
                    ✓ {message}
                </div>
            )}

            {/* Add Button */}

            {!showForm && (
                <button
                    className="preparation-add-button"
                    onClick={openAddForm}
                >
                    <span>＋</span>
                    Add Company
                </button>
            )}

            {/* Form */}

            {showForm && (

                <div className="preparation-form-card">

                    <div className="preparation-form-header">

                        <div>
                            <span>
                                {editingId
                                    ? "EDIT ROADMAP"
                                    : "NEW ROADMAP"}
                            </span>

                            <h2>
                                {editingId
                                    ? "Edit Company Preparation"
                                    : "Add Company Preparation"}
                            </h2>

                            <p>
                                Add the information you need
                                for your placement preparation.
                            </p>
                        </div>

                        <button
                            className="preparation-close-button"
                            type="button"
                            onClick={resetForm}
                        >
                            ✕
                        </button>

                    </div>

                    <form
                        className="preparation-form"
                        onSubmit={savePreparation}
                    >

                        <div className="preparation-form-grid">

                            <div className="preparation-field">

                                <label>
                                    Company Name *
                                </label>

                                <input
                                    type="text"
                                    name="companyName"
                                    placeholder="Example: TCS"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="preparation-field">

                                <label>
                                    Job Role *
                                </label>

                                <input
                                    type="text"
                                    name="role"
                                    placeholder="Example: Java Developer"
                                    value={formData.role}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="preparation-field">

                                <label>
                                    Package Offered
                                </label>

                                <input
                                    type="text"
                                    name="packageOffered"
                                    placeholder="Example: 7 LPA"
                                    value={formData.packageOffered}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="preparation-field preparation-field-full">

                                <label>
                                    Required Skills
                                </label>

                                <textarea
                                    name="requiredSkills"
                                    placeholder="Java, SQL, Spring Boot, DSA"
                                    value={formData.requiredSkills}
                                    onChange={handleChange}
                                />

                                <small>
                                    Separate skills using commas.
                                </small>

                            </div>

                            <div className="preparation-field">

                                <label>
                                    Aptitude Topics
                                </label>

                                <textarea
                                    name="aptitudeTopics"
                                    placeholder="Percentages, Time & Work, Probability"
                                    value={formData.aptitudeTopics}
                                    onChange={handleChange}
                                />

                                <small>
                                    Separate topics using commas.
                                </small>

                            </div>

                            <div className="preparation-field">

                                <label>
                                    Technical Topics
                                </label>

                                <textarea
                                    name="technicalTopics"
                                    placeholder="OOP, DBMS, Java, SQL"
                                    value={formData.technicalTopics}
                                    onChange={handleChange}
                                />

                                <small>
                                    Separate topics using commas.
                                </small>

                            </div>

                            <div className="preparation-field">

                                <label>
                                    Coding Topics
                                </label>

                                <textarea
                                    name="codingTopics"
                                    placeholder="Arrays, Strings, HashMap"
                                    value={formData.codingTopics}
                                    onChange={handleChange}
                                />

                                <small>
                                    Separate topics using commas.
                                </small>

                            </div>

                            <div className="preparation-field">

                                <label>
                                    Interview Questions
                                </label>

                                <textarea
                                    name="interviewQuestions"
                                    placeholder="Tell me about yourself | Explain your project"
                                    value={formData.interviewQuestions}
                                    onChange={handleChange}
                                />

                                <small>
                                    Separate questions using |
                                </small>

                            </div>

                        </div>

                        <div className="preparation-form-actions">

                            <button
                                type="submit"
                                className="preparation-save-button"
                            >
                                {editingId
                                    ? "💾 Update Preparation"
                                    : "💾 Save Preparation"}
                            </button>

                            <button
                                type="button"
                                className="preparation-cancel-button"
                                onClick={resetForm}
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                </div>
            )}

            {/* Company Cards */}

            {!showForm && (

                <>
                    {preparations.length === 0 ? (

                        <div className="preparation-empty">

                            <div className="preparation-empty-icon">
                                📚
                            </div>

                            <h2>
                                No company preparation yet
                            </h2>

                            <p>
                                Add your first target company
                                and start building your roadmap.
                            </p>

                            <button
                                onClick={openAddForm}
                            >
                                ＋ Add Your First Company
                            </button>

                        </div>

                    ) : (

                        <div className="preparation-company-grid">

                            {preparations.map((company) => (

                                <div
                                    className="preparation-company-card"
                                    key={company.id}
                                >

                                    <div className="preparation-card-header">

                                        <div className="preparation-card-logo">
                                            {company.companyName
                                                ?.charAt(0)
                                                ?.toUpperCase()}
                                        </div>

                                        <div className="preparation-card-title">

                                            <h2>
                                                {company.companyName}
                                            </h2>

                                            <span>
                                                {company.role}
                                            </span>

                                        </div>

                                        <span className="preparation-status">
                                            Placement
                                        </span>

                                    </div>

                                    {company.packageOffered && (
                                        <div className="preparation-package">
                                            💰 {company.packageOffered}
                                        </div>
                                    )}

                                    <div className="preparation-card-progress">

                                        <div className="preparation-card-progress-header">

                                            <span>
                                                Preparation Progress
                                            </span>

                                            <strong>
                                                {company.progress}%
                                            </strong>

                                        </div>

                                        <div className="preparation-card-progress-bar">

                                            <div
                                                style={{
                                                    width: `${company.progress}%`
                                                }}
                                            />

                                        </div>

                                    </div>

                                    <div className="preparation-card-topics">

                                        <span>
                                            🛠️ {getTopics(
                                                company.requiredSkills
                                            ).length} Skills
                                        </span>

                                        <span>
                                            🧮 {getTopics(
                                                company.aptitudeTopics
                                            ).length} Aptitude
                                        </span>

                                        <span>
                                            💻 {getTopics(
                                                company.codingTopics
                                            ).length} Coding
                                        </span>

                                    </div>

                                    <div className="preparation-card-actions">

                                        <button
                                            className="preparation-start-button"
                                            onClick={() =>
                                                setSelectedCompany(company)
                                            }
                                        >
                                            📖 Start Preparation
                                        </button>

                                        <button
                                            className="preparation-edit-small"
                                            onClick={() =>
                                                handleEdit(company)
                                            }
                                        >
                                            ✏️
                                        </button>

                                        <button
                                            className="preparation-delete-small"
                                            onClick={() =>
                                                deletePreparation(
                                                    company.id
                                                )
                                            }
                                        >
                                            🗑️
                                        </button>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}
                </>
            )}

        </div>
    );
}

export default CompanyPreparation;