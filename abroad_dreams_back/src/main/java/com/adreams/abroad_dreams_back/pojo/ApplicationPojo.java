package com.adreams.abroad_dreams_back.pojo;

import com.adreams.abroad_dreams_back.entity.Course;
import com.adreams.abroad_dreams_back.entity.SystemUser;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class ApplicationPojo {

    private Long applicationId;
    private Long userId;
    private Long courseId;
    private String status;
    private Date applicationDate;

}
