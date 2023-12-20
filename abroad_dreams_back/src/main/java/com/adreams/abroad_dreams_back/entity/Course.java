package com.adreams.abroad_dreams_back.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "courses")
@Getter
@Setter
public class Course {

    @Id
    @GeneratedValue(generator = "courses_seq_gen", strategy = GenerationType.SEQUENCE)
    private Long courseId;

    @Column(name = "course_name", nullable = false)
    private String courseName;

    @Column(name = "credits", nullable = false)
    private int credits;

    @Column(name = "duration_years", nullable = false)
    private int durationYears;

    @Column(name = "course_fee", nullable = false)
    private double courseFee;

    @Column(name = "availability", nullable = false)
    private boolean availability;

    @ManyToOne
    @JoinColumn(name = "instructor_id", nullable = false)
    private Instructor instructor;

    @ManyToOne
    @JoinColumn(name = "country_id", nullable = false)
    private Country country;

}
