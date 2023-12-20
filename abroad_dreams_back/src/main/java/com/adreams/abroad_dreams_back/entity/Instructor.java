package com.adreams.abroad_dreams_back.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "instructors")
@Getter
@Setter
public class Instructor {

    @Id
    @GeneratedValue(generator = "instructors_seq_gen", strategy = GenerationType.SEQUENCE)
    private Long instructorId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "phone", nullable = false)
    private String phone;

//    @OneToMany(mappedBy = "instructor", cascade = CascadeType.ALL)
//    private List<Course> courses;
//
//    @OneToMany(mappedBy = "instructor", cascade = CascadeType.ALL)
//    private List<Student> students;

}
