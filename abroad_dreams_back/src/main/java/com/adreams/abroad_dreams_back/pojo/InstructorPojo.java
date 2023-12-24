package com.adreams.abroad_dreams_back.pojo;

import lombok.Getter;
import lombok.Setter;

import jakarta.validation.constraints.NotNull;

@Getter
@Setter
public class InstructorPojo {

    private Long instructorId;

    @NotNull
    private String name;

    private String address;

    private String mobileNo;

    private String qualifications;

    private String uploadFile;

}
