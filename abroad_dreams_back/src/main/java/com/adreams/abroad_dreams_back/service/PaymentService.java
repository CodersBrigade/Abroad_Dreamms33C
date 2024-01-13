package com.adreams.abroad_dreams_back.service;

import com.adreams.abroad_dreams_back.entity.Payment;
import com.adreams.abroad_dreams_back.pojo.PaymentPojo;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

public interface PaymentService {

    String save(PaymentPojo paymentPojo);

    List<Payment> getAll();

    List<Payment> getByUserId(Long userId);

    Optional<Payment> getById(Long id);

    void deleteById(Long id);

    String update(Long id, PaymentPojo paymentPojo);

    List<Payment> getByStatus(String status);

    List<Payment> getByDate(Date date);

}
