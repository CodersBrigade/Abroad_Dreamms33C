package com.adreams.abroad_dreams_back.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "instructors")
@Getter
@Setter
public class Instructor {

    @Id
    @SequenceGenerator(name = "instructors_seq_gen", sequenceName = "instructors_id_seq", allocationSize = 1)
    @GeneratedValue(generator = "instructors_seq_gen", strategy = GenerationType.SEQUENCE)
    private Long instructorId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "address")
    private String address;

    @Column(name = "mobile_no")
    private String mobileNo;

    @Column(name = "qualifications")
    private String qualifications;

    @Column(name = "upload_file")
    private String uploadFile;

}
