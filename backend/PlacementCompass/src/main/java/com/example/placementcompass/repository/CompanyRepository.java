package com.example.placementcompass.repository;

import com.example.placementcompass.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Long> {
}