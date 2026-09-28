import { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import "../App.css";

const API_URL = `${import.meta.env.VITE_API_URL}/api/notes`;

function Notes() {
    const [notes, setNotes] = useState([]);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [editingId, setEditingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.userId;

    /* ================================
       LOAD NOTES
    ================================= */

    const loadNotes = async () => {
        if (!userId) {
            setError("Please login first.");
            setLoading(false);
            return;
        }

        try {
            setLoading(true);

            // JWT is automatically added by axiosConfig
            const response = await axios.get(API_URL);

            setNotes(response.data);
            setError("");
        } catch (error) {
            console.error("Load notes error:", error);
            setError("Unable to load notes.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadNotes();
    }, [userId]);

    /* ================================
       RESET FORM
    ================================= */

    const resetForm = () => {
        setTitle("");
        setContent("");
        setEditingId(null);
        setError("");
    };

    /* ================================
       ADD / UPDATE NOTE
    ================================= */

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!userId) {
            setError("Please login first.");
            return;
        }

        if (!title.trim()) {
            setError("Please enter a note title.");
            return;
        }

        if (!content.trim()) {
            setError("Please enter note content.");
            return;
        }

        try {
            const noteData = {
                title: title.trim(),
                content: content.trim()
            };

            if (editingId) {
                await axios.put(
                    `${API_URL}/${editingId}`,
                    noteData
                );
            } else {
                await axios.post(
                    API_URL,
                    noteData
                );
            }

            resetForm();
            await loadNotes();

        } catch (error) {
            console.error("Save note error:", error);
            setError(
                editingId
                    ? "Unable to update note."
                    : "Unable to add note."
            );
        }
    };

    /* ================================
       EDIT NOTE
    ================================= */

    const handleEdit = (note) => {
        setEditingId(note.id);
        setTitle(note.title || "");
        setContent(note.content || "");

        setError("");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    /* ================================
       DELETE NOTE
    ================================= */

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this note?"
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

            await loadNotes();

        } catch (error) {
            console.error("Delete note error:", error);
            setError("Unable to delete note.");
        }
    };

    /* ================================
       SEARCH
    ================================= */

    const filteredNotes = notes.filter((note) => {
        const search = searchTerm.toLowerCase();

        return (
            note.title?.toLowerCase().includes(search) ||
            note.content?.toLowerCase().includes(search)
        );
    });

    /* ================================
       LOADING
    ================================= */

    if (loading) {
        return (
            <div className="notes-page">

                <div className="notes-loading">

                    <div className="notes-loading-icon">
                        📝
                    </div>

                    <h2>
                        Loading Notes...
                    </h2>

                    <p>
                        Getting your preparation notes ready.
                    </p>

                </div>

            </div>
        );
    }

    /* ================================
       MAIN PAGE
    ================================= */

    return (
        <div className="notes-page">

            {/* HEADER */}

            <div className="notes-header">

                <div>

                    <span className="notes-badge">
                        KNOWLEDGE HUB
                    </span>

                    <h1>
                        📝 My Notes
                    </h1>

                    <p className="notes-subtitle">
                        Save important placement preparation
                        notes and keep your knowledge organized.
                    </p>

                </div>

                <div className="notes-count-box">

                    <strong>
                        {notes.length}
                    </strong>

                    <span>
                        Total Notes
                    </span>

                </div>

            </div>

            {/* ERROR */}

            {error && (
                <div className="notes-error">
                    ⚠️ {error}
                </div>
            )}

            {/* ADD / EDIT FORM */}

            <div className="notes-form-card">

                <div className="notes-form-header">

                    <div>

                        <span className="notes-section-label">
                            NOTE MANAGEMENT
                        </span>

                        <h2>
                            {editingId
                                ? "✏️ Edit Note"
                                : "➕ Create New Note"}
                        </h2>

                        <p>
                            {editingId
                                ? "Update your existing preparation note."
                                : "Write down concepts, formulas, interview tips or important points."}
                        </p>

                    </div>

                    {editingId && (
                        <span className="notes-editing-badge">
                            EDITING
                        </span>
                    )}

                </div>

                <form
                    className="notes-form"
                    onSubmit={handleSubmit}
                >

                    <div className="notes-field">

                        <label>
                            Note Title
                        </label>

                        <input
                            type="text"
                            placeholder="Example: Java OOP Interview Questions"
                            value={title}
                            onChange={(event) =>
                                setTitle(event.target.value)
                            }
                        />

                    </div>

                    <div className="notes-field">

                        <label>
                            Note Content
                        </label>

                        <textarea
                            placeholder="Write your preparation notes here..."
                            value={content}
                            onChange={(event) =>
                                setContent(event.target.value)
                            }
                            rows="7"
                        />

                    </div>

                    <div className="notes-form-actions">

                        <button
                            type="submit"
                            className="notes-save-button"
                        >
                            {editingId
                                ? "💾 Update Note"
                                : "＋ Add Note"}
                        </button>

                        {editingId && (
                            <button
                                type="button"
                                className="notes-cancel-button"
                                onClick={resetForm}
                            >
                                Cancel
                            </button>
                        )}

                    </div>

                </form>

            </div>

            {/* NOTES LIST HEADER */}

            <div className="notes-list-header">

                <div>

                    <span className="notes-section-label">
                        YOUR KNOWLEDGE
                    </span>

                    <h2>
                        📚 Saved Notes
                    </h2>

                </div>

                <span className="notes-count-badge">
                    {filteredNotes.length} Notes
                </span>

            </div>

            {/* SEARCH */}

            {notes.length > 0 && (
                <div className="notes-search">

                    <span>
                        🔍
                    </span>

                    <input
                        type="text"
                        placeholder="Search your notes..."
                        value={searchTerm}
                        onChange={(event) =>
                            setSearchTerm(event.target.value)
                        }
                    />

                </div>
            )}

            {/* NOTES */}

            {filteredNotes.length === 0 ? (

                <div className="empty-notes">

                    <div className="empty-notes-icon">
                        {notes.length === 0
                            ? "📝"
                            : "🔎"}
                    </div>

                    <h2>
                        {notes.length === 0
                            ? "No notes yet"
                            : "No matching notes"}
                    </h2>

                    <p>
                        {notes.length === 0
                            ? "Create your first placement preparation note above."
                            : "Try searching with a different keyword."}
                    </p>

                </div>

            ) : (

                <div className="notes-grid">

                    {filteredNotes.map((note) => (

                        <div
                            className="note-card"
                            key={note.id}
                        >

                            <div className="note-card-top">

                                <div className="note-icon">
                                    📝
                                </div>

                                <div className="note-card-title">

                                    <h2>
                                        {note.title}
                                    </h2>

                                    <span>
                                        Placement Preparation
                                    </span>

                                </div>

                            </div>

                            <div className="note-content">

                                <p>
                                    {note.content}
                                </p>

                            </div>

                            <div className="note-actions">

                                <button
                                    className="note-edit-button"
                                    onClick={() =>
                                        handleEdit(note)
                                    }
                                >
                                    ✏️ Edit
                                </button>

                                <button
                                    className="note-delete-button"
                                    onClick={() =>
                                        handleDelete(note.id)
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
    );
}

export default Notes;