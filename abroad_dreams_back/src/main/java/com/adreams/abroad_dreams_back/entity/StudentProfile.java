package com.adreams.abroad_dreams_back.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "student_profile")
@Getter
@Setter
public class StudentProfile {

    @Id
    @SequenceGenerator(name = "student_profiles_seq_gen", sequenceName = "student_profiles_id_seq", allocationSize = 1)
    @GeneratedValue(generator = "student_profiles_seq_gen", strategy = GenerationType.SEQUENCE)
    @Column(name = "student_profile_id")
    private Long studentProfileId;

    @ManyToOne
    @JoinColumn(name = "system_user_id", nullable = true)
    private SystemUser systemUser;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "date_of_birth", nullable = false)
    private String dateOfBirth;

    @Column(name = "gender", nullable = false)
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
    private String expectedGraduationYear;

    @Column(name = "high_school_gpa")
    private Double highSchoolGPA;

//    @Column(name = "upload_school_doc")
//    private String uploadSchoolDoc;

    @Column(name = "test_type")
    private String testType;

    @Column(name = "test_score")
    private Double testScore;
}
