package com.adreams.abroad_dreams_back.controller;

import com.adreams.abroad_dreams_back.entity.Application;
import com.adreams.abroad_dreams_back.pojo.ApplicationPojo;
import com.adreams.abroad_dreams_back.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/applications")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @PostMapping("/save")
    public ResponseEntity<Application> saveApplication(@RequestBody @Valid ApplicationPojo applicationPojo) {
        Application savedApplication = applicationService.saveApplication(applicationPojo);
        return new ResponseEntity<>(savedApplication, HttpStatus.CREATED);
    }

    @GetMapping("/{applicationId}")
    public ResponseEntity<Application> getApplicationById(@PathVariable Long applicationId) {
        Application application = applicationService.getApplicationById(applicationId);

        return (application != null) ?
                new ResponseEntity<>(application, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/all")
    public List<Application> getAllApplications() {
        return applicationService.getAllApplications();
    }

    @PutMapping("/update/{applicationId}")
    public ResponseEntity<Application> updateApplication(@PathVariable Long applicationId,
                                                         @RequestBody @Valid ApplicationPojo applicationPojo) {
        Application updatedApplication = applicationService.updateApplicationStatus(applicationId, applicationPojo.getStatus());

        return (updatedApplication != null) ?
                new ResponseEntity<>(updatedApplication, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/delete/{applicationId}")
    public ResponseEntity<Void> deleteApplication(@PathVariable Long applicationId) {
        applicationService.deleteApplication(applicationId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
