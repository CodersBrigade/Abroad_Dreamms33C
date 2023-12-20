package com.adreams.abroad_dreams_back.pojo;

import lombok.Getter;
import lombok.Setter;

import jakarta.validation.constraints.NotNull;

@Getter
@Setter
public class InstitutionPojo {

    private Long institutionId;

    @NotNull
    private String institutionName;

    @NotNull
    private String address;

    @NotNull
    private String officialWebsite;

//    @NotNull
    private Long countryId;  // Assuming you want to include the country ID in the Pojo

    // You can include the list of courses here if needed
}
