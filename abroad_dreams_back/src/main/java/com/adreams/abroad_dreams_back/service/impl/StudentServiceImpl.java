package com.adreams.abroad_dreams_back.service.impl;

import com.adreams.abroad_dreams_back.entity.Course;
import com.adreams.abroad_dreams_back.entity.Student;
import com.adreams.abroad_dreams_back.pojo.StudentPojo;
import com.adreams.abroad_dreams_back.repo.CourseRepo;
import com.adreams.abroad_dreams_back.repo.StudentRepo;

import com.adreams.abroad_dreams_back.service.StudentService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final StudentRepo studentRepo;
    private final CourseRepo courseRepo;

    private Set<Course> getCourseSetFromIds(Set<Long> courseIds) {
        return courseIds.stream()
                .map(courseRepo::getOne)  // Assuming you have the getOne method in CourseRepo
                .collect(Collectors.toSet());
    }

    @Override
    public String save(StudentPojo studentPojo) {
        Student student;

        if (studentPojo.getStudentId() != null) {
            student = studentRepo.findById(studentPojo.getStudentId())
                    .orElseThrow(() -> new EntityNotFoundException("Student not found with ID: " + studentPojo.getStudentId()));
        } else {
            student = new Student();
        }

        // Set values from StudentPojo to Student entity
        student.setUsername(studentPojo.getUsername());
        student.setPassword(studentPojo.getPassword());
        student.setName(studentPojo.getName());
        student.setEmail(studentPojo.getEmail());
        student.setMobileNumber(studentPojo.getMobileNumber());
        student.setProfileStatus(studentPojo.isProfileStatus());


        studentRepo.save(student);
        return "Saved Successfully!";
    }

    @Override
    public List<Student> getAll() {
        return studentRepo.findAll();
    }

    @Override
    public void deleteById(Long id) {
        studentRepo.deleteById(id);
    }

    @Override
    public Optional<Student> getById(Long id) {
        return studentRepo.findById(id);
    }

    @Override
    public String update(Long id, StudentPojo studentPojo) {
        Student existingStudent = studentRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Student not found with ID: " + id));

        // Update existingStudent with values from StudentPojo
        existingStudent.setUsername(studentPojo.getUsername());
        existingStudent.setPassword(studentPojo.getPassword());
        existingStudent.setName(studentPojo.getName());
        existingStudent.setEmail(studentPojo.getEmail());
        existingStudent.setMobileNumber(studentPojo.getMobileNumber());
        existingStudent.setProfileStatus(studentPojo.isProfileStatus());


        studentRepo.save(existingStudent);
        return "Updated Successfully!";
    }
}
