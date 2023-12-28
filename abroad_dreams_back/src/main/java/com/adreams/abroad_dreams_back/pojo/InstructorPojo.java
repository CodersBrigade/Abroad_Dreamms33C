package com.adreams.abroad_dreams_back.pojo;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

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
