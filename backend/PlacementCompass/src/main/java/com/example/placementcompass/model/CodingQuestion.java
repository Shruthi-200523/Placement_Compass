package com.example.placementcompass.model;

import jakarta.persistence.*;

@Entity
@Table(name = "coding_questions")
public class CodingQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String topic;

    private String difficulty;

    private String problemLink;

    private boolean solved;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public CodingQuestion() {
    }

    public CodingQuestion(
            String title,
            String topic,
            String difficulty,
            String problemLink,
            boolean solved,
            User user) {

        this.title = title;
        this.topic = topic;
        this.difficulty = difficulty;
        this.problemLink = problemLink;
        this.solved = solved;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public String getProblemLink() {
        return problemLink;
    }

    public void setProblemLink(String problemLink) {
        this.problemLink = problemLink;
    }

    public boolean isSolved() {
        return solved;
    }

    public void setSolved(boolean solved) {
        this.solved = solved;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}