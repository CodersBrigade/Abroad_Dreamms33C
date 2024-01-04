package com.adreams.abroad_dreams_back.service.impl;

import com.adreams.abroad_dreams_back.entity.Application;
import com.adreams.abroad_dreams_back.entity.Course;
import com.adreams.abroad_dreams_back.entity.Institution;
import com.adreams.abroad_dreams_back.entity.Student;

import com.adreams.abroad_dreams_back.pojo.ApplicationPojo;
import com.adreams.abroad_dreams_back.repo.ApplicationRepo;

import com.adreams.abroad_dreams_back.service.ApplicationService;
import com.adreams.abroad_dreams_back.service.CourseService;
import com.adreams.abroad_dreams_back.service.InstitutionService;
import com.adreams.abroad_dreams_back.service.StudentService;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ApplicationServiceImpl implements ApplicationService {

    @Autowired
    private ApplicationRepo applicationRepo;

    @Autowired
    private StudentService studentService;

    @Autowired
    private InstitutionService institutionService;

    @Autowired
    private CourseService courseService;

    // You can autowire other services here if needed

    @Override
    @Transactional
    public Application saveApplication(ApplicationPojo applicationPojo) {
        Application application = new Application();
        // Retrieve Student, Institution, and Course entities by their IDs
        Optional<Student> studentOptional = studentService.getById(applicationPojo.getStudentId());
        Optional<Institution> institutionOptional = institutionService.getById(applicationPojo.getInstitutionId());
        Optional<Course> courseOptional = courseService.getById(applicationPojo.getCourseId());

        // Check if entities are present, otherwise handle as needed
        if (studentOptional.isPresent() && institutionOptional.isPresent() && courseOptional.isPresent()) {
            Student student = studentOptional.get();
            Institution institution = institutionOptional.get();
            Course course = courseOptional.get();

            // Set entities in the Application
            application.setStudent(student);
            application.setInstitution(institution);
            application.setCourse(course);

            // Set other properties as needed
            application.setStatus("Pending");

            return applicationRepo.save(application);
        } else {
            // Handle the case where any of the entities is not found
            throw new EntityNotFoundException("Student, Institution, or Course not found.");
        }
    }

    @Override
    public Application getApplicationById(Long applicationId) {
        Optional<Application> applicationOptional = applicationRepo.findById(applicationId);
        return applicationOptional.orElse(null);
    }

    @Override
    public List<Application> getAllApplications() {
        return applicationRepo.findAll();
    }

    @Override
    @Transactional
    public Application updateApplicationStatus(Long applicationId, String status) {
        Application application = getApplicationById(applicationId);

        if (application != null) {
            application.setStatus(status);
            return applicationRepo.save(application);
        } else {
            return null;
        }
    }

    @Override
    public void deleteApplication(Long applicationId) {
        applicationRepo.deleteById(applicationId);
    }
}
