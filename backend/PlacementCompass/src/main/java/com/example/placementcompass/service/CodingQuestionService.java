package com.example.placementcompass.service;

import com.example.placementcompass.model.CodingQuestion;
import com.example.placementcompass.model.User;
import com.example.placementcompass.repository.CodingQuestionRepository;
import com.example.placementcompass.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CodingQuestionService {

    private final CodingQuestionRepository codingQuestionRepository;
    private final UserRepository userRepository;

    public CodingQuestionService(
            CodingQuestionRepository codingQuestionRepository,
            UserRepository userRepository) {

        this.codingQuestionRepository = codingQuestionRepository;
        this.userRepository = userRepository;
    }

    // Get questions for a specific user
    public List<CodingQuestion> getAllQuestions(Long userId) {
        return codingQuestionRepository.findByUserId(userId);
    }

    // Add question for a specific user
    public CodingQuestion addQuestion(
            Long userId,
            CodingQuestion question) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        question.setUser(user);

        return codingQuestionRepository.save(question);
    }

    // Update question
    public CodingQuestion updateQuestion(
            Long userId,
            Long questionId,
            CodingQuestion updatedQuestion) {

        CodingQuestion existingQuestion =
                codingQuestionRepository.findById(questionId)
                        .orElseThrow(() ->
                                new RuntimeException("Question not found"));

        // Check ownership
        if (!existingQuestion.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }

        existingQuestion.setTitle(updatedQuestion.getTitle());
        existingQuestion.setTopic(updatedQuestion.getTopic());
        existingQuestion.setDifficulty(updatedQuestion.getDifficulty());
        existingQuestion.setProblemLink(
                updatedQuestion.getProblemLink()
        );
        existingQuestion.setSolved(updatedQuestion.isSolved());

        return codingQuestionRepository.save(existingQuestion);
    }

    // Toggle solved status
    public CodingQuestion toggleQuestion(
            Long userId,
            Long questionId) {

        CodingQuestion question =
                codingQuestionRepository.findById(questionId)
                        .orElseThrow(() ->
                                new RuntimeException("Question not found"));

        // Check ownership
        if (!question.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }

        question.setSolved(!question.isSolved());

        return codingQuestionRepository.save(question);
    }

    // Delete question
    public void deleteQuestion(
            Long userId,
            Long questionId) {

        CodingQuestion question =
                codingQuestionRepository.findById(questionId)
                        .orElseThrow(() ->
                                new RuntimeException("Question not found"));

        // Check ownership
        if (!question.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }

        codingQuestionRepository.delete(question);
    }
}