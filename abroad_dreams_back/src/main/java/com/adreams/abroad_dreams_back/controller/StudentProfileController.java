package com.adreams.abroad_dreams_back.controller;

import com.adreams.abroad_dreams_back.entity.Instructor;
import com.adreams.abroad_dreams_back.entity.StudentProfile;
import com.adreams.abroad_dreams_back.pojo.StudentProfilePojo;
import com.adreams.abroad_dreams_back.service.StudentProfileService;
import com.adreams.abroad_dreams_back.helper.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

//@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/student-profile")

@RequiredArgsConstructor
public class StudentProfileController {

    private final StudentProfileService studentProfileService;
    private final ApiResponse apiResponse;

    @PostMapping("/save")
    public ResponseEntity<Map<String, Object>> saveStudentProfile(@RequestBody StudentProfilePojo studentProfilePojo) {
        return apiResponse.successResponse("Student profile saved successfully", true, null, studentProfileService.save(studentProfilePojo.getSystemUserId(), studentProfilePojo));    }

    @GetMapping("/getAll")
    public List<StudentProfile> getAll() {
        return this.studentProfileService.getAll();
    }

//    @GetMapping("/getById/{id}")
//    public ResponseEntity<Map<String, Object>> getById(@PathVariable("id") Long id) {
//        return apiResponse.successResponse("Student profile retrieved successfully", true, null, studentProfileService.getById(id).orElse(null));
//    }

    @GetMapping("/getById/{id}")
    public Optional<StudentProfile> getById(@PathVariable("id") Long id) {
        return this.studentProfileService.getById(id);
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, Object>> deleteById(@PathVariable("id") Long id) {
        studentProfileService.deleteById(id);
        return apiResponse.successResponse("Student profile deleted successfully", true, null, null);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Map<String, Object>> update(@PathVariable("id") Long id, @RequestBody StudentProfilePojo studentProfilePojo) {
        return apiResponse.successResponse("Student profile updated successfully", true, null, studentProfileService.update(id, studentProfilePojo));
    }

    @GetMapping("/getByUserId/{userId}")
    public ResponseEntity<List<StudentProfile>> getByUserId(@PathVariable("userId") Long userId) {
        List<StudentProfile> studentProfiles = studentProfileService.getByUserId(userId);
        return ResponseEntity.ok(studentProfiles);
    }

//    @GetMapping("/getByStatus/{status}")
//    public ResponseEntity<Map<String, Object>> getById(@PathVariable("status") Long id) {
//        return apiResponse.successResponse("Student profile retrieved successfully", true, null, studentProfileService.getById(id).orElse(null));
//    }

}
