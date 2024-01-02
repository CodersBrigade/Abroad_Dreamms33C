package com.adreams.abroad_dreams_back.controller;

import com.adreams.abroad_dreams_back.entity.StudentProfile;
import com.adreams.abroad_dreams_back.pojo.StudentProfilePojo;
import com.adreams.abroad_dreams_back.service.StudentProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/studentProfiles")
@RequiredArgsConstructor
public class StudentProfileController {

    private final StudentProfileService studentProfileService;

    @PostMapping("/save")
    public String saveStudentProfile(@RequestBody StudentProfilePojo studentProfilePojo) {
        return studentProfileService.save(studentProfilePojo);
    }

    @GetMapping("/getAll")
    public List<StudentProfile> getAllStudentProfiles() {
        return studentProfileService.getAll();
    }

    @GetMapping("/getById/{id}")
    public Optional<StudentProfile> getStudentProfileById(@PathVariable("id") Long id) {
        return studentProfileService.getById(id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteStudentProfileById(@PathVariable("id") Long id) {
        studentProfileService.deleteById(id);
    }

    @PutMapping("/update/{id}")
    public String updateStudentProfile(@PathVariable("id") Long id, @RequestBody StudentProfilePojo studentProfilePojo) {
        return studentProfileService.update(id, studentProfilePojo);
    }
}
