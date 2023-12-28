package com.adreams.abroad_dreams_back.service.impl;

import com.adreams.abroad_dreams_back.entity.Instructor;
import com.adreams.abroad_dreams_back.pojo.InstructorPojo;
import com.adreams.abroad_dreams_back.repo.InstructorRepo;
import com.adreams.abroad_dreams_back.service.InstructorService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class InstructorServiceImpl implements InstructorService {

    private final InstructorRepo instructorRepo;

    @Override
    public String save(InstructorPojo instructorPojo) {
        Instructor instructor;

        if (instructorPojo.getInstructorId() != null) {
            instructor = instructorRepo.findById(instructorPojo.getInstructorId())
                    .orElseThrow(() -> new EntityNotFoundException("Instructor not found with ID: " + instructorPojo.getInstructorId()));
        } else {
            instructor = new Instructor();
        }

        // Set values from InstructorPojo to Instructor entity
        instructor.setName(instructorPojo.getName());
        instructor.setAddress(instructorPojo.getAddress());
        instructor.setMobileNo(instructorPojo.getMobileNo());
        instructor.setQualifications(instructorPojo.getQualifications());
        instructor.setUploadFile(instructorPojo.getUploadFile());

        instructorRepo.save(instructor);
        return "Saved Successfully!";
    }

    @Override
    public List<Instructor> getAll() {
        return instructorRepo.findAll();
    }

    @Override
    public void deleteById(Long id) {
        instructorRepo.deleteById(id);
    }

    @Override
    public Optional<Instructor> getById(Long id) {
        return instructorRepo.findById(id);
    }

    @Override
    public List<Instructor> getByName(String name) {
        return instructorRepo.findByName(name);
    }

    @Override
    public String update(Long id, InstructorPojo instructorPojo) {
        Instructor existingInstructor = instructorRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Instructor not found with ID: " + id));

        // Set values from InstructorPojo to existing Instructor entity
        existingInstructor.setName(instructorPojo.getName());
        existingInstructor.setAddress(instructorPojo.getAddress());
        existingInstructor.setMobileNo(instructorPojo.getMobileNo());
        existingInstructor.setQualifications(instructorPojo.getQualifications());
        existingInstructor.setUploadFile(instructorPojo.getUploadFile());

        instructorRepo.save(existingInstructor);
        return "Updated Successfully!";
    }

    // Other custom service methods, if any
}
