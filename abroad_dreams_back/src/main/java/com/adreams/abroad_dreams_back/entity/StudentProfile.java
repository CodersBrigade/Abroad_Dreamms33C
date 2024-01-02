package com.adreams.abroad_dreams_back.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "student_profiles")
public class StudentProfile {

    @Id
    @GeneratedValue(generator = "profile_seq_gen", strategy = GenerationType.SEQUENCE)
    private Long profileId;

    @OneToOne
    @JoinColumn(name = "student_id", referencedColumnName = "studentId")
    private Student student;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "date_of_birth")
    private String dateOfBirth;

    @Column(name = "gender")
    private String gender;

    @Column(name = "phone")
    private String phone;

    @Column(name = "address")
    private String address;

    @Column(name = "city")
    private String city;

    @Column(name = "state")
    private String state;

    @Column(name = "zip_code")
    private String zipCode;

    @Column(name = "country")
    private String country;

    @Column(name = "high_school_name")
    private String highSchoolName;

    @Column(name = "expected_graduation_year")
    private Integer expectedGraduationYear;

    @Column(name = "test_type")
    private String testType; // Consider using an enum for the test types

    @Column(name = "upload_document")
    private String uploadDocument;

    @Column(name = "extra_curricular_activities")
    private String extraCurricularActivities;

    @Column(name = "personal_statement")
    private String personalStatement;

    @Column(name = "other_document")
    private String otherDocument;

}
