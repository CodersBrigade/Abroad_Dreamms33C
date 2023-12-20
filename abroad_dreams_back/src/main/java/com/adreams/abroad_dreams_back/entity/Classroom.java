package com.adreams.abroad_dreams_back.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "classrooms")
@Getter
@Setter
public class Classroom {

    @Id
    @GeneratedValue(generator = "classrooms_seq_gen", strategy = GenerationType.SEQUENCE)
    private Long classroomId;

    @Column(name = "room_number", nullable = false)
    private String roomNumber;

    @Column(name = "capacity", nullable = false)
    private int capacity;

}
