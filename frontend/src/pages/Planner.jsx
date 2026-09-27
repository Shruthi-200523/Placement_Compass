import { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import "../App.css";

const API_URL = "http://localhost:8080/api/tasks";

function Planner() {

    const [tasks, setTasks] = useState([]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [dueDate, setDueDate] = useState("");

    const [editingId, setEditingId] = useState(null);
    const [filter, setFilter] = useState("All");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.userId;

    /* ================================
       LOAD TASKS
    ================================= */

    const loadTasks = async () => {

        if (!userId) {
            setError("Please login first.");
            setLoading(false);
            return;
        }

        try {

            setLoading(true);

            const response = await axios.get(API_URL);

            setTasks(response.data);
            setError("");

        } catch (error) {

            console.error(
                "Load tasks error:",
                error
            );

            setError(
                "Unable to load planner tasks."
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        loadTasks();
    }, [userId]);

    /* ================================
       RESET FORM
    ================================= */

    const resetForm = () => {

        setTitle("");
        setDescription("");
        setPriority("Medium");
        setDueDate("");
        setEditingId(null);
        setError("");

    };

    /* ================================
       ADD / UPDATE TASK
    ================================= */

    const handleSubmit = async (event) => {

        event.preventDefault();

        if (!userId) {
            setError("Please login first.");
            return;
        }

        if (!title.trim()) {
            setError("Please enter a task title.");
            return;
        }

        try {

            const taskData = {
                title: title.trim(),
                description: description.trim(),
                priority: priority,
                dueDate: dueDate,
                completed: editingId
                    ? tasks.find(
                        (task) => task.id === editingId
                    )?.completed ?? false
                    : false
            };

            if (editingId) {

                await axios.put(
                    `${API_URL}/${editingId}`,
                    taskData
                );

            } else {

                await axios.post(
                    API_URL,
                    taskData
                );

            }

            resetForm();

            await loadTasks();

        } catch (error) {

            console.error(
                "Save task error:",
                error
            );

            setError(
                editingId
                    ? "Unable to update task."
                    : "Unable to add task."
            );

        }
    };

    /* ================================
       EDIT TASK
    ================================= */

    const handleEdit = (task) => {

        setEditingId(task.id);

        setTitle(task.title || "");
        setDescription(task.description || "");
        setPriority(task.priority || "Medium");
        setDueDate(task.dueDate || "");

        setError("");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    /* ================================
       TOGGLE TASK
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

            await loadTasks();

        } catch (error) {

            console.error(
                "Toggle task error:",
                error
            );

            setError(
                "Unable to update task status."
            );

        }
    };

    /* ================================
       DELETE TASK
    ================================= */

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Delete this task?"
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

            await loadTasks();

        } catch (error) {

            console.error(
                "Delete task error:",
                error
            );

            setError(
                "Unable to delete task."
            );

        }
    };

    /* ================================
       FILTER
    ================================= */

    const filteredTasks =
        filter === "All"
            ? tasks
            : filter === "Completed"
                ? tasks.filter(
                    (task) => task.completed
                )
                : filter === "Pending"
                    ? tasks.filter(
                        (task) => !task.completed
                    )
                    : tasks.filter(
                        (task) =>
                            task.priority === filter
                    );

    /* ================================
       STATISTICS
    ================================= */

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
        (task) => task.completed
    ).length;

    const pendingTasks =
        totalTasks - completedTasks;

    const progress =
        totalTasks === 0
            ? 0
            : Math.round(
                (completedTasks / totalTasks) * 100
            );

    const highPriorityTasks = tasks.filter(
        (task) =>
            task.priority === "High" &&
            !task.completed
    ).length;

    /* ================================
       LOADING
    ================================= */

    if (loading) {

        return (

            <div className="planner-page">

                <div className="planner-loading">

                    <div className="planner-loading-icon">
                        📅
                    </div>

                    <h2>
                        Loading Planner...
                    </h2>

                    <p>
                        Preparing your placement tasks.
                    </p>

                </div>

            </div>

        );
    }

    /* ================================
       MAIN PAGE
    ================================= */

    return (

        <div className="planner-page">

            {/* =========================
                HEADER
            ========================== */}

            <div className="planner-header">

                <div>

                    <span className="planner-badge">
                        PLACEMENT PLANNER
                    </span>

                    <h1>
                        📅 My Study Planner
                    </h1>

                    <p>
                        Organize your preparation tasks,
                        track your progress and stay consistent.
                    </p>

                </div>

                <div className="planner-total-box">

                    <strong>
                        {totalTasks}
                    </strong>

                    <span>
                        Total Tasks
                    </span>

                </div>

            </div>

            {/* =========================
                ERROR
            ========================== */}

            {error && (

                <div className="planner-error">
                    ⚠️ {error}
                </div>

            )}

            {/* =========================
                STATISTICS
            ========================== */}

            <div className="planner-stats">

                <div className="planner-stat-card">

                    <div className="planner-stat-icon">
                        📋
                    </div>

                    <div>

                        <span>
                            TOTAL
                        </span>

                        <strong>
                            {totalTasks}
                        </strong>

                    </div>

                </div>

                <div className="planner-stat-card planner-stat-success">

                    <div className="planner-stat-icon">
                        ✅
                    </div>

                    <div>

                        <span>
                            COMPLETED
                        </span>

                        <strong>
                            {completedTasks}
                        </strong>

                    </div>

                </div>

                <div className="planner-stat-card planner-stat-warning">

                    <div className="planner-stat-icon">
                        ⏳
                    </div>

                    <div>

                        <span>
                            PENDING
                        </span>

                        <strong>
                            {pendingTasks}
                        </strong>

                    </div>

                </div>

                <div className="planner-stat-card planner-stat-danger">

                    <div className="planner-stat-icon">
                        🔥
                    </div>

                    <div>

                        <span>
                            HIGH PRIORITY
                        </span>

                        <strong>
                            {highPriorityTasks}
                        </strong>

                    </div>

                </div>

            </div>

            {/* =========================
                PROGRESS
            ========================== */}

            <div className="planner-progress-card">

                <div className="planner-progress-top">

                    <div>

                        <span className="planner-section-label">
                            PREPARATION PROGRESS
                        </span>

                        <h2>
                            Overall Task Progress
                        </h2>

                    </div>

                    <strong>
                        {progress}%
                    </strong>

                </div>

                <div className="planner-progress-bar">

                    <div
                        className="planner-progress-fill"
                        style={{
                            width: `${progress}%`
                        }}
                    />

                </div>

                <p>
                    {completedTasks} of {totalTasks} tasks completed
                </p>

            </div>

            {/* =========================
                ADD / EDIT FORM
            ========================== */}

            <div className="planner-form-card">

                <div className="planner-form-header">

                    <div>

                        <span className="planner-section-label">
                            TASK MANAGEMENT
                        </span>

                        <h2>
                            {editingId
                                ? "✏️ Edit Task"
                                : "➕ Add New Task"}
                        </h2>

                        <p>
                            {editingId
                                ? "Update your preparation task."
                                : "Create a task for your placement preparation."}
                        </p>

                    </div>

                    {editingId && (

                        <span className="planner-editing-badge">
                            EDITING
                        </span>

                    )}

                </div>

                <form
                    className="planner-form"
                    onSubmit={handleSubmit}
                >

                    <div className="planner-field planner-field-full">

                        <label>
                            Task Title
                        </label>

                        <input
                            type="text"
                            placeholder="Example: Complete 20 Java DSA problems"
                            value={title}
                            onChange={(event) =>
                                setTitle(event.target.value)
                            }
                        />

                    </div>

                    <div className="planner-field planner-field-full">

                        <label>
                            Description
                            <span>
                                Optional
                            </span>
                        </label>

                        <textarea
                            placeholder="Add some details about this task..."
                            value={description}
                            onChange={(event) =>
                                setDescription(event.target.value)
                            }
                            rows="3"
                        />

                    </div>

                    <div className="planner-form-grid">

                        <div className="planner-field">

                            <label>
                                Priority
                            </label>

                            <select
                                value={priority}
                                onChange={(event) =>
                                    setPriority(event.target.value)
                                }
                            >

                                <option value="Low">
                                    Low
                                </option>

                                <option value="Medium">
                                    Medium
                                </option>

                                <option value="High">
                                    High
                                </option>

                            </select>

                        </div>

                        <div className="planner-field">

                            <label>
                                Due Date
                            </label>

                            <input
                                type="date"
                                value={dueDate}
                                onChange={(event) =>
                                    setDueDate(event.target.value)
                                }
                            />

                        </div>

                    </div>

                    <div className="planner-form-buttons">

                        <button
                            type="submit"
                            className="planner-save-button"
                        >
                            {editingId
                                ? "💾 Update Task"
                                : "＋ Add Task"}
                        </button>

                        {editingId && (

                            <button
                                type="button"
                                className="planner-cancel-button"
                                onClick={resetForm}
                            >
                                Cancel
                            </button>

                        )}

                    </div>

                </form>

            </div>

            {/* =========================
                FILTERS
            ========================== */}

            <div className="planner-list-header">

                <div>

                    <span className="planner-section-label">
                        YOUR TASKS
                    </span>

                    <h2>
                        📝 Preparation Tasks
                    </h2>

                </div>

                <span className="planner-count-badge">
                    {filteredTasks.length} Tasks
                </span>

            </div>

            <div className="planner-filters">

                {[
                    "All",
                    "Pending",
                    "Completed",
                    "High",
                    "Medium",
                    "Low"
                ].map((item) => (

                    <button
                        key={item}
                        className={
                            filter === item
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setFilter(item)
                        }
                    >
                        {item}
                    </button>

                ))}

            </div>

            {/* =========================
                TASK LIST
            ========================== */}

            {filteredTasks.length === 0 ? (

                <div className="planner-empty">

                    <div className="planner-empty-icon">
                        📋
                    </div>

                    <h2>
                        No tasks found
                    </h2>

                    <p>
                        Add your first preparation task above
                        and start planning your day.
                    </p>

                </div>

            ) : (

                <div className="planner-task-grid">

                    {filteredTasks.map((task) => (

                        <div
                            key={task.id}
                            className={`planner-task-card ${
                                task.completed
                                    ? "planner-task-completed"
                                    : ""
                            }`}
                        >

                            <div className="planner-task-top">

                                <button
                                    className={`planner-check ${
                                        task.completed
                                            ? "checked"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        handleToggle(task.id)
                                    }
                                >
                                    {task.completed
                                        ? "✓"
                                        : ""}
                                </button>

                                <div className="planner-task-content">

                                    <div className="planner-task-title-row">

                                        <h3>
                                            {task.title}
                                        </h3>

                                        <span
                                            className={`planner-priority-${task.priority?.toLowerCase()}`}
                                        >
                                            {task.priority}
                                        </span>

                                    </div>

                                    {task.description && (

                                        <p>
                                            {task.description}
                                        </p>

                                    )}

                                    <div className="planner-task-meta">

                                        {task.dueDate && (

                                            <span>
                                                📅 {task.dueDate}
                                            </span>

                                        )}

                                        <span>
                                            {task.completed
                                                ? "✅ Completed"
                                                : "⏳ Pending"}
                                        </span>

                                    </div>

                                </div>

                            </div>

                            <div className="planner-task-actions">

                                <button
                                    className={
                                        task.completed
                                            ? "planner-undo-button"
                                            : "planner-complete-button"
                                    }
                                    onClick={() =>
                                        handleToggle(task.id)
                                    }
                                >
                                    {task.completed
                                        ? "↩ Mark Pending"
                                        : "✓ Mark Complete"}
                                </button>

                                <button
                                    className="planner-edit-button"
                                    onClick={() =>
                                        handleEdit(task)
                                    }
                                >
                                    ✏️ Edit
                                </button>

                                <button
                                    className="planner-delete-button"
                                    onClick={() =>
                                        handleDelete(task.id)
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
    );
}

export default Planner;