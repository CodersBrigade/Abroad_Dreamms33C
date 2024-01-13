package com.adreams.abroad_dreams_back.repo;

import com.adreams.abroad_dreams_back.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Date;
import java.util.List;

public interface PaymentRepo extends JpaRepository<Payment, Long> {

    List<Payment> findByUserId(Long userId);

    List<Payment> findByStatus(String status);

    List<Payment> findByPaymentDate(Date date);

}
