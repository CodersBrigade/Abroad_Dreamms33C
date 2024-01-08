package com.adreams.abroad_dreams_back.service;

import com.adreams.abroad_dreams_back.entity.Application;
import com.adreams.abroad_dreams_back.pojo.ApplicationPojo;

import java.util.List;

public interface ApplicationService {

    Application saveApplication(ApplicationPojo applicationPojo);

    Application getApplicationById(Long applicationId);

    List<Application> getAllApplications();

    Application updateApplicationStatus(Long applicationId, String status);

    void deleteApplication(Long applicationId);

    List<Application> getApplicationsByStudentId(Long studentId);

}
