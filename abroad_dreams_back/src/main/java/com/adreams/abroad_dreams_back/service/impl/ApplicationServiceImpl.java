package com.adreams.abroad_dreams_back.service.impl;

import com.adreams.abroad_dreams_back.entity.Application;
import com.adreams.abroad_dreams_back.pojo.ApplicationPojo;
import com.adreams.abroad_dreams_back.repo.ApplicationRepo;
import com.adreams.abroad_dreams_back.service.ApplicationService;
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

    @Override
    @Transactional
    public Application saveApplication(ApplicationPojo applicationPojo) {
        Application application = new Application();
        application.setStudentId(applicationPojo.getStudentId());
        application.setCourseId(applicationPojo.getCourseId());
//        application.setStatus(applicationPojo.getStatus());
        application.setStatus("Pending");
        return applicationRepo.save(application);
    }

    @Override
    public List<Application> getApplicationsByStudentId(Long studentId) {
        // Assuming you have a method in your repository like this
        return applicationRepo.findByStudentId(studentId);
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
