package com.adreams.abroad_dreams_back.pojo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

}
