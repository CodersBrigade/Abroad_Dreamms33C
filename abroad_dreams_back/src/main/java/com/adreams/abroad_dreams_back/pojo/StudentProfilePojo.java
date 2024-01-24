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
    private String lastName;
    private String dateOfBirth;
    private String gender;
    private String phone;
    private String address;
    private String city;
    private String state;
    private String zipCode;
    private String country;
    private String highSchoolName;
    private String expectedGraduationYear;
    private Double highSchoolGPA;
//    private String uploadSchoolDoc;
    private String testType;
    private Double testScore;
}
