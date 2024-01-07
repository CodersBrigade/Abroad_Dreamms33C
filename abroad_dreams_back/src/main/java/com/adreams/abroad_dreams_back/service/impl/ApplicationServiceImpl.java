package com.adreams.abroad_dreams_back.service.impl;

import com.adreams.abroad_dreams_back.entity.Application;
import com.adreams.abroad_dreams_back.entity.Course;
import com.adreams.abroad_dreams_back.entity.Student;
import com.adreams.abroad_dreams_back.pojo.ApplicationPojo;
import com.adreams.abroad_dreams_back.repo.ApplicationRepo;
import com.adreams.abroad_dreams_back.service.ApplicationService;
import com.adreams.abroad_dreams_back.service.CourseService;
import com.adreams.abroad_dreams_back.service.StudentService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ApplicationServiceImpl implements ApplicationService {

    private ApplicationRepo applicationRepo;

    private StudentService studentService;

    private CourseService courseService;

    @Override
    @Transactional
    public Application saveApplication(ApplicationPojo applicationPojo) {
        Application application = new Application();

        Optional<Student> studentOptional = studentService.getById(applicationPojo.getStudentId());
        Optional<Course> courseOptional = courseService.getById(applicationPojo.getCourseId());

        if (studentOptional.isPresent() && courseOptional.isPresent()) {
            Student student = studentOptional.get();
            Course course = courseOptional.get();

            application.setStudent(student);
            application.setCourse(course);
            application.setStatus("Pending");

            return applicationRepo.save(application);
        } else {
            throw new EntityNotFoundException("Student or Course not found.");
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
