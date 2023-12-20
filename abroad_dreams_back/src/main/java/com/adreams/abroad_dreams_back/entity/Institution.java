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
    @GeneratedValue(generator = "institutions_seq_gen", strategy = GenerationType.SEQUENCE)
    private Long institutionId;

    @Column(name = "institution_name", nullable = false)
    private String institutionName;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "official_website", nullable = false)
    private String officialWebsite;

    @ManyToOne
    @JoinColumn(name = "country_id", nullable = false)
    private Country country;

//    @OneToMany(mappedBy = "institution", cascade = CascadeType.ALL)
//    private List<Course> courses;

}
