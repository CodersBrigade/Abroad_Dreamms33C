package com.adreams.abroad_dreams_back.service.impl;

import com.adreams.abroad_dreams_back.repo.CountryRepo;
import com.adreams.abroad_dreams_back.repo.InstructorRepo;
import com.adreams.abroad_dreams_back.service.CourseService;
import com.adreams.abroad_dreams_back.entity.Course;
import com.adreams.abroad_dreams_back.pojo.CoursePojo;
import com.adreams.abroad_dreams_back.repo.CourseRepo;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {

    private final CourseRepo courseRepo;
    private final InstructorRepo instructorRepo;  // Inject InstructorRepo
    private final CountryRepo countryRepo;  // Inject CountryRepo

    @Override
    public String save(CoursePojo coursePojo) {
        Course course;

        if (coursePojo.getCourseId() != null) {
            course = courseRepo.findById(coursePojo.getCourseId())
                    .orElseThrow(() -> new EntityNotFoundException("Course not found with ID: " + coursePojo.getCourseId()));
        } else {
            course = new Course();
        }

        // Set values from CoursePojo to Course entity
        course.setCourseName(coursePojo.getCourseName());
        course.setCredits(coursePojo.getCredits());
        course.setDurationYears(coursePojo.getDurationYears());
        course.setCourseFee(coursePojo.getCourseFee());
        course.setAvailability(coursePojo.isAvailability());

        // Set Instructor and Country by ID
        // (You'll need to fetch these entities from their repositories)
         course.setInstructor(instructorRepo.findById(coursePojo.getInstructorId()).orElse(null));
         course.setCountry(countryRepo.findById(coursePojo.getCountryId()).orElse(null));

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

        // Update existingCourse with values from CoursePojo
        existingCourse.setCourseName(coursePojo.getCourseName());
        existingCourse.setCredits(coursePojo.getCredits());
        existingCourse.setDurationYears(coursePojo.getDurationYears());
        existingCourse.setCourseFee(coursePojo.getCourseFee());
        existingCourse.setAvailability(coursePojo.isAvailability());

        // Update Instructor and Country by ID
        // (You'll need to fetch these entities from their repositories)
         existingCourse.setInstructor(instructorRepo.findById(coursePojo.getInstructorId()).orElse(null));
         existingCourse.setCountry(countryRepo.findById(coursePojo.getCountryId()).orElse(null));

        courseRepo.save(existingCourse);
        return "Updated Successfully!";
    }
}
