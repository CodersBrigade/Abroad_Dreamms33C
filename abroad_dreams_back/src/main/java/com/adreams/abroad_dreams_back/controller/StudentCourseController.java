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
@RequestMapping("/student/course")
@RequiredArgsConstructor
public class StudentCourseController {

    private final CourseService courseService;

    @GetMapping("/getAll")
    public List<Course> getAll() {
        return this.courseService.getAll();
    }

    @GetMapping("/getById/{id}")
    public Optional<Course> getById(@PathVariable("id") Long id) {
        return this.courseService.getById(id);
    }

}
