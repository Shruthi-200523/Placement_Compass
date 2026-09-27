package com.example.placementcompass.service;

import com.example.placementcompass.model.AptitudeQuestion;
import com.example.placementcompass.model.User;
import com.example.placementcompass.repository.AptitudeQuestionRepository;
import com.example.placementcompass.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AptitudeQuestionService {

    private final AptitudeQuestionRepository aptitudeQuestionRepository;
    private final UserRepository userRepository;

    public AptitudeQuestionService(
            AptitudeQuestionRepository aptitudeQuestionRepository,
            UserRepository userRepository) {

        this.aptitudeQuestionRepository = aptitudeQuestionRepository;
        this.userRepository = userRepository;
    }

    public List<AptitudeQuestion> getAllQuestions(Long userId) {
        return aptitudeQuestionRepository.findByUserId(userId);
    }

    public AptitudeQuestion addQuestion(
            Long userId,
            AptitudeQuestion question) {

        User user = userRepository
                .findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        question.setUser(user);

        return aptitudeQuestionRepository.save(question);
    }

    public AptitudeQuestion updateQuestion(
            Long userId,
            Long questionId,
            AptitudeQuestion updatedQuestion) {

        AptitudeQuestion existingQuestion =
                aptitudeQuestionRepository
                        .findById(questionId)
                        .orElseThrow(() ->
                                new RuntimeException("Question not found"));

        if (!existingQuestion.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }

        existingQuestion.setCategory(
                updatedQuestion.getCategory()
        );

        existingQuestion.setCorrectAnswer(
                updatedQuestion.getCorrectAnswer()
        );

        existingQuestion.setDifficulty(
                updatedQuestion.getDifficulty()
        );

        existingQuestion.setOptiona(
                updatedQuestion.getOptiona()
        );

        existingQuestion.setOptionb(
                updatedQuestion.getOptionb()
        );

        existingQuestion.setOptionc(
                updatedQuestion.getOptionc()
        );

        existingQuestion.setOptiond(
                updatedQuestion.getOptiond()
        );

        existingQuestion.setQuestion(
                updatedQuestion.getQuestion()
        );

        return aptitudeQuestionRepository.save(existingQuestion);
    }

    public void deleteQuestion(
            Long userId,
            Long questionId) {

        AptitudeQuestion question =
                aptitudeQuestionRepository
                        .findById(questionId)
                        .orElseThrow(() ->
                                new RuntimeException("Question not found"));

        if (!question.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }

        aptitudeQuestionRepository.delete(question);
    }
}