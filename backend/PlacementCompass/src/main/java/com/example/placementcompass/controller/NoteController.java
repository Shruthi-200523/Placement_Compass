package com.example.placementcompass.controller;

import com.example.placementcompass.model.Note;
import com.example.placementcompass.model.User;
import com.example.placementcompass.repository.UserRepository;
import com.example.placementcompass.service.NoteService;

import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = "http://localhost:5173")
public class NoteController {

    private final NoteService noteService;
    private final UserRepository userRepository;

    public NoteController(
            NoteService noteService,
            UserRepository userRepository) {

        this.noteService = noteService;
        this.userRepository = userRepository;
    }

    private Long getAuthenticatedUserId(Principal principal) {

        String email = principal.getName();

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return user.getId();
    }

    @GetMapping
    public List<Note> getAllNotes(Principal principal) {

        Long userId = getAuthenticatedUserId(principal);

        return noteService.getAllNotes(userId);
    }

    @PostMapping
    public Note addNote(
            Principal principal,
            @RequestBody Note note) {

        Long userId = getAuthenticatedUserId(principal);

        return noteService.addNote(userId, note);
    }

    @PutMapping("/{id}")
    public Note updateNote(
            @PathVariable Long id,
            Principal principal,
            @RequestBody Note note) {

        Long userId = getAuthenticatedUserId(principal);

        return noteService.updateNote(userId, id, note);
    }

    @DeleteMapping("/{id}")
    public void deleteNote(
            @PathVariable Long id,
            Principal principal) {

        Long userId = getAuthenticatedUserId(principal);

        noteService.deleteNote(userId, id);
    }
}