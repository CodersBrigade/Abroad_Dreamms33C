package com.adreams.abroad_dreams_back.service;

import com.adreams.abroad_dreams_back.pojo.InstructorPojo;
import com.adreams.abroad_dreams_back.entity.Instructor;

import java.util.List;
import java.util.Optional;

public interface InstructorService {

    String save(InstructorPojo instructorPojo);

    List<Instructor> getAll();

    void deleteById(Long id);

    Optional<Instructor> getById(Long id);

    String update(Long id, InstructorPojo instructorPojo);


    // Other custom service methods, if any

}
