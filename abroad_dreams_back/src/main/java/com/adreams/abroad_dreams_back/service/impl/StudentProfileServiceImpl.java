package com.adreams.abroad_dreams_back.service.impl;

import com.adreams.abroad_dreams_back.entity.Student;
import com.adreams.abroad_dreams_back.entity.StudentProfile;
import com.adreams.abroad_dreams_back.pojo.StudentProfilePojo;
import com.adreams.abroad_dreams_back.repo.StudentProfileRepo;
import com.adreams.abroad_dreams_back.service.StudentProfileService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StudentProfileServiceImpl implements StudentProfileService {

    private final StudentProfileRepo studentProfileRepo;

    @Override
    public String save(StudentProfilePojo studentProfilePojo) {
        StudentProfile studentProfile = new StudentProfile();

        studentProfile.setFirstName(studentProfilePojo.getFirstName());
        studentProfile.setLastName(studentProfilePojo.getLastName());
        studentProfile.setDateOfBirth(studentProfilePojo.getDateOfBirth());
        studentProfile.setGender(studentProfilePojo.getGender());
        studentProfile.setPhone(studentProfilePojo.getPhone());
        studentProfile.setAddress(studentProfilePojo.getAddress());
        studentProfile.setCity(studentProfilePojo.getCity());
        studentProfile.setState(studentProfilePojo.getState());
        studentProfile.setZipCode(studentProfilePojo.getZipCode());
        studentProfile.setCountry(studentProfilePojo.getCountry());
        studentProfile.setHighSchoolName(studentProfilePojo.getHighSchoolName());
        studentProfile.setExpectedGraduationYear(studentProfilePojo.getExpectedGraduationYear());
        studentProfile.setTestType(studentProfilePojo.getTestType());
        studentProfile.setUploadDocument(studentProfilePojo.getUploadDocument());
        studentProfile.setExtraCurricularActivities(studentProfilePojo.getExtraCurricularActivities());
        studentProfile.setPersonalStatement(studentProfilePojo.getPersonalStatement());
        studentProfile.setOtherDocument(studentProfilePojo.getOtherDocument());

        // Assuming studentId is available in the Pojo, set it to the StudentProfile entity
        Student student = new Student();
        student.setStudentId(studentProfilePojo.getStudentId());
        studentProfile.setStudent(student);


        studentProfileRepo.save(studentProfile);
        return "Saved Successfully!";
    }

    @Override
    public List<StudentProfile> getAll() {
        return studentProfileRepo.findAll();
    }

    @Override
    public void deleteById(Long id) {
        studentProfileRepo.deleteById(id);
    }

    @Override
    public Optional<StudentProfile> getById(Long id) {
        return studentProfileRepo.findById(id);
    }

    @Override
    public String update(Long id, StudentProfilePojo studentProfilePojo) {
        StudentProfile existingStudentProfile = studentProfileRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("StudentProfile not found with ID: " + id));

        // Update existingStudentProfile with values from StudentProfilePojo
        existingStudentProfile.setFirstName(studentProfilePojo.getFirstName());
        existingStudentProfile.setLastName(studentProfilePojo.getLastName());
        existingStudentProfile.setDateOfBirth(studentProfilePojo.getDateOfBirth());
        existingStudentProfile.setGender(studentProfilePojo.getGender());
        existingStudentProfile.setPhone(studentProfilePojo.getPhone());
        existingStudentProfile.setAddress(studentProfilePojo.getAddress());
        existingStudentProfile.setCity(studentProfilePojo.getCity());
        existingStudentProfile.setState(studentProfilePojo.getState());
        existingStudentProfile.setZipCode(studentProfilePojo.getZipCode());
        existingStudentProfile.setCountry(studentProfilePojo.getCountry());
        existingStudentProfile.setHighSchoolName(studentProfilePojo.getHighSchoolName());
        existingStudentProfile.setExpectedGraduationYear(studentProfilePojo.getExpectedGraduationYear());
        existingStudentProfile.setTestType(studentProfilePojo.getTestType());
        existingStudentProfile.setUploadDocument(studentProfilePojo.getUploadDocument());
        existingStudentProfile.setExtraCurricularActivities(studentProfilePojo.getExtraCurricularActivities());
        existingStudentProfile.setPersonalStatement(studentProfilePojo.getPersonalStatement());
        existingStudentProfile.setOtherDocument(studentProfilePojo.getOtherDocument());

        // Assuming studentId is available in the Pojo, set it to the existing StudentProfile entity
        Student student = new Student();
        student.setStudentId(studentProfilePojo.getStudentId());
        existingStudentProfile.setStudent(student);

        studentProfileRepo.save(existingStudentProfile);
        return "Updated Successfully!";
    }
}
