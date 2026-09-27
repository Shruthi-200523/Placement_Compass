package com.example.placementcompass.service;
import com.example.placementcompass.model.Note;
import com.example.placementcompass.model.User;
import com.example.placementcompass.repository.NoteRepository;
import com.example.placementcompass.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteService {

    private final NoteRepository noteRepository;
    private final UserRepository userRepository;

    public NoteService(
            NoteRepository noteRepository,
            UserRepository userRepository) {

        this.noteRepository = noteRepository;
        this.userRepository = userRepository;
    }

    public List<Note> getAllNotes(Long userId) {
        return noteRepository.findByUserId(userId);
    }

    public Note addNote(Long userId, Note note) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        note.setUser(user);

        return noteRepository.save(note);
    }

    public Note updateNote(Long userId, Long noteId, Note updatedNote) {

        Note existingNote = noteRepository.findById(noteId)
                .orElseThrow(() ->
                        new RuntimeException("Note not found"));

        if (!existingNote.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }

        existingNote.setTitle(updatedNote.getTitle());
        existingNote.setContent(updatedNote.getContent());

        return noteRepository.save(existingNote);
    }

    public void deleteNote(Long userId, Long noteId) {

        Note note = noteRepository.findById(noteId)
                .orElseThrow(() ->
                        new RuntimeException("Note not found"));

        if (!note.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }

        noteRepository.delete(note);
    }
}