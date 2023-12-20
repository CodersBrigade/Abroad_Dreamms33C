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

    @NotNull
    private String username;

    @NotNull
    private String password;

    @NotNull
    private String name;

    @NotNull
    private String email;

    @NotNull
    private String mobileNumber;

    @NotNull
    private Set<Long> courseIds;  // Change to Set<Long>

    @NotNull
    private boolean profileStatus;
}
