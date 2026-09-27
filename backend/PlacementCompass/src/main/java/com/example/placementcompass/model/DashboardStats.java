package com.example.placementcompass.model;

public class DashboardStats {

    private long companies;
    private long notes;

    private long totalTasks;
    private long completedTasks;

    private long totalCodingQuestions;
    private long solvedCodingQuestions;

    private long totalAptitudeQuestions;

    private int companyPreparationProgress;

    public DashboardStats() {
    }

    public DashboardStats(
            long companies,
            long notes,
            long totalTasks,
            long completedTasks,
            long totalCodingQuestions,
            long solvedCodingQuestions,
            long totalAptitudeQuestions,
            int companyPreparationProgress) {

        this.companies = companies;
        this.notes = notes;
        this.totalTasks = totalTasks;
        this.completedTasks = completedTasks;
        this.totalCodingQuestions = totalCodingQuestions;
        this.solvedCodingQuestions = solvedCodingQuestions;
        this.totalAptitudeQuestions = totalAptitudeQuestions;
        this.companyPreparationProgress =
                companyPreparationProgress;
    }

    public long getCompanies() {
        return companies;
    }

    public void setCompanies(long companies) {
        this.companies = companies;
    }

    public long getNotes() {
        return notes;
    }

    public void setNotes(long notes) {
        this.notes = notes;
    }

    public long getTotalTasks() {
        return totalTasks;
    }

    public void setTotalTasks(long totalTasks) {
        this.totalTasks = totalTasks;
    }

    public long getCompletedTasks() {
        return completedTasks;
    }

    public void setCompletedTasks(long completedTasks) {
        this.completedTasks = completedTasks;
    }

    public long getTotalCodingQuestions() {
        return totalCodingQuestions;
    }

    public void setTotalCodingQuestions(long totalCodingQuestions) {
        this.totalCodingQuestions =
                totalCodingQuestions;
    }

    public long getSolvedCodingQuestions() {
        return solvedCodingQuestions;
    }

    public void setSolvedCodingQuestions(
            long solvedCodingQuestions) {

        this.solvedCodingQuestions =
                solvedCodingQuestions;
    }

    public long getTotalAptitudeQuestions() {
        return totalAptitudeQuestions;
    }

    public void setTotalAptitudeQuestions(
            long totalAptitudeQuestions) {

        this.totalAptitudeQuestions =
                totalAptitudeQuestions;
    }

    public int getCompanyPreparationProgress() {
        return companyPreparationProgress;
    }

    public void setCompanyPreparationProgress(
            int companyPreparationProgress) {

        this.companyPreparationProgress =
                companyPreparationProgress;
    }
}