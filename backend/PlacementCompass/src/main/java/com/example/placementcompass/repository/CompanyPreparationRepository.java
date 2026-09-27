package com.example.placementcompass.repository;

import com.example.placementcompass.model.CompanyPreparation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CompanyPreparationRepository
        extends JpaRepository<CompanyPreparation, Long> {

    List<CompanyPreparation> findByUserId(Long userId);
}