package com.adreams.abroad_dreams_back.pojo;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CoursePojo {

    private Long courseId;

    @NotNull
    private String courseName;

    @NotNull
    private int credits;

    @NotNull
    private int durationYears;

    @NotNull
    private double courseFee;

    @NotNull
    private boolean availability;

    @NotNull
    private Long instructorId;

    @NotNull
    private Long countryId;
}
