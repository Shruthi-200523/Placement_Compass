package com.example.placementcompass.controller;

import com.example.placementcompass.model.CodingQuestion;
import com.example.placementcompass.model.User;
import com.example.placementcompass.repository.UserRepository;
import com.example.placementcompass.service.CodingQuestionService;

import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/coding")
@CrossOrigin(origins = "http://localhost:5173")
public class CodingQuestionController {

    private final CodingQuestionService codingQuestionService;
    private final UserRepository userRepository;

    public CodingQuestionController(
            CodingQuestionService codingQuestionService,
            UserRepository userRepository) {

        this.codingQuestionService = codingQuestionService;
        this.userRepository = userRepository;
    }

    // Get authenticated user's ID
    private Long getAuthenticatedUserId(Principal principal) {

        String email = principal.getName();

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return user.getId();
    }

    // Get questions for logged-in user
    @GetMapping
    public List<CodingQuestion> getAllQuestions(
            Principal principal) {

        Long userId = getAuthenticatedUserId(principal);

        return codingQuestionService.getAllQuestions(userId);
    }

    // Add question
    @PostMapping
    public CodingQuestion addQuestion(
            Principal principal,
            @RequestBody CodingQuestion question) {

        Long userId = getAuthenticatedUserId(principal);

        return codingQuestionService.addQuestion(
                userId,
                question
        );
    }

    // Update question
    @PutMapping("/{id}")
    public CodingQuestion updateQuestion(
            @PathVariable Long id,
            Principal principal,
            @RequestBody CodingQuestion question) {

        Long userId = getAuthenticatedUserId(principal);

        return codingQuestionService.updateQuestion(
                userId,
                id,
                question
        );
    }

    // Toggle solved status
    @PutMapping("/{id}/toggle")
    public CodingQuestion toggleQuestion(
            @PathVariable Long id,
            Principal principal) {

        Long userId = getAuthenticatedUserId(principal);

        return codingQuestionService.toggleQuestion(
                userId,
                id
        );
    }

    // Delete question
    @DeleteMapping("/{id}")
    public void deleteQuestion(
            @PathVariable Long id,
            Principal principal) {

        Long userId = getAuthenticatedUserId(principal);

        codingQuestionService.deleteQuestion(
                userId,
                id
        );
    }
}