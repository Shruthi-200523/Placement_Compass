import { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import "../App.css";

const API_URL = "http://localhost:8080/api/aptitude";

function Aptitude() {

    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [answers, setAnswers] = useState({});
    const [quizFinished, setQuizFinished] = useState(false);

    const [category, setCategory] = useState("All");
    const [difficulty, setDifficulty] = useState("All");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        question: "",
        category: "Quantitative Aptitude",
        difficulty: "Easy",
        optiona: "",
        optionb: "",
        optionc: "",
        optiond: "",
        correctAnswer: ""
    });

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.userId;

    /* ================================
       LOAD QUESTIONS
    ================================= */

    const loadQuestions = async () => {

        try {

            if (!userId) {
                setError("Please login to access aptitude questions.");
                setLoading(false);
                return;
            }

            setLoading(true);

            const response = await axios.get(API_URL);

            setQuestions(response.data);
            setError("");

        } catch (error) {

            console.error("Aptitude loading error:", error);

            setError(
                "Unable to load aptitude questions. Please check the backend."
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

        setFormData({
            question: "",
            category: "Quantitative Aptitude",
            difficulty: "Easy",
            optiona: "",
            optionb: "",
            optionc: "",
            optiond: "",
            correctAnswer: ""
        });

        setEditingId(null);
        setShowForm(false);
    };

    const handleFormChange = (event) => {

        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));
    };

    const handleSubmitQuestion = async (event) => {

        event.preventDefault();

        if (!userId) {
            setError("Please login first.");
            return;
        }

        if (!formData.question.trim()) {
            setError("Please enter the question.");
            return;
        }

        if (
            !formData.optiona.trim() ||
            !formData.optionb.trim() ||
            !formData.optionc.trim() ||
            !formData.optiond.trim()
        ) {
            setError("Please enter all four options.");
            return;
        }

        if (!formData.correctAnswer) {
            setError("Please select the correct answer.");
            return;
        }

        try {

            if (editingId) {

                await axios.put(
                    `${API_URL}/${editingId}`,
                    formData
                );

            } else {

                await axios.post(
                    API_URL,
                    formData
                );

            }

            resetForm();
            setError("");

            await loadQuestions();

        } catch (error) {

            console.error(
                "Save aptitude question error:",
                error
            );

            setError(
                "Unable to save aptitude question."
            );
        }
    };

    const handleEdit = (question) => {

        setEditingId(question.id);

        setFormData({
            question: question.question || "",
            category: question.category || "Quantitative Aptitude",
            difficulty: question.difficulty || "Easy",
            optiona: question.optiona || "",
            optionb: question.optionb || "",
            optionc: question.optionc || "",
            optiond: question.optiond || "",
            correctAnswer: question.correctAnswer || ""
        });

        setShowForm(true);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this aptitude question?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await axios.delete(
                `${API_URL}/${id}`
            );

            setAnswers((previousAnswers) => {

                const updatedAnswers = {
                    ...previousAnswers
                };

                delete updatedAnswers[id];

                return updatedAnswers;
            });

            if (editingId === id) {
                resetForm();
            }

            setError("");

            await loadQuestions();

            setCurrentIndex(0);
            setSelectedAnswer("");
            setQuizFinished(false);

        } catch (error) {

            console.error(
                "Delete aptitude question error:",
                error
            );

            setError(
                "Unable to delete aptitude question."
            );
        }
    };

    /* ================================
       FILTERING
    ================================= */

    const filteredQuestions = questions.filter((question) => {

        const categoryMatch =
            category === "All" ||
            question.category === category;

        const difficultyMatch =
            difficulty === "All" ||
            question.difficulty === difficulty;

        return categoryMatch && difficultyMatch;
    });

    const currentQuestion =
        filteredQuestions[currentIndex];

    const categories = [
        "All",
        ...new Set(
            questions.map(
                (question) => question.category
            )
        )
    ];

    const difficulties = [
        "All",
        "Easy",
        "Medium",
        "Hard"
    ];

    /* ================================
       QUIZ
    ================================= */

    const handleAnswer = (answer) => {

        if (!currentQuestion) {
            return;
        }

        setSelectedAnswer(answer);

        setAnswers((previousAnswers) => ({
            ...previousAnswers,
            [currentQuestion.id]: answer
        }));
    };

    const handleNext = () => {

        if (
            currentIndex <
            filteredQuestions.length - 1
        ) {

            setCurrentIndex(currentIndex + 1);

            const nextQuestion =
                filteredQuestions[currentIndex + 1];

            setSelectedAnswer(
                answers[nextQuestion.id] || ""
            );

        } else {

            setQuizFinished(true);

        }
    };

    const handlePrevious = () => {

        if (currentIndex > 0) {

            setCurrentIndex(currentIndex - 1);

            const previousQuestion =
                filteredQuestions[currentIndex - 1];

            setSelectedAnswer(
                answers[previousQuestion.id] || ""
            );
        }
    };

    const calculateScore = () => {

        let score = 0;

        filteredQuestions.forEach((question) => {

            if (
                answers[question.id] ===
                question.correctAnswer
            ) {
                score++;
            }

        });

        return score;
    };

    const restartQuiz = () => {

        setCurrentIndex(0);
        setSelectedAnswer("");
        setAnswers({});
        setQuizFinished(false);
    };

    const changeCategory = (value) => {

        setCategory(value);
        setCurrentIndex(0);
        setSelectedAnswer("");
        setAnswers({});
        setQuizFinished(false);
    };

    const changeDifficulty = (value) => {

        setDifficulty(value);
        setCurrentIndex(0);
        setSelectedAnswer("");
        setAnswers({});
        setQuizFinished(false);
    };

    /* ================================
       LOADING
    ================================= */

    if (loading) {

        return (
            <div className="aptitude-page">

                <div className="aptitude-loading">

                    <div className="aptitude-loading-icon">
                        🧮
                    </div>

                    <h2>
                        Loading Aptitude Practice...
                    </h2>

                    <p>
                        Preparing your questions.
                    </p>

                </div>

            </div>
        );
    }

    /* ================================
       ERROR
    ================================= */

    if (error && questions.length === 0) {

        return (
            <div className="aptitude-page">

                <div className="aptitude-error-card">

                    <div>
                        ⚠️
                    </div>

                    <h1>
                        Aptitude Practice
                    </h1>

                    <p>
                        {error}
                    </p>

                    <button
                        onClick={loadQuestions}
                    >
                        🔄 Try Again
                    </button>

                </div>

            </div>
        );
    }

    /* ================================
       QUIZ RESULT
    ================================= */

    if (quizFinished) {

        const score = calculateScore();

        const total =
            filteredQuestions.length;

        const percentage =
            total === 0
                ? 0
                : Math.round(
                    (score / total) * 100
                );

        return (
            <div className="aptitude-page">

                <div className="quiz-result">

                    <div className="result-icon">
                        {percentage >= 80
                            ? "🏆"
                            : percentage >= 60
                                ? "🎉"
                                : "📚"}
                    </div>

                    <span className="result-badge">
                        QUIZ COMPLETED
                    </span>

                    <h1>
                        Great effort!
                    </h1>

                    <div className="score-circle">
                        {percentage}%
                    </div>

                    <h2>
                        Your Score: {score} / {total}
                    </h2>

                    <p>
                        {percentage >= 80
                            ? "Excellent! Keep up the great work. 🔥"
                            : percentage >= 60
                                ? "Good job! A little more practice will make you stronger."
                                : "Keep practicing. Your score will improve with consistency!"}
                    </p>

                    <button
                        onClick={restartQuiz}
                    >
                        🔄 Try Again
                    </button>

                </div>

            </div>
        );
    }

    /* ================================
       MAIN PAGE
    ================================= */

    return (
        <div className="aptitude-page">

            {/* HEADER */}

            <div className="aptitude-page-header">

                <div>

                    <span className="aptitude-badge">
                        PLACEMENT PRACTICE
                    </span>

                    <h1>
                        🧮 Aptitude Practice
                    </h1>

                    <p>
                        Practice placement aptitude questions,
                        improve your speed and track your progress.
                    </p>

                </div>

                <div className="aptitude-count">

                    <strong>
                        {questions.length}
                    </strong>

                    <span>
                        Questions
                    </span>

                </div>

            </div>

            {/* ERROR */}

            {error && (
                <div className="aptitude-inline-error">
                    ⚠️ {error}
                </div>
            )}

            {/* QUESTION MANAGEMENT */}

            <div className="aptitude-management">

                <div className="aptitude-management-header">

                    <div>

                        <span className="section-label">
                            QUESTION BANK
                        </span>

                        <h2>
                            📚 Question Management
                        </h2>

                        <p>
                            Create and manage your personal aptitude questions.
                        </p>

                    </div>

                    <button
                        className="aptitude-add-button"
                        onClick={() => {

                            if (showForm) {
                                resetForm();
                            } else {
                                setShowForm(true);
                            }

                        }}
                    >
                        {showForm
                            ? "✖ Close"
                            : "＋ Add Question"}
                    </button>

                </div>

                {/* FORM */}

                {showForm && (

                    <form
                        className="aptitude-form"
                        onSubmit={handleSubmitQuestion}
                    >

                        <div className="aptitude-form-heading">

                            <div>

                                <span>
                                    {editingId
                                        ? "EDIT QUESTION"
                                        : "NEW QUESTION"}
                                </span>

                                <h2>
                                    {editingId
                                        ? "Edit Aptitude Question"
                                        : "Add Aptitude Question"}
                                </h2>

                            </div>

                        </div>

                        <div className="aptitude-form-grid">

                            <div className="aptitude-field aptitude-field-full">

                                <label>
                                    Question *
                                </label>

                                <textarea
                                    name="question"
                                    placeholder="Enter the aptitude question..."
                                    value={formData.question}
                                    onChange={handleFormChange}
                                    rows="4"
                                    required
                                />

                            </div>

                            <div className="aptitude-field">

                                <label>
                                    Category
                                </label>

                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleFormChange}
                                >
                                    <option value="Quantitative Aptitude">
                                        Quantitative Aptitude
                                    </option>

                                    <option value="Logical Reasoning">
                                        Logical Reasoning
                                    </option>

                                    <option value="Verbal Ability">
                                        Verbal Ability
                                    </option>

                                    <option value="Probability">
                                        Probability
                                    </option>

                                    <option value="Time and Work">
                                        Time and Work
                                    </option>

                                    <option value="Time Speed Distance">
                                        Time Speed Distance
                                    </option>

                                    <option value="Percentages">
                                        Percentages
                                    </option>

                                    <option value="Profit and Loss">
                                        Profit and Loss
                                    </option>

                                    <option value="Ratio and Proportion">
                                        Ratio and Proportion
                                    </option>

                                </select>

                            </div>

                            <div className="aptitude-field">

                                <label>
                                    Difficulty
                                </label>

                                <select
                                    name="difficulty"
                                    value={formData.difficulty}
                                    onChange={handleFormChange}
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

                            <div className="aptitude-field">

                                <label>
                                    Option A *
                                </label>

                                <input
                                    type="text"
                                    name="optiona"
                                    placeholder="Enter option A"
                                    value={formData.optiona}
                                    onChange={handleFormChange}
                                    required
                                />

                            </div>

                            <div className="aptitude-field">

                                <label>
                                    Option B *
                                </label>

                                <input
                                    type="text"
                                    name="optionb"
                                    placeholder="Enter option B"
                                    value={formData.optionb}
                                    onChange={handleFormChange}
                                    required
                                />

                            </div>

                            <div className="aptitude-field">

                                <label>
                                    Option C *
                                </label>

                                <input
                                    type="text"
                                    name="optionc"
                                    placeholder="Enter option C"
                                    value={formData.optionc}
                                    onChange={handleFormChange}
                                    required
                                />

                            </div>

                            <div className="aptitude-field">

                                <label>
                                    Option D *
                                </label>

                                <input
                                    type="text"
                                    name="optiond"
                                    placeholder="Enter option D"
                                    value={formData.optiond}
                                    onChange={handleFormChange}
                                    required
                                />

                            </div>

                            <div className="aptitude-field aptitude-field-full">

                                <label>
                                    Correct Answer *
                                </label>

                                <select
                                    name="correctAnswer"
                                    value={formData.correctAnswer}
                                    onChange={handleFormChange}
                                    required
                                >

                                    <option value="">
                                        Select Correct Answer
                                    </option>

                                    <option value="A">
                                        A
                                    </option>

                                    <option value="B">
                                        B
                                    </option>

                                    <option value="C">
                                        C
                                    </option>

                                    <option value="D">
                                        D
                                    </option>

                                </select>

                            </div>

                        </div>

                        <div className="aptitude-form-buttons">

                            <button
                                type="submit"
                                className="aptitude-save-button"
                            >
                                {editingId
                                    ? "💾 Update Question"
                                    : "💾 Add Question"}
                            </button>

                            <button
                                type="button"
                                className="aptitude-cancel-button"
                                onClick={resetForm}
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                )}

            </div>

            {/* QUESTION BANK */}

            <div className="aptitude-question-list">

                <div className="aptitude-list-header">

                    <div>

                        <span className="section-label">
                            YOUR QUESTION BANK
                        </span>

                        <h2>
                            📋 Your Questions
                        </h2>

                    </div>

                    <span className="question-count-badge">
                        {questions.length}
                    </span>

                </div>

                {questions.length === 0 ? (

                    <div className="empty-aptitude">

                        <div className="empty-aptitude-icon">
                            📚
                        </div>

                        <h2>
                            No questions available
                        </h2>

                        <p>
                            Click "Add Question" to create
                            your first aptitude question.
                        </p>

                    </div>

                ) : (

                    <div className="aptitude-question-grid">

                        {questions.map((question) => (

                            <div
                                className="aptitude-question-card"
                                key={question.id}
                            >

                                <div className="question-card-top">

                                    <span className="question-number">
                                        Q
                                    </span>

                                    <div className="question-tags">

                                        <span>
                                            📚 {question.category}
                                        </span>

                                        <span
                                            className={`difficulty-${question.difficulty?.toLowerCase()}`}
                                        >
                                            🎯 {question.difficulty}
                                        </span>

                                    </div>

                                </div>

                                <h3>
                                    {question.question}
                                </h3>

                                <div className="aptitude-question-options">

                                    <div>
                                        <strong>A</strong>
                                        <span>
                                            {question.optiona}
                                        </span>
                                    </div>

                                    <div>
                                        <strong>B</strong>
                                        <span>
                                            {question.optionb}
                                        </span>
                                    </div>

                                    <div>
                                        <strong>C</strong>
                                        <span>
                                            {question.optionc}
                                        </span>
                                    </div>

                                    <div>
                                        <strong>D</strong>
                                        <span>
                                            {question.optiond}
                                        </span>
                                    </div>

                                </div>

                                <div className="correct-answer">
                                    <strong>
                                        ✓ Correct Answer:
                                    </strong>

                                    <span>
                                        {question.correctAnswer}
                                    </span>
                                </div>

                                <div className="aptitude-question-actions">

                                    <button
                                        className="aptitude-edit-button"
                                        onClick={() =>
                                            handleEdit(question)
                                        }
                                    >
                                        ✏️ Edit
                                    </button>

                                    <button
                                        className="aptitude-delete-button"
                                        onClick={() =>
                                            handleDelete(question.id)
                                        }
                                    >
                                        🗑️ Delete
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

            {/* FILTERS */}

            <div className="aptitude-filters">

                <div className="filter-heading">

                    <div>

                        <span className="section-label">
                            PRACTICE SETTINGS
                        </span>

                        <h2>
                            🎯 Choose Your Quiz
                        </h2>

                    </div>

                    <span>
                        {filteredQuestions.length} questions
                    </span>

                </div>

                <div className="filter-controls">

                    <div className="filter-group">

                        <label>
                            Category
                        </label>

                        <select
                            value={category}
                            onChange={(event) =>
                                changeCategory(
                                    event.target.value
                                )
                            }
                        >

                            {categories.map((item) => (

                                <option
                                    key={item}
                                    value={item}
                                >
                                    {item}
                                </option>

                            ))}

                        </select>

                    </div>

                    <div className="filter-group">

                        <label>
                            Difficulty
                        </label>

                        <select
                            value={difficulty}
                            onChange={(event) =>
                                changeDifficulty(
                                    event.target.value
                                )
                            }
                        >

                            {difficulties.map((item) => (

                                <option
                                    key={item}
                                    value={item}
                                >
                                    {item}
                                </option>

                            ))}

                        </select>

                    </div>

                </div>

            </div>

            {/* QUIZ */}

            {filteredQuestions.length === 0 ? (

                <div className="empty-aptitude">

                    <div className="empty-aptitude-icon">
                        🔎
                    </div>

                    <h2>
                        No questions match the selected filters
                    </h2>

                    <p>
                        Add questions or change the filters.
                    </p>

                </div>

            ) : (

                <div className="quiz-card">

                    <div className="quiz-header">

                        <div>

                            <span>
                                QUESTION
                            </span>

                            <strong>
                                {currentIndex + 1} /{" "}
                                {filteredQuestions.length}
                            </strong>

                        </div>

                        <span className="quiz-category">
                            {currentQuestion.category}
                        </span>

                    </div>

                    <div className="quiz-progress">

                        <div
                            style={{
                                width: `${
                                    ((currentIndex + 1) /
                                        filteredQuestions.length) *
                                    100
                                }%`
                            }}
                        />

                    </div>

                    <div className="quiz-question-area">

                        <span className="quiz-question-label">
                            Question {currentIndex + 1}
                        </span>

                        <h2 className="quiz-question">
                            {currentQuestion.question}
                        </h2>

                    </div>

                    <div className="quiz-options">

                        {[
                            ["A", currentQuestion.optiona],
                            ["B", currentQuestion.optionb],
                            ["C", currentQuestion.optionc],
                            ["D", currentQuestion.optiond]
                        ].map(([letter, text]) => (

                            <button
                                key={letter}
                                className={
                                    selectedAnswer === letter
                                        ? "selected-option"
                                        : ""
                                }
                                onClick={() =>
                                    handleAnswer(letter)
                                }
                            >

                                <strong>
                                    {letter}
                                </strong>

                                <span>
                                    {text}
                                </span>

                                {selectedAnswer === letter && (
                                    <span className="option-selected-icon">
                                        ✓
                                    </span>
                                )}

                            </button>

                        ))}

                    </div>

                    <div className="quiz-navigation">

                        <button
                            onClick={handlePrevious}
                            disabled={currentIndex === 0}
                            className="quiz-previous"
                        >
                            ← Previous
                        </button>

                        <span className="quiz-answer-status">
                            {selectedAnswer
                                ? "Answer selected ✓"
                                : "Select an answer to continue"}
                        </span>

                        <button
                            onClick={handleNext}
                            disabled={!selectedAnswer}
                            className="quiz-next"
                        >
                            {currentIndex ===
                                filteredQuestions.length - 1
                                ? "Finish Quiz ✓"
                                : "Next →"}
                        </button>

                    </div>

                </div>

            )}

        </div>
    );
}

export default Aptitude;