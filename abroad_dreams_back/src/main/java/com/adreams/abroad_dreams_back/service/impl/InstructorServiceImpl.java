package com.adreams.abroad_dreams_back.service.impl;

import com.adreams.abroad_dreams_back.service.InstructorService;
import com.adreams.abroad_dreams_back.entity.Instructor;
import com.adreams.abroad_dreams_back.pojo.InstructorPojo;
import com.adreams.abroad_dreams_back.repo.InstructorRepo;

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
        instructor.setEmail(instructorPojo.getEmail());
        instructor.setPhone(instructorPojo.getPhone());

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
    public String update(Long id, InstructorPojo instructorPojo) {
        Instructor instructor = instructorRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Instructor not found with ID: " + id));

        // Update values from InstructorPojo to Instructor entity
        instructor.setName(instructorPojo.getName());
        instructor.setEmail(instructorPojo.getEmail());
        instructor.setPhone(instructorPojo.getPhone());

        instructorRepo.save(instructor);
        return "Updated Successfully!";
    }

    // Other custom service methods, if any
}
