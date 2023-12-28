package com.adreams.abroad_dreams_back.controller;

import com.adreams.abroad_dreams_back.entity.Course;
import com.adreams.abroad_dreams_back.pojo.CoursePojo;
import com.adreams.abroad_dreams_back.service.CourseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/course")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    @PostMapping(value = "/save")
    public String saveCourse(@Valid @RequestBody CoursePojo coursePojo) {
        courseService.save(coursePojo);
        return "Saved Successfully!";
    }

    @GetMapping("/getAll")
    public List<Course> getAll() {
        return this.courseService.getAll();
    }

    @GetMapping("/getById/{id}")
    public Optional<Course> getById(@PathVariable("id") Long id) {
        return this.courseService.getById(id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteById(@PathVariable("id") Long id) {
        this.courseService.deleteById(id);
    }

    @PutMapping("/update/{id}")
    public String updateCourse(@PathVariable("id") Long id, @Valid @RequestBody CoursePojo coursePojo) {
        return this.courseService.update(id, coursePojo);
    }
}
