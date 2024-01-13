package com.adreams.abroad_dreams_back.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "institutions")
@Getter
@Setter
public class Institution {

    @Id
    @SequenceGenerator(name = "institutions_seq_gen", sequenceName = "institutions_id_seq", allocationSize = 1)
    @GeneratedValue(generator = "institutions_seq_gen", strategy = GenerationType.SEQUENCE)
    private Long institutionId;

    @Column(name = "institution_name", nullable = false)
    private String institutionName;

    @Column(name = "address")
    private String address;

    @Column(name = "official_website")
    private String officialWebsite;

    @Column(name = "country")
    private String country;

    @Column(name = "description")
    private String description;

    @Column(name = "courses_types")
    private String coursesTypes;

    @Column(name = "special_information")
    private String specialInformation;

    @Column(name = "rules_and_regulation")
    private String rulesAndRegulation;


}
