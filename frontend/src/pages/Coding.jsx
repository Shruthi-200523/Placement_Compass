import { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import "../App.css";

const API_URL = `${import.meta.env.VITE_API_URL}/api/coding`;

function Coding() {

    const [questions, setQuestions] = useState([]);

    const [title, setTitle] = useState("");
    const [topic, setTopic] = useState("Arrays");
    const [difficulty, setDifficulty] = useState("Easy");
    const [problemLink, setProblemLink] = useState("");

    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.userId;

    /* ================================
       LOAD QUESTIONS
    ================================= */

    const loadQuestions = async () => {

        if (!userId) {
            setError("Please login first.");
            setLoading(false);
            return;
        }

        try {

            setLoading(true);

            const response = await axios.get(API_URL);

            setQuestions(response.data);
            setError("");

        } catch (error) {

            console.error(
                "Load coding questions error:",
                error
            );

            setError(
                "Unable to load coding questions."
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        loadQuestions();
    }, [userId]);

    /* ================================
       FORM
    ================================= */

    const resetForm = () => {

        setTitle("");
        setTopic("Arrays");
        setDifficulty("Easy");
        setProblemLink("");
        setEditingId(null);
        setError("");

    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        if (!userId) {
            setError("Please login first.");
            return;
        }

        if (!title.trim()) {
            setError("Please enter the question title.");
            return;
        }

        try {

            if (editingId) {

                const question = questions.find(
                    (item) => item.id === editingId
                );

                await axios.put(
                    `${API_URL}/${editingId}`,
                    {
                        title: title.trim(),
                        topic: topic,
                        difficulty: difficulty,
                        problemLink: problemLink.trim(),
                        solved: question?.solved || false
                    }
                );

            } else {

                await axios.post(
                    API_URL,
                    {
                        title: title.trim(),
                        topic: topic,
                        difficulty: difficulty,
                        problemLink: problemLink.trim(),
                        solved: false
                    }
                );

            }

            resetForm();

            await loadQuestions();

        } catch (error) {

            console.error(
                "Save coding question error:",
                error
            );

            setError(
                editingId
                    ? "Unable to update coding question."
                    : "Unable to add coding question."
            );

        }
    };

    const handleEdit = (question) => {

        setEditingId(question.id);

        setTitle(question.title || "");
        setTopic(question.topic || "Arrays");
        setDifficulty(question.difficulty || "Easy");
        setProblemLink(question.problemLink || "");

        setError("");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    /* ================================
       TOGGLE SOLVED
    ================================= */

    const handleToggle = async (id) => {

        if (!userId) {
            setError("Please login first.");
            return;
        }

        try {

            await axios.put(
                `${API_URL}/${id}/toggle`
            );

            await loadQuestions();

        } catch (error) {

            console.error(
                "Toggle coding question error:",
                error
            );

            setError(
                "Unable to update solved status."
            );

        }
    };

    /* ================================
       DELETE
    ================================= */

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Delete this coding question?"
        );

        if (!confirmed) {
            return;
        }

        if (!userId) {
            setError("Please login first.");
            return;
        }

        try {

            await axios.delete(
                `${API_URL}/${id}`
            );

            if (editingId === id) {
                resetForm();
            }

            setError("");

            await loadQuestions();

        } catch (error) {

            console.error(
                "Delete coding question error:",
                error
            );

            setError(
                "Unable to delete coding question."
            );

        }
    };

    /* ================================
       PROGRESS
    ================================= */

    const solvedCount = questions.filter(
        (question) => question.solved
    ).length;

    const totalCount = questions.length;

    const progress =
        totalCount === 0
            ? 0
            : Math.round(
                (solvedCount / totalCount) * 100
            );

    const remainingCount =
        totalCount - solvedCount;

    /* ================================
       LOADING
    ================================= */

    if (loading) {

        return (
            <div className="coding-page">

                <div className="coding-loading">

                    <div className="coding-loading-icon">
                        💻
                    </div>

                    <h2>
                        Loading Coding Practice...
                    </h2>

                    <p>
                        Preparing your coding questions.
                    </p>

                </div>

            </div>
        );
    }

    /* ================================
       MAIN PAGE
    ================================= */

    return (

        <div className="coding-page">

            {/* =========================
                HEADER
            ========================== */}

            <div className="coding-page-header">

                <div>

                    <span className="coding-badge">
                        DSA & CODING PRACTICE
                    </span>

                    <h1>
                        💻 Coding Practice
                    </h1>

                    <p className="coding-subtitle">
                        Practice coding questions, track solved
                        problems and stay consistent with your
                        placement preparation.
                    </p>

                </div>

                <div className="coding-total-box">

                    <strong>
                        {totalCount}
                    </strong>

                    <span>
                        Total Questions
                    </span>

                </div>

            </div>

            {/* =========================
                ERROR
            ========================== */}

            {error && (

                <div className="coding-error">
                    ⚠️ {error}
                </div>

            )}

            {/* =========================
                PROGRESS
            ========================== */}

            <div className="coding-progress-card">

                <div className="coding-progress-top">

                    <div>

                        <span className="coding-section-label">
                            YOUR PROGRESS
                        </span>

                        <h2>
                            Coding Progress
                        </h2>

                    </div>

                    <div className="coding-progress-percentage">
                        {progress}%
                    </div>

                </div>

                <div className="coding-progress-bar">

                    <div
                        className="coding-progress-fill"
                        style={{
                            width: `${progress}%`
                        }}
                    />

                </div>

                <div className="coding-progress-footer">

                    <span>
                        ✅ {solvedCount} solved
                    </span>

                    <span>
                        ⏳ {remainingCount} remaining
                    </span>

                </div>

            </div>

            {/* =========================
                ADD / EDIT FORM
            ========================== */}

            <div className="coding-form-card">

                <div className="coding-form-header">

                    <div>

                        <span className="coding-section-label">
                            QUESTION BANK
                        </span>

                        <h2>
                            {editingId
                                ? "✏️ Edit Coding Question"
                                : "➕ Add Coding Question"}
                        </h2>

                        <p>
                            {editingId
                                ? "Update the selected coding problem."
                                : "Add a problem you want to practice."}
                        </p>

                    </div>

                    {editingId && (

                        <span className="editing-badge">
                            EDITING
                        </span>

                    )}

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="coding-form"
                >

                    <div className="coding-field coding-field-full">

                        <label>
                            Problem Title
                        </label>

                        <input
                            type="text"
                            placeholder="Example: Two Sum"
                            value={title}
                            onChange={(event) =>
                                setTitle(event.target.value)
                            }
                        />

                    </div>

                    <div className="coding-form-grid">

                        <div className="coding-field">

                            <label>
                                Topic
                            </label>

                            <select
                                value={topic}
                                onChange={(event) =>
                                    setTopic(event.target.value)
                                }
                            >

                                <option value="Arrays">
                                    Arrays
                                </option>

                                <option value="Strings">
                                    Strings
                                </option>

                                <option value="Hashing">
                                    Hashing
                                </option>

                                <option value="Two Pointers">
                                    Two Pointers
                                </option>

                                <option value="Sliding Window">
                                    Sliding Window
                                </option>

                                <option value="Binary Search">
                                    Binary Search
                                </option>

                                <option value="Recursion">
                                    Recursion
                                </option>

                                <option value="Backtracking">
                                    Backtracking
                                </option>

                                <option value="Dynamic Programming">
                                    Dynamic Programming
                                </option>

                                <option value="Greedy">
                                    Greedy
                                </option>

                                <option value="Graphs">
                                    Graphs
                                </option>

                            </select>

                        </div>

                        <div className="coding-field">

                            <label>
                                Difficulty
                            </label>

                            <select
                                value={difficulty}
                                onChange={(event) =>
                                    setDifficulty(event.target.value)
                                }
                            >

                                <option value="Easy">
                                    Easy
                                </option>

                                <option value="Medium">
                                    Medium
                                </option>

                                <option value="Hard">
                                    Hard
                                </option>

                            </select>

                        </div>

                    </div>

                    <div className="coding-field">

                        <label>
                            Problem Link
                            <span>
                                Optional
                            </span>
                        </label>

                        <input
                            type="url"
                            placeholder="https://leetcode.com/..."
                            value={problemLink}
                            onChange={(event) =>
                                setProblemLink(event.target.value)
                            }
                        />

                    </div>

                    <div className="coding-form-buttons">

                        <button
                            type="submit"
                            className="coding-save-button"
                        >
                            {editingId
                                ? "💾 Update Question"
                                : "＋ Add Question"}
                        </button>

                        {editingId && (

                            <button
                                type="button"
                                className="coding-cancel-button"
                                onClick={resetForm}
                            >
                                Cancel
                            </button>

                        )}

                    </div>

                </form>

            </div>

            {/* =========================
                QUESTION LIST
            ========================== */}

            <div className="coding-list-section">

                <div className="coding-list-header">

                    <div>

                        <span className="coding-section-label">
                            YOUR PROBLEMS
                        </span>

                        <h2>
                            📚 Coding Questions
                        </h2>

                    </div>

                    <span className="coding-count-badge">
                        {totalCount} Questions
                    </span>

                </div>

                {questions.length === 0 ? (

                    <div className="empty-coding">

                        <div className="empty-coding-icon">
                            💡
                        </div>

                        <h2>
                            No coding questions yet
                        </h2>

                        <p>
                            Add your first problem above and
                            start building your coding practice list.
                        </p>

                    </div>

                ) : (

                    <div className="coding-question-grid">

                        {questions.map((question) => (

                            <div
                                className={`coding-question-card ${
                                    question.solved
                                        ? "coding-question-solved"
                                        : ""
                                }`}
                                key={question.id}
                            >

                                <div className="coding-card-header">

                                    <div className="coding-problem-icon">
                                        {question.solved
                                            ? "✓"
                                            : "💻"}
                                    </div>

                                    <div className="coding-card-status">

                                        <span
                                            className={
                                                question.solved
                                                    ? "solved-badge"
                                                    : "pending-badge"
                                            }
                                        >
                                            {question.solved
                                                ? "SOLVED"
                                                : "NOT SOLVED"}
                                        </span>

                                    </div>

                                </div>

                                <h3
                                    className={
                                        question.solved
                                            ? "solved-title"
                                            : ""
                                    }
                                >
                                    {question.title}
                                </h3>

                                <div className="coding-info">

                                    <span className="coding-topic-badge">
                                        📚 {question.topic}
                                    </span>

                                    <span
                                        className={`coding-difficulty-${question.difficulty?.toLowerCase()}`}
                                    >
                                        🎯 {question.difficulty}
                                    </span>

                                </div>

                                {question.problemLink && (

                                    <a
                                        className="coding-problem-link"
                                        href={question.problemLink}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        🔗 Open Problem
                                    </a>

                                )}

                                <div className="coding-card-actions">

                                    <button
                                        className={
                                            question.solved
                                                ? "mark-unsolved-button"
                                                : "mark-solved-button"
                                        }
                                        onClick={() =>
                                            handleToggle(question.id)
                                        }
                                    >
                                        {question.solved
                                            ? "↩ Mark Unsolved"
                                            : "✓ Mark Solved"}
                                    </button>

                                    <button
                                        className="coding-edit-button"
                                        onClick={() =>
                                            handleEdit(question)
                                        }
                                    >
                                        ✏️ Edit
                                    </button>

                                    <button
                                        className="coding-delete-button"
                                        onClick={() =>
                                            handleDelete(question.id)
                                        }
                                    >
                                        🗑️
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}

export default Coding;