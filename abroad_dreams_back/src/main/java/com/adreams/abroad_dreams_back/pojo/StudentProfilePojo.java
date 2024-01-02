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

    private Long profileId;

    private Long studentId; // Assuming you want to store studentId in the DTO

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

    private Integer expectedGraduationYear;

    private String testType;

    private String uploadDocument;

    private String extraCurricularActivities;

    private String personalStatement;

    private String otherDocument;
}
