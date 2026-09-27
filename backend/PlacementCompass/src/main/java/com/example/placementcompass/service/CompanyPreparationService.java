package com.example.placementcompass.service;

import com.example.placementcompass.model.CompanyPreparation;
import com.example.placementcompass.model.User;
import com.example.placementcompass.repository.CompanyPreparationRepository;
import com.example.placementcompass.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyPreparationService {

    private final CompanyPreparationRepository preparationRepository;
    private final UserRepository userRepository;

    public CompanyPreparationService(
            CompanyPreparationRepository preparationRepository,
            UserRepository userRepository) {

        this.preparationRepository = preparationRepository;
        this.userRepository = userRepository;
    }

    // Get preparations for a specific user
    public List<CompanyPreparation> getAllPreparations(Long userId) {

        return preparationRepository.findByUserId(userId);
    }

    // Add preparation for a specific user
    public CompanyPreparation addPreparation(
            Long userId,
            CompanyPreparation preparation) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        preparation.setUser(user);

        return preparationRepository.save(preparation);
    }

    // Update preparation
    public CompanyPreparation updatePreparation(
            Long userId,
            Long preparationId,
            CompanyPreparation updatedPreparation) {

        CompanyPreparation existingPreparation =
                preparationRepository.findById(preparationId)
                        .orElseThrow(() ->
                                new RuntimeException("Preparation not found"));

        if (existingPreparation.getUser() == null ||
                !existingPreparation.getUser().getId().equals(userId)) {

            throw new RuntimeException("Unauthorized");
        }

        existingPreparation.setCompanyName(
                updatedPreparation.getCompanyName());

        existingPreparation.setRole(
                updatedPreparation.getRole());

        existingPreparation.setPackageOffered(
                updatedPreparation.getPackageOffered());

        existingPreparation.setRequiredSkills(
                updatedPreparation.getRequiredSkills());

        existingPreparation.setAptitudeTopics(
                updatedPreparation.getAptitudeTopics());

        existingPreparation.setTechnicalTopics(
                updatedPreparation.getTechnicalTopics());

        existingPreparation.setCodingTopics(
                updatedPreparation.getCodingTopics());

        existingPreparation.setInterviewQuestions(
                updatedPreparation.getInterviewQuestions());

        existingPreparation.setProgress(
                updatedPreparation.getProgress());

        return preparationRepository.save(existingPreparation);
    }

    // Delete preparation
    public void deletePreparation(
            Long userId,
            Long preparationId) {

        CompanyPreparation preparation =
                preparationRepository.findById(preparationId)
                        .orElseThrow(() ->
                                new RuntimeException("Preparation not found"));

        if (preparation.getUser() == null ||
                !preparation.getUser().getId().equals(userId)) {

            throw new RuntimeException("Unauthorized");
        }

        preparationRepository.delete(preparation);
    }
}