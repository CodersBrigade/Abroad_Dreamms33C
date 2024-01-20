package com.adreams.abroad_dreams_back.service.impl;

import com.adreams.abroad_dreams_back.entity.StudentProfile;
import com.adreams.abroad_dreams_back.pojo.StudentProfilePojo;
import com.adreams.abroad_dreams_back.repo.StudentProfileRepo;
import com.adreams.abroad_dreams_back.service.StudentProfileService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StudentProfileServiceImpl implements StudentProfileService {

    private final StudentProfileRepo studentProfileRepo;

    @Override
    public String save(StudentProfilePojo studentProfilePojo) {
        StudentProfile studentProfile;

        if (studentProfilePojo.getStudentProfileId() != null) {
            studentProfile = studentProfileRepo.findById(studentProfilePojo.getStudentProfileId())
                    .orElseThrow(() -> new EntityNotFoundException("StudentProfile not found with ID: " + studentProfilePojo.getStudentProfileId()));
        } else {
            studentProfile = new StudentProfile();
        }

        // Set values from StudentProfilePojo to StudentProfile entity
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
        studentProfile.setHighSchoolGPA(studentProfilePojo.getHighSchoolGPA());
        studentProfile.setUploadSchoolDoc(studentProfilePojo.getUploadSchoolDoc());
        studentProfile.setTestType(studentProfilePojo.getTestType());
        studentProfile.setTestScore(studentProfilePojo.getTestScore());

        try {
            studentProfileRepo.save(studentProfile);
            return "Saved Successfully!";
        } catch (DataIntegrityViolationException e) {
            return "Error: Duplicate student profile ID or other integrity violation.";
        }
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
        try {
            StudentProfile studentProfile = studentProfileRepo.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("StudentProfile not found with ID: " + id));

            // Set values from StudentProfilePojo to StudentProfile entity for update
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
            studentProfile.setHighSchoolGPA(studentProfilePojo.getHighSchoolGPA());
            studentProfile.setUploadSchoolDoc(studentProfilePojo.getUploadSchoolDoc());
            studentProfile.setTestType(studentProfilePojo.getTestType());
            studentProfile.setTestScore(studentProfilePojo.getTestScore());

            studentProfileRepo.save(studentProfile);
            return "Updated Successfully!";
        } catch (DataIntegrityViolationException e) {
            return "Error: Duplicate student profile ID or other integrity violation.";
        }
    }

    // Other custom service methods, if any
}
