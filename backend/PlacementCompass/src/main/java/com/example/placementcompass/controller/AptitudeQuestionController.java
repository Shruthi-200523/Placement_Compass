package com.example.placementcompass.controller;

import com.example.placementcompass.model.AptitudeQuestion;
import com.example.placementcompass.model.User;
import com.example.placementcompass.repository.UserRepository;
import com.example.placementcompass.service.AptitudeQuestionService;

import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/aptitude")
@CrossOrigin(origins = "http://localhost:5173")
public class AptitudeQuestionController {

    private final AptitudeQuestionService aptitudeQuestionService;
    private final UserRepository userRepository;

    public AptitudeQuestionController(
            AptitudeQuestionService aptitudeQuestionService,
            UserRepository userRepository) {

        this.aptitudeQuestionService = aptitudeQuestionService;
        this.userRepository = userRepository;
    }

    private Long getAuthenticatedUserId(Principal principal) {

        String email = principal.getName();

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return user.getId();
    }

    @GetMapping
    public List<AptitudeQuestion> getAllQuestions(Principal principal) {

        Long userId = getAuthenticatedUserId(principal);

        return aptitudeQuestionService.getAllQuestions(userId);
    }

    @PostMapping
    public AptitudeQuestion addQuestion(
            Principal principal,
            @RequestBody AptitudeQuestion question) {

        Long userId = getAuthenticatedUserId(principal);

        return aptitudeQuestionService.addQuestion(userId, question);
    }

    @PutMapping("/{id}")
    public AptitudeQuestion updateQuestion(
            @PathVariable Long id,
            Principal principal,
            @RequestBody AptitudeQuestion question) {

        Long userId = getAuthenticatedUserId(principal);

        return aptitudeQuestionService.updateQuestion(
                userId,
                id,
                question
        );
    }

    @DeleteMapping("/{id}")
    public void deleteQuestion(
            @PathVariable Long id,
            Principal principal) {

        Long userId = getAuthenticatedUserId(principal);

        aptitudeQuestionService.deleteQuestion(
                userId,
                id
        );
    }
}