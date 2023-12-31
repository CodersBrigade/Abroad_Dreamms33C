package com.adreams.abroad_dreams_back.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "students")
@Getter
@Setter
public class Student {

    @Id
    @GeneratedValue(generator = "students_seq_gen", strategy = GenerationType.SEQUENCE)
    private Long studentId;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "mobile_number")
    private String mobileNumber;

    @Column(name = "profile_status")
    private boolean profileStatus;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    @JsonManagedReference  // Break the circular reference
    private List<Appointment> appointments;


}
