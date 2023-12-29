package com.adreams.abroad_dreams_back.pojo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentPojo {

    private Long appointmentId;
    private Long studentId;
    private Date date;
    private String purpose;

    // Constructors, getters, setters, and other methods can be added as needed
}
