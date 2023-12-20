package com.adreams.abroad_dreams_back.service;

import com.adreams.abroad_dreams_back.pojo.ClassroomPojo;
import com.adreams.abroad_dreams_back.entity.Classroom;

import java.util.List;
import java.util.Optional;

public interface ClassroomService {

    String save(ClassroomPojo classroomPojo);

    List<Classroom> getAll();

    void deleteById(Long id);

    Optional<Classroom> getById(Long id);

    String update(Long id, ClassroomPojo classroomPojo);
}
