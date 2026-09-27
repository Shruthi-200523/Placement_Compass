package com.example.placementcompass.controller;

import com.example.placementcompass.model.Task;
import com.example.placementcompass.model.User;
import com.example.placementcompass.repository.UserRepository;
import com.example.placementcompass.service.TaskService;

import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController {

    private final TaskService taskService;
    private final UserRepository userRepository;

    public TaskController(
            TaskService taskService,
            UserRepository userRepository) {

        this.taskService = taskService;
        this.userRepository = userRepository;
    }

    // Get authenticated user's ID
    private Long getAuthenticatedUserId(Principal principal) {

        String email = principal.getName();

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return user.getId();
    }

    // Get all tasks for logged-in user
    @GetMapping
    public List<Task> getAllTasks(Principal principal) {

        Long userId = getAuthenticatedUserId(principal);

        return taskService.getAllTasks(userId);
    }

    // Add task
    @PostMapping
    public Task addTask(
            Principal principal,
            @RequestBody Task task) {

        Long userId = getAuthenticatedUserId(principal);

        return taskService.addTask(userId, task);
    }

    // Update task
    @PutMapping("/{id}")
    public Task updateTask(
            @PathVariable Long id,
            Principal principal,
            @RequestBody Task task) {

        Long userId = getAuthenticatedUserId(principal);

        return taskService.updateTask(
                userId,
                id,
                task
        );
    }

    // Toggle completed status
    @PutMapping("/{id}/toggle")
    public Task toggleTask(
            @PathVariable Long id,
            Principal principal) {

        Long userId = getAuthenticatedUserId(principal);

        return taskService.toggleTask(
                userId,
                id
        );
    }

    // Delete task
    @DeleteMapping("/{id}")
    public void deleteTask(
            @PathVariable Long id,
            Principal principal) {

        Long userId = getAuthenticatedUserId(principal);

        taskService.deleteTask(
                userId,
                id
        );
    }
}