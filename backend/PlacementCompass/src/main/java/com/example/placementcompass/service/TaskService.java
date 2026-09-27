package com.example.placementcompass.service;

import com.example.placementcompass.model.Task;
import com.example.placementcompass.model.User;
import com.example.placementcompass.repository.TaskRepository;
import com.example.placementcompass.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskService(
            TaskRepository taskRepository,
            UserRepository userRepository) {

        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    // Get tasks belonging to a specific user
    public List<Task> getAllTasks(Long userId) {
        return taskRepository.findByUserId(userId);
    }

    // Add task for a specific user
    public Task addTask(Long userId, Task task) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        task.setUser(user);

        return taskRepository.save(task);
    }

    // Update task
    public Task updateTask(
            Long userId,
            Long taskId,
            Task updatedTask) {

        Task existingTask = taskRepository.findById(taskId)
                .orElseThrow(() ->
                        new RuntimeException("Task not found"));

        // Make sure the task belongs to this user
        if (!existingTask.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }

        existingTask.setTitle(updatedTask.getTitle());
        existingTask.setCategory(updatedTask.getCategory());
        existingTask.setPriority(updatedTask.getPriority());
        existingTask.setCompleted(updatedTask.isCompleted());

        return taskRepository.save(existingTask);
    }

    // Toggle task completion
    public Task toggleTask(
            Long userId,
            Long taskId) {

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() ->
                        new RuntimeException("Task not found"));

        // Make sure the task belongs to this user
        if (!task.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }

        task.setCompleted(!task.isCompleted());

        return taskRepository.save(task);
    }

    // Delete task
    public void deleteTask(
            Long userId,
            Long taskId) {

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() ->
                        new RuntimeException("Task not found"));

        // Make sure the task belongs to this user
        if (!task.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }

        taskRepository.delete(task);
    }
}