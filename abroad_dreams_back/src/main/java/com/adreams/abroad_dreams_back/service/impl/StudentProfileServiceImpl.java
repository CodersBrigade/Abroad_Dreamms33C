//package com.adreams.abroad_dreams_back.service.impl;
//
//import com.adreams.abroad_dreams_back.entity.StudentProfile;
//import com.adreams.abroad_dreams_back.entity.SystemUser;
//import com.adreams.abroad_dreams_back.pojo.StudentProfilePojo;
//import com.adreams.abroad_dreams_back.repo.StudentProfileRepo;
//import com.adreams.abroad_dreams_back.repo.SystemUserRepo;
//import com.adreams.abroad_dreams_back.service.StudentProfileService;
//import jakarta.persistence.EntityNotFoundException;
//import lombok.RequiredArgsConstructor;
//import org.springframework.dao.DataIntegrityViolationException;
//import org.springframework.stereotype.Service;
//import com.adreams.abroad_dreams_back.repo.SystemUserRepo;
//
//
//import java.util.List;
//import java.util.Optional;
//
//@Service
//@RequiredArgsConstructor
//public class StudentProfileServiceImpl implements StudentProfileService {
//
//    private final StudentProfileRepo studentProfileRepo;
//    private final SystemUserRepo systemUserRepo; // Assuming you have a SystemUserRepo
//
//
//    @Override
//    public String save(Long userId, StudentProfilePojo studentProfilePojo) {
//        StudentProfile studentProfile;
//
//        if (studentProfilePojo.getStudentProfileId() != null) {
//            Optional<StudentProfile> existingProfile = studentProfileRepo.findById(studentProfilePojo.getStudentProfileId());
//
//            if (existingProfile.isPresent()) {
//                studentProfile = existingProfile.get();
//            } else {
//                throw new EntityNotFoundException("StudentProfile not found with ID: " + studentProfilePojo.getStudentProfileId());
//            }
//        } else {
//            studentProfile = new StudentProfile();
//        }
//
//
//        // Set values from StudentProfilePojo to StudentProfile entity
//        studentProfile.setFirstName(studentProfilePojo.getFirstName());
//        studentProfile.setLastName(studentProfilePojo.getLastName());
//        studentProfile.setMiddleName(studentProfilePojo.getMiddleName());
//
//        studentProfile.setDateOfBirth(studentProfilePojo.getDateOfBirth());
//        studentProfile.setGender(studentProfilePojo.getGender());
//        studentProfile.setPhoneNumber(studentProfilePojo.getPhoneNumber());
//        studentProfile.setFullAddress(studentProfilePojo.getFullAddress());
//        studentProfile.setEmailAddress(studentProfilePojo.getEmailAddress());
//
//
//        studentProfile.setCity(studentProfilePojo.getCity());
//        studentProfile.setState(studentProfilePojo.getState());
//        studentProfile.setZipCode(studentProfilePojo.getZipCode());
//        studentProfile.setCountry(studentProfilePojo.getCountry());
//
//        studentProfile.setPreviousSchoolLevel(studentProfilePojo.getPreviousSchoolLevel());
//        studentProfile.setGraduationDate(studentProfilePojo.getGraduationDate());
//        studentProfile.setPreviousSchoolGpa(studentProfilePojo.getPreviousSchoolGpa());
//        studentProfile.setBackground(studentProfilePojo.getBackground());
//
//        studentProfile.setTestType(studentProfilePojo.getTestType());
//        studentProfile.setTestScores(studentProfilePojo.getTestScores());
//
//        studentProfile.setReference(studentProfilePojo.getReference());
//        studentProfile.setNotes(studentProfilePojo.getNotes());
//
//        studentProfile.setInterestedCountry(studentProfilePojo.getInterestedCountry());
//        studentProfile.setInterestedCourse(studentProfilePojo.getInterestedCourse());
//        studentProfile.setPrimaryUniversity(studentProfilePojo.getPrimaryUniversity());
//        studentProfile.setSecondaryUniversity(studentProfilePojo.getSecondaryUniversity());
//
//
//
//
//
//
//
//
//
//
//
//        // Set or update SystemUser
//        SystemUser systemUser = systemUserRepo.findById(userId)
//                .orElseThrow(() -> new EntityNotFoundException("SystemUser not found with ID: " + userId));
//
//        studentProfile.setSystemUser(systemUser);
//
//        try {
//            studentProfileRepo.save(studentProfile);
//            return "Saved Successfully!";
//        } catch (DataIntegrityViolationException e) {
//            return "Error: Duplicate student profile ID or other integrity violation.";
//        }
//    }
//
//    @Override
//    public List<StudentProfile> getAll() {
//        return studentProfileRepo.findAll();
//    }
//
//    @Override
//    public void deleteById(Long id) {
//        studentProfileRepo.deleteById(id);
//    }
//
//    @Override
//    public Optional<StudentProfile> getById(Long id) {
//        return studentProfileRepo.findById(id);
//    }
//
//    @Override
//    public String update(Long id, StudentProfilePojo studentProfilePojo) {
//        try {
//            StudentProfile studentProfile = studentProfileRepo.findById(id)
//                    .orElseThrow(() -> new EntityNotFoundException("StudentProfile not found with ID: " + id));
//
//            // Set values from StudentProfilePojo to StudentProfile entity for update
//            studentProfile.setFirstName(studentProfilePojo.getFirstName());
//            studentProfile.setLastName(studentProfilePojo.getLastName());
//            studentProfile.setDateOfBirth(studentProfilePojo.getDateOfBirth());
//            studentProfile.setGender(studentProfilePojo.getGender());
//            studentProfile.setPhoneNumber(studentProfilePojo.getPhoneNumber());
//            studentProfile.setEmailAddress(studentProfilePojo.getEmailAddress());
//            studentProfile.setCity(studentProfilePojo.getCity());
//            studentProfile.setState(studentProfilePojo.getState());
//            studentProfile.setZipCode(studentProfilePojo.getZipCode());
//            studentProfile.setCountry(studentProfilePojo.getCountry());
//            studentProfile.setPreviousSchoolLevel(studentProfilePojo.getPreviousSchoolLevel());
//            studentProfile.setGraduationDate(studentProfilePojo.getGraduationDate());
//            studentProfile.setPreviousSchoolGpa(studentProfilePojo.getPreviousSchoolGpa());
//            studentProfile.setTestType(studentProfilePojo.getTestType());
//            studentProfile.setTestScores(studentProfilePojo.getTestScores());
//
//            studentProfileRepo.save(studentProfile);
//            return "Updated Successfully!";
//        } catch (DataIntegrityViolationException e) {
//            return "Error: Duplicate student profile ID or other integrity violation.";
//        }
//    }
//
//    // Other custom service methods, if any
//}




package com.adreams.abroad_dreams_back.service.impl;

import com.adreams.abroad_dreams_back.entity.StudentProfile;
import com.adreams.abroad_dreams_back.entity.SystemUser;
import com.adreams.abroad_dreams_back.pojo.StudentProfilePojo;
import com.adreams.abroad_dreams_back.repo.StudentProfileRepo;
import com.adreams.abroad_dreams_back.repo.SystemUserRepo;
import com.adreams.abroad_dreams_back.service.StudentProfileService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StudentProfileServiceImpl implements StudentProfileService {

    private final StudentProfileRepo studentProfileRepo;
    private final SystemUserRepo systemUserRepo;
    private static final Logger LOGGER = LoggerFactory.getLogger(StudentProfileServiceImpl.class);

    @Override
    public String save(Long userId, StudentProfilePojo studentProfilePojo) {
        try {
            StudentProfile studentProfile = getOrCreateStudentProfile(studentProfilePojo);

            mapStudentProfilePojoToEntity(studentProfile, studentProfilePojo);

            studentProfile.setSystemUserId(userId); // Set systemUserId directly

            studentProfileRepo.save(studentProfile);

            LOGGER.info("Saved Successfully!");
            return "Saved Successfully!";
        } catch (DataIntegrityViolationException e) {
            LOGGER.error("Error saving student profile: {}", e.getMessage());
            return "Error: Duplicate student profile ID or other integrity violation.";
        } catch (EntityNotFoundException e) {
            LOGGER.error("Error saving student profile: {}", e.getMessage());
            return e.getMessage();
        }
    }

    private StudentProfile getOrCreateStudentProfile(StudentProfilePojo studentProfilePojo) {
        if (studentProfilePojo.getStudentProfileId() != null) {
            return studentProfileRepo.findById(studentProfilePojo.getStudentProfileId())
                    .orElseThrow(() -> new EntityNotFoundException("StudentProfile not found with ID: " + studentProfilePojo.getStudentProfileId()));
        } else {
            return new StudentProfile();
        }
    }

    private void mapStudentProfilePojoToEntity(StudentProfile studentProfile, StudentProfilePojo studentProfilePojo) {
        studentProfile.setFirstName(studentProfilePojo.getFirstName());
        studentProfile.setLastName(studentProfilePojo.getLastName());
        studentProfile.setMiddleName(studentProfilePojo.getMiddleName());
        studentProfile.setDateOfBirth(studentProfilePojo.getDateOfBirth());
        studentProfile.setGender(studentProfilePojo.getGender());
        studentProfile.setPhoneNumber(studentProfilePojo.getPhoneNumber());
        studentProfile.setFullAddress(studentProfilePojo.getFullAddress());
        studentProfile.setEmailAddress(studentProfilePojo.getEmailAddress());
        studentProfile.setCity(studentProfilePojo.getCity());
        studentProfile.setState(studentProfilePojo.getState());
        studentProfile.setZipCode(studentProfilePojo.getZipCode());
        studentProfile.setCountry(studentProfilePojo.getCountry());
        studentProfile.setPreviousSchoolLevel(studentProfilePojo.getPreviousSchoolLevel());
        studentProfile.setGraduationDate(studentProfilePojo.getGraduationDate());
        studentProfile.setPreviousSchoolGpa(studentProfilePojo.getPreviousSchoolGpa());
        studentProfile.setBackground(studentProfilePojo.getBackground());
        studentProfile.setTestType(studentProfilePojo.getTestType());
        studentProfile.setTestScores(studentProfilePojo.getTestScores());
        studentProfile.setReference(studentProfilePojo.getReference());
        studentProfile.setNotes(studentProfilePojo.getNotes());
        studentProfile.setInterestedCountry(studentProfilePojo.getInterestedCountry());
        studentProfile.setInterestedCourse(studentProfilePojo.getInterestedCourse());
        studentProfile.setPrimaryUniversity(studentProfilePojo.getPrimaryUniversity());
        studentProfile.setSecondaryUniversity(studentProfilePojo.getSecondaryUniversity());
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

            mapStudentProfilePojoToEntity(studentProfile, studentProfilePojo);

            studentProfileRepo.save(studentProfile);

            LOGGER.info("Updated Successfully!");
            return "Updated Successfully!";
        } catch (DataIntegrityViolationException e) {
            LOGGER.error("Error updating student profile: {}", e.getMessage());
            return "Error: Duplicate student profile ID or other integrity violation.";
        } catch (EntityNotFoundException e) {
            LOGGER.error("Error updating student profile: {}", e.getMessage());
            return e.getMessage();
        }
    }

    // Other custom service methods, if any
}

