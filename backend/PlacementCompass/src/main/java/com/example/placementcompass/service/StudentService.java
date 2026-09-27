package com.example.placementcompass.service;

import com.example.placementcompass.entity.Student;
import com.example.placementcompass.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentService {

    @Autowired
    StudentRepository repository;

    public Student register(Student student){

        if(repository.findByEmail(student.getEmail()).isPresent()){

            throw new RuntimeException("Email Already Exists");

        }

        return repository.save(student);

    }

    public Student login(String email,String password){

        Student student=repository.findByEmail(email).orElse(null);

        if(student!=null && student.getPassword().equals(password)){

            return student;

        }

        return null;

    }

}