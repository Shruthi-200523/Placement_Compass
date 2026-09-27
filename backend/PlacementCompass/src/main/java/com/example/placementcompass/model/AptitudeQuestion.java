package com.example.placementcompass.model;

import jakarta.persistence.*;

@Entity
@Table(name = "aptitude_questions")
public class AptitudeQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String category;

    @Column(name = "correct_answer")
    private String correctAnswer;

    private String difficulty;

    private String optiona;

    private String optionb;

    private String optionc;

    private String optiond;

    private String question;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public AptitudeQuestion() {
    }

    public AptitudeQuestion(
            String category,
            String correctAnswer,
            String difficulty,
            String optiona,
            String optionb,
            String optionc,
            String optiond,
            String question,
            User user) {

        this.category = category;
        this.correctAnswer = correctAnswer;
        this.difficulty = difficulty;
        this.optiona = optiona;
        this.optionb = optionb;
        this.optionc = optionc;
        this.optiond = optiond;
        this.question = question;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getCorrectAnswer() {
        return correctAnswer;
    }

    public void setCorrectAnswer(String correctAnswer) {
        this.correctAnswer = correctAnswer;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public String getOptiona() {
        return optiona;
    }

    public void setOptiona(String optiona) {
        this.optiona = optiona;
    }

    public String getOptionb() {
        return optionb;
    }

    public void setOptionb(String optionb) {
        this.optionb = optionb;
    }

    public String getOptionc() {
        return optionc;
    }

    public void setOptionc(String optionc) {
        this.optionc = optionc;
    }

    public String getOptiond() {
        return optiond;
    }

    public void setOptiond(String optiond) {
        this.optiond = optiond;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}