package com.adreams.abroad_dreams_back.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "applications")
@Getter
@Setter
public class Application {

    @Id
    @GeneratedValue(generator = "applications_seq_gen", strategy = GenerationType.SEQUENCE)
    private Long applicationId;

    @Column(name = "student_id")
    private Long studentId;

    @Column(name = "course_id")
    private Long courseId;


    @Column(name = "status", nullable = true)
    private String status;


}
