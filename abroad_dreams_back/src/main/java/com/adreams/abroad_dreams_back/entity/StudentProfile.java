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


    @Column(name = "middle_name", nullable = false)
    private String middleName;


    @Column(name = "last_name", nullable = false)
    private String lastName;


    @Column(name = "date_of_birth", nullable = false)
    private String dateOfBirth;

    @Column(name = "gender", nullable = false)
    private String gender;

    @Column(name = "phone_Number")
    private String phoneNumber;

    @Column(name = "email_address")
    private String emailAddress;

    @Column(name = "full_address")
    private String fullAddress;

    @Column(name = "city")
    private String city;

    @Column(name = "state")
    private String state;

    @Column(name = "zip_code")
    private String zipCode;

    @Column(name = "country")
    private String country;

    @Column(name = "previous_school_level")
    private String previousSchoolLevel;

    @Column(name = "graduation_date")
    private String graduationDate;

    @Column(name = "previous_school_gpa")
    private Double previousSchoolGpa;


    @Column(name = "background")
    private String background;

    @Column(name = "reference")
    private String reference;

    @Column(name = "notes")
    private String notes;

    @Column(name = "interested_country")
    private String interestedCountry;

    @Column(name = "primary_university")
    private String primaryUniversity;

    @Column(name = "secondary_university")
    private String secondaryUniversity;

    @Column(name = "interested_course")
    private String interestedCourse;

    @Column(name = "test_type")
    private String testType;


    @Column(name = "test_scores")
    private Double testScores;
}
