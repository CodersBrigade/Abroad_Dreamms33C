package com.adreams.abroad_dreams_back.pojo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentProfilePojo {

    private Long studentProfileId;
    private Long systemUserId;

    private String firstName;
    private String middleName;
    private String lastName;

    private String fullAddress;

    private String dateOfBirth;
    private String gender;
    private String phoneNumber;
    private String emailAddress;

    private String city;
    private String state;
    private String zipCode;
    private String country;

    private String previousSchoolLevel;
    private String graduationDate;
    private Double previousSchoolGpa;
    private String background;

//    private MultipartFile uploadSchoolDoc;

    private String testType;
    private Double testScores;

    private String interestedCountry;
    private String primaryUniversity;
    private String secondaryUniversity;
    private String interestedCourse;

    private String reference;
    private String notes;
}
