package com.adreams.abroad_dreams_back.pojo;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.Set;  // Import Set

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentPojo {

    private Long studentId;

    private String username;

    private String password;

    private String name;

    private String email;

    private String mobileNumber;

    private boolean profileStatus;
}
