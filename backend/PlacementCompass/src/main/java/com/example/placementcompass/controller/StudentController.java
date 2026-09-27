package com.example.placementcompass.controller;

import com.example.placementcompass.entity.Student;
import com.example.placementcompass.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins="http://localhost:5173")
public class StudentController {

    @Autowired
    StudentService service;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Student student){

        return ResponseEntity.ok(service.register(student));

    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Student student){

        Student s=service.login(student.getEmail(),student.getPassword());

        if(s==null){

            return ResponseEntity.badRequest().body("Invalid Credentials");

        }

        return ResponseEntity.ok(s);

    }

}
