package com.adreams.abroad_dreams_back.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

// Appointment.java
@Entity
@Table(name = "appointments")
@Getter
@Setter
public class Appointment {

    @Id
    @GeneratedValue(generator = "appointments_seq_gen", strategy = GenerationType.SEQUENCE)
    private Long appointmentId;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    @JsonIgnoreProperties("appointments")  // Break the circular reference
    private Student student;

    @Column(name = "date", nullable = false)
    private Date date;

    @Column(name = "purpose", nullable = false)
    private String purpose;

    @Column(name = "status", nullable = false)
    private String status = "Pending"; // Default status
}
