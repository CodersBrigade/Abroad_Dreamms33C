package com.adreams.abroad_dreams_back.service;

import com.adreams.abroad_dreams_back.entity.StudentProfile;
import com.adreams.abroad_dreams_back.pojo.StudentProfilePojo;

import java.util.List;
import java.util.Optional;

public interface StudentProfileService {

    String save(Long userId, StudentProfilePojo studentProfilePojo);

    List<StudentProfile> getAll();

    void deleteById(Long id);

    Optional<StudentProfile> getById(Long id);

    String update(Long id, StudentProfilePojo studentProfilePojo);

    List<StudentProfile> getByUserId(Long userId);


}
