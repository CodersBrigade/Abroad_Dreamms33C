package com.adreams.abroad_dreams_back.service;

import com.adreams.abroad_dreams_back.entity.Student;
import com.adreams.abroad_dreams_back.pojo.StudentPojo;

import java.util.List;
import java.util.Optional;

public interface StudentService {

    String save(StudentPojo studentPojo);

    List<Student> getAll();

    void deleteById(Long id);

    Optional<Student> getById(Long id);

    String update(Long id, StudentPojo studentPojo);
}
