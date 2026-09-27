package com.example.placementcompass.repository;

import com.example.placementcompass.model.AptitudeQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AptitudeQuestionRepository
        extends JpaRepository<AptitudeQuestion, Long> {

    List<AptitudeQuestion> findByUserId(Long userId);
}