package com.example.placementcompass.model;

import jakarta.persistence.*;

@Entity
@Table(name = "company_preparations")
public class CompanyPreparation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String companyName;

    private String role;

    private String packageOffered;

    @Column(length = 2000)
    private String requiredSkills;

    @Column(length = 2000)
    private String aptitudeTopics;

    @Column(length = 2000)
    private String technicalTopics;

    @Column(length = 2000)
    private String codingTopics;

    @Column(length = 3000)
    private String interviewQuestions;

    private int progress;

    // User relationship
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public CompanyPreparation() {
    }

    public CompanyPreparation(
            String companyName,
            String role,
            String packageOffered,
            String requiredSkills,
            String aptitudeTopics,
            String technicalTopics,
            String codingTopics,
            String interviewQuestions,
            int progress,
            User user) {

        this.companyName = companyName;
        this.role = role;
        this.packageOffered = packageOffered;
        this.requiredSkills = requiredSkills;
        this.aptitudeTopics = aptitudeTopics;
        this.technicalTopics = technicalTopics;
        this.codingTopics = codingTopics;
        this.interviewQuestions = interviewQuestions;
        this.progress = progress;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getPackageOffered() {
        return packageOffered;
    }

    public void setPackageOffered(String packageOffered) {
        this.packageOffered = packageOffered;
    }

    public String getRequiredSkills() {
        return requiredSkills;
    }

    public void setRequiredSkills(String requiredSkills) {
        this.requiredSkills = requiredSkills;
    }

    public String getAptitudeTopics() {
        return aptitudeTopics;
    }

    public void setAptitudeTopics(String aptitudeTopics) {
        this.aptitudeTopics = aptitudeTopics;
    }

    public String getTechnicalTopics() {
        return technicalTopics;
    }

    public void setTechnicalTopics(String technicalTopics) {
        this.technicalTopics = technicalTopics;
    }

    public String getCodingTopics() {
        return codingTopics;
    }

    public void setCodingTopics(String codingTopics) {
        this.codingTopics = codingTopics;
    }

    public String getInterviewQuestions() {
        return interviewQuestions;
    }

    public void setInterviewQuestions(String interviewQuestions) {
        this.interviewQuestions = interviewQuestions;
    }

    public int getProgress() {
        return progress;
    }

    public void setProgress(int progress) {
        this.progress = progress;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}