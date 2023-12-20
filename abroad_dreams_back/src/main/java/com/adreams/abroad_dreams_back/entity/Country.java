package com.adreams.abroad_dreams_back.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "countries")
@Getter
@Setter
public class Country {

    @Id
    @GeneratedValue(generator = "countries_seq_gen", strategy = GenerationType.SEQUENCE)
    private Long countryId;

    @Column(name = "country_name", nullable = false)
    private String countryName;

    @Column(name = "country_shortname", nullable = false)
    private String countryShortname;

}
