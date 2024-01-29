package com.adreams.abroad_dreams_back.pojo;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
@Getter
@Setter

public class BookAppointmentPojo {
    private Long bookAppointmentId;

    private Date date;

    private String fullName;

    private String email;

    private String mobileNumber;

    private boolean isApproved;
}
