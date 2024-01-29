package com.adreams.abroad_dreams_back.controller;

import com.adreams.abroad_dreams_back.entity.SystemUser;
import com.adreams.abroad_dreams_back.helper.ApiResponse;
import com.adreams.abroad_dreams_back.pojo.SystemUserPojo;
import com.adreams.abroad_dreams_back.service.SystemUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/admin/students")
@RequiredArgsConstructor
public class StudentController {

    private final SystemUserService systemUserService;

    @GetMapping("/getAll")
    public List<Map<String, Object>> getAllStudents() {
        return systemUserService.getAllStudentsWithoutPassword();
    }

    @GetMapping("/getById/{id}")
    public Optional<SystemUser> getById(@PathVariable("id") Long id) {
        return this.systemUserService.getById(id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteById(@PathVariable("id") Long id) {
        this.systemUserService.deleteById(id);
    }

    @PutMapping("/update/{id}")
    public String updateSystemUser(@PathVariable("id") Long id, @Valid @RequestBody SystemUserPojo systemUserPojo) {
        return this.systemUserService.update(id, systemUserPojo);
    }

    @GetMapping("/getByEmail/{email}")
    public Optional<SystemUser> getByEmail(@PathVariable("email") String email) {
        return this.systemUserService.getByEmail(email);
    }
}
