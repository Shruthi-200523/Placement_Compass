package com.example.placementcompass.controller;

import com.example.placementcompass.model.CompanyPreparation;
import com.example.placementcompass.model.User;
import com.example.placementcompass.repository.UserRepository;
import com.example.placementcompass.service.CompanyPreparationService;

import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/company-preparation")
@CrossOrigin(origins = "http://localhost:5173")
public class CompanyPreparationController {

    private final CompanyPreparationService preparationService;
    private final UserRepository userRepository;

    public CompanyPreparationController(
            CompanyPreparationService preparationService,
            UserRepository userRepository) {

        this.preparationService = preparationService;
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

    // Get preparations for the logged-in user
    @GetMapping
    public List<CompanyPreparation> getAllPreparations(
            Principal principal) {

        Long userId = getAuthenticatedUserId(principal);

        return preparationService.getAllPreparations(userId);
    }

    // Add preparation
    @PostMapping
    public CompanyPreparation addPreparation(
            Principal principal,
            @RequestBody CompanyPreparation preparation) {

        Long userId = getAuthenticatedUserId(principal);

        return preparationService.addPreparation(
                userId,
                preparation
        );
    }

    // Update preparation
    @PutMapping("/{id}")
    public CompanyPreparation updatePreparation(
            @PathVariable Long id,
            Principal principal,
            @RequestBody CompanyPreparation preparation) {

        Long userId = getAuthenticatedUserId(principal);

        return preparationService.updatePreparation(
                userId,
                id,
                preparation
        );
    }

    // Delete preparation
    @DeleteMapping("/{id}")
    public void deletePreparation(
            @PathVariable Long id,
            Principal principal) {

        Long userId = getAuthenticatedUserId(principal);

        preparationService.deletePreparation(
                userId,
                id
        );
    }
}