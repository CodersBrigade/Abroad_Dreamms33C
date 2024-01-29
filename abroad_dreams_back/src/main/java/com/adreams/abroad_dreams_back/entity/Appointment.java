package com.adreams.abroad_dreams_back.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "appointments")
@Getter
@Setter
public class Appointment {

    @Id
    @SequenceGenerator(name = "appointments_seq_gen", sequenceName = "appointments_id_seq", allocationSize = 1)
    @GeneratedValue(generator = "appointments_seq_gen", strategy = GenerationType.SEQUENCE)
    private Long appointmentId;

    @Column(name = "date", nullable = false)
    private Date date;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "email")
    private String email;

    @Column(name = "mobile_number", nullable = false)
    private String mobileNumber;

    @Column(name = "purpose", nullable = false)
    private String purpose;

}
