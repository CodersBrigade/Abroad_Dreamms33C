package com.adreams.abroad_dreams_back.controller;

import com.adreams.abroad_dreams_back.entity.Instructor;
import com.adreams.abroad_dreams_back.pojo.InstructorPojo;
import com.adreams.abroad_dreams_back.service.InstructorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/instructor")
@RequiredArgsConstructor
public class InstructorController {

    private final InstructorService instructorService;

    @PostMapping(value = "/save")
    public String saveInstructor(@Valid @RequestBody InstructorPojo instructorPojo) {
        instructorService.save(instructorPojo);
        return "Saved Successfully!";
    }

    @GetMapping("/getAll")
    public List<Instructor> getAll() {
        return this.instructorService.getAll();
    }

    @GetMapping("/getById/{id}")
    public Optional<Instructor> getById(@PathVariable("id") Long id) {
        return this.instructorService.getById(id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteById(@PathVariable("id") Long id) {
        this.instructorService.deleteById(id);
    }

    @PutMapping("/update/{id}")
    public String update(@PathVariable("id") Long id, @Valid @RequestBody InstructorPojo instructorPojo) {
        return this.instructorService.update(id, instructorPojo);
    }

    @GetMapping("/getByName/{name}")
    public List<Instructor> getByName(@PathVariable("name") String name) {
        return this.instructorService.getByName(name);
    }

    // Other endpoints, if needed
}
