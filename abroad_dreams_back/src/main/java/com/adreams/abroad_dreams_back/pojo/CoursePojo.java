package com.adreams.abroad_dreams_back.pojo;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CoursePojo {

    private Long courseId;

    private String courseName;

    private int credits;

    private int durationYears;

    private double courseFee;

    private boolean availability;

    @NotNull
    private MultipartFile image;

}
