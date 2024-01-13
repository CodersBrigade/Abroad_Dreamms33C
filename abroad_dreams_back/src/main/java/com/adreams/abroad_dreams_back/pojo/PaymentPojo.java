package com.adreams.abroad_dreams_back.pojo;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class PaymentPojo {

    private Long paymentId;

    private Long userId;

    private Double amount;

    private String description;

    private Date paymentDate;

    private String status;
}
