package com.adreams.abroad_dreams_back.service.impl;

import com.adreams.abroad_dreams_back.entity.Course;
import com.adreams.abroad_dreams_back.pojo.CoursePojo;
import com.adreams.abroad_dreams_back.repo.CourseRepo;
import com.adreams.abroad_dreams_back.service.CourseService;
import com.adreams.abroad_dreams_back.utils.ImageToBase64;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class  CourseServiceImpl implements CourseService {

    private final CourseRepo courseRepo;

    ImageToBase64 imageToBase64=new ImageToBase64();


    @Override
    public String save(CoursePojo coursePojo)  throws IOException {
        Course course;

        if (coursePojo.getCourseId() != null) {
            course = courseRepo.findById(coursePojo.getCourseId())
                    .orElseThrow(() -> new EntityNotFoundException("Course not found with ID: " + coursePojo.getCourseId()));
        } else {
            course = new Course();
        }

        course.setCourseName(coursePojo.getCourseName());
        course.setCredits(coursePojo.getCredits());
        course.setDurationYears(coursePojo.getDurationYears());
        course.setCourseFee(coursePojo.getCourseFee());
        course.setAvailability(coursePojo.isAvailability());

        if(coursePojo.getImage()!=null){
            Path fileNameAndPath = Paths.get("abroad_dreams_uploads", coursePojo.getImage().getOriginalFilename());
            Files.write(fileNameAndPath, coursePojo.getImage().getBytes());
        }

        course.setImage(coursePojo.getImage().getOriginalFilename());

        courseRepo.save(course);
        return "Saved Successfully!";
    }

    @Override
    public List<Course> getAll() {

        return courseRepo.findAll().stream().map(item -> {
            item.setImage(imageToBase64.getImageBase64( item.getImage()));
            return item;
        }).collect(Collectors.toList());

    }

    @Override
    public void deleteById(Long id) {
        courseRepo.deleteById(id);
    }

    @Override
    public Optional<Course> getById(Long id) {
        return courseRepo.findById(id);
    }

    @Override
    public String update(Long id, CoursePojo coursePojo) {
        Course existingCourse = courseRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Course not found with ID: " + id));

        existingCourse.setCourseName(coursePojo.getCourseName());
        existingCourse.setCredits(coursePojo.getCredits());
        existingCourse.setDurationYears(coursePojo.getDurationYears());
        existingCourse.setCourseFee(coursePojo.getCourseFee());
        existingCourse.setAvailability(coursePojo.isAvailability());


        courseRepo.save(existingCourse);
        return "Updated Successfully!";
    }
}
