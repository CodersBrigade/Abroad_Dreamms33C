package com.adreams.abroad_dreams_back.service.impl;

import com.adreams.abroad_dreams_back.service.ClassroomService;
import com.adreams.abroad_dreams_back.entity.Classroom;
import com.adreams.abroad_dreams_back.pojo.ClassroomPojo;
import com.adreams.abroad_dreams_back.repo.ClassroomRepo;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ClassroomServiceImpl implements ClassroomService {

    private final ClassroomRepo classroomRepo;

    @Override
    public String save(ClassroomPojo classroomPojo) {
        Classroom classroom;

        if (classroomPojo.getClassroomId() != null) {
            classroom = classroomRepo.findById(classroomPojo.getClassroomId())
                    .orElseThrow(() -> new EntityNotFoundException("Classroom not found with ID: " + classroomPojo.getClassroomId()));
        } else {
            classroom = new Classroom();
        }

        // Set values from ClassroomPojo to Classroom entity
        classroom.setRoomNumber(classroomPojo.getRoomNumber());
        classroom.setCapacity(classroomPojo.getCapacity());

        classroomRepo.save(classroom);
        return "Saved Successfully!";
    }

    @Override
    public List<Classroom> getAll() {
        return classroomRepo.findAll();
    }

    @Override
    public void deleteById(Long id) {
        classroomRepo.deleteById(id);
    }

    @Override
    public Optional<Classroom> getById(Long id) {
        return classroomRepo.findById(id);
    }

    @Override
    public String update(Long id, ClassroomPojo classroomPojo) {
        Classroom existingClassroom = classroomRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Classroom not found with ID: " + id));

        // Update existingClassroom with values from ClassroomPojo
        existingClassroom.setRoomNumber(classroomPojo.getRoomNumber());
        existingClassroom.setCapacity(classroomPojo.getCapacity());

        classroomRepo.save(existingClassroom);
        return "Updated Successfully!";
    }
}
