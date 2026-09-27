package com.example.placementcompass.controller;

import com.example.placementcompass.model.DashboardStats;
import com.example.placementcompass.model.User;
import com.example.placementcompass.repository.AptitudeQuestionRepository;
import com.example.placementcompass.repository.CodingQuestionRepository;
import com.example.placementcompass.repository.CompanyPreparationRepository;
import com.example.placementcompass.repository.CompanyRepository;
import com.example.placementcompass.repository.NoteRepository;
import com.example.placementcompass.repository.TaskRepository;
import com.example.placementcompass.repository.UserRepository;

import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController {

    private final CompanyRepository companyRepository;
    private final NoteRepository noteRepository;
    private final TaskRepository taskRepository;
    private final CodingQuestionRepository codingRepository;
    private final AptitudeQuestionRepository aptitudeRepository;
    private final CompanyPreparationRepository preparationRepository;
    private final UserRepository userRepository;

    public DashboardController(
            CompanyRepository companyRepository,
            NoteRepository noteRepository,
            TaskRepository taskRepository,
            CodingQuestionRepository codingRepository,
            AptitudeQuestionRepository aptitudeRepository,
            CompanyPreparationRepository preparationRepository,
            UserRepository userRepository) {

        this.companyRepository = companyRepository;
        this.noteRepository = noteRepository;
        this.taskRepository = taskRepository;
        this.codingRepository = codingRepository;
        this.aptitudeRepository = aptitudeRepository;
        this.preparationRepository = preparationRepository;
        this.userRepository = userRepository;
    }

    private Long getAuthenticatedUserId(Principal principal) {

        String email = principal.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return user.getId();
    }

    @GetMapping("/stats")
    public DashboardStats getStats(Principal principal) {

        // Get logged-in user's ID from JWT
        Long userId = getAuthenticatedUserId(principal);

        // Companies are common for all users
        long companies = companyRepository.count();

        // User-specific notes
        long notes = noteRepository
                .findByUserId(userId)
                .size();

        // User-specific tasks
        var tasks = taskRepository.findByUserId(userId);

        long totalTasks = tasks.size();

        long completedTasks = tasks.stream()
                .filter(task -> task.isCompleted())
                .count();

        // User-specific coding questions
        var codingQuestions = codingRepository
                .findByUserId(userId);

        long totalCodingQuestions = codingQuestions.size();

        long solvedCodingQuestions = codingQuestions.stream()
                .filter(question -> question.isSolved())
                .count();

        // User-specific aptitude questions
        long totalAptitudeQuestions = aptitudeRepository
                .findByUserId(userId)
                .size();

        // User-specific company preparation
        var preparations = preparationRepository
                .findByUserId(userId);

        int companyProgress = 0;

        if (!preparations.isEmpty()) {

            companyProgress = (int) Math.round(
                    preparations.stream()
                            .mapToInt(preparation ->
                                    preparation.getProgress())
                            .average()
                            .orElse(0)
            );
        }

        return new DashboardStats(
                companies,
                notes,
                totalTasks,
                completedTasks,
                totalCodingQuestions,
                solvedCodingQuestions,
                totalAptitudeQuestions,
                companyProgress
        );
    }
}