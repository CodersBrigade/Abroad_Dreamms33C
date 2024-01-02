package com.adreams.abroad_dreams_back.controller;

import com.adreams.abroad_dreams_back.entity.Student;
import com.adreams.abroad_dreams_back.pojo.StudentPojo;
import com.adreams.abroad_dreams_back.service.StudentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/students")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;

    @PostMapping("/save")
    public String saveStudent(@Valid @RequestBody StudentPojo studentPojo) {
        return studentService.save(studentPojo);
    }

    @GetMapping("/getAll")
    public List<Student> getAllStudents() {
        return studentService.getAll();
    }

    @GetMapping("/getById/{id}")
    public Optional<Student> getStudentById(@PathVariable("id") Long id) {
        return studentService.getById(id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteStudentById(@PathVariable("id") Long id) {
        studentService.deleteById(id);
    }

    @PutMapping("/update/{id}")
    public String updateStudent(@PathVariable("id") Long id, @Valid @RequestBody StudentPojo studentPojo) {
        return studentService.update(id, studentPojo);
    }

    @GetMapping("/getByEmail/{email}")
    public Optional<Student> getStudentByEmail(@PathVariable("email") String email) {
        return studentService.getByEmail(email);
    }

    @GetMapping("/getByUsername/{username}")
    public Optional<Student> getStudentByUsername(@PathVariable("username") String username) {
        return studentService.getByUsername(username);
    }
}
