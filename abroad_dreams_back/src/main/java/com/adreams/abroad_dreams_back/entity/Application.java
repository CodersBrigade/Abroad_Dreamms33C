package com.adreams.abroad_dreams_back.entity;

import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "applications")
@Getter
@Setter
public class Application {

    @Id
    @SequenceGenerator(name = "application_seq_gen", sequenceName = "application_id_seq", allocationSize = 1)
    @GeneratedValue(generator = "application_seq_gen", strategy = GenerationType.SEQUENCE)
    private Long applicationId;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "course_id", nullable = false)
    private Long courseId;

    @Column(name = "status")
    private String status;

    @Column(name = "application_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date applicationDate;


}
