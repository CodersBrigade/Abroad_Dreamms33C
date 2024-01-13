package com.adreams.abroad_dreams_back.service;

import com.adreams.abroad_dreams_back.entity.Application;
import com.adreams.abroad_dreams_back.pojo.ApplicationPojo;

import java.util.List;
import java.util.Optional;

public interface ApplicationService {

    Application saveApplication(ApplicationPojo applicationPojo);

    Application getApplicationById(Long applicationId);

    List<Application> getAllApplications();

    Application updateApplicationStatus(Long applicationId, String status);

    void deleteApplication(Long applicationId);

    List<Application> getByUserId(Long userId);
}
