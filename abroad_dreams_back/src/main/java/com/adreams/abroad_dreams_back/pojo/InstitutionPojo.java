package com.adreams.abroad_dreams_back.pojo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InstitutionPojo {

    private Long institutionId;

    private String institutionName;

    private String address;

    private String officialWebsite;

    private String country;

    private String description;

    private String coursesTypes;

    private String specialInformation;

    private String rulesAndRegulation;
}
