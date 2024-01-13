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

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {

    private final CourseRepo courseRepo;

    ImageToBase64 imageToBase64 = new ImageToBase64();

    private final String UPLOAD_DIRECTORY = new StringBuilder().append(System.getProperty("user.dir")).append("/abroad_dreams_uploads/").toString();


    @Override
    public String save(CoursePojo coursePojo) {
        Course course;
        try {
            Files.createDirectories(Path.of(UPLOAD_DIRECTORY));
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize folder for upload!");
        }

        if (coursePojo.getCourseId() != null) {
            course = courseRepo.findById(coursePojo.getCourseId())
                    .orElseThrow(() -> new EntityNotFoundException("Course not found with ID: " + coursePojo.getCourseId()));
        } else {
            course = new Course();
        }

        if (coursePojo.getImage() != null) {
            try {
                StringBuilder fileNames = new StringBuilder();
                Path fileNameAndPath = Paths.get(UPLOAD_DIRECTORY, coursePojo.getImage().getOriginalFilename());
                fileNames.append(coursePojo.getImage().getOriginalFilename());
                Files.write(fileNameAndPath, coursePojo.getImage().getBytes());
            } catch (IOException e) {
                // Handle the IOException, log or rethrow as needed
                throw new RuntimeException("Error saving image file: " + e.getMessage(), e);
            }
        }


        course.setCourseName(coursePojo.getCourseName());
        course.setCredits(coursePojo.getCredits());
        course.setDurationYears(coursePojo.getDurationYears());
        course.setCourseFee(coursePojo.getCourseFee());
        course.setAvailability(coursePojo.isAvailability());

        courseRepo.save(course);
        return "Saved Successfully!";
    }

    @Override
    public List<Course> getAll() {
        return courseRepo.findAll();
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
