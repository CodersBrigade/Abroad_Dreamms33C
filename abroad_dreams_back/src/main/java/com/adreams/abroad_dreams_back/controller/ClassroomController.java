package com.adreams.abroad_dreams_back.controller;

import com.adreams.abroad_dreams_back.entity.Classroom;
import com.adreams.abroad_dreams_back.service.ClassroomService;
import com.adreams.abroad_dreams_back.pojo.ClassroomPojo;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/classroom")
@RequiredArgsConstructor
public class ClassroomController {

    private final ClassroomService classroomService;

    @PostMapping(value = "/save")
    public String saveClassroom(@Valid @RequestBody ClassroomPojo classroomPojo) {
        classroomService.save(classroomPojo);
        return "Saved Successfully!";
    }

    @GetMapping("/getAll")
    public List<Classroom> getAll() {
        return this.classroomService.getAll();
    }

    @GetMapping("/getById/{id}")
    public Optional<Classroom> getById(@PathVariable("id") Long id) {
        return this.classroomService.getById(id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteById(@PathVariable("id") Long id) {
        this.classroomService.deleteById(id);
    }

    @PutMapping("/update/{id}")
    public String updateClassroom(@PathVariable("id") Long id, @Valid @RequestBody ClassroomPojo classroomPojo) {
        return this.classroomService.update(id, classroomPojo);
    }
}
