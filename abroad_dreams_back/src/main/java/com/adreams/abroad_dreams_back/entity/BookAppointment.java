package com.adreams.abroad_dreams_back.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "book_appointment")
@Getter
@Setter
public class BookAppointment {

    @Id
    @SequenceGenerator(name = "book_appointments_seq_gen", sequenceName = "book_appointments_id_seq", allocationSize = 1)
    @GeneratedValue(generator = "book_appointments_seq_gen", strategy = GenerationType.SEQUENCE)
    private Long bookAppointmentId;

    @Column(name = "date", nullable = false)
    private Date date;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "email")
    private String email;

    @Column(name = "mobile_number", nullable = false)
    private String mobileNumber;

    @Column(name = "status")
    private boolean isApproved;

}
